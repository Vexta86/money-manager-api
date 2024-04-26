const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
// import auth
const checkAuth = require('../../middleware/check-auth');

// import controllers
const OutcomesControllers = require('./outcomes.controller');



router.get('/', checkAuth, OutcomesControllers.get_outcomes);

router.post('/', checkAuth, OutcomesControllers.post_outcome);

router.get('/:outcomeID',checkAuth, OutcomesControllers.get_outcome_by_id);

router.patch('/:outcomeID', checkAuth, OutcomesControllers.update_outcome);

router.delete('/:outcomeID', checkAuth, OutcomesControllers.delete_outcome);

module.exports = router;