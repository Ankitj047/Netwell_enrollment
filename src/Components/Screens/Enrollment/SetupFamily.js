import React from 'react';
import './SetupFamily.css'
import customecss from './SetupFamily.css';
import CustomeCss from './EnrollFamily/EnrollFamily.module.css';
import { withStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove'
import CheckIcon from '@material-ui/icons/Check';
import PropTypes from "prop-types";
import Radium from 'radium';

import { Button } from '@material-ui/core';
import axios from 'axios';
import configuration from '../../../configurations';
import { connect } from 'react-redux';
import Loader from '../../loader';
import Sample from '../../CommonScreens/sampleTextField';
import customStyle from '../../../Assets/CSS/stylesheet_UHS';
import CommonDropDwn from "../../CommonScreens/CommonDropDwn";
import { TextField } from '@material-ui/core';
import Configuration from '../../../configurations';
import i18n from "../../../i18next";
import moment from "moment";
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import Grid from '@material-ui/core/Grid';
import Cookies from 'universal-cookie';
import {Modal} from "react-bootstrap";

var convert = require('xml-js');

var fullFamilyData = [];
var dependentArr = [];

const styles = theme => ({
  textField: {
    width: '23%',
    height: '15.6%',
    marginRight: '2.5%',
    backgroundColor: '#f1f1f1',
    color: '#19191d',
    marginTop: '0',
    marginBottom: '0',
    marginLeft: '0',
    borderRadius: '4px'
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  }
});

const CrudButton = withStyles(
    // customStyle.crudBtn,
    customStyle.crudBtnNetwell
)(Fab);

const DeleteButton = withStyles(
    // customStyle.delBtn
    customStyle.delBtnNetwell
)(Fab);

const NextButton = withStyles(
    // customStyle.doneBtn
    customStyle.doneNetwellBtn
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

const cookies = new Cookies();

class SetupFamily extends React.Component {
  list=[];
  timeout = 0;

  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      youDetails: {
          id: '',
          firstName: '',
          lastName: '',
          gender: '',
          age: '',
          state : '',
          postalCode : '',
          country : '',
          city : '',
          birthDate : '',
          dateErr : false,
          birthDtFocus : false,
          birthDt:false,
          valid: false,
      },
      familyDetails: [ //for setting blank array input for new user comment out
        // {
        //     id: '',
        //     memberId: '',
        //     firstName: '',
        //     lastName: '',
        //     gender: '',
        //     age: '',
        //     relationshipCode: '',
        //     birthDate : '',
        //     relationShiperr:'Select relationship',
        //     valid: false,
        //     dateErr: false
        // } 
      ],
      genderList: [],
      relationshipList: [],
      spouseIndex:-1,
      loaderShow: false,
      addButtonCount:0,
      childValue:0,
      allEditFlag : false,
      allDataSaved : false,
      ssnval:'',
      familyDefModal : false,
      msgModal : false
    }


  }
  componentWillUnmount() {
    this._isMounted = false;
}


    componentDidMount() {
      this._isMounted = true;
      sessionStorage.setItem('current_screen', '1');
      window.scrollTo(0, 0);
    this.setState({
      loaderShow: true
    });

    let dependantData = JSON.parse(sessionStorage.getItem('Dependant'));
    let yourDetails = JSON.parse(sessionStorage.getItem('MemberDetails'));
    let postalCodeData = JSON.parse(sessionStorage.getItem('postalCodeData'));
    

    fetch(configuration.baseUrl + '/enrollment/getGender')
      .then((response) => response.json())
      .then(response => {
        if(this._isMounted) {
        this.setState({
          genderList: response.response
        });
      }
      })
      .catch(error => {
        console.log(error);
      })

    fetch(configuration.baseUrl + '/enrollment/getRelationshipCode')
      .then((response) => response.json())
      .then(response => {
        if (response.response) {
          let abc = JSON.parse(JSON.stringify(response.response));
          if(abc.length >0 && abc.indexOf('SPOUSE')!==-1){
            abc.splice(abc.indexOf('SPOUSE'),1)
          }
          this.list = abc;
          this.setState({
            relationshipList: response.response,
          });
        }

      })
      .catch(error => {
        console.log(error);
      });

    //data for primary member
    axios.get(configuration.baseUrl + '/setupfamily/getMemberInfo/' + this.props.subId)
      .then(response => {
        if (response && response.data.response) {
          let data = response.data.response;
          localStorage.setItem('memberId', data.id);
          //sessionStorage.removeItem('coverage');
          
          if(data.firstName && data.lastName){ //API having data for primary member
            this.calculate_age(data.birthDate, 'UR_DETAILS', null)
            console.log("memberage---",this.state.youDetails.age)
              this.setState({
                  youDetails: {
                      id: data.id ? data.id : '',
                      firstName: data.firstName ? data.firstName : '',
                      lastName: data.lastName ? data.lastName : '',
                      gender: data.genderCode ? data.genderCode : '',
                      age: data.age ? this.state.youDetails.age : '',
                      state : data.state ? data.state : '',
                      postalCode : data.postalCode ? data.postalCode : '',
                      country : data.country ? data.country : '',
                      city : data.city ? data.city : '',
                      birthDate : data.birthDate,
                      valid: true,
                      dateErr : false
                  },
                  loaderShow: false
              }, () => {
                  this.enableDone();
              });

              fullFamilyData.push(
                {
                  id: data.id ? data.id : '',
                  firstName: data.firstName ? data.firstName : '',
                  lastName: data.lastName ? data.lastName : '',
                  gender: data.genderCode ? data.genderCode : '',
                  age: data.age ? this.state.youDetails.age : '',
                  state : data.state ? data.state : '',
                  postalCode : data.postalCode ? data.postalCode : '',
                  country : data.country ? data.country : '',
                  city : data.city ? data.city : '',
                  birthDate : data.birthDate,
                  valid: true,
                  dateErr : false
              }
              );

          } else if(yourDetails){ //session storage data
              let gender = yourDetails.gender === 'F' ? 'FEMALE' : yourDetails.gender === 'M' ? 'MALE' : yourDetails.gender === 'U' ? 'NEUTRAL' : '';
              this.setState({
                  youDetails: {
                      id: data.id,
                      firstName: '',
                      lastName: '',
                      gender:  gender,
                      age: yourDetails.age,
                      state : (postalCodeData && postalCodeData.state) ? postalCodeData.state : '',
                      postalCode : (postalCodeData && postalCodeData.postalCode) ? postalCodeData.postalCode : '',
                      country : (postalCodeData && postalCodeData.country) ? postalCodeData.country : '',
                      city : (postalCodeData && postalCodeData.city) ? postalCodeData.city : '',
                      birthDate : '',
                      valid: false,
                      dateErr : false
                  },
                  loaderShow: false,

              }, () => {
                  this.enableDone();
              });
          } 
        } else if(yourDetails){ //session storage not havinga data
          let gender = yourDetails.gender === 'F' ? 'FEMALE' : yourDetails.gender === 'M' ? 'MALE' : yourDetails.gender === 'U' ? 'NEUTRAL' : '';
            this.setState({
                youDetails: {
                    id: '',
                    firstName: '',
                    lastName: '',
                    gender:  gender,
                    age: yourDetails.age,
                    state : (postalCodeData && postalCodeData.state) ? postalCodeData.state : '',
                    postalCode : (postalCodeData && postalCodeData.postalCode) ? postalCodeData.postalCode : '',
                    country : (postalCodeData && postalCodeData.country) ? postalCodeData.country : '',
                    city : (postalCodeData && postalCodeData.city) ? postalCodeData.city : '',
                    birthDate : '',
                    valid: false,
                    dateErr : false
                },
                loaderShow: false,
               
            }, () => {
                this.enableDone();
            });
        } else {
            this.setState({
                loaderShow: false
            });
        }
      })
      .catch(error => {
        console.log(error);
      })

    //Data for Dependants
    axios.get(configuration.baseUrl + '/setupfamily/getBeneficiaryInfoBySubId/' + this.props.subId)
      .then(response => {
        if (response && response.data.response) {
          console.log("response.data.response dependant===",response.data.response)
          let data = [];
          let count=0;
          let resData = response.data.response;
          for (let i = 0; i < resData.length; i++) {

            data.push({
              id: resData[i].id,
              memberId: resData[i].memberId,
              firstName: resData[i].firstName ? resData[i].firstName : '',
              lastName: resData[i].lastName ? resData[i].lastName : '',
              gender: resData[i].gender ? resData[i].gender : '',
              age: ( resData[i].age || resData[i].age === 0) ? resData[i].age : '',
              relationshipCode: resData[i].relationshipCode ? resData[i].relationshipCode.toUpperCase() : '',
                // birthDate : moment(resData[i].birthDate).format('YYYY-MM-DD'),
                birthDate : resData[i].birthDate ? moment(resData[i].birthDate).format('YYYY-MM-DD'): null,
              relationShiperr:'Select relationship',
              valid: true,
                dateErr : false
            });

            dependentArr.push({
              id: resData[i].id,
              memberId: resData[i].memberId,
              firstName: resData[i].firstName ? resData[i].firstName : '',
              lastName: resData[i].lastName ? resData[i].lastName : '',
              gender: resData[i].gender ? resData[i].gender : '',
              age: ( resData[i].age || resData[i].age === 0) ? resData[i].age : '',
              relationshipCode: resData[i].relationshipCode ? resData[i].relationshipCode.toUpperCase() : '',
                // birthDate : moment(resData[i].birthDate).format('YYYY-MM-DD'),
                birthDate : resData[i].birthDate ? moment(resData[i].birthDate).format('YYYY-MM-DD'): null,
              relationShiperr:'Select relationship',
              valid: true,
                dateErr : false
            });
          }

            let findIndex = data.findIndex(obj => obj.relationshipCode === 'SPOUSE');
            this.setState({
              familyDetails: data,
              loaderShow: false,
                spouseIndex : findIndex
            }, () => {
                this.enableDone();
            });
        }else if(dependantData && dependantData.length > 0){
            let data = [];
            for (let i = 0; i < dependantData.length; i++) {
                let gender = dependantData[i].gender === 'F' ? 'FEMALE' : dependantData[i].gender === 'M' ? 'MALE' : dependantData[i].gender === 'U' ? 'NEUTRAL' : '';

                data.push({
                    id: '',
                    memberId: '',
                    firstName: '',
                    lastName: '',
                    gender: gender,
                    age: dependantData[i].age,
                    relationshipCode: dependantData[i].relationshipCode,
                    relationShiperr:'Select relationship',
                    birthDate : '',//birthDate.format('YYYY-MM-DD')
                    valid: false,
                    dateErr : false
                });

                let findIndex = data.findIndex(obj => obj.relationshipCode === 'SPOUSE');
                this.setState({
                    familyDetails: data,
                    loaderShow: false,
                    spouseIndex : findIndex
                }, () => {
                    this.enableDone();
                });
            }

        } else if(sessionStorage.getItem('coverage') && sessionStorage.getItem('coverage') === 'me'){
            this.setState({
                loaderShow: false,
                familyDetails : []
            });
        }else {
          this.setState({
            loaderShow: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      })

  }

  addMemberHandler = event => {
    this.state.allEditFlag = false;
    let familyDetails = this.state.familyDetails;
    let relationshipCode = '';
    let found = familyDetails.find(obj => obj.relationshipCode === 'SPOUSE');
    if (found){
      relationshipCode = 'CHILD';
    }

      familyDetails.push({
        id: '',
        memberId: '',
        firstName: '',
        lastName: '',
        gender: '',
        age: '',
          birthDate : '',
        relationshipCode: relationshipCode,
        relationShiperr:'Select relationship',
        valid: false,
          dateErr : false
      });

      let findIndex = familyDetails.findIndex(obj => obj.relationshipCode === 'SPOUSE');

    this.setState({
        familyDetails: familyDetails,
        memberValid:false,
        addButtonCount:this.state.addButtonCount+1,
        spouseIndex : findIndex
      }, () => this.enableDone());
  }

  saveFamilyMemberHandler = (event, item, i) => {
//    this.state.allEditFlag = false;
    item.edit = false;

    let dependantData = JSON.parse(sessionStorage.getItem('Dependant'));
    let gender = item.gender === 'FEMALE' ? 'F' : item.gender === 'MALE' ? 'M' : item.gender === 'NEUTRAL' ? 'U' : '';
    if(dependantData && dependantData.length > 0){
        let sessionDataIndex = dependantData.findIndex(obj => obj.age === item.age && obj.gender === gender);
        if(sessionDataIndex > -1){
            dependantData.splice(sessionDataIndex, 1);
        }
    }

    let editCount = 0;
    for(let i=0;i<this.state.familyDetails.length; i++){
      if(this.state.familyDetails[i].edit){
        editCount++;
      }
    }

    if(!this.state.youDetails.edit && editCount === 0){
      this.state.allEditFlag = false;
    }

    this.setState({
      loaderShow: true
    });
    const data = {
      id: item.id,
      memberId: this.state.youDetails.id,
      subId: this.props.subId,
      firstName: item.firstName,
      lastName: item.lastName,
      gender: item.gender,
      age: item.age,
        birthDate: item.birthDate,
      relationshipCode: item.relationshipCode,
    };

    let count = 0;
    for(let i=0;i<this.state.familyDetails.length; i++){
      count = this.state.familyDetails[i].valid ? count+1 : count;
    }

    axios.post(configuration.baseUrl + '/setupfamily/addBeneficiaryInfo', data)
        .then(response => {

          item.id = response.data.response ? response.data.response.id : '';
          this.setState({
            loaderShow: false,
            //memberValid:true
          },()=>{
            let count = 0;
            for(let i=0; i<this.state.familyDetails.length; i++){
              if(this.state.familyDetails[i].id !== '' && this.state.familyDetails[i].edit === false){
                count++;
              }
            }
            sessionStorage.setItem('Dependant', JSON.stringify(dependantData));
          });
        }).catch(error => {
      console.log(error);
    })
  }

  editFamilyMemberHandler = (event, item) => {
    item.edit = true;
    this.state.allEditFlag = true;

    this.setState({
      refresh: true,
    });
  }

  deleteFamilyMemberHandler = (event, item, i) => {
    this.state.familyDetails.splice(i,1);
   
    this.setState({
      loaderShow: true,
    });
    let count = 0;
    let editCount = 0;
    for(let i=0;i<this.state.familyDetails.length; i++){
      count = this.state.familyDetails[i].valid ? count+1 : count;
      if(this.state.familyDetails[i].edit){
        editCount++;
      }
    }

      let dependantData = JSON.parse(sessionStorage.getItem('Dependant'));
      let gender = item.gender === 'FEMALE' ? 'F' : item.gender === 'MALE' ? 'M' : item.gender === 'NEUTRAL' ? 'U' : '';

      if(dependantData && dependantData.length > 0){
          let sessionDataIndex = dependantData.findIndex(obj => obj.age === item.age && obj.gender === gender);
          if(sessionDataIndex > -1){
              dependantData.splice(sessionDataIndex, 1);
          }
      }

    if(!this.state.youDetails.edit && editCount === 0){
      this.state.allEditFlag = false;
    }

    if(item.id){
      
      fetch(configuration.baseUrl + '/setupfamily/removeFamilyMember/' + item.id + '/' + this.props.subId)
          .then((response) => response.json())
          .then(response => {
            let spouse=0;
            
            for(let i=0; i<this.state.familyDetails.length; i++){
              if(this.state.familyDetails[i].relationshipCode.toLocaleLowerCase() === 'spouse'){
                spouse++;
                if(spouse > 1){
                  this.state.familyDetails[i].relationShiperr='Spouse is already exist';
                  this.state.familyDetails[i].valid = false;
                } else {
                  this.state.familyDetails[i].relationShiperr='Select relationship';
                }
              } else{
                this.state.familyDetails[i].relationShiperr='Select relationship';
              }
            }

              let findIndex = this.state.familyDetails.findIndex(obj => obj.relationshipCode === 'SPOUSE');
              sessionStorage.setItem('Dependant', JSON.stringify(dependantData));
              this.setState({
              loaderShow: false,
              memberValid:true,
              
                spouseIndex : findIndex
          },() =>  this.enableDone());
          })
          .catch(error => {
            console.log(error);
          })
    } else{
        let findIndex = this.state.familyDetails.findIndex(obj => obj.relationshipCode === 'SPOUSE');
        sessionStorage.setItem('Dependant', JSON.stringify(dependantData));

        this.setState({
        loaderShow: false,
        memberValid:true,
          spouseIndex : findIndex
      },() => this.enableDone());
    }
  }

  saveMemberHandler = (event) => {

    this.setState({
      loaderShow: true
    });

    const data = {
        id: this.state.youDetails.id,
        subId: this.props.subId,
        firstName: this.state.youDetails.firstName,
        lastName: this.state.youDetails.lastName,
        genderCode: this.state.youDetails.gender,
        age: this.state.youDetails.age,
        state : this.state.youDetails.state,
        postalCode : this.state.youDetails.postalCode,
        country : this.state.youDetails.country,
        city : this.state.youDetails.city,
        birthDate : this.state.youDetails.birthDate,
        username :this.props.userName,
        clientId : sessionStorage.getItem('CLIENT_ID'),
    };

    axios.post(configuration.baseUrl + '/setupfamily/addMemberInfo', data)
      .then(response => {
        localStorage.setItem('memberId', response.data.response.id);
        this.setState({
          youDetails: {
            ...this.state.youDetails,
            id: response.data.response.id,
          },
          loaderShow: false,
        });
          let yourDetails = JSON.parse(sessionStorage.getItem('MemberDetails'));
          if(yourDetails){
            sessionStorage.removeItem('MemberDetails');
            sessionStorage.removeItem('postalCodeData');
          }
      })
      .catch(error => {
        console.log(error);
      })
  }

  editMemberHandler = (event) => {
    this.state.youDetails.edit = true;
    this.state.allEditFlag = true;
    this.setState({
      refresh : true
    });
  }

  getValue =(val,itemValid,parentDetails)=>{
    let count =0;
    let ageValidator=0;
    if(parentDetails.flag === 'UR_DETAILS'){

      if(parentDetails.label === 'First Name'){
        if(itemValid){
          this.state.youDetails.firstName = val;
        }else{
          this.state.youDetails.firstName = '';
        }

      } else if(parentDetails.label === 'Last Name'){
        if(itemValid){
          this.state.youDetails.lastName = val;
        }else{
          this.state.youDetails.lastName = '';
        }
      }else if(parentDetails.label === 'Age'){
        if(itemValid){
          this.state.youDetails.age = val;
          var birthDate = moment().subtract(val, 'years');
          this.state.youDetails.birthDate = birthDate.format('YYYY-MM-DD');

        }else{
            this.state.youDetails.age = '';
            this.state.youDetails.birthDate = '';
        }
      } else if(parentDetails.label === 'Gender'){
        if(itemValid){
          this.state.youDetails.gender = val;
        }else{
          this.state.youDetails.gender = '';
        }
      } else if(parentDetails.label === 'Zip'){
          if(itemValid){
              this.setState({
                  loaderShow : true
              })
              this.state.youDetails.postalCode = val;
              this.handlePostalCode(val,parentDetails);
          }else{
              this.state.youDetails.postalCode = '';
              this.state.youDetails.state = '';
              this.state.youDetails.city = '';
              this.state.youDetails.country = '';
          }
      }
     this.enableDone();

    } else if(parentDetails.flag === 'FAMILY_DETAILS'){
      this.state.familyDetails[parentDetails.index].valid = itemValid;
        if(parentDetails.label === 'First Name'){
          if(itemValid){
            this.state.familyDetails[parentDetails.index].firstName = val;
          }else{
            this.state.familyDetails[parentDetails.index].firstName = '';
          }

        } else if(parentDetails.label === 'Last Name'){
          if(itemValid){
            this.state.familyDetails[parentDetails.index].lastName = val;
          }else{
            this.state.familyDetails[parentDetails.index].lastName = '';
          }
        }else if(parentDetails.label === 'Age'){
          if(itemValid){
            if(this.state.familyDetails[parentDetails.index].relationshipCode.toLocaleLowerCase() === 'spouse'){
                if(val< 18 || val >85){
                    this.state.familyDetails[parentDetails.index].dateErr = true;
                }else{
                  //var evt = new CustomEvent('ageValid',{detail:{index:parentDetails.index,type:'spouse',flag:false}});
                    this.state.familyDetails[parentDetails.index].dateErr = false;
                }
            }else{
              if(this.state.familyDetails[parentDetails.index].relationshipCode!=='' && val>26){
                // ageValidator=1;
                // var evt = new CustomEvent('ageValid',{detail:{index:parentDetails.index,type:'spouse',flag:true}});
                  this.state.familyDetails[parentDetails.index].dateErr = true;

              }else{
                //var evt = new CustomEvent('ageValid',{detail:{index:parentDetails.index,type:'spouse',flag:false}});
                  this.state.familyDetails[parentDetails.index].dateErr = false;
              }
            }
            //window.dispatchEvent(evt);
            this.state.familyDetails[parentDetails.index].age = val;
            let birthDate = moment().subtract(val, 'years');
            this.state.familyDetails[parentDetails.index].birthDate = birthDate;
          }else{
            this.state.familyDetails[parentDetails.index].age = '';
              this.state.familyDetails[parentDetails.index].birthDate = '';
          }
        }else if(parentDetails.label === 'Gender'){
          if(itemValid){
            this.state.familyDetails[parentDetails.index].gender = val;
          }else{
            this.state.familyDetails[parentDetails.index].gender = '';
          }
        } else if(parentDetails.label === 'Relationship'){
          let spouse=0;
          if(val.toLocaleLowerCase() === 'spouse'){
            for(let j=0;j<this.state.familyDetails.length;j++){
              if(this.state.familyDetails[j].relationshipCode.toLocaleLowerCase() === 'spouse'){
                spouse++;
              }
            }

            if(spouse === 0){
              if(this.state.familyDetails[parentDetails.index].age !=='' && !isNaN(this.state.familyDetails[parentDetails.index].age)){
                if(this.state.familyDetails[parentDetails.index].age< 18 || this.state.familyDetails[parentDetails.index].age >85){
                 /* ageValidator = 1;
                  var evt = new CustomEvent('ageValid',{detail:{index:parentDetails.index,type:'spouse',flag:true}});*/
                    this.state.familyDetails[parentDetails.index].dateErr = true;
                }else{
                  //var evt = new CustomEvent('ageValid',{detail:{index:parentDetails.index,type:'spouse',flag:false}});
                    this.state.familyDetails[parentDetails.index].dateErr = false;
                }
               
                //window.dispatchEvent(evt);
              } else {
                  this.state.familyDetails[parentDetails.index].dateErr = true;
              }
              this.state.familyDetails[parentDetails.index].relationshipCode = val;
              this.state.spouseIndex=parentDetails.index;
            }

          }else{
              if(!isNaN(this.state.familyDetails[parentDetails.index].age)){
                  if(this.state.familyDetails[parentDetails.index].age>26){
                      /*ageValidator=1
                      var evt = new CustomEvent('ageValid',{detail:{index:parentDetails.index,type:'child',flag:true}});*/
                      this.state.familyDetails[parentDetails.index].dateErr = true;
                  }else{
                      //var evt = new CustomEvent('ageValid',{detail:{index:parentDetails.index,type:'child',flag:false}});
                      this.state.familyDetails[parentDetails.index].dateErr = false;
                  }
              } else {  
                  this.state.familyDetails[parentDetails.index].dateErr = true;
              }

            //window.dispatchEvent(evt);
            this.state.familyDetails[parentDetails.index].relationshipCode = val;
            if(this.state.spouseIndex === parentDetails.index){
              this.state.spouseIndex=-1;
            }
          }
        }
    }
    this.setState({
      refresh : true
    }, () => this.enableDone());
  };

    calculate_age(dob1, flag, index){
        var today = new Date();
        var birthDate = new Date(dob1);
        var age_now = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age_now--;
        }
        console.log("age_now===",age_now)
        if(flag === 'UR_DETAILS'){
            this.state.youDetails.age = age_now;
            if(age_now > 17 && age_now < 86){
                return true;
            } else {
                return false;
            }
        } else if(flag ==='FAMILY_DETAILS'){
            this.state.familyDetails[index].age = age_now;
            if(this.state.familyDetails[index].relationshipCode === 'SPOUSE'){
                if(age_now > 17 && age_now < 86){
                    return true;
                } else {
                    return false;
                }
            } else if(this.state.familyDetails[index].relationshipCode === 'CHILD'){
                if(age_now >= 0 && age_now < 26){
                    return true;
                } else {
                    return false;
                }
            } else {
                if(age_now >= 0 && age_now < 86){
                    return true;
                } else {
                    return false;
                }
            }
        }
    }


    handlePostalCode = (zipcode,parent) => {
        this.setState({
            loaderShow: true
        });
        let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="935USTGL7449"><ZipCode ID="0"><Zip5>${zipcode}</Zip5></ZipCode></CityStateLookupRequest>`

        axios.get(url)
            .then(response => {
                var result2 = convert.xml2json(response.data, { compact: false, spaces: 4 });
                if (JSON.parse(result2).elements[0].elements[0].elements[0].elements[2] ) {
                    var evt = new CustomEvent('zip',{detail:{zipcode:zipcode,flag:true, errMsg : "Enter valid zip code"}});
                    window.dispatchEvent(evt);
                    this.state.youDetails.state = '';
                    this.state.youDetails.city = '';
                    this.state.youDetails.country = '';
                    this.setState({
                        refresh : true,
                        loaderShow: false
                    });

                } else {
                  axios.get(Configuration.baseUrl + '/plan/validateBlackListState/'+JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text)
                        .then(response=>{
                          this.setState({
                            loaderShow : false
                        });

                        if(!response.data.response){
                    this.state.youDetails.postalCode = JSON.parse(result2).elements[0].elements[0].elements[0].elements[0].text;
                    this.state.youDetails.state = JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text;
                    this.state.youDetails.city = JSON.parse(result2).elements[0].elements[0].elements[1].elements[0].text;
                    this.state.youDetails.country = 'US';
                    this.setState({
                        refresh : true,
                        loaderShow: false
                    }, () =>{
                        this.enableDone();
                    });
                  }else{
                        this.state.youDetails.state = '';
                        this.state.youDetails.city = '';
                        this.state.youDetails.country = '';
                        var evt = new CustomEvent('zip',{detail:{zipcode:zipcode,flag:true, errMsg: 'Programs are not offered in this zip code', parentDetails : parent}});
                        window.dispatchEvent(evt);
                            this.setState({
                                refresh : true,
                                loaderShow: false
                            }, () =>{
                                this.enableDone();
                            });
                    }
                  })
                }
            })
            .catch(error => {
                let evt = new CustomEvent('zip',{detail:{zipcode:zipcode,flag:true, errMsg : "Enter valid zip code"}});
                window.dispatchEvent(evt);
                this.state.youDetails.state = '';
                this.state.youDetails.city = '';
                this.state.youDetails.country = '';
                this.setState({
                    refresh : true,
                    loaderShow: false,
                    msgModal : true
                }, () =>{
                    this.enableDone();
                });
            })
    };

    handlerCopy(e){
        e.preventDefault();
    }

    handleHover(){
        var panel = document.getElementById("date-picker-dialog");
        panel.addEventListener("mouseover", function() {
            document.getElementById("date-picker-dialog").style.color = "#533278";
        });
    }

    handleDateChange = (date, didMount, flag, index) => {
        if(flag === 'UR_DETAILS'){
            this.state.youDetails.birthDate = moment(date).format('YYYY-MM-DD');
            let validAge  =  this.calculate_age(this.state.youDetails.birthDate, flag, null);
            this.state.youDetails.dateErr = !validAge;
            this.setState({
                refresh : true
            },() =>  this.enableDone());
        } else if(flag === 'FAMILY_DETAILS'){
            this.state.familyDetails[index].birthDate = moment(date).format('YYYY-MM-DD');
            let validAge  =  this.calculate_age(this.state.familyDetails[index].birthDate, flag, index);
            this.state.familyDetails[index].dateErr = !validAge;
            this.setState({ refresh : true },()=> this.enableDone());
        }
    }

    enableDone = () => {
        let count = 0;
        Object.keys( this.state.youDetails).map( (key,index) => {
            // if(key !== "id"|| key !== "country" || key !== "city" || key !== "state"){
            //   if((key=="state" || key == "country" || key == "city") && this.state.youDetails[key] === '' || this.state.youDetails[key] === null){
            //     count=0
            //   }
            // if(key !== "id"){
            //   if(this.state.youDetails[key] === '' || this.state.youDetails[key] === null){
            //     count=0
            //   }
            //    else if(this.state.youDetails[key] === '' || this.state.youDetails[key] === null){
            //         count++;
            //     }
            // }

            if(key !== "id"){
              if(this.state.youDetails[key] === '' || this.state.youDetails[key] === null || this.state.youDetails[key] == "Invalid date" || this.state.youDetails[key] == null){
                  count++;
              }
          }


        });
        console.log("== youDetails ==", this.state.youDetails);
        if(count === 0 && !this.state.youDetails.dateErr ){
            this.state.youDetails.valid = true;
        } else {
            this.state.youDetails.valid = false;
        }

        let fCount = 0;
        console.log("== familyDetails ==", this.state.familyDetails);
        for(let i=0; i<this.state.familyDetails.length; i++){
            Object.keys(this.state.familyDetails[i]).map( (key,index) => {
                if(key !== "id" && key !== 'memberId'){
                    if(this.state.familyDetails[i][key] === '' || this.state.familyDetails[i].relationShiperr ==='Spouse is already exist' || this.state.familyDetails[i].dateErr || this.state.familyDetails[i].birthDate == "Invalid date" || this.state.familyDetails[i].birthDate == null){
                        fCount++;
                    }
                }
            });

            if(fCount === 0){
                this.state.familyDetails[i].valid=true;
            } else {
                this.state.familyDetails[i].valid=false;
            }
        }


        let family_count = 0;
        for(let i=0; i<this.state.familyDetails.length; i++) {
            if (this.state.familyDetails[i].valid) {
                family_count++;
            }
        }

       
        if(this.state.youDetails.valid && family_count === this.state.familyDetails.length){
            this.setState({
                allDataSaved : true
            })
        } else {
            this.setState({
                allDataSaved : false
            })
        }
    };
    saveProceedData = () => {    
      if(sessionStorage.getItem('isEditCensus') == true || sessionStorage.getItem('isEditCensus') == 'true'){
        dependentArr.forEach(function (dataObj) {
          fullFamilyData.push(dataObj);
        });
        console.log("==== FULL FAMLIY DATA ===", fullFamilyData);
        
        let updatedFamilyData = [];
        delete this.state.youDetails.birthDt;
        updatedFamilyData.push(this.state.youDetails);
        this.state.familyDetails.forEach(function (dataObj) {
          delete dataObj.birthDt;
          updatedFamilyData.push(dataObj);
        });
        console.log("==== UPDATED FAMLIY DATA ===", updatedFamilyData);
  
        if(JSON.stringify(fullFamilyData) == JSON.stringify(updatedFamilyData)){
          console.log("TRUE");
          fullFamilyData = [];
          dependentArr = [];
          window.close();
        }else{
          console.log("FALSE");
          fullFamilyData = [];
          dependentArr = [];
          this.submitData();
        }
      }else{
        fullFamilyData = [];
          dependentArr = [];
        this.submitData();
      }
      
    };
    submitData = () => {
        this.setState({
            loaderShow: true
        });
        let emailData = JSON.parse(localStorage.getItem('CurrentLoginUser'));
        let phone = localStorage.getItem('phone');
        let STATE_PARAM = cookies.get('STATE_PARAM', false);

        let currentScreen = sessionStorage.getItem('current_screen');
        /* if(sessionStorage.getItem('prev_current_screen') || sessionStorage.getItem('prev_current_screen') != null ){
          currentScreen = sessionStorage.getItem('prev_current_screen')
        } */ 

        let obj = new Object();
        obj.head = JSON.parse(JSON.stringify(this.state.youDetails));
        obj.head.subId =  this.props.subId;
        obj.head.username = this.props.userName;
        obj.head.clientId = sessionStorage.getItem('CLIENT_ID');
        obj.head.email = emailData.email;
        obj.head.phone = emailData.phone;
        obj.head.genderCode = this.state.youDetails.gender;
        obj.head.completionStatus = currentScreen;
        if(STATE_PARAM){
            obj.head.brokerId = STATE_PARAM.brokerId;
            obj.head.associationId = STATE_PARAM.associationId;
            obj.head.clientId = STATE_PARAM.clientId;
            obj.head.empid = STATE_PARAM.empid ? STATE_PARAM.empid : ''
        }
        delete obj.head.dateErr;
        delete obj.head.birthDtFocus;
        delete obj.head.birthDt;
        delete obj.head.valid;
        delete obj.head.gender;
        obj.familyMembers = JSON.parse(JSON.stringify(this.state.familyDetails));

        for(let i=0; i<obj.familyMembers.length; i++){
            obj.familyMembers[i].subId = this.props.subId;
            delete obj.familyMembers[i].dateErr;
            delete obj.familyMembers[i].relationShiperr;
            delete obj.familyMembers[i].valid;
        }

        axios.post(configuration.baseUrl + '/setupfamily/saveAllMembers', obj)
            .then(response => {
                if(response && response.data && response.data.code === 200){
                  if(sessionStorage.getItem('isEditCensus') == true || sessionStorage.getItem('isEditCensus') == 'true'){
                    sessionStorage.removeItem('STATE_PARAM');
                    sessionStorage.removeItem('STATE_VAL');
                    sessionStorage.removeItem('CLIENT_ID');
                    sessionStorage.removeItem('CHAT_BOX_Id');
                    cookies.remove("STATE_PARAM", { path: '/' });
                    window.close();
                  }else{
                    this.props.onClick();
                  }
                    
                }
                if(this._isMounted) {
                this.setState({
                    loaderShow: true
                });
              }
            })
            .catch(error => {
                console.log(error);
            })

    };

    abc(){
       window.purechatApi.on('chatbox:ready', function () {
           window.purechatApi.set('chatbox.expanded', true); // Hide the chat box (true shows it)
       })
    }

    render() {
    const {t}=this.props;
    let classes = this.props;
      let yoursDetailsBirthdate = this.state.youDetails.birthDate ? moment(this.state.youDetails.birthDate).format('MM')+'/'+moment(this.state.youDetails.birthDate).format('DD')+'/'+moment(this.state.youDetails.birthDate).format('YYYY') : null;
      let durationBody = this.state.familyDetails.map((item, i) => {
          let myDate = item.birthDate ? moment(item.birthDate).format('MM')+'/'+moment(item.birthDate).format('DD')+'/'+moment(item.birthDate).format('YYYY') : null;
          let idVal = "date-picker-dialog" + i;
      return (
        <div key={i}>
        <Grid container direction="row" spacing={1}>
        <Grid item xs={12} md={2} lg={3}>
        <div id ='fam' style={customStyle.setupfamilyfnameAfterGrid}>
          <Sample setChild={this.getValue.bind(this)} name={'FirstName'} label={'First Name'} reqFlag={true} value={item.firstName} disable={false} style={customStyle.textFieldWrp} length={25}  fieldType={'text'} errMsg={'Enter valid first name'} helperMsg={'First name required'}  parentDetails={{index:i,flag:"FAMILY_DETAILS",label:'First Name'}}></Sample>
          </div>
        </Grid>

        <Grid item xs={12} md={2} lg={2}>
        <div id ='fam' style={customStyle.setupfamilyfnameAfterGrid}>
        <Sample setChild={this.getValue.bind(this)} name={'LastName'} label={'Last Name'} reqFlag={true} value={item.lastName} disable={false} style={customStyle.textFieldWrp} length={25}  fieldType={'text'} errMsg={'Enter valid last name'} helperMsg={'Last name required'}  parentDetails={{index:i,flag:"FAMILY_DETAILS",label:'Last Name'}}></Sample>
          </div>
        </Grid>

        <Grid item xs={12} md={2} lg={2}>
        <div id ='fam' style={customStyle.setupfamilyGenderGrid}>
        <CommonDropDwn setChild={this.getValue.bind(this)} name={'Gender'} label={'Birth Gender'} value={item.gender} disable={false} style={customStyle.dropDown}  fieldType={'dropDwn'}  helperMsg={'Select birth gender'} List={this.state.genderList}  parentDetails={{index:i,flag:"FAMILY_DETAILS",label:'Gender'}}></CommonDropDwn>
          </div>
        </Grid>
        <Grid item xs={12} md={2} lg={2} style={{marginBottom:'15px'}}>
        <div id ='fam' style={customStyle.setupfamilyAgeGrid}>
        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                     <KeyboardDatePicker
                         required
                         onBlur={()=> {
                             this.state.familyDetails[i].birthDtFocus = true;
                             this.setState({refresh : true});
                         }}
                         onMouseOver={()=>{
                             this.state.familyDetails[i].birthDt = true;
                             this.setState({refresh : true});
                         }}
                         onMouseOut={()=> {
                             this.state.familyDetails[i].birthDt = false;
                             this.setState({refresh : true});
                         }}
                         autoComplete='off'                        
                         margin="none"
                         id={idVal}
                         label="Birth Date"
                         format="MM/dd/yyyy"
                         error={item.dateErr}
                         helperText={!myDate ? 'Birth date required' : item.dateErr ? 'Select valid birth date':null}
                         value={myDate}
                         onCopy={this.handlerCopy}
                         onPaste={this.handlerCopy}
                         inputProps={{style: {fontFamily: 'Roboto, Arial, Helvetica, sans-serif',paddingLeft:'12px',paddingRight:'9px',marginTop:'10px',fontWeight:'normal','&:focus':{ outline: 'none'},color: !item.birthDt?'#19191d':'#533278'}}}
                         InputLabelProps={{style:{paddingLeft:12,paddingRight:12,paddingTop: !item.birthDate ? item.birthDtFocus ? 12 : 0 : 12,color: item.dateErr ? '#f44336': !item.birthDtFocus?'grey': item.birthDt?'#533278':'grey'}}}
                         onChange={e =>  this.handleDateChange(e, false, 'FAMILY_DETAILS', i)}
                         variant="filled"
                         onMouseEnter={this.handleHover}
                         TextFieldComponent={CssTextField}
                         KeyboardButtonProps={{
                             'aria-label': 'change date',
                         }}
                         style={customStyle.w100}
                         maxDate={new Date()}
                         views={["year", "month", "date"]}
                         openTo="year"
                  />

                </MuiPickersUtilsProvider>


          </div>
        </Grid>

        <Grid item xs={12} md={2} lg={2}>
        <div id ='fam' style={customStyle.setupfamilyGenderGrid}>
        <CommonDropDwn setChild={this.getValue.bind(this)} name={'Relationship'} label={'Relationship'} value={item.relationshipCode} disable={false} style={customStyle.dropDown}  fieldType={'dropDwn'}  helperMsg={item.relationShiperr} List={this.state.spouseIndex === -1?this.state.relationshipList: this.state.spouseIndex === i ? this.state.relationshipList : this.list}  parentDetails={{index:i,flag:"FAMILY_DETAILS",label:'Relationship'}} ></CommonDropDwn>
          </div>
        </Grid>
        <Grid item xs={12} md={2} lg={1}>
            <div style={{ display: 'flex', paddingTop: '5px',float:'right'}}>
              <DeleteButton aria-label="edit" style={customecss.removeIcon}  onClick={(event) => { this.deleteFamilyMemberHandler(event, item, i) }}>
                <RemoveIcon />
              </DeleteButton>
              
            </div>
            </Grid>
        </Grid>
        </div>

      );
    });
    return (
      <div style={customStyle.w100} >
        <div>
            {
                this.state.loaderShow ? <Loader></Loader> : ''
            }

        <Grid container direction="row" >
        <Grid item xs={12}>
          {this.props.reEnroll ? <div style={customecss.normalText}>{i18n.t('SETUP_FAMILY.ReEnrollmentTitle')}</div>:<div style={customecss.normalText}>{i18n.t('SETUP_FAMILY.TITLE')}</div>}
        </Grid>
        <Grid item xs={12}>
        <div style={customecss.heading}>{i18n.t('SETUP_FAMILY.UR_DET')}</div>
        </Grid>
        </Grid>


        <Grid container direction="row" spacing={1}>


        <Grid item xs={12} md={2} lg={3}>
        <div id ='s' style={customStyle.setupfamilyLnameGrid}>               
               <Sample setChild={this.getValue.bind(this)} name={'FirstName'} label={'First Name'} reqFlag={true} value={this.state.youDetails.firstName} disable={this.props.reEnroll ? true : false} style={customStyle.textFieldWrp} length={25} fieldType={'text'} errMsg={'Enter valid first name'} helperMsg={'First name required'}  parentDetails={{flag:"UR_DETAILS",label:'First Name'}}></Sample>
             </div>
        </Grid>

      <Grid item xs={12} md={2} lg={2}>
        <div id ='s' style={customStyle.setupfamilyLnameGrid}>               
        <Sample setChild={this.getValue.bind(this)} name={'LirstName'} label={'Last Name'} reqFlag={true} value={this.state.youDetails.lastName} disable={this.props.reEnroll ? true : false} style={customStyle.textFieldWrp} length={25} fieldType={'text'} errMsg={'Enter valid last name'} helperMsg={'Last name required'}  parentDetails={{flag:"UR_DETAILS",label:'Last Name'}}></Sample>
               
        </div>
        </Grid>
        
        <Grid item xs={12} md={2} lg={2}>
        <div id ='fam' style={customStyle.setupfamilyGenderGrid}>
        <CommonDropDwn setChild={this.getValue.bind(this)} name={'Gender'} label={'Birth Gender'} value={this.state.youDetails.gender} disable={this.props.reEnroll ? true : false} style={customStyle.dropDown} fieldType={'dropDwn'}  helperMsg={'Select birth gender'} List={this.state.genderList}  parentDetails={{flag:"UR_DETAILS",label:'Gender'}}></CommonDropDwn>
       
          </div>
        </Grid>


        <Grid item xs={12} md={2} lg={2}>
        <div id ='fam' style={customStyle.setupfamilyAgeGrid}>
        
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            required
                            onBlur={()=> {this.setState({youDetails : {...this.state.youDetails,birthDtFocus:true}},() => {})}}
                            onMouseOver={()=>this.setState({youDetails : {...this.state.youDetails,birthDt:true}})}
                            onMouseOut={()=>this.setState({youDetails : {...this.state.youDetails,birthDt:false}})}
                            autoComplete='off'
                            margin="none"
                            id="date-picker-dialog"
                            label="Birth Date"
                            format="MM/dd/yyyy"
                            error={this.state.youDetails.dateErr}
                            helperText={ !yoursDetailsBirthdate ? 'Birth date required':this.state.youDetails.dateErr?'Select valid birth date':null}
                            value={yoursDetailsBirthdate}
                            onCopy={this.handlerCopy}
                            onPaste={this.handlerCopy}
                            inputProps={{style: {fontWeight:'normal', fontFamily: 'Roboto, Arial, Helvetica, sans-serif',paddingLeft:'12px',paddingRight:'9px',marginTop:'10px','&:focus':{ outline: 'none'},color: !this.state.youDetails.birthDt?'#19191d':'#533278'}}}
                            InputLabelProps={{style:{paddingLeft:12 ,paddingRight:9,fontWeight:'normal',paddingTop: !this.state.youDetails.birthDate ? this.state.youDetails.birthDtFocus ? 12 : 0 : 12,color: this.state.youDetails.dateErr ? '#f44336': !this.state.youDetails.birthDtFocus?'grey':this.state.youDetails.birthDt?'#533278':'#19191d'}}}
                            onChange={e => this.handleDateChange(e, false, 'UR_DETAILS', null)}  
                            variant="filled"
                            onMouseEnter={this.handleHover}
                            TextFieldComponent={CssTextField}
                            KeyboardButtonProps={{'aria-label': 'change date'}}
                            style={customStyle.w100}
                            maxDate={new Date()}
                            views={["year", "month", "date"]}
                            openTo="year"
                            disabled = {this.props.reEnroll ? true : false}
                        />
                    </MuiPickersUtilsProvider>


          </div>
        </Grid>


        <Grid item xs={12} md={2} lg={2}>
        <div id ='s' style={customStyle.setupfamilyGenderGrid}>               
        <Sample setChild={this.getValue.bind(this)} name={'postal_code'} length={5} label={'Zip Code'} value={this.state.youDetails.postalCode} reqFlag={true} disable={this.props.reEnroll ? true : false} style={customStyle.textFieldWrp}  fieldType={'zip'}  helperMsg={'Zip code required'} errMsg={'Enter valid zip code'}  parentDetails={{flag:"UR_DETAILS",label:'Zip'}} ></Sample>
               
        </div>
        </Grid>

        </Grid>


        </div>

        <Grid container direction="row"  >
        <Grid item xs={12} md={2} lg={6}>
        <div style={customecss.headingGrid}>
              <span style={{marginRight:'15px'}}>{i18n.t('SETUP_FAMILY.FAMILY_DET')}</span>
              {/* <ViewButton variant="contained" color="primary" style={{ height : '35px',marginTop:'12px',marginBottom:'20px'}} onClick={() =>{this.setState({familyDefModal : true})}}>View our Family Definitions</ViewButton> */}

            </div>
            </Grid>
        </Grid>
        <div >
          <div >
         
         
{/* style={customStyle.setupfamilyDurationbody} */}
            <div style={customStyle.setupfamilyDurationbody}>
              {
                durationBody
              }
            </div>
            <div style={customStyle.w100}>
              <NextButton color="primary" aria-label="add" type="submit" disabled={!this.state.allDataSaved} style={{width:'147px'}} onClick={this.saveProceedData}>SAVE & PROCEED
                </NextButton>
              <CrudButton color="primary" aria-label="add" disabled={!this.state.allDataSaved} onClick={this.addMemberHandler} style={customecss.addIcon}>
                <AddIcon />
              </CrudButton>
            </div>

              <Modal size="lg" show={this.state.familyDefModal}  onHide={() => {this.setState({ familyDefModal : false})}} backdrop="static" style={{width: '100%'}}>
                  <Modal.Header style={customStyle.modal_header} closeButton>
                      <Modal.Title>Family Definitions</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ padding: '15px', textAlign:'justify', fontSize : '14px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'}}>
                      {
                          this.state.loaderShow && <Loader></Loader>
                      }
                      <p><b>Child</b> means a person under the age of 26 who is either: (i) a Sharing Member’s son or daughter, by birth or legal adoption; (ii) a step-son or step-daughter of a Sharing Member; (iii) a legal ward for whom the Sharing Member has been appointed as a guardian by court order; or (iv) a person for whom the Sharing Member has been issued a Qualified Medical Child Support Order, including a Minor Child or Adult Child.</p>

                      <p><b>Minor Child</b> means a Child under 18 who is either residing in the same home as the Sharing Member or in school full time while maintaining the home address of the Sharing Member as their official primary residence.</p>

                      <p><b>Adult Child</b> means a Child of a Sharing Member who (i) is over 17 and under 26 years; (ii) a dependent of the sharing member; and (iii) either residing in the same home as the Sharing Member or in school full time while maintaining the home address of the Sharing Member as their official primary residence. If added to a Family Program, Adult Children will be charged $40 each. Adult children over 25 are not eligible to join and must purchase an individual program.</p>

                      <p><b>Spouse</b> means a person’s partner by Marriage or a person’s partner in legally recognized and documented civil union or domestic partnership.</p>

                      <p><b>Domestic Partnership</b> means the spiritual and legal union of two persons united as partners in a consensual and contractual relationship recognized by the civil union or domestic partnership laws and regulations of the state in which such union was formed.</p>

                      <p><b>Marriage</b> means the spiritual and legal union of two persons united under the covenant of matrimony as spouses in a consensual and contractual relationship recognized by the laws and regulations of the state in which such union was formed.</p>

                  </Modal.Body>
                  <Modal.Footer>
                      <ViewButton onClick={(event) => {this.setState({familyDefModal : false})}}>{i18n.t('BUTTON.DONE')}</ViewButton>
                  </Modal.Footer>
              </Modal>

              <Modal size="xs" show={this.state.msgModal} onHide={(event) => this.setState({msgModal:false,loaderShow : false, errMsg : ''})} backdrop="static" centered>
                  <Modal.Header style={customStyle.modal_header} closeButton>
                      <Modal.Title>Try again later</Modal.Title>
                  </Modal.Header>
                  <Modal.Body style={{ margin: '10px',textAlign:'center',fontFamily : 'Roboto, Arial, Helvetica, sans-serif' }}>
                      An unexpected error occurred. Please try again later.
                  </Modal.Body>
                  <Modal.Footer style={{alignItems:'right'}}>
                      <ViewButton style={{marginTop: '10px', width: '50px', height: '40px'}} onClick={()=>{this.setState({ msgModal : false,loaderShow : false, errMsg : ''})}}>Ok</ViewButton>
                  </Modal.Footer>
              </Modal>
          </div>
        </div>


      </div>
    );
  }
}

SetupFamily.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => {
  return {
    subId: state.subId,
    userName: state.userName
  };
}

export default withStyles(styles)(connect(mapStateToProps)(Radium(SetupFamily)));

