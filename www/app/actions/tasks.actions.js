import { TASKS } from '../constants/tasks.js';

function addTask(task){
  return {
    type: TASKS.ADD_TASK,
    payload: task
  }
}

function removeTask(id){
  return {
    type: TASKS.REMOVE_TASK,
    payload: id
  };
}

export default { addTask, removeTask };