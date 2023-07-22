const express = require("express");

const router = express.Router();
const ctrl = require("../../controllers/contacts/index");
const { authenticate } = require("../../middlewares");

router.get("/",authenticate, ctrl.getAll);

router.get("/:contactId", authenticate, ctrl.getById);

router.post("/", authenticate,ctrl.add);

router.delete("/:contactId",authenticate, ctrl.deleteById);

router.put("/:contactId", authenticate, ctrl.updateById);
router.patch("/:contactId/favorite", authenticate, ctrl.updateStatusContact);

module.exports = router;
