const { User } = require("../../models/user");
const authSchemas = require("../../schemas/userAuthSchema");

const logout = async (req, res) => {
  try {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.status(204).json({});
  } catch (error) {
    next(error);
  }
};

module.exports = logout;
