pipeline {
    agent { docker { image 'node:10' } }
    stages {
        stage('build') {
            steps {
                sh 'npm install'
                sh 'npm run build'
            }
        }
    }
}