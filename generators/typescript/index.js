import cp from 'child_process';
import path from 'path';

import camelCase from 'camelcase';
import Generator from 'yeoman-generator';
import latestVersion from 'latest-version';

let username = ' ';

try {
  username = cp.execSync('git config user.name').toString();
} catch (e) {
  /* istanbul ignore next */
  console.error('Missing git configuration');
}

export default class TypescriptGenerator extends Generator {
  async prompting() {
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

    // To access props later use this.props.name;
    this.props = await this.prompt(prompts);

    const prefix = this.props.org === 'mljs' ? 'ml-' : '';
    this.props.npmName = prefix + this.props.name;
  }

  async configuring() {
    const devDependencies = await resolveDependencies([
      '@types/node',
      '@vitest/coverage-v8',
      '@zakodium/tsconfig',
      'eslint',
      'eslint-config-cheminfo-typescript',
      'prettier',
      'rimraf',
      'typescript',
      'vitest',
    ]);
    this.packageJson.merge({
      name: this.props.npmName,
      version: '0.0.0',
      license: 'MIT',
      description: this.props.description,
      keywords: [],
      author: this.props.userName,
      type: 'module',
      exports: {
        '.': './lib/index.js',
      },
      files: ['lib', 'src'],
      scripts: {
        'check-types': 'tsc --noEmit',
        clean: 'rimraf coverage lib',
        eslint: 'eslint .',
        'eslint-fix': 'eslint . --fix',
        prepack: 'npm run tsc',
        prettier: 'prettier --check .',
        'prettier-write': 'prettier --write .',
        test: 'npm run test-only && npm run check-types && npm run eslint && npm run prettier',
        'test-only': 'vitest run --coverage',
        tsc: 'npm run clean && npm run tsc-build',
        'tsc-build': 'tsc --project tsconfig.build.json',
      },
      dependencies: {},
      devDependencies,
      repository: {
        type: 'git',
        url: `git+https://github.com/${this.props.org}/${this.props.name}.git`,
      },
      bugs: {
        url: `https://github.com/${this.props.org}/${this.props.name}/issues`,
      },
      homepage: `https://github.com/${this.props.org}/${this.props.name}#readme`,
    });
  }

  async writing() {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();
    const camelName = camelCase(this.props.name);
    const includes = {
      npmName: this.props.npmName,
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
      this.templatePath('prettierignore'),
      this.destinationPath('.prettierignore'),
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
      this.templatePath('vitest.config.ts'),
      this.destinationPath('vitest.config.ts'),
      includes,
    );
  }
}

async function resolveDependencies(dependencies) {
  const deps = {};
  for (const dep of dependencies) {
    const version = await latestVersion(dep);
    deps[dep] = `^${version}`;
  }
  return deps;
}
