const express = require('express');
const router = express.Router();
const groomerController = require('../../controllers/user/groomer');

// USER

// Groomer routes

router.route('/get').get(groomerController.getGroomer);

module.exports = router;
