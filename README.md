# micro-frontend-module-federation — Teaching & setup guide

This README is written to help you (and your viewers) set up and run this microfrontend monorepo locally, run tests, collect coverage, and understand the important configuration choices made in the project.

If you'd like a single entry that links shorter deep-dive docs for recording, see `documentations/00-index.md` which links topic-specific files under `documentations/`.

## What you'll learn from this repo

- How a monorepo is organized with Lerna + workspaces.
- How to implement microfrontends using Webpack Module Federation.
- How to configure Webpack for TypeScript, CSS Modules, and Module Federation.
- How testing (Jest + Testing Library) and coverage are set up per-package.
- How CI uploads and uses coverage with SonarCloud.

## Prerequisites

- Node.js (>= 18 recommended; CI uses Node 20)
- Yarn (recommended) or a modern npm that supports workspaces
- Git

Verify your environment (PowerShell):

```pwsh
node -v
yarn -v
git --version
```

## Quick start — run the project locally

1. Clone the repo and open a PowerShell terminal in the repo root.

```pwsh
git clone <repo-url>
cd <repo-root>
```

2. Install dependencies at the root (workspaces link packages automatically):

```pwsh
yarn install
```

3. Start the three apps in separate terminals for local development:

```pwsh
# Terminal A: container (port 3000)
cd packages/container
yarn start

# Terminal B: remote (port 3001)
cd packages/remote
yarn start

# Terminal C: footer (port 3002)
cd packages/footer
yarn start
```

Open `http://localhost:3000` to view the container. If you want the container to use local remotes, edit `packages/container/webpack.config.js` and switch the `remotes` entries to the `http://localhost` URLs (the file contains commented local examples).

## Scripts you will use often

From the repo root (these use Lerna to orchestrate across packages):

```pwsh
yarn start           # runs `start` in each package (dev servers)
yarn build           # runs `build` in each package
yarn test            # runs tests across packages (lerna run test --stream)
yarn test:coverage   # runs tests with coverage across packages
yarn merge-coverage  # repository has a merge script (node scripts/merge-lcov.js)
```

From a package folder (e.g. `packages/remote`):

```pwsh
yarn start    # run dev server for that package
yarn build    # build production bundle
yarn test     # run tests for that package
```

## Testing and coverage

- Each package contains a `jest.config.js` that uses `babel-jest` and maps CSS to `identity-obj-proxy` for tests.
- Coverage output (`lcov.info`) is written to `packages/<pkg>/coverage/`.
- CI downloads coverage artifacts and passes the lcov paths to SonarCloud (see `.github/workflows/sonar_scan.yml`).

To run tests with coverage locally:

```pwsh
yarn test:coverage
```

Then check `packages/<pkg>/coverage/lcov.info` or open the HTML report `packages/<pkg>/coverage/lcov-report/index.html`.

## Important configuration notes (short)

- Babel: root `babel.config.js` includes `@babel/preset-env`, `@babel/preset-react` (automatic runtime) and `@babel/preset-typescript`.
- TypeScript: packages use `tsconfig.json` tuned for `jsx: 'react-jsx'` and `module: 'esnext'`.
- CSS Modules: Webpack rules match `*.module.css` and use `css-loader` with `{ esModule: false, modules: true }` to preserve a CommonJS-style import shape (`styles.foo`).
- Module Federation: remotes expose modules (e.g. `./Header`) and the container consumes them. React & react-dom are shared singletons.

See `documentations/08-important-configs.md` for a concise reference of these flags and why they matter.

## CI & SonarCloud

- The callable workflow `.github/workflows/sonar_scan.yml` expects coverage artifacts and a `SONAR_TOKEN` secret. The workflow downloads coverage artifacts for `container`, `remote`, and `footer`, then runs the SonarCloud action with `sonar.javascript.lcov.reportPaths` set to the packages' lcov files.
- If you want to reproduce CI locally, run package tests with `--coverage`, ensure `coverage/lcov.info` files exist and are accessible, and then call the Sonar action from CI with valid tokens.

## Common issues & quick fixes

- "Support for the experimental syntax 'jsx' isn't enabled": ensure `babel.config.js` is present at the repo root and includes `@babel/preset-react`.
- Tests failing on CSS import: make sure `identity-obj-proxy` is installed and `jest.config.js` maps CSS to it.
- Duplicate React runtime errors at runtime: check Module Federation `shared` configuration and ensure `react` / `react-dom` are singletons with compatible versions.
- RemoteEntry 404 / CORS: confirm the remote dev server is running or that the production `remoteEntry.js` is uploaded to the expected URL; ensure CORS headers are configured if hosted.

If you get an error, copy the top ~20 lines of the stack/console output and open the relevant doc in `documentations/` (the files contain debugging steps). Start with `documentations/00-index.md`.

## Project structure (short)

```
packages/
  container/   # host app (webpack.config.js contains remotes)
  remote/      # exposes Header via Module Federation
  footer/      # exposes Footer via Module Federation
documentations/ # topic-specific markdowns (see 00-index.md)
.github/workflows/sonar_scan.yml
lerna.json
package.json   # root scripts and workspace config
babel.config.js
```

## Where to look for detailed teaching material

Start with `documentations/00-index.md` — it links dedicated docs for each topic (Monorepo/Lerna, Microfrontends, Webpack, Module Federation, Tests, Coverage, GitHub Actions, Important configs, CSS modules migration).

## Contributing & recording tips

- If you change configuration while preparing a video, commit the change and include a clear commit message explaining why (this will help when you teach troubleshooting).
- When demonstrating local Module Federation, start remote apps first, then the container so remoteEntry files are available.
- For audience reproducibility, include the exact Node/Yarn versions you used in your video description.

## Need help?
If anything still fails after following this README and the documents in `documentations/`, paste the failing error output (first ~20 lines) and I will diagnose the cause and provide a targeted fix.
