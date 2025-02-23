const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(
  cors({
    origin: "http://localhost:3000", // Replace with frontend URL
    credentials: true, // Allow credentials (tokens/cookies)
  })
);


// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// User Schema
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const User = mongoose.model("User", UserSchema);

// Category Schema
const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
});
const Category = mongoose.model("Category", CategorySchema);

// Expense Schema
const ExpenseSchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  deadline: { type: Date, required: true },
  paid: { type: Boolean, default: false },
});
const Expense = mongoose.model("Expense", ExpenseSchema);

// ========================== AUTH ROUTES ========================== //

// Register User
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login User
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
    
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user: { id: user._id, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: "Error logging in" });
  }
});

// Reset Password
app.post("/reset-password", async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error resetting password" });
  }
});

// Logout Route
app.post("/api/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

// ========================== CATEGORY ROUTES ========================== //

/* // Create Category
app.post("/categories", async (req, res) => {
  try {
    const { name } = req.body;
    const newCategory = new Category({ name });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (err) {
    res.status(500).json({ error: "Error creating category" });
  }
});

// Get Categories
app.get("/categories", async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Error fetching categories" });
  }
});

// ========================== EXPENSE ROUTES ========================== //

// Create Expense
app.post("/expenses", async (req, res) => {
  try {
    const { category, type, amount, deadline, paid } = req.body;
    const newExpense = new Expense({ category, type, amount, deadline, paid });
    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (err) {
    res.status(500).json({ error: "Error creating expense" });
  }
});

// Get Expenses
app.get("/expenses", async (req, res) => {
  try {
    const expenses = await Expense.find().populate("category");
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: "Error fetching expenses" });
  }
});
 */
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
