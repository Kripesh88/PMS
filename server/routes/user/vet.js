const express = require('express');
const router = express.Router();
const vetController = require('../../controllers/user/vet');

const authMiddleware = require('../../middleware/auth-middleware');
// USER

// Vet routes

router.route('/get').get(authMiddleware, vetController.getVet);

module.exports = router;
