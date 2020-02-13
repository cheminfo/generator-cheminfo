# Quickstart guide

## Install software

- Install [VScode](https://code.visualstudio.com/)
- Install the following plugins in VScode:
  - [prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
  - [jsdoc](https://marketplace.visualstudio.com/items?itemName=stevencl.addDocComments) to automatically add the documentation comments (highlight function declaration, `CTRL+SHIFT+P`, `>Add Doc Comment`)
- In VScode use `SHIFT+CTRL+P` to
  - find `Shell Command: Install 'code' command in PATH` (to be able to start code from any folder in the terminal by running `code .`)
  - turn on auto-formatting on save (`CTRL,`, then search for save)
- Install [nvm](https://github.com/nvm-sh/nvm)

## Create a new project

```
npm install --global yo generator-cheminfo

cd projectName
yo cheminfo:module
```

## Test driven development

Use

```
npx jest --watch
```

to turn on the watch mode and automatically re-run tests.

### Notes

- Avoid the use of snapshots for tests
- Name test files as `{modulename}.test.js`, e.g. `index.test.js`

## General development notes

- Try to use packages from the [awesome list](https://github.com/cheminfo/awesome).
- Avoid the use of `var` [to declare variables](https://scotch.io/courses/10-need-to-know-javascript-concepts/declaring-javascript-variables-var-let-and-const). Use `let` and, whereever possible `const` instead.
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

Any commit that breaks the public API must contain `BREAKING CHANGE`.

[commitlint](https://commitlint.js.org/#/) can help to stick to these conventions.
