import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'
import matchers from '@testing-library/jest-dom/matchers'

declare global {
  interface Window {
    localStorage: Storage
  }
}

expect.extend(matchers)

afterEach(() => {
  cleanup()
})

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

const localStorageMock = {
  length: 0,
  clear: jest.fn(),
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  key: jest.fn(),
} as Storage

window.localStorage = localStorageMock
