import { jest } from '@jest/globals'

// Мокаем глобальный fetch
global.fetch = jest.fn()

// Очистка моков после каждого теста
afterEach(() => {
  jest.clearAllMocks()
})
