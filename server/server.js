const express = require("express");
const webPush = require("web-push");
const base64url = require("base64url");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./connectdb");
const User = require("./model/User");
const { sendMail } = require("./controllers/MailController");
const crypto = require("crypto");
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const vocabularyController = require("./controllers/vocabularyController");
const vocabularyCollectionController = require("./controllers/vocabularyCollectionController");
const lessonController = require("./controllers/lessonController");
const grammarController = require("./controllers/grammarController");
const userController = require("./controllers/userController");
const tagController = require("./controllers/tagController");

const app = express();
const PORT = process.env.PORT || 5000; 

// VAPID keys
const publicKey = process.env.VAPID_PUBLIC_KEY;
const privateKey = process.env.VAPID_PRIVATE_KEY;

if (!publicKey || !privateKey) {
  console.error(
    "VAPID keys are missing. Make sure you have set them in the environment variables."
  );
  process.exit(1); // Exit with an error code
}

webPush.setVapidDetails("mailto:your@email.com", publicKey, privateKey);

const corsOptions = {
  origin: ['http://localhost:3000',
  'https://lingupingu.onrender.com'],
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      imgSrc: ["'self'", "https://trustedimage.com"],
      scriptSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
    },
  })
);
app.use(cookieParser());
app.use(express.json());

/* Parse incoming request bodies with URL-encoded data packages. 
E.g data from HTML forms */
app.use(express.urlencoded({ extended: false }));


const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: "Zugriff gewährt" });
});

app.post("/subscribe", (req, res) => {
  const { endpoint, keys } = req.body;
  const { auth, p256dh } = keys;

  // Check if the p256dh value is the correct length
  // Decode base64url-encoded p256dh value
  try {
    const decodedP256dh = base64url.decode(p256dh);
    console.log("Decoded p256dh:", decodedP256dh);
  } catch (error) {
    console.error("Error decoding p256dh:", error);
    res.status(500).json({ error: "Internal server error" });
    return;
  }

  res.status(200).json({ message: "Subscription received" });
});
app.post("/refreshToken", authenticateToken, (req, res) => {
  if (!req.user || !req.user.userId) {
    return res.status(401).json({ error: "Not authorized to refresh token" });
  }
  const userId = req.user.userId;
  const newToken = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.cookie('token', newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict',
    maxAge: 3600000, // 1 Stunde
  });
  res.json({ success: true, message: "Token refreshed" });
});
app.post("/send-notification", (req, res) => {
  const { subscription, payload } = req.body;

  webPush
    .sendNotification(subscription, JSON.stringify(payload))
    .then(() => {
      res.status(200).json({ message: "Push notification sent" });
    })
    .catch((error) => {
      console.error("Error sending push notification:", error);
      res.status(500).json({ error: "Internal server error" });
    });
});

// * Baut die Verbindung zur Datenbank auf.
connectDB();
// * Connect to MongoDB and check if server is running successfully
mongoose.connection.once("open", () => {
  console.log("Connected to Database");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // Start the server
});



/**
 * * Loggt einen Benutzer ein.
 * Überprüft, ob der Benutzername und das Passwort übereinstimmen.
 *
 * @route POST /login
 * @group User
 */
app.post("/login", async (req, res) => {
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
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict', 
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
});
app.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
  });
  res.status(200).json({ message: "Logged out successfully" });
});


app.post("/validateRegistration", async (req, res) => {
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
});

app.post("/registration", async (req, res) => {
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
    await sendMail(email, verificationToken);
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
});

/**
 * * Verifiziert einen Benutzer.
 * Überprüft, ob der Verifizierungs-Token existiert.
 * Setzt den Benutzer auf verifiziert.
 * Löscht den Verifizierungs-Token.
 * @route GET /verify/:token
 * @group User
 * @param {string} token.path.required - The verification token.
 */
app.get("/verify/:token", async function (req, res) {
  try {
    var token = req.params.token;
    var user = await User.findOne({ verificationToken: token });

    if (!user) {
      console.log("Dieser Verifizierungs-Token existiert nicht.");
      return res.status(400).json({
        success: false,
        message: "Dieser Verifizierungs-Token existiert nicht.",
      });
    }

    user.verified = true;
    user.verificationToken = undefined;
    await user.save();

    console.log("Benutzer erfolgreich verifiziert.");
    return res
      .status(200)
      .json({ success: true, message: "Benutzer erfolgreich verifiziert." });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Ein Fehler ist aufgetreten." });
  }
});

/**
 * * Update the users data.
 * **/
app.post("/updateUser", authenticateToken, async (req, res) => {
  try {
    const { username, biography, email, country, nativeLanguage, learningLanguages } = req.body;
    const userId = req.user.userId; 

    if (username) {
      const newUsernameExist = await User.findOne({ username });
      if (newUsernameExist) {
        return res.status(400).json({ success: false, message: "Username already taken" });
      }
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!email || !emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: "Invalid e-mail address" });
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email, biography, country, nativeLanguage, learningLanguages },
      { new: true }
    );

    return res.status(200).json({ success: true, message: "User updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error during user update:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});
app.get("/user", authenticateToken, userController.getUser);
app.post("/biography", authenticateToken, userController.updateBiography);
app.get("/getGrammarData",authenticateToken, grammarController.getGrammarData);
app.get("/lessonProgress", authenticateToken, lessonController.getLessonProgress);
app.put("/updateLessonCompletion", authenticateToken, lessonController.updateLessonCompletion);
app.put("/removeLessonCompletion", authenticateToken, lessonController.removeLessonCompletion);
//Vocabulary Routes
app.get("/getAllVocabulary", vocabularyController.getAll);
app.get("/getFilteredVocabulary", vocabularyController.getFilteredVocabulary);
app.post("/createVocabulary", vocabularyController.createVocabulary);
app.post("/deleteVocabulary", vocabularyController.deleteVocabulary);
app.post("/updateVocabulary", vocabularyController.updateVocabulary);

app.get("/getAllCollections", vocabularyCollectionController.getAll);
app.get(
  "/getFilteredCollections",
  vocabularyCollectionController.getFilteredCollection
);
app.post("/createCollection", vocabularyCollectionController.createCollection);
app.post("/deleteCollection", vocabularyCollectionController.deleteCollection);
app.post("/updateCollection", vocabularyCollectionController.updateCollection);

app.get("/getAllTags", tagController.getAll);
app.post("/createTag", tagController.createTag);
