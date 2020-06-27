'use strict';

const { myCommonJS } = require('../index');

describe('test myCommonJS', () => {
  it('should return 42', () => {
    expect(myCommonJS()).toStrictEqual(42);
  });
});
