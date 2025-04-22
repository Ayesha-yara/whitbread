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
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        id={name}
        {...register(name)}
        placeholder={placeholder}
        type={type}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          errorMessage ? 'border-red-500' : 'border-gray-300'
        }`}
        aria-invalid={errorMessage ? 'true' : 'false'}
      />
      {errorMessage && <p className="text-sm text-red-500" role="alert">{errorMessage}</p>}
    </div>
  );
}