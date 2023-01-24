import { fireEvent, render, screen } from '@testing-library/react';
import SignupForm from './SignupForm';

describe('SignupForm', () => {




    test('renders Sign Up title', () => {
        // arrange 
        render(<SignupForm />);

        // act 

        // assert
        const linkElement = screen.getByText(/Sign Up/i);
        expect(linkElement).toBeInTheDocument();

    });

    test('renders form', () => {
        // arrange 
        render(<SignupForm />);
        const nameInput = screen.getByLabelText("name");
        const emailInput = screen.getByLabelText("email");
        const passwordInput = screen.getByLabelText("password");
        const confirmPasswordInput = screen.getByLabelText("confirmPassword");

        // act 

        // assert
        expect(nameInput).toBeInTheDocument();
        expect(emailInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(confirmPasswordInput).toBeInTheDocument();

    });

    test('submmit button disables correctly', () => {
        // arrange 
        render(<SignupForm />);

        // act 

        // assert
        const buttonElement = screen.getByRole("button");
        expect(buttonElement).toBeDisabled();
    });

    test('submmit button enables correctly', () => {
        // arrange 
        render(<SignupForm />);
        const nameInput = screen.getByLabelText("name");
        const emailInput = screen.getByLabelText("email");
        const passwordInput = screen.getByLabelText("password");
        const confirmPasswordInput = screen.getByLabelText("confirmPassword");

        // act 
        fireEvent.change(nameInput, {target: {value: 'Joel Dias de Oliveira'}});
        fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
        fireEvent.change(passwordInput, {target: {value: '12345678'}});
        fireEvent.change(confirmPasswordInput, {target: {value: '12345678'}});

        // assert
        const buttonElement = screen.getByRole("button");
        expect(buttonElement).toBeEnabled();
    });

    test('validates passwords match and mismatch', () => {
        // arrange 
        render(<SignupForm />);

        // arrange 
        const passwordInput = screen.getByLabelText("password");
        const confirmPasswordInput = screen.getByLabelText("confirmPassword");

        // act 
        fireEvent.change(passwordInput, {target: {value: '12345678'}});
        
        // assert password mismatch
        fireEvent.change(confirmPasswordInput, {target: {value: '1234567'}})
        const validationMessage = screen.getByText(/passwords do not match/i);
        expect(validationMessage).toBeInTheDocument();

        // assert password match
        fireEvent.change(confirmPasswordInput, {target: {value: '12345678'}})
        expect(validationMessage).not.toBeInTheDocument();
    });

    test('validates email format', () => {
        // arrange 
        render(<SignupForm />);

        // arrange 
        const emailInput = screen.getByLabelText("email");
        // act 
        fireEvent.change(emailInput, {target: {value: 'test'}});
        // assert
        const validationMessage = screen.getByText(/should be in the format of email/i);
        expect(validationMessage).toBeInTheDocument();
        fireEvent.change(emailInput, {target: {value: 'test@test.com'}});
        expect(validationMessage).not.toBeInTheDocument();
    });
});
