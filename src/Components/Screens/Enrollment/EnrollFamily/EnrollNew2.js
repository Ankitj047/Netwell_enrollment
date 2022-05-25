import React, { Component } from 'react';
import customeClasses from './EnrollFamily.css.js';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {MuiPickersUtilsProvider, KeyboardDatePicker,} from '@material-ui/pickers';
import configuration from '../../../../configurations';
import Loader from '../../../loader';
import moment from "moment";
import CommonDropDwn from "../../../CommonScreens/CommonDropDwn";
import customStyle from "../../../../Assets/CSS/stylesheet_UHS";
import Sample from "../../../CommonScreens/sampleTextField";
import i18n from '../../../../i18next';


const styles = theme => ({
 underline:{
  '&.MuiInput-underline:before':{
    borderBottom: '2px solid grey',
  },
    '&.MuiInput-underline:after': {
      // The MUI source seems to use this but it doesn't work
      borderBottom: '2px solid red',
    },
  }

});
class EnrollNew2 extends Component {
  eventListener=null;
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      selectedDate: new Date(),
      setSelectedDate: '',
      refresh: false,
      progress: 0,
      disablePrev: false,
      checkedB: true,
      birthDate: this.props.familyData.birthDate,
      genderCode: this.props.familyData.genderCode,
      feet: this.props.familyData.feet,
      inches: this.props.familyData.inches,
      weight: this.props.familyData.weight,
      showEdit: false,
      genderList: [],
      loaderShow: false,
      instData : this.props.instData,
      ageValid: false,
      dob1:'',
      age_latest:'',
      dateErr:false,
      todayDateValid:false,
      birthDtFocus:false,
      birthDt:false,
     x1:'',
        heightValid : true
    }
  }



  componentDidMount() {
    let age = this.handleDateChange(this.state.birthDate,true);
    this.textChangeHandler();
    this.setState({
      refresh:true,
      loaderShow: true,
      ageValid : age
    });

      if((parseInt(this.state.feet) === 0) && parseInt(this.state.inches) === 0){
          let evt = new CustomEvent('feet',{detail : {flag:true}});
          window.dispatchEvent(evt);
          this.state.heightValid = false;
      } else if(this.state.feet !== "" && this.state.inches !== ""){
          let evt = new CustomEvent('feet',{detail : {flag:false}});
          window.dispatchEvent(evt);
          this.state.heightValid = true;
      }

    fetch(configuration.baseUrl + '/enrollment/getGender')
      .then((response) => response.json())
      .then(response => {
        if (response.response) {
          this.setState({
            genderList: response.response,
            loaderShow: false
            
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loaderShow: false
        });
      })   

  }

  enableNext(){
    if (this.state.birthDate !== '' && this.state.genderCode !== '' && this.state.feet !== '' && this.state.weight !== '' && this.state.inches !== ''&&!this.state.dateErr && this.state.heightValid) {
      let obj = {
        birthDate: this.state.birthDate,
        genderCode: this.state.genderCode,
        feet: this.state.feet,
        inches: this.state.inches,
        weight: this.state.weight
      };
      this.props.onClick(false, obj);
    } else {
      let obj = {
        birthDate: this.state.birthDate,
        genderCode: this.state.genderCode,
        feet: this.state.feet,
        inches: this.state.inches,
        weight: this.state.weight
      };
      this.props.onClick(true, obj);
    }
  }

    textChangeHandler = (val,valid,details) => {
      if (valid) {
          this.state[details.name] = val;
          if(details.name === 'feet' || details.name === 'inches'){
            if((parseInt(this.state.feet) === 0) && parseInt(this.state.inches) === 0){
                let evt = new CustomEvent('feet',{detail : {flag:true, parentData : details, value : val}});
                window.dispatchEvent(evt);
                this.state.heightValid = false;
            } else if(this.state.feet !== "" && this.state.inches !== ""){
                let evt = new CustomEvent('feet',{detail : {flag:false, parentData : details, value : val}});
                window.dispatchEvent(evt);
                this.state.heightValid = true;
            }
          }

      }else if(details){
        this.state[details.name] = '';
      }
        this.setState({
            refresh: true
        });
        this.enableNext()
    }

    handleHover(){
      var panel = document.getElementById("date-picker-dialog");
      var p2=document.getElementsByName('KeyboardDatePicker');
      panel.addEventListener("mouseover", function() {
          document.getElementById("date-picker-dialog").style.color = "#533278";
      });
    }

    calculate_age=(dob1)=>{
      var today = new Date();
      var birthDate = new Date(dob1);
      var age_now = today.getFullYear() - birthDate.getFullYear();
      var m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate()))
      {
          age_now--;
      }
      if(this.props.age !== null && this.props.age !== undefined && age_now !==  this.props.age){
        return false;
      }
      else if(age_now>85){
          return false;
      }else{
        return true;
      }

    }
  handleDateChange = (date,didMount) => {
    const today = new Date()
    const valDate=new Date(date)
    var x=document.getElementById('bd');
    this.state.birthDate=moment(date).format('YYYY-MM-DD');
    if(this.props.age > 0 && valDate.getDate() === today.getDate() && valDate.getMonth() === today.getMonth() && valDate.getFullYear() === today.getFullYear()){
      if(didMount === true){
        this.state.todayDateValid = true;
      }else {
        this.state.todayDateValid = false;
      }
      var validAge = false;
    }else{
      if(this.props.age === 0 && valDate.getDate() === today.getDate() && valDate.getMonth() === today.getMonth() && valDate.getFullYear() === today.getFullYear()){
          this.state.todayDateValid = false;
          var validAge = true;
      } else {
          if(didMount === true && valDate === today){
              this.state.todayDateValid = true;
          }else {
              this.state.todayDateValid = false;
          }
          var validAge = this.calculate_age(this.state.birthDate);
      }


    }

    this.setState({
      ageValid : validAge 
    })
      if(!validAge){
       x.innerHTML="Age is not valid";
       this.setState({dateErr:true},()=>{
         this.enableNext();
       })

     } else {
       x.innerHTML="";
        this.setState({dateErr:false},()=>{
          this.enableNext()
        })
     }    
  }

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
  handlerCopy(e){
    e.preventDefault();
  }  
  render() {
    const { classes } = this.props;
    var myDate=moment(this.state.birthDate).format('MM')+'/'+moment(this.state.birthDate).format('DD')+'/'+moment(this.state.birthDate).format('YYYY');
    console.log('------------ myDate --------------');
    console.log(myDate);
    return (
      <div style={customStyle.EnrollNew1}>
        {
          this.state.loaderShow ? <Loader></Loader> : ''
        }
        <div style={customStyle.w69}>
          <div style={customeClasses.subTitle} >{this.state.instData.title}</div>
          <div style={customStyle.EnrollNew1Display}>
            <div style={customStyle.EnrollNew2Date}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker 
                  required
                  onBlur={()=>this.setState({birthDtFocus:true})}
                  onMouseOver={()=>this.setState({birthDt:true})}
                  onMouseOut={()=>this.setState({birthDt:false})}
                  autoComplete='off'
                  margin="none"
                  id="date-picker-dialog"
                  label="BirthDate"
                  format="MM/dd/yyyy"
                  error={this.state.dateErr &&!this.state.todayDateValid}
                  helperText={this.state.todayDateValid?'Date Required':this.state.dateErr?'Date does not correspond with age entered earlier. Change age to ['+ this.props.age +']':''}
                  value={this.state.todayDateValid?null:myDate}
                  onFocus={e => e.target.blur()}
                  onCopy={this.handlerCopy}                  
                  onPaste={this.handlerCopy}
                  inputProps={{style: {fontSize:'18px',fontfamily: 'Roboto',paddingLeft:'12px',paddingRight:'12px',marginTop:'6px','&:focus':{ outline: 'none'},color: !  this.state.birthDt?'black':'#533278'}}}
                  InputLabelProps={{style:{paddingLeft:12,paddingRight:12,paddingTop:this.state.birthDtFocus || !this.state.todayDateValid?12:0,color: !this.state.birthDtFocus?'grey':'#533278',}}}
                  onChange={this.handleDateChange}
                  variant="filled"
                  onMouseEnter={this.handleHover}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  style={customStyle.w100}
                  maxDate={new Date()}
                />
            <span id='bd' style={customStyle.EnrollNew2Span}></span>

             </MuiPickersUtilsProvider>
            </div>
            <div style={customStyle.EnrollNew2Gender}>
              <CommonDropDwn setChild={this.textChangeHandler.bind(this)} name={'Birth Gender'} label={'Birth Gender'} value={this.state.genderCode} disable={false} style={customStyle.dropDown}  fieldType={'dropDwn'}  helperMsg={'Select Gender'} List={this.state.genderList}  parentDetails={{name:'genderCode'}}></CommonDropDwn>
            </div>
          </div>
          <div style={{display : 'flex', marginTop : '13px'}}>
            <div style={customStyle.EnrollNew2Height}>
              <Sample setChild={this.textChangeHandler.bind(this)} reqFlag={true} name={'Height'} label={'Height (feet)'} value={this.state.feet} disable={false} style={customStyle.textFieldWrp} length={2}  fieldType={'feet'} errMsg={'Enter Valid Height'} helperMsg={'Height Required'}  parentDetails={{name:'feet'}}></Sample>
            </div>
            <div style={customStyle.EnrollNew2HeightInch}>
              <Sample setChild={this.textChangeHandler.bind(this)} reqFlag={true} name={'Height'} label={'Height (inches)'} value={this.state.inches} disable={false} style={customStyle.textFieldWrp} length={2}  fieldType={'inch'} errMsg={'Enter Valid Height'} helperMsg={'Height Required'}  parentDetails={{name:'inches'}}></Sample>
            </div>
            <div style={customStyle.EnrollNew2Weight}>
              <Sample setChild={this.textChangeHandler.bind(this)} reqFlag={true} name={'Weight'} label={'Weight (pounds)'} value={this.state.weight} disable={false} style={customStyle.textFieldWrp} length={3}  fieldType={'num'} errMsg={'Enter Valid Weight'} helperMsg={'Weight Required'}  parentDetails={{name:'weight'}}></Sample>
            </div>
          </div>
        </div>
        {
          this.state.instData.description !== '' &&
          <div style={customStyle.w31}>
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

export default EnrollNew2;
