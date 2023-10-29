const { Schema, model } = require("mongoose");

const RoleSchema = Schema({
  rol: {
    type: String,
    required: [true, "Rol is necessary"],
  },
});

module.exports = model("Rol", RoleSchema);
