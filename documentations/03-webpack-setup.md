# Webpack — what it is and how this repo uses it

What is Webpack?

- Webpack is a bundler that processes application source files (JS/TS/CSS/assets) and produces optimized bundles for development or production. It supports loaders (to transform files) and plugins (to extend behavior).

This repo's webpack basics

- Each package (`container`, `remote`, `footer`) ships a `webpack.config.js` tuned for TypeScript + Module Federation:
  - `entry`: `./src/index.ts` (or `./src/index.tsx` in some packages)
  - `mode`: `'development'` or uses `argv.mode` to decide
  - `devServer`: different port per package (container: 3000, remote: 3001, footer: 3002)
  - `output.publicPath`: `auto` (required for Module Federation)

Key loaders and rules present

- TypeScript/JS: `ts-loader` handles `.ts/.tsx/.js/.jsx` files and excludes `node_modules` and test files.
- CSS Modules: a rule for `\.module\.css$` using `style-loader` + `css-loader` with options `{ esModule: false, modules: true }`. The `esModule: false` is important to keep the CSS import shape compatible with `import styles from './x.module.css'`.
- Global CSS: rule for `\.css$` that excludes `.module.css` and uses `style-loader` + `css-loader`.

Plugins

- `HtmlWebpackPlugin` — generates `index.html` for dev and injects bundles.
- `ModuleFederationPlugin` — used in each package to either `expose` or `consume` federated modules (see Module Federation doc).
- `EnvironmentPlugin` and `DefinePlugin` (in `container`) are used to inject build-time environment values.

Ports used by dev servers

- `container` — 3000
- `remote` — 3001
- `footer` — 3002

Commands (package-level)

From a package folder, common scripts are defined in `packages/*/package.json`:

```powershell
# run a single package dev server
cd packages/remote
yarn start

# build production bundle for that package
yarn build

# run tests for that package
yarn test
```

Tips and things to show on-camera

- Demonstrate changing a CSS module and show HMR in a running remote and how the container picks it up if using local remotes.
- Show how `esModule: false` avoids `styles.default` being required to access class names.
- Explain why `publicPath: 'auto'` is required for Module Federation to locate remote chunks.

Where to look in the repo

- `packages/container/webpack.config.js`
- `packages/remote/webpack.config.js`
- `packages/footer/webpack.config.js`