import React, { useId } from 'react';
import { FieldError } from 'react-hook-form';

interface RadioOption {
  value: string;
  label: string;
}

interface RadioGroupProps {
  name: string;
  label: string;
  options: RadioOption[];
  error?: FieldError;
  onChange?: (value: string) => void;
  value?: string;
  required?: boolean;
}

export default function RadioGroup({
  name,
  label,
  options,
  error,
  onChange,
  value,
  required = true,
}: RadioGroupProps) {
  const groupId = useId();

  return (
    <div className="space-y-2">
      <label className="font-semibold block" style={{ color: 'var(--label-color)' }}>{label} {required && <span style={{ color: 'var(--error-color)' }}>*</span>}</label>
      <div className="mt-2 space-y-4">
        {options.map((option) => (
          <div key={option.value} className="grid grid-cols-[auto_1fr] items-center pl-4">
            <div className="flex items-center">
              <input
                type="radio"
                id={`${groupId}-${option.value}`}
                name={name}
                value={option.value}
                checked={value === option.value && value !== undefined && value !== ''}
                onChange={(e) => onChange?.(e.target.value)}
                className="h-5 w-5 text-primary border-gray-300 focus:ring-primary"
                style={{ accentColor: 'var(--primary)' }}
              />
            </div>
            <label 
              htmlFor={`${groupId}-${option.value}`}
              className="ml-3 text-sm font-medium cursor-pointer"
              style={{ color: 'var(--text-primary)' }}
            >
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}