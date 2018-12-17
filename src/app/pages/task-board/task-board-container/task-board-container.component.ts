import { Component, EventEmitter } from '@angular/core';
import { ToasterConfig } from 'angular2-toaster';
// import { MenuController } from 'ionic-angular';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-task-board',
  templateUrl: './task-board-container.component.html',
  styleUrls: ['./task-board-container.component.scss']
})
export class TaskBoardContainerComponent {

  constructor(
    private menuCtrl: MenuController
  ) {}

  eventEmitter = new EventEmitter(true);

  public config: ToasterConfig = new ToasterConfig({ 
    animation: 'fade', 
    positionClass: 'toast-bottom-center'
  });

  isLeftMenuShown = false;

  toggleLeftSideMenu(): void {
    this.menuCtrl.toggle();
  }

  onMenuClosed() {
    this.isLeftMenuShown = false;
  }

  onMenuOpen(): void {
    this.isLeftMenuShown = true;
  }

}
