import React,{Component} from 'react';
import Grid from '@material-ui/core/Grid';
import styles from '../../../Assets/CSS/stylesheet_UHS';
import  Sample from '../../CommonScreens/sampleTextField';
import Fab from "@material-ui/core/Fab";
import { withStyles} from '@material-ui/core/styles';
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import ForumIcon from '@material-ui/icons/Forum';
import CommonTable from "../../CommonScreens/commonTable";
import { Modal } from 'react-bootstrap';
import Loader from '../../loader';
import Header from '../Headers/Header';
import CommonGrid from '../../CommonScreens/CommonGrid';
import UhsGrid from "../../CommonScreens/UhsGrid";
import Configuration from "../../../configurations";
import PbGrid from "../../CommonScreens/pbGrid";
import { Link } from 'react-router-dom';
import Modal1 from '@material-ui/core/Modal';
import Cookies from 'universal-cookie';
import Paper from '@material-ui/core/Paper'
import customStyle from "../../../Assets/CSS/stylesheet_UHS";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import i18n from "../../../i18next";
import axios from 'axios';
import configurations from "../../../configurations";
import planConfig from "../../../planConfig";
const CrudButton = withStyles(
    styles.crudBtn,
)(Fab);

const ProceedButton = withStyles(
    styles.proceedBtn
)(Button);

const ViewButton = withStyles(
    styles.viewBtn
)(Button);

const CustomButton = withStyles(
    styles.viewBtn
)(Button);

const StyledTableCell = withStyles(theme => (customStyle.tableCell))(TableCell);
const StyledTableCell1 = withStyles(theme => (customStyle.tableCell1))(TableCell);

const StyledTableRow = withStyles(theme => (customStyle.tableRow))(TableRow);

function createData1(NAME, UHS1, UHS2, UHS3, UHS4,UHS5,UHS6) {
    return { NAME, UHS1, UHS2, UHS3, UHS4,UHS5,UHS6 };
}

const ACSMrowUhsAll=[
    createData1('One Member per Household	', '$3,000', '$4,500', '$7,500', '$10,500','$15,000','$18,000'),
    createData1('Two Members per Household	', '$6,000', '$9,000','$15,000','$21,000','$30,000','$36,000'),
    createData1('Three or more Members per Household	', '$9,000','$13,500	','$22,500','$31,500','$45,000','$54,000'),
];

const ACSMrowUhs=[
    createData1('One Member per Household	',  '$4,500',  '$10,500','$18,000'),
    createData1('Two Members per Household	',  '$9,000','$21,000','$36,000'),
    createData1('Three or more Members per Household	', '$13,500	','$31,500','$54,000')
];

const cookies = new Cookies();

export default class QuickQuote2 extends Component{
    constructor(props) {
        super(props);
        this.state={
            headerData:[],
            quoteData:[],
            tooltipData:[],
            otherFees:[],
            modalShow:false,
            stateParam: {
                clientId : null
            },
            customerServiceNo : '',
            cid:null,
            STATE_PARAM : JSON.parse(sessionStorage.getItem('STATE_PARAM')), //cookies.get('STATE_PARAM', false),
            isAgent : false,
            ACSMPlanAll:['UHS1','UHS2','UHS3','UHS4','UHS5','UHS6'],
            ACSMPlan:['UHS2','UHS4','UHS6'],
            smartShareModel : false,
            ACSMModal : false,
            mailModal : false,
            email : '',
            msgModal : false,
            errMsg : '',
            confirmationModal : false,
            easyShareModal : false,
            ACSMFlag : false,
            iframeURL : '',
            erollModal : false,
            agentDetails:{},
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        let STATE_PARAM = JSON.parse(sessionStorage.getItem('STATE_PARAM')); //cookies.get('STATE_PARAM', false);
        this.state.stateParam.clientId = STATE_PARAM.clientId.toString();
        if(this.props.history.location.pathname === '/quick_quote2'){
            let acsmFlag = false;
            if(this.state.stateParam.clientId === '4350' || this.state.stateParam.clientId === '6548' || this.state.stateParam.clientId === '4367'
            || this.state.stateParam.clientId === '5540' || this.state.stateParam.clientId === '4376' 
            || this.state.stateParam.clientId === '5541' || this.state.stateParam.clientId === '4377'
            || this.state.stateParam.clientId === '5558' || this.state.stateParam.clientId === '4386'
            ){
                acsmFlag = false
            } else {
                acsmFlag = true
            }
            
            this.setState({
                headerData :  this.props.history.location.state.header,
                quoteData:this.props.history.location.state.quote,
                tooltipData:this.props.history.location.state.shareableTooltip,
                otherFees:this.props.history.location.state.otherFees,
                customerServiceNo : this.props.history.location.state.customerServiceNo,
                isAgent : this.props.history.location.state.isAgent,
                ACSMFlag : acsmFlag
            })
        } else {
            this.props.history.push("/quick_quote" + this.props.history.location.hash);
        }

        if(STATE_PARAM && STATE_PARAM.brokerId){
            axios.get(configurations.agentURL + '/agentlogin/getAgentById/' + STATE_PARAM.brokerId)
            .then(response => {
                console.log("===RESPONSE===", response.data.response);
                this.setState({
                    agentDetails: response.data.response
                })
            });
        }
    }

    enrollMe = () => {
        sessionStorage.removeItem('CHAT_BOX_Id');
        sessionStorage.removeItem('CLIENT_ID');
        if(this.state.isAgent){
            this.props.history.replace("/");
        } else {
            this.props.history.replace("/signup" + this.props.history.location.hash);
        }
    }

    setModel(){
        let STATE_PARAM = JSON.parse(sessionStorage.getItem('STATE_PARAM'));//cookies.get('STATE_PARAM', false);
        if(STATE_PARAM && STATE_PARAM.clientId){
            this.state.stateParam.clientId = STATE_PARAM.clientId.toString();
        } else {
            this.state.stateParam.clientId = Configuration.clientId.toString();
        }
        let obj = planConfig.find(obj => obj.CLIENT_ID.toString() === this.state.stateParam.clientId.toString())

        this.setState({
            iframeURL : obj.iframeURL,
            modalShow : true,
            loaderShow : true
        })
    }

    handleBack = () =>{
        sessionStorage.removeItem('CHAT_BOX_Id');
        this.props.history.replace("/quick_quote"+this.props.history.location.hash);
    }

    handleSentMail = (val,itemValid,parentDetails) =>{
        
        if(this.state.isAgent && this.state.STATE_PARAM.user_subId ){
            this.setState({
                email : this.state.STATE_PARAM.user_subId,
                confirmationModal : true
            });
        } else {
            this.setState({
                mailModal : true,
                email : ''
            });
        }
    }

    handleEnrollModal = () =>{
        if(this.state.isAgent){
            sessionStorage.removeItem('CHAT_BOX_Id');
            sessionStorage.removeItem('CLIENT_ID');
            this.props.history.replace("/");
        } else {
            this.setState({  
                erollModal: true,
            });
        }
    }

    getValue = (val, iteamValid, parentDet) =>{
        if(iteamValid){
            this.state.email = val
        } else {
            this.state.email = '';
        }
        this.setState({
            refresh : true
        });
    }

    sendQuoteMail = () =>{
        this.setState({
            loaderShow : true,
            mailModal : false,
            confirmationModal : false
        });

        let QUOTE_EMAIL = JSON.parse(sessionStorage.getItem('QUOTE_EMAIL'));
        axios.post(configurations.baseUrl + '/plan/sendQuickQuoteMail/'+ this.state.email +'/' + this.state.STATE_PARAM.clientId  +'/' + this.state.STATE_PARAM.brokerId + '/' + this.state.isAgent , QUOTE_EMAIL+'/Netwell')
            .then(response => {
                if (response.data.code === 200) {
                    this.setState({
                        msgModal: true,
                        loaderShow: false,
                        errMsg: 'Quote email sent successfully!',
                        email : ''
                    });
                } else {
                    this.setState({
                        msgModal: true,
                        loaderShow: false,
                        errMsg: 'Internal Server Error',
                        email : ''
                    });
                }
            });
    }

    render() {
        console.log(this.state.stateParam.clientId);
        return(
            <div>
                 <Header></Header>
                {
                    this.state.loaderShow ? <Loader></Loader> : ''
                }
              

                            <div style={{marginTop: '30px', paddingRight : '21px', paddingLeft: '21px', paddingBottom: '21px'}}>{/* style={styles.ComponentContainer} */}
                                <div style={{width:'100%', backgroundColor:'#ffffff',paddingLeft:'10px'}}>
                                    
                                    <Grid xs={12} style={styles.QuickQt2TopWrp} item={true}>
                                        <span style={styles.QuickQtTopRightText1}>Here’s your quick quote!</span>
                                        <span style={styles.QuickQtTopRightText2}>
                                        Based on the simple information you’ve provided so far, here’s your quick quote – a non-binding estimate of what your health sharing program costs could be.
                        Click  <span style={{fontWeight:'bold',fontSize:'14px'}}>VIEW PROGRAMS</span>  below to see much more detail about what each program includes, and to decide which program is best for you.

                                </span>
                                    </Grid>


                                    <Grid container >
                    <Grid xs={12} style={{paddingLeft:'10px',paddingRight:'25px',tableLayout:'fixed',paddingBottom:'15px'}} item={true}>
                    <div style={{ overflowX: "auto" }} >
                        <CommonTable quoteData={this.state.quoteData} check={true} headerData={this.state.headerData} tooltip={this.state.tooltipData} quickQuote={true} totalReq={true} ACSM={this.state.ACSMFlag} />
                    </div>
                    </Grid>
                    

                    </Grid>




                    <Grid container justify='space-between'>
                        <Grid item xs={12} sm={7} style={{marginLeft:'1%',marginBottom:'10px',paddingRight:'17px',textAlign:'justify'}}>
                        <span style={styles.QuickQt2EnrollText}>
                        Do you want to join? Click the &nbsp;
                        <span style={{fontWeight:'bold'}}>ENROLL</span> button below to begin. We’ll need to ask you for more detailed information, we’ll give you a binding estimate that’s good for 30 days (in case you want more time to decide), we’ll confirm that you and any family members you include are eligible for the program, you can select your desired start date, 
                        and once you’ve finished we’ll send your information in for processing (that usually takes no more than one business day).
                       
                        </span>

                        <div>
                            <span style={styles.QuickQt2EnrollText1}>
                                IMPORTANT!

                            </span>
                            </div>
                            <div>
                            <span style={styles.QuickQt2EnrollText}>
                                
                                Before you continue, we want to remind you that Universal HealthShare programs are health care cost sharing programs. They are NOT insurance plans. They are fundamentally different from health insurance. For more information, please visit :
                                    <a href="https://www.universalhealthfellowship.org/sharing-vs-insurance/" target="_blank" style={{color:'#533278',fontWeight:'bold', paddingLeft : '3px'}}>
                                        www.universalhealthfellowship.org/ sharing-vs-insurance/
                                        </a>

                            </span> 
                            </div>
                       
                        </Grid>

                        <Grid item xs={12} sm={4} style={{paddingRight:'26px'}}>
                        <span style={styles.QuickQt2FeesTxt}>
                        Other applicable fees across all programs
                        </span>
                        {
                                this.state.otherFees && this.state.otherFees.map((key,index)=>{
                                    return(
                                        <div style={styles.QuickQt2FeesChild1Wrp1Mob} key={index}>
                                            <span style={styles.QuickQt2FeesTxt1}>{key.key}</span>
                                            <span style={styles.QuickQt2FeesTxt2}>{key.value}</span>
                                        </div>
                                    )
                                })
                            }
                        </Grid>

                    </Grid>
                                    <Grid container alignItems="stretch" style={{marginTop:'1%'}}>
                                        {
                                            (this.state.STATE_PARAM.clientId.toString() !== '6548' 
                                            && this.state.STATE_PARAM.clientId.toString() !== '4367' 
                                            && this.state.STATE_PARAM.clientId.toString() !== '5540' 
                                            && this.state.STATE_PARAM.clientId.toString() !== '4376' 
                                            && this.state.STATE_PARAM.clientId.toString() !== '5541' 
                                            && this.state.STATE_PARAM.clientId.toString() !== '4377'
                                            && this.state.STATE_PARAM.clientId.toString() !== '5558'
                                            && this.state.STATE_PARAM.clientId.toString() !== '4386'
                                            ) ?
                                                <Grid item xs={12} md={12}>
                                                    <Grid item xs={10} sm={12} md={4} lg={4} style={{marginLeft:'1%', display : 'inline-block'}}>
                                                        <ViewButton
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={()=>this.setModel()}
                                                            style={{width: '100%', marginRight: '20px',marginBottom:'10px'}}
                                                        >View All UHS Standard Programs</ViewButton>
                                                    </Grid>
                                                    <Grid item xs={10} sm={12} md={4} lg={4} style={{marginLeft:'1%', display : 'inline-block'}}>
                                                        <ViewButton
                                                            variant="contained"
                                                            color="primary"
                                                            hidden={this.state.clientId === "4350"}
                                                            onClick={() => {this.setState({smartShareModel : true, loaderShow : true})}}
                                                            style={{width: '100%',marginRight: '20px',marginBottom:'10px'}}
                                                        >View UHS SmartShare Programs</ViewButton>
                                                    </Grid>
                                                    <Grid item xs={10} sm={12} md={3} lg={3} style={{marginLeft:'1%', display : 'inline-block'}}>
                                                        <ViewButton
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => {this.setState({ACSMModal : true})}}
                                                            hidden={this.state.clientId === "4350"}
                                                            style={{width: '100%',marginRight: '20px',marginBottom:'10px'}}
                                                        >Check out our ACSM Value Add</ViewButton>
                                                    </Grid>
                                                </Grid>
                                                :
												 (this.state.STATE_PARAM.clientId.toString() !== '5541' && this.state.STATE_PARAM.clientId.toString() !== '4377' && this.state.STATE_PARAM.clientId.toString() !== '5558' && this.state.STATE_PARAM.clientId.toString() !== '4386' )?
                                                <Grid item xs={12} md={12}>
                                                    <Grid item xs={10} sm={12} md={4} lg={4} style={{marginLeft:'1%', display : 'inline-block'}}>
                                                        <ViewButton
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={()=>this.setModel()}
                                                            style={{width: '100%', marginRight: '20px',marginBottom:'10px'}}
                                                        >View All Healthy Life(HL) Programs</ViewButton>
                                                    </Grid>
                                                    <Grid item xs={10} sm={12} md={4} lg={4} style={{marginLeft:'1%', display : 'inline-block'}}>
                                                        <ViewButton
                                                            variant="contained"
                                                            color="primary"
                                                            onClick={() => {this.setState({easyShareModal : true, loaderShow : true})}}
                                                            style={{width: '100%',marginRight: '20px',marginBottom:'10px'}}
                                                        >View EasyShare(ES) Programs</ViewButton>
                                                    </Grid>
                                                </Grid>
												:
                                                (this.state.STATE_PARAM.clientId.toString() === '5558' || this.state.STATE_PARAM.clientId.toString() === '4386') ?
                                    <>
                                    <Grid container spacing={2} style={{marginBottom: '10px'}}>
                                        <Grid item xs={12} sm={4}>
                                            <ViewButton
                                                variant="contained"
                                                color="primary"
                                                onClick={()=>this.setModel()}
                                                style={{width: '100%'}}
                                            >View All Healthy Life National (HLN) Programs</ViewButton>
                                        </Grid>
                                        </Grid>
                                        </>
                                        :
												<Grid item xs={12} md={12}>
                                                <Grid item xs={10} sm={12} md={4} lg={4} style={{marginLeft:'1%', display : 'inline-block'}}>
                                                    <ViewButton
                                                        variant="contained"
                                                        color="primary"
                                                        onClick={()=>this.setModel()}
                                                        style={{width: '100%', marginRight: '20px',marginBottom:'10px'}}
                                                    >View all Community HealthShare Programs</ViewButton>
                                                </Grid>
                                               
                                            </Grid>
                                        }
                                    </Grid>
                    <Grid container justify='space-between' style={{marginTop:'2%'}}>
                        <Grid item xs={12} sm={6}  style={{marginLeft:'1%'}}>
                                <ProceedButton
                                    variant="contained"
                                    color="primary"
                                    style={{width: '120px', height: '40px', marginRight: '20px',marginBottom:'10px'}}
                                    onClick={()=> this.handleBack()}>
                                    BACK
                                </ProceedButton>
                                <ProceedButton
                                    variant="contained"
                                    color="primary"
                                    style={{width: '150px', marginRight: '20px',marginBottom:'10px'}}
                                    onClick={() => this.handleSentMail()}>
                                    SEND QUOTE
                                </ProceedButton>
                                {/* <ProceedButton
                                    variant="contained"
                                    color="primary"
                                    onClick={this.enrollMe}
                                    style={{width: '126px', height: '40px',marginBottom:'10px'}}
                                >ENROLL</ProceedButton> */}
                                <ProceedButton
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleEnrollModal}
                                    style={{width: '175px', height: '40px',marginBottom:'10px'}}
                                >{this.state.isAgent ? "ENROLL" : "CALL TO ENROLL"}</ProceedButton>
                        </Grid>
                        <Grid item xs={12} sm={5} hidden={this.state.isAgent}>
                            <Grid container direction="row" justify="flex-end">
                                <CrudButton color="primary" aria-label="add" className={''} style={styles.QuickChatBtnMob}>
                                    <ForumIcon />
                                </CrudButton>
                            </Grid>
                            <Grid container direction="row" justify="flex-end">
                                <span style={styles.QuickQtHelpTxtNeed}>Need Help?</span>
                                <Grid container direction="row" justify="flex-end">
                                    <span style={styles.QuickQtHelpTxt2Help}>Talk to a Universal HealthShare representative by calling {this.state.customerServiceNo}.</span>
                                </Grid>
                            </Grid>
                    </Grid>

                    </Grid>
                    
                        <Modal size="xl" show={this.state.modalShow} centered onHide={(event) => this.setState({modalShow:false,loaderShow : false})}>
                            <Modal.Header style={styles.modal_header} closeButton>
                                <Modal.Title>View Programs</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ padding: '0' }}>
                                {
                                    this.state.loaderShow ? <Loader></Loader> : ''
                                }
                                {/*<iframe style={{ height: '450px', width: '100%' }}  onLoad={()=>this.setState({loaderShow:false})}  src={"http://localhost:3000/?clientId=" + this.state.stateParam.clientId +"&checkboxReq=false"} />*/}

                                {
                                    <iframe style={{ height: '430px', width: '100%' }}  onLoad={()=>this.setState({loaderShow:false})}  src={this.state.iframeURL}></iframe>
                                }

                            </Modal.Body>
                            <Modal.Footer>
                                <CustomButton onClick={() => this.setState({modalShow:false, loaderShow : false})}>Done</CustomButton>
                            </Modal.Footer>
                        </Modal>

                                    {/* --------------------------------ACSM Modal ------------------------------------------------- */}

                                    <Modal size="lg" show={this.state.ACSMModal}  onHide={() => {this.setState({ACSMModal : false})}} backdrop="static">
                                        <Modal.Header style={customStyle.modal_header} closeButton>
                                            <Modal.Title>Annual Co-Share Maximum</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ padding: '15px' ,textAlign : 'justify', overflowX : 'hidden', fontfamily: 'Roboto, Arial, Helvetica, sans-serif'}}>
                                            {
                                                this.state.loaderShow ? <Loader></Loader> : ''
                                            }
                                            <span style={{fontSize:'13px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'}}>If you choose this option, 100% of your Eligible Medical Expenses become sharable when your Annual Co-Share Maximum (ACSM)
                                               has been met. The ACSM differs for each program. Also, the Preventive Care is increased to $1,000 per member per year
                                               (subject to a 90-day waiting period). Check the box for the ACSM option and you can view the difference in monthly contribution
                                               amounts for each program.
                                            </span>

                                            <Table aria-label="customized table1"  style={customStyle.tableACSM}>
                                                <TableHead style={{backgroundColor:'#420045',position: 'sticky'}}>
                                                    <TableRow style={{position: 'sticky'}}>
                                                        <StyledTableCell1 padding='checkbox' align='center' style={customStyle.tableHead1ACSM} >
                                                            Program Name
                                                        </StyledTableCell1>
                                                        {
                                                            this.state.headerData.length - 1 === 7 ?
                                                                this.state.ACSMPlanAll.map((option, index) => (
                                                                    <StyledTableCell1 style={customStyle.tableHead2ACSM}  align='center' key={index} value={option.id}>
                                                                        {option}
                                                                    </StyledTableCell1>

                                                                )) :
                                                                this.state.ACSMPlan.map((option, index) => (
                                                                    <StyledTableCell1 style={customStyle.tableHead2ACSM}  align='center' key={index} value={option.id}>
                                                                        {option}
                                                                    </StyledTableCell1>

                                                                ))

                                                        }
                                                    </TableRow>
                                                </TableHead>

                                                <TableBody >
                                                    <StyledTableRow align='center' style={customStyle.rowHead} >
                                                        <StyledTableCell1  align="center" style={customStyle.tableRowHeadACSM} >
                                                            Annual Out-of-Pocket
                                                        </StyledTableCell1>
                                                        <StyledTableCell1  align="center" colSpan={6} style={customStyle.tableRowHead2ACSM} >
                                                            Annual Co-Share Maximum Amounts
                                                        </StyledTableCell1>
                                                    </StyledTableRow>
                                                    {
                                                        this.state.headerData.length - 1 === 7 ?
                                                            ACSMrowUhsAll.map((row,index) => (

                                                                <StyledTableRow align="left" style={{backgroundColor:'rgb(234, 232, 219)',border : '2px solid #ffffff'}} key={index}>
                                                                    <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                                                                        {row.NAME}
                                                                    </StyledTableCell>
                                                                    <StyledTableCell align="center" style={customStyle.cellChild}  >{row.UHS1}</StyledTableCell>
                                                                    <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS2}</StyledTableCell>
                                                                    <StyledTableCell align="center" style={customStyle.cellChild}>{row.UHS3}</StyledTableCell>
                                                                    <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS4}</StyledTableCell>
                                                                    <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS5}</StyledTableCell>
                                                                    <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS6}</StyledTableCell>
                                                                </StyledTableRow>
                                                            )) :
                                                            ACSMrowUhs.map((row,index) => (

                                                                <StyledTableRow align="center" style={{backgroundColor:'rgb(234, 232, 219)',border : '2px solid #ffffff'}} key={index}>
                                                                    <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>{row.NAME}</StyledTableCell>
                                                                    <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS1}</StyledTableCell>
                                                                    <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS2}</StyledTableCell>
                                                                    <StyledTableCell align="center" style={customStyle.cellChild} >{row.UHS3}</StyledTableCell>
                                                                </StyledTableRow>
                                                            ))
                                                    }


                                                </TableBody>

                                            </Table>
                                            <span style={{fontSize:'13px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'}}>
                                                    The amounts shown above are Co-Share Maximum amounts in effect as of 10/01/2020. Annual Co-Share Maximum amounts are subject
                                                    to adjustment from time to time. Always remember to check the Universal HealthShare Member Portal for the most current version
                                                    of the Sharing Guidelines, which may reflect changes that have been made since the date of the last copy you reviewed.
                                                    This option is only available at the time of enrollment, or at the time of annual program renewal.
                                            </span>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <CustomButton  onClick={() => {this.setState({ACSMModal : false})}}>{i18n.t('BUTTON.DONE')}</CustomButton>
                                        </Modal.Footer>
                                    </Modal>

                                    {/*================================ smart share modal ==========================*/}
                                    <Modal size="lg" show={this.state.smartShareModel}  onHide={(event) => { this.setState({smartShareModel : false}) }} backdrop="static">
                                        <Modal.Header style={customStyle.modal_header} closeButton>
                                            <Modal.Title>UHS SmartShare</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ padding: '0px'}}>
                                            {
                                                this.state.loaderShow && <Loader></Loader>
                                            }
                                            <iframe style={{ height: '430px', width: '100%' }}  onLoad={()=>this.setState({loaderShow:false})}  src={'https://www.universalhealthfellowship.org/uhs-smartshare-program-grid/'}></iframe>

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <CustomButton  onClick={(event) => {this.setState({smartShareModel : false})}}>{i18n.t('BUTTON.DONE')}</CustomButton>
                                        </Modal.Footer>
                                    </Modal>

                                    {/*================================ mail modal ==========================*/}
                                    <Modal size="md" show={this.state.mailModal}  onHide={(event) => { this.setState({mailModal : false}) }} backdrop="static" centered>
                                        <Modal.Header style={customStyle.modal_header} closeButton>
                                            <Modal.Title>Email Confirmation</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ padding: '15px', margin : '5px'}}>
                                            {
                                                this.state.loaderShow && <Loader></Loader>
                                            }
                                            <div style={{flexGrow:1}}>
                                                <Grid container spacing={1}>
                                                    <Grid xs={12} sm={12} md={6} lg={12} style={{marginBottom : '5px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif', fontSize : '14px'}}>
                                                        <span>Please confirm email to send quote</span>
                                                    </Grid>
                                                    <Grid xs={12} sm={12} md={6} lg={12}>
                                                        <Sample setChild={this.getValue.bind(this)} name={'email'} label={'Email'} reqFlag={true} value={this.state.email} disable={false} style={customStyle.textFieldWrp} length={150}  fieldType={'email'} errMsg={'Enter valid email id'} helperMsg={'Email id required'}  parentDetails={{}}></Sample>
                                                    </Grid>
                                                </Grid>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <CustomButton disabled={this.state.email === ""} onClick={(event) => this.sendQuoteMail()}>SEND QUOTE EMAIL</CustomButton>
                                        </Modal.Footer>
                                    </Modal>

                                    {/*================================ Enroll modal ==========================*/}
                                    <Modal size="md" show={this.state.erollModal}  onHide={(event) => { this.setState({erollModal : false}) }} backdrop="static" centered>
                                        <Modal.Header style={customStyle.modal_header} closeButton>
                                            <Modal.Title>Call to Enroll</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ padding: '15px', margin : '5px'}}>                                            
                                            <div style={{flexGrow:1}}>
                                                <p>To join, simply call <b>{this.state.agentDetails.phone} (option 4)</b> and register with one of our trusted coaches who will walk you through the process.</p>
                                            </div>
                                        </Modal.Body>
                                        <Modal.Footer>
                                            <CustomButton onClick={(event) => { this.setState({erollModal : false}) }}>DONE</CustomButton>
                                        </Modal.Footer>
                                    </Modal>

                                    <Modal size="xs" show={this.state.msgModal} onHide={(event) => this.setState({msgModal:false,loaderShow : false, errMsg : ''})} backdrop="static" centered>
                                        <Modal.Header style={customStyle.modal_header} closeButton>
                                            <Modal.Title>Message</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ margin: '10px',textAlign:'center',fontFamily : 'Roboto, Arial, Helvetica, sans-serif' }}>
                                            {this.state.errMsg}
                                        </Modal.Body>
                                        <Modal.Footer style={{alignItems:'right'}}>
                                            <CustomButton style={{marginTop: '10px', width: '50px', height: '40px'}} onClick={()=>{this.setState({ msgModal : false,loaderShow : false, errMsg : ''})}}>Ok</CustomButton>
                                        </Modal.Footer>
                                    </Modal>

                                    <Modal size="xs" show={this.state.confirmationModal} backdrop="static" centered>
                                        <Modal.Header style={customStyle.modal_header}>
                                            <Modal.Title>Message</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ margin: '10px',textAlign:'center',fontFamily : 'Roboto, Arial, Helvetica, sans-serif' }}>
                                            The quote will be emailed to <b>{this.state.email}</b>. Confirm to proceed.
                                        </Modal.Body>
                                        <Modal.Footer style={{alignItems:'right'}}>
                                            <CustomButton style={{width: '90px', height: '40px'}} onClick={()=>this.sendQuoteMail()}>Confirm</CustomButton>
                                            <CustomButton style={{marginLeft: '10px', width: '70px', height: '40px'}} onClick={()=>{this.setState({ confirmationModal : false,loaderShow : false})}}>Cancel</CustomButton>
                                        </Modal.Footer>
                                    </Modal>

                                    <Modal size="xl" show={this.state.easyShareModal}  onHide={(event) => { this.setState({easyShareModal : false}) }} backdrop="static">
                                        <Modal.Header style={customStyle.modal_header} closeButton>
                                            <Modal.Title>UHS EasyShare</Modal.Title>
                                        </Modal.Header>
                                        <Modal.Body style={{ padding: '0px'}}>
                                            {
                                                this.state.loaderShow && <Loader></Loader>
                                            }
                                            <iframe style={{ height: '430px', width: '100%' }}  onLoad={()=>this.setState({loaderShow:false})}  src={'https://www.universalhealthfellowship.org/uhs-easyshare-program-grid/'}></iframe>

                                        </Modal.Body>
                                        <Modal.Footer>
                                            <CustomButton  onClick={(event) => {this.setState({easyShareModal : false})}}>{i18n.t('BUTTON.DONE')}</CustomButton>
                                        </Modal.Footer>
                                    </Modal>

                                </div>
                    
                </div>
                <Grid container direction="row"
                                    justify="flex-end"
                                    // alignItems="flex-end" 
                                    >
                                        {
                        this.state.STATE_PARAM &&
                        <span style={{fontSize:'10px',marginRight:'17px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'}}>CID: {this.state.STATE_PARAM.clientId}, OID:{this.state.STATE_PARAM.associationId}, BID:{this.state.STATE_PARAM.brokerId} {sessionStorage.getItem('EMP_NAME') ? <> , EID : {sessionStorage.getItem('EMP_NAME')} </> : ''}  </span>
                    }
                </Grid>
                   
            </div>
            // </div>
        )
    }

}