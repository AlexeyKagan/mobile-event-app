/**
 * Use prefix for metadata like "RU", "ENG", etc...
 * In future willbe localized.
 *
 */
const MONTH_NAME_RU = {
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

const DAY_NAME_RU = {
  0: 'Воскресенье',
  1: 'Понедельник',
  2: 'Вторник',
  3: 'Среда',
  4: 'Четверг',
  5: 'Пятница',
  6: 'Суббота'
};



export function monthName(number, preffix = 'RU') {
  // willbe use getter here
  return MONTH_NAME_RU[number] || `Mounth with  this ${number} not found`;
}

export function dayName(number, preffix = 'RU') {

  return DAY_NAME_RU[number] || `Day with this ${number} not found`;
}