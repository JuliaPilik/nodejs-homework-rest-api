const { User } = require("../../models/user");
const authSchemas = require("../../schemas/userAuthSchema");
const { HttpError, sendEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");

require("dotenv").config();
const { SENDGRID_API_KEY, BASE_URL } = process.env;

const registered = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      throw HttpError(409, "Email in use");
    }

    const { error } = authSchemas.registerSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const result = await User.create({
      ...req.body,
      password: hashPassword,
      avatarURL,
      verificationToken,
    });
    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`,
    };
    await sendEmail(verifyEmail);

    res.status(201).json({
      email: result.email,
      password: result.password,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = registered;
