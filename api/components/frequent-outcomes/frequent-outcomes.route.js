const express = require('express');
const router = express.Router();

// import auth
const checkAuth = require('../../middleware/check-auth');

// import controllers
const FrequentOutcomesControllers = require('./frequent-outcomes.controller');



router.get('/', checkAuth, FrequentOutcomesControllers.get_outcomes);

router.post('/', checkAuth, FrequentOutcomesControllers.post_outcome);

router.get('/:outcomeID',checkAuth, FrequentOutcomesControllers.get_outcome_by_id);

router.patch('/:outcomeID', checkAuth, FrequentOutcomesControllers.update_outcome);

router.delete('/:outcomeID', checkAuth, FrequentOutcomesControllers.delete_outcome);

module.exports = router;