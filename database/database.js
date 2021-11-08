const mongoose = require("mongoose");
const productSchema = require("./productSchema");
const userSchema = require("./userSchema");
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

async function getProducts(criteria) {
	const productModel = getConnection().model("Product", productSchema);
	let result;
	if (criteria === undefined)
		result = await productModel.find();
	else {
		// return all products that contain search criteria in the title or description
	}
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
		return await findByIdAndDelete(id); //write search algorithm
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

async function getUsers(name) {
	const userModel = getConnection().model("User", userSchema);
	let result;
	if (name === undefined)
		result = await userModel.find();
	else {
		//return all users that have the same name as the search criteria
	}
	return result;
}

async function addUser(user) {
	const userModel = getConnection().model("User", userSchema);
	try {
		const userToAdd = new userModel(user);
		const savedUser = await userToAdd.save();
		return savedUser;
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function deleteUser(id) {
	const userModel = getConnection().model("User", userSchema);
	try {
		return await findByNameAndIdAndDelete(id); //write search algorithm
	} catch (error) {
		console.log(error);
		return false;
	}
}

exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.deleteProduct = deleteProduct;
exports.getUser = getUsers;
exports.addUser = addUser;
exports.deleteUser = deleteUser;