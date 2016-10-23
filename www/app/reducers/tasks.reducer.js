import { TASKS } from '../constants/tasks.js';

const initState = {
  isFetching: false,
  didInvalidate: false,
  tasks: []
};

export function TasksReducer2(state = initState, action) {
  switch (action.type) {
    case TASKS.INVALIDATE_TASK:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case TASKS.REQUEST_TASKS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });
    case TASKS.RECEIVE_TASKS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        tasks: action.tasks
      });
    case TASKS.UPDATE_ADDED_TASK:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        tasks: [...state.tasks, action.task]
      });
    default:
      return state
  }
}