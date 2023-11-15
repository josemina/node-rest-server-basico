const { Router } = require("express");
const { check } = require("express-validator");
const { validateJWT, validateFields, isAdminRole } = require("../middlewares");
const {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
} = require("../controllers/products");
const {
	existProductById,
	existCategorieById,
} = require("../helpers/db-validators");

const router = Router();

//Get all Products - public
router.get("/", getProducts);

//Get a Product for ID - public
router.get(
	"/:id",
	[
		check("id", "Not is mongoID").isMongoId(),
		check("id").custom(existProductById),
	],
	validateFields,
	getProduct
);

//Create a Product for ID - private
router.post(
	"/",
	[
		validateJWT,
		check("name", "Name is neccesary").notEmpty(),
		check("categorie", "Isn't MongoId").isMongoId(),
		check("categorie").custom(existCategorieById),
		validateFields,
	],
	createProduct
);

//Update a Product for ID - private
router.put(
	"/:id",
	[
		validateJWT,
		check("categorie", "Isn't MongoId").isMongoId(),
		check("id").custom(existProductById),
		validateFields,
	],
	updateProduct
);

//Delete a Product for ID - private
router.delete(
	"/:id",
	[
		validateJWT,
		isAdminRole,
		check("id", "Isn't mongoID").isMongoId(),
		check("id").custom(existProductById),
		validateFields,
	],
	deleteProduct
);

module.exports = router;
