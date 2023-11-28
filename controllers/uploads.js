const path = require("path");
const fs = require("fs");
const cloudinary = require("cloudinary").v2;
cloudinary.config(process.env.CLOUDINARY_URL);
const { response } = require("express");
const { uploadFile } = require("../helpers");
const { User, Product } = require("../models");

async function loadFile(req, res = response) {
	try {
		//const name = await uploadFile(req.files, ["txt", "md"], "textos");
		const name = await uploadFile(req.files, undefined, "imgs");

		res.json({
			path: name,
		});
	} catch (msg) {
		res.status(400).json({ msg });
	}
}

async function updateImage(req, res = response) {
	const { id, collection } = req.params;
	let model;

	switch (collection) {
		case "users":
			model = await User.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `User not exist ${id}`,
				});
			}
			break;
		case "products":
			model = await Product.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `Product not exist ${id}`,
				});
			}
			break;

		default:
			return res.status(500).json({ msg: "Forgot this" });
	}

	// Clean images previus
	try {
		if (model.img) {
			//Delete image on server
			const pathImage = path.join(
				__dirname,
				"../uploads",
				collection,
				model.img
			);
			if (fs.existsSync(pathImage)) {
				fs.unlinkSync(pathImage);
			}
		}
	} catch (error) {}

	const name = await uploadFile(req.files, undefined, collection);
	model.img = name;
	await model.save();

	res.json(model);
}
async function showImage(req, res = response) {
	const { id, collection } = req.params;
	let model;

	switch (collection) {
		case "users":
			model = await User.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `User not exist ${id}`,
				});
			}
			break;
		case "products":
			model = await Product.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `Product not exist ${id}`,
				});
			}
			break;

		default:
			return res.status(500).json({ msg: "Forgot this" });
	}

	// Clean images previus
	try {
		if (model.img) {
			//Delete image on server
			const pathImage = path.join(
				__dirname,
				"../uploads",
				collection,
				model.img
			);
			if (fs.existsSync(pathImage)) return res.sendFile(pathImage);
		}
		res.sendFile(path.join(__dirname, "../assets/no-image.jpg"));
	} catch (error) {
		res.json({
			error,
		});
	}
}

async function updateImageCloudinary(req, res = response) {
	const { id, collection } = req.params;
	let model;

	switch (collection) {
		case "users":
			model = await User.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `User not exist ${id}`,
				});
			}
			break;
		case "products":
			model = await Product.findById(id);
			if (!model) {
				return res.status(400).json({
					msg: `Product not exist ${id}`,
				});
			}
			break;

		default:
			return res.status(500).json({ msg: "Forgot this" });
	}

	// Clean images previus

	if (model.img) {
		const nameArr = model.img.split("/");
		const name = nameArr[nameArr.length - 1];

		const [public_id] = name.split(".");
		console.log(public_id);
		cloudinary.uploader.destroy(public_id);
	}
	const { tempFilePath } = req.files.file;
	const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
	model.img = secure_url;
	await model.save();
}

module.exports = {
	loadFile,
	updateImage,
	showImage,
	updateImageCloudinary,
};
