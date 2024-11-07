const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

// * Umgebungsvariablen
const user = process.env.NOREPLY_EMAIL;
const pass = process.env.NOREPLY_PASSWORD;
const clientID = process.env.NOREPLY_OAUTH_CLIENT_ID;
const clientSecret = process.env.NOREPLY_OAUTH_CLIENT_SECRET;
const refreshToken = process.env.NOREPLY_OAUTH_REFRESH_TOKEN;

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(clientID, clientSecret, "https://developers.google.com/oauthplayground");

oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

async function createTransporter() {
  try {
    const accessToken = await oauth2Client.getAccessToken();

    if (!accessToken.token) {
      throw new Error("Failed to get access token. The refresh token might be invalid.");
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: user,
        clientId: clientID,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken.token, // Nutze accessToken.token
      },
    });

    return transporter;
  } catch (err) {
    console.error("Error while creating transporter:", err);
    throw err;
  }
}

function mailOptions_verifyMail(email, token) {
  return {
    from: user,
    to: email,
    subject: "Lingupingu - Verify your email",
    html: `<h1>Welcome to Lingupingu</h1>
            <p>Click here to verify your email: <a href="http://localhost:5000/verify/${token}">http://localhost:5000/verify/${token}</a></p>
            <br>
            <p>Please do not reply to this email.</p>`,
  };
}

function sendMail(email, token) {
  createTransporter()
    .then((transporter) => {
      const mailOptions = mailOptions_verifyMail(email, token);
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.error("Error while sending mail:", err);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    })
    .catch((err) => {
      console.error("Error while creating transporter:", err);
    });
}

module.exports = { sendMail };
