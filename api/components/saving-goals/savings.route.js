const express = require('express');
const router = express.Router();

// import auth
const checkAuth = require('../../middleware/check-auth');

// import controllers
const SavingsContollers = require('./savings.controller');

router.get('/', checkAuth, SavingsContollers.get_savings);

router.post('/', checkAuth, SavingsContollers.post_saving);

router.patch('/:savingID', checkAuth, SavingsContollers.update_saving);

router.delete('/:savingID', checkAuth, SavingsContollers.delete_saving);

module.exports = router;