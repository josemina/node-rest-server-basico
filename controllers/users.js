const { response, request } = require("express");
const User = require("../models/user");
const bcryptjs = require("bcryptjs");
const { existEmail } = require("../helpers/db-validators");

const usersGet = async (req, res = response) => {
  //const { q, nombre = "No name", apikey } = req.query;
  const { limit = 5, from = 0 } = req.query;
  const query = { state: true };
  // const users = await User.find(query).skip(Number(from)).limit(Number(limit));
  // const total = await User.countDocuments(query);
  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);
  res.json({ total, users });
};

const usersPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...properties } = req.body;

  //TODO validate against db
  if (password) {
    // Encrypt password
    const salt = bcryptjs.genSaltSync();
    properties.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, properties);
  res.json(user);
};

const usersPost = async (req, res = response) => {
  const { name, email, password, rol } = req.body;
  const user = new User({ name, email, password, rol });
  // Encrypt password
  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);
  //Save on DB
  await user.save();
  res.json({ user });
};

const usersPatch = (req, res = response) => {
  res.json({
    msg: "patch API - controlador",
  });
};

const usersDelete = async (req, res = response) => {
  const { id } = req.params;

  //Delete on DB
  //const user = await User.findByIdAndDelete(id);

  //Change state
  const user = await User.findByIdAndUpdate(id, { state: false });
  res.json({ user });
};

module.exports = {
  usersGet,
  usersPut,
  usersPost,
  usersPatch,
  usersDelete,
};
