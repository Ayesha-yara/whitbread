import { useTranslations } from "next-intl";
import { Suspense } from "react";
import BookingEnquiryForm from "@/components/form/GroupBookingForm";
import LanguageSwitcher from "@/components/common/LanguageSwitcher";
import ThemeToggle from "@/components/common/ThemeToggle";

export default function GroupBookingPage() {
  const t = useTranslations("form");

  return (
    <div className='min-h-screen py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-200' style={{backgroundColor: 'var(--background)'}}>
      <div className='max-w-4xl mx-auto'>
        <div className='mb-6 flex justify-end items-center space-x-4'>
          <ThemeToggle />
          <LanguageSwitcher />
        </div>
        
        <div className='text-center mb-8'>
          <h2 className='font-bold text-gray-900 dark:text-white sm:text-xl mb-4 transition-colors duration-200' style={{color: 'var(--text-primary)'}}>
            {t("title")}
          </h2>
          <p className='text-md text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-200' style={{color: 'var(--text-secondary)'}}>
            {t("description")}
          </p>
        </div>

        <div className='bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transition-all duration-300' style={{backgroundColor: 'var(--card-bg)', borderColor: 'var(--card-border)', boxShadow: 'var(--card-shadow)'}}>
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
