# Quickstart guide

## Install software

- Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
- Install [VScode](https://code.visualstudio.com/)
- Install the following plugins in VScode:
  - [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- In VScode use `SHIFT+CTRL+P` to
  - find `Shell Command: Install 'code' command in PATH` (to be able to start code from any folder in the terminal by running `code .`)
  - save on focus change
- Install [volta](https://docs.volta.sh/guide/getting-started)
  - `volta install node@18`: install last version of `node`
  - `nvm install stable`: install last version of `node`
- Install [gh](https://github.com/cli/cli)

Search and directly edit the configuration JSON of vscode to turn on auto-formatting on save (`SHIFT + CTRL + P`, then search 'Preferences: Open settings (JSON)' )

```json
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.eol": "\n",
  "js/ts.implicitProjectConfig.checkJs": true,
```

## Directory structure

We like to use the following structure for our projects

`~/git/organization/project`

This means that if you want to create a new project `ml-graph` in the organization `mljs` it should be on your harddisk in the following path

`~/git/mljs/ml-graph`

## Create a new project

```bash
npm install --global yo generator-cheminfo

cd projectName
yo cheminfo:module
```

## Create the project on github

If you have `gh` installed and want to create the previous example:

```bash
git init -b main
git add * .*
git commit -m 'My first commit'
gh repo create mljs/ml-graph
git push --set-upstream origin main
```

## Test driven development

Use

```
npx jest --watch
```

to turn on the watch mode and automatically re-run tests.

## Learning javascript

Please check this excellent tutorial: https://github.com/getify/You-Dont-Know-JS#you-dont-know-js-yet-book-series---2nd-edition

## Learning typescript

https://www.typescriptlang.org/docs/handbook/intro.html 

## Documentation

We should try to ducmentation all the functions that we create using jsdoc. Here is an example of it's usage:

https://devhints.io/jsdoc


## Starting to develop in react

A small video introduction on react: https://www.youtube.com/watch?v=XC60UUsU2Vg

The userguide from react: https://reactjs.org/docs/getting-started.html in which in the main concept you should ignore State and Life Cycle and instead read the hooks chapter.

### Notes

- Avoid the use of snapshots for tests
- Try to have a large coverage of your code by tests

## General development notes

- Try to use packages from the [awesome list](https://github.com/cheminfo/awesome).
- `var` [to declare variables] is forbidden (https://scotch.io/courses/10-need-to-know-javascript-concepts/declaring-javascript-variables-var-let-and-const). Use `let` and, whenever possible `const` instead.
- [ES6 modules](https://hacks.mozilla.org/2015/08/es6-in-depth-modules/) are used, wherefore the code needs to be transpiled.

## Commit messages

Please use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0-beta.2/) which makes it easier to create the changelogs and automatically bump version numbers.

Conventional commit messages are structured as follows

```
<type>[optional scope]: <description>

[optional body]

[optional footer]
```

Some relevant types are:

- `fix` for bugfixes
- `feat` for introduction of new features
- `docs` for documentation changes
- `test` added test for existing feature
- `refactor` for refactoring without public API changes
- `chore` changes to the build process or auxiliary tools and libraries such as documentation generation

Any commit that breaks the public API must contain `BREAKING CHANGE` or an exclamation mark after the type like for example `fix!: spelling mistake in method`.

[commitlint](https://commitlint.js.org/#/) can help to stick to these conventions.
