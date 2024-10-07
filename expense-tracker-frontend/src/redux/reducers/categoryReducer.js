import {
    FETCH_CATEGORIES_REQUEST,
    FETCH_CATEGORIES_SUCCESS,
    FETCH_CATEGORIES_FAILURE,
  } from '../actions/categoryAction';
  
  const initialState = {
    categories: [],
    loading: true,
    error: null,
  };
  
  const categoryReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CATEGORIES_REQUEST:
        return { ...state, loading: true };
      case FETCH_CATEGORIES_SUCCESS:
        return { ...state, categories: action.payload, loading: false };
      case FETCH_CATEGORIES_FAILURE:
        return { ...state, error: action.payload, loading: false };
        case 'ADD_CATEGORY_SUCCESS':
      return {
        ...state,
        categories: [...state.categories, action.payload],
      };
      default:
        return state;
    }
  };
  
  export default categoryReducer;
  