import React, { useEffect, useState } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import axios from 'axios';
import './Dashboard.css'; 
import NavBar from '../Headers/Navbar';
import Cookies from 'js-cookie';
import DatePicker from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement, 
  PointElement, 
  LineElement, 
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,     
  BarElement,
  ArcElement, 
  PointElement, 
  LineElement, 
  Title,
  Tooltip,
  Legend
);


const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const token = Cookies.get('authToken');
  const [predictedExpense, setPredictedExpense] = useState(null); 
  const [predictionDate, setPredictionDate] = useState(new Date()); 
  useEffect(() => {
    const fetchDashboardData = async (month) => {
      try {
        const monthString = month.toISOString().slice(0, 7); 
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/dashboard?month=${monthString}`, {
          headers: {
            Authorization: token,
          },
        });
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData(selectedMonth);
  }, [selectedMonth, token]);

  const fetchPredictedExpense = async () => {
    const token = Cookies.get('authToken');
    try {
      
      const month = predictionDate.toISOString().slice(0, 7);
      // console.log(monthString);
      const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/predict-expense?date=${month}`,{
        headers: {
          Authorization: token,
        },
      });
      console.log(response.data.predictedExpense);
      setPredictedExpense(response.data.predictedExpense);
    } catch (error) {
      console.log(error);
      console.error('Error fetching predicted expense:', error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  const budgetVsSpendingData = data.budgetVsSpending; 
  const labels = budgetVsSpendingData.map(item => item.categoryName);
  const spent = budgetVsSpendingData.map(item => item.spent);

  const pieChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Spending by Category',
        data: spent,
        backgroundColor: [
          '#003f5c',
          '#ffa600',
          '#2f4b7c',
          '#665191',
          '#d45087',
          '#f95d6a',
          '#ff7c43'
        ],
      },
    ],
  };

  const lineChartData = {
    labels: data.spendingTrends.map(trend => trend.month),
    datasets: [
      {
        label: 'Monthly Spending',
        data: data.spendingTrends.map(trend => trend.total_spent),
        fill: false,
        borderColor: 'rgba(255,99,132,1)',
      },
    ],
  };

  const downloadPDF = async () => {
    const pdf = new jsPDF('p', 'pt', 'a4');
    const totalExpenseElement = document.querySelector('.total-expenses');
    const chartsContainerElement = document.querySelector('.charts-container');
    
    const totalExpenseCanvas = await html2canvas(totalExpenseElement);
    const totalExpenseImgData = totalExpenseCanvas.toDataURL('image/png');
    pdf.text(`Monthly Report-${selectedMonth.toISOString().slice(0, 7)}`, 40, 40);
    pdf.addImage(totalExpenseImgData, 'PNG', 40, 60, 500, 50); 

    
    const chartsContainerCanvas = await html2canvas(chartsContainerElement);
    const chartsContainerImgData = chartsContainerCanvas.toDataURL('image/png');
    pdf.addImage(chartsContainerImgData, 'PNG', 40, 130, 500, 400); 
    
    pdf.save('monthly-report.pdf');
  };

  return (
    <div className="dashboard-container">
      <NavBar />
      <h2>Dashboard Overview</h2>

      <div className="total-expenses">
        <h3>Total Expenses:</h3>
        <p>${data.totalExpenses.toFixed(2)}</p>
      </div>

      <div className="month-selector">
        <DatePicker
          selected={selectedMonth}
          onChange={(date) => setSelectedMonth(date)}
          dateFormat="yyyy-MM"
          showMonthYearPicker
          showFullMonthYearPicker
          placeholderText="Select Month"
        />
      </div>

      <button class="download-report-btn" onClick={downloadPDF}>
  Download Report
</button>

<div className="prediction-container">
        <h4>Predict Expenses</h4>
        <DatePicker
          selected={predictionDate}
          onChange={(date) => setPredictionDate(date)}
          dateFormat="yyyy-MM"
          showMonthYearPicker
          showFullMonthYearPicker
          placeholderText="Select Prediction Month"
        />
        <button className="predict-expense-btn" onClick={fetchPredictedExpense}>
          Get Predicted Expense
        </button>

        {predictedExpense !== null && (
          <div className="predicted-expense">
            <h4>Predicted Expense for {predictionDate.toISOString().slice(0, 7)}:</h4>
            <p>${predictedExpense}</p>
          </div>
        )}
      </div>
      <div className="charts-container">
        <h4>Budget vs Actual Spending by Category</h4>
        <div className="chart-row">
          {budgetVsSpendingData.map((item, index) => (
            <div className="chart" key={index}>
              <h5>{item.categoryName}</h5>
              <Bar 
                data={{
                  labels: ['Budget', 'Spent'],
                  datasets: [
                    {
                      label: 'Budget',
                      backgroundColor: '#2f4b7c',
                      data: [item.budget],
                    },
                    {
                      label: 'Spent',
                      backgroundColor: '#de425b',
                      data: [item.spent],
                    },
                  ],
                }} 
                options={{ 
                  responsive: true,
                  scales: {
                    y: {
                      beginAtZero: true,
                    },
                    x: {
                      display: false
                    }
                  },
                }} 
              />
            </div>
          ))}
        </div>

        <h4>Spending by Category</h4>
        <div className="chart-row">
          <div className="chart pie-chart">
            <Pie data={pieChartData} options={{ responsive: true }} />
          </div>
        </div>

        <h4>Spending Trends Over Time</h4>
        <div className="chart-row">
          <div className="chart line-chart">
            <Line data={lineChartData} options={{ responsive: true }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
