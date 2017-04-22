import { LocalNotifications } from 'ionic-native';
import { notifyDay } from './date.utils.js';

const NotificationMap = new Map();

let idForNotifications = 0;

export function createNotification(tasks = []) {

  const data0 = Array.isArray(tasks) ? tasks: [tasks];

  const data = data0.filter(d => {

    if (NotificationMap.has(d.id)) { return; }

    NotificationMap.set(d.id, d);
    d.notification_id = idForNotifications++;
    return d;
  });

  const notifications = data.map(task => {

    if (!task.dateAt || task.dateAt === 'Invalid Date') { return; }

    const day = notifyDay(task.dateAt, task.timeAt, task.notifyOf);

    if (day < new Date()) { return; }

    return {
      id: task.notification_id,
      title: task.title,
      text: task.description,
      at: new Date(day), // timeAt should be in seconds
      led: 'FF0000'
    }
  }).filter(isNotUndefined);

  LocalNotifications.schedule(notifications);
}


export function deleteNotification(id) {

  if (NotificationMap.has(id)) {
    const task = NotificationMap.get(id);

    LocalNotifications.clear(task.notification_id);
  }
}

export function isNotUndefined(value) {
  return typeof value !== 'undefined';
}
