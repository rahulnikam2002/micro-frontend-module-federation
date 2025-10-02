# GitHub Actions — what they are and how this repo uses them (Sonar scan example)

What are GitHub Actions?

- GitHub Actions are automated workflows that run on GitHub events or can be invoked manually. They’re commonly used for CI: testing, linting, building, and running scans like SonarCloud.

How this repo uses Actions (file to inspect)

- `.github/workflows/sonar_scan.yml` — a callable workflow that performs a SonarCloud scan using coverage artifacts.

Key parts of `sonar_scan.yml` (highlights)

- The workflow is `workflow_call` type and expects a `SONAR_TOKEN` secret and `github_token` input.
- It runs on `ubuntu-latest` and uses Node 20 (`actions/setup-node@v4`).
- Download coverage artifacts step: uses `actions/download-artifact@v4` to fetch `container-coverage`, `remote-coverage`, `footer-coverage` into `packages/*/coverage` paths (these steps use `continue-on-error: true` so the workflow continues even when an artifact is missing).
- SonarCloud scan step: `sonarsource/sonarcloud-github-action@v2` with args including `sonar.organization`, `sonar.projectKey`, `sonar.sources`, `sonar.tests`, `sonar.exclusions`, and `sonar.javascript.lcov.reportPaths` listing the packages' lcov files.
- It finishes by running the SonarCloud quality gate check (`sonarsource/sonarqube-quality-gate-action@master`).

How to trigger and use this workflow

- This workflow is callable from other workflows (because it uses `workflow_call`). You can either:
  - call it from a separate CI workflow once coverage artifacts are uploaded, or
  - run it manually via the GitHub UI if you create a calling workflow.

Required secrets and permissions

- `SONAR_TOKEN` (stored in repository or organization secrets) — used by SonarCloud action.
- `github_token` input — used in the SonarCloud step to update PR decorations/status.

Troubleshooting CI issues

- Sonar can't find lcov files: ensure coverage artifacts are uploaded by the jobs that run tests and that artifact names match what `sonar_scan.yml` downloads.
- SonarCloud authentication errors: check `SONAR_TOKEN` and that account has access to the Sonar organization/project.
- If `find` or `ls` in the debug step shows no `.info` files, fix earlier test jobs to generate and upload coverage.

What to show on camera

- Walk through `sonar_scan.yml` lines that specify `sonar.javascript.lcov.reportPaths` and show where Jest writes `coverage/lcov.info` in each package.
- Show a CI run that uploads coverage artifacts, then demonstrate this workflow consuming them and running SonarCloud.