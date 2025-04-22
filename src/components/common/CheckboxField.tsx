import { useFormContext } from 'react-hook-form';

type CheckboxFieldProps = {
  name: string;
  label: string;
};

export default function CheckboxField({ name, label }: CheckboxFieldProps) {
  const { register } = useFormContext();

  return (
    <div className="grid grid-cols-[auto_1fr] items-center py-2 pl-4">
      <div className="flex items-center">
        <input
          id={name}
          type="checkbox"
          {...register(name)}
          className="h-5 w-5 rounded text-primary border-gray-300 focus:ring-primary"
          style={{ accentColor: 'var(--primary)' }}
        />
      </div>
      <label 
        htmlFor={name} 
        className="ml-3 text-sm font-medium cursor-pointer"
        style={{ color: 'var(--text-primary)' }}
      >
        {label}
      </label>
    </div>
  );
}