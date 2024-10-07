import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
import joblib
import os

data = pd.read_csv('monthly_expenses.csv')

data['month_num'] = (data['year'] - data['year'].min()) * 12 + data['month']

X = data[['month_num']]
y = data['total_expense']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LinearRegression()
model.fit(X_train, y_train)

joblib.dump(model, 'expense_predictor.joblib')  
