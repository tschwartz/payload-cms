---
name: npm-dependency-updates
description: 'Update project NPM dependencies safely using PNPM CLI commands. Use when updating packages like Payload CMS, Lexical, React, Next.js, TypeScript, or testing libraries. Handles outdated checks, ecosystem-aware grouping, risk categorization, Payload/Lexical alignment, AI embeddings plugin fix, verification, and git commits. Covers minor and patch version updates only — major version updates require separate planning.'
argument-hint: 'Ecosystem to update, e.g., "payload", "react", "next", "typescript", "testing", or "all"'
---

# Update NPM Dependencies

⚠️ **This guide covers ONLY minor and patch version updates. Major version updates (X.0.0) require separate planning and are NOT covered.**

## Overview

Systematically update project dependencies using PNPM CLI commands. Packages are updated by ecosystem to maintain compatibility, verified with type checking, linting, and tests.

## Critical Rules

- ALL package version changes MUST be done using PNPM CLI commands only
- NEVER manually edit `package.json` directly
- NEVER manually edit `pnpm-lock.yaml` directly
- NEVER delete `pnpm-lock.yaml` — the lockfile ensures deterministic installs
- Use `pnpm add`, `pnpm remove`, `pnpm update` commands exclusively

## Variables

- `{ECOSYSTEM}` — the target ecosystem to update (e.g., `payload`, `react`, `all`)
- `{VERSION}` — target version for the ecosystem packages

---

## Step 1: Check What Needs Updating

```bash
pnpm outdated
```

Categorize the output by risk level:

- **Major version changes (X.0.0)** — SKIP, not covered by this skill
- **Minor version changes (0.X.0)** — Medium risk, test thoroughly
- **Patch version changes (0.0.X)** — Low risk, safest to update

Group packages by ecosystem. See the [ecosystem reference](./references/ecosystem-packages.md) for which packages belong together.

---

## Step 2: Run Pre-Change Verification

```bash
pnpm typescript
pnpm test
pnpm lint
```

All three must pass before proceeding. If any fail, STOP and report to the user.

---

## Step 3: Update Packages by Ecosystem

Update the target ecosystem(s). If `{ECOSYSTEM}` is `all`, process each ecosystem in this order: Payload+Lexical → React → Next.js → TypeScript → Testing → remaining packages.

### Payload CMS + Lexical Ecosystem

See [Payload ecosystem reference](./references/ecosystem-packages.md#payload-cms--lexical) for the full package list.

**3a. Update all Community Payload packages to the same version:**

Update every `@payloadcms/*` package in the project to the same version. Check `package.json` for the current list. As of now:

```bash
pnpm update payload@<VERSION> \
  @payloadcms/db-sqlite@<VERSION> \
  @payloadcms/next@<VERSION> \
  @payloadcms/richtext-lexical@<VERSION> \
  @payloadcms/live-preview-react@<VERSION>
```

If additional `@payloadcms/*` packages have been added, include them at the same version.

**3b. Fix AI Embeddings Plugin (if installed — CRITICAL):**

If `@payloadcms/plugin-ai-embeddings` is in `package.json`, it must be uninstalled and reinstalled after Payload updates to ensure `@payloadcms/drizzle` version is correctly updated in the lock file. Skipping this step will cause version mismatch errors.

```bash
pnpm uninstall @payloadcms/plugin-ai-embeddings
pnpm install @payloadcms/plugin-ai-embeddings --registry=https://registry.npmjs.org
```

**3c. Update Enterprise plugins (if installed — independent versioning):**

Enterprise plugins require the `PAYLOAD_NPM_TOKEN` env var to be set (configured in `.npmrc`).

```bash
pnpm update @payloadcms/plugin-audit-logs@latest \
  @payloadcms/plugin-publication-workflows@latest \
  @payloadcms/email-nodemailer@latest
```

**3d. Check Payload's Lexical requirement and update Lexical to match:**

```bash
# Check what Lexical version Payload requires — use THIS version, NOT pnpm outdated
cat node_modules/@payloadcms/richtext-lexical/package.json | grep '"lexical"'

# Update all Lexical packages to the EXACT version Payload requires
pnpm update lexical@<LEXICAL_VERSION> \
  @lexical/headless@<LEXICAL_VERSION> \
  @lexical/html@<LEXICAL_VERSION> \
  @lexical/list@<LEXICAL_VERSION> \
  @lexical/selection@<LEXICAL_VERSION> \
  @lexical/table@<LEXICAL_VERSION> \
  @lexical/utils@<LEXICAL_VERSION>
```

**3e. Verify alignment:**

```bash
pnpm list payload @payloadcms/* lexical @lexical/* --depth=0
```

### React Ecosystem

```bash
pnpm update react@<VERSION> react-dom@<VERSION>
pnpm update @types/react@<VERSION> @types/react-dom@<VERSION>
```

React and react-dom MUST be on the same version.

### Next.js Ecosystem

```bash
pnpm update next@<VERSION>
pnpm update eslint-config-next@<VERSION>
```

### TypeScript Ecosystem

```bash
pnpm update typescript@<VERSION>
pnpm update @types/node@<VERSION>
```

### Testing Ecosystem

```bash
pnpm update vitest@<VERSION> @vitest/coverage-v8@<VERSION>
pnpm update @testing-library/react@<VERSION> @testing-library/jest-dom@<VERSION>
```

---

## Step 4: Verify Updates

```bash
# Check installed versions
pnpm list <updated-packages> --depth=0

# Check for peer dependency warnings
pnpm install
```

---

## Step 5: Run Post-Change Verification

```bash
pnpm typescript
pnpm test
pnpm lint
```

All three must pass. If any fail, STOP and report to the user.

---

## Step 6: Commit Changes

Stage only the lockfile and package.json:

```bash
git add package.json pnpm-lock.yaml
git commit -m "chore: update {ECOSYSTEM} dependencies to {VERSION}"
```

---

## Troubleshooting

See the [troubleshooting guide](./references/troubleshooting.md) for common issues:

- AI Embeddings Plugin Drizzle version mismatch
- Package ecosystem version misalignment
- Peer dependency conflicts
- Lexical version pinning
- Multiple versions of the same package installed

---

## Clean Install (if needed)

If you encounter version conflicts or issues:

```bash
# Remove only node_modules (NEVER delete pnpm-lock.yaml)
rm -rf node_modules

# Fresh install using existing lockfile
pnpm install
```
