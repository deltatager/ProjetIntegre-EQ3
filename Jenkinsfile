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

                    jiraAddComment idOrKey: id, input: comment
                }
            }
        }
    }
}

@NonCPS
def getCommit() {
    def commit = sh(returnStdout: true, script: 'git log -1 --pretty=%B | cat')
    def matcher = (commit =~ '([a-zA-Z][a-zA-Z0-9_]+-[1-9][0-9]*)')
    def comment = [ body: 'test comment' ]
    id = matcher[0][1]
}
