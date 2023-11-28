const path = require("path");
const { v4: uuidv4 } = require("uuid");

async function uploadFile(
	files,
	extensionsValids = ["png", "jpg", "jpeg", "gif"],
	folder = ""
) {
	return new Promise((resolve, reject) => {
		const { file } = files;

		const nameCut = file.name.split(".");
		const extension = nameCut[nameCut.length - 1];

		//Validate extension
		if (!extensionsValids.includes(extension)) {
			return reject(
				`Extension ${extension} is invalid, alloweds extensions is ${extensionsValids}`
			);
		}
		const nameTemp = uuidv4() + "." + extension;

		const uploadPath = path.join(
			__dirname,
			"../uploads/",
			folder,
			nameTemp
		);

		file.mv(uploadPath, function (err) {
			if (err) {
				console.log(err);
				reject(err);
			}

			resolve(nameTemp);
		});
	});
}

module.exports = {
	uploadFile,
};
