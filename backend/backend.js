const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const dbServices = require("../database/database");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
	const result = await dbServices.getProducts()
	res.send({ productList: result });
});

app.get('/login', async (req, res) => {
	const result = await dbServices.getProducts()
	res.send({ productList: result });
});

app.post('/login', async (req, res) => {
	const {username, password} = req.body;
	const user = await dbServices.findUserByUsername({username});
	if (await bcrypt.compare(password, user.password)) {
		const token = jwt.sign({
			id: user._id,
			username: user.username
		}, process.env.JWT_SECRET);
		res.status(201).send(token);
	}
	else res.status(401).end();
});

app.post('/products', async (req, res) => {
	const productToAdd = req.body;
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

app.delete('/products/:id', (req, res) => {
	const id = req.params["_id"];
	let result = findProductById(id);
	if (result === undefined) res.status(404).send("Resource not found.");
	else {
		dbServices.deleteProduct(id);
		res.status(204).end();
	}
});

app.get('/login', async (req, res) => {
	const result = await dbServices.getUser(blah)
	res.send({ productList: result });
});

app.post('/register', async (req, res) => {
	const userToAdd = req.body;
	const savedUser = await dbServices.addUser(userToAdd);
	if (savedUser) res.status(201).send(savedUser);
	else res.status(500).end();
	// console.log(userToAdd)
});


app.listen(process.env.PORT || port, () => {
	console.log("REST API is listening.");
});
