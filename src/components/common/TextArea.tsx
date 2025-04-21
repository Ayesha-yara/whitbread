import React from 'react';
import { FieldError } from 'react-hook-form';

interface TextAreaProps {
  name: string;
  label?: string;
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (value: string) => void;
  error?: FieldError;
}

export default function TextArea({
  name,
  label,
  placeholder,
  rows = 3,
  value,
  onChange,
  error,
}: TextAreaProps) {
  return (
    <div className="space-y-2">
      {label && <label htmlFor={name} className="font-medium text-gray-700">{label}</label>}
      <textarea
        id={name}
        name={name}
        rows={rows}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className={`w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}