import { expect, test } from 'vitest';

import { myModule } from '../index.js';

test('should return 42', () => {
  expect(myModule()).toBe(42);
});
