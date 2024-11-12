// src/setupTests.js
import '@testing-library/jest-dom';

import { server } from './mocks/server';
import{beforeAll,afterEach,afterAll} from "vitest"
// Establish API mocking before all tests.
beforeAll(() => server.listen());
// Reset any request handlers that we may add during the tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
