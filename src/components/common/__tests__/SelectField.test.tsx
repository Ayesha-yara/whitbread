import React, { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { FormProvider, useForm } from 'react-hook-form';
import SelectField from '../SelectField';

// Wrapper component with FormProvider
const FormProviderWrapper = ({ children }: { children: ReactNode }) => {
  const methods = useForm();
  return <FormProvider {...methods}>{children}</FormProvider>;
};

describe('SelectField', () => {
  const options = [
    { value: 'option1', label: 'Option 1' },
    { value: 'option2', label: 'Option 2' },
    { value: 'option3', label: 'Option 3' },
  ];

  it('renders correctly with label and options', () => {
    render(
      <FormProviderWrapper>
        <SelectField 
          name="testSelect" 
          label="Test Select" 
          options={options}
        />
      </FormProviderWrapper>
    );
    
    // Use getByRole instead of getByLabelText since the label contains an asterisk
    expect(screen.getByRole('combobox', { name: /test select/i })).toBeInTheDocument();
    expect(screen.getByText('Option 1')).toBeInTheDocument();
    expect(screen.getByText('Option 2')).toBeInTheDocument();
    expect(screen.getByText('Option 3')).toBeInTheDocument();
  });

  it('shows required asterisk when required prop is true', () => {
    render(
      <FormProviderWrapper>
        <SelectField 
          name="testSelect" 
          label="Test Select" 
          options={options}
          required={true} 
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
        defaultValues: { testSelect: '' },
        mode: 'onChange'
      });
      
      // Use useEffect to set the error after the component mounts
      React.useEffect(() => {
        methods.setError('testSelect', {
          type: 'manual',
          message: 'This is an error message'
        });
      }, [methods]);
      
      return (
        <FormProvider {...methods}>
          <SelectField 
            name="testSelect" 
            label="Test Select" 
            options={options}
          />
        </FormProvider>
      );
    };
    
    render(<FormWithError />);
    
    const errorMessage = screen.getByText('This is an error message');
    expect(errorMessage).toBeInTheDocument();
    // We're using CSS variables for styling
    // Just verify the error message is displayed
  });

  it('renders placeholder option when provided', () => {
    render(
      <FormProviderWrapper>
        <SelectField 
          name="testSelect" 
          label="Test Select" 
          options={options}
          placeholder="Select an option"
        />
      </FormProviderWrapper>
    );
    
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('applies the correct CSS classes', () => {
    render(
      <FormProviderWrapper>
        <SelectField 
          name="testSelect" 
          label="Test Select" 
          options={options}
        />
      </FormProviderWrapper>
    );
    
    // Use getByRole instead of getByLabelText since the label contains an asterisk
    const select = screen.getByRole('combobox', { name: /test select/i });
    expect(select).toHaveClass('w-full');
    expect(select).toHaveClass('rounded-md');
  });
  
  it('can be controlled by setting a default value', () => {
    const FormWithDefaultValue = () => {
      const methods = useForm({
        defaultValues: { testSelect: 'option2' }
      });
      
      return (
        <FormProvider {...methods}>
          <SelectField 
            name="testSelect" 
            label="Test Select" 
            options={options}
          />
        </FormProvider>
      );
    };
    
    render(<FormWithDefaultValue />);
    
    // In a controlled form, the select should have the default value selected
    // Use getByRole instead of getByLabelText since the label contains an asterisk
    const select = screen.getByRole('combobox', { name: /test select/i }) as HTMLSelectElement;
    expect(select.value).toBe('option2');
  });
});
