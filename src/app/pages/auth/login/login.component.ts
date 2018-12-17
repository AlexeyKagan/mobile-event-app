import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'section-login',
  templateUrl: './login.component.html',
  styleUrls: ['../assets/auth.scss', './login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent {

  constructor(
    private router: Router,
    private authService: AuthService,
    ) {}

  loginForm = new FormGroup({
    username: new FormControl(''),
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
    const { value } = this.loginForm;
    const { username, password } = value;

    this.isLoading = true;
    // @todo create validation
    if (!username || !password) {
      this.isLoading = false;
      return;
    }

    this.authService
      .login(value)
      .pipe(delay(1000))
      .subscribe(
        this.onSubmitSubscribe,
        this.onSubmitError
      );
  }

  onClickTest() {
    console.log('----');
  }
}
