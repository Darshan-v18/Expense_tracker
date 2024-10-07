import axios from 'axios';
import Cookies from 'js-cookie';

export const FETCH_BUDGETS_REQUEST = 'FETCH_BUDGETS_REQUEST';
export const FETCH_BUDGETS_SUCCESS = 'FETCH_BUDGETS_SUCCESS';
export const FETCH_BUDGETS_FAILURE = 'FETCH_BUDGETS_FAILURE';
export const ADD_BUDGET = 'ADD_BUDGET';
export const EDIT_BUDGET = 'EDIT_BUDGET';
export const DELETE_BUDGET = 'DELETE_BUDGET';

export const fetchBudgets = () => async (dispatch) => {
  const token = Cookies.get('authToken');
  console.log('Token:', token); // Log the token

  dispatch({ type: FETCH_BUDGETS_REQUEST });

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/budgets`, {
      headers: { Authorization: token },
    });
    console.log('Response Data:', response.data); // Log response data
    dispatch({ type: FETCH_BUDGETS_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({ type: FETCH_BUDGETS_FAILURE, payload: error.message });
  }
};

export const addBudget = (budget) => async (dispatch) => {
  const token = Cookies.get('authToken');

  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/budgets`, budget, {
      headers: { Authorization: token },
    });
    dispatch({ type: ADD_BUDGET, payload: response.data });
  } catch (error) {
    console.error('Error adding budget:', error);
    
    if (error.response && error.response.data && error.response.data.error) {
      return error.response.data.error; 
    }
    return 'An unexpected error occurred'; 
  }
};

export const editBudget = (id, updatedBudget) => async (dispatch) => {
  const token = Cookies.get('authToken');

  try {
    const response = await axios.put(`${process.env.REACT_APP_API_BASE_URL}/budgets/${id}`, updatedBudget, {
      headers: { Authorization: token },
    });
    dispatch({ type: EDIT_BUDGET, payload: response.data });
  } catch (error) {
    console.error('Error editing budget:', error);
  }
};

export const deleteBudget = (id) => async (dispatch) => {
  const token = Cookies.get('authToken');

  try {
    await axios.delete(`${process.env.REACT_APP_API_BASE_URL}/budgets/${id}`, {
      headers: { Authorization: token },
    });
    dispatch({ type: DELETE_BUDGET, payload: id });
  } catch (error) {
    console.error('Error deleting budget:', error);
  }
};
