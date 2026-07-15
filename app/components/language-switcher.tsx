"use client";

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '../../i18n/navigation';
import { useState } from 'react';

function LocaleFlag({ locale }: { locale: string }) {
  if (locale === 'en') {
    return (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        viewBox="0 0 640 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h640v480H0z" fill="#b22234" />
        <path d="M0 37h640v37H0zM0 111h640v37H0zM0 185h640v37H0zM0 259h640v37H0zM0 333h640v37H0zM0 407h640v37H0z" fill="#fff" />
        <path d="M0 0h257v259H0z" fill="#3c3b6e" />
        <path
          d="M16.4 19.5l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-10.8 10.8l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm10.8 10.8l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-10.8 10.8l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm10.8 10.8l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-10.8 10.8l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7zm-21.7 0l4.6 14.1-12-8.7h14.8l-12 8.7z"
          fill="#fff"
        />
      </svg>
    );
  }

  if (locale === 'es') {
    return (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        viewBox="0 0 640 480"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M0 0h640v120H0z" fill="#aa151b" />
        <path d="M0 120h640v240H0z" fill="#f1bf00" />
        <path d="M0 360h640v120H0z" fill="#aa151b" />
      </svg>
    );
  }

  return null;
}

const locales = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const currentLocale = locales.find((l) => l.code === locale) ?? locales[0]!;

  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-foreground/5"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <LocaleFlag locale={currentLocale.code} />
        <span className="hidden sm:inline">{currentLocale.name}</span>
        <svg
          className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 top-full z-20 mt-2 w-40 rounded-lg border border-foreground/10 bg-background p-1 shadow-lg">
            {locales.map((loc) => (
              <button
                key={loc.code}
                onClick={() => switchLocale(loc.code)}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-foreground/5 ${
                  loc.code === locale ? 'bg-foreground/5 font-medium' : ''
                }`}
              >
                <LocaleFlag locale={loc.code} />
                <span>{loc.name}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
