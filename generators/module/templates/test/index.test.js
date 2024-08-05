import { myModule } from '..';
import { test, expect } from 'vitest';

test('Should return 42', () => {
  expect(myModule()).toStrictEqual(42);
});
