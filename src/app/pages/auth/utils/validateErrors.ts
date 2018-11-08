import { ValidationMessages, Controls } from '../models/validation';

const validateError = (controls: Controls, validationMessages: ValidationMessages) => {
  return Object
    .keys(validationMessages)
    .reduce((acc, inputType) => {
      const controlError = controls[inputType].errors;

      if (!controlError) {
        return acc;
      }

      const inputMessages = validationMessages[inputType];
      const arrayOfErrorMessages = inputMessages.filter(message => controlError[message.type]);

      return acc.concat(arrayOfErrorMessages);
    }, [])
    .map(error => `<p>${error.message}</p>`)
    .join('');
}

export default validateError;
