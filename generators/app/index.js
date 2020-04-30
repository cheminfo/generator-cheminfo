'use strict';

const cp = require('child_process');

const chalk = require('chalk');
const Generator = require('yeoman-generator');
const yosay = require('yosay');

let username = ' ';

try {
  username = cp.execSync('git config user.name').toString();
} catch (e) {
  /* istanbul ignore next */
  console.error('Missing git configuration');
}

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        `Behold the almighty ${chalk.red('generator-cheminfo')} generator!`,
      ),
    );

    this.log('The following generators are available:');
    this.log('- yo cheminfo:module');
    this.log('- yo cheminfo:typescript');
    this.log('- yo cheminfo:lerna-modul');
    this.log('- yo cheminfo:react-frontend');
  }

  writing() {}

  install() {}
};
