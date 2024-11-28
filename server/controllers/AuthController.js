const User = require("../model/User"); 
const jwt = require('jsonwebtoken');
const crypto = require("crypto");
async function login (req, res) {
    console.info("Login-Anfrage erhalten.");
  
    const { username, password } = req.body;
  
    const errors = {};
  
    // * Überprüft, ob der Benutzername existiert.
    await User.findOne({ username: username }).then((user) => {
      if (!user) {
        errors.username = "Dieser Benutzername existiert nicht.";
        return res.status(401).json({ errors });
      }
  
      // * Überprüft, ob das Passwort übereinstimmt.
     
        console.log("Comparing password");
        user.comparePassword(password, function (err, isMatch) {
          if (err) {
            console.error("Fehler beim Überprüfen des Passworts:", err);
            return res.status(500).json({ success: false, message: err });
          }
          if (isMatch) {
            console.info("Login erfolgreich");
            const userObject = user.toObject();
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            delete userObject.password;
  
  
            res.cookie('token', token, {
              httpOnly: process.env.NODE_ENV === 'production',
              secure: process.env.NODE_ENV === 'production', 
              sameSite:  process.env.NODE_ENV === 'production' ? 'none' : 'lax', 
              maxAge: 3600000, 
            });
  
            return res.status(200).json({
              message: "Login erfolgreich!"
            });
          } else {
            console.error("Login fehlgeschlagen. Passwort stimmt nicht überein.");
            errors.password = "Ungültiges Passwort.";
            return res.status(401).json({ errors });
          }
        });
      
    });
  }
 async function guestLogin (req, res) {
    console.info("Guest login request received.");
  try{
    const guestUser = await User.findOne({ username: "Gast" });
  
    if (!guestUser) {
      return res.status(404).json({ success: false, message: "Guest user not found" });
    }
    
    const userObject = guestUser.toObject();
    const token = jwt.sign({ userId: guestUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    delete userObject.password;
    
    res.cookie('token', token, {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === 'production',
      sameSite:  process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 3600000,
    });
    console.info("Guest login successful.");
    return res.status(200).json({ success: true, message: "Guest login successful" });
  } catch (error) {
    console.error("Error during guest login:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
  }
  
  async function logout(req, res) {
    res.clearCookie("token", {
      httpOnly: process.env.NODE_ENV === 'production',
      secure: process.env.NODE_ENV === "production",
      sameSite:  process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    res.status(200).json({ message: "Logged out successfully" });
  }
  async function validateRegistration (req, res) {
    const { username, password, confirmPassword, email } = req.body;
  
    const errors = {};
  
    // * Überprüft, ob der Benutzername bereits existiert.
    const user = await User.findOne({ username: username });
    if (user) {
      errors.username = "Dieser Benutzername ist bereits vergeben.";
    }
  
    // * Überprüft, ob der Benutzername dem RegEx entspricht.
    const usernameRegexLength = /^.{3,}$/;
    if (!usernameRegexLength.test(username)) {
      errors.username = "Der Benutzername muss mindestens 3 Zeichen lang sein.";
    }
    const usernameRegex = /^[a-zA-Z0-9]+$/;
    if (!usernameRegex.test(username)) {
      errors.username =
        "Der Benutzername darf nur Buchstaben und Zahlen enthalten.";
    }
    if (!usernameRegexLength.test(username) && !usernameRegex.test(username)) {
      errors.username =
        "Der Benutzername muss mindestens 3 Zeichen lang sein und darf nur Buchstaben und Zahlen enthalten.";
    }
  
    // * Überprüft das Passwort dem RegEx entspricht.
    const passwordRegexLength = /^.{8,}$/;
    if (!passwordRegexLength.test(password)) {
      errors.password = "Das Passwort muss mindestens 8 Zeichen lang sein.";
    }
    const passwordRegexUpperCase = /[A-Z]/;
    if (!passwordRegexUpperCase.test(password)) {
      errors.password =
        "Das Passwort muss mindestens einen Großbuchstaben enthalten.";
    }
    const passwordRegexLowerCase = /[a-z]/;
    if (!passwordRegexLowerCase.test(password)) {
      errors.password =
        "Das Passwort muss mindestens einen Kleinbuchstaben enthalten.";
    }
    const passwordRegexNumber = /[0-9]/;
    if (!passwordRegexNumber.test(password)) {
      errors.password = "Das Passwort muss mindestens eine Zahl enthalten.";
    }
  
    // * Überprüft, ob die Passwörter übereinstimmen.
    if (password !== confirmPassword) {
      errors.confirmPassword = "Die Passwörter stimmen nicht überein";
    }
  
    // * Überprüft, ob die E-Mail-Adresse bereits existiert.
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      errors.email = "Diese E-Mail-Adresse ist bereits vergeben.";
    }
  
    // * Überprüft, ob die E-Mail-Adresse dem RegEx entspricht.
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!emailRegex.test(email)) {
      errors.email = "Die E-Mail-Adresse muss gültig sein.";
    }
  
    // * Überprüft, ob die Felder leer sind.
    if (username === "") {
      errors.username = "Der Benutzername darf nicht leer sein.";
    }
    if (password === "") {
      errors.password = "Das Passwort darf nicht leer sein.";
    }
    if (confirmPassword === "") {
      errors.confirmPassword = "Das Passwort darf nicht leer sein.";
    }
    if (email === "") {
      errors.email = "Die E-Mail-Adresse darf nicht leer sein.";
    }
  
    if (Object.keys(errors).length > 0) {
      res.status(400).json({ errors });
    } else {
      res.status(200).json({ message: "Registrierung erfolgreich!" });
    }
  }
  
  async function registration (req, res) {
    console.info("Registrierungsanfrage erhalten.");
  
    try {
      const {
        username,
        email,
        password,
        confirmPassword,
        country,
        nativeLanguages,
        learningLanguages,
      } = req.body;
  
      // * Überprüft, ob der Benutzername bereits existiert.
      const user = await User.findOne({ username: username });
  
      if (user) {
        console.log("Benutzer existiert bereits.");
        return res
          .status(400)
          .json({ success: false, message: "Benutzer existiert bereits." });
      }
  
      // * Validiert die E-Mail-Adresse.
      const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
      if (!emailRegex.test(email)) {
        console.log("Ungültige E-Mail-Adresse.");
        return res
          .status(400)
          .json({ success: false, message: "Ungültige E-Mail-Adresse." });
      }
  
      // * Generates a random token for email verification.
      const verificationToken = crypto.randomBytes(64).toString("hex");
  
      // * Überprüft, ob die Passwörter übereinstimmen.
      if (password !== confirmPassword) {
        console.log("Passwort stimmt nicht überein.");
        return res
          .status(400)
          .json({ success: false, message: "Passwort stimmt nicht überein." });
      }
  
      // * Überprüft das Passwort mit einem regulären Ausdruck.
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
      if (!passwordRegex.test(password)) {
        console.log("Passwort erfüllt nicht die Anforderungen.");
        return res.status(400).json({
          success: false,
          message: "Passwort erfüllt nicht die Anforderungen.",
        });
      }
      // * Sends a verification email to the user.
      /* await sendMail(email, verificationToken); */
      // * Erstellt einen neuen Benutzer.
      await User.create({
        username: username,
        email: email,
        password: password,
        country: country,
        nativeLanguage: nativeLanguages,
        learningLanguages: learningLanguages,
        verificationToken: verificationToken,
      });
  
      console.log("Registrierung erfolgreich.");
      return res
        .status(201)
        .json({ success: true, message: "Registrierung erfolgreich." });
    } catch (error) {
      console.error("Fehler beim Registrieren des Benutzers:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
  module.exports = {login, guestLogin, logout, validateRegistration, registration}