const express = require('express');
const finishTask = require('../controllers/finishTask');
const router = express.Router();

router.route('/finishTask').patch(finishTask);

module.exports = router;
