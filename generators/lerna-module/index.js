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
    const destination = path.normalize(this.destinationRoot()).split(path.sep);
    // Form: /path/to/lernaProject/packages/name

    const includes = {
      npmName: prefix + this.props.name,
      name: this.props.name,
      org: this.props.org,
      userName: this.props.userName,
      lernaProject: destination[destination.length - 3],
      description: this.props.description,
      date: year + '-' + month + '-' + day,
      year: year,
      camelName: camelName,
    };

    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('src/index.js'),
    );
    this.fs.copy(
      this.templatePath('test.js'),
      this.destinationPath('src/__tests__/test.js'),
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
};
