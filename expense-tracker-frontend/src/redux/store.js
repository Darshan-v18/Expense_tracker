import { createStore, combineReducers, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import authReducer from './reducers/authReducers';
import expenseReducer from './reducers/expenseReducers';
import categoryReducer from './reducers/categoryReducer';
import budgetReducer from './reducers/budgetReducers';

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expenseReducer,
  categories: categoryReducer,
  budgets: budgetReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
