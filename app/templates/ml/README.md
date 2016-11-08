# <%= name %>

  [![NPM version][npm-image]][npm-url]
  [![build status][travis-image]][travis-url]
  <% if (coveralls) { %>[![Test coverage][coveralls-image]][coveralls-url]<% } %>
  [![David deps][david-image]][david-url]
  [![npm download][download-image]][download-url]
  
<%= description %>

## Installation

`$ npm install ml-<%= name %>`

## [API Documentation](https://mljs.github.io/<%= name %>/)

## Example

```js
const <%= camelName %> = require('ml-<%= name %>');
```
<% if (runkit) { %>
Or test it in [Runkit](https://runkit.com/npm/<%= name %>)<% } %>

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/ml-<%= name %>.svg?style=flat-square
[npm-url]: https://npmjs.org/package/ml-<%= name %>
[travis-image]: https://img.shields.io/travis/mljs/<%= name %>/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/mljs/<%= name %>
<% if (coveralls) { %>[coveralls-image]: https://img.shields.io/coveralls/mljs/<%= name %>.svg?style=flat-square
[coveralls-url]: https://coveralls.io/github/mljs/<%= name %><% } %>
[david-image]: https://img.shields.io/david/mljs/<%= name %>.svg?style=flat-square
[david-url]: https://david-dm.org/mljs/<%= name %>
[download-image]: https://img.shields.io/npm/dm/ml-<%= name %>.svg?style=flat-square
[download-url]: https://npmjs.org/package/ml-<%= name %>
