import { combineReducers } from 'redux';
import { TasksReducer }  from './tasks.reducer.js';

export const RootReducer = combineReducers({
  tasks: TasksReducer
});