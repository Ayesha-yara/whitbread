'use client';

import { useFormContext } from 'react-hook-form';
import { GroupBookingFormData } from '@/lib/validation/groupBookingSchema';
import InputField from '@/components/common/InputField';
import SelectField from '@/components/common/SelectField';

const titles = [
  { value: 'Mr', label: 'Mr' },
  { value: 'Mrs', label: 'Mrs' },
  { value: 'Ms', label: 'Ms' },
  { value: 'Dr', label: 'Dr' },
];

export default function ContactDetailsSection() {
  useFormContext<GroupBookingFormData>();

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-center">
        Your contact details
      </h2>
      
      <div className="space-y-4 text-center">
        <SelectField name="contactDetails.title" label="Title" options={titles} placeholder="Select title" />
        <InputField name="contactDetails.firstName" label="First Name" placeholder="Enter your first name" />
        <InputField name="contactDetails.lastName" label="Last Name" placeholder="Enter your last name" />
        <InputField name="contactDetails.email" label="Email Address" placeholder="Enter your email" type="email" />
        <InputField name="contactDetails.phoneNumber" label="Phone Number" placeholder="Enter your phone number" />
      </div>
    </div>
  );
}