import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchExpenses,
  deleteExpense,
} from "../../redux/actions/expenseActions";
import ExpenseForm from "./ExpenseForm";
import "./ExpenseList.css";
import NavBar from "../Headers/Navbar";

const ExpenseList = () => {
  const dispatch = useDispatch();
  const { expenses } = useSelector((state) => state.expenses);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null); 

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      dispatch(deleteExpense(id));
    }
  };

  const handleEdit = (expense) => {
    setCurrentExpense(expense);
    setIsFormVisible(true);
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) {
      setCurrentExpense(null);
    }
  };

  return (
    <div className="expense-list-container">
      <NavBar />
      <h2>Expense List</h2>
      <button className="add-expense-button" onClick={toggleFormVisibility}>
        {isFormVisible ? "Cancel" : "Add Expense"}
      </button>
      {isFormVisible && <ExpenseForm initialData={currentExpense || {}} />}

      <table className="expense-table">
        <thead>
          <tr>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
              <td>{expense.categoryName}</td>
              <td>${expense.amount}</td>
              <td>
                {new Date(expense.date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>

              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEdit(expense)}
                >
                  Edit
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExpenseList;
