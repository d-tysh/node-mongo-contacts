const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contact = new Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
            unique: true
        },
        phone: {
            type: String,
        },
        favorite: {
            type: Boolean,
            default: false
        }
    },
    { versionKey: false }
)

const Contact = mongoose.model('contact', contact);

module.exports = Contact;