import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'task-board-add-task',
  templateUrl: './task-board-add-task.component.html',
  styleUrls: ['./task-board-add-task.component.scss']
})
export class TaskBoardAddTaskComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onAddTask() {
    console.log('this', this);
  }

}
