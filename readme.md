# 🛠️ Habitake Admin Panel

![Build](https://img.shields.io/badge/build-passing-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

This is the admin panel for the Habitake platform.

---

## 🚀 Getting Started

Follow the steps below to set up and run the project locally.

### 1. Install Dependencies

```bash
yarn
```

### 2. Start the Development Server

```bash
yarn start
```

> App runs on `http://localhost:3000` by default.

---

## ⚙️ Environment Setup

Create a `.env` file in the root directory with the following format:

```env
VITE_API_BASE_URL=https://your-api-url.com
VITE_APP_VERSION=v2.1.0
```

---

## 📦 Tech Stack

- **Framework**: React + Vite

### ➤ Netlify

- Link your GitHub repo
- Set build command: `yarn build`
- Set publish directory: `dist/`

### ➤ Manual Build

```bash
yarn build
```

The output will be in the `dist/` folder.

---
## Deploy on Vercel

The easiest way to deploy your React.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
