import React, { Component } from 'react';
//import { Button } from '@material-ui/core';
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Loader from '../../loader';
import { TextField, Table, TableCell, TableBody, TableHead, TableRow, Button, Box, Tooltip  } from '@material-ui/core';
import MenuItem from '@material-ui/core/MenuItem';
import customeCSS from './PlanSelection.css';
import configuration from '../../../configurations';
import { connect } from 'react-redux';
import { Modal} from 'react-bootstrap';
// import {Panel} from 'react-bootstrap';
import axios from "axios";
import CommonTable from "../../CommonScreens/commonTable";
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
import i18n from '../../../i18next';
import customStyle from '../../../Assets/CSS/stylesheet_UHS';
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker,DatePicker} from '@material-ui/pickers';
import planConfig from "../../../planConfig";
import './Add-ons/addOnsScreen.css';
import WellLifePlus from '../../../Assets/pdf/WellLife+_Program_Grid.pdf'

const useStylesBootstrap = makeStyles(theme => ({
  arrow: {
      color: '#fa6446',
  },
  tooltip: {
    backgroundColor: '#fa6446',
      border: '1px solid #dadde9',
      fontSize : '12px'
  },
}));

const useStylesBootstrap_otherQuote = makeStyles(theme => ({
    arrow: {
        color: '#4a4b57',
    },
    tooltip: {
        backgroundColor: '#4a4b57',
        border: '1px solid #dadde9',
        fontSize : '12px'
    },
}));


function BootstrapTooltip(props) {
  const classes = useStylesBootstrap();
  return <Tooltip arrow classes={classes} {...props} />;
}

function BootstrapTooltipOtherQuote(props) {
  const classes = useStylesBootstrap_otherQuote();
  return <Tooltip arrow classes={classes} {...props} />;
}

const StyledTableCell = withStyles(theme => (customStyle.tableCell))(TableCell);
const StyledTableCell1 = withStyles(theme => (customStyle.tableCell1))(TableCell);

const StyledTableRow = withStyles(theme => (customStyle.tableRow))(TableRow);

function createData(NAME, AFA1, AFA2, AFA3, AFA4,AFA5,AFA6) {
  return { NAME, AFA1, AFA2, AFA3, AFA4,AFA5,AFA6 };
}

function createDataPB(NAME, PB2, PB4, PB6) {
    return { NAME, PB2, PB4, PB6 };
}

const row1=[
  createData('Non-Sharable Amount (NSA) Per Member	', '$1,000', '$1,500', '$2,500', '$5,000','$5,000','$6,000'),
  createData('Non-Sharable Amount (NSA) for 2 Persons	', '$2,000', '$3,000','$5,000','$10,000','$10,000','$12,000'),
  createData('Non-Sharable Amount (NSA) for 3 or more	', '$3,000','$4,500	','$7,500','$15,000','$15,000','$18,000'),
];
const row2=[
  createData('Application Fee	', '$75	','$75	','$75	','$75	','$75	','$75	'),
  createData('UHF Monthly Membership Dues	', '$15	','$15	','$15	','$15	','$15	','$15	'),
];

const row1pb=[
    createDataPB('Non-Sharable Amount (NSA) Per Member	', '$1,500', '$5,000', '$6,000'),
    createDataPB('Non-Sharable Amount (NSA) for 2 Persons	', '$3,000', '$10,000','$12,000'),
    createDataPB('Non-Sharable Amount (NSA) for 3 or more	', '$4,500','$15,000	','$18,000'),
];
const row2pb=[
    createDataPB('Application Fee	', '$75	','$75	','$75	'),
    createDataPB('UHF Monthly Membership Dues	', '$15	','$15	','$15	'),
];

function createData1(NAME, UHS1, UHS2, UHS3, UHS4,UHS5,UHS6) {
    return { NAME, UHS1, UHS2, UHS3, UHS4,UHS5,UHS6 };
}
const rowUhs1=[
    createData1('Non-Sharable Amount (NSA) Per Member	', '$1,000', '$1,500', '$2,500', '$5,000','$5,000','$6,000'),
    createData1('Non-Sharable Amount (NSA) for 2 Persons	', '$2,000', '$3,000','$5,000','$10,000','$10,000','$12,000'),
    createData1('Non-Sharable Amount (NSA) for 3 or more	', '$3,000','$4,500	','$7,500','$15,000','$15,000','$18,000'),
];
const rowUhs2=[
    createData1('Application Fee	', '$75	','$75	','$75	','$75	','$75	','$75	'),
    createData1('UHF Monthly Membership Fees	', '$15	','$15	','$15	','$15	','$15	','$15	'),
];

const ACSMrowUhsAll=[
    createData1('One Member per Household	', '$3,000', '$4,500', '$7,500', '$10,500','$15,000','$18,000'),
    createData1('Two Members per Household	', '$6,000', '$9,000','$15,000','$21,000','$30,000','$36,000'),
    createData1('Three or more Members per Household	', '$9,000','$13,500	','$22,500','$31,500','$45,000','$54,000'),
];

const ACSMrowUhs=[
    createData1('One Member per Household	',  '$4,500',  '$10,500','$18,000'),
    createData1('Two Members per Household	',  '$9,000','$21,000','$36,000'),
    createData1('Three or more Members per Household	', '$13,500	','$31,500','$54,000')
];

const ProceedButton = withStyles(
    // customStyle.proceedBtn
    customStyle.proceedNetwellBtn

)(Button);

const CustomeButton = withStyles(
    // customStyle.viewBtn
    customStyle.viewNetwellBtn

)(Button);

const ViewButton = withStyles(
    // customStyle.viewBtn
    customStyle.viewNetwellBtn

)(Button);

const CssTextField = withStyles(theme => ({
  root: {
    '& .MuiInput-root': {
    "&:hover:not($disabled):not($focused):not($error):before": {
     borderBottom: '2px solid #533278'
    },
   
  '&.MuiInput-underline.Mui-focused:after':{
    borderBottom: '2px solid #533278',
},
  
 }
},
}))(TextField);


const CustomeTextField = withStyles(theme => ({
  root: {
    '& .MuiFilledInput-root': {
      backgroundColor: '#f8f8f8',
      color: '#19191d',
      fontSize: '16px',
      lineHeight: '24px',
      // height: '56px',
      borderColor: '#533278',
      '&:hover': {                   
        backgroundColor: '#f4f4f4',
        color: '#533278',
  },
        "&:hover:not($disabled):not($focused):not($error):before": {
          // hover
          borderBottom: '2px solid #533278'
        },
      '&.MuiFilledInput-underline:after':{
          borderBottom: '2px solid #533278'
      },
      '&.MuiFilledInput-underline.Mui-error:after':{
          //borderBottomColor: '#f44336'
          borderBottom: '2px solid #f44336',
          
      },
  },
  '&.MuiInputBase-formControl': {
      height: '56px',
  },
  '& .Mui-focused': {
       
  },
  '&.MuiFormControl-marginNormal':{marginTop:'0px'},
  '& .MuiInputLabel-filled': {
      wordBreak: 'normal',
    //   whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '101%',
      overflow: 'hidden'
  },

  '& label.Mui-focused': {
      color: '#533278',
      wordBreak: 'normal',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: 'auto',
      overflow: 'hidden'
  },

  '& p.MuiFormHelperText-contained' : {
      margin : 0,
      fontSize: "12px",
      marginTop : '6px'
  }
}
}))(TextField);


const styles = theme => ({
  table: {
    minWidth: 400,
  },
});

const ACSMCheckbox = withStyles({
    root: {
        color: '#533278',
        "&$checked": {
            color: '#533278',
        },
        "&$disabled": {
            color: 'grey'
        }
    },
    checked: {},
    disabled: {
        color: 'grey'
    }
})(Checkbox);


class PlanSelection extends Component {
  constructor(props) {
    super(props);
      const today = new Date().getDate() +5 ;
      const tomorrow = new Date(today); 
      if(sessionStorage.getItem('CLIENT_ID') === '6548' || sessionStorage.getItem('CLIENT_ID') === '4367'
      || sessionStorage.getItem('CLIENT_ID') === '5540' || sessionStorage.getItem('CLIENT_ID') === '4376'
      || sessionStorage.getItem('CLIENT_ID') === '5541' || sessionStorage.getItem('CLIENT_ID') === '4377'
    //   || sessionStorage.getItem('CLIENT_ID') === '5558' || sessionStorage.getItem('CLIENT_ID') === '4386'
      ){
          if(new Date() < new Date("05/01/2021")){
              tomorrow.setDate(1);
              tomorrow.setMonth(4);
          } else if(new Date().getDate() === 1 ||  new Date().getDate() > 1){
              tomorrow.setDate(1);
              tomorrow.setMonth(today.getMonth() + 1);
          }
      } else {
          tomorrow.setDate(tomorrow.getDate() + 5);
      }

      this.state = {
          loaderShow: false,
          sharingPlan: '',
          plansList: [],
          modalShow: false,
          selectedPlanCode : '',
          planFamilyDetails : [],
          otherQuote : [],
          todayPayment:[],
          recurringPayment:[],
          totalCost : '',
          headerData:[],
          tooltipData : [],
          checkedB: true,
          targetDate: new Date(tomorrow),
          dateErr:false,
          birthDtFocus:false,
          todayDateValid:false,
          birthDt:false,
          checkedPlan:false,
          Checked: '',
          clientId:sessionStorage.getItem('CLIENT_ID'),
          plansListNew : [],
          text:'',
          ACSMModal:false,
          count:0,
          ACSMValue : true,
          ACSMPlanAll:['UHS1','UHS2','UHS3','UHS4','UHS5','UHS6'],
          ACSMPlan:['UHS2','UHS4','UHS6'],
          disableACSM : false,
          smartShareModel : false,
          hideSmartShare : false,
          msgModal : false,
          errMsg : '',
          easyShareModal : false,
          empEffectiveDate : null,
          iframeURL : '',
          reEnroll: this.props.isChangeProgram || this.props.isHouseholdUpdate,
          nextRecurringDate:'',
          tarDate:"",
    };
  }

  componentDidMount() {
      window.scrollTo(0, 0);
      sessionStorage.setItem('current_screen', "4");
      window.addEventListener('message', this.handlePlanGridSelection, false);
      let age = this.handleDateChange(this.state.targetDate,true);
    this.setState({
      loaderShow: true
    });
      fetch(configuration.baseUrl + '/plan/getPlanListForUser/' + sessionStorage.getItem('CLIENT_ID') + '/' + this.props.subId)
          .then((response) => response.json())
          .then(response => {
              /*----------------- new Code -------------------------*/
              let planlist = [];

              if(sessionStorage.getItem('CLIENT_ID') === '6548' || sessionStorage.getItem('CLIENT_ID') === '4367'
              || sessionStorage.getItem('CLIENT_ID') === '5540' || sessionStorage.getItem('CLIENT_ID') === '4376' 
              || sessionStorage.getItem('CLIENT_ID') === '5541' || sessionStorage.getItem('CLIENT_ID') === '4377'
            //   || sessionStorage.getItem('CLIENT_ID') === '5558' || sessionStorage.getItem('CLIENT_ID') === '4386'
              ){
                  let newArr = response.response;
                  for(let i=newArr.length -1; i>=0 ;i-- ){
                      planlist.push(JSON.parse(JSON.stringify(response.response[i])));
                  }
              } else {
                  planlist = response.response;
              }

              fetch(configuration.baseUrl + '/plan/getMemberPlan/' + this.props.subId)
                  .then((selectedPlan) => selectedPlan.json())
                  .then(selectedPlan => {

                      let sharingPlan = '';
                      let selectedPlanCode = '';
                      if(!selectedPlan.response){
                          sharingPlan = planlist[planlist.length - 1].id;
                          selectedPlanCode = planlist[planlist.length - 1].planCode;
                      } else {
                          let index = planlist.findIndex(obj => obj.id === selectedPlan.response.planId);
                          if(index > -1){
                              sharingPlan = selectedPlan.response.planId;
                              selectedPlanCode = selectedPlan.response.planCode;
                          } else {
                              sharingPlan = planlist[planlist.length - 1].id;
                              selectedPlanCode = planlist[planlist.length - 1].planCode;
                          }
                      }
                      let empEffectiveDate = (selectedPlan.response && selectedPlan.response.effectiveDate) ? selectedPlan.response.effectiveDate : null;
                      this.setState({
                          empEffectiveDate : empEffectiveDate
                      })

                      let ACSM = sessionStorage.getItem('CLIENT_ID') === '6548' || sessionStorage.getItem('CLIENT_ID') === '4350' 
                      || sessionStorage.getItem('CLIENT_ID') === '4367' || sessionStorage.getItem('CLIENT_ID') === '5540'
                       || sessionStorage.getItem('CLIENT_ID') === '4376' || sessionStorage.getItem('CLIENT_ID') === '5541' 
                       || sessionStorage.getItem('CLIENT_ID') === '4377' || sessionStorage.getItem('CLIENT_ID') === '5558' 
                       || sessionStorage.getItem('CLIENT_ID') === '4386' ? false : selectedPlan.response ? selectedPlan.response.acsm : true;
                      fetch(configuration.baseUrl + '/plan/quoteByPlan/' + this.props.subId + '/' + sharingPlan +'/'+ ACSM +'/'+ 'Netwell')
                          .then((resNew) => resNew.json())
                          .then(resNew => {
                              if(resNew && resNew.code === 200) {
                                  let res = resNew.response;

                                  let amt = res.todayPayment[0].amount.split('$');
                                  let surcharge = res.quote[res.quote.length - 1].surcharge.split('$');
                                  let val = parseFloat(amt[1]) + + parseFloat(surcharge[1]);
                                  const today = new Date();
                                  const tomorrow = new Date(today);
                                  if(sessionStorage.getItem('CLIENT_ID') === '6548' || sessionStorage.getItem('CLIENT_ID') === '4367'
                                  || sessionStorage.getItem('CLIENT_ID') === '5540' || sessionStorage.getItem('CLIENT_ID') === '4376'
                                  || sessionStorage.getItem('CLIENT_ID') === '5541' || sessionStorage.getItem('CLIENT_ID') === '4377'
                                //   || sessionStorage.getItem('CLIENT_ID') === '5558' || sessionStorage.getItem('CLIENT_ID') === '4386'
                                  ){
                                      if(new Date() < new Date("05/01/2021")){
                                          if(new Date() < new Date(empEffectiveDate)){
                                              let efectiveDate = new Date(empEffectiveDate);
                                              let effectiveDay = new Date(empEffectiveDate).getDate();
                                              if(effectiveDay === 1 || effectiveDay > 1){
                                                  tomorrow.setDate(1);
                                                  tomorrow.setMonth(new Date(efectiveDate).getMonth() + 1);
                                              }

                                          } else {
                                              tomorrow.setDate(1);
                                              tomorrow.setMonth(4);
                                          }
                                      } else if(new Date().getDate() === 1 ||  new Date().getDate() > 1){
                                          if(new Date() < new Date(empEffectiveDate)){
                                              let efectiveDate = new Date(empEffectiveDate);
                                              let effectiveDay = new Date(empEffectiveDate).getDate();
                                              if(effectiveDay === 1 || effectiveDay > 1){
                                                  tomorrow.setDate(1);
                                                  tomorrow.setMonth(new Date(efectiveDate).getMonth() + 1);
                                              }

                                          } else {
                                              tomorrow.setDate(1);
                                              tomorrow.setMonth(today.getMonth() + 1);
                                          }
                                      }
                                  } else {
                                    let efectiveDate = empEffectiveDate ? new Date(empEffectiveDate) : new Date();
                                    if(sessionStorage.getItem('CLIENT_ID') === '1004'){
                                       
                                        tomorrow.setDate(1);
                                        tomorrow.setMonth(new Date(efectiveDate).getMonth() + 1);

                                    }
                                    if(sessionStorage.getItem('CLIENT_ID') === '1002' || sessionStorage.getItem('CLIENT_ID') === '2002' || sessionStorage.getItem('CLIENT_ID') === '2001'|| sessionStorage.getItem('CLIENT_ID') === '2003'){
                                        var date=new Date(efectiveDate).getDate()+5;
                                        tomorrow.setDate(date);
                                    }
                                  }

                                  let targetDate = (selectedPlan.response && 
                                                    selectedPlan.response.targetDate )
                                                    ? 
                                                    selectedPlan.response.targetDate : moment(new Date(tomorrow)).format('YYYY-MM-DD');
                                  this.setState({
                                      planFamilyDetails: res.quote,
                                      headerData: res.header,
                                      plansList: planlist,
                                      loaderShow: false,
                                      otherQuote: res.selectPlan,
                                      text: res.text.text,
                                      recurringPayment: res.recurringPayment,
                                      todayPayment: res.todayPayment,
                                      totalCost: val.toFixed(2),
                                      sharingPlan: sharingPlan,
                                      selectedPlanCode: selectedPlanCode,
                                      tooltipData: res.surchargeTooltip,
                                      targetDate: targetDate,
                                      tarDate:targetDate,
                                      Checked: sharingPlan,
                                      checkedPlan: true,
                                      ACSMValue: ACSM,
                                      disableACSM: selectedPlanCode === 'UHS SmartShare' ? true : false,
                                      hideSmartShare: selectedPlanCode === 'UHS SmartShare' ? false : true,
                                  });
                              } else {
                                  this.setState({
                                      msgModal : true,
                                      errMsg  : resNew.message,
                                      loaderShow : false
                                  });
                              }
                          })
                          .catch(error => {
                              console.log(error);
                          })
                  }).catch(error => {
                  console.log(error);
              });
          })
          .catch(error => {
              console.log(error);
          })
          if(this.state.reEnroll){
            this.setState({ loaderShow:true, })
            var memberID = JSON.parse(sessionStorage.getItem('STATE_PARAM')).memberId;
            axios.get(configuration.transactionURL+'/adminportal/getRecurringDate/'+ memberID)
            .then(respone=>{
                  let recurringDate = moment(respone.data.response.recurringDate).utc().format('MMMM DD, YYYY');
                  this.setState({
                    nextRecurringDate:recurringDate,
                    loaderShow:false,
                  })
            })
        }
  }

    handlePlanGridSelection = (event) =>{
        let planId = JSON.parse(event.data);
        this.setState({
            Checked : planId.selected_val
        })
    }

  viewPlanHideModal = (event,id) => {
      this.setState({
          loaderShow: true
      })
    let planCode = this.state.plansList.find(e => e.id.toString() === id.toString());
    fetch(configuration.baseUrl + '/plan/quoteByPlan/' + this.props.subId + '/' + planCode.id + '/' + this.state.ACSMValue +'/'+ 'Netwell')
        .then((responseNew) => responseNew.json())
        .then(responseNew => {
            if(responseNew && responseNew.code === 200) {
                let response = responseNew.response;
                let amt = response.todayPayment[0].amount.split('$');
                let surcharge = response.quote[response.quote.length - 1].surcharge.split('$');
                let val = parseFloat(amt[1])
                + parseFloat(surcharge[1]);

                this.setState({
                    planFamilyDetails: response.quote,
                    headerData: response.header,
                    loaderShow: false,
                    otherQuote: response.selectPlan,
                    totalCost: this.state.checkedPlan ? val.toFixed(2) : '-',
                    sharingPlan: planCode.id,
                    selectedPlanCode: planCode.planCode,
                    tooltipData: response.surchargeTooltip,
                    Checked: planCode.id,
                    checkedPlan: true,
                    modalShow: false
                });
            } else {
                this.setState({
                    msgModal : true,
                    errMsg  : responseNew.message,
                    loaderShow : false
                });
            }
        })
        .catch(error => {
            console.log(error);
        })
  }


    hideModal = (event,id) => {
      this.setState({
          modalShow: false
      });
  }
  hideACSMModal=(event)=>{
    this.setState({ACSMModal:false})
  }

  showACSMModal=()=>{
    this.setState({ACSMModal:true})
  }

  showWellLifePlusPrograms=(proramname)=>{
    // window.open(WellLifePlus)
    if(proramname == "elite"){
        window.open('https://netwell-prod.s3.amazonaws.com/Agent/Advantage-Brochure.pdf')
    }else if(proramname == "welllifeplus"){
        window.open(WellLifePlus)
    }
  }

    showSmartShareModal = () => {
      this.setState({
          loaderShow: true,
          smartShareModel : true
      });
    }

  showPlansModal = (event) => {
      let plan = JSON.parse(JSON.stringify(this.state.plansList));
      let planIndex = plan.findIndex(obj => obj.planCode === "UHS SmartShare");
      let newPlan = this.state.plansList;
      let selectedPlanId = '';
      if(planIndex > -1){
          selectedPlanId = plan[planIndex].id;
          plan.splice(planIndex, 1);
      }
      let obj = planConfig.find(obj => obj.CLIENT_ID.toString() === this.state.clientId.toString());

      if(selectedPlanId === this.state.sharingPlan){
          this.setState({
              modalShow: false,
              Checked : this.state.sharingPlan,
              plansListNew : plan,
              iframeURL : obj.iframeURL
          });
      } else {
          this.setState({
              modalShow: true,
              Checked : this.state.sharingPlan,
              plansListNew : plan,
              loaderShow: true,
              iframeURL : obj.iframeURL
          });
      }
  }

  planChangeHandler = (event) => {
      this.setState({
          loaderShow: true,
          checkedPlan:true
      });
    let planCode = this.state.plansList.find(e => e.id === event.target.value);
    let acsmVal = this.state.ACSMValue;
      if(planCode.planCode === "UHS SmartShare"){
          acsmVal = false
      } else{
          acsmVal = this.state.ACSMValue;
      }

      fetch(configuration.baseUrl + '/plan/quoteByPlan/' + this.props.subId + '/' + planCode.id+'/'+acsmVal +'/'+ 'Netwell')
          .then((responseNew) => responseNew.json())
          .then(responseNew => {
              if(responseNew && responseNew.code === 200){
                  let response = responseNew.response;
                  let amt =response.todayPayment[0].amount.split('$');
                  let surcharge = response.quote[response.quote.length - 1].surcharge.split('$');
                  let val = parseFloat(amt[1]) + parseFloat(surcharge[1]);
                  this.setState({
                      planFamilyDetails : response.quote,
                      headerData:response.header,
                      loaderShow: false,
                      otherQuote : response.selectPlan,
                      totalCost : val.toFixed(2),
                      recurringPayment:response.recurringPayment,
                      todayPayment:response.todayPayment,
                      sharingPlan: planCode.id,
                      selectedPlanCode : planCode.planCode,
                      tooltipData : response.surchargeTooltip,
                      Checked : planCode.id,
                      ACSMValue : planCode.planCode === "UHS SmartShare" ? false : this.state.ACSMValue,
                      disableACSM : planCode.planCode === "UHS SmartShare" ? true : false,
                      hideSmartShare : planCode.planCode === "UHS SmartShare" ? false : true,
                  });

              } else {
                  this.setState({
                      msgModal : true,
                      errMsg  : responseNew.message,
                      loaderShow : false,
                      disableACSM : false,
                      hideSmartShare : true
                  });
              }
          })
          .catch(error => {
              console.log(error);
          })


  };
  planChangeHandler1 = (event,id) => {
    if(event.target.checked){
        this.setState({
            checkedPlan : true,
            Checked: event.target.value,
        });
    } else {
        this.setState({
            checkedPlan : true,
            Checked: ""
        });
    }
  };

  recalculatePlan = (ACSMValue) =>{
    this.setState({
      loaderShow: true
    });
    fetch(configuration.baseUrl + '/plan/quoteByPlan/' + this.props.subId + '/' + this.state.sharingPlan+'/'+ ACSMValue +'/'+ 'Netwell')
        .then((response) => response.json())
        .then(response => {
            if(response && response.code === 200) {

                let amt = response.response.todayPayment[0].amount.split('$');
                let surcharge = response.quote[response.quote.length - 1].surcharge.split('$');
                let val = parseFloat(amt[1]) + parseFloat(surcharge[1]);
                this.setState({
                    planFamilyDetails : response.response.quote,
                    headerData:response.response.header,
                    loaderShow: false,
                    otherQuote : response.response.selectPlan,
                    totalCost : val.toFixed(2),
                    recurringPayment:response.response.recurringPayment,
                    todayPayment:response.response.todayPayment,
                    tooltipData : response.response.surchargeTooltip,
                    ACSMValue : ACSMValue
                });
            } else {
                this.setState({
                    msgModal : true,
                    errMsg  : response.message,
                    loaderShow : false
                });
            }
        })
        .catch(error => {
          console.log(error);
        })
  }

  submitPlan = () => {
    this.setState({
      loaderShow: true
    });

    let date = moment(this.state.targetDate).format('YYYY-MM-DD');
    let data = {
        subId : this.props.subId,
        planId : this.state.sharingPlan,
        planCode :this.state.selectedPlanCode,
        amount : this.state.totalCost,
        targetDate : date,
        acsm : this.state.ACSMValue
    };
    if(this.state.selectedPlanCode==6001)
    {
      this.setState({
        Checked: [this.state.Checked, 6001],
       
        checkedPlan:true,
        
      })
    }else if(this.state.selectedPlanCode==6002){
      this.setState({
        Checked: [this.state.Checked, 6002],
       
        checkedPlan:true,
        
      })
    }else if(this.state.selectedPlanCode==6003){
      this.setState({
        Checked: [this.state.Checked, 6003],
       
        checkedPlan:true,
        
      })
    }
    else if(this.state.selectedPlanCode==6004){
      this.setState({
        Checked: [this.state.Checked, 6004],
       
        checkedPlan:true,
        
      })
    }else if(this.state.selectedPlanCode==6005){
      this.setState({
        Checked: [this.state.Checked, 6005],
       
        checkedPlan:true,
        
      })
    }else if(this.state.selectedPlanCode==6006){
      this.setState({
        Checked: [this.state.Checked, 6006],
       
        checkedPlan:true,
        
      })
    }

        axios.post(configuration.baseUrl + '/plan/saveMemberPlan', data)
            .then(response => {
                this.setState({
                    loaderShow: false
                })
                this.props.onClick();
            }).catch(error => {
              console.log(error);
            })

  }
  getValue =(val,itemValid,parentDetails)=>{
    let count =0;
    let ageValidator=0;
    if(parentDetails.flag === 'SELECT_PLAN'){

      if(parentDetails.label === 'Select Sharing Programs'){
        if(itemValid){
          this.state.sharingPlan = val;
        }else{
          this.state.sharingPlan = '';
        }

      } 
      }
    }

    /*handleHover(){
        var panel = document.getElementById("date-picker-dialog");
        var p2=document.getElementsByName('KeyboardDatePicker');
        panel.addEventListener("mouseover", function() {
            document.getElementById("date-picker-dialog").style.color = "#533278";
        });

        panel.addEventListener("mouseover", function() {
            document.getElementById("date-picker-dialog-label").style.paddingTop = "10px";
        });
    }*/

    isItemChecked(abilityName) {
      return parseInt(this.state.Checked) === parseInt(abilityName) ? true : false;
      //return this.state.Checked.indexOf(abilityName) > -1
    }
  


    handleDateChange = (date,didMount) => {
        console.log("date---",date)
      this.setState({
          targetDate: date
      }
      , () =>{
            let panel = document.getElementById("date-picker-dialog");
            panel.addEventListener("onmouseleave", function() {
                document.getElementById("date-picker-dialog-label").style.paddingTop = "10px";
            });
        }
        );     
    }
    selectProgram = () => {
        this.setState({
            loaderShow : false,
            count: 1
        });

        /*fetch(configuration.baseUrl + '/plan/quoteByPlan/' + this.props.subId + '/' + this.state.sharingPlan +'/'+this.state.ACSMValue)
            .then((resNew) => resNew.json())
            .then(resNew => {
                if(resNew && resNew.code === 200) {
                    let res = resNew.response;

                    this.setState({
                        planFamilyDetails: res.quote,
                        headerData: res.header,
                        loaderShow: false,
                        otherQuote: res.selectPlan,
                        text: res.text.text,
                        recurringPayment: res.recurringPayment,
                        todayPayment: res.todayPayment,
                        count: 1
                    });
                } else {
                    this.setState({
                        msgModal : true,
                        errMsg  : resNew.message,
                        loaderShow : false
                    });
                }
            });*/
    }
    backToSelectProgram=()=>{
        this.setState({count:0})
    }

    handleACSMValue = (e) => {
        this.setState({
            loaderShow : true
        });
        this.recalculatePlan(e.target.checked)
    }

    disableWeekends(date, clientId) {
        console.log("datdisableWeekends----",date)
        // return (clientId === '6548' || clientId === '4367' || clientId === '5540' || clientId === '4376' || clientId === '5541' || clientId === '4377' ) ? (date.getDate() === 1 ? false : true) : false;
        if (clientId == '1004'){
        if(date.getDate() === 1 ||  date.getDate() === 15  ){
            return false
        }else {
            return true
        }
    }else{
            var targetDate=new Date(this.state.tarDate);
            let dates= Math.round((new Date(date)).getTime() / 1000);
            let targetDates= Math.round((new Date(targetDate)).getTime() / 1000);
            if(dates>=targetDates || date.getDate()===targetDate.getDate())
                return false
            else
                return true
        }
    }

    render() {
    let classes = this.props;
    let currentScreen = '';

    let myDate=moment(this.state.targetDate).format('MM')+'/'+moment(this.state.targetDate).format('DD')+'/'+moment(this.state.targetDate).format('YYYY');
    console.log("myDate--",this.state.targetDate)
    const today = new Date();
    const tomorrow = new Date(today);
   
    tomorrow.setDate(tomorrow.getDate());
    console.log("tomorrow--",tomorrow)
    let futureTomarow = new Date(today);
    console.log("futureTomarow--",futureTomarow)

    let futureDate;
    if(this.state.clientId === '6548' || this.state.clientId === '4367' 
    || this.state.clientId === '5540' || this.state.clientId === '4376'
     || this.state.clientId === '5541' || this.state.clientId === '4377'
    //  || this.state.clientId === '5558' || this.state.clientId === '4386'
     ){
        if(new Date() < new Date("05/01/2021")){
            if(new Date() < new Date(this.state.empEffectiveDate)){
                let efectiveDate = new Date(this.state.empEffectiveDate);
                let effectiveDay = new Date(this.state.empEffectiveDate).getDate();
                if(effectiveDay === 1 || effectiveDay > 1){
                    tomorrow.setDate(1);
                    tomorrow.setMonth(new Date(efectiveDate).getMonth() + 1);

                    futureTomarow.setDate(1);
                    futureTomarow.setMonth(new Date(efectiveDate).getMonth() + 1);
                }

            } else {
                tomorrow.setDate(1);
                tomorrow.setMonth(4);
                futureTomarow.setDate(1);
                futureTomarow.setMonth(4)
            }
        } else if(new Date().getDate() === 1 ||  new Date().getDate() > 1){

            if(new Date() < new Date(this.state.empEffectiveDate)){
                let efectiveDate = new Date(this.state.empEffectiveDate);
                let effectiveDay = new Date(this.state.empEffectiveDate).getDate();
                if(effectiveDay === 1 || effectiveDay > 1){
                    tomorrow.setDate(1);
                    tomorrow.setMonth(new Date(efectiveDate).getMonth() + 1);
                    futureTomarow.setDate(1);
                    futureTomarow.setMonth(new Date(efectiveDate).getMonth() + 1);
                }
            } else {
                tomorrow.setDate(1);
                tomorrow.setMonth(today.getMonth() + 1);
                futureTomarow.setDate(1);
                futureTomarow.setMonth(today.getMonth() + 1)
            }
        }
        futureDate = futureTomarow.setDate(futureTomarow.getDate() + 45)
    } else {
        
        futureDate = futureTomarow.setDate(futureTomarow.getDate() + 90);
    }
   
   
    // const futureDate = this.state.clientId === '6548' ? futureTomarow.setDate(futureTomarow.getDate() + 45) : futureTomarow.setDate(futureTomarow.getDate() + 90);


        // ----------------------------------------------Screen 1----------------------------------------------------------

        if (this.state.count === 0) {   

            currentScreen=
                <Grid container direction='row'>
                    <Grid item sm={4} xs={12} style={{marginBottom:'20px'}} className={this.props.isChangeProgram || this.props.isHouseholdUpdate ? "disabledReenrollPlanSelection" : ""}>
                        <Grid item sm={10} xs={12}>
                <CustomeTextField
                    id="Select-Sharing-Plan"
                    select
                    label="Select Sharing Programs *"
                    style={{
                        width: '98%',
                        marginLeft: '0',
                        borderRadius: '4px',
                        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
                    }}
                    disabled={this.props.isChangeProgram || this.props.isHouseholdUpdate}
                    margin="normal"
                    variant="filled"
                    value={this.state.checkedPlan  ? this.state.sharingPlan : this.state.sharingPlan = ''}
                    onChange={(event) => this.planChangeHandler(event)}>
                    {this.state.plansList.map((option, index) => (
                        <MenuItem key={index} value={option.id}>
                        {option.planCode}
                        </MenuItem>
                    ))}
                 </CustomeTextField>              
              </Grid>
                        <Grid item sm={10} xs={12} style={{marginTop:'20px'}} hidden={this.state.disableACSM 
                        || this.state.clientId === "4350" 
                        || this.state.clientId === "6548" || this.state.clientId === "4367" 
                        || this.state.clientId === "5540" || this.state.clientId === "4376" 
                        || this.state.clientId === "5541" || this.state.clientId === "4377"
                        || this.state.clientId === "5558" || this.state.clientId === "4386"
                        }>
                            {/* <ACSMCheckbox
                                checked={this.state.ACSMValue}
                                inputProps={{
                                    'aria-label': 'secondary checkbox',
                                }}
                                disabled={this.props.isChangeProgram || this.props.isHouseholdUpdate}
                                style={{ marginLeft:'-11px' }}
                                onClick ={(event => this.handleACSMValue(event))}
                            />
                                <div style={this.state.disableACSM ? customStyle.acsmCheckBoxDisable : customStyle.acsmCheckBox}>
                                    Include <b>Annual Co-Share Maximum (ACSM)</b>
                                </div> */}
                        </Grid>
    
    
              <Grid item sm={10} xs={12} style={{marginTop:'30px'}}>             
              
              <div style={customStyle.EnrollNew2DateMob}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            required
                            onBlur={()=>this.setState({birthDtFocus:true})}
                            onMouseOver={()=>this.setState({birthDt:true})}
                            onMouseLeave={()=>this.setState({birthDt:false})}
                            autoComplete='off'
                            margin="none"
                            id="date-picker-dialog"
                            label="Select Program Effective Date"
                            format="MM/dd/yyyy"
                            disabled={this.props.isChangeProgram || this.props.isHouseholdUpdate}
                            error={this.state.dateErr} //&&!this.state.todayDateValid
                            helperText={this.state.dateErr?'Enter valid date':''} //this.state.todayDateValid?'Date Required':
                            value={myDate} //this.state.todayDateValid?null:
                            onFocus={e => e.target.blur()}
                            onCopy={this.handlerCopy}
                            onPaste={this.handlerCopy}
                            inputProps={{style: {fontSize:'18px',fontFamily: 'Roboto, Arial, Helvetica, sans-serif',paddingLeft:'11px',paddingRight:'10px',marginTop:'11px','&:focus':{ outline: 'none'},color: !this.state.birthDt?'#19191d':'#533278'}}}
                            InputLabelProps={{style:{paddingLeft:10,paddingRight:10,paddingTop:12,color: !this.state.birthDtFocus?'grey': this.state.birthDt?'#533278':'grey'}}}//|| !this.state.todayDateValid
                            onChange={this.handleDateChange.bind(this)}
                            variant="filled"
                            // onMouseEnter={this.handleHover}
                            TextFieldComponent={CssTextField}
                            KeyboardButtonProps={{
                                'aria-label': 'change date',
                            }}
                            style={{width:'100%'}}
                            shouldDisableDate={(e) => this.disableWeekends(e, this.state.clientId)}
                            minDate={new Date(tomorrow)}
                            maxDate={new Date(futureDate)}
                        />
                        <span id='bd' style={customStyle.EnrollNew2Span}></span>
    
                    </MuiPickersUtilsProvider>
                    </div>
                    </Grid>
                            
    
                     </Grid>
                    {/* {
                        (this.state.clientId.toString() !== '6548' && this.state.clientId.toString() !== '4367' 
                        && this.state.clientId.toString() !== '5540' && this.state.clientId.toString() !== '4376' 
                        && this.state.clientId.toString() !== '5541' && this.state.clientId.toString() !== '4377'
                        && this.state.clientId.toString() !== '5558' && this.state.clientId.toString() !== '4386'
                        ) ? */}
                           {
                               this.state.clientId.toString() == '1004'?
                               <Grid item sm={3} xs={12} style={{marginBottom:'15px'}}>
                                <Grid item sm={10} xs={12} hidden={!this.state.hideSmartShare || this.state.clientId === "4350" 
                                || this.state.clientId === "6548" || this.state.clientId === '4367' 
                                || this.state.clientId === '5540' || this.state.clientId === '4376'
                                || this.state.clientId === '5541' || this.state.clientId === '4377'
                                || this.state.clientId === '5558' || this.state.clientId === '4386'
                                 }>
                                     {/* /hidden={this.state.reEnroll} */}
                                    <ViewButton style={{width:'99%',marginBottom:'20px'}} color="primary" onClick={()=>this.showWellLifePlusPrograms("elite")} > 
                                        VIEW Elite <sup>+</sup> &nbsp;programs</ViewButton>
                                </Grid>
                                
                            </Grid>

                               :

                               <Grid item sm={3} xs={12} style={{marginBottom:'15px'}}>
                                <Grid item sm={10} xs={12} hidden={!this.state.hideSmartShare || this.state.clientId === "4350" 
                                || this.state.clientId === "6548" || this.state.clientId === '4367' 
                                || this.state.clientId === '5540' || this.state.clientId === '4376'
                                || this.state.clientId === '5541' || this.state.clientId === '4377'
                                || this.state.clientId === '5558' || this.state.clientId === '4386'
                                 }>
                                    <ViewButton style={{width:'99%',marginBottom:'20px'}} color="primary" onClick={()=>this.showWellLifePlusPrograms("welllifeplus")} >
                                        VIEW WELLIFE <sup>+</sup> &nbsp;programs</ViewButton>
                                </Grid>
                                
                            </Grid>

                           }
                            




                            {/* // :
                            // (this.state.clientId.toString() !== '5541' && this.state.clientId.toString() !== '4377' && this.state.clientId.toString() !== '5558' && this.state.clientId.toString() !== '4386') ?
                            // <Grid item sm={3} xs={12} style={{marginBottom:'15px'}}>

                            //     <Grid item sm={10} xs={12} style={{marginTop:'10px'}} hidden={!this.state.hideSmartShare}>
                            //         <ViewButton style={{width:'99%',marginBottom:'20px'}} color="primary" onClick={this.showPlansModal}>View All Healthy Life (HL) Programs</ViewButton>
                            //     </Grid>

                            //     <Grid item sm={10} xs={12} >
                            //         <ViewButton style={{width:'99%',marginBottom:'20px'}} color="primary" onClick={() => this.setState({easyShareModal : true, loaderShow: true})}>
                            //             View EasyShare (ES) Programs
                            //         </ViewButton>
                            //     </Grid>
                            // </Grid>

                            // :
                            // (this.state.clientId.toString() == '5558' || this.state.clientId.toString() == '4386') ?
                            // <Grid item sm={3} xs={12} style={{marginBottom:'15px'}}>

                            //     <Grid item sm={10} xs={12} style={{marginTop:'10px'}} hidden={!this.state.hideSmartShare}>
                            //         <ViewButton style={{width:'99%',marginBottom:'20px'}} color="primary" onClick={this.showPlansModal}>View All Healthy Life National (HLN) Programs</ViewButton>
                            //     </Grid>

                                
                            // </Grid>

                            :
                        //     <Grid item sm={3} xs={12} style={{marginBottom:'15px'}}>

                        //     <Grid item sm={10} xs={12} style={{marginTop:'10px'}} hidden={!this.state.hideSmartShare}>
                        //         <ViewButton style={{width:'99%',marginBottom:'20px'}} color="primary" onClick={this.showPlansModal}>View all Community HealthShare Programs</ViewButton>
                        //     </Grid> 

                           
                        // </Grid>


                    // } */}
                    <Grid item sm={5} xs={10} style={{display:"flex", justifyContent:'end'}} >
                        <Grid item sm={9} xs={9} style={{tableLayout:'fixed', maxWidth: "69%"}} >
                            <div style={{height:'100%',overflowY:'auto', display:"flex", justifyContent:'flex-end'}} >
                                <div style={{overflowX: "auto", width:"90%"}}>
                                <CommonTable quoteData={this.state.planFamilyDetails} check={this.state.checkedPlan} headerData={this.state.headerData} tooltip={this.state.tooltipData} quickQuote={false} totalReq={true} />
                                </div>
                            </div>
                        </Grid>
                </Grid>
            </Grid>

    
        }

// ------------------------------------------------Screen 2----------------------------------------------------------------

        if (this.state.count === 1) {
            currentScreen=<Grid container style={{marginTop:'1%'}}>
            <Grid item xs={12} md={7} sm={7} xl={6} lg={7}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={11} md={11} xl={10} style={{backgroundColor:'#e4e5e6',paddingLeft:'10px'}}>

            <Grid container justify='space-between' direction='row'>
                <Grid item sm={4} md={4} lg={4} xs={12}>
                    <span style={customStyle.headingTxt}>Your program selection :</span>
                    <div style={customStyle.planTextProgramSelection}>{this.state.selectedPlanCode}</div>            
                    <div style={customStyle.planTextCheckACSM}>{this.state.ACSMValue && " +Annual Co-Share Maximum "}</div>
                </Grid>
           
            <Grid item sm={8} md={8} lg={8} xs={12} style={{paddingLeft:'10px'}}>


            <span style={customStyle.headingTxt}>Here's what you'll recieve  :</span>
                {this.state.otherQuote.map((op,index) => (

                  <div key={index} style={{display:'flex',paddingTop:'5px'}} >

                       <span style={customStyle.planTextACSM}> {op.text}
                        {
                           (op.tooltip !== "" && op.tooltip !== null) &&
                               <BootstrapTooltipOtherQuote title={op.tooltip} placement='top'>
                                   <InfoRoundedIcon style={{ color : '#4a4b57', marginBottom: "3px"}} fontSize="small"></InfoRoundedIcon>
                               </BootstrapTooltipOtherQuote>
                        }
                       </span>
                        <span style={{width : '25%', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'}}><b> {op.amount} </b></span>
                  </div>


                ))}
            </Grid>
            </Grid>            
              
            </Grid>               
            </Grid>

             <Grid  container spacing={1} style={{marginTop:'2%'}} >
               <Grid item xs={12} sm={12} md={6} xl={5} lg={6} style={{backgroundColor:'#f1f1f1',borderTop: '5px solid #fff',paddingLeft:'10px',borderRight:'3px solid #fff'}}>
               <span style={customStyle.headingTxt}>Here's what you'll pay today :</span>
               {this.state.todayPayment.map((op,index) => (
                                       <div key={index} style={index!==3?customStyle.planBox:customStyle.planBoxTotal} >
                                       <div style={index!==3?customStyle.planTextGrid:customStyle.planTextTotal}> {op.text}</div>
                                       <div style={customStyle.planPrice}>  {op.amount}</div>
                                       </div>
                                   ))}
               </Grid>

               <Grid item xs={1}  style={{maxWidth:'3px'}} ></Grid>
               
               <Grid item xs={12} sm={12} md={5} xl={4} lg={5} style={{backgroundColor:'#f1f1f1',borderTop: '5px solid #fff',paddingLeft:'10px',borderLeft:'3px solid #fff',borderRight:'7px solid #fff'}}>
               <span style={customStyle.headingTxt}>Here's your regular monthly payment  :</span>
               {this.state.recurringPayment.map((op,index) => (
                                       <div key={index} style={index!==2?customStyle.planBox:customStyle.planBoxTotalselectprog} >
                                       <div style={index!==2?customStyle.planTextGrid:customStyle.planTextTotal}> {op.text}</div>
                                       <div style={index!==2?customStyle.planPrice:customStyle.planPriceRec2}>  {op.amount}</div>
                               </div>
                               ))} 
               </Grid>
             </Grid>
             <Grid container spacing={1} style={{marginTop:'1%'}}>
               <Grid item xs={12} sm={12} md={11} xl={10} style={{textAlign:'justify',fontSize:'13px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'}} >
               {this.state.text}
               </Grid>
               </Grid>
           </Grid>
       
           <Grid item xs={12} sm={12} md={5} xl={4}>
             <Grid container spacing={2} >
               <Grid item xs={12} style={{height:'80%',marginRight:'1px', overflowY:'auto'}} >
               <div style={{overflowX:'auto'}} className="reivewTable">
                   <CommonTable quoteData={this.state.planFamilyDetails} check={this.state.checkedPlan} headerData={this.state.headerData} tooltip={this.state.tooltipData} quickQuote={false} totalReq={true} />
               </div>
               </Grid>
             </Grid>
           </Grid>
         </Grid> 
        }



    return (
      <div>
        {
          this.state.loaderShow ? <Loader></Loader> : ''
        }

                  {
                    this.state.reEnroll?
                    <p style={{ fontSize: '14px', lineHeight: '16px',textAlign:'justify', fontFamily : 'Roboto, Arial, Helvetica, sans-serif' }}>
                        Any changes will take effect on <b>{this.state.nextRecurringDate}</b>. Any applicable waiting periods will also begin on that date. (For details on any applicable waiting periods, see the Sharing Guidelines.) If you wish to add or remove new family members, click “Set up Family” above.
                    </p>
                    :
                    <div>{
                      (this.state.clientId == "1004" ) ?
                      <p style={{ fontSize: '14px', lineHeight: '16px',textAlign:'justify', fontFamily : 'Roboto, Arial, Helvetica, sans-serif' }}>
                              <b>Select the best sharing program for you by viewing Elite+ Programs using the buttons below. </b>  
                              Use the Select Sharing Programs dropdown to preview and compare program contribution amounts. Once you’ve chosen your program, click Select Program Effective Date to choose when you want your program to begin. Click SELECT PROGRAM to review your program selection. Finally, click PROCEED.</p>
                          :
                          <p style={{ fontSize: '14px', lineHeight: '16px',textAlign:'justify', fontFamily : 'Roboto, Arial, Helvetica, sans-serif' }}>
                              <b>{i18n.t('PLAN_SELECTION.TITLE')} </b>  
                              {i18n.t('PLAN_SELECTION.TITLE2')}</p>
                          
                    }</div>
                  }
               
                    <div style={{ marginTop: '22px', width: '100%', display: 'flex' }}>
                        {currentScreen}
                    </div>

                {/* ============================= Button ============================================= */}
                    {
                        this.state.count === 0
                        ?
                        <Grid container style={{marginTop:'15px'}}>
                            <Grid item sm={2} md={2} xs={12} style={{marginRight:'-100px'}}>
                                <ViewButton style={{marginBottom:'10px',width:'45%'}} color="primary" disabled={true} onClick={this.showPlansModal}>BACK</ViewButton>
                            </Grid>
                            <Grid item sm={5} md={5} xs={12}>
                                <ProceedButton color="primary" style={{width:'45%'}} disabled={ this.state.sharingPlan === '' && this.state.targetDate === ''} onClick={this.submitPlan}>{this.props.isChangeProgram || this.props.isHouseholdUpdate? "CONTINUE" :"Select Program"}</ProceedButton>{/* this.selectProgram */}
                            </Grid>
                        </Grid>
                        :
                        <Grid container style={{marginTop:'15px'}}>
                            <Grid item sm={2} md={2} xs={12} style={{marginRight:'-100px'}}>
                                <ViewButton style={{marginBottom:'10px',width:'42%'}} color="primary" onClick={this.backToSelectProgram}>BACK</ViewButton>
                            </Grid>
                            <Grid item sm={5} md={5} xs={12}>
                                <ProceedButton color="primary" style={{width:'42%'}} disabled={ this.state.sharingPlan === '' && this.state.targetDate === ''} onClick={this.submitPlan} >Proceed</ProceedButton>
                            </Grid>
                        </Grid>

                    }
                    


        {/* --------------------------------ACSM Modal ------------------------------------------------- */}

        <Modal size="lg" show={this.state.ACSMModal}  onHide={(event) => this.hideACSMModal(event)} backdrop="static">
        <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title>Annual Co-Share Maximum</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ padding: '15px' ,textAlign : 'justify', overflowX : 'hidden', fontfamily: 'Roboto, Arial, Helvetica, sans-serif'}}>
              {
                  this.state.loaderShow ? <Loader></Loader> : ''
              }
              <span style={{fontSize:'13px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'}}>If you choose this option, 100% of your Eligible Medical Expenses become sharable when your Annual Co-Share Maximum (ACSM)
               has been met. The ACSM differs for each program. Also, the Preventive Care is increased to $1,000 per member per year 
               (subject to a 90-day waiting period). Check the box for the ACSM option and you can view the difference in monthly contribution 
               amounts for each program.
               </span>

                  <div style={{ overflowX: "auto" }} >
                    <Table aria-label="customized table1"  style={customStyle.tableACSM}>
                   <TableHead style={{backgroundColor:'#420045',position: 'sticky'}}>
                   <TableRow style={{position: 'sticky'}}>
                   <StyledTableCell1 padding='checkbox' align='center' style={customStyle.tableHead1ACSM} >
                                      Program Name
                    </StyledTableCell1>
                       {
                           this.state.plansList.length === 7 ?
                               this.state.ACSMPlanAll.map((option, index) => (
                                   <StyledTableCell1 style={customStyle.tableHead2ACSM}  align='center' key={index} value={option.id}>
                                       {option}
                                   </StyledTableCell1>

                               )) :
                               this.state.ACSMPlan.map((option, index) => (
                                   <StyledTableCell1 style={customStyle.tableHead2ACSM}  align='center' key={index} value={option.id}>
                                       {option}
                                   </StyledTableCell1>

                               ))

                       }
                   </TableRow>
                   </TableHead>

                   <TableBody >
                   <StyledTableRow align='center' style={customStyle.rowHead} >
                   <StyledTableCell1  align="center" style={customStyle.tableRowHeadACSM} >
                                         Annual Out-of-Pocket
                                      </StyledTableCell1>
                                      <StyledTableCell1  align="center" colSpan={6} style={customStyle.tableRowHead2ACSM} >
                                          Annual Co-Share Maximum Amounts
                                      </StyledTableCell1>
                    </StyledTableRow>
                       {
                           this.state.plansList.length === 7 ?
                               ACSMrowUhsAll.map((row,index) => (

                                   <StyledTableRow align="left" style={{backgroundColor:'rgb(234, 232, 219)',border : '2px solid #ffffff'}} key={index}>
                                       <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                                           {row.NAME}
                                       </StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}  >{row.UHS1}</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS2}</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>{row.UHS3}</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS4}</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS5}</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS6}</StyledTableCell>
                                   </StyledTableRow>
                               )) :
                                   ACSMrowUhs.map((row,index) => (

                                       <StyledTableRow align="center" style={{backgroundColor:'rgb(234, 232, 219)',border : '2px solid #ffffff'}} key={index}>
                                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>{row.NAME}</StyledTableCell>
                                           <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS1}</StyledTableCell>
                                           <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS2}</StyledTableCell>
                                           <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS3}</StyledTableCell>
                                       </StyledTableRow>
                                   ))
                       }


                   </TableBody>

                   </Table>
                  </div> 
               <span style={{fontSize:'13px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'}}>
                        The amounts shown above are Co-Share Maximum amounts in effect as of 10/01/2020. Annual Co-Share Maximum amounts are subject 
                        to adjustment from time to time. Always remember to check the Universal HealthShare Member Portal for the most current version
                        of the Sharing Guidelines, which may reflect changes that have been made since the date of the last copy you reviewed. 
                        This option is only available at the time of enrollment, or at the time of annual program renewal.
                </span>
            </Modal.Body>
            <Modal.Footer>
            <CustomeButton  onClick={(event) => this.hideACSMModal(event)}>{i18n.t('BUTTON.DONE')}</CustomeButton>
          </Modal.Footer>
        </Modal>

          {/*========================================= easy share modal ==========================*/}

          <Modal size="xl" show={this.state.easyShareModal}  onHide={(event) => { this.setState({easyShareModal : false}) }} backdrop="static">
              <Modal.Header style={customStyle.modal_header} closeButton>
                  <Modal.Title>UHS EasyShare</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ padding: '0px'}}>
                  {
                      this.state.loaderShow && <Loader></Loader>
                  }
                  <iframe style={{ height: '430px', width: '100%' }}  onLoad={()=>this.setState({loaderShow:false})}  src={'https://www.universalhealthfellowship.org/uhs-easyshare-program-grid/'}></iframe>

              </Modal.Body>
              <Modal.Footer>
                  <ViewButton  onClick={(event) => {this.setState({easyShareModal : false})}}>{i18n.t('BUTTON.DONE')}</ViewButton>
              </Modal.Footer>
          </Modal>

          {/*================================ smart share modal ==========================*/}
          <Modal size="lg" show={this.state.smartShareModel}  onHide={(event) => { this.setState({smartShareModel : false}) }} backdrop="static">
              <Modal.Header style={customStyle.modal_header} closeButton>
                  <Modal.Title>UHS SmartShare</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ padding: '0px'}}>
                  {
                      this.state.loaderShow && <Loader></Loader>
                  }
                  <iframe style={{ height: '430px', width: '100%' }}  onLoad={()=>this.setState({loaderShow:false})}  src={'https://www.universalhealthfellowship.org/uhs-smartshare-program-grid/'}></iframe>
                 
              </Modal.Body>
                <Modal.Footer>
                  <CustomeButton  onClick={(event) => {this.setState({smartShareModel : false})}}>{i18n.t('BUTTON.DONE')}</CustomeButton>
                </Modal.Footer>
          </Modal>


          <Modal size="xs" show={this.state.msgModal} onHide={(event) => this.setState({msgModal:false,loaderShow : false, errMsg : ''})} backdrop="static" centered>
              <Modal.Header style={customStyle.modal_header} closeButton>
                  <Modal.Title>Error Message</Modal.Title>
              </Modal.Header>
              <Modal.Body style={{ margin: '10px',textAlign:'center',fontFamily : 'Roboto, Arial, Helvetica, sans-serif' }}>
                  {this.state.errMsg}
              </Modal.Body>
              <Modal.Footer style={{alignItems:'right'}}>
                  <CustomeButton style={{marginTop: '10px', width: '50px', height: '40px'}} onClick={()=>{this.setState({ msgModal : false,loaderShow : false, errMsg : ''})}}>Ok</CustomeButton>
              </Modal.Footer>
          </Modal>




       {/* ---------------------------------View Program Modal----------------------------------- */}
        
        <Modal size="xl" show={this.state.modalShow}  onHide={(event) => this.hideModal(event,this.state.checkPrev)} backdrop="static">
          <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title>{i18n.t('PLAN_SELECTION.MODEL_TITLE')}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{padding : '0'}}>{/* padding: '15px' ,textAlign : 'justify', overflowX : 'hidden'*/}
              {
                  this.state.loaderShow ? <Loader></Loader> : ''
              }

              {
                  <iframe style={{ height: '430px', width: '100%' }}  onLoad={()=>this.setState({loaderShow:false})}  src={this.state.iframeURL}></iframe>
              }

          </Modal.Body>
          <Modal.Footer>
            <CustomeButton disabled={this.state.Checked === ''} onClick={(event) => this.viewPlanHideModal(event,this.state.Checked)}>{i18n.t('BUTTON.DONE')}</CustomeButton>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    subId: state.subId
  };
}

export default withStyles(styles)(connect(mapStateToProps)(PlanSelection));
