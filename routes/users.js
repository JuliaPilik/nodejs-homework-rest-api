const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/auth/index");
const { authenticate } = require("../middlewares/index");

router.post("/register", ctrl.registered);
router.post("/login", ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);

module.exports = router;
