const mongoose = require("mongoose");
const productSchema = require("./productSchema");
//const userModel = require("./userSchema");
const dotenv = require("dotenv");
dotenv.config();

let conn;

function getConnection() {
	if (!conn) {
		if (process.argv.includes("--prod")) {
			conn = mongoose.createConnection(
				"mongodb+srv://" +
					process.env.MONGO_USER +
					":" +
					process.env.MONGO_PWD +
					"@freestuffapp.dycx2.mongodb.net/" +
					process.env.MONGO_DB +
					"?retryWrites=true&w=majority",
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
				});
		}
		else {
			conn = mongoose.createConnection("mongodb://localhost:27017/products",
			{
				useNewUrlParser: true,
				useUnifiedTopology: true,
			});
		}
	}
	return conn;
}

async function getProducts() {
	const productModel = getConnection().model("Product", productSchema);
	let result;

	result = await productModel.find();

	return result;
}

async function addProduct(product) {
	const productModel = getConnection().model("Product", productSchema);
	try {
		const prodToAdd = new productModel(product);
		const savedProd = await prodToAdd.save();
		return savedProd;
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function deleteProduct(id) {
	const productModel = getConnection().model("Product", productSchema);
	try {
		return await findByIdAndDelete(id);
	} catch (error) {
		console.log(error);
		return false;
	}
}

// async function filterProducts(products, criteria) {
// 	let filtered = [];
// 	products.forEach((prod) => {
// 		console.log(prod);
// 		for (let i = 0; i < criteria.length; i++) {
// 			let crit = criteria[i];
// 			if(!(crit==="")) {
// 				prodValue = prod.find({ prodCriteria[i]: });
// 			}
// 		}
// 	});
// 	return products;
// }

// async function getUsers() {
// 	let users = await userModel.find();
// 	return users;
// }

// async function addUser(user) {
// 	try {
// 		const userToAdd = new userModel(user);
// 		const savedUser = await userToAdd.save();
// 		return savedUser;
// 	} catch (error) {
// 		console.log(error);
// 		return false;
// 	}
// }

// async function deleteUser(id) {
// 	try {
// 		return await userModel.findByIdAndDelete(id);
// 	} catch (error) {
// 		console.log(error);
// 		return undefined;
// 	}
// }

exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.deleteProduct = deleteProduct;
// exports.getUser = getUser;
// exports.addUser = addUser;
// exports.deleteUser = deleteUser;