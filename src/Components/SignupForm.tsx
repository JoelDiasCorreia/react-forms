import useForm from '../hooks/useForm';
import { signupForm } from '../utils/formConfig';

import './SignupForm.css';

export default function SignupForm() {
  const { renderFormInputs, isFormValid, getValues } = useForm(signupForm);

    const submitForm = (event: any) => {
        event.preventDefault();
        console.log('form submitted');
        console.log(getValues());
        
    }

  return (
    <form className="signupForm">
      <h1>Sign Up</h1>

      {renderFormInputs()}

      <button onClick={submitForm} disabled={!isFormValid()} type="submit">Submit</button>
    </form>
  );
}