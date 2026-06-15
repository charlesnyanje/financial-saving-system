# Financial Saving System

Automate your financial planning and management. Track budgets, expenses, and visualize your finances with interactive charts.

## Features

- **User Authentication** — Sign up, log in, and reset password
- **Budget Management** — Set income, allocate budgets to categories, track spending
- **Expense Tracking** — Add expenses per category with deadlines and amounts
- **Visualization** — Pie charts (budget allocation) and bar charts (expenses per category) via Recharts
- **Responsive UI** — Material-UI design

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 19, React Router 7, Material-UI 6, Recharts |
| Backend  | Node.js, Express |
| Database | MongoDB with Mongoose |
| Auth     | bcryptjs, JSON Web Token |

## Prerequisites

- **Node.js** >= 18 and **npm**
- **MongoDB** — running locally on the default port (27017)

  ```bash
  # Verify MongoDB is running
  mongosh --eval "db.version()"
  ```

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/charlesnyanje/financial-saving-system.git
cd financial-saving-system
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Configure environment variables

Create `backend/.env`:

```env
MONGO_URI=mongodb://localhost:27017/financial-saving-system
JWT_SECRET=your_jwt_secret_change_this_in_production
```

### 4. Start the backend server

```bash
npm start
```

The API server starts on **http://localhost:5000**.

### 5. Install frontend dependencies (in a new terminal)

```bash
# From the project root
npm install
```

### 6. Start the frontend dev server

```bash
npm start
```

The app opens on **http://localhost:3000**.

---

Both servers must run simultaneously. The frontend (port 3000) makes API calls to the backend (port 5000).

## Project Structure

```
financial-saving-system/
├── backend/
│   ├── Server.js          # Express server with all routes
│   ├── package.json
│   └── .env               # Environment variables
├── src/
│   ├── App.js             # React Router setup
│   ├── Home.js            # Landing page
│   ├── Login.js           # Login form
│   ├── SignUp.js          # Registration form
│   ├── ForgotPassword.js  # Password reset
│   ├── BudgetManager.js   # Budget allocation & charts
│   ├── Expenses.js        # Expenses overview
│   ├── ExpenseDetails.js  # Per-category expense CRUD
│   └── Navbar.js          # Navigation bar
├── package.json
└── README.md
```

## API Endpoints

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| POST   | `/signup`          | Register a user      |
| POST   | `/login`           | Log in & get JWT     |
| POST   | `/reset-password`  | Reset password       |
| POST   | `/api/logout`      | Log out              |

## Usage

1. **Sign Up / Log In** from the home page
2. **Set your income** on the Budget Manager page
3. **Allocate budget percentages** to categories (Entertainment, Savings, Shopping, Appliances, or custom)
4. **Add expenses** under each category with type, percentage, and deadline
5. **View charts** by clicking "View Expense Summary"

## License

MIT
