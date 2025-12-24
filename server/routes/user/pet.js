const express = require('express');
const router = express.Router();
const petController = require('../../controllers/user/pet');

// USER

// Pet routes

router.route('/:userId/create').post(petController.createPet);
router.route('/:userId/petProfile/:petId/get').get(petController.getPet);
module.exports = router;
