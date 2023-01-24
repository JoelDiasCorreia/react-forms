import React from 'react';
import Input from '../Components/Input';
import { emailMatchRule, maxLengthRule, minLengthRule, passwordMatchRule, requiredRule } from './inputValidationRules';




export interface ValidationRule{
    name: string; // name of the rule
    message: string; // error message to show when input validation fails
    validate: Function; // validation function
  }

export interface InputField {
    renderInput: Function;
      // return the JSX code that will
      // render the input component, passing
      // in the required props to Input component
    
    label: string;
    value: any; // default value for the input
    valid: boolean;
    errorMessage: string;
    touched: boolean;
    
    //  array of objects representing validation rules 
    validationRules: ValidationRule[]
    
  }








/**
 * creates and returns object representation of form field
 *
 * @param {string} label - label to show with the form input
 * @param {string} name - input name
 * @param {string} type - input type
 * @param {string} defaultValue - default value for the input
 */
function createFormFieldConfig(label: string, name: string, type: string, defaultValue = '') {
  return {
    renderInput: (handleChange: Function, value: any, isValid: boolean, error: string, key: number) => {
      return (
        <Input
          key={key}
          name={name}
          type={type}
          label={label}
          isValid={isValid}
          value={value}
          handleChange={handleChange}
          errorMessage={error}
        />
      );
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: '',
    touched: false,
  };
}

export  const signupForm = {
    name: {
      ...createFormFieldConfig('Full Name', 'name', 'text'),
      validationRules: [
        requiredRule('name'),
        minLengthRule('name', 3),
        maxLengthRule('name', 25),
      ],
    },
    email: {
      ...createFormFieldConfig('Email', 'email', 'email'),
      validationRules: [
        requiredRule('email'),
        emailMatchRule(),
        minLengthRule('email', 5),
        maxLengthRule('email', 40)
      ],
    },
    password: {
      ...createFormFieldConfig('Password', 'password', 'password'),
      validationRules: [
        requiredRule('password'),
        minLengthRule('password', 8),
        maxLengthRule('password', 20),
      ],
    },
    confirmPassword: {
      ...createFormFieldConfig('Confirm Password', 'confirmPassword', 'password'),
      validationRules: [passwordMatchRule()],
    },
  };


/**
 * creates and returns a validation rule object that
 * is used by useForm hook to validate the form inputs
 *
 * @param {string} ruleName - name of the validation rule
 * @param {string} errorMessage - message to display
 * @param {function} validateFunc - validation function
 */
export function createValidationRule(ruleName: string, errorMessage: string, validateFunc: Function): ValidationRule {
    return {
      name: ruleName,
      message: errorMessage,
      validate: validateFunc,
    };
  }