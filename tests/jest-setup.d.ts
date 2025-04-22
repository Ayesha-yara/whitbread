// Type definitions for Jest setup
import '@testing-library/jest-dom';

// Extend the Jest matchers
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string): R;
      toBeVisible(): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeRequired(): R;
      toBeChecked(): R;
      toBePartiallyChecked(): R;
      toHaveValue(value: any): R;
      toHaveAttribute(attr: string, value?: any): R;
      toHaveClass(...classNames: string[]): R;
      toHaveFocus(): R;
      toHaveFormValues(values: Record<string, any>): R;
      toBeEmptyDOMElement(): R;
      toBeInvalid(): R;
      toBeValid(): R;
    }
  }
}
