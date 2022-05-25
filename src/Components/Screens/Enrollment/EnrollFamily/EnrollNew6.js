import React, { Component } from 'react';
import customeClasses from '../Eligibility.css';
import Checkbox from '@material-ui/core/Checkbox';
import { Modal } from 'react-bootstrap';
import Button from '@material-ui/core/Button';
import Loader from '../../../loader';
import { withStyles } from '@material-ui/core/styles';
import i18n from '../../../../i18next';
import I18nextBrowserLanguageDetector from 'i18next-browser-languagedetector';
const CustomeButton = withStyles(theme => ({
    root: {
        backgroundColor: '#ffffff',
        color: '#533278',
        width: '80px',
        height: '30px',
        fontSize: '14px',
        fontWeight: '500',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: 'normal',
        letterSpacing: '0.75px',
        borderRdius: '4px',
        '&:hover': {
            backgroundColor: '#f4f4f4',
            boxShadow: '0 4px 8px 0 #cdaccf, 0 2px 4px 0 #cdaccf'
        },
        '&:disabled': {
            backgroundColor: '#f0f0f1',
            color: '#b4b4bb'
        },
    },
}))(Button);

class EnrollNew6 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            authModalShow: false,
            privacyPolicy: this.props.privacyPolicy,
            authorize: this.props.authorize,
            // checked:false,
            // checked1:false,
        }
    }

    componentDidMount(){
        this.handleAgreement();
    }
    hideModal = (event) => {
        
        this.setState({
            modalShow: false,
            privacyPolicy: false,
            //  checked:false,
           
        },this.handleAgreement)
    }
    showModalPopup = (event) => {
        if (event.target.checked) {
            this.setState({
                modalShow: false,
                privacyPolicy: true,
                // checked:true
            });
        } else {
            this.setState({
                modalShow: false,
                privacyPolicy: false,
                // checked:false
            });
        }
    }
    viewPlanHideModal = (event) => {
        this.setState({
            modalShow: false
        });
    }

    showPlansModal = (event) => {
        if (event.target.checked) {
        this.setState({
            modalShow: false,
            loaderShow : false,
            privacyPolicy: true,
            // checked:true
        },this.handleAgreement);
    }
    else {
        this.setState({
            modalShow: false,
            privacyPolicy: false,
            // checked:false
        },this.handleAgreement);
    }
    }
    showPlansModal1 = (event) => {
        this.setState({
            modalShow: true,
            loaderShow : true,
            //  checked:true
        });
    }
    
    acceptPrivacyPolicy = () => {
        this.setState({
            modalShow:false,
            privacyPolicy: true,
        // checked:true,
        }, this.handleAgreement);
    }

    authorizeHideModal = (event) => {
        this.setState({
            authModalShow: false,
            authorize: false,
            // checked1:false
        },this.handleAgreement);
    }

    showAuthorizeModalPopup = (event) => {
        if (event.target.checked) {
            this.setState({
                authModalShow: true,
                authorize: true,
                //  checked1:true
              
            },this.handleAgreement);
        } else {
            this.setState({
                authModalShow: false,
                authorize: false,
                // checked1:false
               
            },this.handleAgreement);
        }
    }

    acceptAuthorization = () => {
        this.setState({
            
            authModalShow: false,
            authorize: true,
            // checked1:true
        }, this.handleAgreement);
     
    }

    handleAgreement = () => {
        if(this.state.privacyPolicy && this.state.authorize){
            this.props.onClick(false, this.state.authorize, this.state.privacyPolicy)
        } else {
            this.props.onClick(true, this.state.authorize, this.state.privacyPolicy)
        }
    }
   
    handleClick=() =>{
        this.setState({
            checked:true
        })
    }

    handlerCopy(e){
        e.preventDefault();
      }
    render() {
        return (
            <div style={customeClasses.wizContainer}>
                <div style={{ width: '100%' }}>
                    <div>
                        <div>
                            <br />
                            <div style={{ marginRight: '90px', paddingRight: '40px', marginTop: '35px' }}>
                                <Checkbox
                                    checked={this.state.privacyPolicy}
                                    inputProps={{
                                        'aria-label': 'secondary checkbox',
                                    }}
                                    style={{ color: '#533278' }}
                                   onClick={this.showPlansModal}
                                //  onClick={this.handleClick}
                                />
                                <span>{i18n.t('ENROLL_NEW6.AGREE')} <a style={{color:'#533278',cursor: 'pointer'}} href="#" onClick={this.showPlansModal1}>{i18n.t('ENROLL_NEW6.PRIVACY')}</a></span>
                                <Modal size="xl" show={this.state.modalShow} onHide={(event) => this.viewPlanHideModal(event)}>
                    <Modal.Header closeButton>                        
                    </Modal.Header>
                    <Modal.Body style={{ padding: '0px' }}>
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }
                        <iframe style={{ height: '450px', width: '100%' }}  onLoad={()=>this.setState({loaderShow:false})}  src="https://www.universalhealthfellowship.org/privacy-statement/"></iframe>
                    </Modal.Body>
                     <Modal.Footer>
                                <CustomeButton onClick={(event) => this.hideModal(event)} >
                                    Cancel
                            </CustomeButton>
                                <CustomeButton onClick={() => this.acceptPrivacyPolicy()}>
                                    Accept
                            </CustomeButton>
                            </Modal.Footer>
                </Modal>
                            </div>
                        </div>
                        <div style={{ marginTop: '5px', marginLeft: '40px' }} >

                        </div>
                        <br />
                        <div style={{ paddingRight: '150px', marginTop: '20px' }}>
                            <Checkbox
                                checked={this.state.authorize}
                                inputProps={{
                                    'aria-label': 'secondary checkbox',
                                }}
                                style={{ color: '#533278' }}
                                onClick={ this.showAuthorizeModalPopup}
                            />
    <span style={{cursor: 'auto'}}>{i18n.t('ENROLL_NEW6.AUTHORIZE')}</span>
                        </div>
                        <div style={{ marginTop: '5px', marginLeft: '40px' }} >

                        </div>
                        <br/>
                        <Modal size="lg" show={this.state.authModalShow} onHide={(event) => this.authorizeHideModal(event)}>
                            <Modal.Header closeButton>
                                <Modal.Title>{i18n.t('ENROLL_NEW6.IMP_NOTICE')}e</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ 'maxHeight': '450px', 'overflowY': 'auto' }}>
                                
                            </Modal.Body>
                            <Modal.Footer>
                                <CustomeButton onClick={(event) => this.authorizeHideModal(event)}>
                                    Cancel
                            </CustomeButton>
                                <CustomeButton onClick={() => this.acceptAuthorization()}>
                                    Accept
                            </CustomeButton>
                            </Modal.Footer>
                        </Modal>
                    </div>
                </div>
            </div>   
        );
    }
};

export default EnrollNew6;