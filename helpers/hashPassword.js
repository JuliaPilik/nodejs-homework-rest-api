const bcrypt = require("bcrypt");

const createHashPassword = (password) => {
  const result = bcrypt.hash(password, 10);
  console.log(result);
  return result;
};

module.exports = createHashPassword;
