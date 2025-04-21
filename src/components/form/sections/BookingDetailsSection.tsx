'use client';

import { useFormContext } from 'react-hook-form';
import { GroupBookingFormData } from '@/lib/validation/groupBookingSchema';
import SelectField from '@/components/common/SelectField';
import InputField from '@/components/common/InputField';
import CheckboxField from '@/components/common/CheckboxField';
import RadioGroup from '@/components/common/RadioGroup';

const bookerTypeOptions = [
  { value: 'personal', label: 'Personal' },
  { value: 'business', label: 'Business' },
  { value: 'travel-management-company', label: 'Travel Management Company' },
  { value: 'travel-agent/tour-operator', label: 'Travel Agent/Tour Operator' },
];

const purposeOfStayOptions = [
  { value: 'business', label: 'Business' },
  { value: 'leisure', label: 'Leisure' },
];

const reasonForVisitOptions = [
  { value: 'association', label: 'Association' },
  { value: 'bus-tour', label: 'Bus tour' },
  { value: 'business-meeting', label: 'Business meeting' },
  { value: 'charity-event', label: 'Charity event' },
  { value: 'convention-conference', label: 'Convention/Conference' },
  { value: 'wedding', label: 'Wedding' },
  { value: 'sport-event', label: 'Sport event' },
  { value: 'other', label: 'Other' },
];

const packageOptions = [
  { value: 'breakfast', label: 'Premier Inn Breakfast' },
  { value: 'meal-deal', label: 'Meal deal (dinner, drink and breakfast)' },
];

export default function BookingDetailsSection() {
  // We don't need to destructure form context variables as they're handled by the form components
  useFormContext<GroupBookingFormData>();

  return (
    <div className="space-y-6">
        <div>
          <h4 className="text-base font-medium text-gray-700 mb-3">What type of booker are you?</h4>
          <RadioGroup 
            name="bookingDetails.bookerType" 
            options={bookerTypeOptions} 
            label="Booker Type"
          />
        </div>
        
        <div>
          <h4 className="text-base font-medium text-gray-700 mb-3">Is your group staying for Business or Leisure?</h4>
          <RadioGroup 
            name="bookingDetails.purposeOfStay" 
            label="Purpose of Stay"
            options={purposeOfStayOptions} 
          />
        </div>
        
        <CheckboxField 
          name="bookingDetails.isSchoolOrYouth" 
          label="Please tick this box if you are booking for a school or youth group." 
        />
        
        <div>
          <h4 className="text-base font-medium text-gray-700 mb-3">What is the reason for your group&apos;s visit?</h4>
          <SelectField 
            name="bookingDetails.reasonForVisit" 
            label="Reason for Visit"
            options={reasonForVisitOptions} 
            placeholder="Select a reason" 
          />
        </div>
        
        <div className="pt-4 border-t border-gray-200">
          <p className="text-sm text-gray-600 mb-4">
            Our team will try to accommodate your group&apos;s preferences in terms of hotels and dates. 
            If that&apos;s not possible, we&apos;ll do everything we can to offer the best alternatives.
          </p>
          <InputField 
            placeholder="Enter a hotel" 
            label="Preferred Hotel"
            name="bookingDetails.preferredHotel" 
          />
          <div className="mt-4">
            <h4 className="text-base font-medium text-gray-700 mb-2">Stay Dates</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InputField 
                name="bookingDetails.dates.checkIn" 
                label="Check-in Date" 
                type="date" 
                placeholder="Select check-in date"
              />
              <InputField 
                name="bookingDetails.dates.checkOut" 
                label="Check-out Date" 
                type="date" 
                placeholder="Select check-out date"
              />
            </div>
          </div>
        </div>
        
        <div>
          <h4 className="text-base font-medium text-gray-700 mb-2">Package type</h4>
          <p className="text-sm text-gray-500 mb-3">Subject to availability. Room only not available for group bookings.</p>
          <RadioGroup 
            name="bookingDetails.packageType" 
            options={packageOptions} 
            label="Package Type"
          />
        </div>
      </div>
  );
}