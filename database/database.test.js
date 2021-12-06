const mongoose = require("mongoose");
const productSchema = require("./productSchema");
const userSchema = require("./userSchema");
const dbServices = require("./database");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;
let conn;
let productModel;
let userModel;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();

	const mongooseOpts = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	};

	conn = mongoose.createConnection(uri, mongooseOpts);

	productModel = conn.model("Product", productSchema);
	userModel = conn.model("User", userSchema);

	dbServices.setConnection(conn);
});

afterAll(async () => {
	await conn.dropDatabase();
	await conn.close();
	await mongoServer.stop();
});

beforeEach(async () => {
	let dummyUser = {
		name: "Barry McKockiner",
		_id: mongoose.Types.ObjectId("507f191e810c19729de860ea"),
		email: "bmck@aol.com",
		password: "b00b5021e022",
	};
	let result = new userModel(dummyUser);
	await result.save();

	dummyUser = {
		name: "Bryce McLovin",
		_id: mongoose.Types.ObjectId("507f191e810c19729de860eb"),
		email: "runk@hotmail.com",
		password: "8=-db_arsg",
	};
	result = new userModel(dummyUser);
	await result.save();

	dummyUser = {
		name: "Dustin Glockman",
		_id: mongoose.Types.ObjectId("507f191e810c19729de860ec"),
		email: "dusting@gmail.com",
		password: "8sdf8f880_a0",
	};
	result = new userModel(dummyUser);
	await result.save();

	dummyUser = {
		name: "Clementine McLovin",
		_id: mongoose.Types.ObjectId("507f191e810c19729de860ed"),
		email: "cloveinmc@hotmail.com",
		password: "8sdf8f880a0",
	};
	result = new userModel(dummyUser);
	await result.save();

	// // // // // // // // // // // // // // // // // // // // //

	// console.log("Before first dummyProduct");

	let dummyProduct = {
		title: "hair",
		_id: mongoose.Types.ObjectId("507f191e810c19729df860ea"),
		datePosted: "11/30/21",
		category: "Gardening",
		description: "I shaved my head want some hair?",
		location: "Bakersfield",
		contactInfo: "Barry McKockiner",
		image: "a",
	};
	// console.log(dummyProduct);
	result = new productModel(dummyProduct);
	// console.log("result: " + result);
	await result.save();

	// console.log("Before second dummyProduct");

	dummyProduct = {
		title: "painting",
		_id: mongoose.Types.ObjectId("507f191e710c19729de860ea"),
		datePosted: "11/28/21",
		category: "Gardening",
		description: "its a painting but for gardening",
		location: "Bakersfield",
		contactInfo: "Larry McKockiner",
		image: "b",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("Before 3rd dummyProduct");

	dummyProduct = {
		title: "pianting",
		_id: mongoose.Types.ObjectId("507f191e810c19729de865ea"),
		datePosted: "11/20/21",
		category: "Household",
		description: "dont spel god but i piant good",
		location: "Oceanside, CA",
		contactInfo: "pablo del bosque",
		image: "c",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("Before 4th dummyProduct");

	dummyProduct = {
		title: "opainting",
		_id: mongoose.Types.ObjectId("507f191e810c16529de860ea"),
		datePosted: "11/5/21",
		category: "Household",
		description: "should show up for a paintint title search",
		location: "Cupertino, CA",
		contactInfo: "itay rabinovic",
		image: "d",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("Before 5th dummyProduct");

	dummyProduct = {
		title: "Painting",
		_id: mongoose.Types.ObjectId("507f191f340c19729de860ea"),
		datePosted: "6/7/21",
		category: "Household",
		description: "Old painting that I found, might be good",
		location: "Marin, CA",
		contactInfo: "Darnel Simons",
		image: "e",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("Before 6th dummyProduct");

	dummyProduct = {
		title: "Painting",
		_id: mongoose.Types.ObjectId("507f123e810c19729de860ea"),
		datePosted: "11/8/19",
		category: "Household",
		description: "drew a picture of my head, kinda cool",
		location: "Ventura, CA",
		contactInfo: "Maxie Simons",
		image: "f",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("Before 7th dummyProduct");

	dummyProduct = {
		title: "Flip phone",
		_id: mongoose.Types.ObjectId("427f191e810c19729de860ea"),
		datePosted: "11/12/18",
		category: "Electronics",
		description: "Don't need this anymore, who wants it?",
		location: "Soledad, CA",
		contactInfo: "Leslie banks",
		image: "g",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("Before 8th dummyProduct");

	dummyProduct = {
		title: "Brownies",
		_id: mongoose.Types.ObjectId("507f191e810c19729de542ea"),
		datePosted: "4/31/19",
		category: "Household",
		description: "Just some regular brownies that I made",
		location: "Mt Shasta, CA",
		contactInfo: "Dylan Simons",
		image: "h",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("After 8th dummyProduct");
});

afterEach(async () => {
	await productModel.deleteMany();
	await userModel.deleteMany();
});

// test("Fetching all users", async () => {
// 	const users = await dbServices.getUsers();
// 	expect(users).toBeDefined();
// 	expect(users.length).toBeGreaterThan(0);
// });

test("Get all users", async () => {
	const users = await dbServices.getUser("");
	expect(users).toBeDefined();
	expect(users.length).toBe(4);
});

// test("Get user by _id", async () => {
// 	const users = await dbServices.getUser("");
// 	expect(users).toBeDefined();
// 	expect(users.length).toBe(4);

// 	users.forEach(async (user) => {
// 		const name1 = user.name;
// 		const name2 = await dbServices.getUser(user._id).name;
// 		expect(name1).toBe(name2);
// 	});
// });

test("Test dynamicSimilarity()", async () => {
	let s1 = "Painting";
	let s2 = "opiantin";
	let s3 = "opiatnnll";
	let s4 = "wotylnlmangd";
	let sim0 = dbServices.dynamicSimilarity(s1, s1);
	let sim1 = dbServices.dynamicSimilarity(s1, s2);
	let sim2 = dbServices.dynamicSimilarity(s1, s3);
	let sim3 = dbServices.dynamicSimilarity(s1, s4);
	expect(sim0).toBe(2);
	expect(sim0 > sim1).toBe(true);
	expect(sim1 > sim2).toBe(true);
	expect(sim2 > sim3).toBe(true);
});

test("Test filterProductsSearch", async () => {
	// const productModel = getConnection().model("Product", productSchema);
	let products = await productModel.find();
	const prods = dbServices.filterProductsSearch(products, "Painting");

	let expectedTitles = [
		"painting",
		"Painting",
		"Painting",
		"pianting",
		"opainting",
	];

	expect(prods).toBeDefined();
	expect(prods.length).toBeGreaterThan(0);

	let titles = [];
	prods.forEach((prod) => titles.push(prod.title));
	titles = titles.slice(0, expectedTitles.length);
	// console.log(titles);
	expect(titles.length).toBe(expectedTitles.length);
	titles.forEach((t) => expect(expectedTitles.includes(t)).toBe(true));
});

// ["title","datePosted", "productID", "categories", "description", "condition", "seller"]
test("Fetching all products", async () => {
	const prods = await dbServices.getProducts(["", "", "", ""], "");
	expect(prods).toBeDefined();
	expect(prods.length).toBeGreaterThan(0);
});

test("Fetching products by title", async () => {
	const prodName = "Painting";
	let expectedTitles = [
		"painting",
		"Painting",
		"Painting",
		"pianting",
		"opainting",
	];
	const prods = await dbServices.getProducts(["", "", "", ""], prodName);
	expect(prods).toBeDefined();
	expect(prods.length).toBeGreaterThan(0);

	let titles = [];
	prods.forEach((prod) => titles.push(prod.title));
	titles = titles.slice(0, expectedTitles.length);
	// console.log(titles);
	expect(titles.length).toBe(expectedTitles.length);
	titles.forEach((t) => expect(expectedTitles.includes(t)).toBe(true));
});

test("Fetching products by description", async () => {
	const prodDescription = "my head";
	let expectedTitles = ["Painting", "hair"];
	const prods = await dbServices.getProducts(
		["", "", "", ""],
		prodDescription
	);
	expect(prods).toBeDefined();
	expect(prods.length).toBeGreaterThan(0);

	let titles = [];
	prods.forEach((prod) => titles.push(prod.title));
	titles = titles.slice(0, expectedTitles.length);
	// console.log(titles);
	expect(titles.length).toBe(expectedTitles.length);
	titles.forEach((t) => expect(expectedTitles.includes(t)).toBe(true));
});

test("split test", async () => {
	let str = "dylan Simons";
	let split = str.split(" ");
	// console.log(split);
	expect(1).toBe(1);
});

test("Sort test", async () => {
	let list = [];
	list.push({ word: "one", rank: 1 });
	list.push({ word: "five", rank: 5 });
	list.push({ word: "four", rank: 4 });
	list.push({ word: "two", rank: 2 });
	let x = list.sort((a, b) => (a.rank < b.rank ? 1 : -1));
	expect(1).toBe(1);
});

test("Dates test", async () => {
	let now = Date.now();
	let past = "2021-11-29";
	let present = "2021-11-30";
	let future = "2022-12-30";
	let msyear = 1000 * 3600 * 24 * 365.25;

});

test("Fetching all users", async () => {
	const users = await dbServices.getUser("");
	expect(users).toBeDefined();
	expect(users.length).toBeGreaterThan(0);
});

test("Fetching users by id", async () => {
	const _id = "507f191e810c19729de860ea";
	const users = await dbServices.getUser(_id);
	expect(users).toBeDefined();
	expect(users.length).toBeGreaterThan(0);
	users.forEach((user) => expect(users[0]._id.toString()).toBe(_id));
});

test("Fetching users by email", async () => {
	const userEmail = "runk@hotmail.com";
	const users = await dbServices.findUserByEmail(userEmail);
	expect(users).toBeDefined();
	expect(users.length).toBeGreaterThan(0);
	users.forEach((user) => expect(user.email).toBe(userEmail));
});

test("Get DB Connection", async () => {

});

test("Add product", async () => {
	let productToAdd = {
		title: "poop",
		datePosted: "11/30/20",
		category: "Sports",
		description: "I hate my life and want to eat poop",
		location: "Bakersfield",
		contactInfo: "Hugh Janus",
		image: "h",
	};
	const addedProduct = await dbServices.addProduct(productToAdd);
	expect(addedProduct).toBeDefined();
	expect(addedProduct.title).toBe(productToAdd.title);
	expect(addedProduct.description).toBe(productToAdd.description);
});

test("Find product by ID", async () => {
	const id = "507f191e710c19729de860ea";
	const product = await dbServices.findProductById(id)
	expect(product).toBeDefined()
	expect(product.length).toBeGreaterThan(0)
	product.forEach((product) => expect(product._id.toString()).toBe(id));
});

test("Add user", async () => {
	let userToAdd = {
		name: "Ryan Greg",
		_id: mongoose.Types.ObjectId("507f191e810c19729de860ef"),
		email: "rgreg@gmail.com",
		password: "slbgf23r23l",
	};
	const addedUser = await dbServices.addUser(userToAdd);
	expect(addedUser).toBeDefined();
	expect(addedUser.name).toBe(userToAdd.name);
	expect(addedUser.email).toBe(userToAdd.email);
});