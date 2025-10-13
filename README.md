# Smart Notes

A full-stack note-taking application powered by AI and built with a modern monorepo architecture using Turborepo.

## Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router and Turbopack
- **[React 19](https://react.dev/)** - UI library
- **TypeScript** - Type-safe development

### Backend
- **[NestJS 11](https://nestjs.com/)** - Progressive Node.js framework
- **[Prisma](https://www.prisma.io/)** - Next-generation ORM
- **[PostgreSQL 18](https://www.postgresql.org/)** - Database
- **TypeScript** - Type-safe development

### Infrastructure
- **[Turborepo](https://turborepo.com/)** - Monorepo build system
- **[Docker](https://www.docker.com/)** - Containerization
- **[pnpm](https://pnpm.io/)** - Fast, disk space efficient package manager

## Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** >= 18
- **pnpm** 9.0.0 (will be automatically used via `packageManager` field)
- **Docker** and Docker Compose

## Getting Started

Follow these steps to run the project locally:

### 1. Install Dependencies

```bash
pnpm install
```

### 2 Environment Variables

Copy .env.example into .env in packages/db

### 3. Start the Database

Run PostgreSQL in a Docker container:

```bash
pnpm docker:dev
```

This will start a PostgreSQL 18 container with the following configuration:
- **Host**: localhost
- **Port**: 5432
- **Database**: smart-notes-db
- **User**: postgres
- **Password**: postgres

### 4. Generate Prisma Client

Generate the Prisma client from the schema:

```bash
pnpm generate
```

This command runs the Prisma generator to create the type-safe database client.

### 5. Start Development Servers

Start both the API and web applications:

```bash
pnpm dev
```

This will start:
- **Web App**: http://localhost:3000
- **API**: http://localhost:3001

## Project Structure

This monorepo includes the following packages and apps:

### Apps

- **`apps/web`** - Next.js frontend application
- **`apps/api`** - NestJS backend API

### Packages

- **`@smart-notes/ui`** - Shared React component library
- **`@smart-notes/db`** - Prisma database schema and client
- **`@smart-notes/eslint-config`** - Shared ESLint configurations
- **`@smart-notes/typescript-config`** - Shared TypeScript configurations

## Available Scripts

### Root Level

- `pnpm dev` - Start all apps in development mode
- `pnpm build` - Build all apps and packages
- `pnpm lint` - Lint all apps and packages
- `pnpm format` - Format all files with Prettier
- `pnpm generate` - Generate Prisma client
- `pnpm docker:dev` - Start PostgreSQL database in Docker
- `pnpm check-types` - Type check all packages

### API (apps/api)

```bash
cd apps/api
```

- `pnpm dev` - Start API in watch mode
- `pnpm build` - Build the API
- `pnpm start:prod` - Start production build
- `pnpm test` - Run unit tests
- `pnpm test:e2e` - Run end-to-end tests

### Web (apps/web)

```bash
cd apps/web
```

- `pnpm dev` - Start Next.js dev server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Lint the application

### Database (packages/db)

```bash
cd packages/db
```

- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Create and apply migrations
- `pnpm prisma:reset` - Reset database
- `pnpm prisma:studio` - Open Prisma Studio GUI

## Development Workflow

### Running Specific Apps

You can run individual apps using Turborepo filters:

```bash
# Run only the web app
pnpm dev --filter=web

# Run only the API
pnpm dev --filter=api
```

### Database Management

To view and manage your database with Prisma Studio:

```bash
pnpm --filter @smart-notes/db prisma:studio
```


## Useful Links

### Turborepo
- [Tasks](https://turborepo.com/docs/crafting-your-repository/running-tasks)
- [Caching](https://turborepo.com/docs/crafting-your-repository/caching)
- [Filtering](https://turborepo.com/docs/crafting-your-repository/running-tasks#using-filters)

### Tech Stack Documentation
- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com)
- [Prisma Documentation](https://www.prisma.io/docs)
