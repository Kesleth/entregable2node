const express = require('express');
const transferController = require('../controllers/transfer.controller');

const router = express.Router();

router.post('/', transferController.transfer);

module.exports = router;
