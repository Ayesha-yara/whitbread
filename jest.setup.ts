import { server } from './src/mocks/server';
import '@testing-library/jest-dom';

beforeEach(() => server.listen());
afterEach(() => server.resetHandlers());
afterEach(() => server.close());