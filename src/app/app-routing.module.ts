import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/task-board/main',
    pathMatch: 'full'
  },
  {
    path: 'task-board',
    loadChildren: './pages/task-board/task-board.module#TaskBoardModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
