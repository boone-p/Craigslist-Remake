const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// use these to install bycrpt in database folder
// npm install node-gyp -g
// npm install bcrypt -g

// npm install bcrypt --save

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

userSchema.methods.validateLogin = async function(password) {
    if(!password) throw new Error("password is missing")

    try{
        const result = await bcrypt.compare(password, this.password)
        return result;
    } catch (error) {
        console.log('passsword is invalid', error.message)
    }
}

module.exports = userSchema;
