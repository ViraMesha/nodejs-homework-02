const jwt = require("jsonwebtoken");
const { HttpError } = require("../helpers");
const { User } = require("../models/user");

const { SECRET_KEY } = process.env;

const authentificate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" "); //  take the token from the Authorization headers
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized"));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY); // checks the token for validity and if the validation was successful, get the user's id from the token
    const user = await User.findById(id); // Find a user in the database by this id
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized")); // no user with that id exists or tokens don't match
    }
    req.user = user; //  the user exists and the token matches what is in the database, write his data to req.user
    next(); // call the next() method
  } catch {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authentificate;
