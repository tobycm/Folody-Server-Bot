// update bot ở nhà toby let's go

pipeline {
  agent {
    label "vps4"
  }

  stages {
    stage('Update') {
      steps {
        dir('/home/toby/coding/typescript/folody-Server-Bot') {
          sh 'git pull'
        }
      }
    }

    stage('PM2 Restart') {
      steps {
        sh 'pm2 restart folody-Server-Bot'
      }
    }
  }
}
