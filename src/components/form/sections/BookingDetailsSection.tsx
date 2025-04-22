'use client';

import React from 'react';
import { useFormContext } from 'react-hook-form';
import { GroupBookingFormData } from '@/types/form';
import SelectField from '@/components/common/SelectField';
import InputField from '@/components/common/InputField';
import CheckboxField from '@/components/common/CheckboxField';
import RadioGroup from '@/components/common/RadioGroup';
import DateRangeInputField from '@/components/common/DateRangeInputField';
import { useTranslations } from 'next-intl';

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
  const { register, setValue, watch } = useFormContext<GroupBookingFormData>();
  const t = useTranslations('form.bookingDetails');

  // Watch the current values of the radio buttons
  const bookerType = watch('bookingDetails.bookerType');
  const purposeOfStay = watch('bookingDetails.purposeOfStay');
  const packageType = watch('bookingDetails.packageType');

  const handleRadioChange = (name: keyof GroupBookingFormData['bookingDetails'], value: string) => {
    setValue(`bookingDetails.${name}`, value);
  };

  const handleDateChange = (dates: { startDate: Date | null; endDate: Date | null }) => {
    setValue('bookingDetails.dates', {
      checkIn: dates.startDate ? dates.startDate.toISOString().split('T')[0] : '',
      checkOut: dates.endDate ? dates.endDate.toISOString().split('T')[0] : '',
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <RadioGroup
          name="bookingDetails.bookerType"
          label={t('bookerType.label')}
          options={bookerTypeOptions}
          value={bookerType}
          onChange={(value) => handleRadioChange('bookerType', value)}
          aria-labelledby="bookerType-label"
          required={true}
        />
      </div>

      <div>
        <RadioGroup
          name="bookingDetails.purposeOfStay"
          label={t('stayType.label')}
          options={purposeOfStayOptions.map((option) => ({
            value: option.value,
            label: t(`stayType.options.${option.value}`),
          }))}
          value={purposeOfStay}
          onChange={(value) => handleRadioChange('purposeOfStay', value)}
          aria-labelledby="purpose-of-stay-title"
          required={true}
        />
      </div>

      <CheckboxField
        label={t('isSchoolOrYouth.label')}
        {...register('bookingDetails.isSchoolOrYouth')}
        aria-describedby="school-or-youth-description"
      />

      <div>
        <SelectField
          name="bookingDetails.reasonForVisit"
          label={t('reasonForVisit.label')}
          options={reasonForVisitOptions}
          placeholder={t('reasonForVisit.placeholder')}
          aria-labelledby="reason-for-visit-title"
          required={true}
        />
      </div>

      <div className="pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600 mb-4">
          {t('BookingDetails.textarea')}
        </p>
        <InputField
          placeholder={t('prefferedHotel.placeholder')}
          label={t('prefferedHotel.label')}
          name="bookingDetails.preferredHotel"
          aria-describedby="preferred-hotel-description"
          required={true}
        />
        <div className="mt-4">
          <DateRangeInputField
            label={t('dates.label')}
            name="bookingDetails.dates"
            maxDate={new Date(new Date().setFullYear(new Date().getFullYear() + 2))}
            onChange={handleDateChange}
            aria-labelledby="dates-title"
            required={true}
          />
        </div>
      </div>

      <div>
        <p className="text-sm text-gray-500 mb-3">{t('packageType.description')}</p>
        <RadioGroup
          name="bookingDetails.packageType"
          label={t('packageType.label')}
          options={packageOptions}
          value={packageType}
          onChange={(value) => handleRadioChange('packageType', value)}
          aria-labelledby="package-type-title"
          required={true}
        />
      </div>
    </div>
  );
}