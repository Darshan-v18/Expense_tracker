#!/bin/bash

export $(grep -v '^#' /home/training_th1515/Expense_tracker/expense-tracker-backend/.env | xargs)

BACKUP_DIR="/home/training_th1515/Expense_tracker/expense-tracker-backend/Backups"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
BACKUP_FILE="$BACKUP_DIR/$DB_NAME"_"$TIMESTAMP".sql


PGPASSWORD=$DB_PASS pg_dump -U $DB_USER $DB_NAME > $BACKUP_FILE


if [ ! -s "$BACKUP_FILE" ]; then
  echo "Backup file is empty. See backup_error.log for details."
else
  echo "Backup completed successfully: $BACKUP_FILE"
fi

find "$BACKUP_DIR" -type f -name "*.sql" -mtime +7 -exec rm {} \;

echo "Old backups deleted successfully."