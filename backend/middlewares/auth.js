module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startWith("Bearer ")) {
    return res.status(401).send({ message: "Authorization required" });
  }

  const token = authorization.replace("Bearer ", "");
  try {
    const payload = jwt.verify(token, "some-secret-key");
  } catch (err) {
    return res.status(401).send({ message: "Authorization required" });
  }

  req.user = payload;

  next();
};
