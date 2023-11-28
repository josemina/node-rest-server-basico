const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");
const fileUpload = require("express-fileupload");

class Server {
	constructor() {
		this.app = express();
		this.port = process.env.PORT;
		this.paths = {
			auth: "/api/auth",
			categories: "/api/categorias",
			search: "/api/buscar",
			users: "/api/usuarios",
			products: "/api/productos",
			uploads: "/api/uploads",
		};

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

		this.app.use(
			fileUpload({
				useTempFiles: true,
				tempFileDir: "/tmp/",
				createParentPath: true,
			})
		);
	}

	routes() {
		this.app.use(this.paths.auth, require("../routes/auth"));
		this.app.use(this.paths.categories, require("../routes/cats"));
		this.app.use(this.paths.users, require("../routes/users"));
		this.app.use(this.paths.products, require("../routes/products"));
		this.app.use(this.paths.search, require("../routes/search"));
		this.app.use(this.paths.uploads, require("../routes/uploads"));
	}

	listen() {
		this.app.listen(this.port, () => {
			console.log("Servidor corriendo en el puerto ", this.port);
		});
	}
}

module.exports = Server;
