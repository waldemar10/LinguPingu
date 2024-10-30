function getUserId(req) {
  const bearerToken = req.headers.authorization;
  const token = bearerToken.split(" ");

  return token[1];
}

module.exports = getUserId;
