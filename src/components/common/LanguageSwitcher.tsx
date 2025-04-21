import { useLocale } from 'next-intl';
import { Link } from '@/i18n/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  
  return (
    <div className="flex gap-2">
      <Link
        href="/"
        locale="en"
        className={`px-2 py-1 rounded ${
          locale === 'en' ? 'bg-primary text-white' : 'text-gray-600'
        }`}
      >
        English
      </Link>
      <Link
        href="/"
        locale="de"
        className={`px-2 py-1 rounded ${
          locale === 'de' ? 'bg-primary text-white' : 'text-gray-600'
        }`}
      >
        Deutsch
      </Link>
    </div>
  );
}