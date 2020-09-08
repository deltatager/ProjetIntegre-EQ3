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
                catchError(buildResult: 'SUCCESS', stageResult: 'FAILURE') {
                    sh 'mvn test'
                }
            }
            post {
                always {
                    junit 'target/surefire-reports/*.xml'
                }
                unsuccessful {
                    script {
                        currentBuild.result = 'FAILURE'
                    }
                }
                success {
                    script {
                        currentBuild.result = 'SUCCESS'
                    }
                }
            }
        }
        stage('Publish to Jira') {
            steps{
                script {
                    def commit = sh(returnStdout: true, script: 'git log -1 --pretty=%B | cat')
                    def comment = [ body: "Build [$BUILD_TAG|$BUILD_URL] status is ${currentBuild.result}" ]
                    jiraAddComment idOrKey: getCommit(commit), input: comment, auditLog: false
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
