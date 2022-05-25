import React, { Component } from "react";
import Loader from "../../../loader";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import customStyle from "../../../../Assets/CSS/stylesheet_UHS";
import Button from "@material-ui/core/Button";
import customeClasses from "../Eligibility.css";
import i18n from "../../../../i18next";
import CommonTable from "../../../CommonScreens/commonTable";
import axios from "axios";
import configurations from "../../../../configurations";
import { connect } from "react-redux";
import { Modal } from "react-bootstrap";
import {
  Table,
  TableCell,
  Paper,
  TableBody,
  TableHead,
  TableRow,
  Tooltip,
} from "@material-ui/core";
import "./addOnsScreen.css";

const ViewButton = withStyles(customStyle.viewBtn)(Button);
const StyledTableCell = withStyles((theme) => customStyle.tableCell)(TableCell);
const StyledTableRow = withStyles((theme) => customStyle.tableRow)(TableRow);
const ACSMCheckbox = withStyles({
  root: {
    color: "#162242",
    "&$checked": {
      color: "#162242",
    },
    "&$disabled": {
      color: "grey",
    },
  },
  checked: {},
  disabled: {
    color: "grey",
  },
})(Checkbox);

// const styles = (props) => customStyle.chkEligiScreen;
const styles = (props) => customStyle.netWellEligiScreen;


// const WizardButton = withStyles(customStyle.viewBtn)(Button);
const WizardButton = withStyles(customStyle.viewNetwellBtn)(Button);


// const ProceedButton = withStyles(customStyle.proceedBtn)(Button);
const ProceedButton = withStyles(customStyle.proceedNetwellBtn)(Button);


// const NextButton = withStyles(customStyle.NextButton)(Button);
const NextButton = withStyles(customStyle.NextButtonNetwell)(Button);

class AddOnsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      headerData: [],
      addOnsBodyData: [],
      loaderShow: false,
      progress: 0,
      count: null,
      tableData: [],
      healthTool: false,
      membersArr: [],
      addonFlow: [],
      popData: [],
      moreInfoModal: false,
      check: false,
      selectedAddon: "",
      display: "",
      RxEnable: true,
      RxSimpleShare: false,
      subID: JSON.parse(localStorage.getItem("CurrentLoginUser")).id,
      rxArray: [],
      setRxArray: [],
      rxModal: false,
    };
    this.addRxSimpleShare = this.addRxSimpleShare.bind(this);
    this.removeRxSimpleShare = this.removeRxSimpleShare.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    sessionStorage.setItem("current_screen", "5");
    this.setState({ loaderShow: true });
    axios
      .get(
        configurations.baseUrl +
        "/addon/getAddonListByClient/" +
        sessionStorage.getItem("CLIENT_ID")
      )
      .then((response) => {
        if (response && response.data.response.length > 0) {
          this.setState({
            addonFlow: response.data.response,
            count: 0,
          });
          if (response.data.response[0].addonName === "healthtool") {
            this.setState({
              selectedAddon: response.data.response[0].addonName,
              display: response.data.response[0].display,
              progress: (1 / response.data.response.length) * 100,
            });

            this.getSelectedAddon(response.data.response[0].addonName);
          }
          if (response.data.response[0].addonname === "rxsimpleshare") {
            this.setState({
              selectedAddon: response.data.response[0].addonname,
              display: response.data.response[0].display,
              progress: (1 / response.data.response.length) * 100,
              count: 0,
            });
            this.getSelectedAddon(response.data.response[0].addonName);
          }
        } else {
          this.setState({ loaderShow: false });
        }
      });
  }
  setTableData = (key, Tool) => {
    let obj = {
      subId: this.state.subID,
      key: key,
      value: Tool,
      memberIds: this.state.setRxArray,
    };
    this.setState({ loaderShow: true });
    axios
      .post(configurations.baseUrl + "/addon/getAddonData", obj)
      .then((response) => {
        // console.log(response.data.response.header)
        this.setState({
          tableData: response.data.response.header[0],
          addOnsBodyData: response.data.response.instruction[0],
          popData: response.data.response.popData[0],
          rxArray: response.data.response.memberIdList,
          loaderShow: false,
        });
        this.MemberIdSequence(
          response.data.response.memberIdList,
          this.state.setRxArray
        );
        this.newRxSimpleShareSelectAllAddon(key);
      });
  };
  newRxSimpleShareSelectAllAddon(key) {
    let obj = {
      subId: this.state.subID,
      key: key,
    };
    if (key === "rxsimpleshare") {
      axios
        .post(configurations.baseUrl + "/addon/getMemberAddon", obj)
        .then((response) => {
          if (response && response.data.response === null) {
            for (var i = 0; i < this.state.tableData.body.length - 1; i++)
              this.addRxSimpleShare(i);
          }
        });
    }
  }
  MemberIdSequence = (allMemberId, checkedMemberId) => {
    if (allMemberId && allMemberId.length > 0) {
      let finalArr = [];
      allMemberId.forEach(function (memId) {
        let findId = checkedMemberId.find((obj) => obj == memId);
        if (findId) {
          finalArr.push(findId);
        } else {
          finalArr.push("");
        }
      });
      this.setState({ setRxArray: finalArr });
      // console.log(finalArr);
    }
  };
  getSelectedAddon = (key) => {
    let obj = {
      subId: this.state.subID,
      key: key,
    };
    axios
      .post(configurations.baseUrl + "/addon/getMemberAddon", obj)
      .then((response) => {
        if (response && response.data.response !== null) {
          if (key === "healthtool") {
            this.setState({
              healthTool: response.data.response.flag,
            });
            this.setTableData(key, response.data.response.flag);
          } else if (key === "rxsimpleshare") {
            var memberselect = response.data.response.memberIds;
            // console.log(memberselect.split(",").map(Number))
            this.setState({
              setRxArray: memberselect.split(",").map(Number),
              RxSimpleShare: response.data.response.flag,
            });
            this.setTableData(key, response.data.response.flag);
          } else if (key === "review") {
            this.setTableData(key, true);
          }
        } else {
          this.setTableData(key, true);
          if (key === "healthtool")
            this.setState({
              healthTool: true,
            });
          else if (key === "rxsimpleshare") {
            this.setState({
              RxSimpleShare: true,
            });
          }
        }
      });
  };
  handleBack = () => {
    this.setState({
      loaderShow: true,
    });
    if (this.state.count < this.state.addonFlow.length) {
      this.state.count = this.state.count - 1;
      if (
        this.state.addonFlow[this.state.count].addonName === "rxsimpleshare"
      ) {
        this.setState({
          selectedAddon: this.state.addonFlow[this.state.count].addonName,
          display: this.state.addonFlow[this.state.count].display,
          progress:
            ((this.state.count + 1) / this.state.addonFlow.length) * 100,
        });
        this.setTableData(
          this.state.addonFlow[this.state.count].addonName,
          this.state.RxSimpleShare
        );
      } else if (
        this.state.addonFlow[this.state.count].addonName === "healthtool"
      ) {
        this.setState({
          selectedAddon: this.state.addonFlow[this.state.count].addonName,
          display: this.state.addonFlow[this.state.count].display,
          progress:
            ((this.state.count + 1) / this.state.addonFlow.length) * 100,
        });
        this.setTableData(
          this.state.addonFlow[this.state.count].addonName,
          this.state.healthTool
        );
      } else if (
        this.state.addonFlow[this.state.count].addonName === "review"
      ) {
        this.setState({
          loaderShow: false,
          selectedAddon: this.state.addonFlow[this.state.count].addonName,
          display: this.state.addonFlow[this.state.count].display,
          progress:
            ((this.state.count + 1) / this.state.addonFlow.length) * 100,
        });
        this.setTableData(
          this.state.addonFlow[this.state.count].addonName,
          true
        );
      }
    }
  };

  handleNext = () => {
    this.setState({ loaderShow: true });
    let length = this.state.tableData.body.length;
    let total = this.state.tableData.body[length - 1].amount;
    var amount = total.split("$");
    var memberIDs = this.state.setRxArray.filter((item) => item);
    if (this.state.count < this.state.addonFlow.length) {
      var obj = {
        subId: this.state.subID,
        addonName: this.state.addonFlow[this.state.count].addonName,
        amount: amount[1] !== undefined ? amount[1] : 0,
        memberIds: memberIDs.toString(),
      };
      if (this.state.addonFlow[this.state.count].addonName === "healthtool") {
        obj.flag = this.state.healthTool;
      } else if (
        this.state.addonFlow[this.state.count].addonName === "rxsimpleshare"
      ) {
        obj.flag = this.state.RxSimpleShare;
      }
      if (
        this.state.addonFlow[this.state.count].addonName === "rxsimpleshare" &&
        this.state.RxSimpleShare &&
        memberIDs.length === 0
      ) {
        this.setState({ rxModal: true, loaderShow: false });
      } else {
        axios
          .post(configurations.baseUrl + "/addon/saveAddon", obj)
          .then((response) => {
            this.state.count = this.state.count + 1;
            if (
              this.state.addonFlow[this.state.count].addonName ===
              "rxsimpleshare"
            ) {
              this.setState({
                selectedAddon: this.state.addonFlow[this.state.count].addonName,
                display: this.state.addonFlow[this.state.count].display,
                progress:
                  ((this.state.count + 1) / this.state.addonFlow.length) * 100,
              });
              this.getSelectedAddon(
                this.state.addonFlow[this.state.count].addonName
              );
            }
            if (
              this.state.addonFlow[this.state.count].addonName === "healthtool"
            ) {
              this.setState({
                selectedAddon: this.state.addonFlow[this.state.count].addonName,
                display: this.state.addonFlow[this.state.count].display,
                progress:
                  ((this.state.count + 1) / this.state.addonFlow.length) * 100,
              });
              this.setTableData(
                this.state.addonFlow[this.state.count].addonName,
                this.state.healthTool
              );
            }
            if (this.state.addonFlow[this.state.count].addonName === "review") {
              this.setState({
                selectedAddon: this.state.addonFlow[this.state.count].addonName,
                display: this.state.addonFlow[this.state.count].display,
                progress:
                  ((this.state.count + 1) / this.state.addonFlow.length) * 100,
              });
              this.getSelectedAddon(
                this.state.addonFlow[this.state.count].addonName
              );
            }
          });
      }
    }
  };

  handleProceed = () => {
    this.props.onClick();
  };

  handleAddOnsValue = (e) => {
    this.setState({ loaderShow: true });
    let healthTools = e.target.checked;
    let obj = {
      subId: this.state.subID,
      key: "healthtool",
      value: healthTools,
      memberIds: [],
    };
    axios
      .post(configurations.baseUrl + "/addon/getAddonData", obj)
      .then((response) => {
        this.setState({
          healthTool: healthTools,
          tableData: response.data.response.header[0],
          loaderShow: false,
        });
      });
  };
  handleAddRxSimpleShare(e) {
    this.setState({ loaderShow: true });
    let RxSimpleShare = e.target.checked;
    let obj = {
      subId: this.state.subID,
      key: "rxsimpleshare",
      value: RxSimpleShare,
      memberIds: this.state.setRxArray,
    };
    axios
      .post(configurations.baseUrl + "/addon/getAddonData", obj)
      .then((response) => {
        this.setState({
          RxSimpleShare: RxSimpleShare,
          tableData: response.data.response.header[0],
          loaderShow: false,
        });
        if (RxSimpleShare) {
          for (var i = 0; i < this.state.tableData.body.length - 1; i++)
            this.addRxSimpleShare(i);
        }
      });
    if (RxSimpleShare) {
      this.setState({ RxEnable: false });
    } else this.setState({ RxEnable: true, check: false });
  }
  addRxSimpleShare = (i) => {
    // console.log(i)
    this.setState({
      loaderShow: true,
    });
    this.state.setRxArray[i] = this.state.rxArray[i];
    // console.log(this.state.setRxArray)
    let obj = {
      subId: this.state.subID,
      key: "rxsimpleshare",
      value: true,
      memberIds: this.state.setRxArray,
    };
    axios
      .post(configurations.baseUrl + "/addon/getAddonData", obj)
      .then((response) => {
        this.setState({
          tableData: response.data.response.header[0],
          loaderShow: false,
        });
      });
  };
  removeRxSimpleShare = (i) => {
    // console.log(i)
    this.setState({
      loaderShow: true,
    });
    this.state.setRxArray[i] = "";

    let obj = {
      subId: this.state.subID,
      key: "rxsimpleshare",
      value: true,
      memberIds: this.state.setRxArray,
    };
    axios
      .post(configurations.baseUrl + "/addon/getAddonData", obj)
      .then((response) => {
        this.setState({
          tableData: response.data.response.header[0],
          loaderShow: false,
        });
      });
    if (
      this.state.setRxArray.filter((item) => item).length === 0 &&
      this.state.RxSimpleShare
    ) {
      this.state.RxSimpleShare = false;
    }
  };
  healthToolFlyerLink = () => {
    var windowReference = window.open();
    windowReference.location =
      "https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-Health-Tools-Flyer.pdf";
  };
  rxSimpleShareFlyerLink = () => {
    var windowReference = window.open();
    windowReference.location =
      "https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/UHF-Agent/UHS-RxSimpleShare-Flyer.pdf";
  };

  render() {
    const { classes } = this.props;
    let currentScreen;
    if (this.state.count !== null) {
      switch (this.state.selectedAddon) {
        case "healthtool":
          currentScreen = (
            <Grid
              spacing={2}
              id="1"
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Grid item xs={12} sm={12} md={7} lg={7} id="2">
                <Grid item xs={12} sm={12} id="3" style={{ paddingRight: window.innerWidth > 720 ? 50 : 0 }}>
                  <div style={{ textAlign: "justify", width: "100%" }}>
                    {this.state.addOnsBodyData.description}
                  </div>
                </Grid>
                {this.state.count !== this.state.addOnsBodyData.length - 1 && (
                  <>
                    <Grid item xs={12} sm={12}>
                      <WizardButton
                        variant="contained"
                        style={{ marginTop: "15px" }}
                        onClick={() => this.healthToolFlyerLink()}
                      >
                        More Info
                      </WizardButton>
                    </Grid>
                    <Grid
                      item
                      xs={12}
                      sm={12}
                      md={6}
                      style={{ marginTop: "10px", paddingRight: 10 }}
                    >
                      <ACSMCheckbox
                        checked={this.state.healthTool}
                        inputProps={{
                          "aria-label": "secondary checkbox",
                        }}
                        style={{ marginLeft: "-11px" }}
                        onClick={(event) => this.handleAddOnsValue(event)}
                      />
                      <div style={customStyle.acsmCheckBox}>
                        Add <b>UHS Health Tools</b>
                      </div>
                      <br />
                    </Grid>
                  </>
                )}
              </Grid>

              <Grid item xs={12} sm={5} md={5} lg={5} id="4">
                <div
                  className="addOnTable smallTable"
                  style={{ marginLeft: "0" }}
                >
                  {this.state.tableData.body && (
                    <div style={{ overflowX: "auto", marginLeft: window.innerWidth > 720 ? '3vw' : 0, marginRight: window.innerWidth > 720 ? '3vw' : 0 }}>
                      <CommonTable
                        healthTool={true}
                        familyTotal={this.state.healthTool}
                        quoteData={this.state.tableData.body}
                        check={true}
                        headerData={this.state.tableData.header}
                        tooltip={[]}
                        quickQuote={false}
                        totalReq={true}
                      />
                    </div>
                  )}
                </div>
              </Grid>
            </Grid>
          );
          break;
        case "rxsimpleshare":
          currentScreen = (
            <Grid
              spacing={2}
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Grid item xs={12} sm={7} md={7} lg={7}>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  style={{ paddingRight: window.innerWidth > 720 ? 50 : 0 }}
                >
                  <div style={{ textAlign: "justify", width: "100%" }}>
                    {this.state.addOnsBodyData.description &&
                      this.state.addOnsBodyData.description}
                    &nbsp;{" "}
                    <a
                      target="_blank"
                      href="http://findrx.universalhealthfellowship.org"
                    >
                      http://findrx.universalhealthfellowship.org
                    </a>
                    <p style={{ margin: "10px 0 0 0" }}>
                      RxSimpleShare is available to each member of the family,
                      as long as at least one adult enrolls, for $25 per person
                      per month.
                    </p>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <WizardButton
                    variant="contained"
                    style={{ marginTop: "15px" }}
                    onClick={() => this.rxSimpleShareFlyerLink()}
                  >
                    More Info
                  </WizardButton>
                </Grid>
                <Grid item xs={12} sm={12} style={{ marginTop: "10px" }}>
                  <ACSMCheckbox
                    checked={this.state.RxSimpleShare}
                    inputProps={{
                      "aria-label": "secondary checkbox",
                    }}
                    style={{ marginLeft: "-11px" }}
                    onClick={(event) => this.handleAddRxSimpleShare(event)}
                  />
                  <div style={customStyle.acsmCheckBox}>
                    Add <b>UHS RxSimpleShare</b>
                  </div>
                  <br />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={5} md={5} lg={5}>
                <div
                  className="addOnTable smallTable"
                  style={{
                    marginLeft: window.innerWidth > 720 ? '3vw' : 0, marginRight: window.innerWidth > 720 ? '3vw' : 0,
                    overflowX: "auto",
                  }}
                >
                  <CommonTable
                    RxSimpleShare={true}
                    addRxSimpleShare={(i) => this.addRxSimpleShare(i)}
                    removeRxSimpleShare={(i) => this.removeRxSimpleShare(i)}
                    RxEnable={this.state.RxSimpleShare}
                    quoteData={this.state.tableData.body}
                    check={true}
                    headerData={this.state.tableData.header}
                    tooltip={[]}
                    quickQuote={false}
                    totalReq={true}
                  />
                </div>
              </Grid>
            </Grid>
          );
          break;
        case "review":
          currentScreen = (
            <Grid
              spacing={2}
              id="1"
              xs={12}
              sm={12}
              md={12}
              lg={12}
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
                // alignItems: "center",
              }}
            >
              <Grid item xs={12} sm={5} md={5} lg={5}>
                <Grid item xs={12} sm={12} style={{ paddingRight: window.innerWidth > 720 ? 50 : 0 }}>
                  <div style={{ textAlign: "justify", width: "100%" }}>
                    {this.state.addOnsBodyData.description &&
                      this.state.addOnsBodyData.description}
                  </div>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={7} md={7} lg={7}>
                <div
                  className="reivewTable reviewAddon"
                  style={{ width: "100%", overflowX: "auto"}}
                >
                  <CommonTable
                    quoteData={this.state.tableData.body}
                    check={true}
                    headerData={this.state.tableData.header}
                    tooltip={[]}
                    quickQuote={false}
                    totalReq={true}
                  />
                </div>
              </Grid>
            </Grid>
          );
          break;
        default:
          currentScreen = <Grid spacing={2}></Grid>;
      }
    }

    return (
      <div style={{ flexGrow: 1 }}>
        {this.state.loaderShow ? <Loader></Loader> : ""}
        <Grid
          style={{
            fontFamily: "Roboto, Arial, Helvetica, sans-serif",
            fontSize: "14px",
          }}
        >
          <Grid item xs={12}>
            <Typography color="inherit" style={{ fontWeight: "bold" }}>
              {" "}
              {this.state.addOnsBodyData.title &&
                this.state.addOnsBodyData.title}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <div style={{ width: "100%" }}>
              <LinearProgress
                variant="determinate"
                classes={{
                  colorPrimary: classes.colorPrimary,
                  barColorPrimary: classes.barColorPrimary,
                }}
                style={{ ...classes.progress, flexBasis: "97%" }}
                value={this.state.progress}
              />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {currentScreen}
          </Grid>
          <Grid item xs={12} sm={6} style={{ marginTop: "15px" }}>
            <Grid container spacing={3}>
              <Grid item xs={4} sm={2}>
                <WizardButton
                  disabled={this.state.count === 0}
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={this.handleBack}
                >
                  BACK
                </WizardButton>
              </Grid>
              <Grid
                item
                xs={4}
                sm={2}
                hidden={this.state.count === this.state.addonFlow.length - 1}
              >
                <WizardButton
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={this.handleNext}
                >
                  NEXT
                </WizardButton>
              </Grid>
              <Grid item xs={4} sm={3}>
                <ProceedButton
                  disabled={false}
                  hidden={this.state.count !== this.state.addonFlow.length - 1}
                  variant="contained"
                  style={{ width: "100%" }}
                  onClick={this.handleProceed}
                >
                  PROCEED
                </ProceedButton>
                {/*style={{width: '104px', height: '40px'}}*/}
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Modal
          size="lg"
          show={this.state.moreInfoModal}
          onHide={() => this.setState({ moreInfoModal: false })}
          backdrop="static"
          centered
        >
          <Modal.Header>
            <Modal.Title>
              {this.state.popData && this.state.popData.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              fontSize: "14px",
              textAlign: "justify",
            }}
          >
            {this.state.popData && this.state.popData.description}
          </Modal.Body>
          <Modal.Footer>
            <NextButton onClick={() => this.setState({ moreInfoModal: false })}>
              {i18n.t("BUTTON.OK")}
            </NextButton>
          </Modal.Footer>
        </Modal>

        <Modal
          show={this.state.rxModal}
          onHide={() => this.setState({ rxModal: false })}
          backdrop="static"
          centered
        >
          <Modal.Header style={customStyle.modal_header}>
            <Modal.Title style={{ color: "white" }}>Warning !</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              fontSize: "14px",
              textAlign: "justify",
            }}
          >
            Please select family members to get this Add-On.
          </Modal.Body>
          <Modal.Footer>
            <Grid item xs={4} sm={2}>
              <ViewButton
                variant="contained"
                style={{ width: "100%" }}
                onClick={() => this.setState({ rxModal: false })}
              >
                Done
              </ViewButton>
            </Grid>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
  handleAddOn() {
    if (!this.state.check) this.setState({ check: true });
    else this.setState({ check: false });
  }
}

const mapStateToProps = (state) => {
  return {
    subId: state.subId,
    email: state.email,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(AddOnsScreen));

const Reviewtable = {
  header: ["Family Member", "Health Tools", "RxSimpleShare", "Add-Ons Total"],
  body: [
    {
      "Family Member": "John Doe",
      "Health Tools": "NA",
      RxSimpleShare: "$25.00",
      "Add-Ons Total": "$25.00",
    },
    {
      "Family Member": "Jane Doe",
      "Health Tools": "NA",
      RxSimpleShare: "-",
      "Add-Ons Total": "-",
    },
    {
      "Family Member": "Jim Doe",
      "Health Tools": "NA",
      RxSimpleShare: "$25.00",
      "Add-Ons Total": "$25.00",
    },
    {
      "Family Total": "Family Total",
      "Health Tools": "$25.00",
      RxSimpleShare: "$50.00",
      "Add-Ons Total": "$1.00",
    },
  ],
};
