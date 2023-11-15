const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");
const {
	createCategorie,
	getCategories,
	getCategorie,
	updateCategorie,
	deleteCategorie,
} = require("../controllers/cats");
const { existCategorieById } = require("../helpers/db-validators");

const router = Router();

//Get all categories - public
router.get("/", getCategories);

//Get a categorie for ID - public
router.get(
	"/:id",
	[
		check("id", "Not is mongoID").isMongoId(),
		check("id").custom(existCategorieById),
	],
	validateFields,
	getCategorie
);

//Create a categorie for ID - private
router.post(
	"/",
	[
		validateJWT,
		check("name", "Name is neccesary").notEmpty(),
		validateFields,
	],
	createCategorie
);

//Update a categorie for ID - private
router.put(
	"/:id",
	[
		validateJWT,
		check("name", "Name is neccesary").notEmpty(),
		check("id").custom(existCategorieById),
		validateFields,
	],
	updateCategorie
);

//Delete a categorie for ID - private
router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		check("id", "Not is mongoID").isMongoId(),
		check("id").custom(existCategorieById),
		validateFields,
	],
	deleteCategorie
);

module.exports = router;
