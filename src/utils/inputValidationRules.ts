import { createValidationRule } from "./formConfig";

export function requiredRule(inputName: string) {
    return createValidationRule(
      'required',
      `${inputName} required`,
      (inputValue: string) => inputValue.length !== 0
    );
  }
  
  export function minLengthRule(inputName: string, minCharacters: number) {
    return createValidationRule(
      'minLength',
      `${inputName} should contain atleast ${minCharacters} characters`,
      (inputValue: string) => inputValue.length >= minCharacters
    );
  }
  
  export function maxLengthRule(inputName: string, maxCharacters: number) {
    return createValidationRule(
      'minLength',
      `${inputName} cannot contain more than ${maxCharacters} characters`,
      (inputValue: string)  => inputValue.length <= maxCharacters
    );
  }

  export function emailMatchRule() {
    return createValidationRule(
      'emailFormat',
      `should be in the format of email`,
      (inputValue: string, formObj: any) => inputValue.includes("@")
    );
  }
  
  export function passwordMatchRule() {
    return createValidationRule(
      'passwordMatch',
      `passwords do not match`,
      (inputValue: string, formObj: any) => inputValue === formObj.password.value
    );
  }