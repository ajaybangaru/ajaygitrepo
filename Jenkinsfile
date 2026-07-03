pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Repository checked out successfully'
            }
        }

        stage('Compile') {
            steps {
                bat 'javac Hello.java'
            }
        }

        stage('Run') {
            steps {
                bat 'java Hello'
            }
        }
    }
}
