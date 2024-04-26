const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

// import auth
const checkAuth = require('../../middleware/check-auth');

// import controllers
const IncomesControllers =  require('./incomes.controller');


router.get('/',checkAuth, IncomesControllers.get_incomes); 

router.post('/',checkAuth, IncomesControllers.post_income);

router.get('/:incomeID', checkAuth, IncomesControllers.get_income_by_id);

router.patch('/:incomeID', checkAuth, IncomesControllers.update_income);

router.delete('/:incomeID', checkAuth, IncomesControllers.delete_income);

module.exports = router;