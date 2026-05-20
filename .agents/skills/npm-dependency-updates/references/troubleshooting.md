# Troubleshooting NPM Dependency Updates

## AI Embeddings Plugin Drizzle Version Mismatch

```
Error: Version mismatch for @payloadcms/drizzle
Expected: 3.76.1, Found: 3.59.1
```

**Cause:** Payload packages were updated but the AI embeddings plugin's nested dependencies weren't updated in the lock file.

**Fix:**

```bash
pnpm uninstall @payloadcms/plugin-ai-embeddings
pnpm install @payloadcms/plugin-ai-embeddings --registry=https://registry.npmjs.org
pnpm list @payloadcms/drizzle --depth=0
```

## Package Ecosystem Version Mismatch

```
Error: Package @payloadcms/db-mongodb@3.59.1 but payload@3.61.1
```

**Fix:**

```bash
pnpm update @payloadcms/db-mongodb@3.61.1
pnpm list @payloadcms/* --depth=0
```

## Peer Dependency Conflicts

```
Warning: payload@3.61.1 has incorrect peer dependency lexical@0.35.0
```

**Fix:**

```bash
# Check what version is required
cat node_modules/@payloadcms/richtext-lexical/package.json | grep '"lexical"'

# Update to the required version (all @lexical/* packages too)
pnpm update lexical@0.35.0 @lexical/headless@0.35.0 @lexical/html@0.35.0 \
  @lexical/list@0.35.0 @lexical/selection@0.35.0 @lexical/table@0.35.0 @lexical/utils@0.35.0
```

## Lexical Version Shows Newer Than Required

```
pnpm outdated shows lexical 0.37.0 available, but Payload requires 0.35.0
```

**Fix:** Do NOT update to the version shown in `pnpm outdated`. Always use Payload's required version:

```bash
cat node_modules/@payloadcms/richtext-lexical/package.json | grep '"lexical"'
```

## Multiple Versions of Same Package Installed

```
pnpm list shows multiple versions:
lexical 0.35.0
└─┬ some-package
  └── lexical 0.37.0
```

**Fix:**

```bash
rm -rf node_modules
pnpm install

# If problem persists
pnpm update lexical@0.35.0 @lexical/*@0.35.0
```
