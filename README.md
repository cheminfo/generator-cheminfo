# generator-cheminfo

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

> Generator for the different cheminfo organizations

## Installation

First, install [Yeoman](http://yeoman.io) and generator-cheminfo using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm i -g yo generator-cheminfo
```

Then go to a new directory and generate your project:

```bash
mkdir my-new-project
cd my-new-project
yo cheminfo:module
```

The following generators are available:

```bash
yo cheminfo:commonjs
yo cheminfo:lerna-module
yo cheminfo:module
yo cheminfo:typescript
yo cheminfo:react-frontend
```

After creating a project with a generator, you can add GitHub actions workflows
to it from GitHub's interface. Click on the "Actions" tab and then on "New workflow".
You will be able to choose a workflow from our templates. It is recommended to
add the a "Node.js CI" workflow to all new modules.

### react-frontend

Basic project that includes tailwind-css and cheminfo formatting rules.

## Starting to develop in react

A small video introduction on react: https://www.youtube.com/watch?v=XC60UUsU2Vg

The userguide from react: https://reactjs.org/docs/getting-started.html in which in the main concept you should ignore State and Life Cycle and instead read the hooks chapter.

## License

[MIT](./LICENSE)

[npm-image]: https://badge.fury.io/js/generator-cheminfo.svg
[npm-url]: https://npmjs.org/package/generator-cheminfo
[download-image]: https://img.shields.io/npm/dm/generator-cheminfo.svg?style=flat-square
[download-url]: https://npmjs.org/package/generator-cheminfo
