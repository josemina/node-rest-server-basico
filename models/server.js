const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = "/api/usuarios";

    //Connect to data base
    this.conectDB();
    //Middlewares
    this.middlewares();

    //Rutas
    this.routes();
  }

  async conectDB() {
    await dbConnection();
  }

  middlewares() {
    this.app.use(express.static("public"));

    //Read and parse of body
    this.app.use(express.json());

    this.app.use(cors());
  }

  routes() {
    this.app.use(this.usersPath, require("../routes/users"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en el puerto ", this.port);
    });
  }
}

module.exports = Server;
