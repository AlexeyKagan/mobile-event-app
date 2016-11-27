import { LocalNotifications } from 'ionic-native';
import { notifyDay } from './date.utils.js';

let idForNotifications = 0;

export function createNotification(tasks = []) {

  const data = Array.isArray(tasks) ? tasks: [tasks];

  const notifications = data.map((task) => {

    if (!task.dateAt) { return; }

    const day = notifyDay(task.dateAt, task.timeAt, task.notifyOf);

    if (day < new Date()) { return; }

    return {
      id: idForNotifications++,
      title: task.title,
      text: task.description,
      at: new Date(day), // timeAt should be in seconds
      led: 'FF0000'
    }
  }).filter( d => d);

  LocalNotifications.schedule(notifications);

}
