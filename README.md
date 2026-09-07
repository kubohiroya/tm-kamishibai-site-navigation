# TM Kamishibai Site Navigation

Shared site navigation contract, renderer, and shell assets for the TM Kamishibai site family.

This repository is the source of truth for the navigation shared by:

- `kubohiroya/tm-kamishibai`
- `kubohiroya/tm-kamishibai-docs`
- `kubohiroya/tm-kamishibai-samples`

## Usage

Install the package in a consuming site repository.

```sh
pnpm add -D @kubohiroya/tm-kamishibai-site-navigation
```

Render or replace navigation from TypeScript build scripts.

```ts
import {
  NAVIGATION_CONTRACT,
  SITE_SHELL_CSS_URL,
  replaceSiteNavigation,
} from "@kubohiroya/tm-kamishibai-site-navigation";
```

`SITE_SHELL_CSS_URL` points to the packaged `site-shell.css` asset. Consumers that publish a static
site should copy that file into their site output during build.

## Development

Use TypeScript for source files. JavaScript and declaration files are build output only.

```sh
pnpm install
pnpm verify
```

## Release Flow

1. Update the TypeScript source, `src/navigation-contract.json`, or `src/site-shell.css`.
2. Run `pnpm verify`.
3. Publish a new package version.
4. Update each consuming repository to the exact package version.
