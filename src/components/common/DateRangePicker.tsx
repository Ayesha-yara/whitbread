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
  onCancel?: () => void;
  onApply?: (range: { startDate: Date | null; endDate: Date | null }) => void;
  error?: string;
}

export default function DateRangePicker({
  startDate,
  endDate,
  minDate,
  maxDate,
  onChange,
  onCancel,
  onApply,
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

  const handleApply = () => {
    if (onApply && range[0].startDate && range[0].endDate) {
      onApply({
        startDate: range[0].startDate ? new Date(range[0].startDate.getTime()) : null,
        endDate: range[0].endDate ? new Date(range[0].endDate.getTime()) : null
      });
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const isSelectionComplete = range[0].startDate && range[0].endDate && 
    range[0].startDate.getTime() !== range[0].endDate.getTime();

  return (
    <div className="bg-white rounded-md shadow-lg flex flex-col" style={{ maxWidth: '350px' }}>
      <div className="p-2">
        <DateRange
          ranges={range}
          onChange={handleSelect}
          moveRangeOnFirstSelection={false}
          rangeColors={['#2563eb']}
          minDate={minDate || new Date()}
          maxDate={maxDate}
          direction="vertical"
          months={1}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
      
      <div className="flex justify-end space-x-2 p-3 border-t border-gray-200 bg-gray-50 rounded-b-md sticky bottom-0">
        {onCancel && (
          <button 
            type="button" 
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        )}
        {onApply && (
          <button 
            type="button" 
            onClick={handleApply}
            disabled={!isSelectionComplete}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isSelectionComplete ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-300 cursor-not-allowed'}`}
          >
            Apply
          </button>
        )}
      </div>
    </div>
  );
}