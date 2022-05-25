import React, { Component }  from 'react';
import { withStyles } from '@material-ui/core/styles';

import styles from '../Styles/stylesheet_UHS'

import ForumIcon from "@material-ui/icons/Forum";
import Fab from "@material-ui/core/Fab";

import '../Assets/CSS/common.css'
const CrudButton = withStyles(
  styles.crudBtn,
)(Fab);


class ChatButtonText extends Component {
  constructor(props) {
    super(props)
    this.state = {

      width: 0, height: 0,

    }

  }
  componentDidMount() {

  }


  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }





  render() {
    return (


      <div className='chat_footer'>
       
        <div className="row ">

          <div className="col-md-4">
            {
              this.props.show ?
              <>
                <h5 className='h5_tag'> Health Sharing in not insurance but a great alternative to pay for medical expenses*
                </h5>
                {/* <p>*See <a href="https://www.universalhealthfellowship.org/wp-content/uploads/2020/02/UHS-State-Legal-Notices-UHS-SLN-22820.pdf" target="_blank" >link</a> for important legal notices.</p> */}
                </>
                :
                null
            }

          </div>
          <div className="col-md-8 text-right">
          <div className='rightAlign' style={{marginBottom:'8px'}}>
            {
              this.props.fromAgent ?
              <div style={{height:'56px'}}></div>
              :
              <CrudButton className={''} color="primary" aria-label="add" style={styles.CommonChatBtn}>
                <ForumIcon />
              </CrudButton>
            }
              
            </div>
            <p><b>Need Help?</b></p>
              {
                this.props.fromAgent ?
                <p>Chat with netWell Agent Support.</p>
                :
                <p>Chat with netWell Agent Support.</p>
              }
            

          </div>

        </div>
      </div>






    )
  }




}
export default ChatButtonText;