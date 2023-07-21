const { User } = require("../../models/user");
const authSchemas = require("../../schemas/userAuthSchema");
const { HttpError } = require("../../helpers");

const getCurrent = async (req, res, next) => {
  try {
    const { email } = req.user;
    res.json({
      email,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = getCurrent;
