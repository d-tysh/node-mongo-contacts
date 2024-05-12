const express = require('express');
const router = express.Router();
const ctrlContacts = require('../controller');

router.get('/contacts', ctrlContacts.get);

router.get('/contacts/:id', ctrlContacts.getById);

router.post('/contacts', ctrlContacts.create);

router.put('/contacts/:id', ctrlContacts.update);

router.patch('/contacts/:id/favorite', ctrlContacts.update);

router.delete('/contacts/:id', ctrlContacts.remove);

module.exports = router;