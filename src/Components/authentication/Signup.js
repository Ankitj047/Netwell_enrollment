import React, { Component } from "react";
import { Auth } from "aws-amplify";
import './style.css'


import Card from '@material-ui/core/Card';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import SignUpForm from './signupform';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import axios from 'axios';
import Loader from './loader'
import { label } from "@aws-amplify/ui";
import Configuration from "../../configurations";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            email: '',
            phone: '',
            lastname: '',
            firstname: '',
            signedUp: false,
            confirmationCode: '',
            passwordLength: false,
            containsNumbers: false,
            isUppercase: false,
            containsSymbols: false,
            isLowercase: false,
            isPhone: false,
            user: {},
            errorMessage: '',
            errorConfirm: '',
            countryCode: '+1',
            showLoader: false,
            notAuthorisedPerson : false
        };
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange1 = this.handleChange1.bind(this)
        this.handleChangePhone = this.handleChangePhone.bind(this)
        this.resendVerification = this.resendVerification.bind(this);
    }

    componentDidMount() {
        this.toggleLoader(true);
        sessionStorage.removeItem('CLIENT_ID');
        sessionStorage.removeItem('CHAT_BOX_Id');
        this.toggleLoader(true);
        Auth.currentSession().then((session) => {
            this.toggleLoader(false);
            this.props.history.push('/');
        }).catch((error) => {
            console.log('inside get current user')
            this.toggleLoader(false);
            localStorage.setItem('isLogged', 'false');
            let urlValues = window.location.hash ? window.location.hash.split('=') : [];
            let STATE_PARAM = JSON.parse(sessionStorage.getItem('STATE_PARAM'));//cookies.get('STATE_PARAM', false);
            if(urlValues && urlValues.length > 0) {
                if(urlValues[1]){
                    this.getDecodeData(urlValues[1]);
                }
            } else if(STATE_PARAM){
                this.setState({
                    notAuthorisedPerson : false
                })
            } else {
                this.setState({
                    notAuthorisedPerson : true
                })
            }
            document.body.classList.add('bodyColor');
            this.getGeoInfo()
        });
    }

    componentWillUnmount() {
        document.body.classList.remove('bodyColor');
    }
    //check for numbers

    chechForNumbers = (string) => {
        var matches = string.match(/\d+/g);
        this.setState({
            containsNumbers: matches != null ? true : false
        });
    }

    checkForUpperCase = (string) => {
        var matches = string.match(/[A-Z]/);
        this.setState({
            isUppercase: matches != null ? true : false
        });
    }

    checkForLowerCase = (string) => {
        var matches = string.match(/[a-z]/);
        this.setState({
            isLowercase: matches != null ? true : false
        });
    }

    checkForSymbols = (string) => {
        var symbols = new RegExp(/[^A-Za-z0-9]/);
        this.setState({
            containsSymbols: symbols.test(string) ? true : false
        });
    }

    validatePhoneNo = (string) => {
        var matches = string.match(/^\d{10}$/);
        this.setState({
            isPhone: matches != null ? true : false
        });
    }
    //     if (phone.match(phonenopattern)) {

    //       return true;
    //     }
    //     else {
    //       return false;
    //     }
    //   }





    handleChange = (e) => {
        console.log(e)
        let targetValue = e.target.value;
        this.chechForNumbers(targetValue);
        this.checkForUpperCase(targetValue);
        this.checkForSymbols(targetValue);
        this.checkForLowerCase(targetValue);
        this.setState({
            [e.target.name]: e.target.value,
            passwordLength: targetValue.length > 7 ? true : false

        });
    };

    handleChange1 = (e) => {
        console.log(e)
        let targetValue = e.target.value;
        //this.chechForNumbers(targetValue);
        //this.checkForUpperCase(targetValue);
        //this.checkForSymbols(targetValue);
        //this.checkForLowerCase(targetValue);
        this.validatePhoneNo(targetValue);
        this.setState({
            // passwordLength:targetValue.length>7?true:false
            [e.target.name]: e.target.value
        });
    };

    handleChangePhone = (e) => {
        console.log(e)
        let targetValue = e.target.value;
        this.validatePhoneNo(targetValue);
        //this.chechForNumbers(targetValue);
        //this.checkForUpperCase(targetValue);
        //this.checkForSymbols(targetValue);
        //this.checkForLowerCase(targetValue);
        this.setState({
            // passwordLength:targetValue.length>7?true:false
            [e.target.name]: e.target.value
        });
    };

    async handleSubmit(e) {
        e.preventDefault();
        console.log('testing submit')
        const { signedUp, username, password, email, phone, confirmationCode, lastname, firstname, user, errorMessage, errorConfirm } = this.state;

        //alert(phone)
        let countryCode = this.state.countryCode;
        if (!signedUp) {
            console.log('inside testinf if');
            this.toggleLoader(true);
            Auth.signUp(
                {
                    username: email,
                    password: password,
                    attributes: {
                        email: email,
                        phone_number: countryCode + phone,
                        family_name: lastname,
                        given_name: firstname

                    }
                })
                .then((user) => {
                    console.log("signed up")
                    console.log(user.codeDeliveryDetails.Destination)
                    this.toggleLoader(false);
                    sessionStorage.setItem('USER_CRED', JSON.stringify({ u: email, p: password}))
                    this.setState({
                        signedUp: true,
                        user: user
                    });
                }
                )
                //console.log('outside auth')
                .catch((err) => {
                    this.toggleLoader(false);
                    console.log(err)
                    this.setState({
                        errorMessage: err.message
                    })

                })



        }

        else {
            this.toggleLoader(true);
            Auth.confirmSignUp(email, confirmationCode)
                .then(() => {
                    this.toggleLoader(false);
                    console.log('confirmed signup')
                    // window.location.reload()
                    this.props.history.replace('/login' + this.props.history.location.hash);
                    // window.location.replace('http://localhost:3000')
                }
                )
                .catch(err => {
                    this.toggleLoader(false);
                    console.log(err)
                    this.setState({
                        errorConfirm: err.message
                    })


                });


        }
    };


    resendVerification(e) {
        e.preventDefault();
        const { email } = this.state;
        console.log('confirmation code send')
        this.toggleLoader(true);
        Auth.resendSignUp(email).then((resp) => {
            this.toggleLoader(false);
            this.setState({
                errorConfirm: ''
            })
        }).catch((err)=>{
            this.toggleLoader(false);
        });
    }


    getGeoInfo = () => {
        axios.get('https://ipapi.co/json/').then((response) => {
            if (response && response.data) {
                let data = response.data;
                console.log(data);
                this.setState({
                    countryCode: data.country_calling_code
                });
                this.toggleLoader(false);
            }

        }).catch((error) => {
            console.log(error);
        });
    };

    toggleLoader = (value) => {
        this.setState({
            showLoader: value
        })
    }

    getDecodeData = (value) => {
        axios.get(Configuration.baseUrl + '/encrypt/decryptData?state=' + value )
            .then(response => {
                this.toggleLoader(false);
                if(response.data.response){
                    this.setState({
                        notAuthorisedPerson : false
                    });

                    console.log('---------- setHours(0) --------------');
                    console.log(new Date(new Date().setHours(1)));

                    //cookies.set("STATE_PARAM", response.data.response, { path: '/', maxAge: 60  });//maxAge: 3600
                    sessionStorage.setItem('STATE_PARAM', JSON.stringify(response.data.response));
                    if(response.data.response && response.data.response.empid) {
                        axios.get(Configuration.agentURL + '/employer/getEmployerByEmpId/' + response.data.response.empid)
                            .then(response => {
                                sessionStorage.setItem('EMP_NAME', response.data.response ? response.data.response.companyName : '' )
                            });
                    }

                    console.log(sessionStorage.getItem("STATE_PARAM"));

                    if(response.data.response.isAgent){
                        this.props.history.replace('/');
                    }
                } else {
                    this.setState({
                        notAuthorisedPerson : true
                    });
                }
            });
    }

    getView() {
        const { signedUp, user, errorMessage, errorConfirm } = this.state;
        if(!this.state.notAuthorisedPerson) {
            if (signedUp) {

                return (
                    <div className="login">
                        <CssBaseline/>
                        <Container maxWidth="xs">
                            <Card className="login-card" style={{marginTop: "50px"}}>

                                <div className="logo">
                                    <img alt="logo" className="logo-custom" src={require('./images/auth-logo.jpg')}/>
                                </div>
                                <form className="main-form" onSubmit={this.handleSubmit}>

                                    <p>We have sent a verification code by
                                        email {user.codeDeliveryDetails.Destination} to. Enter it below to confirm your
                                        account.</p>
                                    <div className="a-form-ctrl">
                                        <p className="">Verification Code</p>
                                        <input
                                            className="a-input"
                                            type="text"

                                            name="confirmationCode"
                                            required
                                            onChange={this.handleChange1}
                                        />
                                    </div>
                                    <p className="a-errorMessage" hidden={errorConfirm.length <= 0}>
                                        {errorConfirm}
                                    </p>
                                    <div>
                                        <button type="submit" className="a-btn"
                                                disabled={this.state.confirmationCode.length <= 0}>
                                            Confirm Account
                                        </button>
                                        <p style={{textAlign: 'center'}}><span>Didn't receive a code?</span>&nbsp;
                                            <span className="forgot-pawd" onClick={this.resendVerification}>
                                                Resend MFA
                    </span></p>
                                    </div>
                                </form>

                            </Card>
                        </Container>
                    </div>
                );
            } else {
                let {passwordLength, containsNumbers, isUppercase, containsSymbols, isLowercase, password, errorMessage} = this.state;
                let btnStatus = passwordLength && containsNumbers && isUppercase && containsSymbols && isLowercase ? false : true;
                return (
                    <SignUpForm {...this.state} handleSubmit={this.handleSubmit} handleChange={this.handleChange}
                                handleChange1={this.handleChange1} handleChangePhone={this.handleChangePhone}
                                handleToggle={this.props.handleToggle}/>
                );
            }
        }else {
            return (
                <div>
                    <div style={{ marginTop: '30px', width: '95.2%', marginLeft: '2.4%', marginRight: '2.4%',}}>
                        <div style={{width : '55%', margin : '20%'}}>
                            <h4>Oops! Something's not right.</h4>
                            Please go back to the email and click on the link to self-enroll. If you're still having trouble, call us on (800) 921-4505.
                        </div>
                    </div>
                </div>
            )
        }
    }

    render() {
        return (
            <>
                {this.getView()}
                <Loader showLoader={this.state.showLoader} />
            </>
        )
    }
}

export default Signup;
