import React, { Component } from "react";
import styles from "../../../Assets/CSS/stylesheet_UHS";
import Grid from "@material-ui/core/Grid";
import Config from "../../../configurations";
import { connect } from "react-redux";
import { Auth } from "aws-amplify";
import { Link } from "react-router-dom";
import axios from "axios";
import configuration from "../../../configurations";
import Loader from "../../loader";
import Configuration from "../../../configurations";
import Cookies from "universal-cookie";
import style from "./Header.module.css";

const cookies = new Cookies();

let LoginRightNetwell = {
  // width: "200px",
  // height: "24px",
  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
  fontWeight: "bold",
  fontStretch: "normal",
  fontStyle: "normal",
  lineHeight: "1.5",
  letterSpacing: "0.15px",
  color: "#162242",
  fontSize: "1em",
  display: "flex",
  marginLeft: "25px",
  //  '@media (max-width: 500px)': {
  //     display: 'none',
  //   }
};

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: false,
      loaderShow: false,
      association_logo: "",
      isAgent: sessionStorage.getItem("isAgent"),
      fromMember: false,
      isResponsiveView: false,
    };
  }

  componentDidMount() {
    this.state.isLogged = sessionStorage.getItem("isLogged");
    let cookiesData = JSON.parse(sessionStorage.getItem("STATE_PARAM")); //cookies.get('STATE_PARAM', false);
    if (cookiesData && cookiesData.fromMember) {
      this.setState({ fromMember: true });
    }

    let data = {
      clientId: sessionStorage.getItem("CLIENT_ID"),
    };
    console.log("----------------------------------");
    console.log(data.clientId);
    this.setState({
      isAgent: sessionStorage.getItem("isAgent")
        ? sessionStorage.getItem("isAgent")
        : false,
    });
    axios
      .post(Configuration.baseUrl + "/enrollment/getClient", data)
      .then((response) => {
        if (response.data.response) {
          this.setState({
            // association_logo : response.data.response.image
          });
        }
      });
  }

  logoutHandler = (event) => {
    this.setState({
      loaderShow: true,
    });
    let currentScreen = sessionStorage.getItem("current_screen");
    axios
      .get(
        configuration.baseUrl +
          "/enrollment/saveCompletionStatus/" +
          this.props.subId +
          "/" +
          currentScreen
      )
      .then((response) => {
        if (response && response.data.code === 200) {
          Auth.signOut();
          localStorage.clear();
          sessionStorage.removeItem("STATE_PARAM");
          sessionStorage.removeItem("STATE_VAL");
          sessionStorage.removeItem("CLIENT_ID");
          sessionStorage.removeItem("CHAT_BOX_Id");
          localStorage.setItem("isLogged", false);
          sessionStorage.setItem("isLogged", false);
          cookies.remove("STATE_PARAM", { path: "/" });
          window.location.href = "/login"; // + + window.location.hash
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleClose = () => {
    let cookiesData = JSON.parse(
      sessionStorage.getItem("STATE_PARAM")
    ).fromNative;
    if (cookiesData) {
      this.logoutHandler(); //for native mobile APP
    } else {
      window.close();
    }
  };

  goToDashboard = () => {
    this.setState({
      loaderShow: true,
    });

    let currentScreen = sessionStorage.getItem("current_screen");

    // if(sessionStorage.getItem('prev_current_screen') || sessionStorage.getItem('prev_current_screen') != null ){
    //     currentScreen = sessionStorage.getItem('prev_current_screen')
    // }

    if (
      sessionStorage.getItem("isEditCensus") == true ||
      sessionStorage.getItem("isEditCensus") == "true"
    ) {
      window.close();
    } else if (currentScreen) {
      axios
        .get(
          configuration.baseUrl +
            "/enrollment/saveCompletionStatus/" +
            this.props.subId +
            "/" +
            currentScreen
        )
        .then((response) => {
          if (response && response.data.code === 200) {
            sessionStorage.removeItem("STATE_PARAM");
            sessionStorage.removeItem("STATE_VAL");
            sessionStorage.removeItem("CLIENT_ID");
            sessionStorage.removeItem("CHAT_BOX_Id");
            cookies.remove("STATE_PARAM", { path: "/" });
            window.close();
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      window.close();
    }
  };

  signUpHandler = () => {
    sessionStorage.removeItem("CHAT_BOX_Id");
    sessionStorage.removeItem("CLIENT_ID");
    window.location.href = "/signup" + window.location.hash;
  };

  loginHandler = () => {
    sessionStorage.removeItem("CHAT_BOX_Id");
    sessionStorage.removeItem("CLIENT_ID");
    window.location.href = "/login" + window.location.hash;
  };

  render() {
    console.log("style", style);
    let currentScreen = "";
    this.state.isLogged = sessionStorage.getItem("isLogged");
    if (
      this.state.isLogged === "true" ||
      this.state.isLogged === true ||
      this.state.isAgent === "true" ||
      this.state.isAgent === true ||
      this.state.fromMember == true
    ) {
      if (
        window.location.pathname === "/quick_quote" ||
        window.location.pathname === "/quick_quote2"
      ) {
        currentScreen = (
          <div style={styles.LoginWrp}>
            <div style={styles.HeaderWrp}>
              <Grid xs={6} style={styles.HeaderRightWrp} item={true}>
                <span style={styles.LoginRight}>Quick Quote</span>
              </Grid>
              <Grid xs={6} style={styles.HeaderLeftWrp} item={true}>
                {(this.state.isAgent === "false" ||
                  this.state.isAgent === false) && (
                  <div style={{ display: "inline-flex" }}>
                    <span style={styles.LoginLeft} onClick={this.loginHandler}>
                      LOGIN
                    </span>
                    <span style={styles.LoginLeft} onClick={this.signUpHandler}>
                      SIGN UP
                    </span>
                  </div>
                )}
              </Grid>
            </div>
          </div>
        );
      } else {
        currentScreen = (
          <div style={styles.LoginWrpNetwell}>
            <div style={styles.HeaderWrp}>
              <Grid style={styles.HeaderRightWrp} item={true}>
                <span className={style.LoginRightNetwell}>
                  Member Enrollment
                </span>
              </Grid>
              <Grid style={styles.HeaderLeftWrpNetwell} item={true}>
                {this.state.isAgent === "true" ||
                this.state.isAgent === true ? (
                  // <span style={styles.goToDashboardBtn} onClick={this.goToDashboard}>GO TO DASHBOARD</span>
                  // <span  onClick={this.goToDashboard}>GO TO DASHBOARD</span>
                  <span onClick={this.goToDashboard}>GO TO DASHBOARD</span>
                ) : this.state.fromMember == true ? (
                  // <span style={styles.goToDashboardBtn} onClick={this.handleClose}>CLOSE</span>
                  <span onClick={this.handleClose}>CLOSE</span>
                ) : (
                  // <span style={styles.LoginLeft} onClick={this.logoutHandler}>LOGOUT</span>
                  <span onClick={this.logoutHandler}>LOGOUT</span>
                )}
              </Grid>
            </div>
          </div>
        );
      }
    } else if (
      window.location.pathname === "/quick_quote" ||
      window.location.pathname === "/quick_quote2"
    ) {
      currentScreen = (
        <div style={styles.LoginWrp}>
          <div style={styles.HeaderWrp}>
            <Grid xs={6} style={styles.HeaderRightWrp} item={true}>
              <span style={styles.LoginRight}>Quick Quote</span>
            </Grid>
            <Grid xs={6} style={styles.HeaderLeftWrp} item={true}>
              {(this.state.isAgent === "false" ||
                this.state.isAgent === false) && (
                <div style={{ display: "inline-flex" }}>
                  {/* <span style={styles.LoginLeft} onClick={this.loginHandler}>LOGIN</span> */}
                  <span onClick={this.loginHandler}>LOGIN</span>
                  {/*  <span style={styles.LoginLeft} onClick={this.signUpHandler}>SIGN UP</span> */}{" "}
                  {/* Hide for Temperary */}
                </div>
              )}
            </Grid>
          </div>
        </div>
      );
    }

    return (
      <div>
        {this.state.loaderShow ? <Loader></Loader> : ""}
        <div style={{ backgroundColor: "#ffffff" }}>
          <div style={styles.HeaderWrp}>
            <Grid xs={6} style={styles.HeaderRightWrp} item={true}>
              {/* <img style={styles.HeaderRightLogo} src={require('../../../Assets/Images/UHS Logo.png')} /> */}
              <img
                style={styles.netWellLogo}
                src={require("../../../Assets/Images/netwell-logo.png")}
              />
            </Grid>
            <Grid xs={6} style={styles.HeaderLeftWrp} item={true}>
              <span style={styles.HeaderLeftText}>
                {/* Association Logo */}
                {/* {
                                    this.state.association_logo !== null ?
                                        <img style={styles.HeaderLeftLogo} src={this.state.association_logo} />
                                    :
                                        <img style={styles.HeaderLeftLogo} src={require('../../../Assets/Images/AFA_logo_dummy.png')} />
                                } */}
              </span>
            </Grid>
          </div>
        </div>
        {currentScreen}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subId: state.subId,
    userName: state.userName,
    isLogged: sessionStorage.getItem("isLogged"),
  };
};

export default connect(mapStateToProps)(Header);
