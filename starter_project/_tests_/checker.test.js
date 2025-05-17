import { checkForURL } from '@/checker';

describe('Testing the checkForURL functionality', () => {
  test('checkForURL should be defined', () => {
    expect(checkForURL).toBeDefined();
  });

  test('checkForURL should return true for valid URL', () => {
    expect(checkForURL('https://example.com')).toBe(true);
  });

  test('checkForURL should return false for invalid URL', () => {
    expect(checkForURL('not_a_url')).toBe(false);
  });
});
