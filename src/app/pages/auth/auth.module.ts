import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ToasterModule } from 'angular2-toaster';

import { ComponentsModule } from '../../components/components.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';
import { AuthRoutingModule } from './auth-routing.module';

import { AuthService } from './services/auth.service';
import { JwtService } from './services/jwt.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule, // @todo ?
    IonicModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ToasterModule.forRoot(),
    ComponentsModule
  ],
  declarations: [LoginComponent, SignUpComponent],
  providers: [
    AuthService,
    JwtService,
  ]
})
export class AuthModule {}
