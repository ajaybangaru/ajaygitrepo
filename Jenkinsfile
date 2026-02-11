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
                sh 'docker compose -f ApachePinot_POC/docker-compose.yml down'
                sh 'docker compose -f ApachePinot_POC/docker-compose.yml up -d'
                sh 'docker ps'
            }
        }
    }
}
