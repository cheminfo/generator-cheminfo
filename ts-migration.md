# Incremental migration of a repository to TypeScript and ESM

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

1. Install TypeScript and our base config:
   `npm install -D typescript @zakodium/tsconfig` (`-D` is equivalent to `--save-dev`)
2. Create a `tsconfig.json` with:
   ```json
   {
     "extends": "@zakodium/tsconfig",
     "compilerOptions": {
       "outDir": "lib"
     },
     "include": ["src", "vite*.ts"]
   }

   ```
3. Create a `tsconfig.build.json` with:
   ```json
   {
     "extends": "./tsconfig.json",
     "include": ["src"],
     "exclude": ["**/__tests__", "**/*.test.ts"]
   }
   ```

#### Configure ESLint

1. Install our TypeScript ESLint configuration:
   `npm install -D eslint-config-cheminfo-typescript`
2. Update `eslint.config.js` to extend the TypeScript config:
   ```js
   import { defineConfig, globalIgnores } from 'eslint/config';
   import ts from 'eslint-config-cheminfo-typescript/base';
   
   export default defineConfig(globalIgnores(['coverage', 'lib']), ts);
   ```

#### Update package.json

1. Add `"type": "module"` under the `"description"` field.
2. Remove the `"main"` and `"module"` and `"types"` fields.
3. Add an `"exports"` field with `"./lib/index.js"`.
4. Make sure the `"files"` field contains at least: `["lib", "src"]`.
5. Add or change the following `"scripts"` (keep the scripts in alphabetical order):
   - `"check-types": "tsc --noEmit"`
   - `"clean": "rimraf lib"`
   - `"prepack": "npm run tsc"`
   - `"test-only": "vitest --run --coverage"`
   - `"tsc": "npm run clean && npm run tsc-build"`
   - `"tsc-build": "tsc --project tsconfig.build.json"`
6. Remove the `"compile"` and `"prepublishOnly"` scripts if they exist.
7. Add `&& npm run check-types` after `test-only` in the `"test"` script.
8. Remove the `"jest"` field if it exists.

#### Migrate from jest to vitest (if needed)

1. remove `jest.config.js`
2. run `npm remove jest @types/jest`
3. run `npm i -D vitest @vitest/coverage-v8`
4. add `vitest.config.ts` with the following content:
   ```ts
   import { defineConfig } from 'vitest/config';

   export default defineConfig({
    test: {
      coverage: {
        include: ['src/**'],
      },
      // setupFiles: ['vitest.setup.ts'],
    },
   });
   ```
   Uncomment the `setupFiles` line if you have to `extend` `vitest`.
   ```ts
   // vitest.setup.ts example
   import { toBeDeepCloseTo, toMatchCloseTo } from 'jest-matcher-deep-close-to';
   import { expect } from 'vitest';

   expect.extend({ toBeDeepCloseTo, toMatchCloseTo });
   ```
5. ensure tests files are named `*.test.ts` (`*.test.js` may not work)
6. check if the tests pass with `npm run test-only -- --globals`  
   (the `--globals` flag is like jest with testing globals like `describe`, `it`, etc.)
7. import vitest in your test files and rerun without the `--globals` flag:
   ```ts
   import { describe, it, expect } from 'vitest';
   ```

#### Misc changes

1. Add `lib` in the `.gitignore` file.
2. Install the `rimraf` module and node types:
   `npm i -D @types/node rimraf`
3. Delete the `.babelrc` and `rollup.config.[m]js` files.
4. Uninstall these modules:
   `npm remove rollup eslint-config-cheminfo`
5. Replace the contents of the file in `.github/workflows/nodejs.yml` with a copy of our [template](https://github.com/cheminfo/.github/blob/main/workflow-templates/nodejs-ts.yml)

### Submit your changes

Now the project should be ready to effectively rewrite files in TypeScript. Submit your changes in a pull request before continuing.

1. Verify that the tests still pass:
   `npm t`
2. Verify that the build works:
   - `npm run prepack`
   - `node lib/index.js`
3. Create a new branch:
   `git switch -c setup-typescript`
4. Commit all your changes:
   - `git add .`
   - `git commit -m"refactor!: migrate to TypeScript and ESM"`
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

## Step 3: convert files to TypeScript

- Rename files to `.ts`
- Use TypeScript types instead of JSDoc
- When all files are in TS:
  - Remove `noImplicitAny` from the config and fix errors
  - Set `"allowJS": false` and remove `checkJS`
