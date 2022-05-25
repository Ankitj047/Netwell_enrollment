import React,{Component} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import style from '../../Assets/CSS/stylesheet_UHS';
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import ForumIcon from "@material-ui/icons/Forum";
import Grid from "@material-ui/core/Grid";
import i18n from "../../i18next";
import axios from 'axios';
import configuration from '../../configurations';

const CrudButton = withStyles(
    style.crudBtn,
)(Fab);



export default  class ChatButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            chatState:0,
            customerServiceNo : ''
        }
    }

    componentDidMount(){
        window.addEventListener('Chat',this.setChat);
        console.log("chat button get enroll===",sessionStorage.getItem('userMail'))
        let URL=''
        let cookiesData = JSON.parse(sessionStorage.getItem('STATE_PARAM'))//cookies.get('STATE_PARAM', false);

        if(cookiesData && cookiesData.isAgent){
            URL=configuration.baseUrl + '/setupfamily/getEnrollFlagBySubId/' + cookiesData.subID
        }else{
            URL=configuration.baseUrl + '/setupfamily/getEnrollFlag/' + sessionStorage.getItem('userMail')

        }
        axios.get(URL)
            .then(response => {
                if(response.data.response){
                    this.setState({
                        customerServiceNo : response.data.response.customerServiceNo
                    });
                }
            });
    }

    setChat=(e)=>{
        //this.setState({chatState:e.detail.flag})
    }

    componentWillUnmount() {
        window.removeEventListener('Chat',this.setChat);
    }


    render() {
        return (
            <div>
                <div style={style.FooterChildWrp1}>
                    <div style={{marginLeft:'auto',marginRight:'3.5%'}}>
                        <CrudButton className={''} color="primary" aria-label="add"  style={style.CommonChatBtn}>
                            <ForumIcon />
                        </CrudButton>
                    </div>
                </div>
                <div style={style.FooterChildWrp2}>
                    <Grid xs={12} style={style.QuickQtHelpWrp} item={true}>
                        <div style={{display:'flex',flexDirection:'column',color: '#304d63', fontSize: '14px', lineHeight: '16px',textAlign:'right'}}>
                            <div style={{display:'flex',justifyContent:'flex-end',marginBottom:'2px'}}>
                                <span style={style.QuickQtHelpTxt1}>{i18n.t('ENROLL_FAMILY.HELP')}</span>
                            </div>
                            {/* <span style={style.QuickQtHelpTxt2}>{i18n.t('ENROLL_FAMILY.SUPPORT')} + {this.state.customerServiceNo}</span> */}
                            <span style={style.QuickQtHelpTxt2}>Chat with our netWell coordinator.</span>
                            {/* Need help?  */}

                        </div>
                    </Grid>
                </div>
            </div>
        )
    }

}


