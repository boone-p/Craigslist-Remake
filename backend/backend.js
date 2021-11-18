const express = require("express");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dbServices = require("../database/database");

const app = express();
const port = 5001;
app.use(cors());
app.use(express.json());

app.get('/', authenticateToken, async (req, res) => {
	const result = await dbServices.getProducts()
	res.send({productList: result});
});

app.post('/login', async (req, res) => {
	const user = await dbServices.findUserByEmail(req.body.email);
	console.log("user from the backend")
	console.log(user)
	if (user.length == 0) {
		console.log("Invalid username/password combination")
		res.status(401).end();
	}	
	bcrypt.compare(req.body.password, user[0].password, (err, result) => {
		if (err) throw(err);
		if (!result) res.status(401).end();
		else {
			const token = jwt.sign({_id: user[0]._id}, process.env.JWT_SECRET, {expiresIn: '45s'});
			console.log("token in backend login post");
			console.log(token);
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
	console.log("token in authenticateToken")
	console.log(token)
	if (token === undefined) {
		console.log("NO TOKEN");
		return res.status(401).end();
	}
	try {
		const id = jwt.verify(token, process.env.JWT_SECRET);
		req._id = id;
	} catch(error) {
		console.log("EXPIRED TOKEN");
		return res.status(401).end();
	}
	console.log("USER AUTHENTICATED");
	next();
}

app.post('/products', authenticateToken, async (req, res) => {
	const productToAdd = req.body;
	console.log(productToAdd)
	const savedProduct = await dbServices.addProduct(productToAdd);
	if (savedProduct) res.status(201).send(savedProduct);
	else res.status(500).end();
});

app.post('/register', async (req, res) => {
	const userToAdd = req.body;
	const savedUser = await dbServices.addUser(userToAdd);
	if (savedUser) res.status(201).send(savedUser);
	else res.status(500).end();
	console.log(userToAdd);
});

app.delete('/products/:id', authenticateToken, (req, res) => {
	const id = req.params["_id"];
	let result = dbServices.findProductById(id);
	if (result === undefined) res.status(404).end();
	else {
		dbServices.deleteProduct(id);
		res.status(204).end();
	}
});

app.listen(process.env.PORT || port, () => {
	console.log("REST API is listening.");
});
