const express = require("express");
const webPush = require("web-push");
const base64url = require("base64url");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./connectdb");
const User = require("./model/User");
const helmet = require('helmet');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const vocabularyController = require("./controllers/vocabularyController");
const vocabularyCollectionController = require("./controllers/vocabularyCollectionController");
const lessonController = require("./controllers/lessonController");
const grammarController = require("./controllers/grammarController");
const userController = require("./controllers/userController");
const tagController = require("./controllers/tagController");
const authController = require("./controllers/AuthController");
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
  'https://lingupingu.waljus.de'],
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
    console.log("No token found");
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      console.log("Token verification failed:", err);
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
    httpOnly: process.env.NODE_ENV === 'production',
    secure: process.env.NODE_ENV === 'production',
    sameSite:  process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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
app.post("/login", authController.login);
app.post("/guestLogin", authController.guestLogin);
app.post("/logout", authController.logout);
app.post("/registration", authController.registration);
app.post("/validateRegistration", authController.validateRegistration);
app.get("/user", authenticateToken, userController.getUser);
app.post("/updateUser", authenticateToken, userController.updateUser);
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