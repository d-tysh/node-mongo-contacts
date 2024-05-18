const Contact = require('./schemas/contact');

const getAllContacts = async (owner, page = 1, limit = 10, favorite) => {
    const skip = (page - 1) * limit;
    let fields = { owner };
    if (favorite) {
        fields = { owner, favorite }
    }
    return Contact.find(fields, '-createdAt -updatedAt', { skip, limit }).populate('owner', 'email');
}

const getContactById = async (id, owner) => {
    return Contact.findOne({_id: id, owner}).populate('owner', 'email');
}

const createContact = async (fields) => {
    return Contact.create(fields);
}

const updateContact = async (id, owner, fields) => {
    return Contact.findOneAndUpdate({ _id: id, owner }, fields, { new: true });
}

const removeContact = async (id, owner) => {
    return Contact.findOneAndDelete({ _id: id, owner });
}

module.exports = {
    getAllContacts,
    getContactById,
    createContact,
    updateContact,
    removeContact
}