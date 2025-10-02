# Important configurations — TypeScript, Babel, Jest, and package-level details

This file collects the small but important configurations you’ll want to reference quickly while recording.

TypeScript (`tsconfig.json`)

- Key `compilerOptions` used in packages (example from `packages/container/tsconfig.json`):
  - `target: 'es5'`, `module: 'esnext'`, `moduleResolution: 'node'`
  - `jsx: 'react-jsx'` — uses the new JSX transform
  - `strict: true`, `esModuleInterop: true`, `allowSyntheticDefaultImports: true`
  - `noEmit: false` (adjustable if you want to prevent TS compilation during tests)

Babel (`babel.config.js` in repo root)

- The root `babel.config.js` contains presets:
  - `@babel/preset-env` (target: current node for test environments)
  - `@babel/preset-react` with `{ runtime: 'automatic' }` (new JSX runtime)
  - `@babel/preset-typescript`

Jest configs (package-level)

- Each package's `jest.config.js` includes:
  - `transform` → `babel-jest`
  - `moduleNameMapper` → CSS mapped to `identity-obj-proxy`, assets mapped to file mocks
  - `collectCoverage` and `coverageReporters` configured
  - `setupFilesAfterEnv: ['@testing-library/jest-dom']`

CSS Loader / CSS Modules note

- `css-loader` is configured with `esModule: false, modules: true` for `.module.css`. This ensures imports like `import styles from './a.module.css'` yield `styles.className` directly instead of `styles.default.className`.

Package-level scripts

- Packages expose `start`, `build`, `serve`, `clean`, and `test` scripts in `packages/*/package.json`. Root scripts use Lerna to orchestrate these across packages.

Where to look in the repo

- `babel.config.js` (root)
- `packages/*/tsconfig.json`
- `packages/*/jest.config.js`
- `packages/*/webpack.config.js`
- `packages/*/package.json` (to show scripts and dependencies)

Quick commands to verify environment

```powershell
# install workspace deps
yarn install

# run container dev server
cd packages/container
yarn start

# run remote tests
cd packages/remote
yarn test
```

This file is a quick go-to when you forget small flags or exact options used around Babel, TypeScript and Jest.