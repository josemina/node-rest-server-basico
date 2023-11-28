const { Router } = require("express");
const { check } = require("express-validator");
const {
	loadFile,
	updateImage,
	showImage,
	updateImageCloudinary,
} = require("../controllers/uploads");
const { validateFields, validateFileUpload } = require("../middlewares");
const { collectionsAlloweds } = require("../helpers");

const router = Router();

router.post("/", validateFileUpload, loadFile);

router.put(
	"/:collection/:id",
	[
		validateFileUpload,
		check("id", "Not is mongoId").isMongoId(),
		check("collection").custom((c) =>
			collectionsAlloweds(c, ["users", "products"])
		),
		validateFields,
	],
	updateImageCloudinary
	//updateImage
);

router.get(
	"/:collection/:id",
	[
		check("id", "Not is mongoId").isMongoId(),
		check("collection").custom((c) =>
			collectionsAlloweds(c, ["users", "products"])
		),
		validateFields,
	],
	showImage
);
module.exports = router;
