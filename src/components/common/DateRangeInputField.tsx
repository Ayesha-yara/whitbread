import React, { useState, useEffect } from 'react';
import DateRangePicker from '@/components/common/DateRangePicker';


type DateRangeInputFieldProps = {
  label: string;
  name: string;
  startDate?: Date;
  endDate?: Date;
  maxDate?: Date;
  required?: boolean;
  onChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
};

export default function DateRangeInputField({
  label,
  name,
  maxDate,
  required = true,
  onChange,
}: DateRangeInputFieldProps) {

  const [isPickerOpen, setPickerOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
    setSelectedDates(dates);

    if (dates.startDate && dates.endDate) {
      setPickerOpen(false);
      onChange(dates);
    }
  };
  
  // Close the picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isPickerOpen && !target.closest('.date-range-picker-container')) {
        setPickerOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPickerOpen]);

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={
          selectedDates.startDate && selectedDates.endDate
            ? `${selectedDates.startDate.toLocaleDateString()} - ${selectedDates.endDate.toLocaleDateString()}`
            : ''
        }
        readOnly
        onClick={() => setPickerOpen(true)}
        className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
        placeholder="Select a date range"
      />
      {isPickerOpen && (
        <div className="absolute z-10 bg-white shadow-lg border rounded-md mt-2 date-range-picker-container">
          <DateRangePicker
            startDate={selectedDates.startDate}
            endDate={selectedDates.endDate}
            minDate={new Date()}
            maxDate={maxDate}
            onChange={handleDateChange}
          />
        </div>
      )}
    </div>
  );
}