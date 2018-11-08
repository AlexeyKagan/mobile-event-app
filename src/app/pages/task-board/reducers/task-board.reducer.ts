import { Action } from '@ngrx/store';

export enum TasksActionTypes {
  ADD_TASK = 'ADD_TASK',
  REMOVE_TASK = 'REMOVE_TASK',
  UPDATE_TASK = 'UPDATE_TASK'
}

interface Task {
  title: string,
  description: string,
  timeAt: Date,
  dateAt: Date,
  notifyOf: number,
}

interface TaskBoard {
  tasks: Task[],
  searchQuery: String
}

const initialState: TaskBoard = {
  tasks: [],
  searchQuery: '',
}

export class addTask implements Action {
  readonly type = TasksActionTypes.ADD_TASK;

  constructor(public payload: Task) {}
}

export class removeTask implements Action {
  readonly type = TasksActionTypes.REMOVE_TASK;

  constructor(public payload: string) {}
}

export type TasksActionsUnion =
  | addTask
  | removeTask

export function taskBoardReducer(
  state = initialState,
  action: TasksActionsUnion,
): TaskBoard {
  switch (action.type) {
    case TasksActionTypes.ADD_TASK:
      return initialState;
    case TasksActionTypes.REMOVE_TASK:
      return initialState;
    default: {
      return state;
    }
  }
}