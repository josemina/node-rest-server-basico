const { response, request } = require("express");

function isAdminRole(req, res = response, next) {
	if (!req.user) {
		return res.status(500).json({
			msg: "Want verify role with out validate token",
		});
	}
	const { rol, name } = req.user;
	if (rol !== "ADMIN_ROLE") {
		return res.status(401).json({
			msg: `${name} is not admin`,
		});
	}

	next();
}

function hasRole(...rols) {
	return (req, res, next) => {
		if (!req.user) {
			return res.status(500).json({
				msg: "Want verify role with out validate token",
			});
		}

		if (!rols.includes(req.user.rol)) {
			return res.status(401).json({
				mgs: `Services need a rol like: ${rols}`,
			});
		}
		next();
	};
}

module.exports = {
	isAdminRole,
	hasRole,
};
