
import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations('footer');
  
  return (
    <footer className="bg-gray-100 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
          <a href="#" className="text-blue-600 hover:text-blue-800">
            {t('privacyPolicy')}
          </a>
          <a href="#" className="text-blue-600 hover:text-blue-800">
            {t('termsAndConditions')}
          </a>
        </div>
        <div className="mt-6 text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Premier Inn. All rights reserved.
        </div>
      </div>
    </footer>
  );
}