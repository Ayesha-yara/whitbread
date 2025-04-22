'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const switchLocale = (targetLocale: string) => {
    const segments = pathname.split('/').filter(Boolean);

    if (segments[0] === 'en' || segments[0] === 'de') {
      segments.shift();
    }

    segments.unshift(targetLocale);

    router.push(`/${segments.join('/')}`);
    setIsOpen(false); 
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-full shadow-md text-sm font-medium text-gray-800 hover:bg-gray-300 transition"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label="Select Language"
      >
        {locale === 'en' ? 'English' : 'Deutsch'}

        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <button
            onClick={() => switchLocale('en')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              locale === 'en' ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-100'
            }`}
            aria-label="Switch to English"
          >
            English
          </button>
          <button
            onClick={() => switchLocale('de')}
            className={`block w-full text-left px-4 py-2 text-sm ${
              locale === 'de' ? 'bg-gray-100 font-semibold' : 'hover:bg-gray-100'
            }`}
            aria-label="Switch to German"
          >
            Deutsch
          </button>
        </div>
      )}
    </div>
  );
}