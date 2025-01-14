# Payload CMS live preview repo

## Prerequisites

- [npm] >= v10 and NodeJS Current must be installed
- [git] must be installed

## Setup

In a terminal window, copy the `.env.example` file to `.env` and change values if you wish.
  ```
  cp .env.example .env
  ```
Install the project dependencies.
  ```
  npm install
  ```

## Development

Start the PayloadCMS dev server*.
  ```
  npm run dev --port=3000 --hostname=localhost
  ```

## Production

Build the project.
  ```
  npm run build
  ```

Start the PayloadCMS server.
  ```
  npm run start --port=3000 --hostname=localhost
  ```

## Admin UI

[http://localhost:3000/admin]

## Docs UI

[http://localhost:3000/]


[npm]: http://nodejs.org/
[pnpm]: https://pnpm.io/
[git]: https://git-scm.com/downloads
[http://localhost:3000/admin]: http://localhost:3000/admin
[http://localhost:3000/]: http://localhost:3000/
