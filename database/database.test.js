const mongoose = require("mongoose");
const ProductSchema = require("./productSchema");
const UserSchema = require("./userSchema");
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

	conn = await mongoose.createConnection(uri, mongooseOpts);

	productModel = conn.model("Product", ProductSchema);
	userModel = conn.model("User", UserSchema);

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
		email: "bmck@aol.com",
		password: "b00b5021e022",
	};
	let result = new userModel(dummyUser);
	await result.save();

	dummyUser = {
		name: "Bryce McLovin",
		email: "runk@hotmail.com",
		password: "8=-db_arsg",
	};
	result = new userModel(dummyUser);
	await result.save();

	dummyUser = {
		name: "Dustin Glockman",
		email: "dusting@gmail.com",
		password: "8sdf8f880_a0",
	};
	result = new userModel(dummyUser);
	await result.save();

	dummyUser = {
		name: "Clementine McLovin",
		email: "cloveinmc@hotmail.com",
		password: "8sdf8f880a0",
	};
	result = new userModel(dummyUser);
	await result.save();

	// // // // // // // // // // // // // // // // // // // // //

	// console.log("Before first dummyProduct");

	let dummyProduct = {
		title: "hair",
		description: "I shaved my head want some hair?",
		category: "Gardening",
		// condition: "Used",
		image: "0",
		contactInfo: "0",
		location: "Bakersfield",
		// seller: "Barry McKockiner",
		datePosted: "12/5/21",
	};
	// console.log(dummyProduct);
	result = new productModel(dummyProduct);
	// console.log("result: " + result);
	await result.save();

	// console.log("Before second dummyProduct");

	dummyProduct = {
		title: "painting",
		description: "its a painting but for gardening",
		category: "Gardening",
		// condition: "Like New",
		image: "0",
		contactInfo: "0",
		location: "Bakersfield",
		// seller: "Larry McKockiner",
		datePosted: "12/2/21",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("Before 3rd dummyProduct");

	dummyProduct = {
		title: "pianting",
		description: "dont spel god but i piant good",
		category: "Household",
		// condition: "Used",
		image: "0",
		contactInfo: "0",
		location: "Oceanside, CA",
		// seller: "pablo del bosque",
		datePosted: "11/26/21",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("Before 4th dummyProduct");

	dummyProduct = {
		title: "opainting",
		description: "should show up for a paintint title search",
		category: "Household",
		// condition: "New",
		image: "0",
		contactInfo: "0",
		location: "Cupertino, CA",
		// seller: "itay rabinovic",
		datePosted: "11/10/21",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("Before 5th dummyProduct");

	dummyProduct = {
		title: "Painting",
		description: "Old painting that I found, might be good",
		category: "Household",
		// condition: "Good",
		image: "0",
		contactInfo: "0",
		location: "Marin, CA",
		// seller: "Darnel Simons",
		datePosted: "6/7/21",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("Before 6th dummyProduct");

	dummyProduct = {
		title: "Painting",
		description: "drew a picture of my head, kinda cool",
		category: "Household",
		// condition: "New",
		image: "0",
		contactInfo: "0",
		location: "Ventura, CA",
		// seller: "Maxie Simons",
		datePosted: "11/8/19",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("Before 7th dummyProduct");

	dummyProduct = {
		title: "Flip phone",
		description: "Don't need this anymore, who wants it?",
		category: "Electronics",
		// condition: "Good",
		image: "0",
		contactInfo: "0",
		location: "Soledad, CA",
		// seller: "leslie banks",
		datePosted: "11/12/18",
	};
	result = new productModel(dummyProduct);
	await result.save();

	// console.log("Before 8th dummyProduct");

	dummyProduct = {
		title: "Brownies",
		description: "Just some regular brownies that I made",
		category: "Household",
		// condition: "Like New",
		image: "0",
		contactInfo: "0",
		location: "Mt Shasta, CA",
		// seller: "dylan Simons",
		datePosted: "4/31/19",
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

test("Test addProduct and findProductById", async () => {
	let dummyProduct = {
		title: "piano",
		description: "old piano really cool plays well",
		category: "Household",
		image: "0",
		contactInfo: "me",
		location: "Bakersfield, CA",
		datePosted: "12/5/21",
	};
	const prod = await dbServices.addProduct(dummyProduct);
	expect(prod).toBeDefined();
	expect(prod.title).toBe("piano");

	// const prod2 = await dbServices.getProducts([prod._id, "", "", ""], "");
	// expect(prod2.title).toBe("piano");

	const prod3 = await dbServices.findProductById(prod._id);
	expect(prod3.title).toBe("piano");
});

// test("Test findProductById", async () => {
// 	const prods = await dbServices.getProducts(["", "", "", ""], "Brownies");
// 	expect(prods).toBeDefined();
// 	expect(prods.length).toBeGreaterThan(0);

// 	prods.forEach(async (prod) => {
// 		console.log(prod);
// 		const title1 = prod.title;
// 		const title2 = await dbServices.findProductById(prod._id).title;
// 		const prod2 = await dbServices.getProducts([prod._id, "", "", ""], "");
// 		console.log(title2);
// 		console.log(prod2.title);
// 		expect(title1).toBe(title2);
// 	});
// });

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

// criteriaList = [“_id”, "condition", "category", "date posted"]

// test("Fetching products by category", async () => {
// 	const category = "Household";
// 	let expectedTitles = [
// 		"pianting",
// 		"opainting",
// 		"Painting",
// 		"Painting",
// 		"Brownies",
// 	];
// 	const prods = await dbServices.getProducts(["", "", category, ""], "");
// 	expect(prods).toBeDefined();
// 	expect(prods.length).toBeGreaterThan(0);

// 	let titles = [];
// 	prods.forEach((prod) => titles.push(prod.title));
// 	// console.log(titles);
// 	expect(titles.length).toBe(expectedTitles.length);
// 	titles.forEach((t) => expect(expectedTitles.includes(t)).toBe(true));
// });

// test("Fetching products by condition and category", async () => {
// 	const condition = "New";
// 	const category = "Household";
// 	let expectedTitles = ["opainting", "Painting"];
// 	const prods = await dbServices.getProducts(
// 		["", condition, category, ""],
// 		""
// 	);
// 	expect(prods).toBeDefined();
// 	expect(prods.length).toBeGreaterThan(0);

// 	let titles = [];
// 	prods.forEach((prod) => titles.push(prod.title));
// 	// console.log(titles);
// 	expect(titles.length).toBe(expectedTitles.length);
// 	titles.forEach((t) => expect(expectedTitles.includes(t)).toBe(true));
// });

// test("Fetching products by condition and title", async () => {
// 	const condition = "New";
// 	const search = "pianting";
// 	let expectedConditions = ["New", "New"];
// 	let expectedTitles = ["Painting", "opainting"];
// 	const prods = await dbServices.getProducts(["", condition, "", ""], search);
// 	expect(prods).toBeDefined();
// 	expect(prods.length).toBeGreaterThan(0);

// 	let titles = [];
// 	let conditions = [];
// 	prods.forEach((prod) => titles.push(prod.title));
// 	prods.forEach((prod) => conditions.push(prod.condition));
// 	// titles = titles.slice(0, expectedTitles.length);
// 	// conditions = conditions.slice(0, expectedConditions.length);
// 	// console.log(titles);
// 	expect(titles.length).toBe(expectedTitles.length);
// 	expect(conditions.length).toBe(expectedConditions.length);
// 	titles.forEach((t) => expect(expectedTitles.includes(t)).toBe(true));
// 	conditions.forEach((t) =>
// 		expect(expectedConditions.includes(t)).toBe(true)
// 	);
// });

// test("Fetching products by category and title", async () => {
// 	const category = "Gardening";
// 	const search = "pianting";
// 	let expectedCategories = ["Gardening"];
// 	let expectedTitles = ["painting"];
// 	const prods = await dbServices.getProducts(["", "", category, ""], search);
// 	expect(prods).toBeDefined();
// 	expect(prods.length).toBeGreaterThan(0);

// 	let titles = [];
// 	let categories = [];
// 	prods.forEach((prod) => titles.push(prod.title));
// 	prods.forEach((prod) => categories.push(prod.category));
// 	titles = titles.slice(0, expectedTitles.length);
// 	categories = categories.slice(0, expectedCategories.length);
// 	// console.log(titles);
// 	// prods.forEach((prod) => console.log(prod.datePosted));
// 	expect(titles.length).toBe(expectedTitles.length);
// 	expect(categories.length).toBe(expectedCategories.length);
// 	titles.forEach((t) => expect(expectedTitles.includes(t)).toBe(true));
// 	categories.forEach((t) =>
// 		expect(expectedCategories.includes(t)).toBe(true)
// 	);
// });

// test("Fetching products by date 24 hours", async () => {
// 	const prods = await dbServices.getProducts(
// 		["", "", "", "Past 24 Hours"],
// 		""
// 	);
// 	expect(prods).toBeDefined();
// 	expect(prods.length).toBe(1);
// });

// test("Fetching products by date 1 Week", async () => {
// 	const prods = await dbServices.getProducts(["", "", "", "Past Week"], "");
// 	expect(prods).toBeDefined();
// 	expect(prods.length).toBe(2);
// });

// test("Fetching products by date 2 Weeks", async () => {
// 	const prods = await dbServices.getProducts(
// 		["", "", "", "Past 2 Weeks"],
// 		""
// 	);
// 	expect(prods).toBeDefined();
// 	expect(prods.length).toBe(3);
// });

// test("Fetching products by date Month", async () => {
// 	const prods = await dbServices.getProducts(["", "", "", "Past Month"], "");
// 	expect(prods).toBeDefined();
// 	expect(prods.length).toBe(4);
// });

// test("Fetching products by date Year", async () => {
// 	const prods = await dbServices.getProducts(["", "", "", "Past Year"], "");
// 	expect(prods).toBeDefined();
// 	expect(prods.length).toBe(5);
// });

test("split test", async () => {
	let str = "dylan Simons";
	let split = str.split(" ");
	// console.log(split);
	expect(1).toBe(1);
});

test("sort test", async () => {
	let list = [];
	list.push({ word: "one", rank: 1 });
	list.push({ word: "five", rank: 5 });
	list.push({ word: "four", rank: 4 });
	list.push({ word: "two", rank: 2 });
	let x = list.sort((a, b) => (a.rank < b.rank ? 1 : -1));
	// console.log(x);
	expect(1).toBe(1);
});

test("dates test", async () => {
	let now = Date.now();
	let past = "2021-11-29";
	let present = "2021-11-30";
	let future = "2022-12-30";

	let msyear = 1000 * 3600 * 24 * 365.25;

	// console.log(now / msyear);
});
