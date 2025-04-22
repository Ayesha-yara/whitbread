import React from 'react';

interface QuantitySelectorProps {
  label: string;
  id: string;
  sublabel?: string;
  value: number;
  onChange: (value: number) => void;
}

export default function QuantitySelector({
  label,
  id,
  sublabel,
  value,
  onChange,
}: QuantitySelectorProps) {
  const handleIncrement = () => {
    onChange(value + 1);
  };

  const handleDecrement = () => {
    if (value > 0) {
      onChange(value - 1);
    }
  };

  return (
    <div className="flex items-center justify-between" role="group" aria-labelledby={`${id}-label`}>
      <div>
        <label id={`${id}-label`} htmlFor={id} className="font-medium text-gray-700">
          {label}
        </label>
        {sublabel && <p id={`${id}-sublabel`} className="text-sm text-gray-500">{sublabel}</p>}
      </div>
      <div className="flex items-center space-x-2">
        <button
          type="button"
          onClick={handleDecrement}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Decrease ${label}`}
          aria-controls={id}
          aria-disabled={value <= 0}
          disabled={value <= 0}
        >
          -
        </button>
        <input
          id={id}
          type="number"
          value={value}
          readOnly
          className="w-12 text-center border border-gray-300 rounded"
          aria-live="polite"
          aria-labelledby={`${id}-label ${id}-sublabel`}
        />
        <button
          type="button"
          onClick={handleIncrement}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label={`Increase ${label}`}
          aria-controls={id}
        >
          +
        </button>
      </div>
    </div>
  );
}