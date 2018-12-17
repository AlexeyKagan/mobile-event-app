import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskBoardContainerComponent } from './task-board-container/task-board-container.component';
import { TaskBoardMainComponent } from './task-board-main/task-board-main.component';
import { TaskBoardAddTaskComponent } from './task-board-add-task/task-board-add-task.component';

import { MockComponent } from '../../components/mock/mock-component';

export const routes: Routes = [
  {
    path: '',
    component: TaskBoardContainerComponent,
    children: [
      {
        path: 'main',
        component: TaskBoardMainComponent,
      },
      {
        path: 'add-task',
        component: TaskBoardAddTaskComponent,
      },
      {
        path: 'calendar',
        component: MockComponent,
      },
      { 
        path: 'contacts',
        component: MockComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskBoardRoutingModule { }
