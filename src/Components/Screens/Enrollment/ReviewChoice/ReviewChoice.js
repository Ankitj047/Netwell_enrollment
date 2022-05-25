import React ,{Component} from 'react';
import Loader from "../../../loader";
import Grid from '@material-ui/core/Grid';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import customStyle from "../../../../Assets/CSS/stylesheet_UHS";
import Button from "@material-ui/core/Button";
import customeClasses from "../Eligibility.css";
import i18n from "../../../../i18next";
import CommonTable from "../../../CommonScreens/commonTable";
import axios from 'axios';
import configurations from "../../../../configurations";
import {connect} from "react-redux";
import {Modal} from "react-bootstrap";
import { Table, TableCell,Paper, TableBody, TableHead, TableRow, Tooltip } from '@material-ui/core';
import "../Add-ons/addOnsScreen.css"

const StyledTableCell = withStyles(theme => (customStyle.tableCell))(TableCell);
const StyledTableRow = withStyles(theme => (customStyle.tableRow))(TableRow);
const ACSMCheckbox = withStyles({
    root: {
        color: '#533278',
        "&$checked": {
            color: '#533278',
        },
        "&$disabled": {
            color: 'grey'
        }
    },
    checked: {},
    disabled: {
        color: 'grey'
    }
})(Checkbox);

const styles = props => (
    customStyle.chkEligiScreen
);

// const WizardButton = withStyles(
//     customStyle.viewBtn
// )(Button);

// const ProceedButton = withStyles(
//     customStyle.proceedBtn
// )(Button);
// const ViewButton = withStyles(
//     customStyle.viewBtn
// )(Button);
const WizardButton = withStyles(
    customStyle.viewNetwellBtn
)(Button);

const ProceedButton = withStyles(
    customStyle.proceedNetwellBtn
)(Button);
const ViewButton = withStyles(
    customStyle.viewNetwellBtn
)(Button);

const NextButton = withStyles(
    customStyle.NextButton
)(Button);


class ReviewChoice extends Component{
    constructor(props) {
        super(props);
        this.state = {
            headerData : [],
            addOnsBodyData : [],
            loaderShow : true,
            progress : 0,
            count : 0,
            tableData : null,
            healthTool : false,
            membersArr : [],
            popTable : null,
            moreInfoModal : false,
            check:false,
            subID: JSON.parse(localStorage.getItem('CurrentLoginUser')).id,
        }
    }

    componentDidMount=()=> {
        if(sessionStorage.getItem("notHLC")==="true")
            sessionStorage.setItem('current_screen', "6");
        else{
            sessionStorage.setItem('current_screen', "5");
        }
        axios.get(configurations.baseUrl + '/addon/getReviewChoices/' + this.state.subID + '/Netwell')
            .then(response =>{
                 this.setState({
                    tableData: response.data.response[0].header,
                    popTable: response.data.response[0].popData.header[0],
                    loaderShow:false
                 },()=>{
                     
                     const id = this.state.popTable.header.indexOf('Surcharge'); // 2
                    const removedDrink = this.state.popTable.header.splice(id,  1);
                let header = this.state.popTable.header.forEach(e =>{return delete e.Surcharge})
                let body= this.state.popTable.body.forEach(e => {delete e.surchargeAmount});
               
                })
            })
            // .catch(error => {
            //     console.log(error);
            //     this.setState({
            //       loaderShow: false,
            //       showCommonErrorModal: true,
            //     });  
            //   })
    }

    handleBack = () =>{
        this.props.onClickjumpfive();
    }

    handleProceed = () =>{
        this.props.onClick();
    }
    render() {
        const { classes } = this.props;
        let currentScreen
             currentScreen = <Grid container spacing={2}>
                <Grid item xs={12} sm={4} >
                    <Grid item xs={12} sm={12}>
                    <div style={{textAlign : 'justify', width : '90%'}}>
                    {this.props.reEnroll && this.props.showHL?<p>If you want to make changes to your selections, click “Select Add-Ons” above to change any add-ons previously selected. </p>:
                    this.props.reEnroll && !this.props.showHL?
                    <p>If you want to make changes to your selections, click "Select Program" above.</p>
                    :
                    <p>If you want to make changes to your selections, click on the "BACK" button at the bottom and select or unselect your choice on previous screens.</p>}</div>
                    </Grid>
                            {/* <>
                                <Grid item xs={12} sm={7}>
                                    <WizardButton variant="contained" style={{width : '100%',marginTop : '40px'}}  onClick={() => this.setState({moreInfoModal : true})}>
                                        REVIEW FAMILY DETAILS
                                    </WizardButton>
                                </Grid>
                            </> */}
                </Grid>

                <Grid item xs={12} sm={8}>
                    <div>

                    <div className="addOnTable reviewChoice" style={{width : '100%', overflowX : 'auto'}}>
                    {       
                        this.state.tableData && <CommonTable quoteData={this.state.tableData.body} check={true} headerData={this.state.tableData.header} tooltip={[]} quickQuote={false} totalReq={true} />
                    }
                    </div>
                   {
                       this.props.clientId == '1004' || this.props.clientId == 1004 ? 
                       null
                       :
                       <p style={{fontSize:'11px', fontWeight:'bold', paddingTop:'10px'}}>
                           {/* *The total amount will include a 0% charge for the use of a credit card as your payment method. To avoid the charge, please use ACH as your payment method in the screen that follows. */}
                           </p>

                   } 
                    </div>
                </Grid>
            </Grid>
        

        return (
            <div style={{flexGrow: 1}}>
                {
                    this.state.loaderShow ? <Loader></Loader> : ''
                }
                <Grid container style={{ fontFamily : 'Roboto, Arial, Helvetica, sans-serif', fontSize : '14px'}}>
                   

                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        {currentScreen}
                    </Grid>
                    <Grid item xs={12} sm={6} style={{marginTop : '0px'}}>
                        <Grid container spacing={3}>
                            <Grid item xs={4} sm={2}>
                                <WizardButton
                                              disabled={false}
                                              variant="contained" style={{width : '100%'}}
                                              onClick={this.handleBack}>BACK
                                </WizardButton>
                            </Grid>

                            <Grid item xs={4} sm={3}>
                                <ProceedButton disabled={false}
                                               variant="contained" style={{width : '100%'}}
                                               onClick={this.handleProceed}>PROCEED
                                </ProceedButton>
                                {/*style={{width: '104px', height: '40px'}}*/}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

                <Modal size="xl" show={this.state.moreInfoModal} onHide={() => this.setState({moreInfoModal : false})} backdrop="static" centered>
                    <Modal.Header style={customStyle.modal_header}>
                        <Modal.Title style={{color:'white'}}>
                            Family Details
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{fontFamily : 'Roboto, Arial, Helvetica, sans-serif', fontSize : '14px', textAlign : 'justify'}}>
                    <div className={this.props.reEnroll ? "reEnrollTable familyDetailsTable reivewTable" : "reivewTable familyDetailsTable"} style={{overflowX : 'auto'}}>{/*reivewTable*/}
                        {this.state.popTable && 
                            <CommonTable quoteData={this.state.popTable.body} check={true} headerData={this.state.popTable.header} tooltip={[]}
                             quickQuote={false} totalReq={true} reEnroll={this.props.reEnroll} />}
                        </div>
                            {/* <p style={{fontSize:'12px', fontWeight:'bold', paddingTop:'10px'}}>{this.props.reEnroll ? null :"Other applicable fees include a one time non-refundable application fee of $75 and UHF monthly membership dues per household of $15."}</p> */}
                        
                        </Modal.Body>
                    <Modal.Footer style={{background:'#f1f1f1'}}>
                        <ViewButton onClick={() => this.setState({moreInfoModal : false})}>Done</ViewButton>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
    handleAddOn(){
        if(!this.state.check)
        this.setState({check:true})
        else
        this.setState({check:false})
    }
}

const mapStateToProps = state => {
    return {
        subId: state.subId,
        email : state.email
    };
}


export default withStyles(styles)(connect(mapStateToProps)(ReviewChoice));
