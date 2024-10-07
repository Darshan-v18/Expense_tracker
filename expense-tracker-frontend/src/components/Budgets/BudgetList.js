import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBudgets, deleteBudget } from '../../redux/actions/budgetActions';
import BudgetForm from './BudgetForm';
import './BudgetList.css';
import NavBar from '../Headers/Navbar';

const BudgetList = () => {
  const dispatch = useDispatch();
  const { budgets, loading, error } = useSelector((state) => state.budgets);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [budgetToEdit, setBudgetToEdit] = useState(null);

  useEffect(() => {
    dispatch(fetchBudgets());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteBudget(id));
  };

  const handleEdit = (budget) => {
    setBudgetToEdit(budget);
    setIsFormVisible(true);
  };

  const handleAdd = () => {
    setBudgetToEdit(null);
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
    setBudgetToEdit(null);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="budget-list-container">
      <NavBar />
      <h2>Budget List</h2>
      <button className="add-budget-button" onClick={handleAdd}>Add Budget</button>
      <table className="budget-table">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Amount</th>
            <th>Month</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {budgets.map((budget) => (
            <tr key={budget.id}>
              <td>{budget.categoryName}</td>
              <td>{budget.amount}</td>
              <td>{budget.month}</td>
              <td>
                <button className="edit-button" onClick={() => handleEdit(budget)}>Edit</button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(budget.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isFormVisible && <BudgetForm budgetToEdit={budgetToEdit} onClose={closeForm} />}
    </div>
  );
};

export default BudgetList;
