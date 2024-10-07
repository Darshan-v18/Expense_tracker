import {
  FETCH_EXPENSES_REQUEST,
  FETCH_EXPENSES_SUCCESS,
  FETCH_EXPENSES_FAILURE,
  ADD_EXPENSE,
  EDIT_EXPENSE,
  DELETE_EXPENSE,
  CHECK_OVERSPENDING_SUCCESS,
  CHECK_OVERSPENDING_FAILURE,
} from "../actions/expenseActions";

const initialState = {
  expenses: [],
  loading: false,
  error: null,
};

const expenseReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_EXPENSES_REQUEST:
      return { ...state, loading: true };
    case FETCH_EXPENSES_SUCCESS:
      return { ...state, loading: false, expenses: action.payload };
    case FETCH_EXPENSES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_EXPENSE:
      return { ...state, expenses: [...state.expenses, action.payload] };
    case EDIT_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.map((expense) =>
          expense.id === action.payload.id ? action.payload : expense
        ),
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter(
          (expense) => expense.id !== action.payload
        ),
      };
    case CHECK_OVERSPENDING_SUCCESS:
      return {
        ...state,
        overspending: action.payload,
        loading: false,
      };
    case CHECK_OVERSPENDING_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default expenseReducer;
