const express = require('express');
const cron = require('node-cron');
const bodyParser = require('body-parser');
const { sequelize } = require('./models');
const routes = require('./routes'); 
require('dotenv').config();
const cors = require('cors');
const {runBackup} = require('./Backups/backup');

const app = express();
const PORT = process.env.PORT || 5000;

cron.schedule('0 2 * * *', () => {
  console.log('Running PostgreSQL backup...');
  runBackup();
});


app.use(bodyParser.json())
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true, 
}));
app.use('/api', routes); 

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch(err => {
  console.error('Unable to connect to the database:', err);
});
