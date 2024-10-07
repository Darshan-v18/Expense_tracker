import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBudget, editBudget } from '../../redux/actions/budgetActions';
import './BudgetForm.css';
import { fetchCategories } from '../../redux/actions/categoryAction';
import DatePicker from 'react-datepicker'; // Import DatePicker from the package
import 'react-datepicker/dist/react-datepicker.css';

const BudgetForm = ({ budgetToEdit, onClose }) => {
  const dispatch = useDispatch();
  
  const [categoryId, setCategoryId] = useState('');
  const [amount, setAmount] = useState('');
  const [month, setMonth] = useState('');
  const [error, setError] = useState(null);

  const categories = useSelector((state) => state.categories.categories); 
  console.log(categories);


  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);
  useEffect(() => {
    if (budgetToEdit) {
      setCategoryId(budgetToEdit.categoryId);
      setAmount(budgetToEdit.amount);
      setMonth(budgetToEdit.month);
    }
  }, [budgetToEdit]);

  const handleSubmit = async(e) => {
    e.preventDefault();

    console.log(month);
    const updatedMonth = new Date(month);
    updatedMonth.setMonth(updatedMonth.getMonth() + 1); 
    
    const budgetData = {
      categoryId,
      amount: parseFloat(amount), 
      month: updatedMonth.toISOString().slice(0, 7),
    };
    console.log(budgetData);

    if (budgetToEdit) {
      dispatch(editBudget(budgetToEdit.id, budgetData));
    } else {
        const result = await dispatch(addBudget(budgetData));
        if (typeof result === 'string') {
          setError(result);
          return;
        }
    }

   
    setCategoryId('');
    setAmount('');
    setMonth('');
    onClose(); 
  };

  return (
    <div className="budget-form-container">
      <h2>{budgetToEdit ? 'Edit Budget' : 'Add Budget'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Amount</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="month">Month</label>
          <DatePicker
            selected={month}
            onChange={(date) => setMonth(date)} 
            dateFormat="yyyy-MM" 
            showMonthYearPicker
            className="month-picker-input" 
            required
          />
        </div>
        <button type="submit" className="submit-button">
          {budgetToEdit ? 'Update Budget' : 'Add Budget'}
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <button className="cancel-button" onClick={onClose}>Cancel</button>
    </div>
  );
};

export default BudgetForm;
