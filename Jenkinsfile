pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'mvn -B -DskipTests clean package'
            }
        }
        stage('Test') {
            steps {
                sh 'mvn test'
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                    script {
                        def commit = sh(returnStdout: true, script: 'git log -1 --pretty=%B | cat')
                        def comment = [ body: "Build [$BUILD_TAG|$BUILD_URL] status is ${currentBuild.currentResult}" ]
                        jiraAddComment idOrKey: getCommit(commit), input: comment, auditLog: false
                    }
                }
            }
        }
    }
}

@NonCPS
def getCommit(commit) {
    def matcher = (commit =~ '(EQ3+-[1-9][0-9]*)')
    return matcher[0][1]
}
