const nodemailer = require("nodemailer");
const { google } = require("googleapis");
require("dotenv").config();

// * Allow self-signed certificates
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"; // ! Remove this in production

// * Get the credentials from the environment variables
const user = process.env.NOREPLY_EMAIL;
const pass = process.env.NOREPLY_PASSWORD;
const clientID = process.env.NOREPLY_OAUTH_CLIENT_ID;
const clientSecret = process.env.NOREPLY_OAUTH_CLIENT_SECRET;
const refreshToken = process.env.NOREPLY_OAUTH_REFRESH_TOKEN;

// * Create a new OAuth2 client
const OAuth2 = google.auth.OAuth2;

// * Create a new OAuth2 client with the credentials
const oauth2Client = new OAuth2(
  clientID,
  clientSecret,
  "https://developers.google.com/oauthplayground"
);

// * Set the refresh token
oauth2Client.setCredentials({
  refresh_token: refreshToken,
});

async function createTransporter() {
  try {
    // * Get the access token
    const accessToken = await oauth2Client.getAccessToken();

    // * If getting the access token fails, throw an error
    if (!accessToken) {
      throw new Error(
        "Failed to get access token. The refresh token might be invalid."
      );
    }

    // * Create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: user,
        clientId: clientID,
        clientSecret: clientSecret,
        refreshToken: refreshToken,
        accessToken: accessToken,
      },
    });

    transporter.close();

    return transporter;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

/**
 * * Generates MailOptions for the verification mail
 * @param {string} email
 * @param {string} token
 * @returns
 */
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

/**
 * * Sends a mail
 * @param {string} email - The email address of the user
 * @param {string} token - The token to verify the email address
 */
function sendMail(email, token) {
  createTransporter()
    .then((transporter) => {
      const mailOptions = mailOptions_verifyMail(email, token);
      console.log(transporter);
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
