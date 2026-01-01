# Infinity X

Developer-first workflow automation platform. Build workflows like you write code. Run them like infrastructure.

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm 8+
- PostgreSQL 14+

### Setup

```bash
git clone <repo>
cd InfinityX
pnpm install

# Setup database (Docker)
docker run --name infinity-x-db \
  -e POSTGRES_USER=user \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=infinity_x_dev \
  -p 5432:5432 -d postgres:16

# Configure
cp .env.example .env

# Migrate
pnpm db:migrate

# Run
pnpm dev
```

**Access:**
- Landing: http://localhost:3000
- App: http://localhost:5173
- API: http://localhost:3001

## See Also
- [SETUP.md](./SETUP.md) - Detailed setup
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System design

## Features
✅ User authentication  
✅ Project management  
✅ Workflow builder  
✅ HTTP step execution  
✅ Execution logs  
✅ Webhook triggers  
✅ Dark modern UI

## Tech Stack
- Backend: Node.js + Express + TypeScript + Prisma
- Frontend: React + Vite + Tailwind
- Landing: Next.js + Tailwind
- Database: PostgreSQL

## License
MIT
