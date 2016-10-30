/**
 * Use prefix for metadata like "RU", "ENG", etc...
 * In future willbe localized.
 *
 */
export const MONTH_NAME_RU = {
  0: 'Январь',
  1: 'Февраль',
  2: 'Март',
  3: 'Апрель',
  4: 'Май',
  5: 'Июнь',
  6: 'Июль',
  7: 'Август',
  8: 'Сентябрь',
  9: 'Октябрь',
  10: 'Ноябрь',
  11: 'Декабрь'
};

export const DAY_NAME_RU = {
  0: 'Воскресенье',
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота'
};

export const DAY_PREFFIX_NAME_RU = {
  0: 'Вс',
  1: 'Пн',
  2: 'Вт',
  3: 'Ср',
  4: 'Чт',
  5: 'Пт',
  6: 'Сб'
};

export function monthName(number, preffix = 'RU') {
  // willbe use getter here
  return MONTH_NAME_RU[number] || `Mounth with  this ${number} not found`;
}

export function dayName(number, preffix = 'RU') {

  return DAY_NAME_RU[number] || `Day with this ${number} not found`;
}

// get date in format yyyy/mm/dd
export const getLocalDate = value => {

  const date = new Date(value || Date.now());

  return `${date.getFullYear()}.${date.getMonth()}.${date.getDate()}`;
};

