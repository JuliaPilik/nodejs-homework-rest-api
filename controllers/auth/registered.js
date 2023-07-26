const { User } = require("../../models/user");
const authSchemas = require("../../schemas/userAuthSchema");
const { HttpError } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
//const  createHashPassword  = require("../../helpers/hashPassword");

const registered = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      // return res.status(409).json({ message: "Email in use" });
      throw HttpError(409, "Email in use");
    }

    const { error } = authSchemas.registerSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const result = await User.create({ ...req.body, password: hashPassword , avatarURL});
    res.status(201).json({
      email: result.email,
      password: result.password,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registered;
