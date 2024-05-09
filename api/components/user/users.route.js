const express = require('express');
const router = express.Router();
const UserControllers = require('./users.controller');
const checkAuth = require('../../middleware/check-auth');

router.get('/',checkAuth, UserControllers.getUser);

router.post('/signup', UserControllers.signup );

router.post('/login', UserControllers.login );

router.delete('/:userID', UserControllers.delete_user);


module.exports = router;