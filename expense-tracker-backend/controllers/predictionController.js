const express = require('express');

const { spawn } = require('child_process');
const path = require('path');
const router = express.Router();

const predictedExpense = (req, res) => {
    const inputDate = req.query.date;
    console
    const scriptPath = path.join('/home/training_th1515/expense-tracker-backend/AIML', 'predictor.py');
    const pythonProcess = spawn('python3', [scriptPath, inputDate]);

    let result = '';
    pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
    });

    pythonProcess.stderr.on('data', (data) => {
        console.error('Error from Python script:', data.toString());
    });

    pythonProcess.on('close', (code) => {
        if (code !== 0) {
            console.error(`Python script exited with code ${code}`);
            return res.status(500).json({ error: 'Error predicting expense' });
        }
        
        res.json({ predictedExpense: result.trim() });
    });
};

module.exports = { predictedExpense };