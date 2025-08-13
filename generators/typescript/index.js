'use strict';

const cp = require('child_process');
const path = require('path');

const camelCase = require('camelcase');
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
    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: path.basename(this.destinationRoot()), // Default to current folder name
      },
      {
        type: 'input',
        name: 'org',
        message: 'GitHub organization',
        default: 'cheminfo',
      },
      {
        type: 'input',
        name: 'userName',
        message: 'Your name',
        default: username.substring(0, username.length - 1),
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your package description',
      },
    ];

    return this.prompt(prompts).then(
      function (props) {
        // To access props later use this.props.name;
        this.props = props;
      }.bind(this),
    );
  }

  writing() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const camelName = camelCase(this.props.name);
    const prefix = this.props.org === 'mljs' ? 'ml-' : '';
    const includes = {
      npmName: prefix + this.props.name,
      name: this.props.name,
      org: this.props.org,
      userName: this.props.userName,
      description: this.props.description,
      date: year + '-' + month + '-' + day,
      year: year,
      camelName: camelName,
    };
    this.fs.copy(
      this.templatePath('tsconfig.json'),
      this.destinationPath('tsconfig.json'),
    );
    this.fs.copy(
      this.templatePath('tsconfig.build.json'),
      this.destinationPath('tsconfig.build.json'),
    );
    this.fs.copy(
      this.templatePath('eslint.config.js'),
      this.destinationPath('eslint.config.js'),
    );
    this.fs.copy(
      this.templatePath('index.ts'),
      this.destinationPath('src/index.ts'),
    );
    this.fs.copy(
      this.templatePath('index.test.ts'),
      this.destinationPath('src/__tests__/index.test.ts'),
    );
    this.fs.copy(
      this.templatePath('npmignore'),
      this.destinationPath('src/.npmignore'),
    );
    this.fs.copy(
      this.templatePath('prettierrc.json'),
      this.destinationPath('.prettierrc.json'),
    );
    this.fs.copy(
      this.templatePath('actions/nodejs.yml'),
      this.destinationPath('.github/workflows/nodejs.yml'),
    );
    this.fs.copy(
      this.templatePath('actions/release.yml'),
      this.destinationPath('.github/workflows/release.yml'),
    );
    this.fs.copy(this.templatePath('npmrc'), this.destinationPath('.npmrc'));
    this.fs.copyTpl(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'),
      includes,
    );
    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      includes,
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      includes,
    );
    this.fs.copyTpl(
      this.templatePath('package'),
      this.destinationPath('package.json'),
      includes,
    );
    this.fs.copyTpl(
      this.templatePath('vitest.config.ts'),
      this.destinationPath('vitest.config.ts'),
      includes,
    );
  }

  install() {
    let deps = [
      '@types/node',
      '@vitest/coverage-v8',
      '@zakodium/tsconfig',
      'eslint',
      'eslint-config-cheminfo-typescript',
      'prettier',
      'rimraf',
      'typescript',
      'vitest',
    ];

    this.npmInstall(deps, { 'save-dev': true });
  }
};
