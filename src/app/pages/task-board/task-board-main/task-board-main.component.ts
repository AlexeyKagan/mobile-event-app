import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-task-board-main',
  templateUrl: './task-board-main.component.html',
  styleUrls: ['./task-board-main.component.scss']
})
export class TaskBoardMainComponent implements OnInit {

  constructor() { }

  iconId: string = null;
  temp: string = '';

  tasks: Array<any> = new Array(10)
    .fill(0)
    .map((_, i) => ({
      id: i,
      timeAt: '11:1' + i,
      title: 'title: ' + i,
      description: 'description: ' + i,
    }));

  ngOnInit() {
  }

  aboutTask(task: string): void {
    console.log('task', task);
  }

}
