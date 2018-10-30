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

  isLoading = false;
  isSuccess = false;

  onSubmitSubscribe = (data: Object): void => {
    console.log('onSubmit: ', this.loginForm.value);
    console.log('onSubmit2', data);

    this.isLoading = false;
    this.router.navigate(['task-board']);
    this.isSuccess = true;
  }

  onSubmitError = (err: Error): void => {
    console.error(err);
    this.isLoading = false;
  }

  onSubmit(): void {
    const { login, password } = this.loginForm.value;

    this.isLoading = true;

    if (!login || !password) {
      console.log('Uncorrect login or password', password, password);
      this.isLoading = false;
      // this.showWarningToasty('Please type login or password');
      return;
    }

    of(this.loginForm.value)
      .pipe(delay(1000))
      .subscribe(
        this.onSubmitSubscribe,
        this.onSubmitError,
      );
  }
}
