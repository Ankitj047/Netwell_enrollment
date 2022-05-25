import React, { Component }  from 'react';

import { withRouter } from 'react-router';

import configurations from "../../../../../configurations";
import logo from '../Assets/Images/Frame.png'
import FaithTalklogo from '../Assets/Images/faithtalk_logo.png'

import '../Assets/CSS/common.css'
import Loader from "../Styles/Loader";
import axios from 'axios'


 class Header extends Component{
    constructor(props) {
        super(props)
        this.state = {
          // association_logo :'',
          width: 0, height: 0,
          loader:false
         
        }
      
      }
      componentDidMount() {
        sessionStorage.setItem('CHAT_BOX_Id', configurations.chat_Box_Id);
        
        // window.location.reload();
        let urlValues = window.location.hash ? window.location.hash.split('=') : [];
        if (urlValues && urlValues.length > 0) {
            if (urlValues[1]) {
              this.setState({loader : true})
                this.getDecodeData(urlValues[1]);
                
            }
        }

        }
        getClientDetails=(cid)=>{
          let data={
              "clientId" : cid
          }
          axios.post(configurations.baseUrl+'/enrollment/getClient',data)
              .then(response=>{
                  if(response.data.response){
                      this.setState({
                          // association_logo : response.data.response.image,
                          loader : false
                      });
                  }
              });
      }
  
      // decode the url-----------
  
      getDecodeData = (value) => {
        this.setState({loader : true})
          axios.get(configurations.baseUrl + '/encrypt/decryptData?state=' + value)
            .then(response => {
              if (response.data.response) {             
                sessionStorage.setItem('STATE_PARAM', JSON.stringify(response.data.response));
              this.setState({
                  clientId:response.data.response.clientId,
                  associationId : response.data.response.associationId,
                  brokerId :response.data.response.brokerId,
                  empid :response.data.response.empid,
                  fromAgent : response.data.response.fromAgent,
                  loader : false
              },()=>{
                  this.getClientDetails(this.state.clientId)
              })
                }
            });
        }
  
      
        componentWillUnmount() {
          window.removeEventListener('resize', this.updateWindowDimensions);
          
        } 
        updateWindowDimensions() {
          this.setState({ width: window.innerWidth, height: window.innerHeight });
        }
      
    
      

      
    render(){
        return(
          
           
           <div className='header'>
             {/* {this.state.loader ? <Loader /> : null}
                <div className="row">             
                    <div className="col-6 col-md-6">  
                         <img src={logo} className="left_logo"/>
                    </div>

                <div className="col-6 col-md-6 text-right">  
                {(this.state.association_logo != '' || this.state.association_logo != null)  ?
                        <img src={this.state.association_logo} className="right_logo"/>
                        :
                        <img src={require('../Assets/Images/AFA_logo_dummy.png')} className="right_logo"/>
                        
                        

                } 
                </div>

                </div> */}

                </div>
        



 
   
      
        )
    }
 

   
    
}
export default withRouter(Header);