# generator-mljs-packages

  [![NPM version][npm-image]][npm-url]
  [![Build Status][travis-image]][travis-url]
  [![Dependency Status][daviddm-image]][daviddm-url]
  [![Coverage percentage][coveralls-image]][coveralls-url]
  [![npm download][download-image]][download-url]

> Generator for ml.js packages

## Installation

First, install [Yeoman](http://yeoman.io) and generator-mljs-packages using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-mljs-packages
```

Then generate your new project:

```bash
yo mljs-packages
```

## Description

The generator will prompt for the next fields:

  * __Your project name__: the package name, without the `ml-` start
  * __Your name__: your [NPM name](https://docs.npmjs.com/files/package.json#people-fields-author-contributors)
  * __Your email__: your email
  * __Your package description__: A description to show in [NPM](https://docs.npmjs.com/files/package.json#description-1)
  * __Your package version__: The package version. The default value is `0.0.1`
  * __Do you want to install coverage tool?__: Add the coveralls badge and scripts. The default value is `false`
  * __Run NPM install?__: Run `npm install` after the template generation

When the generator finish there will be the following files:

```
.
├── .eslintrc.yml
├── .gitignore
├── .travis.yml
├── History.md
├── LICENSE
├── README.md
├── package.json
├── tonic.js
├── src
│   └── index.js
└── test
    └── test.js
```

## Contributors

* [Miguel Asencio](https://github.com/maasencioh)

## License

[MIT](./LICENSE)

[npm-image]: https://badge.fury.io/js/generator-mljs-packages.svg
[npm-url]: https://npmjs.org/package/generator-mljs-packages
[travis-image]: https://travis-ci.org/mljs/generator-mljs-packages.svg?branch=master
[travis-url]: https://travis-ci.org/mljs/generator-mljs-packages
[daviddm-image]: https://david-dm.org/mljs/generator-mljs-packages.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/mljs/generator-mljs-packages
[coveralls-image]: https://coveralls.io/repos/github/mljs/generator-mljs-packages/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/mljs/generator-mljs-packages?branch=master
[download-image]: https://img.shields.io/npm/dm/generator-mljs-packages.svg?style=flat-square
[download-url]: https://npmjs.org/package/generator-mljs-packages
