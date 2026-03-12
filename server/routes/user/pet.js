const express = require('express');
const router = express.Router();
const petController = require('../../controllers/user/pet');
const authMiddleware = require('../../middleware/auth-middleware');
// USER

// Pet routes

router.route('/:id/create').post(authMiddleware, petController.createPet);
router.route('/:id/petProfile/get').get(authMiddleware, petController.getPet);
router.route('/update').put(authMiddleware, petController.updatePet);
module.exports = router;
