const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin');
const authMiddleware = require('../../middleware/auth-middleware');
const roleMiddleware = require('../../middleware/role-middleware');
// ADMIN

// Admin routes

router
  .route('/create')
  .post(authMiddleware, roleMiddleware('Admin'), adminController.createProfessional);

router
  .route('/list')
  .get(authMiddleware, roleMiddleware('Admin'), adminController.listProfessional);

router
  .route('/:id')
  .patch(authMiddleware, roleMiddleware('Admin'), adminController.updateProfessional);

router
  .route('/:id')
  .delete(authMiddleware, roleMiddleware('Admin'), adminController.deleteProfessional);

router.route('/users').get(authMiddleware, roleMiddleware('Admin'), adminController.listUsers);

router.route('/users/:id').patch(authMiddleware, roleMiddleware('Admin'), adminController.updateUser);
module.exports = router;
