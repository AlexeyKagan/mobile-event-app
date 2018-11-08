import { Component, OnInit } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-task-board',
  templateUrl: './task-board-container.component.html',
  styleUrls: ['./task-board-container.component.scss']
})
export class TaskBoardContainerComponent implements OnInit {

  constructor(
  ) { }

  public config: ToasterConfig = new ToasterConfig({ 
    animation: 'fade', 
    positionClass: 'toast-bottom-center'
  });

  isLeftMenuShown = false;

  ngOnInit() {
  }

  toggleLeftSideMenu(): void {
    console.log('toggleLeftSideMenu')
  }

}
