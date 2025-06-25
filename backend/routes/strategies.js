const express = require('express');
const router = express.Router();
const { getAllStrategies, addStrategy } = require('../controllers/strategyController');

router.get('/', getAllStrategies);
router.post('/', addStrategy);

module.exports = router;
