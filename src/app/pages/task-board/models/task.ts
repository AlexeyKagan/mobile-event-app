export interface Task {
  title: string,
  description: string,
  timeAt: Date,
  dateAt: Date,
  notifyOf: number,
}

export interface TaskBoard {
  tasks: Task[],
  filterText: String
}
