import axios from 'axios';
import Cookies from 'js-cookie';


export const FETCH_CATEGORIES_REQUEST = 'FETCH_CATEGORIES_REQUEST';
export const FETCH_CATEGORIES_SUCCESS = 'FETCH_CATEGORIES_SUCCESS';
export const FETCH_CATEGORIES_FAILURE = 'FETCH_CATEGORIES_FAILURE';

export const fetchCategories = () => async (dispatch) => {
  dispatch({ type: FETCH_CATEGORIES_REQUEST });
  const token = Cookies.get('authToken'); 

  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/categories`, {
      headers: {
        Authorization: token, 
      },
    });
  
    dispatch({ type: FETCH_CATEGORIES_SUCCESS, payload: response.data }); 
  } catch (error) {
    dispatch({ type: FETCH_CATEGORIES_FAILURE, payload: error.message }); 
  }
};

export const addCategory = (category) => async (dispatch) => {
  const token = Cookies.get('authToken');
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/categories`, category,{
      headers: {
        Authorization: token,
      },
    });
    dispatch({
      type: 'ADD_CATEGORY_SUCCESS',
      payload: response.data,
    });
  } catch (error) {
    console.error('Error adding category:', error);
  }
};