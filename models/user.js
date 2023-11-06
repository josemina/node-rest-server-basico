const { Schema, model } = require("mongoose");

const UserSchema = Schema({
	name: {
		type: String,
		required: [true, "Name is necessary"],
	},
	email: {
		type: String,
		required: [true, "Email is necessary"],
		unique: true,
	},
	password: {
		type: String,
		required: [true, "Password is necessary"],
	},
	img: {
		type: String,
	},
	rol: {
		type: String,
		required: true,
		emun: ["ADMIN_ROLE", "USER_ROLE"],
	},
	state: {
		type: Boolean,
		default: true,
	},
	google: {
		type: Boolean,
		default: false,
	},
});

UserSchema.methods.toJSON = function () {
	const { __v, password, _id, ...user } = this.toObject();
	user.uid = _id;
	return user;
};

module.exports = model("User", UserSchema);
