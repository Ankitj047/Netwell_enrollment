import React, { Component } from 'react';
import CustomeCss from './EnrollFamily.module.css';
import customeClasses from './EnrollFamily.css.js';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import configuration from '../../../../configurations';
import Loader from '../../../loader';
import Sample from '../../../CommonScreens/sampleTextField';
import customStyle from "../../../../Assets/CSS/stylesheet_UHS";
import MuiPhoneNumber from "material-ui-phone-number";
import InputAdornment from '@material-ui/core/InputAdornment';
import PhoneInput, { formatPhoneNumber, formatPhoneNumberIntl, isValidPhoneNumber } from 'react-phone-number-input';
import CommonDropDwn from "../../../CommonScreens/CommonDropDwn";
import i18n from '../../../../i18next';
const styles = {
 root:{
  textDecoration: 'none',
   '&:hover': {
    color: 'white'
  },
} 

};


const CustomeTextField1 = withStyles(
    customStyle.phonetextField
)(MuiPhoneNumber);


class EnrollNew extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isRelation: this.props.familyData.isRelation,
        firstName: this.props.familyData.firstName,
        lastName: this.props.familyData.lastName,
        memberSsnno: this.props.familyData.memberSsnno,
        relationCode: this.props.familyData.relationCode,
        phone: this.props.familyData.phone,
        email: this.props.familyData.email,
        id : this.props.familyData.id,
        subId : this.props.familyData.subId,
        parentEmail : this.props.familyData.parentEmail,
        parentPhone : this.props.familyData.parentPhone,
        isPrimary : this.props.familyData.isPrimary,
        relationshipList: [],
        loaderShow: false,
        instData : this.props.instData,
        phoneErr : false,
        parentPhoneErr : false,
        emailErr : false,
        ssnErr : false,
        phoneNum:false,
        phno:false,
        parentphoneNum:false,
        parentphno:false,
        relErr : false,
        setReq : this.props.familyData.setReq
    }
  }
  componentDidMount() {
    this.setState({
      loaderShow: true
    });
    fetch(configuration.baseUrl + '/enrollment/getRelationshipCode')
      .then((response) => response.json())
      .then(response => {
        if (response.response) {
          this.setState({
            relationshipList: response.response,
            loaderShow: false
          }, () => this.validateForm('', ''));
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  textChangeHandler = (val,valid,details) => {
    if (valid) {
      this.state[details.name] = val;
      this.setState({
        refresh: true
      }, () => { this.validateForm() });

      if(details.name === "memberSsnno" && val){
        this.setState({
          loaderShow: true
        });

        fetch(configuration.baseUrl + '/enrollment/validateSSN/' + val + '/' + this.state.id)
            .then((response) => response.json())
            .then(response => {
              if (response.code === 200) {
                this.setState({
                  refresh: true,
                  loaderShow: false,
                    ssnErr : false
                }, () => { this.validateForm() });
              } else {
                var evt = new CustomEvent('SecurityNumber',{detail:{memberSsnno : val, ssnExist : true}});
                window.dispatchEvent(evt);
                this.setState({
                    loaderShow: false,
                    ssnErr : true
                }, () => { this.validateForm() });
              }
            })
            .catch(error => {
              console.log(error);
            })
      }

      if(details.name === 'relationCode' && (val && val === 'SPOUSE')){
          this.setState({
              loaderShow: true
          });

          fetch(configuration.baseUrl + '/setupfamily/validateRelationship/' + this.state.subId+ '/' + this.state.id)
              .then((response) => response.json())
              .then(response => {
                  if (response.code === 200) {
                      this.setState({
                          refresh: true,
                          loaderShow: false,
                          relErr : false
                      }, () => { this.validateForm() });
                  } else {
                      var evt = new CustomEvent('relationship',{detail : {flag : true}});
                      window.dispatchEvent(evt);
                      this.setState({
                          loaderShow: false,
                          relErr : true
                      }, () => { this.validateForm() });
                  }
              })
              .catch(error => {
                  console.log(error);
              })
      } else {
          this.setState({
              relErr : false
          }, () => { this.validateForm() })
      }
    } else {
      this.state[details.name] = '';
      this.setState({
        refresh: true
      }, () => { this.validateForm() });
    }
  }

  validateForm() {
    let relationCheck = this.state.isRelation ? (this.state.relationCode !== '' ? true : false) : true;
      let obj = {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          memberSsnno: this.state.memberSsnno,
          relationCode: this.state.relationCode,
          phone: this.state.phone,
          email: this.state.email,
          isRelation : this.state.isRelation,
          id : this.state.id,
          subId : this.state.subId,
          parentPhone : this.state.parentPhone,
          parentEmail : this.state.parentEmail,
          isPrimary : this.state.isPrimary,
          setReq : this.state.setReq
      };

    if(this.state.isRelation){ // && this.state.ssnErr && this.state.emailErr
        if(this.state.isPrimary === 'Yes' && this.state.relationCode === 'CHILD'){
            if (this.state.firstName !== '' && this.state.lastName !== '' && relationCheck && !this.state.phoneErr && !this.state.relErr && !this.state.parentPhoneErr && this.state.parentPhone!== '' && this.state.parentEmail !== '' ) {
                this.props.onClick(false, obj);
            } else {
                this.props.onClick(true, obj);
            }
        } else if(this.state.isPrimary === 'Yes' && this.state.relationCode === 'SPOUSE'){
            if (this.state.firstName !== '' && this.state.lastName !== '' && relationCheck && this.state.email !== ''  && this.state.phone !== '' && this.state.memberSsnno !== '' && !this.state.phoneErr && !this.state.relErr) {
                this.props.onClick(false, obj);
            } else {
                this.props.onClick(true, obj);
            }
        } else {
            if (this.state.firstName !== '' && this.state.lastName !== '' && relationCheck && !this.state.phoneErr && !this.state.relErr ) {
                this.props.onClick(false, obj);
            } else {
                this.props.onClick(true, obj);
            }
        }
    } else {
      if (this.state.firstName !== '' && this.state.lastName !== '' && relationCheck && this.state.email !== ''  && this.state.phone !== '' && this.state.memberSsnno !== '' && !this.state.phoneErr && !this.state.relErr) {
        this.props.onClick(false, obj);
      } else {
        this.props.onClick(true, obj);
      }
    }
  }

  setValue(flag, value){
    if( value.length >= 2){
        let isvalid = isValidPhoneNumber(value) ? true : false;
        if(flag === 'own'){
            this.state.phoneErr = !isvalid;
            this.setState({ phone: value}, () =>  this.validateForm());
        } else {
            this.state.parentPhoneErr = !isvalid;
            this.setState({ parentPhone: value}, () =>  this.validateForm());
        }
    }else{
        if(this.state.isRelation){
            if(flag === 'own'){
                this.setState({phone : '', phoneErr : false}, () => this.validateForm());
            } else {
                this.setState({parentPhone : '', parentPhoneErr : true}, () => this.validateForm());
            }
        } else {
            this.setState({phone : '', phoneErr : true, parentPhone : ''}, () => this.validateForm());
        }
    }
  }

  render() {
    const {classes} =this.props;
    return (
      <div style={{ display: 'flex', width: '100%', marginBottom: '20px' }}>
        {
          this.state.loaderShow ? <Loader></Loader> : ''
        }
        <div style={{ width: '69%' }}>
          <div style={customeClasses.subTitle} >{this.state.instData.title}</div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '224px', marginRight: '24px' }}>
              <Sample setChild={this.textChangeHandler.bind(this)} name={'FirstName'} reqFlag={true} label={'First Name'} value={this.state.firstName} disable={false} style={customStyle.textFieldWrp} length={25}  fieldType={'text'} errMsg={'Enter Valid First Name'} helperMsg={'First Name Required'}  parentDetails={{name:'firstName'}}></Sample>
            </div>
            <div style={{ width: '224px' }}>
              <Sample setChild={this.textChangeHandler.bind(this)} name={'LastName'} label={'Last Name'} reqFlag={true} value={this.state.lastName} disable={false} style={customStyle.textFieldWrp} length={25}  fieldType={'text'} errMsg={'Enter Valid Last Name'} helperMsg={'Last Name Required'}  parentDetails={{name:'lastName'}}></Sample>
            </div>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ width: '224px', marginRight: '24px', marginTop: '24px' }}>
              <Sample setChild={this.textChangeHandler.bind(this)} name={'Email'} label={'Email'} reqFlag={this.state.setReq} value={this.state.email} disable={false} style={customStyle.textFieldWrp} length={1000}  fieldType={'email'} errMsg={'Enter Valid Email'} helperMsg={this.state.setReq ? 'Email Required' : ''}  parentDetails={{name:'email'}}></Sample>
            </div>
            <div style={customStyle.phoneDiv}>
               <CustomeTextField1
                    id='p1'
                    name="phone"
                    onBlur={()=>this.setState({phoneNum:true})}
                    onMouseEnter={()=>this.setState({phno:true})}
                    onMouseLeave={()=>this.setState({phno:false})}
                    helperText={this.state.phone ? (isValidPhoneNumber(this.state.phone) ? undefined : 'Please enter a valid Phone Number') : (this.state.setReq ? 'Phone number required' : '')}
                    label="Phone No."
                    error={this.state.phoneErr}
                    data-cy="user-phone"
                    value={this.state.phone}
                    defaultCountry={"us"}
                    onChange={this.setValue.bind(this, 'own')}
                    required={this.state.setReq}
                    InputLabelProps={{style: {paddingLeft:12,paddingRight:12,paddingTop:10,color: this.state.phoneErr?'red':!this.state.phoneNum?'grey':'#533278'}}}
                    inputProps={{style: {fontSize:'18px',marginTop:'6px',fontfamily: 'Roboto',paddingRight:'12px',outline: '0px', 
                       color: !this.state.phno?'black':'#533278',
                      }}}
               />
            </div>
          </div>
          <div style={{ display: 'flex', marginTop: '24px' }}>
            <div style={{ width: '224px', marginRight: '24px' }}>
              <Sample setChild={this.textChangeHandler.bind(this)} name={'SecurityNumber'} reqFlag={this.state.setReq} label={'Social Security Number'} value={this.state.memberSsnno} disable={false} style={customStyle.textFieldWrp} length={11}  fieldType={'memberSsnno'} errMsg={'Enter Valid Social Security Number'} helperMsg={this.state.setReq ? 'Social Security Number Required' : ''}  parentDetails={{name:'memberSsnno'}}></Sample>
            </div>
            <div style={{ width: '224px' }}>
              {
                  this.state.isRelation ?
                      <CommonDropDwn setChild={this.textChangeHandler.bind(this)} name={'Relationship'} label={'Relationship'} value={this.state.relationCode} disable={false} style={customeClasses.txtField}  fieldType={'dropDwn'}  helperMsg={'Select Gender'} List={this.state.relationshipList}  parentDetails={{name:'relationCode'}}></CommonDropDwn> : ''
              }
            </div>
          </div>

            {this.state.isPrimary === 'Yes' && this.state.relationCode === 'CHILD' &&

            <div style={{ display: 'flex' }}>
                <div style={{ width: '224px', marginRight: '24px', marginTop: '24px' }}>
                    <Sample setChild={this.textChangeHandler.bind(this)} name={'Email'} label={'Parent Email'} reqFlag={true} value={this.state.parentEmail} disable={false} style={customStyle.textFieldWrp} length={1000}  fieldType={'email'} errMsg={'Enter Parent Valid Email'} helperMsg={'Parent Email Required'}  parentDetails={{name:'parentEmail'}}></Sample>
                </div>
                <div style={customStyle.phoneDiv}>
                    <CustomeTextField1
                        id='p2'   
                        name="parentphone"
                        onBlur={()=>this.setState({parentphoneNum:true})}
                        onMouseEnter={()=>this.setState({parentphno:true})}
                        onMouseLeave={()=>this.setState({parentphno:false})}
                        helperText={this.state.parentPhone ? (isValidPhoneNumber(this.state.parentPhone) ? undefined : 'Please enter a valid Parent Phone Number') : 'Parent phone number required'}
                        label="Parent Phone No."
                        error={this.state.parentPhoneErr}
                        data-cy="user-phone"
                        value={this.state.parentPhone}
                        defaultCountry={"us"}
                        onChange={this.setValue.bind(this, 'parent')}
                        required={true}
                        InputLabelProps={{style: {paddingLeft:12,paddingRight:12,paddingTop:10,color: this.state.parentPhoneErr?'red': !this.state.parentphoneNum?'grey':'#533278'}}}
                        inputProps={{style: {fontSize:'18px',marginTop:'6px',fontfamily: 'Roboto',paddingLeft:'12px',paddingRight:'12px',outline: '0px',
                            color: !this.state.parentphno?'black':'#533278',
                        }}}
                    />
                </div>
            </div>

            }


        </div>
        {
          this.state.instData.description !== '' &&

          <div style={{width: '31%'}}>
  <div style={customeClasses.subTitle}>{i18n.t('ENROLL_NEW.SUB_TITLE')}</div>
            <div style={{fontSize: '15px', lineHeight: '16px',textAlign:'justify'}}>
              {/*{this.state.instData.description}*/}
                <div dangerouslySetInnerHTML={{ __html: this.state.instData.description}} />
            </div>
          </div>
        }      </div>

    );
  }
}

export default withStyles(styles)(EnrollNew);
