const { Category } = require('../models');


const createCategory = async (req, res) => {
  const { name } = req.body;

  try {
    const category = await Category.create({name});
    res.status(201).json(category);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Failed to create category' });
  }
};


const getCategories = async (req, res) => {
  // const userId = req.user.id;
  try {
    const categories = await Category.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
};


module.exports={createCategory,getCategories}