const jwt = require("jsonwebtoken");
require("dotenv").config();

const { SECRET_KEY } = process.env;

const createToken = (idUser) => {
  const payload = {
    id: idUser,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "6h" });
  return token;
};

module.exports = createToken;
