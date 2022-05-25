import React, { Component } from 'react';
import CustomeCss from './EnrollFamily.module.css';
import customeClasses from './EnrollFamily.css.js';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import EnrollNew from './EnrollNew';
import EnrollNew1 from './EnrollNew1';
import EnrollNew2 from './EnrollNew2';
import EnrollNew3 from './EnrollNew3';
import EnrollNew4 from './EnrollNew4';
import EnrollNew5 from './EnrollNew5';
import EnrollNew6 from './EnrollNew6';
import configuration from '../../../../configurations';
import { connect } from 'react-redux';
import axios from 'axios';
import Loader from '../../../loader';
import customStyle from '../../../../Assets/CSS/stylesheet_UHS';
import i18n from '../../../../i18next';

const styles = props => (
    customStyle.enrollScreen
);

const WizardButton = withStyles(
    customStyle.proceedBtn
)(Button);

const NextButton = withStyles(
    customStyle.viewBtn
)(Button);

const DoneBtn = withStyles(
  customStyle.doneBtn
)(Button);


class EnrollFamily extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      totalSteps: 5,
      progress: 0,
      disablePrev: false,
      disableNext: true,
      disableFinish: true,
      checkedB: true,
      firstName: '',
      lastName: '',
      socialNumber: '',
      relationship: '',
      showEdit: false,
      membersData: [],
      id: '',
      subId: '',
      isAllDataFilled : true,
      enrollFamilyData: [{
          isRelation: false,
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          relationCode: '',
          memberSsnno: '',
          subId : this.props.subId,
          parentEmail : '',
          parentPhone : '',
          isPrimary : ''
      }, {
        street: '',
        city: '',
        state: '',
        postalCode: '',
        country: ''
      }, {
        birthDate: '',
        genderCode: '',
        feet: '',
        inches: '',
        weight: ''
      }],
      houseHoldData : {},
      loaderShow: false,
      lifeStyleQuestionData: [],
      healthQuestionData: [],
      currentQuestionData: [],
      instructionData : [],
      authorize: false,
      privacyPolicy: false,
      age:null,
      currentUser: ''
    }
  }

  reduceProgress = () => {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1,
        progress: (this.state.count - 1) / this.state.totalSteps * 100
      });
    }
  }

  increaseProgress = () => {
    if (this.state.count < this.state.totalSteps) {
      this.setState({
        count: this.state.count + 1,
        progress: (this.state.count + 1) / this.state.totalSteps * 100
      });
    }
  }

  textChangeHandler = (event, name) => {
    this.state[name] = event.target.value;
    this.setState({
      refresh: true
    });
  }

  editButtonHandler = (event, key, flag) => {
    this.setState({
      loaderShow: true,
      currentUser: key.firstName +' '+ key.lastName
    });
    fetch(configuration.baseUrl + '/enrollment/getEnrollMemberInfoById/' + key.id)
      .then((response) => response.json())
      .then(membersResult => {
        if (membersResult.response) {
          let result = membersResult.response;
           this.state.age=result.age;
          let addressData = {};
          if(result.subId){
            addressData = {
              street: result.street ,
              city: result.city ,
              state: result.state ,
              postalCode: result.postalCode ,
              country: result.country
            }
          }else {
            addressData.street = !result.street ? (result.household.street !== '' ? result.household.street : (result.street === result.household.street ? result.household.street : '')) : result.street;
            addressData.city = !result.city? (result.household.city !== '' ? result.household.city : (result.city === result.household.city ? result.household.city : '')) : result.city;
            addressData.state = !result.state ? (result.household.state !== '' ? result.household.state : (result.state === result.household.state ? result.household.state : '')) : result.state;
            addressData.postalCode = !result.postalCode ? (result.household.postalCode !== '' ? result.household.postalCode : (result.postalCode === result.household.postalCode ? result.household.postalCode : '')) : result.postalCode;
            addressData.country = !result.country ? (result.household.country !== '' ? result.household.country : (result.country === result.household.country ? result.household.country : '')) : result.country;
          }

            let setReq = false;
            if(result.isPrimary === 'Yes' && result.relationCode === 'SPOUSE'){
                setReq = true;
            } else if(result.relationCode === 'CHILD'){
                setReq = false;
            } else if(result.isPrimary === 'No' && result.relationCode === 'SPOUSE'){
                setReq = false;
            } else {
              setReq = true;
            }


            let data = [{
              isRelation: result.subId ? false : true,
              firstName: result.firstName ? result.firstName : '',
              lastName: result.lastName ? result.lastName : '',
              email: result.email ? result.email : '',
              phone: result.phone ? result.phone : '',
              relationCode: result.relationCode ? result.relationCode : '',
              memberSsnno: result.memberSsnno ? result.memberSsnno : '',
              id : result.id,
              subId : this.props.subId,
              parentEmail : result.parentEmail ? result.parentEmail : '',
              parentPhone : result.parentPhone ? result.parentPhone : '',
              isPrimary : result.isPrimary ? result.isPrimary : '',
                setReq : setReq
          }, {
            street: addressData.street ? addressData.street : '',
            city: addressData.city ? addressData.city : '',
            state: addressData.state ? addressData.state : '',
            postalCode: addressData.postalCode ? addressData.postalCode : '',
            country: addressData.country ? addressData.country : ''
          }, {
            birthDate: result.birthDate ? result.birthDate : new Date(),
            genderCode: result.genderCode ? result.genderCode : '',
            feet: (result.feet === 0 || result.feet) ? result.feet : '',
            inches: (result.inches === 0 || result.inches) ? result.inches : '',
            weight: result.weight ? result.weight : ''
          }];

          fetch(configuration.baseUrl + '/questionbank/getLifestyeAndHealthQus')
            .then((response) => response.json())
            .then(membersResult => {
              let queResult = membersResult.response.questionList;
              let lifeStyleQuestionData = [];
              let healthQuestionData = [];
              let currentQuestionData = [];
              for (let i = 0; i < queResult.length; i++) {
                let found = result.memberQuestionAnswers.find(obj => obj.questionId === queResult[i].question.id);
                let optionId = found && found.optionId ? found.optionId : '';
                if (queResult[i].question.questionTypeCode === "LIFESTYLE") {
                  lifeStyleQuestionData.push({
                    id: queResult[i].question.id,
                    type: queResult[i].question.type,
                    question: queResult[i].question.question,
                    questionTypeCode: queResult[i].question.questionTypeCode,
                    answer: found ? found.answer : '',
                    optionId: optionId,
                    options: queResult[i].options
                  })
                } else if (queResult[i].question.questionTypeCode === "HEALTH") {
                  let exists = queResult[i].options.find(obj => obj.id.toString() === optionId.toString());
                  healthQuestionData.push({
                    id: queResult[i].question.id,
                    type: queResult[i].question.type,
                    question: queResult[i].question.question,
                    questionTypeCode: queResult[i].question.questionTypeCode,
                    answer: found ? found.answer : '',
                    optionId: optionId,
                    optionAns: exists ? exists.option : 'No',
                    options: queResult[i].options
                  })
                } else if (queResult[i].question.questionTypeCode === "CURRENT") {
                  let exists = queResult[i].options.find(obj => obj.id.toString() === optionId.toString());
                  currentQuestionData.push({
                    id: queResult[i].question.id,
                    type: queResult[i].question.type,
                    question: queResult[i].question.question,
                    questionTypeCode: queResult[i].question.questionTypeCode,
                    answer: found ? found.answer : '',
                    optionId: optionId,
                    optionAns: exists ? exists.option : 'No',
                    options: queResult[i].options
                  })
                }
              }
              currentQuestionData.push({
                phoneNo: result.phoneNo ? result.phoneNo : '',
                physician: result.physician ? result.physician : '',
                otherPhysician: result.otherPhysician ? result.otherPhysician : ''
              });
              currentQuestionData[1].answer = currentQuestionData[1].answer ? currentQuestionData[1].answer.split(',') : [];
              let count = result.completionStatus ? result.completionStatus : 0;

              var progressVal = 0;
              if(flag === 'RESUME'){
                progressVal = (count) / this.state.totalSteps * 100;
              }

              this.setState({
                enrollFamilyData: data,
                showEdit: true,
                count:  count === 5 ? 0 : count,
                progress: progressVal,
                id: result.id,
                subId: result.subId,
                authorize: result.authorize==true? true:false,
                privacyPolicy: result.privacyPolicy==true?true:false,
                loaderShow: false,
                lifeStyleQuestionData: lifeStyleQuestionData,
                healthQuestionData: healthQuestionData,
                currentQuestionData: currentQuestionData,
                instructionData : membersResult.response.instructionSet,
                houseHoldData : result.household
              });
            });
        }
      });
  }


  finishButtonHandler = (event) => {
    let memberQuestionAnswers = [];
    for (let i = 0; i < this.state.lifeStyleQuestionData.length; i++) {
      let obj = {
        questionId: this.state.lifeStyleQuestionData[i].id,
        answer: this.state.lifeStyleQuestionData[i].answer,
        optionId: this.state.lifeStyleQuestionData[i].optionId
      };
      memberQuestionAnswers.push(obj)
    }
    for (let i = 0; i < this.state.healthQuestionData.length; i++) {
      let obj = {
        questionId: this.state.healthQuestionData[i].id,
        answer: this.state.healthQuestionData[i].answer,
        optionId: this.state.healthQuestionData[i].optionId
      };
      memberQuestionAnswers.push(obj)
    }
    memberQuestionAnswers.push({
      questionId: this.state.currentQuestionData[0].id,
      answer: this.state.currentQuestionData[0].answer,
      optionId: this.state.currentQuestionData[0].optionId
    });
    memberQuestionAnswers.push({
      questionId: this.state.currentQuestionData[1].id,
      answer: this.state.currentQuestionData[1].answer.toString(),
      optionId: this.state.currentQuestionData[1].optionId
    });

    memberQuestionAnswers.push({
      questionId: this.state.currentQuestionData[2].id,
      answer: this.state.currentQuestionData[2].answer.toString(),
      optionId: this.state.currentQuestionData[2].optionId
    });

    const data = {
        id: this.state.id,
        subId: this.state.subId,
        firstName: this.state.enrollFamilyData[0].firstName,
        lastName: this.state.enrollFamilyData[0].lastName,
        email: this.state.enrollFamilyData[0].email,
        phone: this.state.enrollFamilyData[0].phone,
        relationCode: this.state.enrollFamilyData[0].relationCode ? this.state.enrollFamilyData[0].relationCode : null,
        memberSsnno: this.state.enrollFamilyData[0].memberSsnno,
        parentEmail : this.state.enrollFamilyData[0].parentEmail,
        parentPhone : this.state.enrollFamilyData[0].parentPhone,
        isPrimary : this.state.enrollFamilyData[0].isPrimary,
        street: this.state.enrollFamilyData[1].street,
        city: this.state.enrollFamilyData[1].city,
        state: this.state.enrollFamilyData[1].state ? this.state.enrollFamilyData[1].state : null,
        postalCode: this.state.enrollFamilyData[1].postalCode,
        country: this.state.enrollFamilyData[1].country,
        birthDate: this.state.enrollFamilyData[2].birthDate,
        genderCode: this.state.enrollFamilyData[2].genderCode,
        feet: this.state.enrollFamilyData[2].feet,
        inches: this.state.enrollFamilyData[2].inches,
        weight: this.state.enrollFamilyData[2].weight,
        phoneNo: this.state.currentQuestionData[3].phoneNo,
        physician: this.state.currentQuestionData[3].physician,
        otherPhysician: this.state.currentQuestionData[3].otherPhysician,
        memberQuestionAnswers: memberQuestionAnswers,
        authorize: this.state.authorize,
        privacyPolicy: this.state.privacyPolicy,
        completionStatus: this.state.count
    };
    this.setState({
      loaderShow: true
    });
    axios.post(configuration.baseUrl + '/enrollment/updateMemberInfo', data)
      .then(response => {
        fetch(configuration.baseUrl + '/enrollment/getEnrollMemberBySubId/' + this.props.subId)
          .then((response) => response.json())
          .then(membersResult => {
            if (membersResult.response) {
              let compVal = 0;
              for(let i=0; i<membersResult.response.length; i++){
                compVal = compVal + membersResult.response[i].completionStatus;
              }
              let totalProgressVal = 5 * membersResult.response.length;
              this.setState({
                membersData: membersResult.response,
                isAllDataFilled : compVal < totalProgressVal ? true : false,
                showEdit: false,
                loaderShow: false,
              });
            }
          });
      })
      .catch(error => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.setState({
      loaderShow: true
    });
    fetch(configuration.baseUrl + '/enrollment/getEnrollMemberBySubId/' + this.props.subId)
      .then((response) => response.json())
      .then(membersResult => {
        console.log(membersResult);
        if (membersResult.response) {
          let compVal = 0;
          for(let i=0; i<membersResult.response.length; i++){
            compVal = compVal + membersResult.response[i].completionStatus;
          }
          let totalProgressVal = 5 * membersResult.response.length;
          this.setState({
            membersData: membersResult.response,
            isAllDataFilled : compVal < totalProgressVal ? true : false,
            loaderShow: false,
         

          });
        }
      });
  }

  validateFieldHandler(value, data) {
    let enrollFamilyData = this.state.enrollFamilyData;
    enrollFamilyData[this.state.count] = data;
    this.setState({
      disableNext: value,
      enrollFamilyData: enrollFamilyData,
      disableFinish: value
    })
  }

  saveQuestionData(value, data, type) {
    if (type === 'LIFESTYLE') {
      this.setState({
        disableNext: value,
        lifeStyleQuestionData: data,
        disableFinish: value
      })
    } else if (type === 'HEALTH') {
      this.setState({
        disableNext: value,
        healthQuestionData: data,
        disableFinish: value
      })
    } else if (type === 'CURRENT') {
      this.setState({
        disableNext: value,
        currentQuestionData: data,
        disableFinish: value
      })
    }
  }

  /*agreementChangeHandler = (value, authorize, privacyPolicy) => {
    this.setState({
      authorize: authorize,
      privacyPolicy: privacyPolicy,
      disableFinish: value
    })
  }*/

  render() {
    const { classes } = this.props;
    let currentScreen, currentStep;
    let finishButton;
    if (this.state.count === 0) {
      currentStep = <EnrollNew onClick={this.validateFieldHandler.bind(this)} familyData={this.state.enrollFamilyData[this.state.count]} instData={this.state.instructionData[this.state.count]}  />;
    } else if (this.state.count === 1) {
      currentStep = <EnrollNew1 onClick={this.validateFieldHandler.bind(this)} familyData={this.state.enrollFamilyData[this.state.count]} instData={this.state.instructionData[this.state.count]} />;
    } else if (this.state.count === 2) {
      currentStep = <EnrollNew2 onClick={this.validateFieldHandler.bind(this)} familyData={this.state.enrollFamilyData[this.state.count]} instData={this.state.instructionData[this.state.count]} age={this.state.age}/>;
    } else if (this.state.count === 3) {
      currentStep = <EnrollNew3 onClick={this.saveQuestionData.bind(this)} familyData={this.state.lifeStyleQuestionData} instData={this.state.instructionData[this.state.count]} />;
    } else if (this.state.count === 4) {
      currentStep = <EnrollNew4 onClick={this.saveQuestionData.bind(this)} familyData={this.state.healthQuestionData}  instData={this.state.instructionData[this.state.count]} />;
    } else if (this.state.count === 5) {
      currentStep = <EnrollNew5 onClick={this.saveQuestionData.bind(this)} familyData={this.state.currentQuestionData} instData={this.state.instructionData[this.state.count]} />;
    } /*else if (this.state.count === 6) {
      currentStep = <EnrollNew6 onClick={this.agreementChangeHandler.bind(this)} authorize={this.state.authorize} privacyPolicy={this.state.privacyPolicy} />;
    }*/

    if (this.state.count === 5) {
      finishButton = <NextButton
        variant="contained" disabled={this.state.disableFinish} style={customeClasses.finishButton}
        onClick={this.finishButtonHandler}>{i18n.t('BUTTON.FINISH')}
                </NextButton>
    } else {
      finishButton = <NextButton
        variant="contained" style={customeClasses.finishButton} disabled={this.state.disableNext}
        onClick={this.finishButtonHandler}>{i18n.t('BUTTON.FINISH_LATER')}
                </NextButton>
    }
    if (!this.state.showEdit) {
      currentScreen = <div>

          <div>
            <form noValidate autoComplete="off">
               <p className={CustomeCss.textAlign}><b>{i18n.t('ENROLL_FAMILY.TITLE')}</b></p>
              
              <div style={customStyle.EnrollNew1Display}>
              
                <div style={customStyle.w70}>
                <p className={CustomeCss.textAlign1}>{i18n.t('ENROLL_FAMILY.SUB_TITLE')}</p>
                  <div style={customStyle.EnrollNew1Display}>
                    <div style={customStyle.w35p}><p className={CustomeCss.nameTitle}>{i18n.t('ENROLL_FAMILY.HEADER1')}</p></div>
                    <div style={customStyle.w370px}> <p className={CustomeCss.status}>{i18n.t('ENROLL_FAMILY.STATUS')}</p></div>
                    <div style={customStyle.w100px}></div>
                  </div>
                  {
                    this.state.membersData.map((key, index) => (
                        <div style={customStyle.enrollFamilyDisplay}  key={index}>
                          <div style={customStyle.w35p}><p className={CustomeCss.name}>{key.firstName + ' ' + key.lastName}</p></div>
                          <div style={customStyle.w375px} >
                            {
                              (key.completionStatus) / this.state.totalSteps * 100 == 100 ? <LinearProgress value={(key.completionStatus) / this.state.totalSteps * 100} variant="determinate" classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimaryComplete }} style={customStyle.mt10} /> : <LinearProgress value={(key.completionStatus) / this.state.totalSteps * 100} variant="determinate" classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} style={customStyle.mt10} />
                            }
                          </div>
                          {
                            key.completionStatus === 0 ?
                                <div style={customStyle.w90px}><NextButton variant="contained" className={classes.button} onClick={(event) => this.editButtonHandler(event, key, 'START')}>{i18n.t('BUTTON.START')}</NextButton></div>
                                : key.completionStatus === 5 ? <div style={customStyle.w90px}><NextButton variant="contained" className={classes.button} onClick={(event) => this.editButtonHandler(event, key,'START')}>{i18n.t('BUTTON.EDIT')}</NextButton></div>
                                : <div style={customStyle.w90px}><NextButton variant="contained" className={classes.button} onClick={(event) => this.editButtonHandler(event, key, 'RESUME')}>{i18n.t('BUTTON.RESUME')}</NextButton></div>
                          }
                        </div>
                    ))
                  }
                </div>
                <div className={CustomeCss.notification}>
                  <div style={customStyle.enrollFamilyNotification}>
                    {/*<p style={customStyle.enrollFamilySpan}>{i18n.t('ENROLL_FAMILY.NOTIFICATION')}</p>*/}
                    <div style={customStyle.p5}> {i18n.t('ENROLL_FAMILY.NOTIFICATION1')}</div>
                    {/*<div style={customStyle.p5}>{i18n.t('ENROLL_FAMILY.NOTIFICATION2')}</div> */}
                  </div>  
                </div>


              </div>
            </form>

        </div>
        <div style={customStyle.m20}>
          <DoneBtn
              disabled={this.state.isAllDataFilled}
            variant="contained"
            color="primary"
            onClick={this.props.onClick}
            style={customStyle.doneBtn}
          >{i18n.t('BUTTON.DONE')}</DoneBtn>
          
        </div>
        <div style={customeClasses.helpText}>
            <div style={{ fontWeight: 'bold' }}>{i18n.t('ENROLL_FAMILY.HELP')}</div>
            <div>{i18n.t('ENROLL_FAMILY.SUPPORT')}</div>
          </div>
      </div>
    } else if (this.state.showEdit) {
      currentScreen = <div style={customStyle.w100}>
        <div>
          <div style={customStyle.enrollFamilyEnrollStyle}>
          {i18n.t('ENROLL_FAMILY.ENROLL')} {this.state.currentUser}
                    </div>
          <LinearProgress variant="determinate" classes={{ colorPrimary: classes.progresscolorPrimary, barColorPrimary: classes.progressbarColorPrimary }} style={classes.progress} value={this.state.progress} />
          <div style={customStyle.EnrollNew1}>
            {
              currentStep
            }
          </div>
        </div>
        <div>
          <NextButton
            variant="contained" style={this.state.count === 0 ? customeClasses.disabledButton : customeClasses.button}
            disabled={this.state.count === 0 ? true : false} onClick={this.reduceProgress}>{i18n.t('BUTTON.BACK')}
                        </NextButton>
          <NextButton
            variant="contained" style={this.state.count === this.state.totalSteps ? customeClasses.disabledButton : customeClasses.button}
            disabled={!this.state.disableNext ? (this.state.count === this.state.totalSteps ? true : false) : true}
            onClick={this.increaseProgress}>{i18n.t('BUTTON.NEXT')}</NextButton>
          {
            finishButton
          }
          
        </div>
        <div style={customeClasses.helpText}>
            <div style={{ fontWeight: 'bold' }}>{i18n.t('ENROLL_FAMILY.HELP')}</div>
            <div>{i18n.t('ENROLL_FAMILY.SUPPORT')}</div>
          </div>
      </div>
    }
    return (
      <div>
        {
          this.state.loaderShow ? <Loader></Loader> : ''
        }
        {
          currentScreen
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    subId: state.subId
  };
}

export default withStyles(styles)(connect(mapStateToProps)(EnrollFamily));
