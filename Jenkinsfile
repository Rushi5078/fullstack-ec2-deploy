pipeline {
    agent any

    environment {
        FRONTEND_IP = "13.233.245.253"
        BACKEND_IP = "13.233.212.148"
        SSH_KEY_PATH = "/var/lib/jenkins/.ssh/id_rsa"
        USER = "ubuntu"
        REPO_URL = "https://github.com/Rushi5078/fullstack-ec2-deploy.git"
    }

    stages {
        stage('Clone Repository') {
            steps {
                git url: "${REPO_URL}", branch: 'main'
            }
        }

        stage('Deploy Frontend') {
            steps {
                echo "Deploying frontend to ${FRONTEND_IP}..."
                sh '''
                    scp -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} -r frontend/* ${USER}@${FRONTEND_IP}:/var/www/html/
                '''
            }
        }

        stage('Deploy Backend') {
            steps {
                echo "Deploying backend to ${BACKEND_IP}..."
                sh '''
                    ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ${USER}@${BACKEND_IP} << EOF
                        sudo apt update -y
                        sudo apt install -y nodejs npm
                        mkdir -p ~/backend
                        exit
                    EOF
                    scp -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} -r backend/* ${USER}@${BACKEND_IP}:~/backend/
                    ssh -o StrictHostKeyChecking=no -i ${SSH_KEY_PATH} ${USER}@${BACKEND_IP} << EOF
                        cd ~/backend
                        nohup node index.js > output.log 2>&1 &
                    EOF
                '''
            }
        }
    }
}
