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
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        }
    },
    { versionKey: false, timestamps: true }
)

const Contact = mongoose.model('contact', contact);

module.exports = Contact;