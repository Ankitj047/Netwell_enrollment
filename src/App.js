import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import Enrollment from './Components/Screens/Enrollment/enrollment';
import QuickQuote2 from './Components/Screens/Enrollment/QuickQuote2';
import QuickQuote1 from './Components/Screens/Enrollment/QuickQuote1';
import Header from './Components/Screens/Headers/Header';
import Amplify, { Auth } from 'aws-amplify';
import awsConfig from './awsConfig';
import { withAuthenticator, Authenticator } from 'aws-amplify-react';
import { useState, useEffect } from 'react';
import SignIn from './Components/authentication/SignIn';
import Signup from './Components/authentication/Signup';
import Autologin from "./Components/authentication/autologin";
import QuickEstimate from "./Components/Screens/Enrollment/QuickEstimate/Dashboard/Home"
import configuration from './configurations';

global.load=0;

Amplify.configure(awsConfig);

const App = (props) => {
    useEffect(() => {
      var brand = configuration.BRAND 
      console.log("Brand---",brand)
      localStorage.setItem('Brand',brand)
        // getQueryParams()
        // debugger
        // Auth.currentAuthenticatedUser()
        //     .then((user) => {
        //         debugger
        //         console.log('=========' + JSON.stringify(user))
        //     }).catch((err)=>{
        //         debugger
        //     })
    });

    return (
        <div className="App">

                <BrowserRouter>
                    <Route exact path="/" component={Enrollment} />
                    <Route path="/login" component={SignIn} />
                    <Route path="/autologin" component={Autologin}></Route>
                    <Route path="/signup" component={Signup} />
                    <Route path="/quick_quote2" component={QuickQuote2} />
                    <Route path="/quick_estimate" component={QuickEstimate} />
                    <Route path="/quick_quote" component={QuickQuote1} />
                </BrowserRouter>
        </div>
    );
}
//export default withAuthenticator(App, true);
export default App;


export const getQueryParams = () => {
    let url = window.location.href
  
  console.log("url-----",url)
    if (url !== undefined && url !== null && url.split('://').length > 1) {
      let queryString1 = url.split('://')[1]
      console.log("queryString1-----",queryString1)
      if(queryString1 == 'localhost:3001/'){
        console.log("netwell")
        localStorage.setItem('Brand', "netwell")
      }
    //   else{
    //     localStorage.setItem('Brand', "uhf")
    //   }
    }
  }