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
      {
        type: 'confirm',
        name: 'node',
        message: 'Is it a Node.js-only library?',
        default: false,
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
      notOnlyNode: !this.props.node,
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
      this.templatePath('tsconfig.cjs.json'),
      this.destinationPath('tsconfig.cjs.json'),
    );
    if (includes.notOnlyNode) {
      this.fs.copy(
        this.templatePath('tsconfig.esm.json'),
        this.destinationPath('tsconfig.esm.json'),
      );
    }
    this.fs.copy(
      this.templatePath('eslintrc.yml'),
      this.destinationPath('.eslintrc.yml'),
    );
    this.fs.copy(
      this.templatePath('babel.config.js'),
      this.destinationPath('babel.config.js'),
    );
    this.fs.copy(
      this.templatePath('index.ts'),
      this.destinationPath('src/index.ts'),
    );
    this.fs.copy(
      this.templatePath('test.ts'),
      this.destinationPath('src/__tests__/test.ts'),
    );
    this.fs.copy(
      this.templatePath('npmignore'),
      this.destinationPath('src/.npmignore'),
    );
    this.fs.copy(
      this.templatePath('prettierrc.json'),
      this.destinationPath('.prettierrc.json'),
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
  }

  install() {
    let deps = [
      '@babel/preset-typescript',
      '@babel/plugin-transform-modules-commonjs',
      '@types/jest',
      'eslint',
      'eslint-config-cheminfo-typescript',
      'jest',
      'prettier',
      'rimraf',
      'typescript',
    ];

    this.npmInstall(deps, { 'save-dev': true });
  }
};
