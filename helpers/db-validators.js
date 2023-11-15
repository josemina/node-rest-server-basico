const { Categorie, Role, User, Product } = require("../models");

async function isValidRol(rol = "") {
	const existRol = await Role.findOne({ rol });
	if (!existRol) {
		throw new Error(`Rol ${rol} not exist`);
	}
}

async function existEmail(email = "") {
	const existEmail = await User.findOne({ email });
	if (existEmail) {
		throw new Error(`Email exist on DB`);
	}
}

async function existUserById(id) {
	const existUser = await User.findById(id);
	if (!existUser) {
		throw new Error(`ID ${id} not exist on DB`);
	}
}
async function existCategorieById(id) {
	const existCategorie = await Categorie.findById(id);
	if (!existCategorie) {
		throw new Error(`ID ${id} not exist on DB`);
	}
}
async function existProductById(id) {
	const existProduct = await Product.findById(id);
	if (!existProduct) {
		throw new Error(`ID ${id} not exist on DB`);
	}
}
module.exports = {
	isValidRol,
	existEmail,
	existUserById,
	existCategorieById,
	existProductById,
};
