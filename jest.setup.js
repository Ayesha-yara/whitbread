// Import Jest DOM setup
import '@testing-library/jest-dom';

// Polyfills needed for MSW
import { TextEncoder, TextDecoder } from 'util';
import { Response, Request, Headers, default as fetch } from 'node-fetch';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
global.Response = Response;
global.Request = Request;
global.Headers = Headers;
global.fetch = fetch;

// BroadcastChannel polyfill for MSW
class MockBroadcastChannel {
  constructor() {
    this.name = '';
  }
  postMessage() {}
  close() {}
  addEventListener() {}
  removeEventListener() {}
}
global.BroadcastChannel = MockBroadcastChannel;

// Mock server setup
import { server } from './src/mocks/server';

// Setup MSW server
beforeAll(() => server.listen({ onUnhandledRequest: 'bypass' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: function(query) {
    return {
      matches: false,
      media: query,
      onchange: null,
      addListener: function() {},
      removeListener: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() {},
    };
  },
});

// Mock ResizeObserver
class MockResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

window.ResizeObserver = MockResizeObserver;
window.IntersectionObserver = MockIntersectionObserver;

// Add missing DOM properties
Object.defineProperty(window, 'scrollTo', { value: () => {}, writable: true });

// Suppress console errors during tests
const originalConsoleError = console.error;
console.error = (...args) => {
  if (
    /Warning.*not wrapped in act/i.test(args[0]) ||
    /Warning.*React.createFactory/i.test(args[0]) ||
    /Warning.*ReactDOM.render/i.test(args[0])
  ) {
    return;
  }
  originalConsoleError(...args);
};
