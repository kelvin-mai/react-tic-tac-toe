# TypeScript Full Stack Realtime Tic Tac Toe

## Requirements

- User can create a new game board
- Allow two (and only two) players to connect to a game board
- Persist game state on the server
- Follow standard rules for tic-tac-toe (or noughts and crosses)
- Display the game result and persist in the database at the end of the game
- Display a ranking of the top five players and allow players to start a new game

## Additional features

I have implemented a couple of additional features that I felt were necessary to bring this application alive.

- Users can see a list of past games on `{client_url}/player/{id}` and paginate through them.
- Users can see and replay completed games

## Installation

This project mainly uses [NPM](https://www.npmjs.com/) as the package manager for both the server and clientside code. The client side is scaffolded by [Vite](https://vitejs.dev/) to run a [React](https://react.dev/) application. The server depends on a service that uses [docker](https://www.docker.com/) to run the PostgreSQL database.

## Stack

- Database
  - [PostgreSQL](https://www.postgresql.org) - SQL database
- Shared
  - [TypeScript](https://www.typescriptlang.org/) - Modern JavaScript
- Server Application
  - [Socket.IO](https://socket.io) - WebSocket implementation
  - [Express](https://expressjs.com/) - HTTP server
  - [Prisma](https://www.prisma.io) - Database ORM
  - [Lucia](https://lucia-auth.com/) - Authentication library
- Client Application
  - [React](https://react.dev) - Frontend framework
  - [React Router](https://reactrouter.com/en/main) - Client side routing
  - [Socket.IO](https://socket.io) - WebSocket cilent
  - [Tailwind CSS](https://tailwindcss.com) - Utility first CSS framework
  - [shadcn/ui](https://ui.shadcn.com) - Headless component library built on tailwind
  - [Zod](https://zod.dev) - TypeScript schema validation
  - [Axios](https://axios-http.com/) - Http client

## Usage

First download and run the postgres image using `docker compose` inside the working directory.

```bash
$ docker compose up -d
$ docker ps -a
CONTAINER ID   IMAGE                        COMMAND                  CREATED        STATUS                      PORTS                                       NAMES
3e0fb42d3001   postgres                     "docker-entrypoint.s…"   20 hours ago   Up 33 minutes               0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   db
```

Now you can run each of the services locally using `npm run dev` for both. The server will be served on port `3000` and the client will be on `5173` by default.

```bash
# inside of ./server
$ npm run dev

> tic-tac-toe@1.0.0 dev
> tsx src/index.ts


🚀 Server ready at: http://localhost:3000

# inside of ./client
$ npm run dev

  VITE v5.1.4  ready in 472 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```
