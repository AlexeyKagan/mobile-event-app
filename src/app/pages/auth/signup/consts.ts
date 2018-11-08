import { ValidationMessages } from '../models/validation';

export const SIGNUP_VALIDATION_MESSAGES: ValidationMessages = {
  'username': [
    { type: 'required', message: 'Username is required' },
    { type: 'minlength', message: 'Username must be at least 3 characters long' },
    { type: 'maxlength', message: 'Username cannot be more than 25 characters long' },
    { type: 'validUsername', message: 'Your username has already been taken' }
  ],
  'email': [
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', message: 'Enter a valid email' }
  ],
  'password': [
    { type: 'required', message: 'Password is required' },
    { type: 'minlength', message: 'Password must be at least 5 characters long' },
    { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
  ],
  'birthday': [
    { type: 'required', message: 'Birthday is required' }
  ]
}
