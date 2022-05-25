import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../../../Assets/CSS/stylesheet_UHS';
import  Sample from '../../CommonScreens/sampleTextField';
import Fab from "@material-ui/core/Fab";
import { withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import ForumIcon from '@material-ui/icons/Forum';
import CommonDropDwn from "../../CommonScreens/CommonDropDwn_1";
import Configuration from '../../../configurations';
import InputLabel from '@material-ui/core/InputLabel';
import axios from 'axios';
import Header from '../Headers/Header';
import customStyle from "../../../Assets/CSS/stylesheet_UHS";
import Loader from '../../loader';
import i18n from "../../../i18next";
import Cookies from 'universal-cookie';
import { Auth } from 'aws-amplify';
import {getPublicIP, saveLogin} from "../../authentication/utils";
import { Modal} from 'react-bootstrap';
var convert = require('xml-js');


var minm = 1000;
var maxm = 9999;
const CrudButton = withStyles(
    styles.crudBtn,
)(Fab);

const NextButton = withStyles(
    styles.doneBtn
)(Button);

const CustomButton = withStyles(
    customStyle.viewBtn
)(Button);


const cookies = new Cookies();
const style = {
        // width: '100%',
        flexGrow: 1,
        marginBottom:'1%'
    }


export default class QuickQuote1 extends Component{
    constructor(props) {
        super(props);
        this.state={
            yourDetails:{
                individual_id : Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                age:'',
                gender:'',
                valid:false,
                relationship : 'PRIMARY'
            },
            spouse:{
                individual_id:Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                age:'',
                gender:'',
                valid:false,
                relationshipCode : 'SPOUSE',
                relationship : 'SPOUSE'
            },
            family:[  
                {
                    individual_id:Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                    age:'',
                    gender:'',
                    valid:false,
                    relationshipCode : 'CHILD',
                    relationship : 'CHILD'
                }
            ],
            validDetails:false,
            state:'',
            city:'',
            counry:'',
            zip: '',
            coverage:'me',
            genderList:[],
            familyList:[],
            loaderShow : false,
            isLogged : false,
            rmd:false,
            customerServiceNo : sessionStorage.getItem('customerServiceNo'),
            notAuthorisedPerson : false,
            STATE_PARAM : JSON.parse(sessionStorage.getItem('STATE_PARAM')),//.get('STATE_PARAM', false),
            isAgent : false,
            msgModal : false
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        getPublicIP();  
        this.setState({loaderShow : true});
        Auth.currentSession().then((session) => {
            let email = this.parseJwt(session.idToken.jwtToken);
            saveLogin(email, 'quickQuote_didM');
            this.setState({loaderShow : true});
            this.props.history.push('/');
        }).catch((error) => {
            console.log('inside get current user')
            this.setState({loaderShow : true});
            localStorage.setItem('isLogged', 'false');
            let urlValues = window.location.hash ? window.location.hash.split('=') : [];
            let chatId = sessionStorage.getItem('CHAT_BOX_Id');
            if (urlValues && urlValues.length > 0) {
                axios.get(Configuration.baseUrl + '/encrypt/decryptData?state=' + urlValues[1])
                    .then(response => {
                        if (response.data.response) {
                            //cookies.set("STATE_PARAM", response.data.response, {path: '/'});
                            sessionStorage.setItem('STATE_PARAM', JSON.stringify(response.data.response));
                            if(response.data.response && response.data.response.empid) {
                                axios.get(Configuration.agentURL + '/employer/getEmployerByEmpId/' + response.data.response.empid)
                                    .then(response => {
                                        sessionStorage.setItem('EMP_NAME', response.data.response ? response.data.response.companyName : '' )
                                    });
                            }
                            this.setState({
                                STATE_PARAM : response.data.response,
                                isAgent : response.data.response.isAgent ? response.data.response.isAgent : false
                            });
                            sessionStorage.setItem('isAgent', response.data.response.isAgent ? response.data.response.isAgent : false);
                            if (!response.data.response.isAgent){
                                if(chatId === null) {
                                    sessionStorage.setItem('CLIENT_ID', response.data.response.clientId);
                                    let data = {
                                        "clientId": response.data.response.clientId
                                    }
                                    axios.post(Configuration.baseUrl + '/enrollment/getClient', data)
                                        .then(response => {
                                            if (response.data.response) {
                                                sessionStorage.setItem('CHAT_BOX_Id', response.data.response.chatBoxId);
                                                sessionStorage.setItem('customerServiceNo', response.data.response.customerServiceNo);
                                                window.location.reload();
                                            }
                                        })
                                }
                            }
                            this.setQuickQuoteData();
                        } else {
                            this.setState({
                                notAuthorisedPerson : true,
                                loaderShow : false
                            });
                        }
                    });
            } else {
                this.setState({
                    notAuthorisedPerson : true,
                    loaderShow : false
                });
            }
        });





        /*this.state.isLogged = sessionStorage.getItem('isLogged');
        if(this.state.isLogged === "true") {
            let urlValues = window.location.hash ? window.location.hash.split('=') : [];
            if (urlValues && urlValues.length > 0) {
                axios.get(Configuration.baseUrl + '/encrypt/decryptData?state=' + urlValues[1])
                    .then(response => {
                        if (response.data.response) {
                            cookies.set("STATE_PARAM", response.data.response, {path: '/'});
                            this.props.history.replace("/");
                        } else {
                            this.setState({
                                notAuthorisedPerson : true
                            });
                        }
                    });
            }
        } else {

        }*/
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
        return token.email;
    };

    setQuickQuoteData = () => {
        let data=[];
        let dependantData= JSON.parse(sessionStorage.getItem('Dependant'));
        let memberDetail= JSON.parse(sessionStorage.getItem('MemberDetails'));
        let postalCode=sessionStorage.getItem('postalCode');
        let coverage=sessionStorage.getItem('coverage');
        let family= JSON.parse(sessionStorage.getItem('family'));

        if(memberDetail){
            this.setState({
                yourDetails: memberDetail,
                coverage:coverage,
                zip:postalCode,
                validDetails:true
            },()=>this.handleZipCode(postalCode))
        }

        if(coverage === 'spouse'){
            if(dependantData && dependantData.length > 0 ){
                let spouseDetails = dependantData[dependantData.length-1];
                this.setState({
                    spouse:spouseDetails,
                    validDetails:true
                },()=>this.handleZipCode(postalCode))
            }
        }

        if(coverage === 'family' ){
            if(family && family.length > 0) {
                let spouse=family[1];
                let childData = [];
                childData = family.slice(2, family.length);
                this.setState({
                    family:childData,
                    spouse:spouse,
                    validDetails:true
                })
            }
        }

        if(coverage === 'child'){
            if(family && family.length>0) {
                let childData = family.slice(1, family.length);
                this.setState({
                    family:childData,
                    validDetails:true
                });
            }
        }

        axios.get(Configuration.baseUrl + '/enrollment/getGenderForQuote')
            .then(response=>{
                if(response.data.response){
                    this.setState({genderList:response.data.response.gender,familyList:response.data.response.coverage,loaderShow : false })
                    if(dependantData && dependantData.length>0 ){
                        this.state.coverage = coverage;
                    }
                    else{
                        let findObj = response.data.response.coverage.find(obj => obj.value === 'me');
                        this.state.coverage = findObj.value;
                    }
                }
            });
    }


    setValue(value,valid,parent){
        if(parent.flag === 'yourDetails'){
            if(valid){
                this.state.yourDetails[parent.name]=value
            }else{
                this.state.yourDetails[parent.name]=''
            }
        }else if(parent.flag === 'spouseDetails'){
            if(valid){
                this.state.spouse[parent.name]=value
            }else{
                this.state.spouse[parent.name]=''
            }
        }else if(parent.flag === 'family'){
            if(valid){
                this.state.family[parent.index].individual_id = Math.floor(Math.random() * (maxm - minm + 1)) + minm;


                this.state.family[parent.index][parent.name]=value
            }else{
                this.state.family[parent.index][parent.name]='';
                this.state.family[parent.index].valid =false;
            }
            if(this.state.family[parent.index].gender !== '' && this.state.family[parent.index].age !== ''){
                this.state.family[parent.index].valid =true;
            }
        }else if(parent.flag === 'zip'){
            if(valid){
                //this.state[parent.name]=parent.state;
                this.state.zip = value;
                if(value){
                    this.handleZipCode(value, parent);
                }
            }else{
                this.state[parent.name]='';
                this.state.zip = '';
            }
        }else if(parent.flag === 'coverage'){
            this.state.coverage = value;
            if(value.toLowerCase() === 'me'){
                this.state.family =[];
                this.setState({
                    spouse:{
                        individual_id:Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                        age:'',
                        gender:'',
                        valid:false,
                        relationshipCode : 'SPOUSE',
                        relationship : 'SPOUSE'
                    }
                })
            } else if(value.toLowerCase() === 'child'){
                if(this.state.family.length > 0){
                    let arr = [];
                    for(let i = 0; i < this.state.family.length; i++){
                        if(this.state.family[i].valid){
                            arr.push(this.state.family[i]);
                        }
                    }
                    if(arr.length > 0){
                        this.state.family = arr;
                    } else {
                        this.state.family =[];
                        this.state.family.push({
                            individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                            age:'',
                            gender:'',
                            valid:false,
                            relationshipCode : 'CHILD',
                            relationship : 'CHILD'
                        });
                    }
                } else {
                    this.state.family =[];
                    this.state.family.push({
                        individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                        age:'',
                        gender:'',
                        valid:false,
                        relationshipCode : 'CHILD',
                        relationship : 'CHILD'
                    });
                }

                this.setState({
                    spouse:{
                        individual_id:Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                        age:'',
                        gender:'',
                        valid:false,
                        relationshipCode : 'SPOUSE',
                        relationship : 'SPOUSE'
                    }
                })

            } else if(value.toLowerCase() === 'spouse'){
                this.state.family =[];
                this.setState({
                    refresh : true
                });
            } else if(value.toLowerCase() === 'family'){
                if(this.state.family.length > 0){
                    let arr = [];
                    for(let i = 0; i < this.state.family.length; i++){
                        if(this.state.family[i].valid){
                            arr.push(this.state.family[i]);
                        }
                    }
                    if(arr.length > 0){
                        this.state.family = arr;
                    } else {
                        this.state.family =[];
                        this.state.family.push({
                            individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                            age:'',
                            gender:'',
                            valid:false,
                            relationshipCode : 'CHILD',
                            relationship : 'CHILD'
                        });
                    }
                } else {
                    this.state.family =[];
                    this.state.family.push({
                        individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                        age:'',
                        gender:'',
                        valid:false,
                        relationshipCode : 'CHILD',
                        relationship : 'CHILD'
                    });
                }

                this.setState({
                    refresh : true
                });
            }
        }

       this.checkValidation()
    }

    handleZipCode = (value, parent) =>{
        this.setState({
            loaderShow : true
        });
        let zipcode = this.state.zip;
        let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="935USTGL7449"><ZipCode ID="0"><Zip5>${zipcode}</Zip5></ZipCode></CityStateLookupRequest>`;

        axios.get(url)
            .then(response => {
                var result2 = convert.xml2json(response.data, { compact: false, spaces: 4 });
                if (JSON.parse(result2).elements[0].elements[0].elements[0].elements[2] ) {
                    this.state.state = '';
                    this.state.city = '';
                    this.state.country = '';
                    var evt = new CustomEvent('zip',{detail:{zipcode:zipcode,flag:true, errMsg : 'Enter valid zip code', parentDetails : parent}});
                    window.dispatchEvent(evt);
                    this.setState({
                        loaderShow : false
                    });
                } else {
                    axios.get(Configuration.baseUrl + '/plan/validateBlackListState/'+JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text)
                        .then(response=>{
                            this.setState({
                                loaderShow : false
                            });
                            if(!response.data.response){
                                this.setState({zip : zipcode});
                                //this.state[parent.name]=JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text;
                                this.state.zip = value;
                                this.state.state = JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text;
                                this.state.city = JSON.parse(result2).elements[0].elements[0].elements[1].elements[0].text;
                                this.state.country = 'US';
                                this.setState({refresh:true},()=>{
                                    this.checkValidation()
                                });
                            }else{
                                this.state.state = '';
                                this.state.city = '';
                                this.state.country = '';
                                var evt = new CustomEvent('zip',{detail:{zipcode:zipcode,flag:true, errMsg: 'We’re sorry. At this time, we are not offering the Universal HealthShare program in this zip code', parentDetails : parent}});
                                window.dispatchEvent(evt);
                            }
                        })
                }
            })
            .catch(error => {
                this.state.state = '';
                this.state.city = '';
                this.state.country = '';
                var evt = new CustomEvent('zip',{detail:{zipcode:zipcode,flag:true, errMsg : 'Enter valid zip code', parentDetails : parent}});
                window.dispatchEvent(evt);
                this.setState({
                    loaderShow : false,
                    msgModal : true
                });
            })
    }

    checkValidation(){
        if(this.state.coverage === 'me'){
            if(this.state.yourDetails.age !== '' && this.state.yourDetails.gender !== '' && this.state.state !== ''){
                this.setState({validDetails:true});
            } else {
                this.setState({validDetails:false});
            }
        } else if(this.state.coverage === 'spouse'){
            if(this.state.yourDetails.age !== '' && this.state.yourDetails.gender !== '' && this.state.state !== '' && this.state.spouse.age !== '' && this.state.spouse.gender !== ''){
                this.setState({validDetails:true});
            } else {
                this.setState({validDetails:false});
            }
        } else if(this.state.coverage === 'family'){
            let count =0;
            for(let i=0;i<this.state.family.length;i++){
                if((this.state.coverage === 'child' || this.state.coverage === 'family') && !this.state.family[i].valid){
                    count++;
                }                
            }

            if(this.state.yourDetails.age !== '' && this.state.yourDetails.gender !== '' && this.state.state !== '' && this.state.spouse.age !== '' && this.state.spouse.gender !== '' && count === 0){
                this.setState({validDetails:true});
            } else {
                this.setState({validDetails:false});
            }
        } else if(this.state.coverage === 'child'){
            let count =0;
            for(let i=0;i<this.state.family.length;i++){
                if((this.state.coverage === 'child' || this.state.coverage === 'family') && !this.state.family[i].valid){
                    count++;
                }
            }

            if(this.state.yourDetails.age !== '' && this.state.yourDetails.gender !== '' && this.state.state !== '' && count === 0){
                this.setState({validDetails:true});
            } else {
                this.setState({validDetails:false});
            }
        }

    }

    addDependent(){
        this.state.family.push({
            individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
            age:'',
            gender:'',
            valid:false,
            relationshipCode : 'CHILD',
            relationship : 'CHILD'
        });
        this.setState({refresh:true},()=>{
            this.checkValidation()
        })
    }

    removeDependent(event,key,index){
        this.state.family.splice(index,1)
        
        if(this.state.family.length === 0 && this.state.coverage === 'family' ){
            this.setState({coverage:'spouse'},()=>{
                this.checkValidation()
            })
        }
        if(this.state.family.length === 0 && this.state.coverage === 'child' ){
            this.setState({coverage:'me'},()=>{
                this.checkValidation()
            })
        }
        this.setState({refresh:true},()=>{
            this.checkValidation()
        })
       
    }

    saveDetails(){
        this.setState({
            loaderShow : true
        });
        let data = [];
        let Dependant = [];
        data.push(this.state.yourDetails);
        if(this.state.coverage === 'spouse' || this.state.coverage === 'family'){
            data.push(JSON.parse(JSON.stringify(this.state.spouse)));
            Dependant.push(JSON.parse(JSON.stringify(this.state.spouse)));

        }
        if(this.state.coverage === 'child' || this.state.coverage === 'family'){
            for(let i=0; i<this.state.family.length; i++){
                data.push(JSON.parse(JSON.stringify(this.state.family[i])));
                Dependant.push(JSON.parse(JSON.stringify(this.state.family[i])));
                sessionStorage.setItem('family', JSON.stringify(data));
            }
        }

        sessionStorage.setItem('Dependant',JSON.stringify(Dependant));
        sessionStorage.setItem('MemberDetails',JSON.stringify(this.state.yourDetails));
        sessionStorage.setItem('postalCodeData', JSON.stringify({state : this.state.state, postalCode : this.state.zip, city : this.state.city, country : this.state.country}));
        sessionStorage.setItem('coverage', this.state.coverage);
        sessionStorage.setItem('postalCode', this.state.zip);

        for(let i=0;i<data.length;i++){
            data[i]["state"]=this.state.state;
        }

        let STATE_PARAM = JSON.parse(sessionStorage.getItem('STATE_PARAM')); //cookies.get('STATE_PARAM', false);
        let clientId = '';
        if(STATE_PARAM && STATE_PARAM.clientId){
            clientId = STATE_PARAM.clientId;
        } else {
            clientId = Configuration.clientId;
        }

        sessionStorage.setItem('QUOTE_EMAIL', JSON.stringify(data));
            
        axios.post(Configuration.baseUrl + '/plan/quickQuote/' + clientId,data)
            .then(response=>{
                if(response.data){
                    this.setState({
                        loaderShow : false
                    });

                    if(clientId.toString() === '5448'){
                        let quote = JSON.parse(JSON.stringify(response.data.quote));
                        let lastRow = quote[quote.length - 1];
                        quote.pop();

                        let arr = [];
                        let keyArr = [];
                        let newLastRow = new Object();
                        Object.keys(lastRow).map((keyName, i) => {
                            let val = lastRow[keyName];
                            if(i === 0) {
                                newLastRow[keyName] = val;
                            }

                            if(i !== 0){
                                arr.push(parseFloat(lastRow[keyName].split('$')[1]).toFixed(2));
                                keyArr.push(keyName);
                            }

                        });
                        let newArr = arr.sort(function(a, b){return b-a});
                        let newKeyArr = keyArr.sort();

                        for(let i=0; i<newKeyArr.length; i++){
                            newLastRow[newKeyArr[i]] = "$" + newArr[i];
                        }

                        quote.push(newLastRow);
                        response.data.quote = quote;
                    }
                    response.data.customerServiceNo = sessionStorage.getItem('customerServiceNo');

                    console.log('========= this.props.history.location.search ===========');
                    console.log(this.props.history);
                    response.data.isAgent = this.state.isAgent;

                    this.props.history.replace("/quick_quote2"+ this.props.history.location.hash, response.data);
                    if(!this.state.isAgent){
                        window.location.reload();
                    }
                }
            })
            .catch((e)=>{
              console.log(e);
                this.setState({
                    loaderShow : false
                });
            })
    }


    render() {
        return(
            <div style={{display : this.state.isLogged === 'true' ? 'none' : 'block'}}>
                {
                    this.state.loaderShow ? <Loader></Loader> : ''
                }
                {
                    !this.state.notAuthorisedPerson ?
                        <div>
                            <Header></Header>
                            <div style={{marginTop: '30px', paddingRight : '21px', paddingLeft: '21px', paddingBottom: '21px'}}>{/* style={styles.ComponentContainer} */}
                                <div style={{width:'100%', backgroundColor:'#ffffff',paddingLeft:'10px'}}>
                                    
                                    <Grid xs={12} style={styles.QuickQt1TopWrp} item={true}>
                                        <span style={styles.QuickQtTopRightText1}>Let’s get started!</span>
                                        <span style={styles.QuickQtTopRightText2}>
                                {/* Share some basic details to find out how much health sharing costs for your family and discover the various programs on offer. */}
                                            Here you can get a quick quote on Universal HealthShare programs and, if you want to continue, launch the enrollment process. Start by telling us a little about yourself and any family members you may want to include. Any choices you make at this stage can be changed if you decide to proceed with enrollment.

                                </span>
                                    </Grid>
                                    


                                    <div style={style}>

                                        

                                    <Grid container  >                                        
                                    <Grid item xs={12} sm={5} style={{marginLeft:'1%',marginRight:'-5%',paddingBottom:'10px'}}>
                                        <InputLabel style={styles.QuickQtZipTitle}>Zip Code</InputLabel>
                                    <Sample name={'Zip code'} label={'Zip code of your family residence'}
                                                    length={5} value={this.state.zip||''} disable={false}
                                                    style={{width:'71%'}}
                                                    setChild={this.setValue.bind(this)} reqFlag={true} fieldType={"zip"}
                                                    errMsg={'Enter valid zip code'} helperMsg={'Zip code required'}
                                                    parentDetails={{flag:'zip',name:'state'}}/>
                                    </Grid>
                                    <Grid item xs={12} sm={5} style={{marginLeft:'4px',paddingBottom:'10px'}}>
                                    <InputLabel style={styles.QuickQtZipTitleCoverage}>Coverage for</InputLabel>
                                    <CommonDropDwn  name={'Family&me'} label={'My family and me'} style={{width:'70%'}} fieldType={'dropDwn'}  List={this.state.familyList} value={this.state.coverage}  disable={false} setValue={this.setValue.bind(this)} parent={{flag:'coverage',name:'coverage'}} helperMsg={'Coverage required'} /> 
                                    </Grid>
                                    </Grid>

                                    <Grid container style={{marginTop:'1%'}}>
                                    <Grid item xs={12} sm={3} style={{marginLeft:'1%',marginRight:'-5%'}}>
                                    <InputLabel style={styles.QuickQtZipTitle}>Your Details</InputLabel>
                                    <CommonDropDwn  name={'Birth Gender'} label={'Birth Gender'} List={this.state.genderList} style={{width:'48%'}} value={this.state.yourDetails.gender} setValue={this.setValue.bind(this)} parent={{flag:'yourDetails',name:'gender'}} helperMsg={'Birth gender required'} />
                                    </Grid>
                                    <Grid item xs={12} sm={3} style={{marginRight:'-8%',paddingBottom:'10px'}} >
                                    <InputLabel style={styles.QuickQtZipTitle}>  &nbsp;</InputLabel>
                                    <Sample name={'Age'}  label={'Age'} style={{width:'38%'}} length={2}  value={this.state.yourDetails.age ||''} setChild={this.setValue.bind(this)} reqFlag={true} parentDetails={{flag:'yourDetails',name:'age'}} type={'number'} fieldType={'EmpAge'} errMsg={'Enter valid age'} helperMsg={'Age required'}/>
                                    </Grid>
                                    {
                                            (this.state.coverage.toLowerCase() === 'spouse' ||  this.state.coverage.toLowerCase() === 'family')&&
                                            <>
                                            <Grid item xs={12} sm={3} style={{marginRight:'-5%'}}>
                                            <InputLabel style={styles.QuickQtSpouseTitle}>Your Spouse’s Details</InputLabel>
                                            <CommonDropDwn  name={'Birth Gender'} label={'Birth Gender'} List={this.state.genderList}  value={this.state.spouse.gender} setValue={this.setValue.bind(this)} parent={{flag:'spouseDetails',name:'gender'}} helperMsg={'Birth gender required'} />
                                            </Grid>
                                            <Grid item xs={12} sm={3}>
                                            <InputLabel style={styles.QuickQtSpouseTitle}>&nbsp;</InputLabel>
                                            <Sample name={'Age'} label={'Age'} style={{width:'38%'}} length={2} value={this.state.spouse.age || ''} reqFlag={true} setChild={this.setValue.bind(this)} parentDetails={{flag:'spouseDetails',name:'age'}} fieldType={'EmpAge'} type={"number"} errMsg={'Enter valid age'} helperMsg={'Age required'}/>
                                            </Grid>
                                            </>
                                            
                                    }
                                    
                                    </Grid>
                                    </div>
                                    <div style={{marginLeft:'1%'}}>
                                        {
                                            (this.state.coverage.toLowerCase() === 'child' || this.state.coverage.toLowerCase() === 'family') && this.state.family && this.state.family.map((key,index)=>{
                                                return(
                                                    <>
                                                    <Grid container  >
                                                    <Grid item xs={12} sm={6} >
                                                    <span style={styles.QuickQtZipTitle}>Your Dependent’s Details</span>
                                                    </Grid> 
                                                    </Grid>
                                                    <Grid container spacing={1} >
                                                    <Grid item xs={12} sm={3} style={{marginRight:'-5%'}}>
                                                    <CommonDropDwn  name={'Birth Gender'} label={'Birth Gender'}
                                                            List={this.state.genderList} value={this.state.family[index].gender} setValue={this.setValue.bind(this)} parent={{flag:'family',name:'gender',index:index}} helperMsg={'Birth gender required'} />

                                                    </Grid>
                                                    <Grid item xs={12} sm={3} style={{marginRight:'-11.3%'}}>
                                                    <Sample name={'Age'} label={'Age'} style={{width:'40%'}} length={2} value={this.state.family[index].age} setChild={this.setValue.bind(this)} reqFlag={true} parentDetails={{flag:'family',name:'age',index:index}} fieldType={'quick_quote_age'} type={"number"} errMsg={'Enter valid age'} helperMsg={'Age required'}/>
                                                    </Grid>
                                                    <Grid item xs={12} sm={2} >
                                                    <CrudButton color="primary"  aria-label="add"  style={styles.QuickRemoveBtn}  onClick={(event)=>this.removeDependent(event,key,index)}>
                                                                <RemoveIcon />
                                                            </CrudButton>
                                                            <span style={styles.QuickQtRemoveTxt}>Remove Dependent</span>
                                                    </Grid>
                                                    </Grid>
                                                    
                                                    </>
                                                )
                                            })

                                        }
                                    </div>
                                    
                                    <div style={{paddingBottom : '10px'}}>{/**/}  
                                    <Grid container spacing={1} style={{marginLeft:'1%'}}>
                                                    <Grid item xs={12} sm={4} >
                                                    <NextButton color="primary" aria-label="add" type="submit" disabled={!this.state.validDetails} onClick={()=>this.saveDetails()}>Done</NextButton>
                                                    </Grid>
                                                    <Grid item xs={12} sm={2} >
                                                    {
                                                this.state.coverage.toLowerCase() === 'child'   &&
                                                <div style={{display:'flex'}} >
                                                    <CrudButton color="primary" aria-label="add" style={{marginTop:'53px'}}  disabled={!this.state.validDetails} onClick={()=>this.addDependent()}>
                                                        <AddIcon />
                                                    </CrudButton>
                                                    <span style={styles.QuickQtDepedentTxt22}>Add Dependent</span>
                                                </div>
                                            }

                                            {
                                                this.state.coverage.toLowerCase() === 'spouse' ||  this.state.coverage.toLowerCase() === 'family'  &&
                                                <div style={{display:'flex'}} >
                                                    <CrudButton color="primary" aria-label="add" style={{marginTop:'53px'}}  disabled={!this.state.validDetails} onClick={()=>this.addDependent()}>
                                                        <AddIcon />
                                                    </CrudButton>
                                                    <span style={styles.QuickQtDepedentTxt22}>Add Dependent</span>
                                                </div>
                                            }

                                                    </Grid>
                                                    </Grid>

                                    </div>




                                    <div style={{marginRight:'23px',paddingBottom:'10px'}} hidden={this.state.isAgent}>
                                        <div style={styles.FooterChildWrp1}>
                                            <div style={{marginLeft:'auto',marginRight:'2.1%'}}>
                                                <CrudButton className={'purechat-button-expand'} color="primary" aria-label="add"  style={styles.CommonChatBtn}>
                                                    <ForumIcon />
                                                </CrudButton>
                                            </div>
                                        </div>
                                        <div style={styles.FooterChildWrp2}>
                                            <Grid xs={12} style={styles.QuickQtHelpWrp} item={true}>
                                                <div style={{display:'flex',flexDirection:'column',color: '#304d63', fontSize: '14px', lineHeight: '16px',textAlign:'right'}}>
                                                    <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'2px'}}>
                                                        <span style={styles.QuickQtHelpTxt1}>{i18n.t('ENROLL_FAMILY.HELP')}</span>
                                                    </div>
                                                    <span style={styles.QuickQtHelpTxt2}>Talk to a Universal HealthShare representative by calling {sessionStorage.getItem('customerServiceNo')}</span>
                                                </div>
                                            </Grid>
                                        </div>
                                    </div>

                                    <Modal size="xs" show={this.state.msgModal} onHide={(event) => this.setState({msgModal:false,loaderShow : false, errMsg : ''})} backdrop="static" centered>
                                        <Modal.Header style={customStyle.modal_header} closeButton>
                                            <Modal.Title>Try again later</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ margin: '10px',textAlign:'center',fontFamily : 'Roboto, Arial, Helvetica, sans-serif' }}>
                                            An unexpected error occurred. Please try again later.
                                        </Modal.Body>
                                        <Modal.Footer style={{alignItems:'right'}}>
                                            <CustomButton style={{marginTop: '10px', width: '50px', height: '40px'}} onClick={()=>{this.setState({ msgModal : false,loaderShow : false, errMsg : ''})}}>Ok</CustomButton>
                                        </Modal.Footer>
                                    </Modal>


                                </div>
                                {
                                    this.state.STATE_PARAM &&
                                        <span style={{fontSize:'10px',display:'flex', flexDirection:'row-reverse'}}>CID: {this.state.STATE_PARAM.clientId}, OID:{this.state.STATE_PARAM.associationId}, BID:{this.state.STATE_PARAM.brokerId} {sessionStorage.getItem('EMP_NAME') ? <> , EID : {sessionStorage.getItem('EMP_NAME')} </> : ''}  </span>
                                }

                            </div>

                        </div>
                        :
                        <div>
                            <div style={{ marginTop: '30px', width: '95.2%', marginLeft: '2.4%', marginRight: '2.4%', fontFamily : "Roboto, Arial, Helvetica, sans-serif"}}>
                                <div style={{width : '55%', margin : '20%'}}>
                                    <h4>Oops! Something's not right.</h4>
                                    Please go back to the email and click on the link to self-enroll. If you're still having trouble, call us on (800) 921-4505.
                                </div>
                            </div>
                        </div>
                }



            </div>
        )
    }

}
