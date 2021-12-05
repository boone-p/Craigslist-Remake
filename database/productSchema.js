const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
			trim: true,
			validate(value) {
				if ((value.length < 1) || (value.length > 255)) throw new Error("Invalid title.");
			},
		},
		description: {
			type: String,
			required: true,
			trim: true,
			validate(value) {
				if ((value.length < 1) || (value.length > 1024)) throw new Error("Invalid description.");
			},
		},
		category: {
			type: String,
			required: true
		},
		// condition: {
		// 	type: String,
		// 	required: true
		// },
		image: {
			type: String,
			required: true
		},
		contactInfo: {
			type: String, //_id of user
			required: true,
		},
		location: {
			type: String,
			required: true
		},
		datePosted: {
			type: Date,
			required: true,
			default: Date.now
		}
	},
	{ collection: "Products" }
);

module.exports = productSchema;
