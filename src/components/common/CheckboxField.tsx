import { useFormContext } from 'react-hook-form';

type CheckboxFieldProps = {
  name: string;
  label: string;
};

export default function CheckboxField({ name, label }: CheckboxFieldProps) {
  const { register } = useFormContext();

  return (
    <div className="flex items-center space-x-2">
      <input
        id={name}
        type="checkbox"
        {...register(name)}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <label htmlFor={name} className="text-sm text-gray-700">
        {label}
      </label>
    </div>
  );
}