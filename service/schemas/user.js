const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema(
    {
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        subscription: {
            type: String,
            enum: ['starter', 'pro', 'business'],
            default: 'starter'
        },
        token: {
            type: String,
            default: ''
        }
    },
    { versionKey: false }
)

const User = mongoose.model('user', user);
module.exports = User;