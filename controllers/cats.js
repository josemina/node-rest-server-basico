const { response } = require("express");
const { Categorie } = require("../models");

async function getCategories(req, res = response) {
	const { limit = 5, from = 0 } = req.query;
	const query = { state: true };
	const [total, categories, populate] = await Promise.all([
		Categorie.countDocuments(query),
		Categorie.find(query)
			.populate("user", "name")
			.skip(Number(from))
			.limit(Number(limit)),
	]);
	res.json({ total, categories, populate });
}

//obtenerCategorie - populate {}
async function getCategorie(req, res = response) {
	const { id } = req.params;
	const categorie = await Categorie.findById(id).populate("user", "name");
	res.json({ categorie });
}

async function createCategorie(req, res = response) {
	const name = req.body.name.toUpperCase();
	const categorieDB = await Categorie.findOne({ name });

	if (categorieDB) {
		return res.status(400).json({
			msg: `Categorie ${categorieDB.name}, exist`,
		});
	}

	//Generate data
	const data = {
		name,
		user: req.user._id,
	};

	const categorie = new Categorie(data);

	//Save on DB
	await categorie.save();

	res.status(201).json(categorie);
}

//updateCateogorie
async function updateCategorie(req, res = response) {
	const { id } = req.params;
	const { state, user, ...data } = req.body;

	data.name = data.name.toUpperCase();
	data.user = req.user._id;

	const categorie = await Categorie.findByIdAndUpdate(id, data, {
		new: true,
	});
	res.json(categorie);
}
//deleteCategorie
async function deleteCategorie(req, res = response) {
	const { id } = req.params;
	const categorieDel = await Categorie.findByIdAndUpdate(
		id,
		{ state: false },
		{ new: true }
	);
	res.json(categorieDel);
}

module.exports = {
	createCategorie,
	getCategories,
	getCategorie,
	updateCategorie,
	deleteCategorie,
};
