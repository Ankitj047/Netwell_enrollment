const
    configurations = {
    //baseUrl: 'http://3.136.92.227:8089/api/v3.0'  /* Deployment Server for Perscitus Developer*/,
    baseUrl: process.env.REACT_APP_BASE_URL  /* Deployment Server for Perscitus Developer*/,
    clientId : '5448',
    chat_Box_Id : 'b605e486-1658-4e35-8239-d9bd3952006e',
    //agentURL : 'http://3.136.92.227:8088/api/v4', // Only for test server
     agentURL : process.env.REACT_APP_AGENT_URL,  // Only for UAT/Dev Enviornment
	 transactionURL: process.env.REACT_APP_transaction_base_url, //url for setup payment and last 4 digit
    //transactionURL:"http://3.136.92.227:8085/api/v6", //for local and test server Transaction URL
    authenticationURL:process.env.REACT_APP_AUTHENTICATION_URL,
    tokenURL :process.env.REACT_APP_TOKEN_URL,
    leadGenrateURL :process.env.REACT_APP_LEAD_GENERATION_URL,
    BRAND : process.env.REACT_APP_BRAND,
    isProd:false
}
   
export default configurations;