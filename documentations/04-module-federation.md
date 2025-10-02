# Webpack Module Federation — concept and how it’s set up in this repo

What is Module Federation?

- Module Federation (Webpack 5) lets JavaScript applications share code and dynamically load modules from other independently-built apps at runtime. It makes microfrontends practical by allowing remotes to expose modules and hosts (containers) to consume them.

Key concepts

- host/container: the app that consumes remote modules.
- remote(s): apps that expose modules (components or utilities).
- remoteEntry.js: the manifest file published by a remote that container uses to load remote modules at runtime.
- exposes/remotes/shared: the mapping of what a remote exposes and what a container expects.

How this repo configures Module Federation

- `packages/remote/webpack.config.js`:
  - `name: 'remote'`
  - `filename: 'remoteEntry.js'`
  - `exposes: { './Header': './src/components/Header' }`
  - `shared`: spreads `deps` and marks `react` & `react-dom` as singletons

- `packages/footer/webpack.config.js`:
  - `name: 'footer'`
  - `filename: 'remoteEntry.js'`
  - `exposes: { './Footer': './src/bootstrap' }`

- `packages/container/webpack.config.js`:
  - `name: 'container'`
  - `remotes`: configured to load remoteEntry from S3 URLs for production:
    - `remote: "remote@https://my-mfe-header-rahul.s3.ap-south-1.amazonaws.com/remoteEntry.js"`
    - `footer: "footer@https://my-mfe-footer-rahul.s3.ap-south-1.amazonaws.com/remoteEntry.js"`
  - Local dev URLs are commented as examples:
    - `remote@http://localhost:3001/remoteEntry.js`
    - `footer@http://localhost:3002/remoteEntry.js`

Important options and why they matter

- `publicPath: 'auto'` (set in remotes/footers outputs) — lets Webpack calculate correct runtime base path to load chunks remotely.
- `shared.react` / `shared['react-dom']` with `{ singleton: true, requiredVersion: deps.react }` — avoids loading multiple React copies.
- `filename: 'remoteEntry.js'` — this file must be accessible at the configured URL for the host to load the remote.

How to test locally (recommended steps for demos)

1. Start remote and footer in separate terminals:

```powershell
# Terminal A
cd packages/remote
yarn start

# Terminal B
cd packages/footer
yarn start

# Terminal C
cd packages/container
yarn start
```

2. Ensure `packages/container/webpack.config.js` uses local `http://localhost:3001/remoteEntry.js` and `http://localhost:3002/remoteEntry.js` lines (the repo has these lines commented — uncomment them for local demos).

Troubleshooting common runtime issues

- CORS / 404 when loading remoteEntry: check the remote's dev server URL or hosting path.
- Duplicate React errors: ensure singletons in `shared` and compatible versions across packages.
- Remote not found in production: confirm remoteEntry was uploaded and the container's remote URL points to the published remoteEntry.js.

Files to show on camera

- `packages/remote/webpack.config.js` (exposes)
- `packages/footer/webpack.config.js` (exposes)
- `packages/container/webpack.config.js` (remotes)

This topic is great for your audience because it covers both the theory (how federation works) and the practical steps (how to wire up containers and remotes and debug common errors).