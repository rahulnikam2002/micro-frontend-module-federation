# Switching from global .css to .module.css (CSS Modules) — configuration and migration steps

Why move to CSS Modules?

- CSS Modules scope class names locally to a component, avoiding global class name collisions and making styles easier to reason about in large apps or microfrontends.

Webpack configuration in this repo (how CSS Modules are wired)

- Webpack has two rules:
  - `test: \.module\.css$` — uses `style-loader` + `css-loader` with `{ esModule: false, modules: true }`
  - `test: \.css$` (exclude `.module.css`) — uses `style-loader` + `css-loader` (global css)

Why `esModule: false`?

- css-loader v3+ defaults to ES modules. When `esModule: true`, you often have to use `styles.default.button` to access classes. Setting `esModule: false` preserves the CommonJS-style export (`styles.button`) which matches how imports are used across this repo.

Steps to migrate a component to CSS Modules

1. Rename the CSS file
  - From `Button.css` to `Button.module.css`.

2. Update import in component
  - From `import './Button.css'` (global) to `import styles from './Button.module.css'`.
  - Replace usage: `className="btn primary"` → `className={styles.primary}` (or `className={`${styles.btn} ${styles.primary}`}` when combining).

3. TypeScript: add or update type declarations
  - If TypeScript complains, add a `global.d.ts` (or `src/global.d.ts`) with:

```ts
declare module '*.module.css';
```

- This repo already contains `@types/css-modules` in dependencies — you can also use `css-modules-typescript-loader` or `typescript-plugin-css-modules` to generate typed class names for autocompletion.

4. Update tests
  - Jest maps `*.module.css` to `identity-obj-proxy` in `moduleNameMapper`, so tests continue to work. Ensure your package `jest.config.js` includes `'\\.(css|less|scss|sass|module\\.css)$': 'identity-obj-proxy'`.

5. Be careful with dynamic class names
  - CSS Modules generate unique hashed class names. If your code looked up classes by hard-coded string names or relied on global selectors, you’ll need to adapt to the module approach.

Common migration pitfalls

- Forgetting to update import names — switching to default import `styles` is required to access `.class` keys.
- Third-party libraries or global CSS that rely on global class names may break — keep shared global styles in `index.css` or a shared global stylesheet.
- Server-side rendering: ensure you don’t serialize hashed names in a way that mismatches client-side builds.

What to show on camera

- Rename a single component’s stylesheet to `.module.css`, update the import, run the dev server and show styles still apply but are now scoped (inspect elements to show hashed class names).
- Show how Jest still passes tests thanks to `identity-obj-proxy` mapping for `.module.css`.