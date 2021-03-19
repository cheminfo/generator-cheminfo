# <%= name %>

[![NPM version][npm-image]][npm-url]
[![build status][ci-image]][ci-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

<%= description %>.

## Installation

`$ npm i <%= npmName %>`

## Usage

```js
import { myModule } from '<%= npmName %>';

const result = myModule(args);
// result is ...
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/<%= npmName %>.svg
[npm-url]: https://www.npmjs.com/package/<%= npmName %>
[ci-image]: https://github.com/<%= org %>/<%= name %>/workflows/Node.js%20CI/badge.svg?branch=main
[ci-url]: https://github.com/<%= org %>/<%= name %>/actions?query=workflow%3A%22Node.js+CI%22
[codecov-image]: https://img.shields.io/codecov/c/github/<%= org %>/<%= name %>.svg
[codecov-url]: https://codecov.io/gh/<%= org %>/<%= name %>
[download-image]: https://img.shields.io/npm/dm/<%= npmName %>.svg
[download-url]: https://www.npmjs.com/package/<%= npmName %>
