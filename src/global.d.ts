import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveTextContent(text: string | RegExp): R;
      toHaveAttribute(attr: string, value?: string): R;
      toHaveClass(className: string | string[]): R;
      toBeChecked(): R;
      toHaveValue(value?: string | string[] | number | null): R;
      toBeDisabled(): R;
      toBeEnabled(): R;
      toBeRequired(): R;
      toBeValid(): R;
      toBeInvalid(): R;
      toBeVisible(): R;
      toBeFocused(): R;
      toContainElement(element: HTMLElement | null): R;
      toContainHTML(html: string): R;
      toHaveStyle(css: Record<string, unknown>): R;
      toHaveFormValues(values: Record<string, unknown>): R;
      toBe(expected: unknown): R;
      toEqual(expected: unknown): R;
      toHaveLength(length: number): R;
      toHaveBeenCalled(): R;
      toHaveBeenCalledWith(...args: unknown[]): R;
      toHaveBeenCalledTimes(count: number): R;
    }
  }
}

export {};
