import { useId } from 'react';
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
}

export default function RadioGroup({
  name,
  label,
  options,
  error,
  onChange,
  value,
}: RadioGroupProps) {
  const groupId = useId();

  return (
    <div className="space-y-2">
      <label className="font-semibold">{label}</label>
      <div className="space-y-1">
        {options.map((option) => (
          <div key={option.value} className="flex items-center space-x-2">
            <input
              type="radio"
              id={`${groupId}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor={`${groupId}-${option.value}`} className="text-sm">
              {option.label}
            </label>
          </div>
        ))}
      </div>
      {error && <p className="text-red-500 text-sm">{error.message}</p>}
    </div>
  );
}