import React, { Component } from 'react';
import customeClasses from './EnrollFamily.css.js';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Sample from "../../../CommonScreens/sampleTextField";
import customStyle from "../../../../Assets/CSS/stylesheet_UHS";
import CommonMultilineText from "../../../CommonScreens/commonMultilineText";
import Checkbox from '@material-ui/core/Checkbox';
import MuiPhoneNumber from "material-ui-phone-number";
import { isValidPhoneNumber } from 'react-phone-number-input';
import i18n from '../../../../i18next';
const styles = {
  textDecoration: 'none',
  // backgroundColor:'#ffffff'
  '&:hover':{
    color: 'white'
  }
};
const CustomeTextField1 = withStyles(
    customStyle.phone_number_input
)(MuiPhoneNumber);

const PurpleRadio = withStyles(
    customStyle.radioBtn
)(props => <Radio color="default" {...props} />);

class EnrollNew5 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: this.props.familyData,
      val: [],
      count: 0,
      instData : this.props.instData,
      checked: new Map(),
      phoneErr:false,
      phoneVal:'',
    };
  }

  componentDidMount() {
    this.textChangeHandler('', '', '');
    this.answerChangeHandler('','','');
    this.setValue(this.state.questionData[3].phoneNo);

  }
  answerChangeHandler = (event, index, type) => {
    let questionData = this.state.questionData;
    if (event) {
      let value = event.target.value;
      if (type === 'Radio') {
        questionData[index].optionId = value;
        let exists = questionData[index].options.find(obj => obj.id.toString() === value.toString());
        questionData[index].optionAns = exists ? exists.option : 'No';
        if (questionData[index].optionAns === 'No') {
          questionData[index].answer = '';
        }
        this.setState({
          questionData: questionData
        });
      } else if (type === 'Multiple') {
        console.log('---Checked---'+questionData)
   
        
      } else if (type === 'dropdown') {
        const { options } = event.target;
        const value = [];
        for (let i = 0, l = options.length; i < l; i += 1) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        questionData[index].answer = value;
        this.setState({
          questionData: questionData
        });
      }
    }

    let validOne = questionData[0].optionId ? (questionData[0].optionAns === 'Yes' ? (questionData[0].answer !== '') : true) : false;
    let validTwo = questionData[2].optionId ? (questionData[2].optionAns === 'Yes' ? ((questionData[3].physician !== '')) : true) : false;
    

    if (validOne && validTwo && questionData[1].answer.length > 0) {
      this.props.onClick(false, this.state.questionData, 'CURRENT');
    } else {
      this.props.onClick(true, this.state.questionData, 'CURRENT');
    }
  }

  textChangeHandler = (val, isValid, parentObj) => {
    let questionData = this.state.questionData;
     if(parentObj.type === 'Question'){
      if(isValid) {
        questionData[parentObj.index].answer = val;
      } else {
        questionData[parentObj.index].answer = '';
      }
    } else if(parentObj.type === 'physician'){
      if(isValid) {
        questionData[parentObj.index].physician = val;
        questionData[parentObj.index].otherPhysician = '';
      } else {
        questionData[parentObj.index].physician = '';
        questionData[parentObj.index].otherPhysician = '';
      }
    } else if(parentObj.type === 'otherPhysician'){
      if(isValid) {
        questionData[parentObj.index].otherPhysician = val;
        questionData[parentObj.index].physician = '';
      } else {
        questionData[parentObj.index].otherPhysician = '';
        questionData[parentObj.index].physician = '';
      }
    }
    this.setState({
      questionData: questionData
    });

    let validOne = questionData[0].optionId ? (questionData[0].optionAns === 'Yes' ? (questionData[0].answer !== '') : true) : false;
    let validTwo = questionData[2].optionId ? (questionData[2].optionAns === 'Yes' ? questionData[3].physician !== '' : true) : false;

    if (validOne && validTwo && questionData[1].answer.length > 0 ) {
      this.props.onClick(false, this.state.questionData, 'CURRENT');
    } else {
      this.props.onClick(true, this.state.questionData, 'CURRENT');
    }
  }

  setValue(value){
      if(value.length >= 2){
          let isvalid = !!isValidPhoneNumber(value);
          this.state.phoneErr = !isvalid;
          this.state.phoneVal=value;
          if(isvalid){
            this.state.questionData[3].phoneNo = value;
          }else{
            this.state.questionData[3].phoneNo = '';
          }
          this.setState({ refresh: true}, () =>  this.validateForm());
      }else{
          this.state.questionData[3].phoneNo = '';
          this.setState({ phoneErr : false}, () => this.validateForm());
      }
  }

  validateForm() {
    if (this.state.questionData[1].answer.length > 0 && this.state.questionData[2].optionAns.toLowerCase() === 'no') {
      this.props.onClick(false,this.state.questionData, 'CURRENT');
    } else if(this.state.questionData[1].answer.length > 0 && this.state.questionData[3].physician !== ''){
      this.props.onClick(false,this.state.questionData, 'CURRENT');
    }else {
      this.props.onClick(true, this.state.questionData,'CURRENT');
    }
  }
  
  onToggle=(event,key)=>{
   if(this.state.questionData[1].answer.indexOf(key)===-1){ 
      if(key.toLowerCase() === 'none'){
        this.state.questionData[1].answer =[];
        this.state.questionData[1].answer.push(key)
      }else{
        if(this.state.questionData[1].answer.indexOf('None')!==-1){
          this.state.questionData[1].answer.splice(this.state.questionData[1].answer.indexOf('None'),1)
        }
        this.state.questionData[1].answer.push(key)
      }    
  
    }else{
      this.state.questionData[1].answer.splice(this.state.questionData[1].answer.indexOf(key),1)
    }

      this.setState({refresh:true});
        let validOne = this.state.questionData[0].optionId ? (this.state.questionData[0].optionAns === 'Yes' ? (this.state.questionData[0].answer !== '') : true) : false;
        let validTwo = this.state.questionData[2].optionId ? (this.state.questionData[2].optionAns === 'Yes' ? ((this.state.questionData[3].physician !== '' )) : true) : false;

        if (validOne && validTwo && this.state.questionData[1].answer.length > 0 ) {
          this.props.onClick(false, this.state.questionData, 'CURRENT');
        } else {
          this.props.onClick(true, this.state.questionData, 'CURRENT');
        }
  }
  render() {
    
    const { classes } = this.props;
    return (
      <div style={customStyle.EnrollNew1}>
        <div style={customStyle.w69}>
          <div style={customeClasses.subTitle} >{this.state.instData.title}</div>
          <div style={customStyle.enrollNew5DisplayStyle}>
            <div style={customStyle.w30}>
            <div style={customeClasses.Title}>{this.state.questionData[2].question}</div>
              <RadioGroup aria-label="phyRadio" style={{ display: 'block' }} name="phyRadio" value={this.state.questionData[2].optionId.toString()} onChange={(event) => this.answerChangeHandler(event, 2, 'Radio')}>
                {
                  this.state.questionData[2].options.map((key, index) => (
                      <FormControlLabel key={key.id} value={key.id.toString()} control={<PurpleRadio />} label={key.option} />
                  ))
                }
              </RadioGroup>

            </div>
            <div style={customStyle.enrollNew5NewDisplayStyle}>
              {
                this.state.questionData[2].optionAns === 'Yes' ?

                    <div>
                      <div style={customStyle.enrollNew5pCarePhy}>
                       
                        <Sample setChild={this.textChangeHandler.bind(this)} name={'pCarePhy'} reqFlag={true} label={'Primary Care Physician'} value={this.state.questionData[3].physician} disable={false} style={customeClasses.txtField} length={25}  fieldType={'city'} errMsg={'Enter Valid Primary Care Physician'} helperMsg={'Primary Physician required'}  parentDetails={{index : 3, type : 'physician'}}></Sample>

                      </div>
                      <div style={customStyle.enrollNew5phone}>
                     <div style={{ width: '100%', marginTop: '24px',height: '55px' ,backgroundColor:'#f8f8f8',borderRadius:'4px', marginBottom:'15px'}}>
                      <CustomeTextField1
                        id='p1'
                        name="phone"
                        error={this.state.phoneErr}
                        label="Phone No."
                        data-cy="user-phone"
                        value={this.state.phoneVal}
                        helperText={this.state.phoneVal ? (isValidPhoneNumber(this.state.phoneVal) ? undefined : 'Please enter a valid Phone Number') : ''}
                        defaultCountry={"us"}
                        onChange={this.setValue.bind(this)}
                        style={{width: '100%'}}
                        InputLabelProps={{style: {paddingLeft:12,paddingRight:12,paddingTop:10,color: this.state.phoneErr?'red':!this.state.phoneVal?'grey':'#533278'}}}
                        inputProps={{style: {fontSize:'18px',color: '#19191d',fontfamily: 'Roboto',paddingLeft:'12px',paddingRight:'17px',paddingTop:'12px',outline: '0px', width : '100%','&:hover': {
                              color: '#533278',
                            }
                        }}}/>

                      </div>
                    </div>
                    </div>
                    : (this.state.questionData[2].optionAns === 'No' && this.state.questionData[2].optionId !== '')?
                    <div style={customStyle.w55}>
                      
                      <CommonMultilineText setChild={this.textChangeHandler.bind(this)} name={'otherPhy'} label={'Other physicians you see regularly'} req={false} value={this.state.questionData[3].otherPhysician} disable={false} style={customStyle.w100} length={120}  fieldType={'text'} errMsg={'Enter Valid Other Physician'} helperMsg={''}  parentDetails={{index : 3, type : 'otherPhysician'}}></CommonMultilineText>
                    </div> : <div></div>
              }
            </div>
          </div>
          <div style={customStyle.w100}>
            <div style={customStyle.enrollNew5radioDiv}>
              <div style={customStyle.w30}>
                <div style={customStyle.w100}>
                  <div style={customeClasses.Title}>{this.state.questionData[0].question}</div>
                  <RadioGroup aria-label="gender" style={customStyle.enrollNew3Display} name="gender1" value={this.state.questionData[0].optionId.toString()} onChange={(event) => this.answerChangeHandler(event, 0, 'Radio')}>
                    {
                      this.state.questionData[0].options.map((key, index) => (
                        <FormControlLabel key={key.id} value={key.id.toString()} control={<PurpleRadio />} label={key.option} />
                      ))
                    }
                  </RadioGroup>
                </div>
                <div style={customStyle.w100}>
                  {
                    this.state.questionData[0].optionAns === 'Yes' ? <div style={customStyle.w100}>
                   
                      <CommonMultilineText setChild={this.textChangeHandler.bind(this)} name={'lstDes'} label={'List conditions or diseases'} req={true} value={this.state.questionData[0].answer} disable={false} style={customStyle.w100} length={120}  fieldType={'text'} errMsg={'Enter Valid List of Condition/Diseases'} helperMsg={'List of Condition/Diseases required'}  parentDetails={{index : 0, type : 'Question'}}></CommonMultilineText>

                      
                    </div> : <div></div>
                  }
                </div>
              </div>
              <div style={{ width: '50%',  }}>
               <span style={{marginBottom: '8px', fontSize: '14px', lineHeight: '16px',marginLeft:'36px'}} >{this.state.questionData[1].question}</span>
              <div style={{backgroundColor:'#f8f8f8',float: 'left',
                            width: '73%',
                            maxHeight: '100px',
                            overflowX: 'hidden', 
                            overflowY: 'auto' ,
                            marginLeft: '36px'}}>
              <div style={customStyle.enrollNew5SelectDiv1}>
                {this.state.questionData[1].options.map((key, index) => (
                <label style={{width:'100%',marginBottom:'-10px'}} key={index}> 
              
                                    <Checkbox
                                  id='input'
                                  inputProps={{
                                      'aria-label': 'secondary checkbox',
                                  }}
                                  style={{ color: '#533278'}}  
                                  checked={this.state.questionData[1].answer.indexOf(key.option)!==-1}
                                  onChange={event=>this.onToggle(event,key.option)}
                                />  
                               
                               {key.option}
                               </label>
                               ))
                                }
               
                </div>
              </div>
              </div>
            </div>
          </div>
         
        </div>
        {
          this.state.instData.description !== '' &&
          <div style={customStyle.w31}>
            <div style={customeClasses.subTitle}>{i18n.t('ENROLL_NEW.SUB_TITLE')}</div>
            <div style={customStyle.enrollNew3Description}>
              {this.state.instData.description}
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withStyles(styles)(EnrollNew5);