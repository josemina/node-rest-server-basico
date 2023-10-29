const Role = require("../models/role");
const User = require("../models/user");

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
module.exports = {
  isValidRol,
  existEmail,
  existUserById,
};
