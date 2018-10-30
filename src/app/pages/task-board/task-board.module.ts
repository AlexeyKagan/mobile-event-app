import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskBoardRoutingModule } from './task-board-routing.module';
import { TaskBoardComponent } from './task-board.component';

@NgModule({
  imports: [
    CommonModule,
    TaskBoardRoutingModule
  ],
  declarations: [TaskBoardComponent]
})
export class TaskBoardModule { }
