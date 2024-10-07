import joblib
import pandas as pd
import sys
from datetime import datetime

model = joblib.load('/home/training_th1515/expense-tracker-backend/AIML/expense_predictor.joblib')
# print("hello")
input_date = sys.argv[1]
# print(input_date)
date_obj = datetime.strptime(input_date, '%Y-%m')

data = pd.read_csv('/home/training_th1515/expense-tracker-backend/AIML/monthly_expenses.csv')
data['month_num'] = (data['year'] - data['year'].min()) * 12 + data['month']

month_num = (date_obj.year - data['year'].min()) * 12 + date_obj.month


input_data = pd.DataFrame({'month_num': [month_num]})

predicted_expense = model.predict(input_data)

# Output the prediction
print(f"{predicted_expense[0]:.2f}")
