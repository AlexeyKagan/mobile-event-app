import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, } from "rxjs";
import { ToasterService, ToasterConfig, BodyOutputType } from 'angular2-toaster';

import { AuthService } from '../services/auth.service';
import validateErrors from '../utils/validateErrors';
import { SIGNUP_VALIDATION_MESSAGES } from './consts'



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../assets/auth.scss', './signup.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toasterService: ToasterService,
    ) { }

  public config: ToasterConfig = new ToasterConfig({ 
    animation: 'fade', 
    positionClass: 'toast-bottom-center'
  });

  signupForm: FormGroup;
  authServiceSubscribe: Subscription;

  ngOnInit() {
    this.signupForm = this.fb.group({
      'username': ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      'email': ['', Validators.required],
      'password': ['', Validators.required],
      'birthday': ['', Validators.required]
    });
  }

  presentToast(message: string, timeout: number = 2000) {
    this.toasterService.pop({
      type: 'warning',
      body: message,
      timeout,
      bodyOutputType: BodyOutputType.TrustedHtml
    });
  }

  validateError(): void {
    const { controls } = this.signupForm;

    const arrayOfErrorMessages = validateErrors(controls, SIGNUP_VALIDATION_MESSAGES)

    this.presentToast(arrayOfErrorMessages);
  }

  onSubmit(): void {
    const { value, invalid } = this.signupForm;
    
    if (invalid) {
      this.validateError();
      return;
    }

    this.authService
      .signup(value)
      .subscribe(
        () => this.router.navigate(['task-board']),
        err => console.error(err)
      );
  }
}
