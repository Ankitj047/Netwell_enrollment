import React, { Component } from 'react';
import Loader from "./loader";
import {getQueryParams} from "./utils";
import {Auth} from "aws-amplify";
import './style.css'
import Customstyle from '../../Assets/CSS/stylesheet_UHS';
import Logo from './images/UHS_Logo_EnrollmentPortal.png';
import { withStyles, createMuiTheme} from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia'
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import awsConfig from "../../awsConfig";
import {saveLogin, getPublicIP} from "./utils";
import axios from "axios";
import Configuration from "../../configurations";
import Button from '@material-ui/core/Button';
import { Modal } from 'react-bootstrap';
import i18n from '../../../src/i18next';

// const NextButton = withStyles(
//     Customstyle.NextButton
// )(Button);
const NextButton = withStyles(
    Customstyle.NextButtonNetwell
)(Button);
// const CustomeButton = withStyles(
//     Customstyle.viewBtn
// )(Button);
const CustomeButton = withStyles(
    Customstyle.viewNetwellBtn
)(Button);
class Autologin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: false,
            userName : null,
            password : null,
            errorMessage : '',
            waitingFlag : true,
            enableBtn: true,
            successModal: false,
            popUpMsg: '',
            loaderShow: false,
            inviteStatusFlag:false
        }
    }

    componentDidMount() {
        sessionStorage.setItem("autoLogin", true);
        this.toggleLoader(true);
        this.loadQueryParams();
        getPublicIP();

    }

    loadQueryParams = () => {
        let queryParams = getQueryParams()
        if (queryParams.u && queryParams.p) {
            let userName = decodeURI(queryParams.u);
            let password = decodeURI(queryParams.p);

            this.setState({
                userName : userName,
                password : password
            },() => {
                this.autoSignIn();
            });
        } else {
            this.setState({
                errorMessage : '100',
                waitingFlag : false
            });
        }
    }

    async autoSignIn () {
        const authUser = await Auth.signIn({
            username: this.state.userName,
            password: this.state.password,
        }).catch(err => {
            // console.log(err);
            // alert(err.message)
            this.getUserDetails(this.state.userName);
            this.setState({
                errorMessage : '101',
                waitingFlag : false
            });
            
        });
        //this.toggleLoader(false)
        if (authUser) {
            console.log('======================== authUser =======================');
            console.log(authUser);

            if (authUser.challengeName === 'SMS_MFA' || authUser.challengeName === 'SOFTWARE_TOKEN_MFA') {

                this.setState({
                    user: authUser,
                })
            } else if (authUser.challengeName === "NEW_PASSWORD_REQUIRED") {
                this.setState({
                    user: authUser,
                });

                Auth.completeNewPassword(
                    authUser,               // the Cognito User Object
                    this.state.password,       // the new password
                ).then(user => {
                    // at this time the user is logged in if no MFA required
                    saveLogin(this.state.userName, 'autoLogin');
                    this.props.history.replace('/');                    

                }).catch(err => {
                    this.toggleLoader(false)
                    console.log(err.message);
                });

            } else {
                this.props.history.replace('/');
            }
        }
    }

    toggleLoader = (value) => {
        this.setState({
            showLoader: value
        })
    }

    sendAuthRequest = (requestType, phoneNumber) => {
        this.setState({
            loaderShow: true,
        });
        console.log("==DATA==", requestType +' '+ phoneNumber);
        axios.get(Configuration.baseUrl + '/enrollment/registration/' + this.state.userName + '/' + phoneNumber + '/' + requestType) //this.props.email
            .then(response => {
                console.log("==DATA CODE==", response && response.data.code);
                if (response && response.data.code === 200) {
                    this.setState({
                        loaderShow: false,
                        successModal: true,
                        popUpMsg: requestType === 'sms' ? 'Authorization SMS sent successfully!' : "Authorization mail sent successfully!",
                    });
                } else if (response.data.code === 202) {
                    this.setState({
                        loaderShow: false,
                        successModal: true,
                        popUpMsg: 'You have already signed-up earlier with a different password. Please check your inbox for a new auto sign-in link.',
                       // popUpMsg: 'You have already signed-up earlier with a different password. Please check your mailbox and use the most recent auto sign-in link to login',
                       // popUpMsg: 'The authorization email has been sent to ' +'"'+ this.state.userName +'"'+'. As the prospect has signed up earlier, for security reasons, they would be required to reset their password.',
                        //popUpMsg: 'The prospect has already signed-up and created an account. They can login to the enrollment app. If they need to reset their password, ask them to go to the login page and click on the Forgot your password? ',
                    });
                } else if (response.data.code === 204) {
                    this.setState({
                        loaderShow: false,
                        successModal: true,
                        inviteStatusFlag:true,
                        popUpMsg: requestType === 'sms' ? "The auto sign-up link has been SMS to " +'"'+ phoneNumber +'"' : "The authorization link has been sent to " +'"'+ this.state.userName.replace(/^(.)(.*)(.@.*)$/,
                        (_, a, b, c) => a + b.replace(/./g, '*') + c) +'"',
                    });
                } else if (response.data.code === 409) {
                    this.setState({
                        loaderShow: false,
                        successModal: true,
                        popUpMsg: "User already exists in the given User Pool.",
                    });
                } else if (response.data.code === 500) {
                    this.setState({
                        loaderShow: false,
                        successModal: true,
                        popUpMsg: "Oops! Something's not right.",
                    });
                }

            })
            .catch(error => {
                console.log(error);
                this.setState({
                    loaderShow: false,
                    successModal: true,
                    popUpMsg: "Oops! Something's not right.",
                });
            });
    }


    getUserDetails =(email)=>{
        axios.get(Configuration.baseUrl + '/setupfamily/getMemberByEmail/'+email)
        .then(response => {
            if(response.data.response){
                let data = JSON.parse(JSON.stringify(response.data.response));
                this.setState({
                    userPhonenumber: data.phone,
                },()=> {
                    this.setState({
                        enableBtn: false,
                    })
                });
            }
          
        });
    }

    handleClose = () => {
        this.setState({
            successModal: false,
            popUpMsg: '',
            enableBtn: true,
        });
        window.close();        
    };

   
    render() {
        return (
            <div style={Customstyle.divMain}>
                {/* <Loader showLoader={this.state.showLoader} /> */}
                {
                     this.state.loaderShow ? <Loader></Loader> : ''
                 }

                <Grid container direction='row' justify="center" alignItems="center">
                        <Grid item xs={8} sm={3} md={3} >
                            <Card  style={Customstyle.cardMain}>
                                <CardMedia style={Customstyle.cardMedia}>
                                    <img alt="logo" className="logo-custom" src={require('./images/netwell-logo.png')} />
                                </CardMedia>
                                <CardContent style={Customstyle.cardContent}>

                                    {
                                        this.state.waitingFlag ?
                                            <div className='text-center'>
                                                <span>
                                                    <img style={{height : '50px'}} src={require('../../Assets/Images/hour_glass.gif')} />
                                                </span>
                                                <p className='text-center'>
                                                    <span className='text-center'> <b>Please wait...</b></span>
                                                    <p className='text-center'>  You will be automatically taken
                                                        <p className='text-center'> to the authorization screen</p>
                                                    </p>
                                                </p>
                                            </div>
                                            :
                                            <p className='text-center'>
                                                {
                                                    this.state.errorMessage === '100'?
                                                        <div>
                                                            <h5>Oops! Something's not right.</h5>
                                                            Please go back to the email and click on the link to self-enroll. If you're still having trouble, call us on (800) 921-4505.
                                                        </div>
                                                        : this.state.errorMessage === '101' ?
                                                            <div className='autologin-err-msg'>
                                                                {/* <h5>Incorrect username or password.</h5> */}
                                                                <h5 style={{color:'#333333', fontSize:'16px', fontWeight:'normal'}}>The authorization link you used is no longer valid. Click
                                                                the button below to generate another and then check
                                                                your email for the new authorization link.</h5>
                                                                <div className='text-center'>                                                                    
                                                                <NextButton disabled = {this.state.enableBtn} style={{ marginTop: '40px', width: '280px', height: '40px', fontFamily: 'Roboto, Arial, Helvetica, sans-serif', fontSize: '13px' }} onClick={() => this.sendAuthRequest('email', this.state.userPhonenumber)} >SEND AUTHORIZATION LINK TO MY EMAIL</NextButton>
                                                                </div>
                                                            </div> :
                                                                <div className='autologin-err-msg'>
                                                                    <h5>Something went wrong! Please try again later.</h5>
                                                                </div>
                                                }
                                            </p>
                                    }
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>

                    <Modal size="md" show={this.state.successModal} centered onHide={() => this.handlenClose}>
                            <Modal.Header style={Customstyle.modal_header}>
                                <Modal.Title>{this.state.inviteStatusFlag ? "Authorization Link Sent":i18n.t('SUBMIT_APPLICATION.MODEL_TITLE2')}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                               
                                <div style={{ textAlign: 'center', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}>
                                    <p>{this.state.popUpMsg}</p>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <CustomeButton onClick={this.handleClose}>{i18n.t('BUTTON.OK')}</CustomeButton>
                            </Modal.Footer>
                    </Modal>
            </div>
        )

    }

}

export default Autologin;