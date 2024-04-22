const express = require('express');
const router = express.Router();
const UserControllers = require('../controllers/users');

router.post('/signup', UserControllers.signup );

router.post('/login', UserControllers.login );

router.delete('/:userID', UserControllers.delete_user);


module.exports = router;