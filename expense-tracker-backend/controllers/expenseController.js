const { Expense, User,Category } = require("../models");

// Create Expense
const createExpense = async (req, res) => {
  const { description, amount, categoryId, receipt,date } = req.body;
  const userId = req.user.id;

  try {
    const expense = await Expense.create({
      description,
      amount,
      categoryId,
      receipt,
      userId,
      date,
    });

    res.status(201).json(expense);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Expenses
const getExpenses = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.findAll({
      where: { userId },
      include: [{ model: Category, as: "category", attributes: ["name"] }],
    });
    const formattedExpenses = expenses.map(expense => ({
      id: expense.id,
      description: expense.description,
      amount: expense.amount,
      categoryId: expense.categoryId,
      receipt: expense.receipt,
      categoryName: expense.category.name, 
      userId: expense.userId,
      date: expense.date

    }));
    res.json(formattedExpenses);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update Expense
const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { description, amount, categoryId, receipt,date } = req.body;
  const userId = req.user.id;

  try {
    const expense = await Expense.findOne({ where: { id, userId } });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.description = description;
    expense.amount = amount;
    expense.categoryId = categoryId;
    expense.date = date;
    expense.receipt = receipt;
    await expense.save();

    res.json(expense);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Expense
const deleteExpense = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;

  try {
    const expense = await Expense.findOne({ where: { id, userId } });

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.destroy();
    res.json({ message: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { createExpense, getExpenses, updateExpense, deleteExpense };
