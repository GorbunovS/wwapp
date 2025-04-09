// Простые тесты базовой функциональности

describe('Basic Functionality', () => {
  test('simple addition', () => {
    expect(1 + 1).toBe(2);
  });

  test('string concatenation', () => {
    expect('a' + 'b').toBe('ab');
  });

  test('array operations', () => {
    const arr = [1, 2, 3];
    expect(arr.length).toBe(3);
    expect(arr[0]).toBe(1);
    expect(arr.map(x => x * 2)).toEqual([2, 4, 6]);
  });

  // Тест для проверки типов объектов
  test('object types', () => {
    interface TestType {
      id: number;
      name: string;
      active: boolean;
    }

    const testObj: TestType = {
      id: 1,
      name: 'Test',
      active: true
    };

    expect(testObj).toHaveProperty('id');
    expect(testObj).toHaveProperty('name');
    expect(testObj).toHaveProperty('active');
    
    expect(typeof testObj.id).toBe('number');
    expect(typeof testObj.name).toBe('string');
    expect(typeof testObj.active).toBe('boolean');
  });
}); 