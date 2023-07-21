const { Contact } = require("../../models/contact");
const schemas = require("../../schemas/contactSchema");
const { HttpError } = require("../../helpers");

const add = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { error } = schemas.addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await Contact.create({ ...req.body, owner });

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = add;
