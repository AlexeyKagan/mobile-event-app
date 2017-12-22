import { notifyDay } from './date.utils.js';

export const NotificationMap = new Map();

let idForNotifications = 0;

export const getNotCreatedNotification = notifs => notifs.filter(({ id }) => !NotificationMap.has(id));

export const cashNotificationsInMap = notifs => notifs.forEach(notif => NotificationMap.set(notif.id, notif));

export const addIdForNotifications = notifs => notifs.map(notif => ({ ...notif, notification_id: idForNotifications++ }));

export const isInvalidNotifDate = notif => !notif.dateAt || notif.dateAt === 'Invalid Date';

export const validateNotifications = notifs => notifs.reduce((acc, notif) => {

  if (isInvalidNotifDate(notif)) {
    return acc;
  }

  const day = notifyDay(notif.dateAt, notif.timeAt, notif.notifyOf);

  if (day < new Date()) {
    return acc;
  }

  const notificationTask = {
    id: notif.notification_id,
    title: notif.title,
    text: notif.description,
    at: new Date(day),
    led: 'FF0000',
  };

  return [...acc, notificationTask];
}, []);
