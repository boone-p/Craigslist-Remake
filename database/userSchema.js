const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            validate(value) {
				if ((value.length < 1) || (value.length > 50)) throw new Error("Invalid name.");
			},
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            validate(value) {
				if ((value.length < 5) || (value.length > 255)) throw new Error("Invalid email.");
			},
        },
        password: {
            type: String,
            required: true,
            validate(value) {
				if ((value.length < 1) || (value.length > 255)) throw new Error("Invalid password.");
			},
        },
        productsAvailable: {
            type: [String]
        }
    },
    {collection: "usersList"}
);

module.exports = userSchema;