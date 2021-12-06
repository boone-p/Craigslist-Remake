const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
    },
    {collection: "Users"}
);

//https://mongoosejs.com/docs/middleware.html#pre
userSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 8, (err, hash) => {
        this.password = hash;
        next();
    })
})

module.exports = userSchema;
