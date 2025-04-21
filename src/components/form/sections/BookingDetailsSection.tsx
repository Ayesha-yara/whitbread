'use client';

import { useFormContext } from 'react-hook-form';
import { useTranslations } from 'next-intl';
import { GroupBookingFormData } from '@/lib/validation/groupBookingSchema';
import SelectField from '@/components/common/SelectField';
import InputField from '@/components/common/InputField';
import CheckboxField from '@/components/common/CheckboxField';
import NumberInputField from '@/components/common/NumberInputField';
import DateRangePicker from '@/components/common/DateRangePicker';
import RadioGroup from '@/components/common/RadioGroup';

const bookerTypeOptions = [
  { value: 'personal', label: 'Personal' },
  { value: 'business', label: 'Business' },
  { value: 'tmc', label: 'Travel Management Company' },
  { value: 'agent', label: 'Travel Agent/Tour Operator' },
];

const stayTypeOptions = [
  { value: 'business', label: 'Business' },
  { value: 'leisure', label: 'Leisure' },
];

const visitReasonOptions = [
  { value: 'conference', label: 'Conference' },
  { value: 'vacation', label: 'Vacation' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'celebration', label: 'Celebration' },
  { value: 'training', label: 'Training' },
];

const packageOptions = [
  { value: 'breakfast', label: 'Premier Inn Breakfast' },
  { value: 'meal-deal', label: 'Meal deal (dinner, drink and breakfast)' },
];

export default function BookingDetailsSection() {
  const t = useTranslations('form');
  const { register, watch, formState: { errors } } = useFormContext<GroupBookingFormData>();

  const bookingDetails = watch('bookingDetails');

  return (
    <>
    <div className="space-y-6">
        <div>
          <h4 className="text-base font-medium text-gray-700 mb-3">What type of booker are you?</h4>
          <RadioGroup 
            name="bookerType" 
            options={bookerTypeOptions} 
            label="Booker Type"
          />
        </div>
        
        <div>
          <h4 className="text-base font-medium text-gray-700 mb-3">Is your group staying for Business or Leisure?</h4>
          <RadioGroup 
            name="stayType" 
            label="Stay Type"
            options={stayTypeOptions} 
          />
        </div>
        
        <CheckboxField 
          name="youthGroup" 
          label="Please tick this box if you are booking for a school or youth group." 
        />
        
        <div>
          <h4 className="text-base font-medium text-gray-700 mb-3">What is the reason for your group's visit?</h4>
          <SelectField 
            name="visitReason" 
            label="Visit Reason"
            options={visitReasonOptions} 
            placeholder="Select a reason" 
          />
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Our team will try to accommodate your group's preferences in terms of hotels and dates. 
            If that's not possible, we'll do everything we can to offer the best alternatives.
          </p>
          <InputField 
            placeholder="Enter a hotel" 
            label="Hotel"
            name="hotel" 
          />
          <DateRangePicker 
            label="dateRange" 
            startDate= {new Date('2023-10-01')}
            endDate= {new Date('2023-10-31')}
            onChange={(dates) => {
            }}
          />
        </div>
        
        <div>
          <h4 className="text-base font-medium text-gray-700 mb-2">Package type</h4>
          <p className="text-sm text-gray-500 mb-3">Subject to availability. Room only not available for group bookings.</p>
          <RadioGroup 
            name="packageType" 
            options={packageOptions} 
            label="Package Type"
          />
        </div>
      </div>
    </>
  );
}