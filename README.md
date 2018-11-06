# generator-cheminfo

[![NPM version][npm-image]][npm-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage percentage][coveralls-image]][coveralls-url]
[![npm download][download-image]][download-url]

> Generator for the different cheminfo organizations

## Installation

First, install [Yeoman](http://yeoman.io) and generator-cheminfo using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-cheminfo
```

Then generate your new project:

```bash
yo cheminfo
```

Other available generators are:

```bash
yo cheminfo:lerna-module
yo cheminfo:module
yo cheminfo:typescript
```

## Description

The generator will prompt for the next fields:

- **Your project name**: the package name, without the `ml-` start for ml.js organization
- **Organization**: choose the desired organization, the supported ones are **ml** and **cheminfo-js**
- **Your name**: your [NPM name](https://docs.npmjs.com/files/package.json#people-fields-author-contributors)
- **Your package description**: A description to show in [NPM](https://docs.npmjs.com/files/package.json#description-1)
- **Your package version**: The package version. The default value is `0.0.1`
- **Do you want to install coverage tool?**: Add the coveralls badge and scripts. The default value is `false`
- **Do you want to create a Runkit file example?**: Add the example displayed in NPM. The default value is `false`
- **Run NPM install?**: Run `npm install` after the template generation

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
├── runkit.js
└── src
    ├── index.js
    └── __test__
        └── test.js
```

## License

[MIT](./LICENSE)

[npm-image]: https://badge.fury.io/js/generator-cheminfo.svg
[npm-url]: https://npmjs.org/package/generator-cheminfo
[travis-image]: https://travis-ci.org/cheminfo/generator-cheminfo.svg?branch=master
[travis-url]: https://travis-ci.org/cheminfo/generator-cheminfo
[daviddm-image]: https://david-dm.org/cheminfo/generator-cheminfo.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/cheminfo/generator-cheminfo
[coveralls-image]: https://coveralls.io/repos/github/cheminfo/generator-cheminfo/badge.svg?branch=master
[coveralls-url]: https://coveralls.io/github/cheminfo/generator-cheminfo?branch=master
[download-image]: https://img.shields.io/npm/dm/generator-cheminfo.svg?style=flat-square
[download-url]: https://npmjs.org/package/generator-cheminfo
