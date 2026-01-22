<<<<<<< HEAD
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
=======

# CryptoGuard Portfolio Tracker

A professional full-stack crypto tracker with AI-driven risk analysis.

## Features
- **Real-time Tracking**: Live data from CoinGecko.
- **AI Risk Analysis**: Gemini API integration to detect rug-pulls and scam patterns.
- **P&L Visuals**: Detailed charts using Recharts.
- **Secure Auth**: JWT-based authentication flow.

## Local Setup

### Backend (Java Spring Boot)
1. Ensure PostgreSQL is running on `localhost:5432` with a database named `crypto_tracker`.
2. Update `backend/src/main/resources/application.yml` with your PostgreSQL credentials.
3. Run with Maven:
   ```bash
   cd backend
   mvn spring-boot:run
   ```

### Frontend (React)
1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm start
   ```
3. Visit `http://localhost:3000`.

## API Integration Note
This app uses:
- **CoinGecko API**: No key required for public tier (used for prices/history).
- **Gemini AI**: Used for the "Risk Analysis" feature. Ensure `process.env.API_KEY` is configured.

## Evaluation Ready
This project includes a clean Controller-Service-Repository architecture in the backend and a component-based modular frontend. Suitable for final year academic demos.
>>>>>>> e11695d (Complete crypto portfolio tracker frontend and backend)
