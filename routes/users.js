const express = require("express");
const router = express.Router();

const ctrl = require("../controllers/auth/index");
const { authenticate, upload } = require("../middlewares/index");

router.post("/register", ctrl.registered);
router.get("/verify/:verificationToken", ctrl.verifyEmail);
router.post("/verify/", ctrl.resendVerifyEmail);
router.post("/login", ctrl.login);
router.get("/current", authenticate, ctrl.getCurrent);
router.post("/logout", authenticate, ctrl.logout);
router.patch("/avatars", authenticate, upload.single("avatar"), ctrl.updateAvatar);


module.exports = router;
