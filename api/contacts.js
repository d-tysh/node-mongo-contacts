const express = require('express');
const router = express.Router();
const ctrlContacts = require('../controller/contacts');
const authenticate = require('../middlewares/authenticate');

router.use(authenticate);

router.get('/', ctrlContacts.get);

router.get('/:id', ctrlContacts.getById);

router.post('/', ctrlContacts.create);

router.put('/:id', ctrlContacts.update);

router.patch('/:id/favorite', ctrlContacts.update);

router.delete('/:id', ctrlContacts.remove);

module.exports = router;