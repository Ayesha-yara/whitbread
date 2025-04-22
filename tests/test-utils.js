import React from 'react';
import { render } from '@testing-library/react';

// Mock next-intl provider
const mockUseTranslations = (key) => key;

// Create a custom render function that includes providers
function customRender(ui, options = {}) {
  return render(ui, {
    // Wrap with any providers needed
    wrapper: ({ children }) => children,
    ...options,
  });
}

// Re-export everything from React Testing Library
export * from '@testing-library/react';

// Override the render method
export { customRender as render };
