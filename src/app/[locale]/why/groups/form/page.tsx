import { useTranslations } from "next-intl";
import { Suspense } from "react";
import BookingEnquiryForm from "@/components/form/GroupBookingForm";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";

export default function GroupBookingPage() {
  const t = useTranslations("form");

  return (
    <div className='min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-6 flex justify-end'>
          <LanguageSwitcher />
        </div>
        
        <div className='text-center mb-8'>
          <h2 className='font-bold text-gray-900 sm:text-xl mb-4'>
            {t("title")}
          </h2>
          <p className='text-md text-gray-600 max-w-2xl mx-auto'>
            {t("description")}
          </p>
        </div>

        <div className='bg-white shadow-lg rounded-lg overflow-hidden'>
          <div className='p-6 sm:p-8'>
            <Suspense
              fallback={
                <div className='flex justify-center items-center py-12'>
                  <div className='animate-pulse text-gray-600'>Loading form...</div>
                </div>
              }>
              <BookingEnquiryForm />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
