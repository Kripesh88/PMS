const express = require('express');
const router = express.Router();
const userAuthController = require('../../controllers/user');


// USER

// Authentication routes

router.route('/login').post(userAuthController.userLogin);
router.route('/register').post(userAuthController.userRegistration);




module.exports = router;
