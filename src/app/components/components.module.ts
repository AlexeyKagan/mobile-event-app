import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';

import { NavButtonComponent } from './nav-button/nav-button.component';
import { MockComponent } from './mock/mock-component';

@NgModule({
  imports: [
    CommonModule,
    IonicModule.forRoot(),
    RouterModule,
  ],
  declarations: [
    NavButtonComponent,
    MockComponent,
  ],
  exports: [
    NavButtonComponent,
    MockComponent,
  ]
})
export class ComponentsModule {}
