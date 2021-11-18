const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    },
    {collection: "Users"}
);

//https://mongoosejs.com/docs/middleware.html#pre
userSchema.pre('save', function(next) {
    if(this.isModified('password')){
        bcrypt.hash(this.password, 8, (err, hash) => {
            if(err) {
                return next(err);
            }
            this.password = hash;
            next();
       })
    }
})

module.exports = userSchema;
