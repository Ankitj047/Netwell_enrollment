node{
                stage("Git cloning Stage"){
                git branch: 'master', credentialsId: 'code_commit', url: 'https://git-codecommit.us-east-2.amazonaws.com/v1/repos/Maricopa-Frontend'    
                }
                stage("Nodejs FE depency installation"){
                    //sh "npm cache clean --force"
                    //sh "npm config set registry http://registry.npmjs.org/"
                    sh "sudo npm install"
				        
                }
				stage("Nodejs Frontend Build"){
				try{
				        sh "sudo npm run build"
				        currentBuild.result = 'SUCCESS'
				        emailext attachLog: true, body: 'Dev-Enroll-UHF-Portal-frontend build sucess', compressLog: true, recipientProviders: [requestor()], replyTo: 'maricopa@perscitussln.com', subject: 'Dev-Enroll-UHF-Portal-frontend build status', to: 'maricopa@perscitussln.com'
				    } catch (Exception err) {
				        currentBuild.result = 'FAILURE'
				        emailext attachLog: true, body: 'Dev-Enroll-UHF-Portal-frontend build failed', compressLog: true, recipientProviders: [requestor()], replyTo: 'maricopa@perscitussln.com', subject: 'Dev-Enroll-UHF-Portal-frontend build status', to: 'maricopa@perscitussln.com'
				    }
				    echo "RESULT: ${currentBuild.result}"
				}
				stage("move build to Artifact s3"){
				sh "aws s3 cp /var/lib/jenkins/workspace/Frontend-Pipelines/dev-enrolluhf-frontend/build/ s3://carynhealth-enrolluhf-frontend-artifacts/build-${currentBuild.number} --recursive"
				}
				stage("deployment in dev-enroll-server"){
				    sh "ANSIBLE_HOST_KEY_CHECKING=False  ansible-playbook -i /var/lib/jenkins/workspace/ansible-dev/dev-enroll-frontend-ansible/hosts  /var/lib/jenkins/workspace/ansible-dev/dev-enroll-frontend-ansible/devenroll.yml -u ubuntu   --private-key /var/lib/jenkins/workspace/ansible-dev/dev-enroll-frontend-ansible/maricoppadev.pem"
				}
                 stage ('notify'){
                    try{
           echo ' Notification for JOB Success '
           emailext attachLog: true,
           body: 'Dev-Enroll-UHF-Portal-frontend has deployed succesfully',
           compressLog: true, mimeType: 'text/html', 
           replyTo: 'Vignesh.Mallika@ust-global.com;Neelananda.Tarigonda@ust-global.com', 
           subject: 'Job has successfully deployed', 
           to: 'Vignesh.Mallika@ust-global.com;Neelananda.Tarigonda@ust-global.com'
                    }
     catch(Exception err) {
           echo ' Notification for JOB failed '
           emailext attachLog: true,
           body: 'Dev-Enroll-UHF-Portal-frontend has Failed',
           compressLog: true, mimeType: 'text/html', 
           replyTo: 'Vignesh.Mallika@ust-global.com;Neelananda.Tarigonda@ust-global.com', 
           subject: 'Job has Unsuccessfully deployed', 
           to: 'Vignesh.Mallika@ust-global.com;Neelananda.Tarigonda@ust-global.com'
    }
                }     
}