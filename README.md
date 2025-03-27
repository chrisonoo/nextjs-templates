# Next.js App with Drizzle ORM and MariaDB

This is a template project that showcases a Next.js 15 application with a modern tech stack and proper database connection management.

## Technology Stack

- **Next.js 15** - Framework for React applications
- **React 19** - JavaScript UI library
- **Tailwind CSS 4** - Utility-first CSS framework
- **Drizzle ORM** - TypeScript ORM with a focus on type safety
- **MariaDB** - Open source relational database

## Database Connection Management

This project implements best practices for database connection management with Drizzle ORM:

### Connection Pool for Queries

For regular queries, the application uses a connection pool:
```ts
const pool = mysql.createPool({
  host: env.database.server,
  user: env.database.user,
  password: env.database.password,
  database: env.database.name,
});

export const db = drizzle(pool);
```

The connection pool is suitable for:
- API endpoints
- Data fetching in components
- Regular database operations

### Single Connections for Migrations and Administrative Tasks

For migrations, seeding, and administrative operations, we use dedicated connections:
```ts
export const createConnection = async () => {
  const connection = await mysql.createConnection({
    host: env.database.server,
    user: env.database.user,
    password: env.database.password,
    database: env.database.name,
  });
  
  return drizzle(connection);
};
```

Single connections are used for:
- Database migrations
- Schema validation
- Database cleanup operations
- Other administrative tasks

## Getting Started

1. Clone this repository
2. Copy `.env.example` to `.env` and fill in your database credentials
3. Install dependencies:
```bash
npm install
# or
yarn
# or
pnpm install
# or
bun install
```

4. Run database migrations and seed:
```bash
npm run db:migrate
npm run db:seed
```

5. Start the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Commands

- `npm run db:generate` - Generate migrations
- `npm run db:migrate` - Apply migrations
- `npm run db:seed` - Seed the database
- `npm run db:studio` - Open Drizzle Studio
- `npm run db:clean` - Clean all database tables
- `npm run db:test` - Test database connection
- `npm run db:fresh` - Reset database, generate migrations, apply and seed

## API Routes

- `/api/hello` - Simple test endpoint
- `/api/tips` - Fetch all tips from the database