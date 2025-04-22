import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormProvider, useForm } from 'react-hook-form';
import InputField from '../InputField';

// Wrapper component with FormProvider
const FormProviderWrapper: React.FC<{ children: ReactNode }> = ({ children }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('InputField', () => {
  it('renders correctly with label', () => {
    render(
      <FormProviderWrapper>
        <InputField 
          name="testField" 
          label="Test Label" 
        />
      </FormProviderWrapper>
    );
    
    // Use getByText instead of getByLabelText since the label contains an asterisk
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    render(
      <FormProviderWrapper>
        <InputField 
          name="testField" 
          label="Test Label" 
          required 
        />
      </FormProviderWrapper>
    );
    
    const asterisk = screen.getByText('*');
    expect(asterisk).toBeInTheDocument();
    // We're using CSS variables for styling, so we can't directly test the color
    // but we can verify the element exists
  });

  it('displays error message when provided', () => {
    // Create a form with an error message using setError
    const FormWithError = () => {
      const methods = useForm({
        defaultValues: { testField: '' },
        mode: 'onChange'
      });
      
      // Use useEffect to set the error after the component mounts
      React.useEffect(() => {
        methods.setError('testField', {
          type: 'manual',
          message: 'This is an error message'
        });
      }, [methods]);
      
      return (
        <FormProvider {...methods}>
          <InputField 
            name="testField" 
            label="Test Label" 
          />
        </FormProvider>
      );
    };
    
    render(<FormWithError />);
    
    // Wait for the error message to appear
    expect(screen.getByText('This is an error message')).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    render(
      <FormProviderWrapper>
        <InputField 
          name="testField" 
          label="Test Label" 
        />
      </FormProviderWrapper>
    );
    
    // Use getByRole instead of getByLabelText
    const input = screen.getByRole('textbox', { name: /test label/i });
    expect(input).toHaveClass('block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm');
    // We're using CSS variables with inline styles for theming
    // Just verify the element has the basic classes we expect
  });

  it('passes additional props to the input element', () => {
    render(
      <FormProviderWrapper>
        <InputField 
          name="testField" 
          label="Test Label" 
          placeholder="Enter text here" 
          type="email" 
        />
      </FormProviderWrapper>
    );
    
    // Use getByRole instead of getByLabelText
    const input = screen.getByRole('textbox', { name: /test label/i });
    expect(input).toHaveAttribute('placeholder', 'Enter text here');
    expect(input).toHaveAttribute('type', 'email');
  });
});
