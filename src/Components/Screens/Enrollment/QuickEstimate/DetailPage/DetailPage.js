import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import './detailPage.css';
import '../Assets/CSS/common.css';
import Header from '../Header/Header'
import Sample from '../CommonScreens/sampleTextField';
import Loader from "../Styles/Loader";
import styles from '../Styles/stylesheet_UHS'
import Button from "@material-ui/core/Button";
import Footer from '../Footer/Footer'
import Fab from "@material-ui/core/Fab";
import ChattButtonText from '../WebFooter/ChattButtonText';
import configurations from "../../../../../configurations";
import axios from 'axios';
import { Modal } from "react-bootstrap";
import planConfig from "../../../../../planConfig";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@material-ui/core";
const NextButton = withStyles(
    // styles.doneBtn
    styles.doneBtnNetwell
)(Button);

const CustomButton = withStyles(
    // styles.viewBtn
    styles.viewNetwellBtn
)(Button);

const CrudButton = withStyles(
    styles.crudBtn,
)(Fab);

const StyledTableCell = withStyles(theme => (styles.tableCell))(TableCell);
const StyledTableCell1 = withStyles(theme => (styles.tableCell1))(TableCell);

const StyledTableRow = withStyles(theme => (styles.tableRow))(TableRow);

function createData1(NAME, UHS1, UHS2, UHS3, UHS4, UHS5, UHS6) {
    return { NAME, UHS1, UHS2, UHS3, UHS4, UHS5, UHS6 };
}

const ACSMrowUhsAll = [
    createData1('One Member per Household	', '$3,000', '$4,500', '$7,500', '$10,500', '$15,000', '$18,000'),
    createData1('Two Members per Household	', '$6,000', '$9,000', '$15,000', '$21,000', '$30,000', '$36,000'),
    createData1('Three or more Members per Household	', '$9,000', '$13,500	', '$22,500', '$31,500', '$45,000', '$54,000'),
];

const ACSMrowUhs = [
    createData1('One Member per Household	', '$4,500', '$10,500', '$18,000'),
    createData1('Two Members per Household	', '$9,000', '$21,000', '$36,000'),
    createData1('Three or more Members per Household	', '$13,500	', '$31,500', '$54,000')
];

export default class DetailPage extends Component {
    constructor(props) {
        super(props)
        this.state = {

            loader: true,
            width: '',

            fname: '',
            lname: '',
            email: '',
            phone: '',
            disableSubmit: true,
            userData: [],
            maxAmt: this.props.maxAmount,
            minAmt: this.props.minAmount,
            viewProgramModal: false,
            iframeURL: '',
            smartShareModel: false,
            ACSMModal: false,
            easyShareModal: false,
            ACSMPlanAll: ['UHS1', 'UHS2', 'UHS3', 'UHS4', 'UHS5', 'UHS6'],
            ACSMPlan: ['UHS2', 'UHS4', 'UHS6'],


        }

    }
    componentDidMount() {
        if (this.props.maxAmount != null && this.props.minAmount != null) {

            this.setState({

                maxAmt: sessionStorage.getItem("MAX_AMT"),
                minAmt: sessionStorage.getItem("MIN_AMT"),
                loader: false
            })
        }
    }

    setUserValue = (value, isValid, parentDetails) => {
        if (parentDetails.name === 'firstname') {
            if (isValid) {
                this.state.fname = value;
                this.checkValidation();
            } else {
                this.state.fname = "";
                this.checkValidation();
            }
        }
        if (parentDetails.name === 'lastname') {
            if (isValid) {
                this.state.lname = value;
                this.checkValidation();
            } else {
                this.state.lname = "";
                this.checkValidation();
            }
        }
        if (parentDetails.name === 'email') {
            if (isValid) {
                this.state.email = value;
            } else {
                this.state.email = "";
            }
        } else if (parentDetails.name === 'phone') {
            if (isValid) {
                this.state.phone = value;
            } else {
                this.state.phone = "";
            }
        }
        this.checkValidation()
    }

    checkValidation() {
        if (this.props.fromAgent) {
            if (this.state.email !== '' && this.state.fname !== '' && this.state.lname !== '') {
                this.setState({ disableSubmit: false });
            } else {
                this.setState({ disableSubmit: true });
            }
        } else {
            if (this.state.email !== '') {
                this.setState({ disableSubmit: false });
            } else {
                this.setState({ disableSubmit: true });
            }
        }

    }

    submitData = () => {
        this.setState({
            loader :true
        })
        let userdata = []
        let userObj
        userdata.push(JSON.parse(sessionStorage.getItem("Details")))
        JSON.parse(sessionStorage.getItem("Details")).map(val => {
            return userObj = {
                "email": this.state.email,
                "phone": this.state.phone ? "+1" + this.state.phone : '',
                "zipcode": val.zipCode,
                "sharingfor": "me",
                "ipaddress": val.ipaddress,
                "age": val.age,
                "startAmount": this.props.minAmount,
                "endAmount": this.props.maxAmount
            }

        })
        let obj1
        if(this.props.empid){
            obj1 =JSON.stringify({
            "email": this.state.email,
            // "empid": this.props.empid,
            "first_name": this.props.fromAgent ? this.state.fname : "",
            "last_name": this.props.fromAgent ? this.state.lname : "",
            "phone": this.state.phone ? "+1" + this.state.phone : '',
            "client_id": String(this.props.clientId),
            "association_id": this.props.associationId,
            "agent_id": this.props.brokerId,
            "empid":this.props.empid?this.props.empid : 'NULL',
            "source":"Website",
            "leadSource":"Campaign/Channel",
            "website_channelc":this.props.brokerId +"/"+this.props.channelName,
            "qualification_params":[
                {
                   "City":this.props.city,
                   "State":this.props.state,
                   "PostalCode":this.props.zipcode
                }
             ]

        })
    }else{
        obj1 =JSON.stringify({
            "email": this.state.email,
            // "empid": this.props.empid,
            "first_name": this.props.fromAgent ? this.state.fname : "",
            "last_name": this.props.fromAgent ? this.state.lname : "",
            "phone": this.state.phone ? "+1" + this.state.phone : '',
            "client_id": String(this.props.clientId),
            "association_id": this.props.associationId,
            "agent_id": this.props.brokerId,
            "source":"Website",
            "leadSource":"Campaign/Channel",
            "website_channelc":this.props.brokerId +"/"+this.props.channelName,
            "qualification_params":[
                {
                   "City":this.props.city,
                   "State":this.props.state,
                   "PostalCode":this.props.zipcode
                }
             ]

        })
    }


        this.state.userData.push(userObj)

        // To save primary data---

        axios.post(configurations.baseUrl + '/enrollment/addRadioData', JSON.parse(JSON.stringify(userObj)))
            .then(response => {
                if (response.data.code === 200) {
                    this.setState({
                        // loader: false,
                        // msgModal: true,
                        // errMsg: "Thank you for sharing your contact information. Our representative will get in touch with you shortly.",
                    });
                } else if (response.data.code === 202) {
                    this.setState({
                        loader: false,
                        msgModal: true,
                        errMsg: "Data already registered!"
                    });
                }
                else {
                    this.setState({
                        loader: false,
                        msgModal: true,
                        errMsg: "Internal server error"
                    })
                }
            })
            .catch(error => {
                console.log(error);
                console.log(error.response);
                // if (error.response.status === 500) {
                this.setState({
                    loader: false,
                    msgModal: true,
                    errMsg: "Something bad happened"
                });

                // }
            });
            
            var config = {
                method: 'post',
                url: configurations.tokenURL,
                headers: { 
                  'x-api-key': 'p06EYZnLC33xHbzlLHI1413jp3qUGfYl8TL38p0E', 
                  'Authorization': 'Basic NTJqbGVlb3A2Y2hkcGJlZTFoY2xhanY5cGo6MW1tcHI3NTNlZGRhZDBoMmJyN2s5dmthMzhhMjJvc2t0bWJ2MnRoYnRlbnNtMTlydDRybg=='
                }
              };
            axios(config)
            
                .then(response => {
                    if(response && response.data){
                        console.log("token---", response)
                        this.setState({
                            accessToken : response.data.access_token,
                            // loader: false,
                        },()=>{
                            var configLead = {
                                method: 'post',
                                url:configurations.leadGenrateURL,
                                headers: { 
                                  'Authorization': this.state.accessToken, 
                                  'x-api-key': 'p06EYZnLC33xHbzlLHI1413jp3qUGfYl8TL38p0E', 
                                  'Content-Type': 'application/json'
                                },
                                data : obj1
                              };
                            axios(configLead)
                            .then(response => {
                                if(response && response.status == 200 &&  response.data && response.data.code === 200){
                                    this.setState({                                        
                                        msgModal: true,
                                        loader: false,
                                        errMsg: "Thank you for sharing your contact information. Our representative will get in touch with you shortly.",
                                    })
                                }
                                if(response && response.data && response.data.code === 202){
                                    this.setState({
                                        loader: false,
                                        msgModal: true,
                                        errMsg: "Email already registered!",
                                    })
                                }
                            })
                            .catch(error => {
                                console.log(error);
                                console.log(error.response);
                                // if (error.response.status === 500) {
                                this.setState({
                                    loader: false,
                                    msgModal: true,
                                    errMsg: "Something bad happened"
                                });
                
                                // }
                            });
                        })


                    }
                   
                })

        // axios.post(configurations.agentURL + '/agentlogin/addUser', JSON.parse(JSON.stringify(obj1)))
        //     .then(response => {
        //         if (response.data.code === 200) {
        //             this.setState({
        //                 loader: false,
        //                 // msgModal: false,
        //                 // errMsg: "Data save successfully!",
        //             });
        //         } else if (response.data.code === 202) {
        //             this.setState({
        //                 loader: false,
        //                 // msgModal: false,
        //                 // errMsg: "Data already registered!",
        //             });
        //         }
        //         else {
        //             this.setState({
        //                 loader: false,
        //                 // msgModal: false,
        //                 // errMsg: "Internal server error",
        //             })
        //         }
        //     })
       
      

        // axios.post(configurations.agentURL + '/agentlogin/addUser', JSON.parse(JSON.stringify(obj1)))
        //     .then(response => {})
        //     .catch(error => {
        //         console.log(error);
        //         console.log(error.response);
        //         // if (error.response.status === 500) {

        //         this.setState({
        //             loader: false,
        //             // showCommonErrorModal: true,
        //         });
        //         // }
        //     });


    }

    backPage = () => {
        sessionStorage.removeItem("MAX_AMT")
        sessionStorage.removeItem("MIN_AMT")
        // this.props.history.replace("/")
        this.props.backPage()
    }

    popupOk = () => {
        this.setState({
            msgModal: false,
            // viewProgramModal: false
        })

        this.props.submitData()

    }

    closeViewProgramModal = () => {
        this.setState({
            msgModal: false,
            viewProgramModal: false
        })
    }
    openProgramBrochure = (url) => {
        // console.log("url---",url,typeof(this.props.clientId))
        // if(this.props.clientId == 6548){
        window.open(url)
        // }

    }
    openViewProgramModal = () => {

        let STATE_PARAM = JSON.parse(sessionStorage.getItem('STATE_PARAM'));//cookies.get('STATE_PARAM', false);

        let obj = planConfig.find(obj => obj.CLIENT_ID.toString() === this.props.clientId.toString())
        console.log("obj.iframeURL---", obj.iframeURL, typeof (this.props.clientId))
        this.setState({
            viewProgramModal: true,
            iframeURL: obj.iframeURL,
            // 'https://www.universalhealthfellowship.org/uhs-standard-program-grid/',
            loader: true
        })
    }

    render() {
        return (
            <div className="main_page_wrap">
                {this.state.loader ? <Loader /> : null}
                <div className="web_container">

                    <Header />

                    <div className="contentWrapper">
                        <div className="row">
                            {/* <div className="col-md-6">  
                                <h4>You're Only 1 Step Away!</h4>
                                <p className="p_tag">Watch the video below.</p>
                                <video className='video_tag'>

                                </video>
                                
                        </div> */}

                            <div className="col-md-12">
                                {/* as per new reqirement */}
                                <div className="row">
                                    <div className='col-md-6'>
                                        <h4 style={{ color: '#162242' }}>Here's your quick estimate!</h4>
                                        {
                                            this.props.fromAgent ?
                                                <>
                                                    <p className="p_tag">Based on the simple information you've provided so far,
                                                        here's an estimate of your monthly sharing program amount. We offer many different health
                                                        sharing programs, as well as optional features. This means you can easily choose the program
                                                        that best fits your monthly budget.

                                                    </p>
                                                    <h6 style={{ fontSize: '24px' }}>Your monthly contributions could range from <p className="amountText">${this.props.minAmount} <span style={{ color: '#212529' }}> to </span> ${this.props.maxAmount}</p></h6>

                                                </>
                                                :
                                                <>
                                                    <p className="p_tag">
                                                        Based on the simple information you've provided so far,
                                                        here's your estimate of your monthly sharing program amount
                                                    </p>

                                                    <h6 style={{ fontSize: '24px' }}>Your monthly contributions could be from <p className="amountText">${this.props.minAmount} <span style={{ color: '#212529' }}>to </span> ${this.props.maxAmount}</p></h6>
                                                </>
                                        }


                                        <div className='button_tag'>
                                            <div className="">
                                                <NextButton color="primary" aria-label="add" type="submit" style={{ width: '280px', marginBottom: '25px', marginRight: '15px' }} onClick={this.backPage}>Get another estimate</NextButton>


                                                {/* <NextButton color="primary" aria-label="add" type="submit" style={{ width: '230px', marginBottom: '15px' }} onClick={this.openViewProgramModal} >View Programs</NextButton> */}
                                                {
                                                    this.props.clientId == 6548 || this.props.clientId == 4367 || this.props.clientId == 5540 || this.props.clientId == 4376 || this.props.clientId == 5541 || this.props.clientId == 4377 || this.props.clientId == 5558 || this.props.clientId == 4386?
                                                        <>
                                                            {/* <NextButton color="primary" aria-label="add" type="submit" style={{ width: '280px', marginBottom: '15px',marginRight: '15px' }} onClick={this.openViewProgramModal} >View Programs</NextButton>
                                                            <NextButton color="primary" aria-label="add" type="submit" style={{ width: '280px', marginBottom: '15px', marginRight: '15px' }} hidden={this.props.clientId === 4350} onClick={() => this.setState({ smartShareModel: true })} >View SmartShare Programs</NextButton>
                                                            <NextButton color="primary" aria-label="add" type="submit" style={{ width: '280px', marginBottom: '15px' }} hidden={this.props.clientId === 4350} onClick={() => this.setState({ ACSMModal: true })} >Check out our ACSM Value Add</NextButton> */}

                                                            <div style={{ paddingLeft: '15px', cursor: 'pointer' }} onClick={() => this.openProgramBrochure("https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-Healthy-Life-Program-Household-Brochure.pdf")} >Sharing Program Brochure <img src={require("../Assets/Images/Download.png")} className="welcome_download_logo" /></div>



                                                        </>
                                                        :

                                                        <div style={{ paddingLeft: '15px', cursor: 'pointer' }} onClick={() => this.openProgramBrochure("https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-Sharing-Program-Brochure.pdf")} >Sharing Program Brochure <img src={require("../Assets/Images/Download.png")} className="welcome_download_logo" /></div>

                                                    // this.props.clientId != 5541 && this.props.clientId != 4377 ?
                                                    //     <>
                                                    //         <NextButton color="primary" aria-label="add" type="submit" style={{ width: '280px', marginBottom: '15px', marginRight: '15px' }} onClick={this.openViewProgramModal} >View Programs</NextButton>
                                                    //         <NextButton color="primary" aria-label="add" type="submit" style={{ width: '280px', marginBottom: '15px' }} onClick={()=>this.setState({ easyShareModal: true })} >View EasyShare Programs</NextButton>
                                                    //     </>


                                                    //     :

                                                    // <NextButton color="primary" aria-label="add" type="submit" style={{ width: '280px', marginBottom: '15px' }} onClick={this.openViewProgramModal} >View Programs</NextButton>



                                                }

                                            </div>
                                        </div>

                                    </div>

                                    <div className='col-md-6'>

                                        <div className='frameBackground'>

                                            <p className="p_tag">
                                                Please share your contact information to have a representative
                                                call you directly. We can't wait to get to know you and have you join
                                                the netWell community.
                                            </p>



                                            <div className='form_tag'>
                                                <form>
                                                    <div className="row">
                                                        <div className="col-md-4">
                                                            <b>Your contact details</b>
                                                        </div>

                                                    </div>


                                                    <div className="row">
                                                        <div className="col-md-5">

                                                            <Sample setChild={this.setUserValue.bind(this)}
                                                                reqFlag={true} name={'firstname'} label={'Your first name'}
                                                                value={this.state.fname} disable={false}
                                                                style={{ marginBottom: '20px', width: '100%' }} length={25}
                                                                fieldType={'text'} errMsg={'Enter valid first name'}
                                                                //   helperMsg={'First name required'} 
                                                                parentDetails={{ name: 'firstname' }}></Sample>

                                                        </div>

                                                        <div className="col-md-5">

                                                            <Sample setChild={this.setUserValue.bind(this)} reqFlag={true}
                                                                name={'lastname'} label={'Your last name'} value={this.state.lname}
                                                                disable={false} style={{ marginBottom: '20px', width: '100%' }} length={25}
                                                                fieldType={'text'} errMsg={'Enter valid last name'}
                                                                parentDetails={{ name: 'lastname' }}></Sample>

                                                        </div>

                                                    </div>




                                                    <div className="row">
                                                        <div className="col-md-5">
                                                            <Sample
                                                                setChild={this.setUserValue.bind(this)}
                                                                reqFlag={true} name={'email'}
                                                                label={'Your email address'} value={this.state.email} disable={false}
                                                                style={{ marginBottom: '20px', width: '100%' }} length={50} fieldType={'email'}
                                                                errMsg={'Enter valid email Id'} parentDetails={{ name: 'email' }} />

                                                        </div>

                                                        <div className="col-md-5">
                                                            <Sample
                                                                setChild={this.setUserValue.bind(this)}
                                                                reqFlag={false} name={'phone'} label={'Your phone number'} value={this.state.phone}
                                                                disable={false} style={{ marginBottom: '20px', width: '100%' }} length={10}
                                                                fieldType={'phone'} errMsg={'Enter valid mobile no.'}
                                                                parentDetails={{ name: 'phone' }} />

                                                        </div>

                                                    </div>




                                                </form>
                                                <div className="submitBtn">
                                                    <NextButton color="primary" disabled={this.state.disableSubmit} aria-label="add" type="submit" onClick={this.submitData}>Submit</NextButton>

                                                </div>
                                            </div>
                                        </div>


                                        <div className='frameBackground_Agent'>
                                            <p className="p_tag" style={{ marginBottom: '5px' }}>
                                                You can also call the number below if you wish to speak
                                                directly to UHF representative and start saving immediately.

                                            </p>

                                            <p className="callAgent">Call <b>{JSON.parse(sessionStorage.getItem("STATE_PARAM")).agentName}</b>  <b> : {JSON.parse(sessionStorage.getItem("STATE_PARAM")).agentPhone}</b></p>

                                        </div>




                                    </div>


                                </div>

                            </div>

                        </div>
                    </div>

                    <ChattButtonText show={true} fromAgent={this.props.fromAgent} />


                </div>

                {/* <div className="footerBackColor"><Footer /></div> */}



                {/*=================================== Message Model ======================================*/}
                <Modal className="msgModalWrapper" size="md" show={this.state.msgModal} onHide={(event) => this.setState({ msgModal: false })} backdrop='static' centered>
                    <Modal.Header >
                        <Modal.Title>Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '15px' }}>
                        {
                            this.state.loaderShow && <Loader></Loader>
                        }
                        <div className="popupMsgWrapper">
                            <p className="text-center">{this.state.errMsg}</p>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <button type="button" className="btn btn-ok" onClick={this.popupOk}>DONE</button>
                    </Modal.Footer>
                </Modal>

                {/*=================================== View Program Modal ======================================*/}
                <Modal className="msgModalWrapper" size="xl" show={this.state.viewProgramModal} onHide={(event) => this.setState({ viewProgramModal: false })} backdrop='static' centered>
                    <Modal.Header closeButton>

                        <Modal.Title>View Programs</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '0' }}>
                        <iframe style={{ height: '430px', width: '100%' }} onLoad={() => this.setState({ loader: false })} src={this.state.iframeURL}></iframe>
                    </Modal.Body>
                    <Modal.Footer>
                        <CustomButton type="button" className="btn btn-ok" onClick={this.closeViewProgramModal}>DONE</CustomButton>
                    </Modal.Footer>
                </Modal>

                {/*================================ smart share modal ==========================*/}
                <Modal size="lg" show={this.state.smartShareModel} onHide={(event) => { this.setState({ smartShareModel: false }) }} backdrop="static">
                    <Modal.Header style={styles.modal_header} closeButton>
                        <Modal.Title>UHS SmartShare</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '0px' }}>
                        {
                            this.state.loaderShow && <Loader></Loader>
                        }
                        <iframe style={{ height: '430px', width: '100%' }} onLoad={() => this.setState({ loaderShow: false })} src={'https://www.universalhealthfellowship.org/uhs-smartshare-program-grid/'}></iframe>

                    </Modal.Body>
                    <Modal.Footer>
                        <CustomButton onClick={(event) => { this.setState({ smartShareModel: false }) }}>DONE</CustomButton>
                    </Modal.Footer>
                </Modal>

                {/* -------------------------------Easy share Modal------------------------------------ */}

                <Modal size="xl" show={this.state.easyShareModal} onHide={(event) => { this.setState({ easyShareModal: false }) }} backdrop="static">
                    <Modal.Header style={styles.modal_header} closeButton>
                        <Modal.Title>UHS EasyShare</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '0px' }}>
                        {
                            this.state.loader && <Loader></Loader>
                        }
                        <iframe style={{ height: '430px', width: '100%' }} onLoad={() => this.setState({ loader: false })} src={'https://www.universalhealthfellowship.org/uhs-easyshare-program-grid/'}></iframe>

                    </Modal.Body>
                    <Modal.Footer>
                        <CustomButton onClick={(event) => { this.setState({ easyShareModal: false }) }}>DONE</CustomButton>
                    </Modal.Footer>
                </Modal>



                {/* --------------------------------ACSM Modal ------------------------------------------------- */}

                <Modal size="lg" show={this.state.ACSMModal} onHide={() => { this.setState({ ACSMModal: false }) }} backdrop="static">
                    <Modal.Header style={styles.modal_header} closeButton>
                        <Modal.Title>Annual Co-Share Maximum</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '15px', textAlign: 'justify', overflowX: 'hidden', fontfamily: 'Roboto, Arial, Helvetica, sans-serif' }}>
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }
                        <span style={{ fontSize: '13px', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}>If you choose this option, 100% of your Eligible Medical Expenses become sharable when your Annual Co-Share Maximum (ACSM)
                            has been met. The ACSM differs for each program. Also, the Preventive Care is increased to $1,000 per member per year
                            (subject to a 90-day waiting period). Check the box for the ACSM option and you can view the difference in monthly contribution
                            amounts for each program.
                        </span>

                        <Table aria-label="customized table1" style={styles.tableACSM}>
                            <TableHead style={{ backgroundColor: '#420045', position: 'sticky' }}>
                                <TableRow style={{ position: 'sticky' }}>
                                    <StyledTableCell1 padding='checkbox' align='center' style={styles.tableHead1ACSM} >
                                        Program Name
                                    </StyledTableCell1>
                                    {
                                        this.props.headerData.length - 1 === 7 ?
                                            this.state.ACSMPlanAll.map((option, index) => (
                                                <StyledTableCell1 style={styles.tableHead2ACSM} align='center' key={index} value={option.id}>
                                                    {option}
                                                </StyledTableCell1>

                                            ))
                                            :
                                            this.state.ACSMPlan.map((option, index) => (
                                                <StyledTableCell1 style={styles.tableHead2ACSM} align='center' key={index} value={option.id}>
                                                    {option}
                                                </StyledTableCell1>

                                            ))

                                    }
                                </TableRow>
                            </TableHead>

                            <TableBody >
                                <StyledTableRow align='center' style={styles.rowHead} >
                                    <StyledTableCell1 align="center" style={styles.tableRowHeadACSM} >
                                        Annual Out-of-Pocket
                                    </StyledTableCell1>
                                    <StyledTableCell1 align="center" colSpan={6} style={styles.tableRowHead2ACSM} >
                                        Annual Co-Share Maximum Amounts
                                    </StyledTableCell1>
                                </StyledTableRow>
                                {
                                    this.props.headerData.length - 1 === 7 ?
                                        ACSMrowUhsAll.map((row, index) => (

                                            <StyledTableRow align="left" style={{ backgroundColor: 'rgb(234, 232, 219)', border: '2px solid #ffffff' }} key={index}>
                                                <StyledTableCell component="th" scope="row" style={styles.cellTitle}>
                                                    {row.NAME}
                                                </StyledTableCell>
                                                <StyledTableCell align="center" style={styles.cellChild}  >{row.UHS1}</StyledTableCell>
                                                <StyledTableCell align="center" style={styles.cellChild} >{row.UHS2}</StyledTableCell>
                                                <StyledTableCell align="center" style={styles.cellChild}>{row.UHS3}</StyledTableCell>
                                                <StyledTableCell align="center" style={styles.cellChild} >{row.UHS4}</StyledTableCell>
                                                <StyledTableCell align="center" style={styles.cellChild} >{row.UHS5}</StyledTableCell>
                                                <StyledTableCell align="center" style={styles.cellChild} >{row.UHS6}</StyledTableCell>
                                            </StyledTableRow>
                                        )) :
                                        ACSMrowUhs.map((row, index) => (

                                            <StyledTableRow align="center" style={{ backgroundColor: 'rgb(234, 232, 219)', border: '2px solid #ffffff' }} key={index}>
                                                <StyledTableCell component="th" scope="row" style={styles.cellTitle}>{row.NAME}</StyledTableCell>
                                                <StyledTableCell align="center" style={styles.cellChild} >{row.UHS1}</StyledTableCell>
                                                <StyledTableCell align="center" style={styles.cellChild} >{row.UHS2}</StyledTableCell>
                                                <StyledTableCell align="center" style={styles.cellChild} >{row.UHS3}</StyledTableCell>
                                            </StyledTableRow>
                                        ))
                                }


                            </TableBody>

                        </Table>
                        <span style={{ fontSize: '13px', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}>
                            The amounts shown above are Co-Share Maximum amounts in effect as of 10/01/2020. Annual Co-Share Maximum amounts are subject
                            to adjustment from time to time. Always remember to check the Universal HealthShare Member Portal for the most current version
                            of the Sharing Guidelines, which may reflect changes that have been made since the date of the last copy you reviewed.
                            This option is only available at the time of enrollment, or at the time of annual program renewal.
                        </span>
                    </Modal.Body>
                    <Modal.Footer>
                        <CustomButton onClick={() => { this.setState({ ACSMModal: false }) }}>DONE</CustomButton>
                    </Modal.Footer>
                </Modal>


            </div>

        )
    }
}

