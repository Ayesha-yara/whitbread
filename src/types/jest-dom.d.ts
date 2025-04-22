import '@testing-library/jest-dom';

declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveClass(className: string): R;
      toHaveAttribute(attr: string, value?: string): R;
      toBeChecked(): R;
      toHaveLength(length: number): R;
      toHaveBeenCalled(): R;
      toHaveBeenCalledWith(...args: unknown[]): R;
      toHaveBeenCalledTimes(count: number): R;
      toEqual(expected: unknown): R;
    }
  }
}

export {};
