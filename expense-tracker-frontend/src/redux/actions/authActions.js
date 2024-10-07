import axios from 'axios';
import Cookies from 'js-cookie';


export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/login`, credentials);
    console.log(response.data);
    const { token, user } = response.data;
    Cookies.set('authToken', token, { sameSite: 'None', secure: true });
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'LOGIN_FAIL', payload: error.response.data });
  }
};

export const signupUser = (userData) => async (dispatch) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/register`, userData);
    console.log(response.data);
    if (response.status === 200) {
      dispatch({ type: 'SIGNUP_SUCCESS', payload: response.data });
    }
  } catch (error) {
    dispatch({ type: 'SIGNUP_FAIL', payload: error.response.data });
    throw error; 
  }
};
