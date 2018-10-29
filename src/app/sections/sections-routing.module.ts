import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/signup.component';


@Component({
  selector: 'hello-world',
  template: '<div>Hello world </div>',
})
export class HelloWorld implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  { 
    path: 'login', 
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: SignUpComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // declarations: [LoginComponent, SignUpComponent]
})
export class SectionsRoutingModule { }
