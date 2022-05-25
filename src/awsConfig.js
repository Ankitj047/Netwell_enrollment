const awsConfig = {
    // identityPoolId: 'ap-south-1:62c69269-14c1-4213-9fd8-3011bcd1833c',
    // region: 'ap-south-1',
    // userPoolId: 'ap-south-1_lYRXJB955',
    // userPoolWebClientId: '2lflj5i9hesfe0cvqhofjopfpr'


    // ------------DEV
    // "aws_project_region": "us-east-2",
    // "aws_cognito_identity_pool_id": "us-east-2:1e41b1fc-a8a8-44b7-bbe2-71c8eda47f8f",
    // "aws_cognito_region": "us-east-2",
    // "aws_user_pools_id": "us-east-2_Lw7gICjIH",
    // "aws_user_pools_web_client_id": "1ak5i37cdpnuojcqi5vhkmpg2n",
    // "oauth": {}

    // -----------Netwell

    "aws_project_region": "us-east-2",
    "aws_cognito_region": "us-east-2",
    "aws_user_pools_id": process.env.REACT_APP_AGENT_USER_POOL,
    "aws_user_pools_web_client_id": process.env.REACT_APP_aws_user_pools_web_client_id,
    "aws_cognito_identity_pool_id": process.env.REACT_APP_aws_cognito_identity_pool_id,
    "oauth": {},

}

export default awsConfig;