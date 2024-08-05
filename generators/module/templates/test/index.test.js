import { expect, test } from 'vitest';

import { myModule } from '..';

test('Should return 42', () => {
  expect(myModule()).toStrictEqual(42);
});
