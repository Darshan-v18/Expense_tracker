const { Budget, Expense, Category } = require('../models');
const { Op } = require('sequelize'); 

const setBudget = async (req, res) => {
  const { categoryId, amount, month } = req.body;
  const userId = req.user.id;

  try {
    const existingBudget = await Budget.findOne({
      where: {
        userId,
        categoryId,
        month, 
      },
    });
    if (existingBudget) {
      return res.status(400).json({ error: 'Budget for this category and month already exists.' });
    }
    const newBudget = await Budget.create({ userId, categoryId, amount, month });
    res.status(201).json(newBudget);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to set budget' });
  }
};


const checkOverspending2 = async (req, res) => {
  const { categoryId, amount, date } = req.body; 
  const userId = req.user.id;

  try {
    
    const budget = await Budget.findOne({ 
      where: { 
        userId, 
        categoryId, 
        month: date.slice(0, 7) 
      }
    });

    if (!budget) {
      return res.status(200).json({ overspending: false });
    }

    const startOfMonth = new Date(date);
    startOfMonth.setDate(1);
    const endOfMonth = new Date(date);
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(1);
    

    const totalExpenses = await Expense.sum('amount', {
      where: {
        userId, 
        categoryId,
        date: {
          [Op.gte]: startOfMonth, 
          [Op.lt]: endOfMonth
        }
      }
    });
// console.log("totalExpenses",totalExpenses)
    const totalSpent = totalExpenses || 0;

    if (totalSpent + amount > budget.amount) {
      return res.status(200).json({ overspending: true });
    }

    return res.status(200).json({ overspending: false });
  } catch (error) {
    console.error(error); 
    return res.status(500).json({ error: error.message });
  }
};


const editBudget = async (req, res) => {
  const { budgetId } = req.params;
  const { amount, categoryId, month } = req.body;
  const userId = req.user.id;
  console.log(budgetId, amount, categoryId, month);

  try {
    const budget = await Budget.findOne({ where: { id: budgetId, userId } });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    budget.amount = amount !== undefined ? amount : budget.amount;
    budget.categoryId = categoryId !== undefined ? categoryId : budget.categoryId;
    budget.month = month !== undefined ? month : budget.month;

    await budget.save();

    res.status(200).json({ message: 'Budget updated successfully', budget });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to update budget' });
  }
};

const deleteBudget = async (req, res) => {
  const { budgetId } = req.params;
  const userId = req.user.id;

  try {
    const budget = await Budget.findOne({ where: { id: budgetId, userId } });

    if (!budget) {
      return res.status(404).json({ error: 'Budget not found' });
    }

    await budget.destroy();

    res.status(200).json({ message: 'Budget deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete budget' });
  }
};

const getAllBudgets = async (req, res) => {
  const userId = req.user.id;
  try {
    const budgets = await Budget.findAll({ where: { userId },
      include: [{ model: Category, as: "category", attributes: ["name"] }], });
      const formattedBudgets = budgets.map(budget => ({
        id: budget.id,
        userId: budget.userId,
        categoryId: budget.categoryId,
        categoryName: budget.category.name,
        amount: budget.amount,
        month: budget.month
        
  
      }));
      res.json(formattedBudgets);;
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch budgets' });
  }
};

module.exports = { setBudget, checkOverspending2,editBudget, deleteBudget, getAllBudgets };
