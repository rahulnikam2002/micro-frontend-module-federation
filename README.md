# micro-frontend-module-federation — Test environment setup

This README explains how to fully set up the test environment for this monorepo and how to run the package test suites successfully on Windows (PowerShell / `pwsh`). It also documents common issues you may encounter and how the repository is configured to work with Jest, Babel, and React testing libraries.

## Quick start (recommended)

1. Open PowerShell (`pwsh`) in the repo root:

```pwsh
cd "C:\Users\HP\Desktop\New folder (2)\bear-minimun"
```

2. Install dependencies at the workspace root (this will install devDependencies to root yarn workspace):

```pwsh
yarn install
```

3. Run all tests (this uses Lerna to run each package test script):

```pwsh
yarn test
```

Or run tests for a single package (example: `remote`):

```pwsh
cd packages/remote
yarn test
```

## Required devDependencies

The project needs these dev dependencies (normally in the root `package.json`) so Jest and Babel can transform and run tests that use JSX and TypeScript:

- `jest` and `babel-jest`
- `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/dom`
- `identity-obj-proxy` (for mocking CSS imports in Jest)
- `@babel/preset-react`, `@babel/preset-env`, `@babel/preset-typescript`
- (recommended) `@babel/core` to satisfy peer requirements of presets

If any are missing you can add them to the workspace root with the `-W` flag so they are placed in the root `package.json`:

```pwsh
yarn add -D -W @testing-library/dom identity-obj-proxy @babel/core @babel/preset-react babel-jest jest
```

Notes:
- Some projects will also use `ts-jest` and TypeScript dev dependencies — keep those if present.

## Babel configuration (important)

- Make sure there is a root `babel.config.js` file (NOT `babel.congif.js`) so `babel-jest` can pick it up automatically. The file should include `@babel/preset-react` to transform JSX. Example (this repository contains this already):

```js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
};
```

- If you run Jest inside a package and Babel cannot be found, add a package-level `babel.config.js` that re-exports the root config:

```js
// packages/remote/babel.config.js
module.exports = require('../../babel.config.js');
```

## Jest configuration

- Each package should have a `jest.config.js` file (this repo uses package-level config files). Important options to include:
  - `transform: { '^.+\\.[jt]sx?$': 'babel-jest' }`
  - `moduleNameMapper` to mock CSS and static assets, e.g.:

```js
moduleNameMapper: {
  '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
}
```

- Create `__mocks__/fileMock.js` in the package (or a central place referenced by `moduleNameMapper`) with:

```js
module.exports = 'test-file-stub';
```

- Ensure there are not multiple `jest.config.*` files in the same package (e.g., both `jest.config.ts` and `jest.config.js`) — Jest will error with *Multiple configurations found*. Remove or rename the unused config files; prefer `jest.config.js` for explicitness.

## Handling CSS and static asset imports in tests

- Tests that import CSS (e.g. `import './App.css'`) will fail unless you tell Jest how to handle those imports. Use `moduleNameMapper` (see above) and install `identity-obj-proxy`.

## Testing components that use Module Federation / dynamic imports

- During tests Module Federation remote modules (like `import('remote/Header')`) are not available. Options:
  - Provide a manual mock at the package under `__mocks__/remote/Header.js` with a small React component for tests.
  - Or mock the module in the test with `jest.mock('remote/Header', () => ... )`.

Example manual mock:

```js
// packages/container/__mocks__/remote/Header.js
const React = require('react');
module.exports = function Header() {
  return React.createElement('div', null, React.createElement('h1', null, 'Remote'));
};
```

Alternatively, in a test file:

```js
jest.mock('remote/Header', () => ({ __esModule: true, default: () => <div><h1>Remote</h1></div> }));
```

## Tests added in this repo

I added tests for the remote `Header` component at:

- `packages/remote/src/__tests__/Header.test.tsx`

This file contains tests that:
- Render and assert the header text
- Verify heading semantics (`role='heading'`, level 1)
- Verify default export works
- Snapshot test

## Running a single test file or watch mode

From repo root (PowerShell):

```pwsh
# run only remote package tests
cd packages/remote
yarn test

# run jest in watch mode for faster iteration
yarn test --watch
```

You can also run Jest directly with an explicit config if necessary:

```pwsh
# use --config to tell jest which config to use
yarn test -- --config packages/remote/jest.config.js
```

## Common errors and fixes

- "Support for the experimental syntax 'jsx' isn't currently enabled": check `babel.config.js` exists at repo root and includes `@babel/preset-react`.
- "Cannot find module '@testing-library/dom'": install `@testing-library/dom` (root devDependency): `yarn add -D -W @testing-library/dom`.
- "Unexpected token '.'" on import of CSS: ensure `moduleNameMapper` and `identity-obj-proxy` are set up.
- "Multiple configurations found": remove `.ts` or duplicate `jest.config.*` files so only one config per package is found by Jest.

## CI notes

- In CI make sure you run `yarn install` at repo root, then `yarn test`.
- Prefer a root-level cache for `node_modules` in your CI to speed up workspace installs.

## Files I changed / added while fixing tests

- `babel.config.js` (root) — ensure presets include `@babel/preset-react`
- `packages/*/babel.config.js` — package-level pointer files (optional)
- `packages/*/jest.config.js` — per-package jest configs with `moduleNameMapper`
- `packages/*/__mocks__/fileMock.js` — file mock for static assets
- `packages/container/__mocks__/remote/Header.js` — manual mock for federated `remote/Header` used by container tests
- `packages/remote/src/__tests__/Header.test.tsx` — new header tests

## Need help?
If anything still fails after following the steps above, paste the failing error output here (the first ~20 lines are usually enough) and I will diagnose the cause and provide a targeted fix.
