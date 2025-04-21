import { useState } from 'react';
import { DateRange, RangeKeyDict } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

interface DateRangePickerProps {
  label: string;
  startDate: Date;
  endDate: Date;
  onChange: (range: { startDate: Date; endDate: Date }) => void;
  error?: string;
}

export default function DateRangePicker({
  label,
  startDate,
  endDate,
  onChange,
  error,
}: DateRangePickerProps) {
  const [range, setRange] = useState([
    {
      startDate,
      endDate,
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setRange([ranges.selection]);
    onChange({ startDate: startDate as Date, endDate: endDate as Date });
  };

  return (
    <div className="space-y-2">
      <label className="font-semibold">{label}</label>
      <DateRange
        ranges={range}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        rangeColors={['#2563eb']} // Tailwind blue-600
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}