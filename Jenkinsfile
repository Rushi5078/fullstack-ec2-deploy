pipeline {
    agent any

    environment {
        FRONTEND_IP = 'your.frontend.ip'
        BACKEND_IP = 'your.backend.ip'
        SSH_KEY = '/var/lib/jenkins/my-key.pem'
        SSH_USER = 'ubuntu'
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/YOUR_USERNAME/my-fullstack-app.git'
            }
        }

        stage('Deploy Frontend') {
            steps {
                sh '''
                scp -o StrictHostKeyChecking=no -i $SSH_KEY frontend/index.html $SSH_USER@$FRONTEND_IP:/tmp/index.html
                ssh -o StrictHostKeyChecking=no -i $SSH_KEY $SSH_USER@$FRONTEND_IP "sudo mv /tmp/index.html /var/www/html/index.html && sudo systemctl restart nginx"
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                sh '''
                scp -o StrictHostKeyChecking=no -i $SSH_KEY backend/index.js $SSH_USER@$BACKEND_IP:/home/ubuntu/index.js
                ssh -o StrictHostKeyChecking=no -i $SSH_KEY $SSH_USER@$BACKEND_IP "pkill node || true && nohup node /home/ubuntu/index.js &"
                '''
            }
        }
    }
}
