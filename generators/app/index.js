'use strict';

const cp = require('child_process');

const Generator = require('yeoman-generator');

let username = ' ';

try {
  username = cp.execSync('git config user.name').toString();
} catch (e) {
  /* istanbul ignore next */
  console.error('Missing git configuration');
}

module.exports = class extends Generator {
  prompting() {
    this.log('The following generators are available:');
    this.log('- yo cheminfo:module');
    this.log('- yo cheminfo:typescript');
    this.log('- yo cheminfo:lerna-modul');
  }

  writing() {}

  install() {}
};
