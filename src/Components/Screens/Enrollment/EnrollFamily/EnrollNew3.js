import React, { Component } from 'react';
import customeClasses from './EnrollFamily.css.js';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import customStyle from "../../../../Assets/CSS/stylesheet";
import i18n from '../../../../i18next';
const PurpleRadio = withStyles(
    customStyle.radioBtn
)(props => <Radio color="default" {...props} />);


class EnrollNew3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questionData: this.props.familyData,
      instData : this.props.instData
    }
  }

  componentDidMount(){
    this.answerChangeHandler('','');
  }

  answerChangeHandler = (event, index) => {
    let questionData = this.state.questionData;
    if (event) {
      let value = event.target.value;
      questionData[index].optionId = value;
      this.setState({
        questionData: questionData
      });
    }
    if (questionData[0].optionId !== '' && questionData[1].optionId !== '' && questionData[2].optionId !== '' && questionData[3].optionId !== '') {
      this.props.onClick(false, this.state.questionData, 'LIFESTYLE');
    } else {
      this.props.onClick(true, this.state.questionData, 'LIFESTYLE');
    }
  }
  handlerCopy(e){
    e.preventDefault();
    
  }
  render() {
    return (
      <div style={customStyle.EnrollNew1}>
        <div style={customStyle.w74}>
          <div style={customeClasses.subTitle} >{this.state.instData.title}</div>
          <div style={customStyle.EnrollNew1Display}>
            <div style={customStyle.enrollNew3DivStyle}>
              <div style={customeClasses.Title}>{this.state.questionData[0].question}</div>
              <RadioGroup aria-label="gender" style={customStyle.enrollNew3Display} name="gender1" value={this.state.questionData[0].optionId.toString()} onChange={(event) => this.answerChangeHandler(event, 0)}>
                {
                  this.state.questionData[0].options.map((key, index) => (
                    <FormControlLabel key={key.id} value={key.id.toString()} control={<PurpleRadio />} label={key.option} />
                  ))
                }
              </RadioGroup>
            </div>
            <div style={customStyle.enrollNew3DivvStyle}>
              <div style={customeClasses.Title}>{this.state.questionData[1].question}</div>
              <RadioGroup aria-label="gender" style={customStyle.enrollNew3Display} name="gender1" value={this.state.questionData[1].optionId.toString()} onChange={(event) => this.answerChangeHandler(event, 1)}>
                {
                  this.state.questionData[1].options.map((key, index) => (
                    <FormControlLabel key={key.id} value={key.id.toString()} control={<PurpleRadio />} label={key.option} />
                  ))
                }
              </RadioGroup>
            </div>
          </div>
          <div style={customStyle.EnrollNew1Display}>
            <div style={customStyle.enrollNew3Style}>
              <div style={customeClasses.Title}>{this.state.questionData[2].question}</div>
              <RadioGroup aria-label="gender" style={customStyle.enrollNew3Display} name="gender1" value={this.state.questionData[2].optionId.toString()} onChange={(event) => this.answerChangeHandler(event, 2)}>
                {
                  this.state.questionData[2].options.map((key, index) => (
                    <FormControlLabel key={key.id} value={key.id.toString()} control={<PurpleRadio />} label={key.option} />
                  ))
                }
              </RadioGroup>
            </div>
            <div style={customStyle.enrollNew3DivnewStyle}>
              <div style={customeClasses.Title}>{this.state.questionData[3].question}</div>
              <RadioGroup aria-label="gender" style={customStyle.enrollNew3Display} name="gender1" value={this.state.questionData[3].optionId.toString()} onChange={(event) => this.answerChangeHandler(event, 3)}>
                {
                  this.state.questionData[3].options.map((key, index) => (
                    <FormControlLabel key={key.id} value={key.id.toString()} control={<PurpleRadio />} label={key.option} />
                  ))
                }
              </RadioGroup>
            </div>
          </div>
        </div>
        {this.state.instData.description !== '' &&
          <div style={customStyle.w26}>
            <div style={customeClasses.subTitle}>{i18n.t('ENROLL_NEW.SUB_TITLE')}</div>
            <div style={customStyle.enrollNew3Description}>
              {/*{this.state.instData.description}*/}
              <div dangerouslySetInnerHTML={{ __html: this.state.instData.description}} />
            </div>
          </div>
        }

      </div>

    );
  }
}

export default EnrollNew3;