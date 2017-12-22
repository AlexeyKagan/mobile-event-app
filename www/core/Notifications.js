import { LocalNotifications } from 'ionic-native';

import {
  getNotCreatedNotification,
  cashNotificationsInMap,
  addIdForNotifications,
  validateNotifications,
  NotificationMap
} from './notifications.utils';

export function createNotification(tasks = []) {

  const data0 = Array.isArray(tasks) ? tasks: [tasks];

  const notifs = getNotCreatedNotification(data0);

  cashNotificationsInMap(notifs);

  const data = addIdForNotifications(notifs);

  const notifications = validateNotifications(data);

  LocalNotifications.schedule(notifications);
}

export function deleteNotification(id) {
  if (NotificationMap.has(id)) {
    const task = NotificationMap.get(id);

    LocalNotifications.clear(task.notification_id);
  }
}
