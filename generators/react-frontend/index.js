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
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore'),
    );
    this.fs.copy(
      this.templatePath('prettierrc.json'),
      this.destinationPath('.prettierrc.json'),
    );
    // tailwind related
    this.fs.copy(
      this.templatePath('postcss.config.js'),
      this.destinationPath('postcss.config.js'),
    );
    this.fs.copy(
      this.templatePath('tailwind.js'),
      this.destinationPath('tailwind.js'),
    );
    this.fs.copy(
      this.templatePath('tailwind.config.js'),
      this.destinationPath('tailwind.config.js'),
    );
    // public
    this.fs.copy(
      this.templatePath('public/index.html'),
      this.destinationPath('public/index.html'),
    );
    this.fs.copy(
      this.templatePath('public/favicon.ico'),
      this.destinationPath('public/favicon.ico'),
    );
    this.fs.copy(
      this.templatePath('public/logo192.png'),
      this.destinationPath('public/logo192.png'),
    );
    this.fs.copy(
      this.templatePath('public/logo512.png'),
      this.destinationPath('public/logo512.png'),
    );
    this.fs.copy(
      this.templatePath('public/manifest.json'),
      this.destinationPath('public/manifest.json'),
    );
    this.fs.copy(
      this.templatePath('public/robots.txt'),
      this.destinationPath('public/robots.txt'),
    );
    // src
    this.fs.copy(
      this.templatePath('src/index.js'),
      this.destinationPath('src/index.js'),
    );
    this.fs.copy(
      this.templatePath('src/App.js'),
      this.destinationPath('src/App.js'),
    );
    this.fs.copy(
      this.templatePath('src/App.test.js'),
      this.destinationPath('src/__tests__/App.test.js'),
    );
    this.fs.copy(
      this.templatePath('src/assets/tailwind.css'),
      this.destinationPath('src/assets/tailwind.css'),
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
      // dependencies
      '@testing-library/jest-dom',
      '@testing-library/react',
      '@testing-library/user-event',
      'react',
      'react-dom',
      'react-scripts',
      // dev dependencies
      'autoprefixer',
      'eslint',
      'eslint-config-cheminfo-react',
      'postcss-cli',
      'prettier',
      'prop-types',
      'tailwindcss',
    ];

    this.npmInstall(deps, { 'save-dev': true });
  }
};
