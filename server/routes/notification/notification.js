const express = require('express');
const router = express.Router();
const notificationController = require('../../controllers/notification');
const authMiddleware = require('../../middleware/auth-middleware');

// Notification routes

router.route('/get').get(authMiddleware, notificationController.getNotification);
router.route('/unread').get(authMiddleware, notificationController.getUnreadCount);
router.route('/:id/mark').get(authMiddleware, notificationController.markAsRead);

module.exports = router;