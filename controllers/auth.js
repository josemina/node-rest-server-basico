const { response, json } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/generateJWT");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req, res = response) => {
	const { email, password } = req.body;

	try {
		//Verify email exits
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({
				mgs: "User / Password incorretcts - email ",
			});
		}

		//User is active
		if (!user.state) {
			return res.status(400).json({
				msg: "User inactive",
			});
		}

		//Verify password
		const validPassword = bcryptjs.compareSync(password, user.password);
		if (!validPassword) {
			return res.status(400).json({
				mgs: "User / Password incorretcts - password ",
			});
		}

		// Generate JWT
		const token = await generateJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).json({
			msg: "Hable con el admnistrador",
		});
	}
};

const googleSignIn = async (req, res = response) => {
	const { id_token } = req.body;

	try {
		const { name, picture, email } = await googleVerify(id_token);
		let user = await User.findOne({ email });

		if (!user) {
			const data = {
				name,
				email,
				password: ":P",
				picture,
				google: true,
				rol: "USER_ROLE",
			};
			user = new User(data);
			await user.save();
		}

		// Si el usuario en DB
		if (!user.state) {
			return res.status(401).json({
				msg: "User blocked",
			});
		}
		// Generate JWT
		const token = await generateJWT(user.id);

		res.json({
			user,
			token,
		});
	} catch (error) {
		res.status(400).json({
			ok: false,
			msg: "No verify token",
			error,
		});
	}
};

module.exports = {
	login,
	googleSignIn,
};
