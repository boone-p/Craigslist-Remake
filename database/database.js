// Database for Free Stuff App
// This file will do database operations

const mongoose = require("mongoose");
const productModel = require("./productSchema");
//const userModel = require("./userSchema");

mongoose
	.connect("mongodb://localhost:27017/FreeStuffApp", {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.catch((error) => console.log(error));

let prodCriteria = [
	"title",
	"datePosted",
	"productID",
	"categories",
	"description",
	"condition",
	"seller",
];

/**
 * @param {*} criteria should be a list of 5 strings, where each element
 *     corresponds to the search criteria in the order above. Criteria
 *     which are not being filtered should be represented by empty strings.
 * Examples:
 * ["", "", "", "", ""] // returns all products
 * ["", "", "", "new", ""] // returns all condition = "new" products
 * ["Toy", "", "", "", "Dave"] // returns all title = "Toy" products posted by Dave
 */
async function getProducts(criteria) {
	let products = await productModel.find();
	let result = filterProducts(products, criteria);
	return result;
}

async function filterProducts(products, criteria) {
	return products;
}

async function getUsers() {
	let users = await userModel.find();
	return users;
}

/**
 * db.products.insertOne({title: "Trampoline", datePosted: "10/29/2021", productID: "abc123", categories: ["bounce","fun","toy","backyard"], description: "It's a cool trampoline", condition: "worn", seller: "dustinglockman"})
 * @param {*} product
 */
async function addProduct(product) {
	try {
		const prodToAdd = new productModel(product);
		const savedProd = await prodToAdd.save();
		return savedProd;
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function addUser(user) {
	try {
		const userToAdd = new userModel(user);
		const savedUser = await userToAdd.save();
		return savedUser;
	} catch (error) {
		console.log(error);
		return false;
	}
}

async function deleteProduct(id) {
	try {
		return await productModel.findByIdAndDelete(id);
	} catch (error) {
		console.log(error);
		return undefined;
	}
}

async function deleteUser(id) {
	try {
		return await userModel.findByIdAndDelete(id);
	} catch (error) {
		console.log(error);
		return undefined;
	}
}

exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.deleteProduct = deleteProduct;

