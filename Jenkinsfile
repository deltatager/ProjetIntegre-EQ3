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
                }
            }
        }
        stage('Publish to Jira') {
            steps{
                script {
                    def commit = sh(returnStdout: true, script: 'git log -1 --pretty=%B | cat')
                    def comment = [ body: 'test comment' ]
                    jiraAddComment idOrKey: getCommit(commit), input: comment
                }
            }
        }
    }
}

@NonCPS
def getCommit(commit) {
    def matcher = (commit =~ '([a-zA-Z][a-zA-Z0-9_]+-[1-9][0-9]*)')
    return matcher[0][1]
}
