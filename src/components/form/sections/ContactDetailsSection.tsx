"use client";

import { useFormContext } from 'react-hook-form';
import { GroupBookingFormData } from '@/types/form';
import InputField from '@/components/common/InputField';
import SelectField from '@/components/common/SelectField';
import { useTranslations } from 'next-intl';

const titles = [
  { value: "Mr", label: "Mr" },
  { value: "Mrs", label: "Mrs" },
  { value: "Ms", label: "Ms" },
  { value: "Dr", label: "Dr" },
];

export default function ContactDetailsSection() {
  useFormContext<GroupBookingFormData>();

  const t = useTranslations("form");

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <SelectField
          name="contactDetails.title"
          label={t("contactDetails.titleField.label")}
          options={titles}
          required={true}
        />
        <InputField
          name="contactDetails.firstName"
          label={t("contactDetails.firstName.label")}
          placeholder={t("contactDetails.firstName.placeholder")}
          required={true}
        />
        <InputField
          name="contactDetails.lastName"
          label={t("contactDetails.lastName.label")}
          placeholder={t("contactDetails.lastName.placeholder")}
          required={true}
        />
        <InputField
          name="contactDetails.email"
          label={t("contactDetails.email.label")}
          placeholder={t("contactDetails.email.placeholder")}
          type="email"
          required={true}
        />
        <InputField
          name="contactDetails.phoneNumber"
          label={t("contactDetails.phone.label")}
          placeholder={t("contactDetails.phone.placeholder")}
          required={true}
        />
      </div>
    </div>
  );
}
