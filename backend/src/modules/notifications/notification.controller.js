import * as notificationService from './notification.service.js';

export const getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await notificationService.getNotifications(req.user.id);
    res.status(200).json({ success: true, notifications });
  } catch (error) {
    next(error);
  }
};

export const readNotification = async (req, res, next) => {
  try {
    const notification = await notificationService.markAsRead(req.params.id, req.user.id);
    res.status(200).json({ success: true, message: 'Notification marked as read.', notification });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message, errorCode: 'BAD_REQUEST' });
  }
};
