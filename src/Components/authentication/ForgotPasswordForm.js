import React, { useState } from 'react'
import axios from "axios";
import Card from '@material-ui/core/Card';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import awsConfig from '../../awsConfig';
import configurations from "../../configurations";
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import './style.css'
import { getTokenForAuthentication } from './utils';
import AlertBox from './AlertBox'


import { Auth } from "aws-amplify";

const ForgotPasswordForm = (props) => {

  const [showAlert, toggleAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState('');


  const handleSendVerification = (e) => {
    e.preventDefault();
    // props.setSendVerification(true)
    props.toggleLoader(true);
    // let errorMsg = 'Sorry! We could not find an active registration for ' + props.email;
    let errorMsg = 'Email: ' + props.email + ' is not registered with us. Please check the email address and retry.';
    getTokenForAuthentication().then((response) => {
      let token = response['headers'].authorization;
      let request = {
        "cognitoUserPool": awsConfig.aws_user_pools_id,
        "username": props.email
      }

      axios.post(configurations.authenticationURL + 'v1/memberportal/getuser', request, {
        headers: {
          Authorization: token
        }
      }).then((resp) => {
        Auth.forgotPassword(props.email)
          .then(data => {
            console.log('send verification')
            console.log(data)
            props.toggleLoader(false)
            props.handleSendVerification(data.CodeDeliveryDetails.Destination)

          })
          .catch(err => {
            props.toggleLoader(false);
            console.log(err)
            setAlertMsg(errorMsg)
            toggleAlert(true);
          });
      }).catch((err) => {
        toggleAlert(true);
        setAlertMsg(errorMsg)
        props.toggleLoader(false);
      })

    }).catch((err) => {
      toggleAlert(true);
      setAlertMsg(errorMsg)
      props.toggleLoader(false);
    })

    // Auth.forgotPassword(props.email)
    //   .then(data => {
    //     console.log('send verification')
    //     console.log(data)
    //     props.toggleLoader(false)
    //     props.handleSendVerification(data.CodeDeliveryDetails.Destination)

    //   })
    //   .catch(err => {
    //     props.toggleLoader(false);
    //     console.log(err)
    //   });
  }




  return (
    <div className="login">
      <CssBaseline />
      <Container maxWidth="xs">
        <Card className="login-card" style={{ marginTop: "50px" }}>

          <div className="logo">
            <img alt="logo" className="logo-custom" src={require('./images/netwell-logo.png')} />
          </div>
          <form className="main-form" onSubmit={handleSendVerification} >
            <h4>Forgot your password?</h4>
            <p>Enter your Email below and we will send a message to reset your password.</p>
            <div className="a-form-ctrl">
              <p className="">Email</p>
              <input
                className="a-input"
                type="email"
                placeholder="Email"
                name="username"
                value={props.email}
                required
                onChange={props.handleChange}
              />
            </div>
            <div>
              <button type="submit" className="a-btn" style={{color:'#ffffff',backgroundColor:'#4782c4'}}>
                Reset my password
                </button>
              <p style={{ textAlign: 'center' }}><span>Go back to</span>&nbsp;
                <span className="forgot-pawd" onClick={() => props.gotoLoginScreen()}>Sign In</span></p>
            </div>
          </form>

        </Card>

      </Container>
      <AlertBox showAlert={showAlert} alertMsg={alertMsg} alertTitle={'Alert'} closeAlert={() => {
        setAlertMsg('');
        toggleAlert(false)
      }} />
    </div>
  )
}

export default ForgotPasswordForm
