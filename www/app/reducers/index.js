import { combineReducers } from 'redux';
import { TasksReducer2 }  from './tasks.reducer.js';

export const RootReducer = combineReducers({
  tasks: TasksReducer2
});