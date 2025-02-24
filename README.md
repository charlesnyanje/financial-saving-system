# Financial Saving System

Welcome to the Financial Saving System! This project is designed to help users automate their financial planning and management. It provides a user-friendly interface to manage budgets, track expenses, and visualize financial data using charts.

## Features

- **User Authentication**: Sign up, log in, and reset password functionality.
- **Budget Management**: Set your income, allocate budgets to different categories, and track your spending.
- **Expense Tracking**: Add and manage expenses for each budget category.
- **Visualization**: View pie charts and bar charts to visualize budget allocation and expenses.
- **Responsive Design**: Built with Material-UI for a responsive and modern user interface.

## Technologies Used

- **Frontend**: React, Material-UI, Recharts
- **Backend**: Node.js, Express, MongoDB
- **State Management**: React Hooks (useState, useEffect)
- **Routing**: React Router

## Getting Started

Follow these steps to set up the project on your local machine.

### Prerequisites

- Node.js and npm installed
- MongoDB installed and running

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/financial-saving-system.git
   cd financial-saving-system
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up the backend**

   - Navigate to the backend directory:

     ```bash
     cd backend
     ```

   - Install backend dependencies:

     ```bash
     npm install
     ```

   - Create a `.env` file in the backend directory and add your MongoDB connection string:

     ```env
     MONGO_URI=mongodb://localhost:27017/financial-saving-system
     JWT_SECRET=your_jwt_secret
     ```

   - Start the backend server:

     ```bash
     npm start
     ```

4. **Set up the frontend**

   - Navigate back to the project root directory:

     ```bash
     cd ..
     ```

   - Start the frontend development server:

     ```bash
     npm start
     ```

5. **Access the application**

   Open your browser and go to `http://localhost:3000` to access the application.

## Project Structure

- **`src/`**: Contains the React application code.
  - **`components/`**: Reusable components like Navbar.
  - **`pages/`**: Different pages of the application (Home, BudgetManager, ExpenseDetails, etc.).
- **`backend/`**: Contains the Node.js backend code.
  - **`models/`**: MongoDB models.
  - **`routes/`**: API routes.
  - **`controllers/`**: Logic for handling requests.
  - **`middleware/`**: Middleware for authentication and error handling.

## Usage

1. **Sign Up/Log In**: Create an account or log in if you already have one.
2. **Set Income**: Enter your monthly income on the Budget Manager page.
3. **Allocate Budget**: Allocate a percentage of your income to different categories.
4. **Add Expenses**: Navigate to the Expenses page to add and manage expenses for each category.
5. **View Summary**: Use the "View Expense Summary" button to see visualizations of your budget and expenses.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Material-UI for the UI components.
- Recharts for the charting library.
- MongoDB for the database.

---

Happy budgeting! If you have any questions or run into issues, please feel free to open an issue on GitHub.
