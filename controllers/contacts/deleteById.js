const { Contact } = require("../../models/contact");
const schemas = require("../../schemas/contactSchema");
const { HttpError } = require("../../helpers");

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = deleteById;