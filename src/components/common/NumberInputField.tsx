import { useFormContext } from 'react-hook-form';

type NumberInputFieldProps = {
  name: string;
  label: string;
  min?: number;
  max?: number;
};

export default function NumberInputField({ name, label, min = 0, max = 99 }: NumberInputFieldProps) {
  const { register, setValue, watch } = useFormContext();
  const value = watch(name) || 0;

  const handleIncrement = () => {
    if (value < max) setValue(name, value + 1);
  };

  const handleDecrement = () => {
    if (value > min) setValue(name, value - 1);
  };

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={handleDecrement}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          -
        </button>
        <input
          id={name}
          {...register(name)}
          type="number"
          min={min}
          max={max}
          className="w-16 text-center border border-gray-300 rounded-md"
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>
    </div>
  );
}