import { myModule } from '..';

describe('test myModule', () => {
  it('should return 42', () => {
    expect(myModule()).toStrictEqual(42);
  });
});
