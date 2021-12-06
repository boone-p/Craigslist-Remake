const mongoose = require("mongoose");
const productSchema = require("./productSchema");
const userSchema = require("./userSchema");
const dotenv = require("dotenv");
dotenv.config({path: "../../../Project/.env"});

let conn;

function setConnection(newConn) {
	return (conn = newConn);
}

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

// /**
//  * Gets and filters products based on the sidebar and search bar inputs
//  * @param {*} sidebarCriteria : array with [“_id”, "condition", "category", "date posted"] included with values
//  * if being filtered for or empty strings if not being filtered for
//  * @param {*} searchCriteria : string representing the search bar input, empty string if nothing searched
//  */
async function getProducts(sidebarCriteria, searchCriteria) {
	// change to accept search and sidebar criteria, filter by sidebar and then search bar
	// let products = await getProductsSidebar(sidebarCriteria);
	const productModel = getConnection().model("Product", productSchema);
	let products = await productModel.find();
	return filterProductsSearch(products, searchCriteria);
}

// filters products based on similarity to searchString
function filterProductsSearch(products, searchString) {
	// verify that there search criteria exists
	if (searchString === "") return products;
	// break search into individual words
	let threshold = 0.65;
	let searchWords = searchString.split(" ");
	// list of {product, score} tuples
	prodScores = [];
	products.forEach((prod) => {
		// complie product keywords from title, description, seller, location, etc.
		// let sellerName = getSellerName(prod.seller); // get seller name from product's user _id
		let prodStrs = [prod.title, prod.description, prod.location];
		// list to accumulate points for each product search attribute
		let rs = [0, 0, 0];
		// compare each keyword to search and update product's score
		for (let i = 0; i < prodStrs.length; i++) {
			// compare to each prod str
			let prodWords = prodStrs[i].split(" ");
			prodWords.forEach((pword) => {
				searchWords.forEach((sword) => {
					// calculate Levenshtein distance
					let lev = dynamicSimilarity(
						pword.toLowerCase(),
						sword.toLowerCase()
					);
					// rs[i] += lev;
					if (lev > threshold) rs[i] += lev;
				});
			});
		}
		// weight rs accordingly
		let points = 5 * rs[0] + 4 * rs[1] + 3 * rs[2];
		// add tripple to list
		prodScores.push({ product: prod, score: points });
	});

	// sort products by their respective search scores
	prodScores.sort((a, b) => (a.score < b.score ? 1 : -1));

	// compile a list of just the projects in their sorted order
	prodsSorted = [];
	prodScores.forEach((p) => {
		prodsSorted.push(p.product);
	});

	return prodsSorted;
}

/**
 * Use Levenshtein distance to calculate the similarity between 2 strings
 * @param {C} s1 : first String
 * @param {*} s2 : second String
 */
function dynamicSimilarity(s1, s2) {
	// if they are the same, return an extra high similarity
	if (s1 === s2) {
		return 2;
	}
	let array = [];
	// build 2d array with the right shape and size
	for (let i = 0; i < s1.length + 1; i++) {
		let ar = [];
		for (let j = 0; j < s2.length + 1; j++) {
			ar.push(0);
		}
		array.push(ar);
	}
	// fill in table with Levenshtein distances
	for (let i = 0; i < s1.length + 1; i++) {
		for (let j = 0; j < s2.length + 1; j++) {
			if (i == 0) array[i][j] = j;
			else if (j == 0) array[i][j] = i;
			else {
				let o1 = array[i][j - 1] + 1;
				let o2 = array[i - 1][j] + 1;
				let o3 = array[i - 1][j - 1];
				if (!(s1.charAt(i - 1) === s2.charAt(j - 1))) o3 += 1;
				array[i][j] = Math.min(o1, o2, o3);
			}
		}
	}
	// calculate % similarity
	let len = Math.max(s1.length, s2.length);
	let ed = array[s1.length][s2.length];
	return (len - ed) / len;
}


async function addProduct(product) {
	const productModel = getConnection().model("Product", productSchema);
	const prodToAdd = new productModel(product);
	const savedProd = await prodToAdd.save();
	return savedProd;
}

async function findProductById(id) {
	const productModel = getConnection().model("Product", productSchema);
	let _id = mongoose.Types.ObjectId(id)
	return await productModel.find({_id: _id}).lean();
}

/**
 * Returns all users if id is an empty string, or the user with that id otherwise
 * @param {*} id : user _id or an empty string
 */
async function getUser(id) {
	const userModel = getConnection().model("User", userSchema);
	if (!(id === "")) {
		// find user by id
		return await userModel.find({_id: id}); // might need to convert from string to ObjectID type
	} else {
		return await userModel.find();
	}
}

async function addUser(user) {
	console.log("adding user")
	const userModel = getConnection("User").model("User", userSchema);
	const userToAdd = new userModel(user);
	const savedUser = await userToAdd.save();
	return savedUser;
}

async function findUserByEmail(givenEmail) {
	const userModel = getConnection().model("User", userSchema);
	return await userModel.find({email:givenEmail}).lean();
}

exports.getConnection = getConnection;
exports.setConnection = setConnection;
exports.getProducts = getProducts;
exports.addProduct = addProduct;
exports.getUser = getUser;
exports.addUser = addUser;
exports.findUserByEmail = findUserByEmail;
exports.findProductById = findProductById;
exports.setConnection = setConnection;
exports.dynamicSimilarity = dynamicSimilarity;
exports.getConnection = getConnection;
exports.filterProductsSearch = filterProductsSearch;
