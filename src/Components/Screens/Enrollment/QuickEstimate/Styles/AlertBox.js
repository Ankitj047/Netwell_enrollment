import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const AlertDialog = (props) => {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        props.handleClose()
    };

    return (
        <div>

            <Dialog
                open={props.open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >

                <DialogContent>
                    <h4 className='label-head'>
                        {props.content}
                        <h4 className="label-head">You are all set! </h4>
                        <h4 className="label-head">If you can’t remember your password, you can reset it by clicking the “Forgot your password?”  </h4>
                    </h4>

                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <button onClick={() => props.gotoResetPassword()} className="b-btn" style={{ width: 'auto', minWidth: '70px', height: '40px', margin: '0 0px 15px 0' }}>
          Forgot your password
                </button>
                        <button onClick={() => props.handleClose()} className="a-btn" style={{ width: 'auto', minWidth: '70px', height: '35px'}}>
                            Close </button>
                    </div>


                </DialogContent>

            </Dialog>
        </div>
    );
}

export default AlertDialog;