import React, { Component } from 'react';
import customeClasses from './EnrollFamily.css.js';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import configuration from '../../../../configurations';
import Loader from '../../../loader';
import axios from 'axios';
import customStyle from "../../../../Assets/CSS/stylesheet_UHS";
import Sample from "../../../CommonScreens/sampleTextField";
import i18n from '../../../../i18next';
var convert = require('xml-js');

class EnrollNew1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      progress: 0,
      disablePrev: false,
      checkedB: true,
      street: this.props.familyData.postalCode !=='' ? this.props.familyData.street : '',
      city: this.props.familyData.postalCode!==''?this.props.familyData.city:'',
      state: this.props.familyData.postalCode!==''?this.props.familyData.state:'',
      postalCode: this.props.familyData.postalCode,
      country: this.props.familyData.postalCode!==''?this.props.familyData.country:'',
      showEdit: false,
      stateList: [],
      loaderShow: false,
      instData : this.props.instData,
    };
  }

  componentDidMount() {
    this.textChangeHandler();
    this.setState({
      loaderShow: true
    })
    fetch(configuration.baseUrl + '/enrollment/getState')
      .then((response) => response.json())
      .then(response => {
        if (response.response) {
          this.setState({
            stateList: response.response,
            loaderShow: false
          });
        }
      })
      .catch(error => {
        console.log(error);
      })
  }

  reduceProgress = () => {
    if (this.state.count > 0) {
      this.setState({
        count: this.state.count - 1,
        progress: (this.state.count - 1) / this.state.questions.length * 100
      });
    }
  }

  increaseProgress = () => {
    if (this.state.count < this.state.questions.length - 1) {
      this.setState({
        count: this.state.count + 1,
        progress: (this.state.count + 1) / this.state.questions.length * 100
      });
    }
  }

  textChangeHandler = (val,valid,details) => {
    if (valid) {
      this.state[details.name] = val;
      if (details.name === 'postalCode') {
        this.handlePostalCode(val);
      }
      this.setState({
        refresh: true,
      });

    }else if(details){
      this.state[details.name] = '';
      if(details.name === 'postalCode'){
        this.setState({
          city:'',
          state:'',
          country:'',
          street:'',
        })
      }
      this.setState({
        refresh: true,
      });
    }
    if (this.state.street !== '' && this.state.city !== '' && this.state.state !== '' && this.state.postalCode !== ''&& this.state.country !== '' && this.state.postalCode.length === 5 ) {
      let obj = {
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        postalCode: this.state.postalCode,
        country: this.state.country
      };
      this.props.onClick(false, obj);
    }else {
      let obj = {
        street: this.state.street,
        city: this.state.city,
        state: this.state.state,
        postalCode: this.state.postalCode,
        country: this.state.country,
      };
      this.props.onClick(true, obj);
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
  secondMethod(e) {
    const re = /[^`\~\!\@\#\$\%\^\*\+\=\{\}\<\>\?|]$/;
    if (!re.test(e.key)) {
      e.preventDefault();
    }
  }

  handlerCopy(e) {
    e.preventDefault();
  }

  handlePostalCode = (zipcode) => {
    this.setState({
      loaderShow: true
    });
    let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="935USTGL7449"><ZipCode ID="0"><Zip5>${zipcode}</Zip5></ZipCode></CityStateLookupRequest>`
  
    axios.get(url)
      .then(response => {
        var result2 = convert.xml2json(response.data, { compact: false, spaces: 4 });
       if (JSON.parse(result2).elements[0].elements[0].elements[0].elements[2] ) {
         var evt = new CustomEvent('zip',{detail:{zipcode:zipcode,flag:true}});
         window.dispatchEvent(evt);
          this.setState({
            city: '',
            state: '',
            country: '',
            street:'',
            loaderShow : false
          },()=> {
            this.textChangeHandler('','');
          });
        } else {
          this.setState({
            city: JSON.parse(result2).elements[0].elements[0].elements[1].elements[0].text,
            state: JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text,
            postalCode: JSON.parse(result2).elements[0].elements[0].elements[0].elements[0].text,
            country: 'US',
            loaderShow : false
          },()=> {
            this.textChangeHandler('','');
          })
          var evt = new CustomEvent('zip',{detail:{zipcode:zipcode,flag:false}});
          window.dispatchEvent(evt);
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({
          loaderShow: false
        });
      })
  };

  render() {
    return (
      <div style={customStyle.EnrollNew1}>
        {
          this.state.loaderShow ? <Loader></Loader> : ''
        }
        <div style={customStyle.w100}>
          <div style={customeClasses.subTitle} >{this.state.instData.title}</div>
          <div style={customStyle.EnrollNew1Display}>
            <div style={customStyle.EnrollNew1Zip}>
             <Sample setChild={this.textChangeHandler.bind(this)} name={'Zip'} label={'Zip'} reqFlag={true} value={this.state.postalCode} disable={false} style={customStyle.textFieldWrp} length={5}  fieldType={'zip'} errMsg={'Enter Valid Zip Code'} helperMsg={'Zip Code Required'}  parentDetails={{name:'postalCode'}}></Sample>
            </div>
          </div>
          <div style={customStyle.EnrollNew1Display}>
            <div style={customStyle.EnrollNew1Zip}>
              <Sample setChild={this.textChangeHandler.bind(this)} name={'Streetsuite'} label={'Street,Suite'} reqFlag={true} value={this.state.street} disable={false} style={customStyle.textFieldWrp} length={100}  fieldType={'street'} errMsg={'Enter Valid Street'} helperMsg={'Street Required'}  parentDetails={{name:'street'}}></Sample>
            </div>
            <div style={customStyle.EnrollNew1City}>
              <Sample setChild={this.textChangeHandler.bind(this)} name={'City'} label={'City'} value={this.state.city} reqFlag={true} disable={false} style={customStyle.textFieldWrp} length={100}  fieldType={'city'} errMsg={'Enter Valid City'} helperMsg={'City Required'}  parentDetails={{name:'city'}}></Sample>
            </div>
          </div>
        
          <div style={customStyle.EnrollNew1State}>
            <div style={customStyle.w224}>
              <Sample setChild={this.textChangeHandler.bind(this)} name={'State'} label={'State'} value={this.state.state} reqFlag={true} disable={false} style={customStyle.textFieldWrp} length={2}  fieldType={'text'} errMsg={'Enter Valid State'} helperMsg={'State Required'}  parentDetails={{name:'state'}}></Sample>
             {/*<span style={{ color: '#656262', fontSize: '12px' }}>{this.state.formErrors.state}</span>*/}
            </div>
            <div style={customStyle.EnrollNew1Country}>
              <Sample setChild={this.textChangeHandler.bind(this)} name={'Country'} label={'Country'} value={this.state.country} reqFlag={true} disable={false} style={customStyle.textFieldWrp} length={2}  fieldType={'text'} errMsg={'Enter Valid Country'} helperMsg={'Country Required'}  parentDetails={{name:'country'}}></Sample>
            </div>
          </div>
        </div>

        { this.state.instData.description !== '' &&
          <div style={customStyle.w31}>
  <div style={customeClasses.subTitle}>{i18n.t('ENROLL_NEW.SUB_TITLE')}</div>
            <div style={customStyle.EnrollNew1Instruction}>
              {/*{this.state.instData.description}*/}
              <div dangerouslySetInnerHTML={{ __html: this.state.instData.description}} />
            </div>
          </div>
        }
      </div>
    );
  }
}

export default EnrollNew1;
