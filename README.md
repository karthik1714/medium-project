# 📝 Medium-like Blogging Website

A **full-stack blogging platform** inspired by Medium, built with **React** for the frontend and **Cloudflare Workers** for a serverless backend.

## 📌 Features

### 🚀 Frontend
- Built with **React** and **TypeScript** for type safety and maintainability.
- Uses **JWT-based authentication** for secure user access.
- Implements **state management** for efficient data handling.
- Fully responsive UI for a seamless experience across devices.

### ⚡ Backend
- Powered by **Cloudflare Workers** for a **serverless architecture**.
- Uses **Prisma ORM** with a **PostgreSQL database** for efficient data management.
- Implements **Zod validation** for input validation and type safety.
- Utilizes **Hono** for fast and lightweight API handling.

## 📂 Folder Structure

```
medium-project/
├── backend/    # Cloudflare Workers backend code
├── common/     # Shared logic and utilities (Zod validation)
└── frontend/   # React frontend code
```

## 🛠️ Getting Started

Follow these steps to set up and run the project locally:

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/karthiksriramoju/medium-project.git
cd medium-project
```

### 2️⃣ Install Dependencies
#### Frontend
```bash
cd frontend
npm install
```
#### Backend
```bash
cd ../backend
npm install
```

### 3️⃣ Set Up Environment Variables
Create `.env` files in both the `frontend/` and `backend/` directories based on `.env.example` provided.

### 4️⃣ Start the Development Servers
#### Frontend
```bash
cd frontend
npm run dev
```
#### Backend
```bash
cd ../backend
npm run dev
```

### 5️⃣ Open the Application
Once both servers are running, open your browser and navigate to:
```
http://localhost:3000
```

## 📜 License
This project is licensed under the **MIT License**. Feel free to use and modify it as needed.

## 🤝 Contributing
Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

## 📬 Contact
For any questions or feedback, feel free to reach out:
- **GitHub:** [karthiksriramoju](https://github.com/karthiksriramoju)
- **Email:** karthiksriramoju11@gmail.com
