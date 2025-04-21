
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('header');
  
  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <div className="h-10 w-32 bg-blue-800 text-white flex items-center justify-center rounded">
              Premier Inn
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
          <p className="mt-2 text-lg text-gray-600">{t('subtitle')}</p>
        </div>
      </div>
    </header>
  );
}