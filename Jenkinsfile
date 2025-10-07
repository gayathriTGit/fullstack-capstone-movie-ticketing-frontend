pipeline {
    agent any
    
    stages {
     
        stage('Checkout') {
            steps { 
                script {
                    git branch: 'main', url: 'https://github.com/gayathriTGit/fullstack-capstone-movie-ticketing-frontend.git'
                }
            }
        }
      
        stage('Build') {
            steps {
                sh '''
                docker version
                docker rmi ticket-booking-frontend:1.0 -f || true 
                docker build -t ticket-booking-frontend:1.0 -f Dockerfile .
                '''
            }
        }
    
        stage('Run') {
            steps {
                sh '''                
                docker rm -f ticket-booking-frontend-container || true
                docker run -d --name ticket-booking-frontend-container -p 8000:80 ticket-booking-frontend:1.0
                '''
            }
        }
    }
}
