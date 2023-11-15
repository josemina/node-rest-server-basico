const { Router } = require("express");
const { check } = require("express-validator");
const {
	isValidRol,
	existEmail,
	existUserById,
} = require("../helpers/db-validators");

const {
	validateFields,
	validateJWT,
	isAdminRole,
	hasRole,
} = require("../middlewares");
const {
	usersGet,
	usersPut,
	usersPost,
	usersDelete,
	usersPatch,
} = require("../controllers/users.js");

const router = Router();

router.get("/", usersGet);
router.put(
	"/:id",
	[
		check("id", "Invalid ID").isMongoId(),
		check("id").custom(existUserById),
		check("rol").custom(isValidRol),
	],
	validateFields,
	usersPut
);
router.post(
	"/",
	[
		check("name", "Name is necessary").notEmpty(),
		check("password", "Password is necessary").isLength({ min: 6 }),
		check("email", "Email invalid").isEmail(),
		check("email", "Email invalid").custom(existEmail),
		//check("rol", "No es un rol válido").isIn(["ADMIN_ROLE", "USER_ROLE"]),
		check("rol").custom(isValidRol),
		validateFields,
	],
	usersPost
);
router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		hasRole("ADMIN_ROLE", "USER_ROLE"),
		check("id", "Invalid ID").isMongoId(),
		check("id").custom(existUserById),
		validateFields,
	],
	usersDelete
);
router.patch("/", usersPatch);

module.exports = router;
