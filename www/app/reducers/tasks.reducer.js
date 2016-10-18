import { TASKS } from '../constants/tasks.js';

const initialState = [];

export function TasksReducer(state = initialState, action) {
  switch(action.type) {
    case TASKS.ADD_TASK:

      return [...state, action.payload];
    case TASKS.REMOVE_TASK:

      return [...action.payload];
    case TASKS.GET_TASKS_SUCCESS:

      return [...action.payload];
    default:
      return state;
  }
}