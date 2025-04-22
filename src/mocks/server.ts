// Mock server setup for tests
// This is a simplified mock server that doesn't require msw/node

// Create a mock server that can be used in tests
export const server = {
  listen: () => console.log('Mock server started'),
  resetHandlers: () => console.log('Mock handlers reset'),
  close: () => console.log('Mock server closed'),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  use: (..._handlers: unknown[]) => console.log('Added handlers to mock server')
};