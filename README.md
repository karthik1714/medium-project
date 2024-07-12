Medium-like Blogging Website
 <!-- If you have a logo, replace ./path/to/your/logo.png with the actual path -->

This project is a Medium-like blogging website implemented using React in the frontend and Cloudflare Workers in the backend.

Features
Frontend
Built with React
Uses TypeScript for type safety
Integrated with Cloudflare Workers for serverless backend operations
Implements JWT-based authentication for secure user interactions
Backend
Powered by Cloudflare Workers
Uses Prisma for ORM with PostgreSQL database
Includes Zod for validation and type inference
Utilizes Hono for serverless backend architecture
Folder Structure
bash
Copy code
.
├── backend/           # Cloudflare Workers backend code
├── common/            # Shared logic and utilities (Zod validation)
└── frontend/          # React frontend code
Getting Started
To get a local copy up and running follow these steps:

Clone the repository:

bash
Copy code
git clone https://github.com/your-username/medium-project.git
cd medium-project
Install dependencies:

bash
Copy code
# For frontend
cd frontend
npm install

# For backend (Cloudflare Workers)
cd ../backend
npm install
Set up environment variables:

Create .env files in both frontend/ and backend/ directories based on .env.example provided.
Start the development servers:

bash
Copy code
# For frontend (React)
cd frontend
npm start

# For backend (Cloudflare Workers)
cd ../backend
npm start
Open your browser and navigate to http://localhost:3000 to see the app running.

