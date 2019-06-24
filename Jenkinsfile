pipeline {
    agent { docker { image 'node:10' } }
    environment {
        NODE_ENV = 'production'
    }
    stages {
        stage('build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}