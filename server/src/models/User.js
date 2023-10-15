const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: false,
    },
    status:{
        type: String,
        default: 'user', 
    }
}, {timestamps: true});

const User = mongoose.model('users', UserSchema);
module.exports = User;
