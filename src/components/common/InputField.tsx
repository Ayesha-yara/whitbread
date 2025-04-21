import { useFormContext, FieldError } from 'react-hook-form';

type InputFieldProps = {
  name: string;
  label: string;
  placeholder?: string;
  type?: string;
  isRequired?: boolean;
  error?: FieldError;
};

export default function InputField({ name, label, placeholder, type = 'text', isRequired }: InputFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name]?.message as string;

  return (
    <div className="space-y-1">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={name}
        {...register(name, { required: isRequired })}
        placeholder={placeholder}
        type={type}
        className={`block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}