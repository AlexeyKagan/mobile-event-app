import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { of } from 'rxjs';
import { delay } from 'rxjs/operators';


@Component({
  selector: 'section-login',
  templateUrl: './login.component.html',
  styleUrls: ['../assets/auth.scss', './login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router) {}

  loginForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  isLoading: boolean = false;
  isSuccess: boolean = false;

  onSubmitSubscribe = (data: Object): void => {
    console.log('onSubmit: ', this.loginForm.value);
    console.log('onSubmit2', data);

    this.isLoading = false;
    this.router.navigate(['signup']);
    this.isSuccess = true;
  }

  onSubmitError = (err: Error): void => {
    console.error(err);
    this.isLoading = false;
  }

  onSubmit(): void {
    this.isLoading = true;

    of(this.loginForm.value)
      .pipe(delay(1000))
      .subscribe(
        this.onSubmitSubscribe,
        this.onSubmitError,
      )
  }
}
