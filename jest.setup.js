import { jest } from '@jest/globals'

global.fetch = jest.fn()

afterEach(() => {
  jest.clearAllMocks()
})
