const Contact = require('./schemas/contact');

const getAllContacts = async () => {
    return Contact.find();
}

const getContactById = async (id) => {
    return Contact.findOne({ _id: id });
}

const createContact = async (fields) => {
    return Contact.create(fields);
}

const updateContact = async (id, fields) => {
    return Contact.findByIdAndUpdate({ _id: id }, fields, { new: true });
}

const removeContact = async (id) => {
    return Contact.findByIdAndDelete({ _id: id });
}

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    removeContact
}