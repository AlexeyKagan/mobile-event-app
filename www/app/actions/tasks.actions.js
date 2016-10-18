import { TASKS } from '../constants/tasks.js';

function addTask(task){

  const tasks = getAllTasks();

  tasks.push(task);
  saveTasks(tasks);

  return {
    type: TASKS.ADD_TASK,
    payload: task
  }
}

function removeTask(id){
  const tasks = getAllTasks().filter(d => d.id !== id);

  saveTasks(tasks);

  return {
    type: TASKS.REMOVE_TASK,
    payload: tasks
  };
}

function fetchTasks() {

  return {
    type: TASKS.GET_TASKS_SUCCESS,
    payload: getAllTasks()
  }
}

function getAllTasks() {

  return JSON.parse(window.localStorage['tasks'] || "[]");
}

function saveTasks(tasks) {

  window.localStorage['tasks'] = JSON.stringify(tasks);
}

export default { addTask, removeTask, fetchTasks };