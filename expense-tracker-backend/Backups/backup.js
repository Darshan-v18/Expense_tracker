const { exec } = require('child_process');
const path = require('path');

const runBackup = () => {
  const backupScriptPath = path.join(__dirname, 'backup_script.sh'); 
  exec(backupScriptPath, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing backup script: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Backup script stderr: ${stderr}`);
      return;
    }
    console.log(`Backup script stdout: ${stdout}`);
  });
};


module.exports = { runBackup };
