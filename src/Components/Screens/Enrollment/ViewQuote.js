import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableCell, TableBody, TableHead, TableRow } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Loader from '../../loader';
import { Modal } from 'react-bootstrap';
import configuration from '../../../configurations';
import { connect } from 'react-redux';
import customStyle from '../../../Assets/CSS/stylesheet_UHS';
import CommonTable from '../../CommonScreens/commonTable';
import i18n from '../../../i18next';
import ForumIcon from "@material-ui/icons/Forum";
import Fab from "@material-ui/core/Fab";
import Grid from "@material-ui/core/Grid";
import CommonGrid from '../../CommonScreens/CommonGrid';
import UhsGrid from "../../CommonScreens/UhsGrid";
import PbGrid from "../../CommonScreens/pbGrid";
import planConfig from "../../../planConfig";
import Sample from '../../CommonScreens/sampleTextField';
import axios from 'axios';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import WellLife from '../../../Assets/pdf/WellLife_Program_Grid.pdf'
import WellLifePlus from '../../../Assets/pdf/WellLife+_Program_Grid.pdf'
const CustomButton = withStyles(
    customStyle.viewBtn
)(Button);

const ProceedButton = withStyles(
    // customStyle.proceedBtn
    customStyle.proceedNetwellBtn
)(Button);

const ViewButton = withStyles(
    // customStyle.viewBtn
    customStyle.viewNetwellBtn
)(Button);

const styles = theme => ({
    table: {
        minWidth: 700,
    },
});


const PurpleRadio = withStyles(
    customStyle.radioBtn
)(props => <Radio color="default" {...props} />);

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

const CrudButton = withStyles(
    customStyle.crudBtn,
)(Fab);

const IFrameStyle = {
  height: "430px",
  width: "100%",
  scrollbarWidth: "auto",
  scrollbarColor: "#cccccc #ffffff",
  webkit_scrollbar: { width: 8 },
  webkit_scrollbar_track: { background: "#ffffff" },
  webkit_scrollbar_thumb: {
    backgroundColor: "#cccccc",
    borderRadius: 10,
    border: "3px solid #ffffff",
  },
};

class ViewQuote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quoteData: [],
            loaderShow: false,
            modalShow: false,
            headerData:[],
            familyDetails_ModalShow : false,
            otherQuote : [],
            generalQuote : [],
            generalQuoteHeader : [],
            tooltip:[],
            otherQuoteData : [],
            clientId:sessionStorage.getItem('CLIENT_ID'),
            ACSMPlanAll:['UHS1','UHS2','UHS3','UHS4','UHS5','UHS6'],
            ACSMPlan:['UHS2','UHS4','UHS6'],
            smartShareModel : false,
            ACSMModal : false,
            msgModal : false,
            errMsg : '',
            confirmationModal : false,
            easyShareModal : false,
            acsmFlag : false,
            iframeURL : '',
            email:null,
            isvalidEmail:true,
            validationError:false,
            agentEmail:'',
            selecEmail:'',
            disableConfirm : true
        }
    }

    componentDidMount() {
        window.scrollTo(0, 0);
        sessionStorage.setItem('current_screen', '2');
        sessionStorage.removeItem('Dependant');
        sessionStorage.removeItem('MemberDetails');
        sessionStorage.removeItem('coverage');
        sessionStorage.removeItem('postalCodeData');

        this.setState({
            loaderShow: true
          });
        fetch(configuration.baseUrl + '/plan/viewQuote/'+ this.props.subId + '/' + sessionStorage.getItem('CLIENT_ID') +'/Netwell')
        .then((response) => response.json())
        .then(response => {
            let acsmFlag = false;
            if(sessionStorage.getItem('CLIENT_ID').toString() === '4350' 
            || sessionStorage.getItem('CLIENT_ID').toString() === '6548' 
            || sessionStorage.getItem('CLIENT_ID') === '4367'
            || sessionStorage.getItem('CLIENT_ID') === '5540' 
            || sessionStorage.getItem('CLIENT_ID') === '4376' 
            || sessionStorage.getItem('CLIENT_ID') === '5541' 
            || sessionStorage.getItem('CLIENT_ID') === '4377'
            || sessionStorage.getItem('CLIENT_ID').toString() === '5558'
            || sessionStorage.getItem('CLIENT_ID').toString() === '4386'
            ){
                acsmFlag = false
            } else {
                acsmFlag = true
            }
            this.setState({
                loaderShow: false,
                generalQuote : response.quote,
                generalQuoteHeader : response.header,
                otherQuoteData : response.otherFees,
                quoteData: response.data,
                headerData:response.header,
                tooltip:response.shareableTooltip,
                acsmFlag : acsmFlag
            });
        })
        .catch(error => {
          console.log(error);
        })
    
        let getDetails = JSON.parse(localStorage.getItem('CurrentLoginUser'));
        
        if(getDetails.email !== null || getDetails.email !== ''){
            this.setState({
                email:getDetails.email
            })
        }
      
        if (this.props.agentDetails && this.props.agentDetails.brokerId) {
            axios
              .get(
                configuration.agentURL +
                  "/agentlogin/getAgentById/" +
                  this.props.agentDetails.brokerId
              )
              .then((response) => {
                console.log(
                  "===RESPONSE===",
                  response.data.response
                );
                this.setState({
                  agentEmail:
                    response.data.response.email,
                });
              });
            }

    }

    viewPlanHideModal = (event) => {
        this.setState({
            modalShow: false
        });
    }

    showPlansModal = (event) => {
        let obj = planConfig.find(obj => obj.CLIENT_ID.toString() === this.state.clientId.toString())

        this.setState({
            iframeURL : obj.iframeURL,
            modalShow: true,
             loaderShow : true
        });
    };

    showWellLife = (event) => {
        window.open(WellLife)
    };
    showWellLifePlus =(proramname)=>{
        if(proramname == "elite"){
            window.open('https://netwell-prod.s3.amazonaws.com/Agent/Advantage-Brochure.pdf')
        }else if(proramname == "welllifeplus"){
            window.open(WellLifePlus)
        }
       
    }

    familyDetailsHideModal = (event) => {
        this.setState({
            familyDetails_ModalShow : false
        })
    }

    sentQuoteEmail = (name) => {
        this.setState({
            loaderShow : true,
            confirmationModal : false
        });
        //fetch(configuration.baseUrl + '/plan/sendQuoteMail/' + this.props.email + '/' + sessionStorage.getItem('isAgent'))
        fetch(configuration.baseUrl + '/plan/sendQuoteMail/' + this.state.email + '/' + sessionStorage.getItem('isAgent')+'/Netwell'+'/'+ name)
            .then((response) => response.json())
            .then(response => {
                if(response.code === 200){
                    this.setState({
                        msgModal : true,
                        loaderShow : false,
                        
                        errMsg : 'Quote email sent successfully!'
                    });
                } else {
                    this.setState({
                        msgModal : true,
                        loaderShow : false,
                        errMsg : 'Internal Server Error'
                    });
                }
            })
    }
    setUserValue = (value, isValid, parentDetails) => {
        if (parentDetails.name === 'email') {
            if (isValid) {
                this.state.email = value;
                this.setState({isvalidEmail:false})
            } else {
                this.state.email = null;
                this.setState({isvalidEmail:true})
            }
        }
       
    }
    saveEmail=()=>{

        let cookiesData = JSON.parse(sessionStorage.getItem('STATE_PARAM'))

        let dataObj = {
            "subId":cookiesData.subID,
            "email":this.state.email,
        }
        console.log("--dataObj --", dataObj);

        axios.post(configuration.baseUrl + '/setupfamily/saveEmail', dataObj)
        .then(response => {
            if (response.data.code === 200) {    

                let CurrentLoginUser = JSON.parse(localStorage.getItem('CurrentLoginUser'));
                let obj = {
                    userName: CurrentLoginUser.userName,
                    id: CurrentLoginUser.id,
                    email: this.state.email,
                    phone : CurrentLoginUser.phone
                };
                localStorage.setItem('CurrentLoginUser', JSON.stringify(obj));


                this.setState({
                    confirmationModal : true,
                    noEmail: false,
                    validationError: false
                })
            }else if (response.data.code === 202) { 
                this.setState({validationError: true});
            }
        });
           
    }
    clickConfirmationModal=()=>{
        
        if(this.state.email == '' || this.state.email == null ){
            this.setState({
                confirmationModal : true,
                noEmail: true
            })
        }else{
            this.setState({
                confirmationModal : true,
                noEmail: false
            })
        }
        
    }


    selectEmail =(e)=>{
        console.log("Radio select---",e.target.value)
     this.setState({
         selecEmail : e.target.value,
         disableConfirm: false,
     })   
    }

    render() {
        let classes = this.props;
        return (
            <div>
                {
                    this.state.loaderShow ? <Loader></Loader> : ''
                }
               
                {/* <div style={{ fontSize: '14px', lineHeight: '16px',textAlign:'justify' }}>{i18n.t('VIEW_QUOTE.QUOTE_TITLE')} <span style={{fontWeight:'bold'}}>{i18n.t('VIEW_QUOTE.QUOTE_TITLE2')}</span><span>{i18n.t('VIEW_QUOTE.QUOTE_TITLE3')}</span></div> */}

                                {/* <Grid xs={12} style={styles.QuickQt2TopWrp} item={true}>
                                    {
                                        ((this.state.clientId.toString() !== '6548' && this.state.clientId.toString() !== '4367') && (this.state.clientId.toString() !== '5540' && this.state.clientId.toString() !== '4376')) ?
                                        this.props.reEnroll? 
                                        <p style={{ fontSize: '14px', lineHeight: '16px',textAlign:'justify', fontFamily : 'Roboto, Arial, Helvetica, sans-serif',padding:'5px' }}>{i18n.t('VIEW_QUOTE.ReEnrollQUOTE_TITLE')}</p>
                                            :<p style={{ fontSize: '14px', lineHeight: '16px',textAlign:'justify', fontFamily : 'Roboto, Arial, Helvetica, sans-serif',padding:'5px' }}>
                                                {i18n.t('VIEW_QUOTE.QUOTE_TITLE')}
                                                <span style={{fontWeight:'bold'}}>{i18n.t('VIEW_QUOTE.QUOTE_TITLE2')}</span><span>{i18n.t('VIEW_QUOTE.QUOTE_TITLE3')}</span>
                                            </p> :
                                            <p style={{ fontSize: '14px', lineHeight: '16px',textAlign:'justify', fontFamily : 'Roboto, Arial, Helvetica, sans-serif',padding:'5px' }}>
                                                {i18n.t('VIEW_QUOTE.QUOTE_TITLE4')}
                                                <span style={{fontWeight:'bold'}}>{i18n.t('VIEW_QUOTE.QUOTE_TITLE5')}</span><span>{i18n.t('VIEW_QUOTE.QUOTE_TITLE6')}</span>
                                            </p>
                                    }
                                </Grid> */}

                                
                                 {
                                    (this.state.clientId.toString() === '6548' 
                                    || this.state.clientId.toString() === '4367' 
                                    || this.state.clientId.toString() === '5540' 
                                    || this.state.clientId.toString() === '4376' 
                                    || this.state.clientId.toString() === '5541' 
                                    || this.state.clientId.toString() === '4377'
                                    // || this.state.clientId.toString() === '5558'
                                    // || this.state.clientId.toString() === '4386'
                                    )  ?
                                    this.props.reEnroll?
                                    <p style={{ fontSize: '14px', lineHeight: '16px',textAlign:'justify', fontFamily : 'Roboto, Arial, Helvetica, sans-serif',padding:'5px' }}>{i18n.t('VIEW_QUOTE.ReEnrollQUOTE_TITLE')}</p>
                                    :
									 (this.state.clientId.toString() === '5541' || this.state.clientId.toString() === '4377') ?
                            
                            <p style={{ fontSize: '14px', lineHeight: '16px', textAlign: 'justify', fontFamily: 'Roboto, Arial, Helvetica, sans-serif', padding: '5px' }}>
                                {i18n.t('VIEW_QUOTE.QUOTE_CHSTITLE4')}
                                <span style={{ fontWeight: 'bold' }}>{i18n.t('VIEW_QUOTE.QUOTE_TITLE5')}</span><span>{i18n.t('VIEW_QUOTE.QUOTE_TITLE6')}</span>
                            </p>
							:
									
                                    <p style={{ fontSize: '14px', lineHeight: '16px',textAlign:'justify', fontFamily : 'Roboto, Arial, Helvetica, sans-serif',padding:'5px' }}>
                                                {i18n.t('VIEW_QUOTE.QUOTE_TITLE4')}
                                                <span style={{fontWeight:'bold'}}>{i18n.t('VIEW_QUOTE.QUOTE_TITLE5')}</span><span>{i18n.t('VIEW_QUOTE.QUOTE_TITLE6')}</span>
                                            </p>
                                    :
                                    // (this.state.clientId.toString() !== '6548' && this.state.clientId.toString() !== '4367') && (this.state.clientId.toString() !== '5540' && this.state.clientId.toString() !== '4376') ?
                                    this.state.clientId.toString() === '1004' || (this.state.clientId.toString() === '1004' &&  this.props.reEnroll) ?
                                    <p style={{ fontSize: '14px', lineHeight: '18px',textAlign:'justify', fontFamily : 'Roboto, Arial, Helvetica, sans-serif',padding:'5px' }}>
                                        Here are monthly sharing contribution estimates for every person you’ve told us about. We’re giving you the estimates of our sharing programs. Click Elite + PROGRAMS to see 
                                    details about what each program includes. We’re using your family information to create your
                                     Family Total amounts for each program. If you want to make changes to family information, 
                                    click on the “Set up Family” circle in the navigation bar above. Please make note of the</p>
                                    :
									<p style={{ fontSize: '14px', lineHeight: '18px',textAlign:'justify', fontFamily : 'Roboto, Arial, Helvetica, sans-serif',padding:'5px' }}>
                                        Here are monthly sharing contribution estimates for every person you’ve told us about. We’re giving you the estimates of our sharing programs. Click WELLLIFE + PROGRAMS to see 
                                    details about what each program includes. We’re using your family information to create your
                                     Family Total amounts for each program. If you want to make changes to family information, 
                                    click on the “Set up Family” circle in the navigation bar above. Please make note of the</p>
								

                                } 







                                    <Grid container >
                    <Grid xs={12} style={{tableLayout:'fixed',marginTop:'20px',marginBottom:'20px'}} item={true}>
                    <div style={{ overflowX: "auto" }} >
                    <CommonTable quoteData={this.state.generalQuote} check={true} headerData={this.state.generalQuoteHeader} tooltip={this.state.tooltip} quickQuote={true} totalReq={true} ACSM={false} />
                    </div>
                    </Grid>
                    </Grid>


                    <Grid container justify='space-between'>
                        {
                            (this.state.clientId.toString() === '1004') ?
                            
                            <Grid item xs={12} sm={7}>
                           
                                    <Grid container spacing={2} style={{marginBottom: '10px'}}>
                                     
                                        <Grid item xs={12} sm={5}>
                                       <ViewButton
                                                variant="contained"
                                                color="primary"
                                                onClick={()=>this.showWellLifePlus("elite")}
                                                style={{width: '100%'}}
                                                // hidden={this.state.clientId === "4350"||this.props.reEnroll}
                                            >View  Elite  <sup>+</sup> &nbsp;Programs</ViewButton>
                                        </Grid>
                                       

                                    </Grid>
                                   
                        </Grid>

                            :

                            <Grid item xs={12} sm={7}>
                           
                                    <Grid container spacing={2} style={{marginBottom: '10px'}}>
                                     
                                        <Grid item xs={12} sm={5}>
                                       <ViewButton
                                                variant="contained"
                                                color="primary"
                                                onClick={()=>this.showWellLifePlus("welllifeplus")}
                                                style={{width: '100%'}}
                                                // hidden={this.state.clientId === "4350"||this.props.reEnroll}
                                            >View  WellLife  <sup>+</sup> &nbsp;Programs</ViewButton>
                                        </Grid>
                                       

                                    </Grid>
                                   
                        </Grid>

                        }
                        

                        <Grid item xs={12} sm={4} style={{paddingRight:'26px'}}>
                        <span style={customStyle.headingTxt}>
                        Other applicable fees across all programs
                        </span>
                        {
                                Object.keys(this.state.otherQuoteData).map((keyName, i) => (
                                        <div style={customStyle.planBoxViewQuote} key={i}>
                                            <span style={customStyle.planText1}>{keyName}</span>
                                            <span style={customStyle.planPrice}>{this.state.otherQuoteData[keyName]}</span>
                                        </div>
                                    
                                ))
                            }
                        </Grid>

                    </Grid>











                        {/* <Grid container justify='space-between'>
                        <Grid item xs={12} sm={7}>
                            {
                                ((this.state.clientId !== '6548' && this.state.clientId !== '4367') 
                                && (this.state.clientId !== '5540' && this.state.clientId !== '4376'  
                                && this.state.clientId !== '5541'  && this.state.clientId !== '4377'
                                && this.state.clientId !== '5558'  && this.state.clientId !== '4386'
                                ) ) ?
                                    <Grid container spacing={2} style={{marginBottom: '10px'}}>
                                       <Grid item xs={12} sm={5}>
                                            <ViewButton
                                                variant="contained"
                                                color="primary"
                                                onClick={this.showPlansModal}
                                                hidden={this.props.reEnroll}
                                                style={{width: '100%'}}
                                            >View All UHS Standard Programs</ViewButton>
                                        </Grid>
                                        <Grid item xs={12} sm={5}>
                                       <ViewButton
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    this.setState({smartShareModel: true, loaderShow: true})
                                                }}
                                                style={{width: '100%'}}
                                                hidden={this.state.clientId === "4350"||this.props.reEnroll}
                                            >View UHS SmartShare Programs</ViewButton>
                                        </Grid>
                                        <Grid item xs={12} sm={5}>
                                            <ViewButton
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {
                                                    this.setState({ACSMModal: true})
                                                }}
                                                style={{width: '100%'}}
                                                hidden={this.state.clientId === "4350"}
                                            >{this.props.reEnroll?"Learn about the ACSM Add-On Option":"Check out our ACSM Value Add"}</ViewButton>
                                        </Grid>

                                    </Grid>
                                    :
									(this.state.clientId !== '5541' && this.state.clientId !== '4377' && this.state.clientId !== '5558' && this.state.clientId !== '4386') ?
                                    <Grid container spacing={2} style={{marginBottom: '10px'}}>
                                        <Grid item xs={12} sm={5}>
                                            <ViewButton
                                                variant="contained"
                                                color="primary"
                                                onClick={this.showPlansModal}
                                                style={{width: '100%'}}
                                            >View All Healthy Life (HL) Programs</ViewButton>
                                        </Grid>
                                        <Grid item xs={12} sm={5}>
                                            <ViewButton
                                                variant="contained"
                                                color="primary"
                                                onClick={() => {this.setState({easyShareModal : true, loaderShow: true})}}
                                                style={{width: '100%'}}
                                            >View EasyShare (ES) Programs</ViewButton>
                                        </Grid>
                                    </Grid>
									:
                                    (this.state.clientId == '5558' && this.state.clientId !== '4386') ?
                                    <>
                                    <Grid container spacing={2} style={{marginBottom: '10px'}}>
                                        <Grid item xs={12} sm={5}>
                                            <ViewButton
                                                variant="contained"
                                                color="primary"
                                                onClick={this.showPlansModal}
                                                style={{width: '100%'}}
                                            >View All Healthy Life National (HLN) Programs</ViewButton>
                                        </Grid>
                                        </Grid>
                                        </>
                                        :
									 <Grid container spacing={2} style={{ marginBottom: '10px' }}>
                                        <Grid item xs={12} sm={5}>
                                            <ViewButton
                                                variant="contained"
                                                color="primary"
                                                onClick={this.showPlansModal}
                                                style={{ width: '100%' }}
                                            >View all Community HealthShare Programs</ViewButton>
                                        </Grid>

                                    </Grid>
                            }
                        </Grid>

                        <Grid item xs={12} sm={4} style={{paddingRight:'26px'}}>
                        <span style={customStyle.headingTxt}>
                        Other applicable fees across all programs
                        </span>
                        {
                                Object.keys(this.state.otherQuoteData).map((keyName, i) => (
                                        <div style={customStyle.planBoxViewQuote} key={i}>
                                            <span style={customStyle.planText1}>{keyName}</span>
                                            <span style={customStyle.planPrice}>{this.state.otherQuoteData[keyName]}</span>
                                        </div>
                                    
                                ))
                            }
                        </Grid>

                    </Grid> */}

                <div style={customStyle.bottomMainConatiner}>
                        <div style={customStyle.newBottomContainer}>
                            <div style={customStyle.bottomChildContainer1}>

                                <ProceedButton
                                    variant="contained"
                                    color="primary"
                                    onClick={this.clickConfirmationModal}
                                    style={{width: '150px', marginRight : '10px'}}
                                >SEND QUOTE</ProceedButton>
                                <ProceedButton
                                    variant="contained"
                                    color="primary"
                                    onClick={this.props.onClick}
                                    style={{width: '120px', height: '40px'}}
                                >{i18n.t('BUTTON.PROCEED')}</ProceedButton>
                            </div>
                            <div style={customStyle.bottomChildContainer2}>
                                
                            </div>           
                        </div>
                        <div style={customStyle.newBottomContainer}>
                           
                        </div>
                </div> 
                <Modal size="xl" show={this.state.modalShow} onHide={(event) => this.viewPlanHideModal(event)}>
                    <Modal.Header style={customStyle.modal_header} closeButton>
                        <Modal.Title>{i18n.t('VIEW_QUOTE.MODEL_TITLE')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ padding: '0' }}>
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }
                        {
                            <iframe 
                            style={IFrameStyle}
                            
                            onLoad={()=>this.setState({loaderShow:false})}  src={this.state.iframeURL}></iframe>
                        }
                    </Modal.Body>
                    <Modal.Footer>
                        <CustomButton onClick={() => this.viewPlanHideModal()}>{i18n.t('BUTTON.DONE')}</CustomButton>
                    </Modal.Footer>
                </Modal>

                {/* --------------------------------ACSM Modal ------------------------------------------------- */}

                <Modal size="lg" show={this.state.ACSMModal}  onHide={() => {this.setState({ ACSMModal : false})}} backdrop="static">
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

                        <div style={{ overflowX: "auto" }} >
                            <Table aria-label="customized table1"  style={customStyle.tableACSM}>
                            <TableHead style={{backgroundColor:'#420045',position: 'sticky'}}>
                                <TableRow style={{position: 'sticky'}}>
                                    <StyledTableCell1 padding='checkbox' align='center' style={customStyle.tableHead1ACSM} >
                                        Program Name
                                    </StyledTableCell1>
                                    {
                                        this.state.generalQuoteHeader.length - 1 === 7 ?
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
                                    this.state.generalQuoteHeader.length - 1 === 7 ?
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
                        </div>
                        <span style={{fontSize:'13px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'}}>
                        The amounts shown above are Co-Share Maximum amounts in effect as of 10/01/2020. Annual Co-Share Maximum amounts are subject
                        to adjustment from time to time. Always remember to check the Universal HealthShare Member Portal for the most current version
                        of the Sharing Guidelines, which may reflect changes that have been made since the date of the last copy you reviewed.
                        This option is only available at the time of enrollment, or at the time of annual program renewal.
                </span>
                    </Modal.Body>
                    <Modal.Footer>
                        <CustomButton  onClick={() => {this.setState({ ACSMModal : false})}}>{i18n.t('BUTTON.DONE')}</CustomButton>
                    </Modal.Footer>
                </Modal>

                {/*================================ smart share modal ==========================*/}
                <Modal size="lg" show={this.state.smartShareModel}  onHide={() => {this.setState({ smartShareModel : false})}} backdrop="static">
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

                <Modal size="xs" show={this.state.confirmationModal} onHide={(event) => this.setState({confirmationModal:false,loaderShow : false})} backdrop="static" centered>
                    <Modal.Header style={customStyle.modal_header} closeButton>
                        <Modal.Title>Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ margin: '10px',fontFamily : 'Roboto, Arial, Helvetica, sans-serif' }}>
                        {/* The quote will be emailed to <b>{this.props.email}</b>. Confirm to proceed. */}
                       {this.state.noEmail ? 
                        <div style={{flexGrow:1, textAlign:'left'}}>
                            <Grid xs={12} sm={12} md={6} lg={12} style={{marginBottom : '5px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif', fontSize : '14px'}}>
                                <span>Please confirm email to send quote</span>
                            </Grid>
                            <Grid xs={12} sm={12} md={6} lg={12}>
                                <Sample setChild={this.setUserValue.bind(this)} reqFlag={true} name={'email'} label={'Email ID'} value={this.state.email} disable={false} style={customStyle.textFieldWrp} length={50} fieldType={'email'} errMsg={'Enter valid email Id'} helperMsg={"Email is required"} parentDetails={{ name: 'email' }}></Sample>
                            </Grid>
                   
                        </div>
                        :
                        <>
                        The quote will be emailed to 
                        {/* <b>{this.state.email}</b>. */}
                         
                        
                        <RadioGroup aria-label="email" name="email" style={{ display: 'block' }} value='email' >
                    
                            <FormControlLabel key="prospect" value={this.state.email} checked={this.state.selecEmail == this.state.email} control={<PurpleRadio /> } onChange={this.selectEmail} label={"Prospect:" +' '+this.state.email} />
                            <FormControlLabel key="agent" value={this.state.agentEmail} checked={this.state.selecEmail == this.state.agentEmail} control={<PurpleRadio />} label={"Agent:" +' '+this.state.agentEmail} onChange={this.selectEmail}/>
                        
                           
                </RadioGroup>
                Confirm to proceed.
                        
                        </>
                        }

                        {this.state.validationError ?
                            <div style={{color:'#f30', fontSize:'12px', textAlign:'left', padding:'10px 0'}}> Email already exist in system </div>
                            :
                            null
                        }
                       

                    </Modal.Body>
                    <Modal.Footer style={{alignItems:'right'}}>
                    {this.state.noEmail ? 
                        <CustomButton style={{width: '90px', height: '40px'}} disabled={this.state.isvalidEmail ? true : false} onClick={()=>this.saveEmail()}>Save</CustomButton>
                        :
                        <CustomButton style={{width: '90px', height: '40px'}} disabled={this.state.disableConfirm} onClick={()=>this.sentQuoteEmail(this.state.selecEmail == this.state.agentEmail ? "agent":"prospect")}>Confirm</CustomButton>
                        }
                        {/* <CustomButton style={{width: '90px', height: '40px'}} onClick={()=>this.sentQuoteEmail()}>Confirm</CustomButton> */}
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
        )
    }
}

const mapStateToProps = state => {
    return {
        subId: state.subId,
        email : state.email
    };
  }

export default withStyles(styles)( connect(mapStateToProps)(ViewQuote));