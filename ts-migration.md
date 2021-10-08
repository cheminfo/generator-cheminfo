# Incremental migration of a repository to TypeScript

## Step 1: use TypeScript to analyze and transpile the JavaScript

### Local setup

1. Create a fork of the project in your own account:
   ![](https://i.imgur.com/5pXMuVB.png)
2. Clone it to your computer:
   `gh repo clone user-name/repository-name`
3. Open the new folder in Visual Studio Code.
4. Install the dependencies and verify that the tests pass:
   `npm it`

### Prepare the project for TypeScript

#### Install and configure TypeScript

1. Install TypeScript:
   `npm install -D typescript` (`-D` is equivalent to `--save-dev`)
2. Create a `tsconfig.json` with:
   ```json
   {
     "compilerOptions": {
       "allowJs": true,
       "esModuleInterop": true,
       "moduleResolution": "node",
       "outDir": "lib",
       "sourceMap": true,
       "strict": true,
       "target": "es2020"
     },
     "include": ["./src/**/*"]
   }
   ```
3. Create a `tsconfig.cjs.json` with:
   ```json
   {
     "extends": "./tsconfig.json",
     "compilerOptions": {
       "module": "commonjs",
       "declaration": true,
       "declarationMap": true
     },
     "exclude": ["./src/**/__tests__"]
   }
   ```
4. Create a `tsconfig.esm.json` with:
   ```json
   {
     "extends": "./tsconfig.cjs.json",
     "compilerOptions": {
       "module": "es2020",
       "outDir": "lib-esm"
     }
   }
   ```

#### Configure ESLint

1. Install our TypeScript ESLint configuration:
   `npm install -D eslint-config-cheminfo-typescript`
2. Update `.eslintrc.yml` to extend the TypeScript config:
   `extends: cheminfo-typescript`

#### Configure Jest

1. Install `ts-jest` and `@types/jest`:
   `npm install -D ts-jest @types/jest`
2. Create (or update) `jest.config.js`, with the following contents:
   ```javascript
   module.exports = {
     preset: 'ts-jest/presets/js-with-ts',
     testEnvironment: 'node',
   };
   ```

#### Update package.json

1. Make sure the `"main"` field points to `"./lib/index.js"`.
2. Change the `"module"` field to point to `"./lib-esm/index.js"`.
3. Add a `"types"` field with `"./lib/index.d.ts"`.
4. Make sure the `"files"` field contains at least: `["src", "lib", "lib-esm"]`.
5. Add or change the following `"scripts"` (keep the scripts in alphabetical order):
   - `"check-types": "tsc --noEmit"`
   - `"clean": "rimraf lib lib-esm"`
   - `"prepack": "npm run tsc"`
   - `"tsc": "npm run clean && npm run tsc-cjs && npm run tsc-esm"`
   - `"tsc-cjs": "tsc --project tsconfig.cjs.json"`
   - `"tsc-esm": "tsc --project tsconfig.esm.json"`
6. Remove the `"compile"` and `"prepublishOnly"` scripts if they exist.
7. Add `&& npm run check-types` at the end of the `"test"` script.
8. Remove the `"jest"` field if it exists.

#### Misc changes

1. Add `lib` and `lib-esm` lines at the end of the `.gitignore` file.
2. Install the `rimraf` module:
   `npm i -D rimraf`
3. Delete the `.babelrc` and `rollup.config.js` files.
4. Uninstall these modules:
   `npm remove @babel/plugin-transform-modules-commonjs rollup`
5. Add a step with `npm run check-types` to the `lint` job in `.github/workflows/nodejs.yml`
   ![](https://i.imgur.com/bVDUeSI.png)

### Submit your changes

Now the project should be ready to effectively rewrite files in TypeScript. Submit your changes in a pull request before continuing.

1. Verify that the tests still pass:
   `npm t`
2. Create a new branch:
   `git switch -c setup-typescript`
4. Commit all your changes:
   - `git add .`
   - `git commit -m"refactor: setup project for TypeScript"`
5. Open a pull request:
   `gh pr create`

## Step 2: use TypeScript to check types in JavaScript

### Enable `checkJS`

In `tsconfig.json`, add: `"checkJS": true` and `"noImplicitAny": false` to the `"compilerOptions"`.

### Run the `check-types` script in watch mode

```
npm run check-types -- --watch
```

If there are errors, they must be fixed. It can be mistakes in the code, but it's also possible that some JSDoc comments are wrong and need to be corrected.

In unit tests that pass the wrong type especially to verify type checking, errors are actually expected. This can be asserted with a comment: `// @ts-expect-error`.

### Submit your changes

Similar to step 1.
