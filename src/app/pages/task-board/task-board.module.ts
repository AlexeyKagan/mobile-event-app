import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToasterModule } from 'angular2-toaster';

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TaskBoardRoutingModule } from './task-board-routing.module';
import { TaskBoardContainerComponent } from './task-board-container/task-board-container.component';
import { TaskBoardMainComponent } from './task-board-main/task-board-main.component';

import { taskBoardReducer } from './reducers/task-board.reducer';

export const reducers: ActionReducerMap<any> = {
  taskBoardReducer,
};

@NgModule({
  imports: [
    CommonModule,
    TaskBoardRoutingModule,
    IonicModule.forRoot(),
    // @TODO create shared modules for this (used in two places)
    ToasterModule.forRoot(),

    StoreModule.forFeature('taskBoard', taskBoardReducer),
    // EffectsModule.forFeature([BookEffects, CollectionEffects]),
  ],
  declarations: [TaskBoardContainerComponent, TaskBoardMainComponent]
})
export class TaskBoardModule { }
