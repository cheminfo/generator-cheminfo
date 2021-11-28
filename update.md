# Update actions

## Javascript project

GitHub workflows are now based on a template and need to be updated. The templates are in one of those 2 directories:

- https://github.com/cheminfo/.github/tree/main/workflow-templates
- https://github.com/mljs/.github/tree/main/workflow-templates

In particular those 2 actions need to be updated:

- nodejs.yml
- release.yml

When copying those 2 files please take care:

- To change the `$default-branch` to `master` or `main`
- To keep the existing [test matrix](https://github.com/cheminfo/.github/blob/4cbb40a6c91d6e9c70e98b5f0c965023024f8518/workflow-templates/nodejs.yml#L14)

Please also check that in package.json the following 4 commands are present:

```json
    "eslint": "eslint src --cache",
    "eslint-fix": "npm run eslint -- --fix",
    "prepack": "npm run tsc",
    "prettier": "prettier --check src",
    "prettier-write": "prettier --write src",
```

