const { Contact } = require("../../models/contact");
const schemas  = require("../../schemas/contactSchema");
const { HttpError } = require("../../helpers");

const getAll = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.find({ owner });
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = getAll;