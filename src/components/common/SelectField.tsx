import { useFormContext, get } from 'react-hook-form';

type SelectFieldProps = {
  name: string;
  label: string;
  options: { value: string; label: string }[];
  placeholder?: string;
};

export default function SelectField({ name, label, options, placeholder }: SelectFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const fieldError = get(errors, name);
  const errorMessage = fieldError?.message as string;

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <select
        id={name}
        {...register(name)}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          errorMessage ? 'border-red-500' : 'border-gray-300'
        }`}
        aria-invalid={errorMessage ? 'true' : 'false'}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className="text-sm text-red-500" role="alert">{errorMessage}</p>}
    </div>
  );
}