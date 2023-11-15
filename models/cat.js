const { Schema, model } = require("mongoose");

const CategorieShema = Schema({
	name: {
		type: String,
		required: [true, "Name is necessary"],
		unique: true,
	},
	state: {
		type: Boolean,
		default: true,
		required: true,
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

CategorieShema.methods.toJSON = function () {
	const { __v, state, ...data } = this.toObject();
	return data;
};

module.exports = model("Categorie", CategorieShema);
