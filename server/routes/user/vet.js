const express = require('express');
const router = express.Router();
const vetController = require('../../controllers/user/vet');

// USER

// Vet routes

router.route('/get').get(vetController.getVet);

module.exports = router;
