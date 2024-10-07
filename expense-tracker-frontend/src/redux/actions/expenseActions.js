import axios from 'axios';
import Cookies from 'js-cookie';

export const FETCH_EXPENSES_REQUEST = 'FETCH_EXPENSES_REQUEST';
export const FETCH_EXPENSES_SUCCESS = 'FETCH_EXPENSES_SUCCESS';
export const FETCH_EXPENSES_FAILURE = 'FETCH_EXPENSES_FAILURE';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const CHECK_OVERSPENDING_SUCCESS = 'CHECK_OVERSPENDING_SUCCESS';
export const CHECK_OVERSPENDING_FAILURE = 'CHECK_OVERSPENDING_FAILURE';

export const fetchExpenses = () => async (dispatch) => {
  dispatch({ type: FETCH_EXPENSES_REQUEST });
  const token = Cookies.get('authToken');

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/expenses`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data);
    dispatch({ type: FETCH_EXPENSES_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_EXPENSES_FAILURE, payload: error.message });
  }
};
export const addExpense = (expense) => async (dispatch) => {
  const token = Cookies.get('authToken');
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/expenses/`, expense,{
        headers: {
            Authorization: token,
        },
    });
    dispatch({ type: ADD_EXPENSE, payload: response.data });
  } catch (error) {
    console.error('Error adding expense:', error);
  }
};


export const editExpense = (id, updatedExpense) => async (dispatch) => {
  const token = Cookies.get('authToken');
  try {
    const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/expenses/${id}`, updatedExpense,{
        headers: {
            Authorization: token,
        },
    });
    dispatch({ type: EDIT_EXPENSE, payload: response.data });
  } catch (error) {
    console.error('Error editing expense:', error);
  }
};


export const deleteExpense = (id) => async (dispatch) => {
    const token = Cookies.get('authToken');
  try {
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/expenses/${id}`,{
      headers: {
        Authorization: token,
      },
    });
    dispatch({ type: DELETE_EXPENSE, payload: id });
  } catch (error) {
    console.error('Error deleting expense:', error);
  }
};

export const checkOverspending = (expenseData) => async (dispatch) => {
  console.log(expenseData);
  const token = Cookies.get('authToken');
  console.log(token);
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/budgets/overspending2`, expenseData,{
        headers: {
          Authorization: token,
        },
    });
    console.log(response.data);
    dispatch({ type: CHECK_OVERSPENDING_SUCCESS, payload: response.data });
    return response.data.overspending;
  } catch (error) {
   dispatch({ type: CHECK_OVERSPENDING_FAILURE, payload: error.message });
  }
};
