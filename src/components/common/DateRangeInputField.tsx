import React, { useState } from 'react';
import DateRangePicker from '@/components/common/DateRangePicker';

type DateRangeInputFieldProps = {
  label: string;
  name: string;
  startDate: Date;
  endDate: Date;
  onChange: (dates: { startDate: Date | null; endDate: Date | null }) => void;
};

export default function DateRangeInputField({
  label,
  name,
  startDate,
  endDate,
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

  return (
    <div className="space-y-2">
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
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
        <div className="absolute z-10 bg-white shadow-lg border rounded-md mt-2">
          <DateRangePicker
            startDate={selectedDates.startDate}
            endDate={selectedDates.endDate}
            minDate={new Date()} // Restrict to forward dates only
            onChange={handleDateChange}
          />
        </div>
      )}
    </div>
  );
}