const express = require('express');
const router = express.Router();
const groomerController = require('../../controllers/user/groomer');
const authMiddleware = require('../../middleware/auth-middleware');

// USER

// Groomer routes

router.route('/get').get(authMiddleware, groomerController.getGroomer);

module.exports = router;
