import React from 'react';
import Button from '@material-ui/core/Button';
import mainClasses from './Enrollment.css.js';
import Eligibility from './Eligibility';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import EnrollFamily from './EnrollFamily/EnrollFamily'
import SetupFamily from './SetupFamily';
import PlanSelection from './PlanSelection';
import SetupPayment from './SetupPayment';
import SubmitApplication from './SubmitApplication';
import Enrollment from './enrollment'
import ViewQuote from './ViewQuote';
import { Auth } from 'aws-amplify';
import { connect } from 'react-redux';
import configuration from '../../../configurations';
import Modal from '@material-ui/core/Modal';
import axios from 'axios';
import Loader from '../../loader';
import customStyle from '../../../Assets/CSS/stylesheet';

const CustomTextField = withStyles(
    customStyle.textField,
)(TextField);

const CustomButton = withStyles(
    customStyle.btn,
)(Button);


const styles = theme => ({
    completed: {
        color: "#fdcf85 !important"
    },
    active: {
        color: "#f5887f !important"
    },
    paper: {
        width: '58%',
        height: '50',
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        borderRadius: '4px',
        border: 'none',
        padding: '28px 27px 9px 23px',
    },
    formControl: {
        width: '223px',
        height: '56px',
        marginRight: '21px'
    }
});

class Finish extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeStep: 0,
            setActiveStep: 0,
        };
    }

    render() {
        const { classes } = this.props;
        let currentScreen = '';
        if (this.state.activeStep === 0) {
            currentScreen = <div>
                <div style={{ fontSize: '25px', fontWeight: 'bold',marginBottom:'60px',marginLeft:'350px'}}>You are Enrolled Successfully!!!</div>
                
               
            </div>
        } 

        return (
            <div>
                {
                    this.state.loaderShow ? <Loader></Loader> : ''
                }
                <div style={{ marginTop: '71px', width: '95.2%', marginLeft: '2.4%', marginRight: '2.4%' }}>
                    {/* <div style={mainClasses.welcomeMessage}>Hello {this.state.currentUser}</div> */}
                    <div style={{ marginTop: '31px', width: '100%', height: '14.2%', backgroundColor: '#ffffff' }}>
                      
                    </div>
                    <div style={mainClasses.mainArea}>
                        <div>
                            {currentScreen}
                        </div>
                    </div>
                   
                </div>
                <div style={mainClasses.optOut}>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        open={this.state.modalOpen}
                        onClose={() => this.handleClose}
                        style={{marginLeft: '30%', marginTop: '13%', zIndex: '2',}}>
                        <div className={classes.paper}>
                            <div style={{ marginBottom: '36px', lineHeight: '24px', color: '#000000', fontSize: '20px', fontWeight: '500' }}>Opt-out</div>
                            <div>
                                <p>Do let us know your reason for opting out of netWell.</p>
                                <form>
                                    <div style={{ display: 'flex', width: '100%' }}>
                                        <div>
                                           
                                        </div>
                                        
                                    </div>
                                    <div style={{ marginTop: '33px', float: 'right' }}>
                                        <CustomButton style={mainClasses.modalCancelBtn} >
                                            Cancel
                                            </CustomButton>
                                        <CustomButton style={mainClasses.modalSubmitBtn}  disabled={this.state.formValid}>
                                            Submit
                                            </CustomButton>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </Modal>
                    <span style={{ lineHeight: '16px', fontSize: '14px', marginLeft: '24px' }}>You can choose to opt-out of the process at any stage before you submit your application.</span>
                    <CustomButton style={mainClasses.caption}  disabled={this.state.optFlag}>
                        opt-out
                    </CustomButton>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Finish);
