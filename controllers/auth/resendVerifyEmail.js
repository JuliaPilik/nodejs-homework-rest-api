const { User } = require("../../models/user");
const authSchemas = require("../../schemas/userAuthSchema");
const { HttpError, sendEmail } = require("../../helpers");
require("dotenv").config();
const { SENDGRID_API_KEY, BASE_URL } = process.env;

const resendVerifyEmail = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) {
      throw HttpError(400, "missing required field email");
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(404, "User not found");
    }
    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const verifyEmail = {
      to: email,
      subject: "Verify email",
      html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`,
    };
    await sendEmail(verifyEmail);

    res.json({
      message: "Verify email send success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = resendVerifyEmail;
