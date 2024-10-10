const { Expense, Budget, Category } = require('../models');
const { Op, Sequelize } = require('sequelize');


exports.getDashboardOverview = async (req, res) => {
  const userId = req.user.id;
  const { month } = req.query; 

  try {
   
    const startDate = new Date(`${month}-01T00:00:00Z`); 
    const endDate = new Date(new Date(startDate).setMonth(startDate.getMonth() + 1)); 


    const totalExpenses = await Expense.sum('amount', {
      where: {
        userId,
        date: {
          [Op.between]: [startDate, endDate],  
        },
      },
    });

    // Get budget vs spending data
    const budgets = await Budget.findAll({
      where: { userId, month },
      include: {
        model: Category,
        as: 'category',
        attributes: ['name'], 
      },
    });

    const budgetVsSpending = await Promise.all(budgets.map(async (budget) => {
      const spent = await Expense.sum('amount', {
        where: {
          userId,
          categoryId: budget.categoryId,
          date: {
            [Op.gte]: startDate, 
            [Op.lt]: endDate,   
          },
        },
      });
      return {
        categoryId: budget.categoryId,
        categoryName: budget.category ? budget.category.name : 'Unknown',
        budget: budget.amount,
        spent: spent || 0,
        remaining: budget.amount - (spent || 0),
      };
    }));

    const spendingTrends = await Expense.findAll({
      attributes: [
        [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('date')), 'month'],
        [Sequelize.fn('SUM', Sequelize.col('amount')), 'total_spent'],
      ],
      where: { userId },
      group: [Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('date'))],
      order: [[Sequelize.fn('DATE_TRUNC', 'month', Sequelize.col('date')), 'ASC']],
    });


    const formattedSpendingTrends = spendingTrends.map(trend => ({
      month: trend.dataValues.month.toISOString().slice(0, 7), 
      total_spent: parseFloat(trend.dataValues.total_spent),
    }));

    
    res.status(200).json({
      totalExpenses,
      budgetVsSpending,
      spendingTrends: formattedSpendingTrends, 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to fetch dashboard data' });
  }
};
