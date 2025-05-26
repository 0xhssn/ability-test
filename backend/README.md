# NestJS Reverse Proxy

A NestJS-based reverse proxy application that forwards requests to external APIs, logs the requests in MongoDB, and provides a dashboard for monitoring and managing the proxy.

## Features

- Proxies requests to JSONPlaceholder API
- Logs all proxied requests in MongoDB
- Secure dashboard with authentication
- Rule-based proxy configuration
- Filtering and searching of logs
- Toggling proxy rules via UI

## Prerequisites

- Node.js (v14 or later)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory based on the provided `.env.example`

## Configuration

The application can be configured through environment variables in the `.env` file:

- `PORT`: The port on which the server will run (default: 3000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRATION`: JWT token expiration time
- `PROXY_TARGET_URL`: Target URL for the proxy (default: https://jsonplaceholder.typicode.com)
- `CORS_ORIGIN`: Allowed CORS origin

## Running the Application

### Development Mode

```bash
npm run start:dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

## API Endpoints

### Authentication

- `POST /auth/login`: Login with username and password
- `POST /auth/register`: Register a new user
- `GET /auth/profile`: Get current user profile (requires authentication)

### Proxy Rules

- `GET /api/proxy-rules`: Get all proxy rules
- `GET /api/proxy-rules/:id`: Get a specific proxy rule
- `POST /api/proxy-rules`: Create a new proxy rule
- `PUT /api/proxy-rules/:id`: Update a proxy rule
- `DELETE /api/proxy-rules/:id`: Delete a proxy rule
- `PATCH /api/proxy-rules/:id/toggle`: Toggle rule status
- `PATCH /api/proxy-rules/:id/toggle-logging`: Toggle logging for a rule

### Proxy Logs

- `GET /api/proxy-logs`: Get all proxy logs (with pagination and filtering)
- `DELETE /api/proxy-logs`: Clear all logs

### Users API

- `GET /api/users`: Get all users from JSONPlaceholder
- `GET /api/users/:id`: Get a specific user from JSONPlaceholder

### Proxy Endpoint

- `ANY /proxy/*`: All requests to this path will be proxied to the target URL

## Default Admin User

When the application starts for the first time, a default admin user is created:

- Username: `admin`
- Password: `admin123`
