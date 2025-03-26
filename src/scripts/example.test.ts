import { add } from './example'; // 假设add函数在名为add.ts的文件中

describe('add', () => {
  it('should return the sum of two positive numbers', () => {
    expect(add(2, 3)).toBe(5);
  });

  it('should return the sum of two negative numbers', () => {
    expect(add(-2, -3)).toBe(-5);
  });

  it('should return the sum of a positive and a negative number', () => {
    expect(add(2, -3)).toBe(-1);
  });

  it('should return zero when adding zero to zero', () => {
    expect(add(0, 0)).toBe(0);
  });

  it('should handle large numbers correctly', () => {
    expect(add(Number.MAX_SAFE_INTEGER, 1)).toBe(Number.MAX_SAFE_INTEGER + 1);
  });
});
