# Ecosystem Package Reference

## Payload CMS + Lexical

### Community Packages (MUST all match the same version)

- `payload`
- `@payloadcms/db-mongodb` / `@payloadcms/db-postgres`
- `@payloadcms/richtext-lexical` / `@payloadcms/richtext-slate`
- `@payloadcms/next`
- `@payloadcms/ui`
- `@payloadcms/plugin-cloud`
- `@payloadcms/plugin-redirects`
- `@payloadcms/plugin-nested-docs`
- `@payloadcms/plugin-import-export`
- `@payloadcms/storage-s3`
- `@payloadcms/live-preview-react`
- `@payloadcms/plugin-ai-embeddings` (requires uninstall/reinstall after Payload updates)
- All other `@payloadcms/*` packages not listed as Enterprise

### Enterprise Plugins (Independent versioning)

- `@payloadcms/plugin-audit-logs`
- `@payloadcms/plugin-publication-workflows`

### Email Adapters (Independent versioning)

- `@payloadcms/email-nodemailer`

### Lexical Packages (MUST match version required by `@payloadcms/richtext-lexical`)

- `lexical`
- `@lexical/headless`
- `@lexical/html`
- `@lexical/list`
- `@lexical/selection`
- `@lexical/table`
- `@lexical/utils`

**Important:** Do NOT use the version from `pnpm outdated` for Lexical. Always check Payload's required version:

```bash
cat node_modules/@payloadcms/richtext-lexical/package.json | grep '"lexical"'
```

## React

- `react` and `react-dom` — MUST be on the same version
- `@types/react` and `@types/react-dom` — update together

## Next.js

- `next`
- `eslint-config-next` — should match Next.js version
- `@payloadcms/next` — follows Payload versioning, not Next.js

## TypeScript

- `typescript`
- `@types/node`
- Other `@types/*` packages

## Testing

- `vitest` and `@vitest/coverage-v8` — MUST match
- `@testing-library/react`
- `@testing-library/jest-dom`
