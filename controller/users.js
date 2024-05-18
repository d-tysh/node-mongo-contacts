const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../service/schemas/user');
const { SECRET_KEY } = process.env;

const register = async (req, res, next) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            console.log(user);
            res.status(409).json({
                status: 'conflict',
                code: 409,
                message: `User with email ${email} already exists`
            })
        }

        const password = await bcrypt.hash(req.body.password, 10);
        await User.create({ ...req.body, password })
        res.status(201).json({
            status: 'success',
            code: 201,
            message: `User ${email} registered successfully`,
        })
    } catch (error) {
        next(error);
    }
}

const login = async (req, res, next) => {
    const { email, password } = req.body;
    
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Email or password is incorrect'
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(401).json({
                error: 'Unauthorized',
                message: 'Email or password is incorrect'
            })
        }

        const { _id: id } = user;
        const payload = { id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '10h' });
        await User.findByIdAndUpdate(id, { token });
        res.json({
            message: 'Authorized',
            data: { token }
        })
    } catch (error) {
        next(error);
    }
}

const logout = async (req, res) => {
    const { _id: id } = req.user;
    console.log(id);
    await User.findByIdAndUpdate(id, { token: '' });
    res.status(200).json({
        message: 'Logout successful'
    })
}

const getCurrent = async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({
        data: { email, subscription }
    })
}

const update = async (req, res) => {
    const { _id: id } = req.user;
    const result = await User.findByIdAndUpdate(id, req.body, {new: true});
    res.status(200).json({
        data: {
            email: result.email,
            subscription: result.subscription
        }
    })
}

module.exports = {
    register,
    login,
    logout,
    getCurrent,
    update
}