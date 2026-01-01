# InfinityX - Quick Start Guide

## Prerequisites
- Node.js 18+ (verify: `node --version`)
- pnpm (install: `npm install -g pnpm`)
- PostgreSQL 14+ running locally
- VS Code (recommended)

## Installation & Setup (5 minutes)

### 1. Install Dependencies
\`\`\`bash
cd "/Users/rajatsaraswat/Desktop/Comp Science/Web Dev/Projects/InfinityX"
pnpm install
\`\`\`

### 2. Database Setup

**Option A: PostgreSQL Running Locally**
```bash
# Create database
createdb infinityx

# Set environment variable
export DATABASE_URL="postgresql://localhost:5432/infinityx"
```

**Option B: Docker (Recommended)**
```bash
docker run --name infinityx-postgres -e POSTGRES_PASSWORD=password -e POSTGRES_DB=infinityx -p 5432:5432 -d postgres:14
export DATABASE_URL="postgresql://postgres:password@localhost:5432/infinityx"
```

### 3. Initialize Prisma
```bash
cd apps/backend
npx prisma migrate dev --name init
```

This will:
- Create all database tables
- Apply the schema
- Generate Prisma client

### 4. Start Development Servers

**Terminal 1: Backend (Port 3001)**
```bash
cd apps/backend
pnpm dev
```

**Terminal 2: Frontend (Port 5173)**
```bash
cd apps/web
pnpm dev
```

**Terminal 3: Landing (Port 3000)**
```bash
cd apps/landing
pnpm dev
```

## URLs
- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3001
- **Landing Page**: http://localhost:3000
- **Prisma Studio**: Run `pnpm db:studio` in apps/backend

## Test the Flow

### 1. Create Account
- Go to http://localhost:5173
- Click "Sign up"
- Enter: `demo@example.com` / `password123`

### 2. Create Project
- Click "Dashboard"
- Enter project name
- Click "Create"

### 3. Create Workflow
- Click your project
- Enter workflow name
- Click "Create"

### 4. Add Steps
- In workflow editor:
  - Method: `POST`
  - URL: `https://httpbin.org/post`
  - Click "Add Step"
- Click "Save Workflow"

### 5. Trigger Workflow
- Click "Logs" on the workflow
- Execution should complete in seconds

## Project Structure
```
InfinityX/
├── apps/
│   ├── backend/           # Express API (Node.js)
│   ├── web/              # React frontend (Vite)
│   └── landing/          # Next.js marketing site
├── packages/
│   └── shared/           # Shared TypeScript types
├── prisma/
│   └── schema.prisma     # Database schema
├── package.json          # Monorepo root
└── .env.example          # Env template
```

## API Endpoints

### Auth
- `POST /auth/signup` - Create account
- `POST /auth/login` - Login
- `GET /auth/me` - Get current user

### Projects
- `POST /projects` - Create project
- `GET /projects` - List projects
- `GET /projects/:id` - Get project
- `DELETE /projects/:id` - Delete project

### Workflows
- `POST /projects/:projectId/workflows` - Create
- `GET /projects/:projectId/workflows` - List
- `GET /projects/:projectId/workflows/:id` - Get
- `PUT /projects/:projectId/workflows/:id` - Update
- `PUT /projects/:projectId/workflows/:id/steps` - Update steps
- `DELETE /projects/:projectId/workflows/:id` - Delete

### Runs & Webhooks
- `POST /runs/trigger/:workflowId` - Trigger workflow
- `GET /workflows/:id/runs` - List runs
- `GET /runs/:id` - Get run details
- `POST /webhooks/:workflowId` - Webhook trigger (no auth)

## Environment Variables

Create `.env` files in each app:

**apps/backend/.env.local**
```
DATABASE_URL="postgresql://localhost:5432/infinityx"
JWT_SECRET="your-secret-key-here"
PORT=3001
NODE_ENV=development
```

**apps/web/.env.local**
```
VITE_API_URL=http://localhost:3001
```

## Troubleshooting

### "Cannot find module" errors
```bash
pnpm install
```

### Database connection issues
```bash
# Check Postgres is running
psql -U postgres

# Verify DATABASE_URL is set
echo $DATABASE_URL

# Reset database
cd apps/backend && npx prisma migrate reset --force
```

### Port already in use
```bash
# Kill process on port
lsof -ti :3001 | xargs kill -9  # Backend
lsof -ti :5173 | xargs kill -9  # Frontend
lsof -ti :3000 | xargs kill -9  # Landing
```

### Prisma studio error
```bash
cd apps/backend
npx prisma generate
npx prisma db push
pnpm db:studio
```

## Development Tips

### Hot Reload
All three apps support hot reload:
- Backend: Changes to `.ts` files auto-restart
- Frontend: Changes to `.tsx` auto-refresh
- Landing: Changes to `.tsx` auto-refresh

### Database Inspection
```bash
cd apps/backend
pnpm db:studio
```
Opens interactive database UI at http://localhost:5555

### Clean Build
```bash
pnpm clean
pnpm install
```

### Type Checking
```bash
pnpm type-check
```

## Production Deployment

### Build All Apps
```bash
pnpm build
```

Outputs:
- Backend: `apps/backend/dist`
- Frontend: `apps/web/dist`
- Landing: `apps/landing/.next`

### Environment Variables for Production
```
DATABASE_URL=<production-db-url>
JWT_SECRET=<strong-random-secret>
NODE_ENV=production
VITE_API_URL=<api-domain>
```

### Docker Deployment
Each app has a Dockerfile template in `docker/`

## Support & Documentation

- **API Docs**: See ARCHITECTURE.md
- **Database Schema**: prisma/schema.prisma
- **Code Examples**: Check each app's README

## What's Included

### Backend
- ✅ JWT authentication
- ✅ User signup/login
- ✅ Project management
- ✅ Workflow builder
- ✅ Sequential step execution
- ✅ HTTP request handling
- ✅ Execution logging
- ✅ Webhook triggers
- ✅ Error handling
- ✅ TypeScript strict mode

### Frontend
- ✅ Login/Signup pages
- ✅ Project dashboard
- ✅ Workflow editor
- ✅ Execution logs
- ✅ Real-time status
- ✅ Dark theme UI
- ✅ Responsive design
- ✅ Error handling

### Landing
- ✅ Marketing homepage
- ✅ Feature showcase
- ✅ How-it-works section
- ✅ CTA buttons
- ✅ Responsive mobile design

---

**Questions?** Check ARCHITECTURE.md for detailed system design.

Happy automating! 🚀
