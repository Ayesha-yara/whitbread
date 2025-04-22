import React from 'react';
import { useFormContext, FieldError, get } from 'react-hook-form';

type InputFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  error?: FieldError;
};

export default function InputField({ name, label, placeholder, type = 'text', required = true }: InputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, name);
  const errorMessage = fieldError?.message as string;

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium" style={{ color: 'var(--label-color)' }}>
        {label} {required && <span style={{ color: 'var(--error-color)' }}>*</span>}
      </label>
      <input
        id={name}
        {...register(name)}
        placeholder={placeholder}
        type={type}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
          errorMessage ? 'error' : ''
        }`}
        style={{
          backgroundColor: 'var(--input-bg)',
          color: 'var(--input-text)',
          borderColor: errorMessage ? 'var(--error-color)' : 'var(--input-border)'
        }}
        aria-invalid={errorMessage ? 'true' : 'false'}
      />
      {errorMessage && <p className="text-sm error-message" role="alert" style={{ color: 'var(--error-color)' }}>{errorMessage}</p>}
    </div>
  );
}