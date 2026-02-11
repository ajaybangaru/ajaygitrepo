pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Start Pinot') {
            steps {
                sh 'whoami'
                sh 'docker --version'
                sh 'docker compose version'
                sh 'docker compose down || true'
                sh 'docker compose up -d'
                sh 'docker ps'
            }
        }
    }
}
