import React from 'react';
import { useFormContext, get } from 'react-hook-form';

type SelectFieldProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
  required?: boolean;
};

export default function SelectField({ name, label, options, placeholder, required = true }: SelectFieldProps) {
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
      <select
        id={name}
        {...register(name)}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm sm:text-sm ${
          errorMessage ? 'error' : ''
        }`}
        style={{
          backgroundColor: 'var(--input-bg)',
          color: 'var(--input-text)',
          borderColor: errorMessage ? 'var(--error-color)' : 'var(--input-border)'
        }}
        aria-invalid={errorMessage ? 'true' : 'false'}
        defaultValue=""
      >
        <option value="">{placeholder || 'Please select...'}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className="text-sm error-message" role="alert" style={{ color: 'var(--error-color)' }}>{errorMessage}</p>}
    </div>
  );
}