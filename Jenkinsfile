pipeline {
    agent any
    environment {
        SONARQUBE_URL = 'http://localhost:9000'          // Replace with your SonarQube URL
        SONARQUBE_CREDENTIALS = 'sqa_a8ea0d125f1894aa2a5ba04f609657fe2966149c'         // Replace with SonarQube token credentials ID
    }
    stages {
        stage('Clone Repository') {
            steps {
                // Clones the GitHub repository
                git url: 'https://github.com/Darshan-v18/Expense_tracker'
            }
        }
        stage('Install and Test Frontend') {
            steps {
                dir('expense-tracker-frontend') {
                    // Install dependencies and run tests for frontend
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        stage('Install and Test Backend') {
            steps {
                dir('expense-tracker-backend') {
                    // Install dependencies and run tests for backend
                    sh 'npm install'
                    sh 'npm test'
                }
            }
        }
        stage('SonarQube Analysis - Frontend') {
            environment {
                // Use your SonarQube server environment
                SONAR_SCANNER_OPTS = "-Dsonar.projectKey=ExpenseTrackerFrontend"
            }
            steps {
                dir('expense-tracker-frontend') {
                    // Run SonarQube analysis for frontend
                    withSonarQubeEnv('SonarQube') {
                        sh 'sonar-scanner -Dsonar.projectKey=ExpenseTrackerFrontend'
                    }
                }
            }
        }
        stage('SonarQube Analysis - Backend') {
            environment {
                // Use your SonarQube server environment
                SONAR_SCANNER_OPTS = "-Dsonar.projectKey=ExpenseTrackerBackend"
            }
            steps {
                dir('expense-tracker-backend') {
                    // Run SonarQube analysis for backend
                    withSonarQubeEnv('SonarQube') {
                        sh 'sonar-scanner -Dsonar.projectKey=ExpenseTrackerBackend'
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline finished'
        }
    }
}
