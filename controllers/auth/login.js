const { User } = require("../../models/user");
const authSchemas = require("../../schemas/userAuthSchema");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const { createToken } = require("../../middlewares/index");

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const { error } = authSchemas.registerSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
      throw HttpError(401, "Email or password is wrong");
    }

    const token = createToken(user.id);
    await User.findByIdAndUpdate(user._id, { token });
    res.status(200).json({
      token: token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = login;
