import React from 'react';
import Button from '@material-ui/core/Button';
import mainClasses from './Enrollment.css.js';
import Eligibility from './Eligibility';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Popover from '@material-ui/core/Popover';
import { createMuiTheme } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import SetupFamily from './SetupFamily';
import PlanSelection from './PlanSelection';
import SetupPayment from './SetupPayment';

import AutoMechanicPayment from './AutoMechanicPayment';

// import SubmitApplication from './SubmitApplication';
import SubmitApplication from './SubmitApplication_netwell';

import ViewQuote from './ViewQuote';
import { connect } from 'react-redux';
import Tooltip from '@material-ui/core/Tooltip';
import configuration from '../../../configurations';
import axios from 'axios';
import Loader from '../../loader';
import customStyle from '../../../Assets/CSS/stylesheet_UHS';
import Typography from "@material-ui/core/Typography";
import customeClasses from "./Eligibility.css";
import LinearProgress from "@material-ui/core/LinearProgress";
import i18n from '../../../i18next';
import Header from '../Headers/Header';
import { Auth } from "aws-amplify";
import ChatButton from "../../CommonScreens/ChatButton";
import Fab from "@material-ui/core/Fab";
import Configuration from "../../../configurations";
import Cookies from 'universal-cookie';
import {getPublicIP} from '../../authentication/utils';
import AddOnsScreen from "./Add-ons/addOnsScreen";
import ReviewChoice from './ReviewChoice/ReviewChoice'
import configurations from '../../../configurations';

  


global.Chat=0;

var brand = localStorage.getItem("Brand")

console.log("brand---",brand)
// if(brand == "netwell"){
//     const styles = theme => (
//         customStyle.netWellStyle
//     );
// }else{
//     const styles = theme => (
//         customStyle.defaultStyle
//     );
// }
const StyleTooltip = withStyles({
    tooltip: {
      color: "#000000",
      backgroundColor: "#ffffff",
      fontSize:'14px',
      textAlign:'left',
    //   width:'180px'
    }
  })(Tooltip);

const CustomTextField = withStyles(
    customStyle.textField,
)(TextField);

const CustomButton = withStyles(
    // customStyle.btn,
    customStyle.btnNetwell,

)(Button);

const WizardButton = withStyles(
    // customStyle.viewBtn
    customStyle.viewNetwellBtn
)(Button);

const CrudButton = withStyles(
    customStyle.crudBtn,
)(Fab);

const styles = theme => (
    // brand == "netwell" ?customStyle.netWellStyle: customStyle.defaultStyle
    customStyle.netWellStyle
);
const theme = createMuiTheme({
    spacing: 4
  });

const cookies = new Cookies();

class Enrollment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            completed: {},
            modalOpen: false,
            optReason: '',
            otherReason: '',
            currentUser: '',
            instructions: [],
            info:[],
            formValid: true,
            optReasonList: [],
            loaderShow: false,
            errorText : '',
            isValid : false,
            isReasonsReq : true,
            optFlag:false,
            count : 1,
            progress : 0,
            disOtReason : true,
            userLoggedIn : false,
            anchorEl: null, open: false,
            openedPopoverId:null,
            enrollFlag : false,
            paymentFlag : false,
            isAgent : false,
            STATE_PARAM : {},
            agentLoggedIn : false,
            notAuthorisedPerson : false,
            notHL: null,
            isChangeProgram:false,
            ChangeProgramCount: [],
            isHouseholdUpdate:false,
            HouseholdUpdateCount: [],
            reenrollmentFlag:false,
        };
        this.checkForAddOnStep= this.checkForAddOnStep.bind(this)
    }

    getSteps() {
        if(this.state.notHL && (this.state.STATE_PARAM.clientId !== '1004' || this.state.STATE_PARAM.clientId !== 1004)){
        return [
            'Instructions',
            'Set up Family',
            'View Quote',
            'Check Eligibility',
            'Select Program',
            'Select Add-Ons',
            'Review',
            /*'Select Add-Ons',*/ //commented change for add-ons 30-March
            'Set up Payment',
            'Submit Application'
        ]
    }else if(this.state.notHL && (this.state.STATE_PARAM.clientId !== '1004' || this.state.STATE_PARAM.clientId !== 1004)){
            return [
                'Instructions',
                'Set up Family',
                'View Quote',
                'Check Eligibility',
                'Select Program',
                'Select Add-Ons',
                'Review',
                /*'Select Add-Ons',*/ //commented change for add-ons 30-March
                // 'Confirm Withholding',
                "Employer Withholding",
                'Submit Application'
            ]
        }
       
        else{
            return [
                'Instructions',
                'Set up Family',
                'View Quote',
                'Check Eligibility',
                'Select Program',
                'Review',
                /*'Select Add-Ons',*/ //commented change for add-ons 30-March
                'Set up Payment',
                'Submit Application'
            ]
        }
    };

    flipOpen = () => this.setState({ ...this.state, open: !this.state.open });
    handleClick = event => {
      this.state.ancherEl
        ? this.setState({ anchorEl: null })
        : this.setState({ anchorEl: event.currentTarget });
      this.flipOpen();
    };

    handlePopoverOpen(event, popoverId) {
        this.setState({
          openedPopoverId: popoverId,
          anchorEl: event.target,
        });
    }

    handlePopoverClose() {
        this.setState({
          openedPopoverId: null,
          anchorEl: null,
        });
    }

    redirectToPayment (event) {
        let activeStep = this.state.notHL ? 7 : 6;  //5 commented change for add-ons 30-March activestep = 6
        const steps = this.getSteps().length;
        if (this.state.activeStep < steps - 1) {
            this.setState({
                activeStep : activeStep
            });
        } else {
            this.setState({
                activeStep : activeStep
            });
        }
    }
    autoLoginreEnrollCheck=(data)=>{
        let URLs=Configuration.baseUrl + '/setupfamily/getEnrollFlag/' + data;
        let autoLogin = sessionStorage.getItem("autoLogin");
        axios.get(URLs)
        .then(response => {
            if((response.data.response.enrollFlag === true || response.data.response.enrollFlag === 'true') && (autoLogin === true || autoLogin === "true")){
                 sessionStorage.setItem("reenrollmentFlag", response.data.response.enrollFlag);
                 this.setState({isHouseholdUpdate:true})
                    axios.get(Configuration.baseUrl + '/setupfamily/getMemberInfo/' + response.data.response.subId)
                    .then(res => {
                    if (res && res.data.response) {
                        let data = res.data.response;
                        let obj={
                        memberId: data.id,
                        reenrollmentFlag: response.data.response.enrollFlag,
                        fromLogin: true,
                        }
                            sessionStorage.setItem('STATE_PARAM', JSON.stringify(obj));
                        }
                    })
                        
                    }
          })  
    }
    componentWillMount() {
        
      
      }
    componentDidMount() {
        if(localStorage.getItem("Brand")=="netwell"){
            console.log("enroll for netwell")
        }
        window.addEventListener('SubmitApl',this.SubmitApplictaion);
        window.addEventListener('enroll_flag',this.enrollment);
        window.addEventListener('paymentFlag',this.payment);
        window.addEventListener('redirect_to_payment', this.redirectToPayment.bind(this));
        window.scrollTo(0,0)
        getPublicIP();
        this.setState({
            loaderShow: true
        });
        let isAgent
        let cookiesData = JSON.parse(sessionStorage.getItem('STATE_PARAM'))//cookies.get('STATE_PARAM', false);
        console.log("cookiesData----",cookiesData)
        if(cookiesData && cookiesData.isSelectProgram){
            this.setState({isChangeProgram:true}) // for go to step select program
        }
        if(cookiesData && cookiesData.isHouseholdUpdate){
            this.setState({isHouseholdUpdate:true}) // for go to setup family
        }
       this.autoLoginreEnrollCheck(sessionStorage.getItem("userMail"));
        if(cookiesData && cookiesData.isAgent || cookiesData && cookiesData.fromMember){
            // isAgent=true
            this.setState({
                agentLoggedIn : true,
                userLoggedIn : false,
                isAgent : true
            });
            let URL=''
            let subId=localStorage.getItem("cognitoUsername")
            if(cookiesData.isAgent){
                URL=configuration.baseUrl + '/setupfamily/getMemberBySubID/'+cookiesData.subID
            }else{
                URL=configuration.baseUrl + '/setupfamily/getMemberByEmail/'+cookiesData.user_subId
            }
            axios.get(URL)
                .then(response => {
                    if(response.data.response){
                        let data = JSON.parse(JSON.stringify(response.data.response));
                        this.setState({
                            currentUser : data.firstName ? data.firstName + ' ' + data.lastName : ''
                        });
                        this.props.setSubId(data.subId, data.email, data.firstName + ' ' + data.lastName);
                        let obj = {
                            userName: data.firstName + ' ' + data.lastName,
                            id: data.subId,
                            email: data.email,
                            phone : data.phone
                        };
                        localStorage.setItem('CurrentLoginUser', JSON.stringify(obj));
                        sessionStorage.setItem('userMail', data.email);
                    }
                    this.getEnrollFlag(cookiesData.user_subId);
                });
        } else {
            Auth.currentAuthenticatedUser()
                .then((user) => {
                    let data = this.parseJwt(user.signInUserSession.idToken.jwtToken);
                    this.getUserDataByEmail(data);
                    let currentUser = localStorage.getItem('currentUser');
                    this.setState({
                        currentUser: currentUser,
                        userLoggedIn: true,
                        agentLoggedIn : false,
                        isAgent : false
                    });
                    sessionStorage.setItem('isAgent', "false");
                    let STATE_PARAM = JSON.parse(sessionStorage.getItem('STATE_PARAM'));//cookies.get('STATE_PARAM', false);
                    let cl = sessionStorage.getItem('CLIENT_ID');
                    if(STATE_PARAM && !cl){
                        let emailData = JSON.parse(localStorage.getItem('CurrentLoginUser'));
                        let phone = localStorage.getItem('phone');

                        let obj = new Object();
                        obj.email = emailData.email;
                        obj.phone = phone;
                        obj.brokerId = STATE_PARAM.brokerId;
                        obj.associationId = STATE_PARAM.associationId;
                        obj.clientId = STATE_PARAM.clientId;
                        obj.subId = emailData.id;
                        obj.userName = emailData.userName;
                        obj.empid = STATE_PARAM.empid ? STATE_PARAM.empid : null;
                        console.log("addMemberInfo===getEnrollFlag",obj)
                        axios.post(Configuration.baseUrl + '/setupfamily/addMemberInfo', obj)
                            .then(response => {
                                
                                this.getEnrollFlag(data);
                            });
                    } else {
                        this.getEnrollFlag(data);
                    }

                }).catch((err)=>{
                sessionStorage.setItem('isLogged', false);
                this.props.history.push("/quick_quote");
                this.setState({
                    loaderShow: false,
                    userLoggedIn: false
                })
            })
        }
    }

   checkForAddOnStep=(clientId)=>{
    axios.get(configurations.baseUrl+'/addon/getAddonListByClient/'+clientId)
    .then(response=>{
        this.setState({
            notHL:  response.data.response.length > 0,
            ChangeProgramCount: response.data.response.length > 0 ? [5, 6, 7, 8] : [4, 5, 6, 7], // 21 may add 7 & 6
            HouseholdUpdateCount: response.data.response.length > 0 ?  [1, 2 ,3 ,4, 5, 6, 7, 8] : [1, 2 ,3 ,4, 5, 6, 7], // 21 may add 7 & 6
        })
        sessionStorage.setItem("notHLC", response.data.response.length > 0)
    })

   }

    getEnrollFlag = (data) => {    
        console.log("getenrolby flag====",data)    
        let URL=''
        if(this.state.isAgent){
            let cookiesData = JSON.parse(sessionStorage.getItem('STATE_PARAM'))
            URL=configuration.baseUrl + '/setupfamily/getEnrollFlagBySubId/'+cookiesData.subID
        }else{
            URL=configuration.baseUrl + '/setupfamily/getEnrollFlag/' + data
        }
        axios.get(URL)
            .then(response => {
                if(response.data.response){
                    let enFlag = response.data.response.enrollFlag;
                    let paymentFlag = response.data.response.paymentFlag;
                    let completionStatus = response.data.response.completionStatus;
                    let clientId = response.data.response.clientId;
                    let chatBoxId = response.data.response.chatBoxId;
                    let agentFlag = response.data.response.agentFlag;
                    let reenrollmentFlag = response.data.response.reenrollmentFlag

                    sessionStorage.setItem('EMP_NAME', (response.data.response && response.data.response.companyName )? response.data.response.companyName : '');

                    this.setState({
                        STATE_PARAM : {
                            brokerId : response.data.response.brokerId,
                            associationId : response.data.response.associationId,
                            clientId : response.data.response.clientId
                        },
                        reenrollmentFlag : response.data.response.reenrollmentFlag,
                    });

                    if(!this.state.isAgent){
                        if(!clientId){
                            sessionStorage.setItem('CHAT_BOX_Id', configuration.chat_Box_Id);
                            window.location.reload();
                        } else if(clientId){
                            if(sessionStorage.getItem('CHAT_BOX_Id')){
                                if(sessionStorage.getItem('CHAT_BOX_Id') === null){
                                    sessionStorage.setItem('CHAT_BOX_Id', chatBoxId);
                                    window.location.reload();
                                }
                            } else {
                                sessionStorage.setItem('CHAT_BOX_Id', chatBoxId);
                                window.location.reload();
                            }
                        }
                    }
                    this.checkForAddOnStep(clientId);
                    sessionStorage.setItem('CLIENT_ID', clientId)
                    if(this.state.isChangeProgram){
                        this.setState({
                            // activeStep: 5,// jump to 5 for change addons
                            activeStep: 4,
                            loaderShow: false,
                            /*optFlag:true,*/
                            enrollFlag: enFlag,
                            paymentFlag : paymentFlag,
                        });
                    }
                    else if(this.state.isHouseholdUpdate){
                        this.setState({
                            activeStep: (enFlag === true && !this.state.isAgent) ? parseInt(completionStatus): 1,
                            loaderShow: false,
                            /*optFlag:true,*/
                            enrollFlag: enFlag,
                            paymentFlag : paymentFlag,
                        });
                    }
                    else if(sessionStorage.getItem('isEditCensus') == true || sessionStorage.getItem('isEditCensus') == 'true'){
                        
                        //sessionStorage.setItem('prev_current_screen', completionStatus);
                        sessionStorage.setItem('current_screen', "1");
                        this.setState({
                            activeStep: 1,
                            loaderShow: false,
                            /*optFlag:true,*/
                            enrollFlag: enFlag,
                            paymentFlag : paymentFlag
                        });
                        
                    } else {

                        if (enFlag === false && paymentFlag === false && completionStatus === '0') {
                            sessionStorage.setItem('current_screen', "0");
                            axios.get(configuration.baseUrl + '/instruction/getInstruction/' + clientId)
                                .then(response => {
                                    this.setState({
                                        instructions: response.data.response,
                                        loaderShow: false,
                                        progress: this.state.count / response.data.response.length * 100,
                                        enrollFlag: enFlag,
                                        paymentFlag : paymentFlag,
                                        activeStep: 0,
                                    });
                                })
                                .catch(error => {
                                    console.log(error);
                                })
                        } else if(!paymentFlag && enFlag){
                            const steps = this.getSteps().length;
                            this.setState({
                                activeStep: 6,
                                loaderShow: false,
                                enrollFlag: enFlag,
                                paymentFlag : paymentFlag
                            });
                        } else if(completionStatus) {
                            if(completionStatus === '6' && !enFlag && !paymentFlag){
                                /*if(agentFlag){
                                    this.setState({
                                        activeStep: 6,
                                        loaderShow: false,
                                        enrollFlag: enFlag,
                                        paymentFlag : paymentFlag
                                    });
                                } else {
                                    this.setState({
                                        activeStep: 6,
                                        loaderShow: false,
                                        enrollFlag: enFlag,
                                        paymentFlag : paymentFlag
                                    });
                                }*/
                                this.setState({
                                    activeStep: 6,
                                    loaderShow: false,
                                    enrollFlag: enFlag,
                                    paymentFlag : paymentFlag
                                });
    
                            } else if(!enFlag && !paymentFlag){
                                this.setState({
                                    activeStep: parseInt(completionStatus),
                                    loaderShow: false,
                                    /*optFlag:true,*/
                                    enrollFlag: enFlag,
                                    paymentFlag : paymentFlag
                                });
                            }else if(enFlag && paymentFlag && this.state.isChangeProgram){
                                this.setState({
                                    activeStep: 4,
                                    loaderShow: false,
                                    /*optFlag:true,*/
                                    enrollFlag: enFlag,
                                    paymentFlag : paymentFlag
                                });
                            }else if(enFlag && paymentFlag && this.state.isHouseholdUpdate){
                                this.setState({
                                    activeStep: 1,
                                    loaderShow: false,
                                    /*optFlag:true,*/
                                    enrollFlag: enFlag,
                                    paymentFlag : paymentFlag
                                });
                            }else if(enFlag && paymentFlag && reenrollmentFlag ){
                                this.setState({
                                    activeStep: parseInt(completionStatus),
                                    loaderShow: false,
                                    /*optFlag:true,*/
                                    enrollFlag: enFlag,
                                    paymentFlag : paymentFlag
                                });
                            } else {
                                const steps = this.getSteps().length;
                                this.setState({
                                    activeStep: completionStatus,
                                    loaderShow: false,
                                    /*optFlag:true,*/
                                    enrollFlag: enFlag,
                                    paymentFlag : paymentFlag
                                });
                            }
                        } else {
                            const steps = this.getSteps().length;
                            this.setState({
                                activeStep: steps - 1,
                                loaderShow: false,
                                /*optFlag:true,*/
                                enrollFlag: enFlag,
                                paymentFlag : paymentFlag
                            });
                        }

                    }

                    
                } else {
                    this.setState({
                        notAuthorisedPerson : true,
                        loaderShow: false
                    });
                }
            })
            .catch(error => {
                console.log(error);
            })

    }

    getUserDataByEmail = (email) =>{
        let cookiesData = JSON.parse(sessionStorage.getItem('STATE_PARAM'))//cookies.get('STATE_PARAM', false);

        let URL=''
        //let subId=localStorage.getItem("cognitoUsername")
        if(cookiesData && cookiesData.isAgent){
            URL=configuration.baseUrl + '/setupfamily/getMemberBySubID/' +cookiesData.subID
        }else{
           URL= configuration.baseUrl + '/setupfamily/getMemberByEmail/' + email
        }
        axios.get(URL)
            .then(response => {
                if(response.data.response){
                    let data = JSON.parse(JSON.stringify(response.data.response));
                    this.props.setSubId(data.subId, data.email, data.firstName + ' ' + data.lastName);
                    let obj = {
                        userName: data.firstName + ' ' + data.lastName,
                        id: data.subId,
                        email: data.email,
                        phone : data.phone
                    };
                    localStorage.setItem('CurrentLoginUser', JSON.stringify(obj));
                }
            });
    }

    enrollment = (event) =>{
        this.setState({enrollFlag : event.detail.flag});
    };

    payment = (event) =>{
        this.setState({paymentFlag : event.detail.flag});
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
        localStorage.setItem('userMail', token.email);
        sessionStorage.setItem('userMail', token.email);

        localStorage.setItem('subscriberName', token.name);

        localStorage.setItem('phone', token.phone_number);

        localStorage.setItem('cognitoUsername',token['cognito:username']);
        localStorage.setItem('currentUser',token.given_name + ' ' + token.family_name);

        localStorage.setItem('isLogged', true);
        sessionStorage.setItem('isLogged', true);
        localStorage.setItem('CurrentLoginUser', JSON.stringify(token));

        this.props.setSubId(token.subId, token.email, token.firstName + ' ' + token.lastName);
        let obj = {
            userName: token.firstName + ' ' + token.lastName,
            id: token.sub,
            email: token.email,
            phone : token.phone
        };
        localStorage.setItem('CurrentLoginUser', JSON.stringify(obj));
        return token.email;
    };


    SubmitApplictaion=(event)=>{
        this.setState({optFlag : event.detail.flag});
    }  
// 21 may  comment section +2 
    handleNext = (datas) => {  
        if(datas)
        axios.post(configuration.baseUrl+"/questionbank/saveWaitingPeriodSummary", datas).then((response) => {
            console.log("=========responsefromeli",response)
        })
        // if(this.state.isChangeProgram || this.state.isHouseholdUpdate){//ReEnrollment
        //         if(this.state.activeStep === 6 && this.state.notHL)
        //             this.setState({
        //                 activeStep: this.state.activeStep + 2
        //             });
        //         else  if(this.state.activeStep === 5 && !this.state.notHL)
        //             this.setState({
        //                 activeStep: this.state.activeStep + 2
        //             });
        //         else{
        //             let activeStep;
        //             activeStep = this.state.activeStep + 1;
        //             const steps = this.getSteps().length;
        //             if (this.state.activeStep < steps - 1) {
        //                 this.setState({
        //                     activeStep
        //                 });
        //             } else {
        //                 this.setState({
        //                     activeStep
        //                 });
        //             }
        //         }
        // }else{
        let activeStep;
        activeStep = this.state.activeStep + 1;
        console.log("activestep---",this.state.activeStep)
        const steps = this.getSteps().length;
        if (this.state.activeStep < steps - 1) {
            this.setState({
                activeStep
            });
        } else {
            this.setState({
                activeStep
            });
        }
    // }
    };
    handlejumpfive=()=>{
        let activeStep;
        activeStep = this.state.activeStep - 1;
        const steps = this.getSteps().length;
        if (this.state.activeStep < steps - 1) {
            this.setState({
                activeStep
            });
        } else {
            this.setState({
                activeStep
            });
        }
    }
    handlePrevious = () => {
        console.log('============== handlePrevious =================');
        console.log(this.state.activeStep);
        let activeStep;
        activeStep = this.state.activeStep - 1;
        this.setState({
            activeStep
        });
    }


    handleStep = step => () => {
        let cookiesData = JSON.parse(sessionStorage.getItem('STATE_PARAM'))
        if(this.state.isChangeProgram){//ReEnrollment
            for(var i = 0; i < this.state.ChangeProgramCount.length; i++)
                if(this.state.ChangeProgramCount[i] === step && this.state.activeStep > step)
                this.setState({
                    activeStep: this.state.ChangeProgramCount[i],
                    count : 1,
                    progress : (1) / this.state.instructions.length * 100,
                    openedPopoverId: null,
                    anchorEl: null,
                })
        }else if(this.state.isHouseholdUpdate && (this.state.reenrollmentFlag || (cookiesData && (cookiesData.fromMember || cookiesData.isAgent)))){//ReEnrollment
            for(var i = 0; i < this.state.HouseholdUpdateCount.length; i++)
                if(this.state.HouseholdUpdateCount[i] === step && this.state.activeStep > step)
                this.setState({
                    activeStep: this.state.HouseholdUpdateCount[i],
                    count : 1,
                    progress : (1) / this.state.instructions.length * 100,
                    openedPopoverId: null,
                    anchorEl: null,
                })
        }else{
            if(step === 0){
                sessionStorage.setItem('current_screen', "0");
            }
            if(step === 0 && !this.state.enrollFlag && this.state.instructions.length === 0){
                this.setState({
                    loaderShow: true
                })
                    axios.get(configuration.baseUrl + '/instruction/getInstruction/' + sessionStorage.getItem('CLIENT_ID') )
                    .then(response => {
                        this.setState({
                            instructions : response.data.response,
                            loaderShow: false,
                            progress : this.state.count / response.data.response.length * 100,
                        });
                    })
                    .catch(error => {
                        console.log(error);
                    });
            }

        if (this.state.activeStep > step) {
            if(this.state.enrollFlag && this.state.paymentFlag){
                this.setState({
                    activeStep: this.state.activeStep,
                    openedPopoverId: null,
          			anchorEl: null,
                });
            } else if(!this.state.paymentFlag && this.state.enrollFlag) {
                localStorage.removeItem('PAYMENT_ERROR');
                this.setState({
                    activeStep: 6,
                    openedPopoverId: null,
                    anchorEl: null,
                })
            } else {
                localStorage.removeItem('PAYMENT_ERROR');
                this.setState({
                    activeStep: step,
                    count : 1,
                    progress : (1) / this.state.instructions.length * 100,
                    openedPopoverId: null,
          			anchorEl: null,
                });
            }
        }  }
    };

    handleOpen = () => {
        this.setState({
            modalOpen: true,
            loaderShow: true
        });
        fetch(configuration.baseUrl + '/enrollment/getOptoutReasons')
            .then((response) => response.json())
            .then(response => {
                if (response.response) {
                    this.setState({
                        optReasonList: response.response,
                        modalOpen: true,
                        optReason: '',
                        otherReason: '',
                        formValid : true,
                        loaderShow: false,
                        disOtReason : true,
                    });
                }
            })
            .catch(error => {
                this.setState({
                    modalOpen: true,
                    loaderShow: false,
                    optReason: '',
                    otherReason: '',
                    formValid : true,
                    disOtReason : true
                });
            })

    };

    optoutCancelHandler = () => {
        this.state.optReason = '';
        this.state.otherReason = '';
        this.state.modalOpen = false;
        this.setState({
            refresh: true,
        })
    }



    optoutSubmitHandler = () => {
        let data = {
            subId: this.props.subId,
            optReason: this.state.optReason,
            otherReason: this.state.otherReason
        };
        this.setState({
            loaderShow: true
        })
        axios.post(configuration.baseUrl + '/enrollment/saveMemberOptout', data)
            .then(response => {
                this.state.modalOpen = false;
                this.setState({
                    modalOpen: false,
                    loaderShow: false,
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    handleClose = () => {
        this.setState({
            refresh: true,
            modalOpen : false
        })
    };

    otherOptingReasonChangeHandler = (event,name) => {
        event.preventDefault();
        let txtVal = event.target.value;

        if(txtVal !== '' && this.state.isReasonsReq){
            if (txtVal.match(/^[a-zA-Z ]*$/)) {
                this.setState({ errorText: '', isValid : false, otherReason : txtVal, formValid : false});
            } else {
                this.setState({errorText : 'Please enter valid reason', isValid : true, otherReason : txtVal, formValid : true});
            }
        } else {
            if(this.state.isReasonsReq){
                this.setState({errorText : 'Reason is required', isValid : true, otherReason : txtVal, formValid : true});
            } else {
                this.setState({errorText : '', isValid : false, otherReason : txtVal, formValid : false});
            }
        }
    }

    optingReasonChangeHandler = (event, name) => {
        let value = event.target.value;
        let opText = this.state.optReasonList.find((obj) => obj.id == value);

        this.state[name] = value;        
        if(opText && (opText.reasondCode === 'None' || opText.reasondCode === 'Prefer not to answer' || opText.reasondCode === 'Other reason')){
            this.setState({
                isReasonsReq : false,
                formValid : false,
                optReason : value,
                isValid : false,
                errorText : '',
                disOtReason : false
            })
        } else  {
            this.setState({
                isReasonsReq : true,
                formValid : true,
                optReason : value,
                isValid : false,
                disOtReason : false
            })
        }
    }


    jumpsetupfamily = () =>{
        this.setState ({
            activeStep: 1,
        })
    }

    jumptoexit = () =>{
            window.close()
    }

    reduceProgress = () => {
        if (this.state.count > 1) {
            this.setState({
                count: this.state.count - 1,
                progress: (this.state.count - 1) / this.state.instructions.length * 100
            });
        }
    }

    increaseProgress = () => {
        if (this.state.count < this.state.instructions.length) {
            this.setState({
                count: this.state.count + 1,
                progress: (this.state.count + 1) / this.state.instructions.length * 100
            });
        }
    }

    render() {
        const { classes } = this.props;
        console.log("classes---",this.props)
        const open = this.state.anchorEl === null ? false : true;
        const id = this.state.open ? "simple-popper" : null;
        const { anchorEl, openedPopoverId } = this.state;
        const multi = this.state.notHL && (this.state.STATE_PARAM.clientId !== 1004 || this.state.STATE_PARAM.clientId !== '1004')? [
          {
            _id: 0,
            name: 'Instructions',
            hoverText: "How to navigate and what you’ll need.",
           
          },
          {
            _id: 1,
            name: 'Set up Family',
            hoverText: "Tell us who is joining the program.",
           
          },
          {
            _id: 2,
            name: 'View Quote',
            hoverText: "We’ll provide a quote based on what you’ve told us so far.",
           
          },
          {
            _id: 3,
            name: 'Check Eligibility',
            hoverText: "Medical questions to confirm everyone is eligible for health sharing.",
           
          },
          {
            _id: 4,
            name: 'Select Program',
            hoverText: "Choose the sharing program that’s best for you.",
            
          },
            //commented change for add-ons 30-March
            {
                _id: 5,
                name: 'Select Add-Ons',
                hoverText: "Choose the add-ons that’s best for you.",

            },
            {
                _id: 6,
                name: 'Review Choices',
                hoverText: "Review the add-ons Choose that’s best for you.",

            },
          { // 21 may
            _id: 7,
            name: this.state.isChangeProgram || this.state.isHouseholdUpdate ? 'Confirm Payment' :'Set up Payment',
            hoverText: "Tell us how you want to make payments for health sharing.",
            
          },
          {
            _id: 8,
            name: 'Submit Application',
            hoverText: "Privacy and compliance questions and the final submission of your application.",
            
          },

        ]
         :
         this.state.notHL && (this.state.STATE_PARAM.clientId == 1004 || this.state.STATE_PARAM.clientId == '1004')? [
            {
              _id: 0,
              name: 'Instructions',
              hoverText: "How to navigate and what you’ll need.",
             
            },
            {
              _id: 1,
              name: 'Set up Family',
              hoverText: "Tell us who is joining the program.",
             
            },
            {
              _id: 2,
              name: 'View Quote',
              hoverText: "We’ll provide a quote based on what you’ve told us so far.",
             
            },
            {
              _id: 3,
              name: 'Check Eligibility',
              hoverText: "Medical questions to confirm everyone is eligible for health sharing.",
             
            },
            {
              _id: 4,
              name: 'Select Program',
              hoverText: "Choose the sharing program that’s best for you.",
              
            },
              //commented change for add-ons 30-March
            //   {
            //       _id: 5,
            //       name: 'Select Add-Ons',
            //       hoverText: "Choose the add-ons that’s best for you.",
  
            //   },
              {
                  _id: 5,
                  name: 'Review Choices',
                  hoverText: "Review the add-ons Choose that’s best for you.",
  
              },
            { // 21 may
              _id: 6,
              name: 'Employer Withholding',
              hoverText: "Tell us how you want to make payments for health sharing.",
              
            },
            {
              _id: 7,
              name: 'Submit Application',
              hoverText: "Privacy and compliance questions and the final submission of your application.",
              
            },
  
          ]
          :
          !this.state.notHL && (this.state.STATE_PARAM.clientId == 1004 || this.state.STATE_PARAM.clientId == '1004')? [
            {
              _id: 0,
              name: 'Instructions',
              hoverText: "How to navigate and what you’ll need.",
             
            },
            {
              _id: 1,
              name: 'Set up Family',
              hoverText: "Tell us who is joining the program.",
             
            },
            {
              _id: 2,
              name: 'View Quote',
              hoverText: "We’ll provide a quote based on what you’ve told us so far.",
             
            },
            {
              _id: 3,
              name: 'Check Eligibility',
              hoverText: "Medical questions to confirm everyone is eligible for health sharing.",
             
            },
            {
              _id: 4,
              name: 'Select Program',
              hoverText: "Choose the sharing program that’s best for you.",
              
            },
              //commented change for add-ons 30-March
              
              {
                  _id: 5,
                  name: 'Review Choices',
                  hoverText: "Review the add-ons Choose that’s best for you.",
  
              },
            { // 21 may
              _id: 6,
              name: 'Employer Withholding',
              hoverText: "Tell us how you want to make payments for health sharing.",
              
            },
            {
              _id: 7,
              name: 'Submit Application',
              hoverText: "Privacy and compliance questions and the final submission of your application.",
              
            },
  
          ]
          :
         [
            {
              _id: 0,
              name: 'Instructions',
              hoverText: "How to navigate and what you’ll need.",
             
            },
            {
              _id: 1,
              name: 'Set up Family',
              hoverText: "Tell us who is joining the program.",
             
            },
            {
              _id: 2,
              name: 'View Quote',
              hoverText: "We’ll provide a quote based on what you’ve told us so far.",
             
            },
            {
              _id: 3,
              name: 'Check Eligibility',
              hoverText: "Medical questions to confirm everyone is eligible for health sharing.",
             
            },
            {
              _id: 4,
              name: 'Select Program',
              hoverText: "Choose the sharing program that’s best for you.",
              
            },
            {
                _id: 5,
                name: 'Review Choices',
                hoverText: "Review the add-ons Choose that’s best for you.",

            },
              //commented change for add-ons 30-March
            { // 21 may
              _id: 6,
              name: this.state.isChangeProgram || this.state.isHouseholdUpdate ? 'Confirm Payment' :'Set up Payment',
              hoverText: "Tell us how you want to make payments for health sharing.",
              
            },
            {
              _id: 7,
              name: 'Submit Application',
              hoverText: "Privacy and compliance questions and the final submission of your application.",
              
            },
  
          ]

        
    
        const steps = this.getSteps();
        const { activeStep } = this.state;
        let currentScreen;
        if (this.state.activeStep === 0) {
            currentScreen = <div>
                <Typography variant="h6" component="h3" >
                    {/*{i18n.t('ENROLLMENT.INST')}*/}
                    {(this.state.instructions && this.state.instructions.length > 0) && <div style={{fontFamily : 'Roboto, Arial, Helvetica, sans-serif', }} dangerouslySetInnerHTML={{ __html: this.state.instructions[this.state.count - 1].title}} />}
                </Typography>
                <LinearProgress variant="determinate"  value={this.state.progress} classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} style={classes.progress} />
                <div>
                    {
                        <div style={customStyle.pB35}>{ (this.state.instructions && this.state.instructions.length > 0) && <div dangerouslySetInnerHTML={{ __html: this.state.instructions[this.state.count - 1].description}} />}</div>
                    }
                    {
                        this.state.instructions.length > 1 &&
                        <div style={{display : 'inline'}}>
                            <WizardButton
                                variant="contained" style={this.state.count === 1 ? customeClasses.disabledButton : customeClasses.button}
                                disabled={this.state.count === 1 ? true : false} onClick={this.reduceProgress}>{i18n.t('BUTTON.BACK')}
                            </WizardButton>

                            <WizardButton
                                variant="contained" style={this.state.count === this.state.instructions.length  ? customeClasses.disabledButton : customeClasses.button}
                                disabled={this.state.count === this.state.instructions.length ? true : false}
                                onClick={this.increaseProgress}>{i18n.t('BUTTON.NEXT')}</WizardButton>
                        </div>
                    }


                    <CustomButton
                        variant="contained"
                        color="primary"
                        disabled={this.state.count === this.state.instructions.length  ? false : true}
                        onClick={this.handleNext}
                        style={this.state.count === this.state.instructions.length  ?  customeClasses.button:customeClasses.disabledButton}
                   //     style={mainClasses.startBtn}
                    >{i18n.t('BUTTON.START')}</CustomButton>
                </div>
            </div>
        } else if (this.state.activeStep === 1) {
            currentScreen = <SetupFamily onClick={() =>this.handleNext()} reEnroll={this.state.isChangeProgram || this.state.isHouseholdUpdate}></SetupFamily>;
        } else if (this.state.activeStep === 2) {
            currentScreen = <ViewQuote onClick={() =>this.handleNext()} agentDetails={this.state.STATE_PARAM} reEnroll={this.state.isChangeProgram || this.state.isHouseholdUpdate}></ViewQuote>
        } else if (this.state.activeStep === 3) {
            currentScreen = <Eligibility isAgent={this.state.isAgent} onClick={this.handleNext} jumpsetupfamily={this.jumpsetupfamily} jumptoexit={this.jumptoexit} reEnroll={this.state.isChangeProgram || this.state.isHouseholdUpdate}></Eligibility>;
        } else /*if (this.state.activeStep === 4) {
            currentScreen = <EnrollFamily onClick={this.handleNext}></EnrollFamily>
        } else*/ if (this.state.activeStep === 4) {
            currentScreen = <PlanSelection onClick={() =>this.handleNext()} isChangeProgram = {this.state.isChangeProgram} isHouseholdUpdate = {this.state.isHouseholdUpdate}></PlanSelection>;
        } /*else if (this.state.activeStep === 5) { //commented change for add-ons 30-March // once u enable the add-ons need to update current_screen value for setup payment and submit application
            currentScreen = <AddOnsScreen onClick={this.handleNext}></AddOnsScreen>;
        }*/ 
        else if (this.state.activeStep === 5 && this.state.notHL) { //commented change for add-ons 30-March // once u enable the add-ons need to update current_screen value for setup payment and submit application
            currentScreen = <AddOnsScreen onClick={this.handleNext}></AddOnsScreen>;
        }
        else if (this.state.activeStep === 6  && this.state.notHL) { //commented change for add-ons 30-March // once u enable the add-ons need to update current_screen value for setup payment and submit application
            currentScreen = <ReviewChoice clientId={this.state.STATE_PARAM.clientId} reEnroll={this.state.isChangeProgram || this.state.isHouseholdUpdate} showHL= {this.state.notHL} onClickjumpfive={this.handlejumpfive} onClick={this.handleNext}></ReviewChoice>;
        }
        else if (this.state.activeStep === 5  && !this.state.notHL) { //commented change for add-ons 30-March // once u enable the add-ons need to update current_screen value for setup payment and submit application
            currentScreen = <ReviewChoice clientId={this.state.STATE_PARAM.clientId} reEnroll={this.state.isChangeProgram || this.state.isHouseholdUpdate} showHL= {this.state.notHL} onClickjumpfive={this.handlejumpfive} onClick={this.handleNext}></ReviewChoice>;
        }
        else if (this.state.activeStep === 7 && this.state.notHL ) { // 21 may
            if(this.state.STATE_PARAM.clientId == '1004' || this.state.STATE_PARAM.clientId ==1004){
                currentScreen =<AutoMechanicPayment clientId={this.state.STATE_PARAM.clientId} isChangeProgram = {this.state.isChangeProgram} showHL= {this.state.notHL} reEnroll={this.state.isChangeProgram || this.state.isHouseholdUpdate} isHouseholdUpdate = {this.state.isHouseholdUpdate} isAgent={this.state.isAgent} onClick={this.handleNext}/>
            }else{
                currentScreen = <SetupPayment clientId={this.state.STATE_PARAM.clientId} isChangeProgram = {this.state.isChangeProgram} showHL= {this.state.notHL} reEnroll={this.state.isChangeProgram || this.state.isHouseholdUpdate} isHouseholdUpdate = {this.state.isHouseholdUpdate} isAgent={this.state.isAgent} onClick={this.handleNext}></SetupPayment>;

            }
        }
        else if (this.state.activeStep === 6 && !this.state.notHL) { // 21 may
            if(this.state.STATE_PARAM.clientId == '1004' || this.state.STATE_PARAM.clientId ==1004){
                currentScreen =<AutoMechanicPayment clientId={this.state.STATE_PARAM.clientId} isAgent={this.state.isAgent} showHL= {this.state.notHL} isChangeProgram = {this.state.isChangeProgram} reEnroll={this.state.isChangeProgram || this.state.isHouseholdUpdate} isHouseholdUpdate = {this.state.isHouseholdUpdate} onClick={this.handleNext}/>
            }else{
                currentScreen = <SetupPayment clientId={this.state.STATE_PARAM.clientId} isAgent={this.state.isAgent} showHL= {this.state.notHL} isChangeProgram = {this.state.isChangeProgram} reEnroll={this.state.isChangeProgram || this.state.isHouseholdUpdate} isHouseholdUpdate = {this.state.isHouseholdUpdate} onClick={this.handleNext}></SetupPayment>;

            }
        }
        else if (this.state.activeStep === this.state.notHL ? 8 :7 || this.state.activeStep === this.state.notHL ? 9 :8) {
            currentScreen = <SubmitApplication clientId={this.state.STATE_PARAM.clientId} empID={this.state.STATE_PARAM.empid} isAgent={this.state.isAgent} onClick={this.handleNext} handlePrev={this.handlePrevious} agentDetails={this.state.STATE_PARAM} reEnroll={this.state.isChangeProgram || this.state.isHouseholdUpdate}></SubmitApplication>;
        }
// 21 may
        var enables = 
            this.state.isChangeProgram ?
                this.state.notHL ?[false, false, false, false, false, true, true, true, true] : [false, false, false, false, true, true, true, true] : 
            this.state.isHouseholdUpdate ?
                this.state.notHL ? [false, true, true, true, true, true, true, true, true] : [false, true, true, true, true, true, true, true]: 
            false;

        return (
          <div>
            <Header></Header>
            {this.state.loaderShow ? <Loader></Loader> : ""}

            {(this.state.userLoggedIn || this.state.agentLoggedIn) &&
            !this.state.notAuthorisedPerson ? (
              <div id="enrollDiv">
                <div
                  style={{
                    marginTop: "30px",
                    width: "95.2%",
                    marginLeft: "2.4%",
                    // marginRight: "2.4%",
                  }}
                >
                  {/* <div style={customStyle.welcomeMessage}> */}
                  <div style={customStyle.welcomeMessageNetwell}>

                    Hello, {this.state.currentUser}
                  </div>
                  <div
                    style={{
                      marginTop: "31px",
                      width: "100%",
                      height: "14.2%",
                      backgroundColor: "#f6f5ec",
                      overflowX: "auto",
                    }}
                  >
                    <Stepper
                      alternativeLabel={true}
                      activeStep={activeStep}
                      classes={{ root: classes.MuiPaperRoot }}
                      orientation="horizontal"
                      style={{width: window.innerWidth < 768 ? 'max-content': "100%" }}
                    >
                      {multi.map((label, index) => (
                        <StyleTooltip
                          title={label.hoverText}
                          key={index}
                          disableFocusListener
                          placement="top"
                          open={openedPopoverId === label._id}
                        >
                          <Step
                            key={label._id}
                            active={
                              enables !== false
                                ? enables[index]
                                : index === this.state.activeStep
                            }
                            completed={
                              enables !== false
                                ? enables[index]
                                  ? index < this.state.activeStep
                                  : false
                                : index < this.state.activeStep
                            }
                          >
                            <StepLabel
                              onMouseEnter={(e) =>
                                this.handlePopoverOpen(e, label._id)
                              }
                              onClick={this.handleStep(index)}
                              onMouseLeave={() => this.handlePopoverClose()}
                              style={{ cursor: "pointer" }}
                              StepIconProps={{
                                classes: {
                                  completed: classes.completed,
                                  active: classes.active,
                                },
                              }}
                            >
                              {label.name}
                              {/* <Popover className={classes.popover}
                                                         classes={{paper: classes.paper1,}}
                                                        placement='top'
                                                        popperOptions={{positionFixed: true}}
                                                        open={openedPopoverId === label._id}
                                                        anchorEl={anchorEl}
                                                        anchorOrigin={{vertical: -90, horizontal: 'center',}} transformOrigin={{vertical: 40, horizontal: 'center',}} disableScrollLock={true} disableRestoreFocus>
                                                         <Typography style={{textAlign:'center',fontSize:'14px'}}>
                                                            {label.hoverText}
                                                        </Typography>
                                                    </Popover> */}
                            </StepLabel>
                          </Step>
                        </StyleTooltip>
                      ))}
                    </Stepper>
                  </div>
                  <div style={customStyle.mainArea}>
                    <div>{currentScreen}</div>
                    <div
                      style={customStyle.chatBottomWrp}
                      hidden={this.state.isAgent}
                    >
                      <ChatButton></ChatButton>
                    </div>
                  </div>
                  <div style={mainClasses.copyRightText}>
                    {i18n.t("ENROLLMENT.COPY")}
                  </div>
                </div>

                <div style={mainClasses.optOut}>
                  {/*<Modal size="xs" show={this.state.modalOpen} onHide={(event) => this.optoutCancelHandler(event)}>
                                    <Modal.Header style={customStyle.modal_header} closeButton>
                                        <Modal.Title>Opt-out</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body style={{ 'maxHeight': '450px', 'overflowY': 'auto',textAlign : 'justify', wordSpacing:'2px' }}>
                                        {
                                            this.state.loaderShow ? <Loader></Loader> : ''
                                        }
                                        <span style={customStyle.QuickQtTopRightText21}>{i18n.t('ENROLLMENT.TITLE')}</span>
                                        <form>
                                            <div style={{ display: 'flex', width: '100%',marginTop:'10px' }}>
                                                <div>
                                                    <FormControl variant="filled" className={classes.formControl}>
                                                        <CustomTextField select variant='filled' label='Reason for opting-out ' id="demo-simple-select-filled" value={this.state.optReason} onChange={(event) => this.optingReasonChangeHandler(event)} required>
                                                            {
                                                                this.state.optReasonList.map((key, index) => (
                                                                    <MenuItem key={key.id} name={key.reasondCode} value={key.id}>{key.reasondCode}</MenuItem>

                                                                ))
                                                            }
                                                        </CustomTextField>
                                                    </FormControl>
                                                </div>
                                                <div style={{ width: '100%' }}>
                                                    <CustomTextField id="filled-required" label="Other reason" margin="normal" variant="filled" autoComplete="off" style={{margin: '0px'}} disabled={this.state.disOtReason} value={this.state.otherReason} onChange={(event) => this.otherOptingReasonChangeHandler(event)} required={this.state.isReasonsReq} helperText= {this.state.errorText} error={this.state.isValid} InputLabelProps={{style: {color:this.state.isValid?'#FA1515':''}}}/>
                                                </div>
                                            </div>
                                        </form>

                                    </Modal.Body>
                                    <Modal.Footer>
                                        <WizardButton onClick={(event) => this.optoutCancelHandler(event)} style={customStyle.m10}>
                                            {i18n.t('BUTTON.CANCEL')}
                                        </WizardButton>
                                        <WizardButton disabled={this.state.formValid} onClick={this.optoutSubmitHandler} style={customStyle.m10}>
                                            {i18n.t('BUTTON.SUBMIT')}
                                        </WizardButton>
                                    </Modal.Footer>
                                </Modal>

                                 <span style={{ lineHeight: '16px', fontSize: '14px', marginLeft: '24px' }}>{i18n.t('ENROLLMENT.OPT')}</span>
                                 <CustomButton style={mainClasses.caption} onClick={this.handleOpen} disabled={this.state.optFlag}>
                                 {i18n.t('BUTTON.OPTOUT')}
                                 </CustomButton>*/}
                  <span
                    style={{
                      lineHeight: "16px",
                      fontSize: "11px",
                      marginLeft: "24px",
                      float: "right",
                      marginTop: "11px",
                      display: "inline-block",
                    }}
                  >
                    {i18n.t("ENROLLMENT.VERSION")}
                  </span>
                  {this.state.STATE_PARAM && (
                    <span
                      style={{
                        marginRight: "0%",
                        float: "right",
                        fontSize: "10px",
                        marginTop: "14px",
                        display: "inline-block",
                        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                      }}
                    >
                      CID: {this.state.STATE_PARAM.clientId}, OID:
                      {this.state.STATE_PARAM.associationId}, BID:
                      {this.state.STATE_PARAM.brokerId}
                      {sessionStorage.getItem("EMP_NAME") ? (
                        <> , EID : {sessionStorage.getItem("EMP_NAME")} </>
                      ) : (
                        ""
                      )}{" "}
                    </span>
                  )}
                </div>
              </div>
            ) : (
              <div id="enrollDiv">
                <div
                  style={{
                    marginTop: "30px",
                    width: "95.2%",
                    marginLeft: "2.4%",
                    marginRight: "2.4%",
                    fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                  }}
                >
                  <div style={{ width: "55%", margin: "20%" }}>
                    <h4>Oops! Something's not right.</h4>
                    Please go back to the email and click on the link to
                    self-enroll.
                  </div>
                </div>
              </div>
            )}
          </div>
        );
    }
}

Enrollment.propTypes = {
    classes: PropTypes.object
};

const mapStateToProps = state => {
    return {
        subId: state.subId,
        email: state.email,
        userName: state.userName,
        isLogged : state.isLogged
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setSubId: (subId, email, userName) => dispatch({ type: 'SET_MEMBER_ID', subId: subId, email: email, userName: userName, isLogged : sessionStorage.getItem('isLogged') })
    }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Enrollment));