const express = require('express');
const router = express.Router();
const PushContoller = require('./push.controller')

router.get('/', PushContoller.get_public_key);

module.exports = router;