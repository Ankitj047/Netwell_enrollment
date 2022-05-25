import React from 'react';

import { withStyles, makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import { Modal } from 'react-bootstrap';
import customStyle from "../../../../Assets/CSS/stylesheet_UHS";
import axios from 'axios';
import i18n from '../../../../i18next';




const CustomeButton = withStyles(
    customStyle.viewBtn
)(Button);

class CommonErrorModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            errorModal: props.showModal
        }
    }

   

    componentDidMount() {
       
    }

    handleClose = () => {
        this.setState({            
            errorModal: false,
        });
    };
   

    render() {
      
        return (

            <div>
               <Modal size="md" show={this.state.errorModal} centered onHide={() => this.handlenClose}>
                            <Modal.Header style={customStyle.modal_header}>
                                <Modal.Title>{i18n.t('SUBMIT_APPLICATION.MODEL_TITLE2')}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div style={{ textAlign: 'center', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}>
                                    <p>Oops! Something's not right.</p>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <CustomeButton onClick={() => this.handleClose()}>{i18n.t('BUTTON.OK')}</CustomeButton>
                            </Modal.Footer>
               </Modal>

            </div>
        )
    }
}


export default CommonErrorModal;
