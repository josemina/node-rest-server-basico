const validateFields = require("../middlewares/validate-fields");
const validateJWT = require("../middlewares/validateJwt");
const validateRols = require("../middlewares/validate-rols");

module.exports = {
	...validateFields,
	...validateJWT,
	...validateRols,
};
