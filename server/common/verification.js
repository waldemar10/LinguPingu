const jwt = require("jsonwebtoken");

function getUserId(req) {
  const token = req.cookies.token; 
  if (!token) {
    throw new Error("Authentication token not found");
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); 
    return decoded.userId;
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

module.exports = getUserId;