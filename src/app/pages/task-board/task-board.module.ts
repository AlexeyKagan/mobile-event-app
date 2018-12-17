import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ToasterModule } from 'angular2-toaster';

import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { TaskBoardRoutingModule } from './task-board-routing.module';
import { TaskBoardContainerComponent } from './task-board-container/task-board-container.component';
import { TaskBoardMainComponent } from './task-board-main/task-board-main.component';
import { TaskBoardInfoComponent } from './task-board-main/task-board-info/task-board-info.component';
import { TaskBoardListComponent } from './task-board-main/task-board-list/task-board-list.component';

import { TaskBoardAddTaskComponent } from './task-board-add-task/task-board-add-task.component';

import { taskBoardReducer } from './reducers/task-board.reducer';
import { WeatherService } from './services/weather.service';

import { ComponentsModule } from '../../components/components.module';
import { from } from 'rxjs';

// @TODO s
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
    ComponentsModule,
  ],
  declarations: [
    TaskBoardContainerComponent, 
    TaskBoardMainComponent,
    TaskBoardInfoComponent,
    TaskBoardListComponent,
    TaskBoardAddTaskComponent,
  ],
  providers: [
    WeatherService
  ]
})
export class TaskBoardModule { }
