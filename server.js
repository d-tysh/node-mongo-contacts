const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const logger = require('morgan');
require('dotenv').config();

const app = express();

app.use(logger('tiny'));
app.use(express.json());
app.use(cors());

const contactsRouter = require('./api');

app.use('/api', contactsRouter);

app.use((_, res, __) => {
    res.status(404).json({
        status: 'error',
        code: 404,
        message: 'Use api on routes: /api/contacts',
        data: 'Not Found'
    })
})

app.use((error, _, res, __) => {
    res.status(500).json({
        status: 'fail',
        code: 500,
        message: error.message,
        data: 'Internal Server Error'
    })
})

const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb);

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

module.exports = app;