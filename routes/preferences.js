
const express = require('express');
const router = express.Router();
const preferencesController = require('../controllers/preferencesController');

router.get('/:steamId', preferencesController.getPreferences);

router.post('/:steamId', preferencesController.storePreferences);

module.exports = router;
