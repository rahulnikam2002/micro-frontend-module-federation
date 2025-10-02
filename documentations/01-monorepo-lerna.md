# Monorepo & Lerna — what it is and how this repo is set up

What is a monorepo?

- A monorepo stores many related packages (libraries/apps) inside a single repository. It simplifies sharing code, running cross-package scripts, and orchestrating builds/tests across packages.

Why use Lerna + Yarn workspaces here?

- Lerna provides orchestration for running scripts across packages (e.g., start, build, test). This repo uses Lerna with Yarn/NPM workspaces so dependencies can be hoisted to the root and scripts can be executed per-package or in parallel.

How this repo is configured (exact files to inspect)

- `lerna.json` (root) — uses independent versioning and declared packages:
  - key snippet: "packages": [ "packages/*" ]
  - version: "independent"

- `package.json` (root) — workspace and scripts:
  - `workspaces`: ["packages/*"] ensures package manager treats `packages/*` as workspace packages.
  - Useful scripts in root:
    - `test`: `lerna run test --stream` — runs `test` script in each package and streams output.
    - `test:coverage`: `npx lerna run test --stream -- --coverage` — runs tests with coverage flag.
    - `start`: `npx lerna run start --parallel` — starts all packages' dev servers in parallel.
    - `build`: `npx lerna run build`

How to run common tasks locally

- Install dependencies at repo root (recommended):

```powershell
# PowerShell / pwsh
cd "<repo-root>"
yarn install
```

- Start all dev servers (container, remote, footer):

```powershell
yarn start
```

- Run tests across all packages:

```powershell
yarn test
```

- Run tests with coverage (root script):

```powershell
yarn test:coverage
```

Notes and troubleshooting

- If a package can't find a dependency, ensure the dep is present in either the package's package.json (package-scoped) or hoisted at the root `package.json`.
- Lerna commands in `package.json` use `npx lerna` to ensure the local lerna binary is used if installed in devDependencies.
- When modifying package.json in a package, re-run `yarn install` to refresh workspace links.

Files to review for a deep dive

- `lerna.json`
- root `package.json`
- `packages/container/package.json`, `packages/remote/package.json`, `packages/footer/package.json`

Why this matters for your recordings

- Understanding the monorepo tooling helps you explain how flipping between packages (container, remote, footer) works without separate repos. The Lerna scripts are the single command entrypoints you’ll probably show in demos (start, build, test).