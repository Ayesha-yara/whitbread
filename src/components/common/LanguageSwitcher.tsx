'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname(); 
  const router = useRouter(); 

  const switchLocale = (targetLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);

    if (segments[0] === 'en' || segments[0] === 'de') {
      segments.shift();
    }

    segments.unshift(targetLocale);

    router.push(`/${segments.join('/')}`);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => switchLocale('en')} 
        className={`px-2 py-1 rounded ${
          locale === 'en' ? 'bg-primary text-white' : 'text-gray-600'
        }`}
      >
        English
      </button>
      <button
        onClick={() => switchLocale('de')} 
        className={`px-2 py-1 rounded ${
          locale === 'de' ? 'bg-primary text-white' : 'text-gray-600'
        }`}
      >
        Deutsch
      </button>
    </div>
  );
}