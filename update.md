# Update actions

## JavaScript project

GitHub workflows are now based on a template and need to be updated. The templates are in one of those 2 directories:

- https://github.com/cheminfo/.github/tree/main/workflow-templates
- https://github.com/mljs/.github/tree/main/workflow-templates

In particular those 2 actions need to be updated:

- nodejs.yml
- release.yml

When copying those 2 files please take care:

- To change the `$default-branch` to `main`

Please also check that in package.json the following 4 commands are present:

```json
    "eslint": "eslint .",
    "eslint-fix": "eslint . --fix",
    "prepack": "npm run tsc",
    "prettier": "prettier --check .",
    "prettier-write": "prettier --write .",
```
