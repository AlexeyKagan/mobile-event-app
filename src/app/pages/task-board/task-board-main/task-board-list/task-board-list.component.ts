import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'task-board-list',
  templateUrl: './task-board-list.component.html',
  styleUrls: ['./task-board-list.component.scss']
})
export class TaskBoardListComponent implements OnInit {

  constructor() { }
  // @TODO any
  @Input() tasks: Array<any>;

  ngOnInit() {
  }

}
