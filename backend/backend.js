// backend for Free Stuff App

const express = require("express");
const cors = require("cors");
const dbServices = require("../database/database");

const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

//get method to return all products
app.get("/", async (req, res) => {
  res.send(dbServices.getProducts());
});

app.post("/products", async (req, res) => {
  const productToAdd = req.body;
  const savedProduct = await dbServices.addProduct(productToAdd);
  if (savedProduct)
    res.status(201).send(savedProduct);
  else
    res.status(500).end();
});

app.delete("/products/:id", (req, res) => {
  const id = req.params["_id"];
  let result = findProductById(id);
  if (result === undefined)
    res.status(404).send("Resource not found.");
  else {
    dbServices.deleteProduct(id);
    res.status(204).end();
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

