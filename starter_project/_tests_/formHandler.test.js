import { handleSubmit } from '../../src/client/js/formHandler';

describe('Testing the handleSubmit functionality', () => {
  test('handleSubmit should be defined', () => {
    expect(handleSubmit).toBeDefined();
  });
});