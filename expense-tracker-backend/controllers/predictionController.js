const express = require('express');
// const { PythonShell } = require('python-shell');
const { spawn } = require('child_process');
const path = require('path');
const router = express.Router();

const predictedExpense = (req, res) => {
    const inputDate = req.body.date;

    // Define the Python script path and arguments
    const scriptPath = path.join('/home/training_th1515/expense-tracker-backend/AIML', 'predictor.py');
    const pythonProcess = spawn('python3', [scriptPath, inputDate]);

    // Collect the output from the Python script
    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    // Collect any errors from the Python script
    pythonProcess.stderr.on('data', (data) => {
        console.error('Error from Python script:', data.toString());
    });

    // Handle the end of the Python script process
    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python script exited with code ${code}`);
            return res.status(500).json({ error: 'Error predicting expense' });
        }

        // Send the output as a response
        res.json({ predictedExpense: result.trim() });
    });
};

module.exports = { predictedExpense };