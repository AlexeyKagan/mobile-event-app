import { TASKS } from '../constants/tasks.js';

const initialState = [];

export function TasksReducer(state = initialState, action) {
  switch(action.type) {
    case TASKS.ADD_TASK:

      return [...state, action.payload];
    case TASKS.REMOVE_TASK:
      return [
        ...state.slice(0, action.payload),
        ...state.slice(action.payload + 1)
      ];
    default:
      return state;
  }
}