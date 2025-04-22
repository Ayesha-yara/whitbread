import { useState } from 'react';
import { DateRange, RangeKeyDict, Range } from 'react-date-range';
import 'react-date-range/dist/styles.css'; 
import 'react-date-range/dist/theme/default.css'; 

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  minDate?: Date;
  maxDate?: Date;
  onChange: (range: { startDate: Date | null; endDate: Date | null }) => void;
  error?: string;
}

export default function DateRangePicker({
  startDate,
  endDate,
  minDate,
  maxDate,
  onChange,
  error,
}: DateRangePickerProps) {
  const [range, setRange] = useState<Range[]>([
    {
      startDate: startDate || new Date(),
      endDate: endDate || new Date(),
      key: 'selection',
    },
  ]);

  const handleSelect = (ranges: RangeKeyDict) => {
    const { startDate, endDate } = ranges.selection;
    setRange([ranges.selection]);
    onChange({ 
      startDate: startDate ? new Date(startDate.getTime()) : null, 
      endDate: endDate ? new Date(endDate.getTime()) : null 
    });
  };

  return (
    <div className="space-y-2">
      <DateRange
        ranges={range}
        onChange={handleSelect}
        moveRangeOnFirstSelection={false}
        rangeColors={['#2563eb']}
        minDate={minDate || new Date()}
        maxDate={maxDate}
        direction="horizontal"
        months={2}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
}