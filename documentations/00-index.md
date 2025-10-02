# Documentation index

This is the single entry point that links to detailed markdown files for this repository. Use this file to quickly find the guide you want to show on your channel or to reference when debugging.

- [01-monorepo-lerna.md](01-monorepo-lerna.md) — Overview of monorepos and how Lerna & workspaces are configured and used in this repo.
- [02-microfrontends-architecture.md](02-microfrontends-architecture.md) — Explanation of microfrontends and the container/remote/footer structure used here.
- [03-webpack-setup.md](03-webpack-setup.md) — Webpack setup, loaders, plugins, devServer ports and important options used across packages.
- [04-module-federation.md](04-module-federation.md) — Module Federation concepts and exact exposes/remotes/shared configuration present in the repo.
- [05-unit-testing-jest.md](05-unit-testing-jest.md) — Jest setup, Testing Library usage, mocking strategies (including federated remotes) and commands.
- [06-code-coverage.md](06-code-coverage.md) — How Jest coverage is generated per-package, merged, and passed to SonarCloud/CI.
- [07-github-actions-ci.md](07-github-actions-ci.md) — GitHub Actions (Sonar workflow) explanation, artifact handling, required secrets and troubleshooting.
- [08-important-configs.md](08-important-configs.md) — Quick reference: TypeScript, Babel, Jest, css-loader flags and package-level scripts.
- [09-css-to-cssmodule.md](09-css-to-cssmodule.md) — Step-by-step migration guide from global `.css` to `.module.css`, TypeScript and Jest notes.

How to use:

- Open the file for the topic you need while recording or troubleshooting. For quick demos, start with `02-microfrontends-architecture.md` and `04-module-federation.md`.