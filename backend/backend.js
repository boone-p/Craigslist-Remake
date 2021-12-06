const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbServices = require("../database/database");
const dotenv = require("dotenv");
dotenv.config({path: "../.env"});

const app = express();
const port = 5001;
app.use(cors());
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({extended: true, limit: '20mb'}));

const search = {
	filter: {sidebar: ["", "", "", ""], searchbar: ""}
}

app.post('/search', async (req, res) => { // authenticateToken
	if(req.body["sidebar"].length==4) {
		search.filter.sidebar = req.body["sidebar"];
	}
	if(!(req.body["searchbar"]=="")) {
		search.filter.searchbar = req.body["searchbar"];
	}
});

app.get('/', authenticateToken, async (req, res) => {
	//const result = await dbServices.getProductsLanding()
	const result = await dbServices.getProducts(search.filter["sidebar"], search.filter["searchbar"]);
	res.send({productList: result});
});

app.get('/product/:id', async (req, res) => {
	const product = await dbServices.findProductById(req.params['id']);
	if (product === undefined || product.length == 0) {
		res.status(404).send("Product not found");
	}
	else {
		res.send({productList: product});
	}
});

app.post('/login', async (req, res) => {
	const user = await dbServices.findUserByEmail(req.body.email);
	if (user.length == 0) {
		res.status(401).end();
	}	
	bcrypt.compare(req.body.password, user[0].password, (err, result) => {
		if (err) throw(err);
		if (!result) res.status(401).end();
		else {
			const token = jwt.sign({_id: user[0]._id}, process.env.JWT_SECRET, {expiresIn: '15m'});
			res.status(201).json({
				token: token,
				email: user[0].email,
				id: user[0]._id
			});
		}
	});
});	

function authenticateToken(req, res, next) {
	const authHeader = req.headers.authorization;
	const token = authHeader && authHeader.split(" ")[1];
	if (token === undefined) {
		return res.status(401).send("Invalid Login");
	}
	try {
		const id = jwt.verify(token, process.env.JWT_SECRET);
		req._id = id;
	} catch(error) {
		return res.status(401).send("Invalid Login");
	}
	next();
}

app.post('/product', authenticateToken, async (req, res) => {
	const productToAdd = req.body;
	const savedProduct = await dbServices.addProduct(productToAdd);
	if (savedProduct) res.status(201).send(savedProduct);
	else {
		res.status(500).send("Saved incorrectly");
	}
});

app.post('/register', async (req, res) => {
	const userToAdd = req.body;
	const savedUser = await dbServices.addUser(userToAdd);
	if (savedUser) res.status(201).send(savedUser);
	else res.status(500).end();
});

app.listen(process.env.PORT || port, () => {
	console.log("REST API is listening.");
});
