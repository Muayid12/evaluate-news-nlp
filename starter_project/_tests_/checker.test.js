import { checkForURL } from '../../src/client/js/checker';

describe('Testing the checkForURL functionality', () => {
  test('checkForURL should be defined', () => {
    expect(checkForURL).toBeDefined();
  });

  test('checkForURL should return true for valid URL', () => {
    const validURL = 'https://www.example.com';
    expect(checkForURL(validURL)).toBe(true);
  });

  test('checkForURL should return false for invalid URL', () => {
    const invalidURL = 'not_a_url';
    expect(checkForURL(invalidURL)).toBe(false);
  });
});