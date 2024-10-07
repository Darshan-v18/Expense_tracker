import {
  FETCH_BUDGETS_REQUEST,
  FETCH_BUDGETS_SUCCESS,
  FETCH_BUDGETS_FAILURE,
  ADD_BUDGET,
  EDIT_BUDGET,
  DELETE_BUDGET,
} from '../actions/budgetActions';

const initialState = {
  budgets: [],
  loading: false,
  error: null,
};

const budgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BUDGETS_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_BUDGETS_SUCCESS:
      return { ...state, loading: false, budgets: action.payload };
    case FETCH_BUDGETS_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_BUDGET:
      return { ...state, budgets: [...state.budgets, action.payload] };
    case EDIT_BUDGET:
      return {
        ...state,
        budgets: state.budgets.map((budget) =>
          budget.id === action.payload.id ? action.payload : budget
        ),
      };
    case DELETE_BUDGET:
      return {
        ...state,
        budgets: state.budgets.filter((budget) => budget.id !== action.payload),
      };
    default:
      return state;
  }
};

export default budgetReducer;
