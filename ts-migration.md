# Migration to typescript

Many of your projects should be migrated to typescript.

Here is a procedure

- fork the existing project and create a branch `typescript` (`git checkout -b typescript`)
- create a new project using yo generator-cheminfo typescript (accept the default answers)
- copy the `.git` folder from the current project to the new project
- update package.json
  - copy the version of the old package
  - copy the description, authors, dependencies and other properties like `cheminfo` if available
- migrate the `.js` file from the old repository to the new repository
- rename all the `.js` to `.ts`. this can be done with this bash script `for FILE in $(find . -name "*.js"); do mv $FILE ${FILE/.js/.ts}; done;`
- make a first commit `refactor: move files to typescript project`
- add the types in the project
- update the documentation at the level of the interfaces (need to specify @default) and the functions
- export in index.ts the function and the relevant interfaces
- second commit `refactor: add types`
- update the README
- third commit `docs: update README`
- create a PR when all the tests are passing
