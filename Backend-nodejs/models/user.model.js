const mongoose = require("mongoose");
const findOrCreate = require('mongoose-findorcreate')
const passportLocalMongoose = require("passport-local-mongoose");
const {ROLES} = require("../utils/roles");

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true },
    firstName: String,
    lastName: String,
    phoneNumber: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    address: {
        type: String,
        require: false,
        default: ''
    },
    img:
        {
            data: Buffer,
            contentType: String
        },
    role: { type: String, default: ROLES.User },
    blocked: {
        type: Boolean,
        require: false,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpires: String,

});

userSchema.plugin(passportLocalMongoose);
userSchema.plugin(findOrCreate);

const User = mongoose.model("user", userSchema);

module.exports = { User };
