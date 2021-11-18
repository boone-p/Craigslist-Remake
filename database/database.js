const mongoose = require("mongoose");
const productSchema = require("./productSchema");
const userSchema = require("./userSchema");
const dotenv = require("dotenv");
dotenv.config();

let conn;

function getConnection() {
	if (!conn) {
		if (process.argv.includes("--prod")) {
			console.log("Connecting to Atlas DB...\n");
			conn = mongoose.createConnection(
				"mongodb+srv://" +
					process.env.MONGO_USER +
					":" +
					process.env.MONGO_PWD +
					"@freestuffapp.rezg1.mongodb.net/" +
					process.env.MONGO_DB +
					"?retryWrites=true&w=majority",
				{
					useNewUrlParser: true,
					useUnifiedTopology: true,
				});
		}
		else {
			conn = mongoose.createConnection("mongodb://127.0.0.1:27017/freestuffapp",
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
	if (criteria === undefined) result = await productModel.find();
	else {}
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

async function getUser(name) {
	const userModel = getConnection().model("User", userSchema);
	let result;
	if (name === undefined) result = await userModel.find();
	else {}
	return result;
}

async function addUser(user) {
	const userModel = getConnection("User").model("User", userSchema);
	try {
		const userToAdd = new userModel(user);
		const savedUser = await userToAdd.save();
		return savedUser;
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function findUserByEmail(givenEmail) {
	const userModel = getConnection().model("User", userSchema);
	try {
		return await userModel.find({email:givenEmail}).lean();
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function deleteUser(id) {
	const userModel = getConnection().model("User", userSchema);
	try {
		return await userModel.deleteOne({_id: id});
		//return await findByNameAndIdAndDelete(id); //write search algorithm
	} catch (error) {
		console.log(error);
		return false;
	}
}

exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.deleteProduct = deleteProduct;
exports.getUser = getUser;
exports.addUser = addUser;
exports.deleteUser = deleteUser;
exports.findUserByEmail = findUserByEmail;
