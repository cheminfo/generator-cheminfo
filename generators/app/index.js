'use strict';

const cp = require('child_process');
const path = require('path');

const camelCase = require('camelcase');
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
      yosay(`Behold the almighty ${chalk.red('generator-cheminfo')} generator!`)
    );

    var prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: path.basename(this.destinationRoot()) // Default to current folder name
      },
      {
        type: 'input',
        name: 'org',
        message: 'GitHub organization',
        default: 'cheminfo'
      },
      {
        type: 'input',
        name: 'userName',
        message: 'Your name',
        default: username.substring(0, username.length - 1),
        store: true
      },
      {
        type: 'input',
        name: 'description',
        message: 'Your package description'
      },
      {
        type: 'input',
        name: 'version',
        message: 'Your package version',
        default: '0.0.1'
      },
      {
        type: 'confirm',
        name: 'codecov',
        message: 'Do you want to install coverage tool?',
        default: true
      },
      {
        type: 'confirm',
        name: 'runkit',
        message: 'Do you want to create a Runkit file example?',
        default: false
      }
    ];

    prompts.push({
      type: 'confirm',
      name: 'install',
      message: 'Run NPM install?',
      default: 'true'
    });

    return this.prompt(prompts).then(
      function(props) {
        // To access props later use this.props.name;
        this.props = props;
      }.bind(this)
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
      version: this.props.version,
      description: this.props.description,
      date: year + '-' + month + '-' + day,
      year: year,
      camelName: camelName,
      codecov: this.props.codecov,
      runkit: this.props.runkit
    };

    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('eslintrc.yml'),
      this.destinationPath('.eslintrc.yml')
    );

    this.fs.copyTpl(
      this.templatePath('index'),
      this.destinationPath('src/index.js'),
      includes
    );
    this.fs.copyTpl(
      this.templatePath('test'),
      this.destinationPath('src/__tests__/test.js'),
      includes
    );
    this.fs.copy(
      this.templatePath('npmignore'),
      this.destinationPath('src/.npmignore')
    );
    if (this.props.runkit) {
      this.fs.copyTpl(
        this.templatePath('runkit'),
        this.destinationPath('runkit.js'),
        includes
      );
    }
    this.fs.copyTpl(
      this.templatePath('travis.yml'),
      this.destinationPath('.travis.yml'),
      includes
    );

    this.fs.copyTpl(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE'),
      includes
    );
    this.fs.copyTpl(
      this.templatePath('package'),
      this.destinationPath('package.json'),
      includes
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'),
      includes
    );
  }

  install() {
    let deps = [
      'eslint',
      'eslint-config-cheminfo',
      'eslint-plugin-import',
      'eslint-plugin-jest',
      'jest',
      'npm-run-all'
    ];

    if (this.props.codecov) {
      deps.push('codecov');
    }
    if (this.props.org === 'cheminfo-js') {
      deps.push('cheminfo-tools');
    }

    this.npmInstall(deps, { 'save-dev': true });
  }
};
