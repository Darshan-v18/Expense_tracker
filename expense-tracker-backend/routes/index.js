const express = require('express');
const { register, login, requestPasswordReset, verifyOTP, resetPassword } = require('../controllers/authController');
const { createExpense, getExpenses, updateExpense, deleteExpense } = require('../controllers/expenseController');
const { createCategory, getCategories } = require('../controllers/categoryController');
const { setBudget,checkOverspending2, editBudget, deleteBudget, getAllBudgets } = require('../controllers/budgetController');
const {getDashboardOverview} = require('../controllers/dashboardController');
const {predictedExpense} = require('../controllers/predictionController');

const auth = require('../middleware/auth');
const router = express.Router();

// Auth Routes  
router.post('/register', register);
router.post('/login', login);
router.post('/password-reset', requestPasswordReset); 
router.post('/verify-otp', verifyOTP); 
router.post('/reset-password', resetPassword);

// Expense Routes
router.post('/expenses', auth, createExpense);
router.get('/expenses', auth, getExpenses);
router.put('/expenses/:id', auth, updateExpense);
router.delete('/expenses/:id', auth, deleteExpense);

//Category Routes
router.post('/categories', auth, createCategory);
router.get('/categories', auth, getCategories);


// Budget Routes
router.post('/budgets', auth, setBudget);
router.get('/budgets', auth, getAllBudgets);
router.post('/budgets/overspending2', auth, checkOverspending2);
router.put('/budgets/:budgetId', auth, editBudget);
router.delete('/budgets/:budgetId', auth, deleteBudget);

//Dashboard route
router.get('/dashboard', auth, getDashboardOverview);

//Prediction route
router.get('/predict-expense', auth, predictedExpense);

module.exports = router;
