import React, { useState, useRef } from 'react';
import DateRangePicker from '@/components/common/DateRangePicker';
import { format } from 'date-fns';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPickerOpen, setPickerOpen] = useState(false);
  const [selectedDates, setSelectedDates] = useState<{ startDate: Date | null; endDate: Date | null }>({
    startDate: null,
    endDate: null,
  });

  const handleDateChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
    setSelectedDates(dates);
  };

  const handleApply = (dates: { startDate: Date | null; endDate: Date | null }) => {
    setSelectedDates(dates);
    setPickerOpen(false);
    onChange(dates);
  };

  const handleCancel = () => {
    setPickerOpen(false);
  };

  const formatDateRange = () => {
    if (selectedDates.startDate && selectedDates.endDate) {
      return `${format(selectedDates.startDate, 'dd/MM/yyyy')} - ${format(selectedDates.endDate, 'dd/MM/yyyy')}`;
    }
    return '';
  };

  return (
    <div className="space-y-2 relative" ref={containerRef}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        id={name}
        name={name}
        value={formatDateRange()}
        readOnly
        onClick={() => setPickerOpen(true)}
        className="block w-full px-3 py-2 border rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300 cursor-pointer"
        placeholder="Select a date range"
      />
      {isPickerOpen && (
        <div className="absolute z-50 mt-2 date-range-picker-container">
          <DateRangePicker
            startDate={selectedDates.startDate}
            endDate={selectedDates.endDate}
            minDate={new Date()}
            maxDate={maxDate}
            onChange={handleDateChange}
            onApply={handleApply}
            onCancel={handleCancel}
          />
        </div>
      )}
    </div>
  );
}