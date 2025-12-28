🛠 Prerequisites

Make sure you have installed:

Docker

Docker Compose

🚀 Local Development (Hot Reload)

This will run frontend and backend with live reload.

Clone the repository:

git clone <your-repo-url>
cd project-root


Run Docker Compose for development:

docker-compose -f docker-compose.dev.yml up --build


Access your services:

Frontend (Vite dev server): http://localhost:5173

Backend (Node API): http://localhost:5000

Stop development environment:

docker-compose -f docker-compose.dev.yml down


✅ Notes:

Frontend edits reflect instantly due to Vite hot reload.

Backend edits reflect instantly due to ts-node-dev.

🏗 Production Build

This will build optimized images for production and serve frontend via Nginx.

Build and start production containers:

docker-compose up --build -d


Access your services:

Frontend (Nginx): http://localhost

Backend (Node API): http://localhost:5000

Stop production environment:

docker-compose down


✅ Notes:

Frontend is served as static files via Nginx.

Backend runs compiled JavaScript (dist/) in production mode.

No hot reload in production.

⚡ Useful Commands
Command	                                             ( Purpose)
docker-compose -f docker-compose.dev.yml up --build	 ( Start development environment)
docker-compose -f docker-compose.dev.yml down	(Stop development environment)
docker-compose up --build -d	(Start production containers in detached mode)
docker-compose down	 (Stop production containers)