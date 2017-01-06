'use strict';

const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('ml', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        userName: 'cheminfo',
        org: 'ml',
        description: 'test'
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      '.gitignore',
      '.travis.yml',
      '.eslintrc.yml',
      'src/index.js',
      'test/test.js',
      'LICENSE',
      'package.json',
      'README.md'
    ]);
  });
});

describe('ml', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        userName: 'cheminfo',
        org: 'ml',
        description: 'test',
        runkit: true
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      '.gitignore',
      '.travis.yml',
      '.eslintrc.yml',
      'src/index.js',
      'test/test.js',
      'LICENSE',
      'package.json',
      'runkit.js',
      'README.md'
    ]);
  });
});

describe('cheminfo-js', function () {
  before(function () {
    return helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        userName: 'cheminfo',
        org: 'cheminfo-js',
        description: 'test'
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      '.gitignore',
      '.travis.yml',
      '.eslintrc.yml',
      'src/index.js',
      'test/test.js',
      'LICENSE',
      'package.json',
      'README.md'
    ]);
  });
});
