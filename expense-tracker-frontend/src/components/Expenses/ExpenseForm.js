import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, editExpense, checkOverspending } from '../../redux/actions/expenseActions'; 
import { fetchCategories } from '../../redux/actions/categoryAction';
import './ExpenseForm.css'; 

const ExpenseForm = ({ initialData = {} }) => { 
  const [description, setDescription] = useState(initialData.description || '');
  const [amount, setAmount] = useState(initialData.amount || '');
  const [category, setCategory] = useState(initialData.category || '');
  const [receipt, setReceipt] = useState(initialData.receipt || '');
  // const currentDate = new Date().toISOString().slice(0, 10);
  const [date,setDate] = useState(initialData.date || '');

  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const loading = useSelector((state) => state.categories.loading);
  const error = useSelector((state) => state.categories.error);
    
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (initialData) {
      setDescription(initialData.description || '');
      setAmount(initialData.amount || '');
      setCategory(initialData.category || '');
      setReceipt(initialData.receipt || '');
    }
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const categoryId = category;
    const expenseData = { amount, categoryId, date };

    
    const isOverSpending = await dispatch(checkOverspending(expenseData));
    console.log(isOverSpending);
   
    if (isOverSpending) {
      const confirmAdd = window.confirm(
        'You are overspending your budget. Do you still want to add this expense?'
      );
      if (!confirmAdd) {
        return; 
      }
    }

    // Add or edit the expense after confirmation
    if (initialData.id) {
      dispatch(editExpense(initialData.id, { description, amount, categoryId, receipt,date }));
    } else {
      dispatch(addExpense({ description, amount, categoryId, receipt,date }));
    }

    // Reset form after submission
    setDescription('');
    setAmount('');
    setCategory('');
    setReceipt('');
    setDate('');
  };

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>Error fetching categories: {error}</p>;

  return (
    <div className="expense-form-container">
      <h2>{initialData.id ? 'Edit Expense' : 'Add New Expense'}</h2>
      <form className="expense-form" onSubmit={handleSubmit}>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Amount"
          required
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <input
          type="text"
          value={receipt}
          onChange={(e) => setReceipt(e.target.value)}
          placeholder="Receipt URL"
        />
          <div>
        <label>Date:</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}  // Set the date
          required
        />
      </div>
        <button type="submit" className="expense-button">
          {initialData.id ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
