const jwt = require("jsonwebtoken");
const User = require("../models/user");

async function validateJWT(req, res, next) {
	const token = req.header("x-token");

	if (!token) {
		return res.status(401).json({
			msg: "There's not token",
		});
	}

	try {
		const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

		//Read user
		const user = await User.findById(uid);

		if (!user) {
			return res.status(401).json({
				msg: "Invalid token - don't exist user",
			});
		}

		//Verify state UID
		if (!user.state) {
			return res.status(401).json({
				msg: "Invalid token - user state false",
			});
		}

		req.user = user;
		next();
	} catch (error) {
		console.log(error);
		return res.status(401).json({
			msg: "Invalid token",
		});
	}
}

module.exports = {
	validateJWT,
};
