import React, { Component }  from 'react';
import { withStyles } from '@material-ui/core/styles';
import '../Assets/CSS/common.css';
import Header from '../Header/Header'
import Sample from '../CommonScreens/sampleTextField';
import Loader from "../Styles/Loader";
import styles from '../Styles/stylesheet_UHS'
import Button from "@material-ui/core/Button";
import Footer from '../Footer/Footer'

import Fab from "@material-ui/core/Fab";
import ChattButtonText from '../WebFooter/ChattButtonText';
import axios from 'axios'
import configurations from "../../../../../configurations";
import DetailPage from '../DetailPage/DetailPage';
const publicIp = require('public-ip');
var convert = require('xml-js');

var minm = 1000;
var maxm = 9999;
var maxAmount = null;
var minAmount = null;
const NextButton = withStyles(
    // styles.doneBtn
    styles.doneBtnNetwell

)(Button);

const CrudButton = withStyles(
    styles.crudBtn,
)(Fab);

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {

            loader: true,
            width: '',
            screeCount: 0,
            maxAmount: 0,
            minAmount: 0,

            zipcode: '',
            state: '',
            city: '',
            country: '',
            familyTotalNumber: '',

            age: '',
            dependantAge: [],

            finalAgeArr: [],

            familyNumber: [],
            detailsData: [],
            disableDone: true,
            ageCount: 0,
            ipaddress: '',
            clientId: configurations.clientId,
            associationId: 'DapperCodes Campaign',
            brokerId: 'testRadioQuickQuote',
            empid: '',
            agentName: '',
            agentEmail: '',
            agentPhone: '',
            agentDetails: {},
            fromAgent: false,
            channelName:'',
            headerData:[],
            quoteData:[],
            tooltipData:[],
            otherFees:[],
            customerServiceNo : '',

            validAge: [],
            validAgeflag: false,
            back: false,
            yourDetails: {
                individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                age: '',
                gender: '',
                valid: false,
                relationship: 'PRIMARY'
            },
            spouse: {
                individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                age: '',
                gender: '',
                valid: false,
                relationshipCode: 'SPOUSE',
                relationship: 'SPOUSE'
            },
            family: [
                {
                    individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                    age: '',
                    gender: '',
                    valid: false,
                    relationshipCode: 'CHILD',
                    relationship: 'CHILD'
                }
            ],


        }

    }
    componentDidMount() {
        this.setState({ loader: true })
        
        this.getPublicIP()
        // State param------------------

        let urlValues = window.location.hash ? window.location.hash.split('=') : [];
        if (urlValues && urlValues.length > 0) {
            if (urlValues[1]) {
                
                this.getDecodeData(urlValues[1]);
                
            }
        }
        
       

        //  display prvious data after click on back button from------------


        if (sessionStorage.getItem("Details") !== '' || sessionStorage.getItem("Details") !== null) {

            // let dependantAgeArr=JSON.parse(sessionStorage.getItem("dependantAge"))


            if (JSON.parse(sessionStorage.getItem("dependantAge"))) {
                let dependantAgeArr = JSON.parse(sessionStorage.getItem("dependantAge"))
                for (var i = 0; i < dependantAgeArr.length; i++) {
                    this.state.dependantAge.push(dependantAgeArr[i])
                    this.state.validAge[i] = true
                }
                // this.state.detailsData.push(dependantAgeArr)
            }
            let userData = JSON.parse(sessionStorage.getItem("Details"))


            if (userData && userData !== null || userData !== undefined) {

                userData && userData.map((val, idx) => {

                    return this.setState({
                        zipcode: val.zipCode,
                        ageCount: sessionStorage.getItem("ageCount"),
                        familyTotalNumber: sessionStorage.getItem("ageCount"),
                        age: val.age !== null || val.age !== undefined ? val.age.split(",")[0] : null,
                        disableDone: false,
                        validAgeflag: true,

                    }, () => this.handleZipCode(val.zipCode))



                })

            }



        }

        //  if browser get refresh remove data
        window.onbeforeunload = function () {
            this.onUnload();
            // return "";
        }.bind(this);
    }

    onUnload = () => {
        sessionStorage.removeItem("Details")
        sessionStorage.removeItem("dependantAge")
        sessionStorage.removeItem("ageCount")
        // sessionStorage.removeItem("MAX_AMT")
        // sessionStorage.removeItem("MIN_AMT")
    }

    // to get ipaddress----

    getPublicIP = async () => {
        let ipv4 = await publicIp.v4();
        sessionStorage.setItem('PUBLIC-IP', ipv4);
        this.setState({
            ipaddress: ipv4,
            loader: false
        })

    }

    // decode the url-----------

    getDecodeData = (value) => {
        this.setState({ loader: true })
        axios.get(configurations.baseUrl + '/encrypt/decryptData?state=' + value)
            .then(response => {
                if (response.data.response) {
                    sessionStorage.setItem('STATE_PARAM', JSON.stringify(response.data.response));
                    let agentDetails = sessionStorage.setItem('STATE_PARAM', JSON.stringify(response.data.response))
                    this.setState({
                        clientId: response.data.response.clientId,
                        associationId: response.data.response.associationId,
                        brokerId: response.data.response.brokerId,
                        empid: response.data.response.empid,
                        agentName: response.data.response.agentName,
                        agentEmail: response.data.response.email,
                        agentPhone: response.data.response.phone,
                        fromAgent: response.data.response.fromAgent,
                        channelName:response.data.response.channelName,
                        loader: false
                    })
                }
            });
    }




    // handle change data from textfeild

    setValue(value, valid, parent) {
        if (parent.flag === 'zip') {
            if (valid) {
                this.state.zipcode = value;
                if (value) {
                    this.handleZipCode(value, parent);
                }
            } else {
                this.state[parent.name] = '';
                this.state.zipcode = '';
            }
        } else if (parent.flag === 'coverage') {
            if (valid) {
                this.state.familyTotalNumber = value;
                this.state.ageCount = value
            } else {
                this.state[parent.name] = '';
                this.state.familyTotalNumber = '';
                this.state.ageCount = 0;
                this.state.dependantAge = []
                this.state.finalAgeArr = []
                this.state.validAge = []
            }
        } else if (parent.flag === 'yourDetails') {
            if (valid) {
                this.state.age = value;

            } else {
                this.state[parent.name] = '';
                this.state.age = '';
            }
        } else if (parent.flag === 'family') {

            if (valid) {
                this.state.dependantAge[parent.index] = value;
                this.state.validAge[parent.index] = true
                // this.state.validAgeflag = true
                this.checkValidation()
                if (value) {
                    if (value.match(/^[a-zA-Z ]*$/)) {
                        this.state.validAgeflag = false
                        this.checkValidation()
                    } else {
                        this.state.validAgeflag = true
                        this.checkValidation()
                    }


                } else {

                    this.state.validAge[parent.index] = false
                    this.state.validAgeflag = false
                    this.checkValidation()
                }


            } else {
                
                if (value) {
                    if (value.match(/^[a-zA-Z ]*$/)) {
                        this.state.validAgeflag = false
                        this.state.validAge[parent.index] = false
                        this.state.dependantAge[parent.index] = '';
                        this.checkValidation()
                    } else {
                        this.state[parent.index] = '';
                        this.state.dependantAge[parent.index] = '';
                        this.state.validAgeflag = false
                        this.state.validAge[parent.index] = true
                        this.state.dependantAge = this.remove(this.state.dependantAge, value)
                        // this.state.validAge[parent.index] = true
                        this.checkValidation()
                    }


                } else {
                    this.state.validAgeflag = false
                    this.state.validAge[parent.index] = false
                    this.state.dependantAge = this.remove(this.state.dependantAge, value)
                    this.checkValidation()
                }
                this.checkValidation()

            }
        }

        this.checkValidation()
    }

    remove = (arrOriginal, elementToRemove) => {
        return arrOriginal.filter(function (el) { return el !== elementToRemove });
    }


    handleZipCode = (value, parent) => {
        this.setState({
            loader: true
        });
        let zipcode = this.state.zipcode;
        let url = `https://secure.shippingapis.com/ShippingAPI.dll?API=CityStateLookup&XML=<CityStateLookupRequest USERID="935USTGL7449"><ZipCode ID="0"><Zip5>${zipcode}</Zip5></ZipCode></CityStateLookupRequest>`;

        axios.get(url)
            .then(response => {
                var result2 = convert.xml2json(response.data, { compact: false, spaces: 4 });
                if (JSON.parse(result2).elements[0].elements[0].elements[0].elements[2]) {
                    this.state.state = '';
                    this.state.city = '';
                    this.state.country = '';
                    var evt = new CustomEvent('zip', { detail: { zipcode: zipcode, flag: true, errMsg: 'Enter valid zip code', parentDetails: parent } });
                    window.dispatchEvent(evt);
                    this.setState({
                        loader: false
                    });
                } else {
                    axios.get(configurations.baseUrl + '/plan/validateBlackListState/' + JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text)
                        .then(response => {
                            this.setState({
                                loader: false
                            });
                            if (!response.data.response) {
                                this.setState({ zipcode: zipcode });
                                //this.state[parent.name]=JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text;
                                this.state.zipcode = value;
                                this.state.state = JSON.parse(result2).elements[0].elements[0].elements[2].elements[0].text;
                                this.state.city = JSON.parse(result2).elements[0].elements[0].elements[1].elements[0].text;
                                this.state.country = 'US';
                                this.setState({ refresh: true, loader: false }, () => {
                                    this.checkValidation()
                                });
                            } else {
                                this.setState({
                                    loader: false
                                });
                                this.state.state = '';
                                this.state.city = '';
                                this.state.country = '';
                                var evt = new CustomEvent('zip', { detail: { zipcode: zipcode, flag: true, errMsg: 'We’re sorry. At this time, we are not offering the Universal HealthShare program in this zip code', parentDetails: parent } });
                                window.dispatchEvent(evt);
                            }
                        })
                }
            })
            .catch(error => {
                this.state.state = '';
                this.state.city = '';
                this.state.country = '';
                var evt = new CustomEvent('zip', { detail: { zipcode: zipcode, flag: true, errMsg: 'Enter valid zip code', parentDetails: parent } });
                window.dispatchEvent(evt);
                this.setState({
                    loader: false,
                    msgModal: true
                });
            })
    }

    // validation if data is blank or not

    // 
    checkValidation() {
        let count = 0
        if (this.state.dependantAge.length > 0) {
            
            for (var i = 0; i < this.state.dependantAge.length; i++) {
                if (this.state.dependantAge[i] > 0) {
                    count = count + 1
                }
                
            }
          
        }
        if (this.state.ageCount > 1) {

            if (this.state.zipcode !== '' && this.state.familyTotalNumber !== '' && this.state.age !== '' && this.state.dependantAge.length == (this.state.familyTotalNumber - 1) && this.state.validAgeflag == true && (this.state.dependantAge.length == count) ) {

                this.setState({ disableDone: false });

            } else {
                this.setState({ disableDone: true });
            }
        } else {
            if (this.state.zipcode !== '' && this.state.familyTotalNumber !== '' && this.state.age !== '') {
                this.setState({ disableDone: false });
            } else {
                this.setState({ disableDone: true });
            }
        }

    }

    checkQuoteAmount = (primaryAge, dependantAge) => {

        let data = [];
        let arr = [];

        this.state.yourDetails = {
            individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
            age: primaryAge,
            gender: '',
            valid: false,
            state: this.state.state,
            relationship: 'PRIMARY'
        }
        data.push(this.state.yourDetails);



        if (dependantAge.length > 0) {
            if (dependantAge.length === 1 && (dependantAge[0] > 18 && dependantAge[0] < 86)) {
                this.state.spouse = {
                    individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                    age: dependantAge[0],
                    gender: '',
                    valid: false,
                    state: this.state.state,
                    relationshipCode: 'SPOUSE',
                    relationship: 'SPOUSE'
                }
                data.push(JSON.parse(JSON.stringify(this.state.spouse)));
            } else {
                let familyArr = dependantAge.slice(1)

                if (dependantAge[0] > 18 && dependantAge[0] < 86) {
                    this.state.spouse = {
                        individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                        age: dependantAge[0],
                        gender: '',
                        valid: false,
                        state: this.state.state,
                        relationshipCode: 'SPOUSE',
                        relationship: 'SPOUSE'
                    }
                    data.push(JSON.parse(JSON.stringify(this.state.spouse)));
                    for (var i = 0; i < familyArr.length; i++) {
                        this.state.family.push(
                            {
                                individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                                age: familyArr[i],
                                gender: '',
                                valid: false,
                                state: this.state.state,
                                relationshipCode: 'CHILD',
                                relationship: 'CHILD'
                            }
                        )




                    }
                } else

                    for (var i = 0; i < dependantAge.length; i++) {
                        this.state.family.push(
                            {
                                individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                                age: dependantAge[i],
                                gender: '',
                                valid: false,
                                state: this.state.state,
                                relationshipCode: 'CHILD',
                                relationship: 'CHILD'
                            }
                        )




                    }
                let fArr = this.state.family.slice(1)

                for (let i = 0; i < fArr.length; i++) {
                    data.push(JSON.parse(JSON.stringify(fArr[i])));


                }



            }




        }




        //  to get plan amt-----------------
        let amtArr1 = []
        let amtArr2 = []
        axios.post(configurations.baseUrl + '/plan/quickQuote/' + this.state.clientId, data)
            .then(response => {
                if (response && response.data) {

                    console.log("quote data---",response.data)

                    let getPlanData1 = response.data.quote[3]
                    let getPlanData2 = response.data.quote[4] ? response.data.quote[4] : null


                    if (getPlanData2 !== null) {
                        for (var x in getPlanData1) {
                            amtArr1.push(getPlanData1[x])
                        }

                        amtArr1.push(amtArr1.slice(1))

                        for (var y in getPlanData2) {
                            amtArr2.push(getPlanData2[y])
                        }
                        amtArr2.push(amtArr2.slice(1))

                        var result = amtArr1.slice(1).map(value => value);
                        var result2 = amtArr2.slice(1).map(value => value);

                        var doubleAmt2 = []
                        for (var i = 0; i < result2.length - 1; i++) {
                            if (result2[i] != "NA") {
                                doubleAmt2.push(parseFloat(result2[i].substr(1)))
                            }


                        }
                        var doubleAmt = []
                        for (var j = 0; j < result.length - 1; j++) {
                            if (result[j] != "NA") {
                                doubleAmt.push(parseFloat(result[j].substr(1)))
                            }

                        }

                        let amtMax = Math.max(...doubleAmt2)
                        let amtMin = Math.min(...doubleAmt)

                        this.setState({
                            maxAmount: Number(amtMax).toFixed(2),
                            minAmount: Number(amtMin).toFixed(2), 
                            loader: false
                        })
                        sessionStorage.setItem("MAX_AMT", amtMax.toFixed(2))
                        sessionStorage.setItem("MIN_AMT", amtMin.toFixed(2))

                    } else {
                        for (var x in getPlanData1) {
                            amtArr1.push(getPlanData1[x])
                        }
                        amtArr1.push(amtArr1.slice(1))

                        var result = amtArr1.slice(1).map(value => value);


                        var doubleAmt = []
                        for (var i = 0; i < result.length - 1; i++) {

                            doubleAmt.push(parseFloat(result[i].substr(1)))
                        }

                        let amtMax = Math.max(...doubleAmt)
                        let amtMin = Math.min(...doubleAmt)

                        this.setState({
                            maxAmount: amtMax,
                            minAmount: amtMin,
                            loader: false
                        })
                        sessionStorage.setItem("MAX_AMT", amtMax)
                        sessionStorage.setItem("MIN_AMT", amtMin)

                    }

                    this.setState({
                        headerData :  response.data.header,
                        quoteData: response.data.quote,
                        tooltipData: response.data.shareableTooltip,
                        otherFees:response.data.otherFees,
                        customerServiceNo : response.data.customerServiceNo,
                        // isAgent : this.props.history.location.state.isAgent,
                        // ACSMFlag : acsmFlag
                    })
                }








                // var maxAmt = response.data.quote[3].HL600
                // var minAmt = response.data.quote[3].ES50

                // amtArr.push(response.data.quote[3].ES25, response.data.quote[3].ES50,
                //     response.data.quote[3].HL200, response.data.quote[3].HL400,
                //     response.data.quote[3].HL600,
                // )

                // amtArr.push(response.data.quote[3].CHS200, response.data.quote[3].CHS400,
                //     response.data.quote[3].CHS600
                // )
                // var doubleAmt = result.map(i => parseFloat(i))





            })




    }


    nextPage = () => {
        this.setState({ loader: true })
        this.checkQuoteAmount(this.state.age, this.state.dependantAge)

        if (this.state.maxAmount != null && this.state.minAmount != null) {
            var dependentArr = [];

            dependentArr.push(this.state.dependantAge)


            sessionStorage.removeItem("Details")
            let text = this.state.age.toString();
            let obj = {
                "zipCode": this.state.zipcode,
                "age": text,
                "sharingfor": "me",
                "ipaddress": this.state.ipaddress,

            }

            this.state.detailsData.push(obj)


            sessionStorage.setItem("Details", JSON.stringify(this.state.detailsData))

            sessionStorage.setItem("ageCount", this.state.ageCount)
            sessionStorage.setItem("dependantAge", JSON.stringify(this.state.dependantAge))


            axios.post(configurations.baseUrl + '/enrollment/addRadioData', JSON.parse(JSON.stringify(obj)))
                .then(response => {
                    if (response.data.code === 200) {
                        this.setState({
                            loader: false,
                            msgModal: false,
                            errMsg: "Data save successfully!",
                        });
                    } else if (response.data.code === 202) {
                        this.setState({
                            loader: false,
                            msgModal: false,
                            errMsg: "Data already registered!",
                        });
                    }
                    else {
                        this.setState({
                            loader: false,
                            msgModal: false,
                            errMsg: "Internal server error",
                        })
                    }
                })
                .catch(error => {
                    console.log(error);
                    console.log(error.response);
                    // if (error.response.status === 500) {

                    this.setState({
                        loader: false,
                        // showCommonErrorModal: true,
                    });
                    // }
                });



        }

        this.setState({
            screeCount: 1
        })



    }

    submitData = () => {
        this.setState({
            screeCount: 0,
            zipcode: '',
            familyTotalNumber: '',
            age: '',
            dependantAge: [],
            ageCount: 0,
            disableDone: true,
            family: [
                {
                    individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                    age: '',
                    gender: '',
                    valid: false,
                    relationshipCode: 'CHILD',
                    relationship: 'CHILD'
                }
            ],
            back: true
        })

    }

    backPage = () => {
        this.setState({
            screeCount: 0,
            family: [
                {
                    individual_id: Math.floor(Math.random() * (maxm - minm + 1)) + minm,
                    age: '',
                    gender: '',
                    valid: false,
                    relationshipCode: 'CHILD',
                    relationship: 'CHILD'
                }
            ],
            back: true
        })

    }
    render() {
        const inputs = [];
        let homeScreen=''
        if (this.state.ageCount > 1) {

            for (var i = 0; i < this.state.ageCount - 1; i++) {

                inputs.push(<div className="col-md-2" key={i}>

                    <div className="">

                        <Sample name={'Age'} label={'Age'} style={{ marginBottom: '10px' }}
                            length={2}
                            value={this.state.dependantAge[i]}
                            setChild={this.setValue.bind(this)}
                            // reqFlag={true}
                            // type={'number'}
                            parentDetails={{ flag: 'family', name: 'Dage', index: i }}
                            fieldType={'primaryAge'} errMsg={'Enter valid age'}
                            helperMsg={'Age required'} />
                        {
                             this.state.validAge[i] == true ? '' : <span key={i} className='helperText'>Age required</span>
                        }


                    </div>

                </div>

                )
            }



        }

        return (
            <div className="main_page_wrap">
                {this.state.loader ? <Loader /> : null}
                {
                    this.state.screeCount == 0 ?

                        <div className="web_container">

                            <Header />

                            <div className='h4_text'>
                                <div className="row">
                                    <div className="col-md-12">  {/* <H1> tag */}
                                        {/* {this.state.fromAgent ? */}
                                            <h4 style={{color:'#162242'}}>Let’s get started!</h4>
                                            {/* :
                                            <h4> Welcome FaithTalk Listeners - Let's start saving now!</h4>
                                        } */}
                                        {/*  */}

                                    </div>
                                </div>
                            </div>

                            <div className='p_tag'>
                                <div className="row ">
                                    <div className="col-md-12">  {/* <P> tag */}

                                        
                                            <p>
                                                Here you will be able to get an estimate on netWell programs. 
                                                Simple and easy - all that is required is to enter the number of family members including 
                                                yourself and the age of each member along with your zipcode. 
                                                Any choices you make at this stage can be changed if you decide to proceed with enrollment.
                                            </p>
                                          
                                        {/*  */}


                                    </div>
                                </div>
                            </div>



                            <div className='form_tag'>


                                <form>



                                    <div className="row">
                                        <div className="col-md-3">
                                            <div className="textBold" >
                                                Zip code
                                            </div>
                                            <Sample name={'Zip code'} label={'Zip code of your family residence'}
                                                length={5} value={this.state.zipcode}
                                                disable={false}
                                                style={{ width: '100%', marginBottom: '10px' }}
                                                setChild={this.setValue.bind(this)}
                                                reqFlag={true} fieldType={"zip"}
                                                errMsg={'Enter valid zip code'}
                                                helperMsg={'Zip code required'}
                                                parentDetails={{ flag: 'zip', name: 'state' }} />
                                        </div>

                                        <div className="col-md-4">
                                            <div className="textBold">
                                                Sharing for
                                            </div>
                                            <Sample name={'Family&me'} label={'The total # of family members including me'}
                                                length={5} value={this.state.familyTotalNumber}
                                                disable={false}
                                                style={{ width: '85%', marginBottom: '10px' }}
                                                setChild={this.setValue.bind(this)}
                                                reqFlag={true}
                                                // type={'number'}
                                                fieldType={'primaryAge'}
                                                errMsg={'Enter valid family total'}
                                                helperMsg={'Coverage required'}
                                                parentDetails={{ flag: 'coverage', name: 'coverage' }} />
                                        </div>
                                    </div>
                                </form>

                            </div>




                            <form>

                                <div className="row">

                                    <div className="col-md-3">
                                        <div className="textBold">
                                            Your Details
                                        </div>
                                        <Sample name={'Age'} label={'Age'} style={{ width: '42%', marginBottom: '20px' }}
                                            length={2}
                                            value={this.state.age}
                                            setChild={this.setValue.bind(this)}
                                            reqFlag={true}
                                            parentDetails={{ flag: 'yourDetails', name: 'age' }}
                                            type={'number'} fieldType={'primaryAge'} errMsg={'Enter valid age'}
                                            helperMsg={'Age required'} />

                                    </div>
                                    <div className="col-md-8">
                                        {this.state.ageCount > 1 ?
                                            <div className="textBold">
                                                Your Dependent’s Details
                                            </div> : null}

                                        <div className="row">

                                            {inputs}

                                        </div>




                                    </div>

                                </div>

                            </form>


                            <div className='button_tag'>
                                <div className="row">
                                    <div className="col-md-4">  {/* <H1> tag */}
                                        <NextButton color="primary" disabled={this.state.disableDone} aria-label="add" type="submit" onClick={this.nextPage}>Done</NextButton>
                                    </div>
                                </div>

                            </div>

                            <ChattButtonText show={true} fromAgent={this.state.fromAgent} />
                        </div>
                        :
                       
                            <DetailPage maxAmount={this.state.maxAmount} minAmount={this.state.minAmount}
                                backPage={this.backPage} submitData={this.submitData}
                                clientId={this.state.clientId} associationId={this.state.associationId}
                                brokerId={this.state.brokerId} empid={this.state.empid} fromAgent={this.state.fromAgent}
                                agentName={this.state.agentName} agentEmail={this.state.agentEmail}
                                agentPhone={sessionStorage.getItem("STATE_PARAM") ? sessionStorage.getItem("STATE_PARAM") : null}
                                headerData={this.state.headerData} quoteData={this.state.quoteData}
                                tooltipData={this.state.tooltipData} otherFees={this.state.otherFees}
                                customerServiceNo={this.state.customerServiceNo} channelName={this.state.channelName}                 
                                state={this.state.state} city={this.state.city} zipcode={this.state.zipcode}

                            />
                           

                }






                <div className="footerBackColor"><Footer /></div>


            </div>

        )
    }
}

