const { Router } = require("express");
const { check } = require("express-validator");
const { login, googleSignIn } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");

const router = Router();

router.post(
	"/login",
	[
		check("email", "Email is neccesary").isEmail(),
		check("password", "Password in neccesary").notEmpty(),
		validateFields,
	],
	login
);
router.post(
	"/google",
	[check("id_token", "Token is neccesary").notEmpty(), validateFields],
	googleSignIn
);

module.exports = router;
