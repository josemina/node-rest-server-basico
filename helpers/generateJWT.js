const jwt = require("jsonwebtoken");

async function generateJWT(uid = "") {
	return new Promise((resolve, reject) => {
		const payload = { uid };
		jwt.sign(
			payload,
			process.env.SECRETORPRIVATEKEY,
			{
				expiresIn: "4h",
			},
			(err, token) => {
				if (err) {
					reject("Token no generado");
				} else {
					resolve(token);
				}
			}
		);
	});
}

module.exports = {
	generateJWT,
};
