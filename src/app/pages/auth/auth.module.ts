import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, // @todo ?
    IonicModule,
    ReactiveFormsModule,
    AuthRoutingModule,
  ],
  declarations: [LoginComponent, SignUpComponent]
})
export class AuthModule {}
