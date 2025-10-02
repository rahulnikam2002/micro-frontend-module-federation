# Unit testing (Jest) — approach and setup in this repo

What is unit testing?

- Unit testing means testing small, isolated units of code (functions or components) to ensure they behave as expected. For React apps we commonly test components using Jest + Testing Library.

This repo's testing stack

- Jest as the test runner.
- Babel for transforming JSX/TypeScript in tests (`babel-jest` + `babel.config.js`).
- `@testing-library/react` and `@testing-library/jest-dom` for rendering components and DOM assertions.
- `identity-obj-proxy` for mocking CSS imports.

Where tests and configs live

- Each package has `jest.config.js` (examples: `packages/container/jest.config.js`, `packages/remote/jest.config.js`). Important options:
  - `transform: { '^.+\\.[jt]sx?$': 'babel-jest' }`
  - `moduleNameMapper` maps CSS to `identity-obj-proxy` and static assets to file mocks.
  - `setupFilesAfterEnv: ['@testing-library/jest-dom']`
  - `collectCoverage: true` and coverage reporters configured.

Running tests

- From the repo root (runs tests across packages using Lerna):

```powershell
yarn test
```

- From a package directory:

```powershell
cd packages/remote
yarn test
```

Mocking Module Federation remotes in tests

- Module Federation remotes are not available during Jest tests by default. Options to handle this:
  - create manual mocks under `packages/container/__mocks__/remote/Header.js` (or `packages/remote/src/__mocks__/...`) — this repo already contains example mocks in `__mocks__` folders.
  - use `jest.mock('remote/Header', () => ({ __esModule: true, default: () => <div>Mock</div> }));` in test files.

Static assets and CSS in tests

- Use `moduleNameMapper` and `identity-obj-proxy` so `import './App.css'` doesn't throw during tests.
- File mocks (e.g., `__mocks__/fileMock.js`) should export a string like `module.exports = 'test-file-stub'`.

Troubleshooting tips

- If you see "Support for the experimental syntax 'jsx' isn't currently enabled": ensure `babel.config.js` exists at repo root and includes `@babel/preset-react`.
- If Jest finds multiple configs, remove duplicate `jest.config.*` files in the package.

Why this is helpful for your videos

- You can show how to run package tests, add component tests, and how to mock federated imports — which is a crucial part of testing MFEs.