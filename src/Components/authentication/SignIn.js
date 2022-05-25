import React, { Component } from "react";
import { Auth } from "aws-amplify";


import Card from '@material-ui/core/Card';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import Login from './LoginForm'
import LoginOTPForm from './LoginOTPForm'

import ForgotPassword from './ForgotPassword';
import Loader from './loader'
import './style.css'
import axios from "axios";
import Configuration from "../../configurations";
import Cookies from 'universal-cookie';
import FirstTimePasswordChange from './FirstTimePasswordChange';

import { saveLogin, getPublicIP } from "./utils";
import publicIp from 'public-ip';

const cookies = new Cookies();

export class SignIn extends Component {
  constructor(props) {
    super(props);
    let emailToReset = sessionStorage.getItem('emailToReset');
    this.state = {
      username: "",
      password: "",
      signedin: false,
      confirmationCode: "",
      forgotPass: emailToReset ? true : false,
      sendVerification: false,
      verificationCode: '',
      sendMFA: false,
      user: {},
      errorMesssage: '',
      showLoader: false,
      notAuthorisedPerson: false,
      firstTimepwdRest: false,
      reEnrollAutoPopoLate: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleForgot = this.handleForgot.bind(this);
    this.handleSendVerification = this.handleSendVerification.bind(this);

    this.confirmSignIn = this.confirmSignIn.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  componentDidMount() {
    sessionStorage.removeItem('CLIENT_ID');
    sessionStorage.removeItem('CHAT_BOX_Id');
    this.toggleLoader(true);
    getPublicIP();
    this.jumpToForgotPasswordScreen();
    let urlValues = window.location.hash ? window.location.hash.split('=') : [];
    if (urlValues && urlValues.length > 0) {
      if (urlValues[1]) {
        this.getDecodeData(urlValues[1]);
        document.body.classList.add('bodyColor');
      }
    } else {
      sessionStorage.setItem("autoLogin", true);
      Auth.currentSession().then((session) => {
        this.checkPublicIp(session.idToken.jwtToken);

      }).catch((error) => {
        console.log('inside get current user')
        this.toggleLoader(false);
        localStorage.setItem('isLogged', 'false');
        document.body.classList.add('bodyColor');
      });
    }
  }

  componentWillUnmount() {
    document.body.classList.remove('bodyColor');
  }

  checkPublicIp = async (jwtToken) => {
    let ipv4 = await publicIp.v4();
    if (ipv4) {
      sessionStorage.setItem('PUBLIC-IP', ipv4);
      this.toggleLoader(false);
      let email = this.parseJwt(jwtToken);
      saveLogin(email, 'signin_didM');
      this.props.history.push('/');
    }
  }

  jumpToForgotPasswordScreen() {
    let url = window.location.href;
    if (url.split('login?').length > 1) {
      let queryString = url.split('login?')[1];
      let queryParams = new URLSearchParams(queryString)
      let forgotPass = decodeURI(queryParams.get('forgotPwd'));
      let email = decodeURI(queryParams.get('mail'));
      let username = decodeURI(queryParams.get('username'));
      if (forgotPass === 'true') {
        this.setState({ forgotPass: true, username: email, reEnrollAutoPopoLate: true })
      } else {
        this.setState({ forgotPass: false, username: username, });
      }
      this.props.history.replace('/login');
    }
  }
  handleChange(e) {
    console.log('change')
    this.setState({
      [e.target.name]: e.target.value
    });

  }

  parseJwt = (id_token) => {

    let base64Url = id_token.split('.')[1];

    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    let jsonPayload = decodeURIComponent(

      atob(base64)

        .split('')

        .map(function (c) {

          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)

        })
        .join('')
    );

    let token = JSON.parse(jsonPayload);
    return token.email;
  };

  async handleSubmit(e) {
    console.log('submit')
    e.preventDefault();
    this.toggleLoader(true)
    const { signedin, username, password, user } = this.state;
    this.setState({
      errorMesssage: ''
    })
    //method will signin the user and return current user with session
    const authUser = await Auth.signIn({
      username: username,
      password: password,
    }).catch(err => {
      // console.log(err);
      // alert(err.message)
      this.setState({
        errorMesssage: 'Incorrect username or password.',
        disableSiginBtn: false
      })
      this.toggleLoader(false)

    });
    this.toggleLoader(false)
    if (authUser) {
      sessionStorage.removeItem('USER_CRED');
      if (authUser.challengeName === 'SMS_MFA' ||
        authUser.challengeName === 'SOFTWARE_TOKEN_MFA') {

        this.setState({
          user: authUser,
          sendMFA: true,
          disableSiginBtn: false
        })
      } else if (authUser.challengeName === "NEW_PASSWORD_REQUIRED") {
        this.setState({
          user: authUser,
          disableSiginBtn: false,
          firstTimepwdRest: true,
        })
      } else {
        this.setState({
          disableSiginBtn: false
        })
        saveLogin(this.state.username, 'handleSubmit');
        this.props.history.replace('/');
      }
    }
  }


  handleForgot(e) {
    e.preventDefault();
    // const {forgotPass } = this.state;
    this.setState({
      forgotPass: true
    })

  };




  handleSendVerification(e) {
    e.preventDefault();
    const { username } = this.state;
    Auth.forgotPassword(username)
      .then(data => console.log(data))
      .catch(err => console.log(err));
    this.setState({
      sendVerification: true
    })
  }







  async confirmSignIn(e) {
    e.preventDefault();
    const { verificationCode, sendMFA, signedin, user } = this.state;
    this.toggleLoader(true);

    const loggedUser = await Auth.confirmSignIn(
      user,   // Return object from Auth.signIn()
      verificationCode,   // Confirmation code  
      "SMS_MFA"
      // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
    ).then(() => {
      console.log('sign in confirm success')
      this.toggleLoader(false);
      this.props.history.push('/');
    }).catch(err => {
      console.log(err);
      this.toggleLoader(false);
      this.setState({
        errorMesssage: err.message
      })

      // alert(err.message)
    });



  }





  // btnclick() {
  //   console.log(Auth.currentAuthenticatedUser());
  //   window.open("GET https://localhost:3000/logout?client_id=3uu8mib69gappsn13lv62ims2l&logout_uri=http://localhost:3000/");
  //   console.log(Auth.currentAuthenticatedUser());
  // }



  async handleLogout() {
    console.log('trying to logout')
    let curUser = await Auth.currentAuthenticatedUser();
    console.log(curUser)
    await Auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    curUser = await Auth.currentAuthenticatedUser();
    console.log(curUser)
  }

  toggleLoader = (value) => {
    this.setState({
      showLoader: value
    })
  }

  getDecodeData = (value) => {
    this.toggleLoader(true);
    axios.get(Configuration.baseUrl + '/encrypt/decryptData?state=' + value)
      .then(response => {
        this.toggleLoader(false);
        if (response.data.response) {
          console.log('---------- setHours(0) --------------');
          console.log(new Date().setHours(0));
          //cookies.set("STATE_PARAM", response.data.response, { path: '/', maxAge:  60 });//3600
          sessionStorage.setItem('STATE_PARAM', JSON.stringify(response.data.response));
          if (response.data.response && response.data.response.empid) {
            axios.get(Configuration.agentURL + '/employer/getEmployerByEmpId/' + response.data.response.empid)
              .then(response => {
                sessionStorage.setItem('EMP_NAME', response.data.response ? response.data.response.companyName : '')
              });
          }
          if (response.data.response && response.data.response.isAgent) {

            if (response.data.response && response.data.response.isEditCensus) {
              sessionStorage.setItem('isEditCensus', "true");
            }

            sessionStorage.setItem('isAgent', "true");
            sessionStorage.setItem('isLogged', "false");
            this.props.history.push('/');

          }
          if (response.data.response && response.data.response.fromMember) {
            sessionStorage.setItem('isLogged', "false");
            this.props.history.push('/');

          }
        } else {
          this.setState({
            notAuthorisedPerson: true
          });
        }
      });
  }

  handlePassword = (userName, password) => {
    this.setState({
      forgotPass: false,
    })
    if (this.state.reEnrollAutoPopoLate) {
      this.setState({
        username: userName,
        password: password,
        reEnrollAutoPopoLate: true,
      })
    }
  }

  gotoLoginScreen = () => {
    this.setState({
      forgotPass: false,
      firstTimepwdRest: false,
      signedin: false,
      sendMFA: false,
      errorMesssage: ''
    })
  }



  getVIew() {
    const { signedin, forgotPass, sendVerification, username, verificationCode, sendMFA, user, firstTimepwdRest } = this.state;
    if (!this.state.notAuthorisedPerson) {
      if (forgotPass) {
        return (
          <ForgotPassword username={username} confirmSignIn={this.confirmSignIn} toggleLoader={this.toggleLoader} handlePassword={(userName, password) => this.handlePassword(userName, password)} gotoLoginScreen={this.gotoLoginScreen} />
        )
      }
      else if (sendMFA) {

        return (
          <LoginOTPForm user={user} handleChange={this.handleChange} confirmSignIn={this.confirmSignIn} errorMesssage={this.state.errorMesssage} />
        )
        // return (
        //   <Card style={{ padding: "20px", marginTop: "50px" }}>
        //     <form >
        //       <div class="container">
        //         <h1>Confirm Login</h1>
        //         <p>Please fill in this form to confirm login.</p>
        //         <hr />
        //         <TableContainer component={Paper}>
        //           <Table aria-label="simple table">

        //             <TableRow>
        //               <TableCell>
        //                 <label for="verification code">
        //                   <b>verificationCode</b>
        //                 </label></TableCell>
        //               <TableCell> <input
        //                 type="text"
        //                 placeholder="Enter verificationCode"
        //                 name="verificationCode"
        //                 required
        //                 onChange={this.handleChange}
        //               /></TableCell>
        //               <TableCell>
        //                 <button type="submit" class="signupbtn" onClick={this.confirmSignIn} >
        //                   confirm signIn
        //           </button></TableCell>
        //             </TableRow>
        //           </Table>
        //         </TableContainer>
        //       </div>
        //     </form>


        //   </Card>

        //)

      }
      else if (signedin) {
        return (
          <Card style={{ padding: "20px", marginTop: "50px" }}>
            welcome you are signed in
              <button onClick={this.handleLogout}>logout</button>
          </Card>
        )

      } else if (firstTimepwdRest) {
        return (
          <FirstTimePasswordChange user={user} confirmSignIn={this.confirmSignIn} toggleLoader={this.toggleLoader} />
        )
      } else {
        return (

          <Login userName={this.state.username} password={this.state.password} handleSubmit={this.handleSubmit} handleChange={this.handleChange} handleForgot={this.handleForgot} handleToggle={this.props.handleToggle} errorMsg={this.state.errorMesssage} disableSiginBtn={this.state.disableSiginBtn} />

        );
      }
    } else {
      return (
        <div>
          <div style={{ marginTop: '30px', width: '95.2%', marginLeft: '2.4%', marginRight: '2.4%', }}>
            <div style={{ width: '55%', margin: '20%' }}>
              <h4>Oops! Something's not right.</h4>
              Please go back to the email and click on the link to self-enroll.
              </div>
          </div>
        </div>
      )
    }

  }

  render() {
    return (
      <>
        {this.getVIew()}
        <Loader showLoader={this.state.showLoader} />

      </>
    )

  }
}

export default SignIn;
