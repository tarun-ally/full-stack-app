#!/bin/bash

echo "🚀 Setting up Full-Stack Application..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f "./backend/.env" ]; then
    echo "📝 Creating backend .env file..."
    cp ./backend/.env.example ./backend/.env
    echo "✅ Created backend/.env from example"
    echo "⚠️  IMPORTANT: Edit backend/.env with your FREE service credentials!"
    echo "   See FREE-SETUP.md for instructions"
fi

# Build and start development environment
echo "🔨 Building and starting development environment..."
docker-compose -f docker-compose.dev.yml up --build -d

echo "✅ Development environment is ready!"
echo ""
echo "🌐 Access your services:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo "   Redis:    localhost:6379"
echo ""
echo "📧 To send REAL notifications:"
echo "   1. Edit backend/.env with your credentials"
echo "   2. See FREE-SETUP.md for free service setup"
echo ""
echo "📝 To stop: docker-compose -f docker-compose.dev.yml down"