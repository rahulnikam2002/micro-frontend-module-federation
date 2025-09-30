# Microfrontends (MFE) — what it is and how this repo implements it

What are microfrontends?

- Microfrontends split a large frontend into smaller, independently deployable frontend apps (each with its own build and deploy lifecycle). They let independent teams ship features without coordinating a monolithic frontend release.

This repo's MFE layout

- There are three packages under `packages/`:
  - `container` — the host application that composes and loads remote microfrontends.
  - `remote` — a micro-app exposing components (e.g., `Header`) that the container consumes.
  - `footer` — another micro-app exposing footer functionality.

How they communicate / integrate

- The apps are integrated at runtime by Webpack Module Federation (see the Module Federation doc). The container lists the remotes (URLs) it expects; remote apps expose modules by name.
- In development, each package runs its own dev server (ports 3000, 3001, 3002 in this repo). In production builds the remotes are uploaded and served (this repo shows S3-hosted remote entries in `packages/container/webpack.config.js`).

Files to inspect for MFE wiring

- `packages/container/webpack.config.js` — declares remotes (currently pointing to S3 URLs; local alternatives are commented out). Example snippet:
  - `remotes: { remote: "remote@https://.../remoteEntry.js", footer: "footer@https://.../remoteEntry.js" }`

- `packages/remote/webpack.config.js` — exposes modules:
  - `exposes: { "./Header": "./src/components/Header" }`

- `packages/footer/webpack.config.js` — exposes modules (example: `"./Footer": "./src/bootstrap"`).

Running locally vs production

- Local development: use the dev server URLs; in `container` webpack config there are commented lines showing:
  - `remote: "remote@http://localhost:3001/remoteEntry.js"`
  - `footer: "footer@http://localhost:3002/remoteEntry.js"`
- Production: the container expects the remoteEntry to be hosted (in this repo an S3 URL is configured). Make sure CORS and correct public paths are set on the hosting.

Common MFE gotchas to mention on camera

- Duplicate React instances: always mark `react` and `react-dom` as shared singletons to avoid runtime errors.
- Version mismatches in shared dependencies: ensure compatible versions or pin versions when necessary.
- Remote loading failures: check network URL, CORS, and that `remoteEntry.js` is accessible.
- Public path: Module Federation often needs `output.publicPath = 'auto'` for correct chunk loading.

Why this structure is useful for teaching

- You can demonstrate a complete MFE workflow: start each app in separate terminals, make a change in `remote` and show the container consuming it without rebuild. Also show how to host remoteEntry on S3/host and point the container to the production URL.