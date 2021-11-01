// backend for Free Stuff App

const products = {
  productsList: [
    {
      id: "xyz789",
      title: "Skateboard",
      description: "cool skateboard",
      location: "San Luis Obispo, CA",
      category: "fun",
      contactInfo: "boone@mail.com",
    },
    {
      id: "abc123",
      title: "BBgun",
      description: "shoots bbs",
      location: "Los Angeles, CA",
      category: "fun",
      contactInfo: "ryan@mail.com",
    },
    {
      id: "ppp222",
      title: "Fork",
      description: "a metal fork",
      location: "San Luis Obispo, CA",
      category: "cooking",
      contactInfo: "bruno@mail.com",
    },
  ],
};

const express = require("express");
const mongoose = require("mongoose");
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
  productToAdd.id = mongoose.Types.ObjectId();
  const savedProduct = await dbServices.addProduct(productToAdd);
  if (savedProduct)
    res.status(201).send(savedProduct);
  else
    res.status(500).end();
});

app.delete("/products/:id", (req, res) => {
  const id = req.params["id"];
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

