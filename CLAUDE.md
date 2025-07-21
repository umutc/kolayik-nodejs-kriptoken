# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a cryptocurrency trading platform called **Kriptoken** - a full-stack TypeScript application with:
- **Backend**: Express.js API with TypeORM and MongoDB
- **Frontend**: Angular 8 with Ionic 5 (built and served from `/api/www/`)
- **Deployment**: Configured for Heroku with PM2 process management

## Common Development Commands

### Initial Setup
```bash
# Install all dependencies (root, api, and client)
npm run install-dependencies
```

### Development Mode
```bash
# Start API development server (from root or api/)
cd api && npm start
# JWT_SECRET=kolayik is automatically set

# Start client development server with proxy (from client/)
cd client && npm start
```

### Building the Application
```bash
# Build both API and client (from root)
npm run build

# Build API only (TypeScript compilation)
cd api && npm run build

# Build client and output to API's www folder
cd client && npm run build:dev
```

### Production Commands
```bash
# Start production server (from root)
npm start

# Or with PM2 (from api/)
cd api && npm run start:production:pm2

# Stop PM2 process
cd api && npm run stop:production
```

### Version Management
```bash
# Create a new release
npm run release
```

## Architecture Overview

### API Structure (`/api/src/`)
- **Entry Point**: `index.ts` - Express setup, middleware, and database initialization
- **Routing**: `routes.ts` - All API endpoints (public and private)
- **Authentication**: JWT-based with middleware in `middleware/authentication.ts`
- **Database**: TypeORM with MongoDB, entities in `entities/`
- **Business Logic**: Controllers in `controllers/` handle all request processing
- **Path Aliases**: Use absolute imports (e.g., `import from 'utils/validation'`)

### Key API Features
1. **Fixed Exchange Rates** (defined in `constants/currency.ts`):
   - 1 BTC = 1 (base currency)
   - 1 ETH = 0.04791411 BTC
   - 1 LTC = 0.00592855 BTC
   - 1 DASH = 0.06756612 BTC
   - 1 XRP = 0.00002001 BTC

2. **Trading Commission**: 0.25% per transaction

3. **New User Bonus**: 10,000 XRP on registration

### API Endpoints

**Public Endpoints:**
- `POST /api/v1/users/register` - User registration
- `POST /api/v1/authentication/login` - User login
- `POST /api/v1/authentication/logout` - User logout
- `GET /api/v1/currencies/list` - List all currencies
- `GET /api/v1/users` - List all users (testing)
- `GET /api/v1/users/:email` - Get user by email

**Private Endpoints (Require JWT):**
- `GET /api/v1/users/current/user` - Get current user info
- `GET /api/v1/users/current/user/currencies/list` - User's currency holdings
- `GET /api/v1/users/current/user/transection/list` - Transaction history
- `POST /api/v1/users/current/user/currencies/buy` - Buy currency
- `POST /api/v1/users/current/user/currencies/sell` - Sell currency

### Client Structure (`/client/src/app/`)
- **Module-based Architecture**: Feature modules in `modules/`
- **Path Aliases**: `@app/*` for app directory, `@env/*` for environments
- **Proxy Configuration**: Development requests proxied to `http://localhost:5000/api`

### Database Entities
- `User` - User accounts with authentication
- `Currency` - Available cryptocurrencies
- `UserCurrency` - User's currency holdings
- `UserToken` - JWT tokens for authentication
- `UserTransection` - Transaction history
- `UserWallet` - User wallet information

## Development Notes

### TypeScript Configuration
- **API**: Strict mode enabled, path aliases configured for clean imports
- **Client**: Angular compiler with full template type checking

### Environment Variables
- `JWT_SECRET`: Required for API authentication (default: "kolayik" in dev)
- `NODE_ENV`: Environment mode
- `DB_DATABASE`: Database name override

### Testing
- Test infrastructure exists but no tests implemented
- API test command: `cd api && npm test`
- Client test command: `cd client && npm test`

### Code Quality
- ESLint and Prettier configured for API
- TSLint configured for client
- Pre-commit hooks via Husky

### API Documentation
- [Postman Collection](https://documenter.getpostman.com/view/2342585/SzKQxzmo?version=latest)

### Deployment
- Heroku configuration in root `Procfile`
- Node.js version: 12.x (specified in engines)
- Production URL: https://kolayik-umut-celik.herokuapp.com/