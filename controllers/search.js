const { response } = require("express");
const { ObjectId } = require("mongoose").Types;
const { User, Product, Categorie, Role } = require("../models/");

const colectionsAllowes = ["users", "categorie", "products", "rols"];

async function serchUsers(term = "", res = response) {
	const isMondoID = ObjectId.isValid(term);

	if (isMondoID) {
		const user = await User.findById(term);
		return res.json({
			results: user ? [user] : [],
		});
	}
	const regex = new RegExp(term, "i");
	const countUsers = await User.count({
		$or: [{ name: regex }, { email: regex }],
		$and: [{ state: true }],
	});

	const users = await User.find({
		$or: [{ name: regex }, { email: regex }],
		$and: [{ state: true }],
	});

	res.json({
		results: users,
		countUsers,
	});
}

async function serchProducts(term = "", res = response) {
	const isMondoID = ObjectId.isValid(term);

	if (isMondoID) {
		const product = await Product.findById(term).populate(
			"categorie",
			"name"
		);
		return res.json({
			results: product ? [product] : [],
		});
	}
	const regex = new RegExp(term, "i");

	const countProducts = await Product.count({ name: regex, state: true });

	const products = await Product.find({ name: regex, state: true }).populate(
		"categorie",
		"name"
	);

	res.json({
		results: products,
		countProducts,
	});
}
async function serchCategories(term = "", res = response) {
	const isMondoID = ObjectId.isValid(term);
	if (isMondoID) {
		const categorie = await Categorie.findById(term);
		return res.json({
			results: categorie ? [categorie] : [],
		});
	}
	const regex = new RegExp(term, "i");

	const countCategories = await Categorie.count({ name: regex, state: true });
	const categories = await Categorie.find({ name: regex, state: true });

	res.json({
		results: categories,
		countCategories,
	});
}

async function search(req, res = response) {
	const { colection, term } = req.params;
	if (!colectionsAllowes.includes(colection)) {
		return res.status(400).json({
			msg: `colectons allow is ${colectionsAllowes}`,
		});
	}

	switch (colection) {
		case "users":
			serchUsers(term, res);
			break;
		case "categorie":
			serchCategories(term, res);
			break;

		case "products":
			serchProducts(term, res);
			break;

		case "rols":
			serchRols(term, res);
		default:
			res.status(500).json({
				msg: `Search with out term`,
			});
	}
}

module.exports = search;
