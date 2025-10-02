# Code coverage — what it is and how this repo collects and uses it

What is code coverage?

- Code coverage measures how much of your code is executed by tests. `lcov` is a common format for coverage reports and tools like SonarCloud can ingest lcov to show coverage metrics.

How coverage is configured in this repo

- Each package's `jest.config.js` sets:
  - `collectCoverage: true`
  - `collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/index.{js,ts,tsx}', '!src/**/types.{ts,tsx}']`
  - `coverageDirectory: 'coverage'`
  - `coverageReporters: ['text', 'lcov', 'html']`

- Root `package.json` scripts include `test:coverage` that runs Lerna tests with `--coverage` (`npx lerna run test --stream -- --coverage`).
- There’s a `merge-coverage` script (`node scripts/merge-lcov.js`) — this repository uses a merge step to combine per-package lcov reports into a single report for consumption by Sonar or other tools.

SonarCloud / CI integration (as configured in `.github/workflows/sonar_scan.yml`)

- The workflow downloads coverage artifacts named `container-coverage`, `remote-coverage`, and `footer-coverage` to `packages/*/coverage` paths.
- It passes `-Dsonar.javascript.lcov.reportPaths=packages/container/coverage/lcov.info,packages/remote/coverage/lcov.info,packages/footer/coverage/lcov.info` to SonarCloud so the lcov files are read.

How to run coverage locally

1. Run per-package coverage via Lerna from repo root:

```powershell
# runs jest --coverage in each package
yarn test:coverage
```

2. Inspect each package's `coverage/lcov.info` and `coverage/index.html`.

3. If you want a single combined report, use or adapt `scripts/merge-lcov.js` (the repo has a `merge-coverage` script) and then open the generated `lcov-report/index.html`.

Troubleshooting coverage problems

- Missing `lcov.info` files in CI: ensure package test jobs upload coverage as artifacts, and that the sonar workflow downloads them to `packages/*/coverage` before running SonarCloud scan.
- File paths in `lcov.info` may be relative; the Sonar workflow sets `rootDir` in package Jest configs to help Sonar map paths correctly.

Demo ideas for your channel

- Show running tests with coverage, opening the `coverage/index.html`, and then uploading/inspecting the same in SonarCloud or showing the merged HTML report.