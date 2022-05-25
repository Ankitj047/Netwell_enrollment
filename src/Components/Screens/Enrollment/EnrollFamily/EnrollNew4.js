import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import customeClasses from './EnrollFamily.css.js';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Sample from "../../../CommonScreens/sampleTextField";
import CommonMultilineText from "../../../CommonScreens/commonMultilineText";
import customStyle from "../../../../Assets/CSS/stylesheet_UHS";
import i18n from '../../../../i18next';
const PurpleRadio = withStyles(
    customStyle.radioBtn
)(props => <Radio color="default" {...props} />);

class EnrollNew4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: this.props.familyData,
      instData : this.props.instData
    }
  }

  componentDidMount(){
    this.answerChangeHandler();
  }

  textChangeHandler = (val, isValid, parentObj) => {
    let questionData = this.state.questionData;

    if(parentObj.type === 'Text'){
      if(isValid){
        questionData[parentObj.index].answer = val;
      } else {
        questionData[parentObj.index].answer = '';
      }

      this.setState({
        questionData: questionData
      });
    }

    let validOne = questionData[2].optionId ? (questionData[2].optionAns === 'Yes' ? (questionData[2].answer !== '' ? true : false) : true ) : false;
    let validTwo = questionData[3].optionId ? (questionData[3].optionAns === 'Yes' ? (questionData[3].answer !== '' ? true : false) : true ) : false;
    if (questionData[0].answer !== '' && questionData[1].answer !== '' && validOne && validTwo) {
      this.props.onClick(false, this.state.questionData, 'HEALTH');
    } else {
      this.props.onClick(true, this.state.questionData, 'HEALTH');
    }
  };
  
  answerChangeHandler = (event, index, type, name) => {
    let questionData = this.state.questionData;
    if (event) {
      let value = event.target.value;
      if(type == 'Radio'){
        questionData[index].optionId = value;
        let exists = questionData[index].options.find(obj => obj.id.toString() == value.toString())
        questionData[index].optionAns = exists ? exists.option : 'No';
        if(questionData[index].optionAns == 'No'){
          questionData[index].answer = '';
        }
        this.setState({
          questionData: questionData
        });
      } else if(type == 'Text'){
        questionData[index].answer = value;
        this.setState({
          questionData: questionData
        });
      }
    }
    let validOne = questionData[2].optionId ? (questionData[2].optionAns === 'Yes' ? (questionData[2].answer !== '' ? true : false) : true ) : false;
    let validTwo = questionData[3].optionId ? (questionData[3].optionAns === 'Yes' ? (questionData[3].answer !== '' ? true : false) : true ) : false;
    if (questionData[0].answer !== '' && questionData[1].answer !== '' && validOne && validTwo) {
      this.props.onClick(false, this.state.questionData, 'HEALTH');
    } else {
      this.props.onClick(true, this.state.questionData, 'HEALTH');
    }
  };

 

  
  fourthMethod(e) {
    const re = /^[0-9]*$/;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  firstMethod(e) {
    const re = /^[a-zA-Z]*$/;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  secondMethod(e) {
    const re = /^[0-9a-zA-Z \-]+$/;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }
  handlerCopy(e){
    e.preventDefault();
  }
  render() {
    return (
      <div style={customStyle.EnrollNew1}>
        <div style={customStyle.w70}>
          <div style={customeClasses.subTitle} >{this.state.instData.title}</div>
          <div style={customStyle.EnrollNew4SubtitleAfter1}>
            <div style={customStyle.EnrollNew4SubtitleAfter2}>
              <div style={customStyle.EnrollNew4TitleBefore}>
                <div style={customeClasses.Title}>
                  {this.state.questionData[0].question}
                </div>
              </div>
              <div style={customStyle.w28}>
                <div style={customStyle.EnrollNew4No1}>
                  <Sample setChild={this.textChangeHandler.bind(this)} name={'num1'} reqFlag={true} label={'#'} value={this.state.questionData[0].answer} disable={false} style={customeClasses.txtField} length={3}  fieldType={'num'} errMsg={'Enter Valid No.'} helperMsg={'No. Required'}  parentDetails={{index : 0, type : 'Text', name : 'ERInPast'}}></Sample>
                </div>
              </div>
            </div>
            <div style={customStyle.EnrollNew4SubtitleAfter2}>
              <div style={customStyle.EnrollNew4TitleBefore}>
                <div style={customeClasses.Title}>
                  {this.state.questionData[1].question}
                </div>
              </div>
              <div style={customStyle.w28}>
                <div style={customStyle.EnrollNew4No1}>
                  <Sample setChild={this.textChangeHandler.bind(this)} name={'num2'} reqFlag={true} label={'#'} value={this.state.questionData[1].answer} disable={false} style={customeClasses.txtField} length={3}  fieldType={'num'} errMsg={'Enter Valid No.'} helperMsg={'No. Required'}  parentDetails={{index : 1, type : 'Text', name : 'hospitalizedPast'}}></Sample>
                </div>
              </div>
            </div>
          </div>
          <div style={customStyle.EnrollNew4BeforeGender}>
            <div style={customStyle.EnrollNew4SubtitleAfter2}>
              <div style={customStyle.w60}>
                <div style={customeClasses.Title}>{this.state.questionData[2].question}</div>
                <RadioGroup aria-label="gender" style={customStyle.EnrollNew4Disply} name="gender1" value={this.state.questionData[2].optionId.toString()} onChange={(event) => this.answerChangeHandler(event, 2, 'Radio', '')}>
                  {
                    this.state.questionData[2].options.map((key, index) => (
                        <FormControlLabel key={key.id} value={key.id.toString()} control={<PurpleRadio />} label={key.option} />
                    ))
                  }
                </RadioGroup>
              </div>
              <div style={customStyle.w40}>
                {
                  this.state.questionData[2].optionAns === 'Yes' ? <div style={customStyle.w90}>
                        <CommonMultilineText setChild={this.textChangeHandler.bind(this)}  name={'medications'} label={'List medications'} value={this.state.questionData[2].answer} disable={false} style={customeClasses.areaField} length={120} fieldType={'text'} errMsg={'Enter Valid Medications'} helperMsg={'Medications Required'} req={true} parentDetails={{
  index: 2,
  type: 'Text',
  name: 'medications'
}}/>
                    </div> :
                      <div></div>
                }

              </div>
            </div>
            <div style={customStyle.EnrollNew4SubtitleAfter2}>
              <div style={customStyle.w49}>
                <div style={customeClasses.Title}>{this.state.questionData[3].question}</div>
                <RadioGroup aria-label="gender" style={customStyle.EnrollNew4Disply} name="gender1" value={this.state.questionData[3].optionId.toString()} onChange={(event) => this.answerChangeHandler(event, 3, 'Radio', '')}>
                  {
                    this.state.questionData[3].options.map((key, index) => (
                        <FormControlLabel key={key.id} value={key.id.toString()} control={<PurpleRadio />} label={key.option} />
                    ))
                  }
                </RadioGroup>
              </div>
              <div style={customStyle.w51}>
                {
                  this.state.questionData[3].optionAns === 'Yes' ? <div style={customStyle.w90}>
                    <CommonMultilineText setChild={this.textChangeHandler.bind(this)} name={'medical_equipment'} label={'List Medical Equipment'} value={this.state.questionData[3].answer} disable={false} style={customeClasses.areaField} length={120} req={true} fieldType={'text'} errMsg={'Enter Valid Medical Equipment'} helperMsg={'Medical equipment Required'}  parentDetails={{index : 3, type : 'Text', name : 'medical_equipment'}}></CommonMultilineText>
                  </div> : <div></div>
                }
              </div>
            </div>
          </div>
        </div>

        {
          this.state.instData.description !== '' &&
          <div style={customStyle.w30}>
            <div style={customeClasses.subTitle}>{i18n.t('ENROLL_NEW.SUB_TITLE')}</div>
            <div style={customStyle.EnrollNew2Description}>
              {/*{this.state.instData.description}*/}
              <div dangerouslySetInnerHTML={{ __html: this.state.instData.description}} />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default EnrollNew4;





