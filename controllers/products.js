const { response } = require("express");
const { Product } = require("../models");

async function getProducts(req, res = response) {
	const { limit = 5, from = 0 } = req.query;
	const query = { state: true };
	const [total, products] = await Promise.all([
		Product.countDocuments(query),
		Product.find(query)
			.populate("user", "name")
			.skip(Number(from))
			.limit(Number(limit)),
	]);
	res.json({ total, products });
}

//obtenerProduct - populate {}
async function getProduct(req, res = response) {
	const { id } = req.params;
	const product = await Product.findById(id).populate("user", "name");
	res.json({ product });
}

async function createProduct(req, res = response) {
	const { state, user, ...body } = req.body;

	const productDB = await Product.findOne({ name: body.name });

	if (productDB) {
		return res.status(400).json({
			msg: `Product ${productDB.name}, exist`,
		});
	}

	//Generate data
	const data = {
		...body,
		name: body.name.toUpperCase(),
		user: req.user._id,
	};

	const product = new Product(data);
	//Save on DB
	await product.save();

	res.status(201).json(product);
}

//updateCateogorie
async function updateProduct(req, res = response) {
	const { id } = req.params;
	const { state, user, ...data } = req.body;

	if (data.name) data.name = data.name.toUpperCase();

	data.user = req.user._id;

	const product = await Product.findByIdAndUpdate(id, data, {
		new: true,
	});
	res.json(product);
}
//deleteProduct
async function deleteProduct(req, res = response) {
	const { id } = req.params;
	const productDel = await Product.findByIdAndUpdate(
		id,
		{ state: false },
		{ new: true }
	);
	res.json(productDel);
}

module.exports = {
	createProduct,
	getProducts,
	getProduct,
	updateProduct,
	deleteProduct,
};
