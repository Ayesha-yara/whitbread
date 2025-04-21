'use client';

import { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import { groupBookingSchema } from '@/lib/validation/groupBookingSchema';
import { GroupBookingFormData } from '@/types/form';
import Accordion from '@/components/common/Accodion';
import ContactDetailsSection from './sections/ContactDetailsSection';
import BookingDetailsSection from './sections/BookingDetailsSection';
import RoomRequirementsSection from './sections/RoomRequirementsSection';

export default function GroupBookingForm() {
  const t = useTranslations('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const methods = useForm<GroupBookingFormData>({
    resolver: zodResolver(groupBookingSchema),
    mode: 'onBlur',
    defaultValues: {
      contactDetails: {
        title: 'Mr',
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
      },
      bookingDetails: {
        bookerType: 'personal',
      },
      roomRequirements: {
        rooms: {
          singleOccupancy: 0,
          doubleOccupancy: 0,
          twinRooms: 0,
        }
      },
    },
  });

  const { handleSubmit, setFocus, formState: { errors } } = methods;

  // Focus on the first error field when validation fails
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      const firstErrorField = Object.keys(errors)[0];
      setFocus(String(firstErrorField));
    }
  }, [errors, setFocus]);

  const onSubmit = async (data: GroupBookingFormData) => {
    setIsSubmitting(true);
    setSubmissionError(null);

    try {
      const response = await fetch('/api/submit-enquiry', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        alert(t('successMessage'));
        methods.reset();
      } else {
        throw new Error(t('submissionError'));
      }
    } catch (error) {
      setSubmissionError(t('submissionError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
        aria-describedby={submissionError ? 'submission-error' : undefined}
      >
        <Accordion
          items={[
            {
              title: t('contactDetails.title'),
              children: <ContactDetailsSection />,
            },
            {
              title: t('bookingDetails.title'),
              children: <BookingDetailsSection />,
            },
            {
              title: t('roomRequirements.title'),
              children: <RoomRequirementsSection />,
            },
          ]}
        />

        {submissionError && (
          <div
            id="submission-error"
            role="alert"
            className="text-red-600 text-sm mt-4"
          >
            {submissionError}
          </div>
        )}

        <div className="mt-6 text-right">
          <button
            type="submit"
            className={`px-6 py-3 text-white font-semibold rounded-lg ${
              isSubmitting ? 'bg-blue-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
            }`}
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
          >
            {isSubmitting ? t('submitting') : t('submit')}
          </button>
        </div>
      </form>
    </FormProvider>
  );
}