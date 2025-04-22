// Mock for next-intl
module.exports = {
  useTranslations: () => (key) => key,
  useFormatter: () => ({
    dateTime: () => '2025-04-22',
    number: (num) => num.toString(),
    list: (arr) => arr.join(', '),
    relativeTime: () => 'now',
  }),
  NextIntlClientProvider: ({ children }) => children,
};
