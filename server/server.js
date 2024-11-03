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
// * Controllers
/* const {
  getGrammarData,
  insertGrammarData,
} = require("./controllers/grammarController"); */

const Grammar = require("./model/Grammar");
const vocabularyController = require("./controllers/vocabularyController");
const vocabularyCollectionController = require("./controllers/vocabularyCollectionController");
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

/* !For future database */
/* Generate unique keys for every user */
/* function generateVapidKeys() {
  return webPush.generateVAPIDKeys();
}
const { publicKey, privateKey } = generateVapidKeys(); */ // Save these keys in the database (MongoDB)

/* Parse incoming request bodies in JSON Format. 
This is more convenient to work with */
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

app.use(express.json());

/* Parse incoming request bodies with URL-encoded data packages. 
E.g data from HTML forms */
app.use(express.urlencoded({ extended: false }));
/* Enables Cross-Origin Resource Sharing (CORS) */
app.use(cors());

/* app.get('/home/:lang?', (req, res) => {
  const lang = req.params.lang || 'default'; 

  res.sendFile();
}); */

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

// Dummy-Benutzerdaten
const users = [{ username: "user", password: "1" }];
/* Just to show login info */
app.get("/users", (req, res) => {
  res.json(users);
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
    if (user) {
      console.log("Comparing password");
      user.comparePassword(password, function (err, isMatch) {
        if (err) {
          console.error("Fehler beim Überprüfen des Passworts:", err);
          return res.status(500).json({ success: false, message: err });
        }
        if (isMatch) {
          console.info("Login erfolgreich");
          const userObject = user.toObject();
          const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });
          delete userObject.password;
          return res.status(200).json({
            message: "Login erfolgreich!",
            user: userObject,
            token: token,
          });
        } else {
          console.error("Login fehlgeschlagen. Passwort stimmt nicht überein.");
          errors.password = "Ungültiges Passwort.";
          return res.status(401).json({ errors });
        }
      });
    }
  });
});

/**
 * * Registriert einen neuen Benutzer.
 * Überprüft, ob der Benutzername bereits existiert.
 * Überprüft, ob die Passwörter übereinstimmen.
 *
 *
 * @route POST /registration
 * @group User
 */
// ? Maybe not needed anymore
/* app.post("/registration", (req, res) => {
  console.info("Registrierungsanfrage erhalten.");

  const {
    username,
    email,
    password,
    confirmPassword,
    country,
    nativeLanguage,
    learningLanguages,
  } = req.body;

  // * Überprüft, ob der Benutzername bereits existiert.
  User.findOne({ username: username })
    .then((user) => {
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

      // * Sends a verification email to the user.
      console.log(email +" token : "+verificationToken)
      sendMail(email, verificationToken);
      
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

      // * Erstellt einen neuen Benutzer.
      return User.create({
        username: username,
        email: email,
        password: password,
        country: country,
        nativeLanguage: nativeLanguage,
        learningLanguages: learningLanguages,
        verificationToken: verificationToken,
      });
    })
    .then(() => {
      console.log("Registrierung erfolgreich.");
      return res
        .status(201)
        .json({ success: true, message: "Registrierung erfolgreich." });
    })
    .catch((error) => {
      console.error("Fehler beim Registrieren des Benutzers:", error);
      return res.status(500).json({ success: false, message: error });
    });
}); */

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
 * * Updates the user's biography.
 * @route PUT /biography
 * @group User
 * @param {string} username.body.required - The username of the user.
 * @param {string} biography.body.required - The biography of the user.
 * @returns {object} 200 - Success message
 * @returns {Error} 500 - Internal server error
 * @returns {Error} 404 - User not found
 */
app.post("/biography", async (req, res) => {
  console.log("Biografie aktualisieren");

  try {
    const { username, biography } = req.body;

    console.log("Benutzername:", username);
    console.log("Biografie:", biography);

    const user = await User.findOne({ username });

    if (!user) {
      console.log("Benutzer nicht gefunden");
      return res
        .status(404)
        .json({ success: false, message: "Benutzer nicht gefunden" });
    }

    await User.findOneAndUpdate(
      { username },
      {
        biography: biography,
      }
    );

    const updatedUser = await User.findOne({ username });

    console.log("Updated user:", updatedUser);

    console.log("Biografie erfolgreich aktualisiert");
    return res.status(200).json({
      success: true,
      message: "Biografie erfolgreich aktualisiert",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Fehler beim Aktualisieren der Biografie", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * * Update the users data.
 * **/
app.post("/updateUser", async (req, res) => {
  try {
    const {
      userId,
      username,
      biography,
      email,
      country,
      nativeLanguagev,
      learningLanguages,
    } = req.body;

    const userWithNewUsername = username
      ? await User.findOne({ username: username })
      : null;

    if (userWithNewUsername) {
      console.log("New username is already taken");
      return res
        .status(400)
        .json({ success: false, message: "New username is already taken" });
    }

    const user = await User.findById(userId);

    if (!user) {
      console.log("User not found");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    if (!email || !emailRegex.test(email)) {
      console.log("Invalid e-mail address");
      return res
        .status(400)
        .json({ success: false, message: "Invalid e-mail address" });
    }

    await User.findByIdAndUpdate(userId, {
      username: username,
      email: email,
      biography: biography,
      country: country,
      nativeLanguage: nativeLanguagev,
      learningLanguages: learningLanguages,
    });
    const updatedUserFromDB = await User.findById(userId);

    return res.status(200).json({
      success: true,
      message: "Update user successfully",
      user: updatedUserFromDB,
    });
  } catch (error) {
    console.error("Error during user update", error);
    return res.status(500).json({ success: false, message: error.message });
  }
});

/**
 *
 * @route GET /getGrammarData
 * @group Grammar
 */
// * Insert grammar data into database
/* insertGrammarData(EverydayLife);
insertGrammarData(TimePhrases); */
// * Get grammar data from database
app.get("/getGrammarData", async (req, res) => {
  try {
    const everydayLifeData = await Grammar.find({ category: "Everyday Life" });
    const timePhrasesData = await Grammar.find({ category: "Time Phrases" });

    if (!everydayLifeData || !timePhrasesData) {
      throw new Error("Not all data could be retrieved.");
    }

    res.json({
      EverydayLife: everydayLifeData,
      TimePhrases: timePhrasesData,
    });
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/lessonProgress/:userId/:lessonId", async (req, res) => {
  const { userId, lessonId } = req.params;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if progress data exists
    if (!user.progressGrammar) {
      return res.status(404).json({ error: "progressGrammar not found" });
    }

    // Check if the lesson already exists in the progress
    const existingLessonIndex = user.progressGrammar.lessons.findIndex(
      (lesson) =>
        lesson.lessonId !== null && lesson.lessonId.toString() === lessonId
    );

    // * If the lesson does not exist, add it
    if (existingLessonIndex === -1) {
      user.progressGrammar.lessons.push({
        lessonId: lessonId,
        tasks: [],
        completed: false,
      });

      const lessonProgress = user.progressGrammar.lessons[0];
      try {
        await user.save();
        return res.json(lessonProgress);
      } catch (error) {
        console.error("Fehler beim Speichern des Benutzers:", error);
        return res.status(500).json({ error: "Interner Serverfehler" });
      }
    }

    const lessonProgress = user.progressGrammar.lessons[existingLessonIndex];

    res.json(lessonProgress);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/updateLessonCompletion", async (req, res) => {
  const { userId, lessonId, taskId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.progressGrammar) {
      return res.status(404).json({ error: "progressGrammar not found" });
    }

    const existingLessonIndex = user.progressGrammar.lessons.findIndex(
      (lesson) =>
        lesson.lessonId !== null && lesson.lessonId.toString() === lessonId
    );

    if (existingLessonIndex === -1) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    user.progressGrammar.lessons[existingLessonIndex].completed = true;

    // Speichern Sie die Aktualisierung in der Datenbank
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put("/removeLessonCompletion", async (req, res) => {
  const { userId, lessonId, taskId } = req.body;

  try {
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (!user.progressGrammar) {
      return res.status(404).json({ error: "progressGrammar not found" });
    }

    const existingLessonIndex = user.progressGrammar.lessons.findIndex(
      (lesson) =>
        lesson.lessonId !== null && lesson.lessonId.toString() === lessonId
    );

    if (existingLessonIndex === -1) {
      return res.status(404).json({ error: "Lessons not found" });
    }

    user.progressGrammar.lessons[existingLessonIndex].completed = false;

    // Speichern Sie die Aktualisierung in der Datenbank
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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

/**
 * @route GET /api
 */
app.get("/api", (req, res) => {
  res.json({
    users: ["user1 from backend", "user2 from backend", "user3 from backend"],
  });
});
