# Payload CMS bug repo

## Prerequisites

- [pnpm] >= v10 and NodeJS Current must be installed
- [git] must be installed

## Setup

In a terminal window, copy the `.env.example` file to `.env` and change values if you wish.

```
cp .env.example .env
```

Install the project dependencies.

```
pnpm install
```

## Development

Start the PayloadCMS dev server\*.

```
pnpm dev --port=3000 --hostname=localhost
```

## Production

Build the project.

```
pnpm build
```

Start the PayloadCMS server.

```
pnpm start --port=3000 --hostname=localhost
```

## Admin UI

[http://localhost:3000/admin]

## Docs UI

[http://localhost:3000/]

[pnpm]: https://pnpm.io/
[git]: https://git-scm.com/downloads
[http://localhost:3000/admin]: http://localhost:3000/admin
[http://localhost:3000/]: http://localhost:3000/
