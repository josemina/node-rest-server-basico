const validateFields = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validateJwt");
const validateRols = require("../middlewares/validate-rols");
const validateFileUpload = require("../middlewares/validateFile");

module.exports = {
	...validateFields,
	...validateJWT,
	...validateRols,
	...validateFileUpload,
};
