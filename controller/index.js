const service = require('../service');

const get = async (_, res, next) => {
    try {
        const results = await service.getAllContacts();
        if (!results) {
            res.json({
                message: 'Not Found',
                data: 'No data'
            })
        }
        res.json({
            status: 'success',
            code: 200,
            data: { contacts: results }
        })
    } catch (error) {
        console.log(error.message);
        next(error)
    }
}

const getById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await service.getContactById(id);
        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact ID ${id}`,
                data: 'Not Found'
            })
        }
        res.json({
            status: 'success',
            code: 200,
            data: { contact: result }
        })
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const create = async (req, res, next) => {
    try {
        const result = await service.createContact(req.body);
        res.json({
            status: 'success',
            code: 201,
            message: 'New contact added',
            data: { contact: result }
        })
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const update = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await service.updateContact(id, req.body);
        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact ID: ${id}`,
                data: 'Not Found',
            })
        }
        res.json({
            status: 'success',
            code: 200,
            data: { contact: result }
        })
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const updateFavorite = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await service.updateContact(id, req.body);
        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact ID: ${id}`,
                data: 'Not Found',
            })
        }
        res.json({
            status: 'success',
            code: 200,
            data: { contact: result }
        })
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

const remove = async (req, res, next) => {
    const { id } = req.params;
    try {
        const result = await service.removeContact(id);
        if (!result) {
            res.status(404).json({
                status: 'error',
                code: 404,
                message: `Not found contact ID: ${id}`,
                data: 'Not Found'
            })
        }
        res.json({
            status: 'success',
            code: 200,
            message: `Contact with ID ${id} successfully deleted`,
            data: result
        })
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

module.exports = {
    get,
    getById,
    create,
    update,
    updateFavorite,
    remove
}