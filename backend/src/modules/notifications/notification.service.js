import Notification from './notification.model.js';

export const getNotifications = async (userId) => {
  return await Notification.find({ userId }).sort({ createdAt: -1 });
};

export const markAsRead = async (id, userId) => {
  const notification = await Notification.findById(id);
  if (!notification) throw new Error('Notification not found.');

  if (notification.userId.toString() !== userId.toString()) {
    throw new Error('Access denied. You do not own this notification.');
  }

  notification.isRead = true;
  await notification.save();
  return notification;
};

export const createNotification = async (userId, title, message) => {
  const notification = new Notification({
    userId,
    title,
    message
  });
  await notification.save();
  return notification;
};
