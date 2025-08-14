import cp from 'node:child_process';

import Generator from 'yeoman-generator';

let username = ' ';

try {
  username = cp.execSync('git config user.name').toString();
} catch (e) {
  /* istanbul ignore next */
  console.error('Missing git configuration');
}

export default class CheminfoRootGenerator extends Generator {
  prompting() {
    this.log('The following generators are available:');
    this.log('- yo cheminfo:typescript');
  }

  writing() {}

  install() {}
}
