import React, { Component } from "react";
import { Auth } from "aws-amplify";
import './style.css'
import Card from '@material-ui/core/Card';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Link } from 'react-router-dom';
import { getQueryParams } from './utils';
import Button from '@material-ui/core/Button';


export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.emailInput = React.createRef();
    this.passwordInput = React.createRef();
  }

  componentDidMount() {
    this.loadQueryParams();
  }

  loadQueryParams = () => {
    let queryParams = getQueryParams()

    if (queryParams.u && queryParams.p) {
      let userName = decodeURI(queryParams.u);
      let password = decodeURI(queryParams.p);
      this.emailInput.current.value = userName;
      this.passwordInput.current.value = password;

      let usernameObj = {
        target: {
          name: 'username',
          value: userName
        }
      }
      this.props.handleChange(usernameObj);

      let passwordObj = {
        target: {
          name: 'password',
          value: password
        }
      }
      this.props.handleChange(passwordObj)
    }
  }

  handleSubmit = (event) => {
    this.props.handleSubmit(event)
  }

  handleChange = (event) => {
    this.props.handleChange(event)
  }
  handleForgot = (event) => {
    console.log('inside handle logout')
    this.props.handleForgot(event)
  }

  render() {
    return (
      <div className="login">
        <CssBaseline />
        <Container maxWidth="xs">
          <Card className="login-card" style={{ marginTop: "50px" }}>

            <div className="logo">
              <img alt="logo" className="logo-custom" src={require('./images/netwell-logo.png')} />
            </div>
            <form onSubmit={this.handleSubmit.bind(this)} className="main-form">
              <h4 className="label-head">Sign in with your email and password</h4>
              <p className="a-errorMessage" hidden={this.props.errorMsg.length <= 0}>{this.props.errorMsg}</p>
              <div className="a-form-ctrl">
                <p className="">Email</p>
                <input ref={this.emailInput}
                  className="a-input"
                  type="text"
                  placeholder="Enter Email"
                  name="username"
                  value={this.props.userName}
                  required
                  onChange={this.handleChange.bind(this)}
                />
              </div>

              <div className="a-form-ctrl">
                <p className="">Password</p>
                <input ref={this.passwordInput}
                  className="a-input"
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={this.props.password}
                  required
                  onChange={this.handleChange.bind(this)}
                />
              </div>
              <span className="forgot-pawd" onClick={this.handleForgot.bind(this)}>Forgot your password?</span>

              <div>
                <button type="submit" className="a-btn" style={{color:'#ffffff',backgroundColor:'#4782c4'}} disabled={this.props.disableSiginBtn}>
                  Sign In
                </button>
                {/* <p style={{ textAlign: 'center' }}><span>Need an account?</span>&nbsp;
                <span className="forgot-pawd"><Link to={"/signup" + window.location.hash }>Sign Up</Link></span></p> */}
              </div>
            </form>

          </Card>

        </Container>
      </div>


       /* <div className="loginform">
          <form onSubmit={this.handleSubmit.bind(this)}>
            <div className="loginform_container">
              <div className="login_image_container">
                <img src={require('../authentication/images/image.png')} className="login_main_image"/>
                <img src={require('../authentication/images/auth-logo.jpg')} className="login_uhs_logo"/>
              </div>

              <div className="login_input_container">
                <div>
                  <input
                      type="text"
                      ref={this.emailInput}
                      placeholder="ENTER YOUR EMAIL"
                      name="username"
                      required
                      onChange={this.handleChange}
                      className="login_input_username"
                  />
                </div>

                <div>
                  <input
                      className="login_input_username"
                      type="password"
                      placeholder="ENTER YOUR PASSWORD"
                      name="password"
                      ref={this.passwordInput}
                      required
                      onChange={this.handleChange.bind(this)}
                  />
                </div>

                <Button
                    type="submit"
                    variant="contained"
                    color=""
                    class="login_button"
                    // onClick={() => this.validate()}
                    disabled={this.props.disableSiginBtn}
                >
                  SIGN IN
                </Button>


              </div>

              <p className="login_new_error_text" hidden={this.props.errorMsg.length <= 0}>{this.props.errorMsg}</p>

              {/!* <div class="loginmobile_forgot_text" onClick={this.handleForgot.bind(this)}>Forgot your password?</div> *!/}

              <div className="login_bottom_text">
                <div className="login_bottom_subtext"><Link to="/signup">Having trouble logging in?</Link></div>
                <div className="login_bottom_subtext">
                  <Link to="/check-registration">
                    <span className="login_plese_text">Please check </span>
                  </Link>

                  if your email has been registered on the portal.
                </div>
              </div>
            </div>
          </form>
        </div>*/

    )

  }
}
export default SignIn;
