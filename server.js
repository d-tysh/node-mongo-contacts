const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();

const app = express();

app.use(logger('tiny'));
app.use(express.json());
app.use(cors());

const contactsRouter = require('./api/contacts');
const usersRouter = require('./api/users');

app.use('/api/users', usersRouter);
app.use('/api/contacts', contactsRouter);

app.use((_, res, __) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Use api on routes: /api/contacts, /api/users',
        data: 'Not Found'
    })
})

app.use((error, _, res, __) => {
    const { status = 500, message } = error;
    res.status(status).json({ status, message })
})

const { PORT = 3000, DB_HOST } = process.env;

const connection = mongoose.connect(DB_HOST);

connection
    .then(() => {
        app.listen(PORT, () => {
            console.log('Database connection successful');
        })
    })
    .catch(error => {
        console.log(`Error database connection: ${error.message}`);
        process.exit(1);
    })