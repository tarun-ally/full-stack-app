🛠 Prerequisites

Make sure you have installed:
- Docker
- Docker Compose

🚀 Quick Start

```bash
# Clone and setup
git clone <your-repo-url>
cd full-stack-app

# Start development environment
./setup-dev.sh
```

Access your services:
- Frontend: http://localhost:5173
- Backend API: http://localhost:5000
- Redis: localhost:6379

## 🎯 What This System Does

This is a **distributed event processing system** that handles multi-channel notifications:

- **Event Types**: USER_SIGNUP, ORDER_CREATED, PASSWORD_RESET
- **Notification Channels**: EMAIL, SMS, PUSH
- **Features**: Queue processing, retry logic, dead letter queue, idempotency

## 🏗 Architecture

- **Frontend**: React + TypeScript + Vite
- **Backend**: Node.js + Express + TypeScript
- **Queue**: BullMQ + Redis
- **Workers**: Background job processing
- **Containerization**: Docker + Docker Compose

## 📝 API Endpoints

```
POST /api/events     - Create new event
GET  /api/events     - List all events
GET  /api/events/:id - Get specific event
GET  /api/health     - Health check
```

## 🔧 Development Commands

```bash
# Development
docker-compose -f docker-compose.dev.yml up --build

# Production
docker-compose up --build -d

# Stop services
docker-compose -f docker-compose.dev.yml down
```

## 🧪 Testing the System

1. Open frontend at http://localhost:5173
2. Click "Create Test Events" buttons
3. Watch console logs for processing
4. See events update in real-time

## 📊 Monitoring

- Check Docker logs: `docker-compose logs -f`
- Redis CLI: `docker exec -it <redis-container> redis-cli`
- Worker logs show processing status and failures