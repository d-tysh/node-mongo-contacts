const express = require('express');
const router = express.Router();
const ctrlUsers = require('../controller/users');
const authenticate = require('../middlewares/authenticate');

router.post('/login', ctrlUsers.login);

router.post('/register', ctrlUsers.register);

router.post('/logout', authenticate, ctrlUsers.logout);

router.get('/current', authenticate, ctrlUsers.getCurrent);

router.patch('/subscription', authenticate, ctrlUsers.update)

module.exports = router;