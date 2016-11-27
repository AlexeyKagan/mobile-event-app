import { combineReducers } from 'redux';
import { TasksReducer2 }  from './tasks.reducer.js';
import { ContactsReducer } from './contacts.reducer.js'

export const RootReducer = combineReducers({
  tasks: TasksReducer2,
  contacts: ContactsReducer
});
