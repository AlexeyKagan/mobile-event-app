import { AbstractControl } from '@angular/forms/src/model';

interface ErrorMessage {
  type: string,
  message: string,
}

export interface Controls {
  [key: string]: AbstractControl;
};

export interface ValidationMessages {
  [key: string]: Array<ErrorMessage>
}
