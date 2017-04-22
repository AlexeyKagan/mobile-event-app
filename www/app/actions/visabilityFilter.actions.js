import { TASKS } from 'constants/tasks.js';

export function setVisabilityFilter(filter) {
  return {
    type: TASKS.SET_VISIBILITY_FILTER,
    filter
  }
}
