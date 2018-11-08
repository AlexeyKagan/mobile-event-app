import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskBoardContainerComponent } from './task-board-container/task-board-container.component';
import { TaskBoardMainComponent } from './task-board-main/task-board-main.component';

export const routes: Routes = [
  {
    path: '',
    component: TaskBoardContainerComponent,
    children: [
      {
        path: 'main',
        component: TaskBoardMainComponent,
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskBoardRoutingModule { }
