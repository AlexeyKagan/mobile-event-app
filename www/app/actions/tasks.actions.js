import { TASKS } from '../constants/tasks.js';
import getAuthService from 'services/AuthService.js';
import { API_URL } from 'core/consts.js';
import { createNotification, deleteNotification } from 'core/Notifications.js';

export function selectTask(task) {
  return {
    type: TASKS.SELECT_TASK,
    task
  }
}

export function invalidateTask(task) {
  return {
    type: TASKS.INVALIDATE_TASK,
    task
  }
}

export function requestTasks() {
  return {
    type: TASKS.REQUEST_TASKS
  }
}

export function receiveTasks(data = []) {

  createNotification(data.tasks);

  return {
    type: TASKS.RECEIVE_TASKS,
    tasks: data.tasks
  }
}

export function updateAddedTask(task) {

  createNotification(task);

  return {
    type: TASKS.UPDATE_ADDED_TASK,
    task: task
  }
}

export function saveTask(task) {
  return dispatch => {
    dispatch(requestTasks());

    return fetch(`${API_URL}/api/notes`, {
      method: 'POST',
      ...getHeadersForRequest(),
      body: JSON.stringify(task)
    })
    .then(response => response.json())
    .then(data => {

      return data.success && dispatch(updateAddedTask(task))
    })
  }
}

export function fetchTasks() {

	return dispatch => {

		dispatch(requestTasks());

		return fetch(`${API_URL}/api/notes`, getHeadersForRequest())
	    .then(response => response.json())
      .then(data => { console.log('fetchTasks', data); dispatch(receiveTasks(data)) })
      .catch(err => console.log('fetch api/notes err:', err))
	}
}

export function deleteTask(id) {
  return dispatch => {
    deleteNotification(id);

    dispatch(requestTasks());
    return fetch(`${API_URL}/api/notes/${id}`, {
      method: 'DELETE',
      ...getHeadersForRequest()
    })
    .then(response => response.json())
    .then(data => data.success && dispatch(receiveTasks(data)));
  }
}


function getHeadersForRequest() {
  // TODO move it.
  const authService = getAuthService();
  const headers = {
    headers: {
      authorization: authService.isLoggedIn(),
      'content-type': 'application/json; charset=utf-8'
    }
  };

  return headers;
}
