import DateFnsUtils from "@date-io/date-fns";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import axios from "axios";
import moment from "moment";
import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import "../../../Assets/CSS/common.css";
import customStyle from "../../../Assets/CSS/stylesheet_UHS";
import {
  default as configuration,
  default as configurations
} from "../../../configurations";
import i18n from "../../../i18next";
import CommonDropDwn from "../../CommonScreens/CommonDropDwn";
import Sample from "../../CommonScreens/sampleTextField";
import Loader from "../../loader";
import CustomeCss from "./SetupPayment.css.js";

var convert = require("xml-js");

const CssTextField = withStyles(() => ({
  root: {
    "& .MuiInput-root": {
      "&:hover:not($disabled):not($focused):not($error):before": {
        borderBottom: "2px solid #533278",
      },

      "&.MuiInput-underline.Mui-focused:after": {
        borderBottom: "2px solid #533278",
      },
    },
  },
}))(TextField);

const AntTabs = withStyles(customStyle.tabs)(Tabs);

const AntTab = withStyles((theme) => customStyle.tab)((props) => (
  <Tab disableRipple {...props} />
));

// const NextButton = withStyles(customStyle.NextButton)(Button);
const NextButton = withStyles(customStyle.NextButtonNetwell)(Button);

// const CustomeButton = withStyles(customStyle.viewBtn)(Button);
const CustomeButton = withStyles(customStyle.viewNetwellBtn)(Button);


const CrudButton = withStyles(customStyle.crudBtn)(Fab);

const style = {
  flexGrow: 1,
};

const styles = (props) => customStyle.chkEligiScreen;

const PurpleRadio = withStyles(customStyle.radioBtn)((props) => (
  <Radio color="default" {...props} />
));

class SetupPayment extends React.Component {
  constructor(props) {
    super(props);
    let mon = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    this.state = {
      activeTab: 0,
      months: mon,
      years: [2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031],
      day: [],
      accountTypes: [],
      bankName: "",
      accountName: "",
      accountType: "",
      routingNo: "",
      accountNumber: "",
      cardNumber: "",
      holderName: "",
      expiryMonth: "",
      expiryYear: "",
      monthlyDebitDay: "",
      cvv: "",
      paymentType: "",
      disabled: true,
      disabled2: true,
      addDisable: true,
      addDisable1: true,
      paymentData: [],
      preferedType: "",
      ccChecked: false,
      achChecked: false,
      successModal: false,
      responseCode: null,
      errMsg: "",
      addressModal: false,
      userAddress: {
        postalCode: "",
        street: "",
        city: "",
        state: "",
        country: "",
      },
      validMonth: false,
      targetDateModal: false,
      storedTranModal: false,
      waitingRes: "",
      confirmPaymentErrorFlag: false,
      accountNo: "",
      sourceId: "",
      nextRecurringDate: "",
      draftDayModal: false,
      draftDaySelected: "",
      memberPlanInfo: "",
      effectivePaymentDate: "",
      firstPaymentDate: "",
      firstPaymentAmount: "",
      todayDate: "",
      initialApplicationFee: "",
      STATE_PARAM: JSON.parse(sessionStorage.getItem("STATE_PARAM")),
      subsequentPaymentDate: "",
      beforeEffectiveDate: null,
      effectiveDateModal: false,
      beforeEffectiveDateFlag: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (sessionStorage.getItem("notHLC") === "true")
      sessionStorage.setItem("current_screen", "7");
    else {
      sessionStorage.setItem("current_screen", "6");
    }
    this.setState({
      loaderShow: true,
    });
    this.getSourceID(); // for storeTransaction by namita
    // this.getAccountNumber()
    fetch(configuration.baseUrl + "/setuppayment/getAccountType")
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          accountTypes: response.response,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    fetch(
      configuration.baseUrl +
        "/setupfamily/getPrimaryMember/" +
        this.props.subId
    )
      .then((response) => response.json())
      .then((response) => {
        let todaysDate = new Date(response.response.effectiveDate);
        let days = todaysDate.getDate();
        let arr = [];

        for (let i = 1; i <= days; i++) {
          arr.push(i);
        }
        this.setState({
          accountName:
            response.response.firstName + " " + response.response.lastName,
          holderName:
            response.response.firstName + " " + response.response.lastName,
          day: arr,
          monthlyDebitDay: days,
        });
      })
      .catch((error) => {
        console.log(error);
      });

    /*fetch(configuration.baseUrl + '/setuppayment/getPreferedType/'+ this.props.subId )
            .then((response) => response.json())
            .then(response => {
                if(response.response.preferedType ==='ACH'){
                    this.setState({
                        achChecked:true,
                     });

                }else if(response.response.preferedType ==='CC'){
                    this.setState({
                        ccChecked:true,
                     });

                }
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    preferedType : '',
                    loaderShow: false,
                    //activeTab: newValue,
                    refresh : true
                });
            });*/

    fetch(
      configuration.baseUrl +
        "/setuppayment/getPaymentDetails/" +
        this.props.subId
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.response) {
          this.getPaymentData(response.response.paymentType);
          let montlyDay = new Date(response.response.monthlyDebitDay).getDate();
          if (response.response.paymentType === "ACH") {
            this.setState({
              //achChecked:true,
              activeTab: 0,
            });
          } else if (response.response.paymentType === "CC") {
            this.setState({
              //ccChecked:true,
              activeTab: 1,
            });
          }

          this.setState(
            {
              bankName: response.response.bankName,
              accountName: response.response.accountName,
              accountType: response.response.accountType,
              routingNo: response.response.routingNo,
              accountNumber: response.response.accountNumber,
              cardNumber: response.response.cardNumber,
              holderName: response.response.holderName,
              expiryMonth: response.response.expiryMonth
                ? moment.monthsShort(
                    parseInt(response.response.expiryMonth) - 1
                  )
                : "",
              expiryYear: response.response.expiryYear,
              monthlyDebitDay: montlyDay,
              cvv: response.response.cvv,
              paymentType: response.response.paymentType,
              preferedType: response.response.preferedType,
            },
            () => this.validateForm()
          );
        } else {
          let paymentType = "";
          if (this.state.activeTab === 0) {
            paymentType = "ACH";
          } else {
            paymentType = "CC";
          }
          this.getPaymentData(paymentType);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    if (this.props.isChangeProgram || this.props.isHouseholdUpdate) {
      this.setState({ loaderShow: true });
      var memberID = JSON.parse(sessionStorage.getItem("STATE_PARAM")).memberId;
      axios
        .get(
          configurations.transactionURL +
            "/adminportal/getRecurringDate/" +
            memberID
        )
        .then((respone) => {
          let recurringDate = moment(respone.data.response.recurringDate)
            .utc()
            .format("MMMM DD, YYYY");
          this.setState({
            nextRecurringDate: recurringDate,
            loaderShow: false,
          });
        });
    }
  }

  getPaymentData = (paymentType) => {
    let PAYMENT_ERROR = JSON.parse(localStorage.getItem("PAYMENT_ERROR"));
    fetch(
      configuration.baseUrl +
        "/setuppayment/setupPaymentList/" +
        this.props.subId +
        "/" +
        paymentType +'/Netwell'
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState({
          paymentData: response.response,
        });

        if (PAYMENT_ERROR) {
          if (PAYMENT_ERROR.responseCode === 203) {
            this.setState(PAYMENT_ERROR);
          } else if (PAYMENT_ERROR.responseCode === 500) {
            this.setState(PAYMENT_ERROR);
          }
        }

        this.setState(
          {
            loaderShow: false,
            disabled: false,
            disabled2: false,
            paymentData: response.response,
          },
          () => this.validateForm()
        );
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          loaderShow: false,
        });
      });
  };

  handleChange = (event, newValue) => {
    this.setState({
      loaderShow: true,
      refresh: true,
    });
    let flag;
    if (newValue === 0) {
      flag = "ACH";
    } else {
      flag = "CC";
    }

    fetch(
      configuration.baseUrl +
        "/setuppayment/setupPaymentList/" +
        this.props.subId +
        "/" +
        flag +'/Netwell'
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState(
          {
            paymentData: response.response,
            loaderShow: false,
            activeTab: newValue,
            refresh: true,
          },
          () => {
            if (flag === "CC") {
              this.changeTextFieldHandler(this.state.expiryMonth, true, {
                label: "expiryMonth",
                val: this.state.expiryYear,
              });
            } else {
              this.validateForm();
            }
          }
        );
      })
      .catch((error) => {
        console.log(error);
        this.setState(
          {
            paymentData: [],
            loaderShow: false,
            activeTab: newValue,
            refresh: true,
          },
          () => this.validateForm()
        );
      });
  };

  changeTextFieldHandler = (val, isValid, parentObj) => {
    if (parentObj.label === "bank_name") {
      if (isValid) {
        this.state.bankName = val;
      } else {
        this.state.bankName = "";
      }
    } else if (parentObj.label === "Account_Name") {
      if (isValid) {
        this.state.accountName = val;
      } else {
        this.state.accountName = "";
      }
    } else if (parentObj.label === "Routing_Number") {
      if (isValid) {
        this.state.routingNo = val;
      } else {
        this.state.routingNo = "";
      }
    } else if (parentObj.label === "Account_Number") {
      if (isValid) {
        this.state.accountNumber = val;
      } else {
        this.state.accountNumber = "";
      }
    } else if (parentObj.label === "Account_Type") {
      if (isValid) {
        this.state.accountType = val;
      } else {
        this.state.accountType = "";
      }
    } else if (parentObj.label === "Card_Number") {
      if (isValid) {
        this.state.cardNumber = val;
      } else {
        this.state.cardNumber = "";
      }
    } else if (parentObj.label === "Holder_Name") {
      if (isValid) {
        this.state.holderName = val;
      } else {
        this.state.holderName = "";
      }
    } else if (parentObj.label === "expiryMonth") {
      if (isValid) {
        let currentDate = new Date();
        let month = currentDate.getMonth() + 1;
        let year = currentDate.getFullYear();
        let selectedMon = moment().month(val).format("M");
        if (this.state.expiryYear) {
          if (this.state.expiryYear === year && parseInt(selectedMon) < month) {
            this.state.validMonth = true;
            let evt = new CustomEvent("month", { detail: { flag: true } });
            window.dispatchEvent(evt);
          } else {
            this.state.validMonth = false;
            let evt = new CustomEvent("month", { detail: { flag: false } });
            window.dispatchEvent(evt);
          }
        }
        this.state.expiryMonth = val;
      } else {
        this.state.expiryMonth = "";
      }
    } else if (parentObj.label === "expiryYear") {
      if (isValid) {
        let date = new Date();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let selectedMon = moment().month(this.state.expiryMonth).format("M");
        if (val === year && parseInt(selectedMon) < month) {
          this.state.validMonth = true;
          let evt = new CustomEvent("month", { detail: { flag: true } });
          window.dispatchEvent(evt);
        } else {
          this.state.validMonth = false;
          let evt = new CustomEvent("month", { detail: { flag: false } });
          window.dispatchEvent(evt);
        }
        this.state.expiryYear = val;
      } else {
        this.state.expiryYear = "";
      }
    } else if (parentObj.label === "cvv") {
      if (isValid) {
        this.state.cvv = val;
      } else {
        this.state.cvv = "";
      }
    } else if (parentObj.label === "monthlyDebitDay") {
      if (isValid) {
        this.state.monthlyDebitDay = val;
      } else {
        this.state.monthlyDebitDay = "";
      }
    } else if (parentObj.label === "Street") {
      if (isValid) {
        this.state.userAddress.street = val;
      } else {
        this.state.userAddress.street = "";
      }
    }
    this.setState(
      {
        refresh: true,
      },
      () => this.validateForm()
    );
  };

  showModalPopup = (event) => {
    this.setState(
      {
        addressModal: true,
        loaderShow: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  hideModal = (event) => {
    this.setState(
      {
        addressModal: false,
      },
      () => {
        this.validateForm();
      }
    );
  };

  getSourceID = () => {
    fetch(
      configuration.baseUrl + "/setupfamily/getMemberInfo/" + this.props.subId
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState(
          {
            sourceId: response.response.id,
            loaderShow: false,
          },
          // () => this.getAccountNumber()
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getDisabled = () => {
    fetch(
      configuration.baseUrl + "/setupfamily/getMemberInfo/" + this.props.subId
    )
      .then((response) => response.json())
      .then((response) => {
        this.setState(
          {
            addressModal: true,
            userAddress: {
              postalCode: response.response.postalCode,
              city: response.response.city,
              state: response.response.state,
              country: response.response.country,
              street: response.response.street ? response.response.street : "",
            },
            loaderShow: false,
          },
          () => this.validateForm()
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // confirm payment API

  changePaymentMode = (payType) => {
    this.setState({ loader: true, MsgModalerror: "" });

    let obj;
    var payType = payType;
    //   if(this.state.activeTab==0)
    //   {
    //     payType="ACH"
    //   }else{
    //     payType="CC"
    //   }

    obj = {
      source: this.state.sourceId,
      bankName: this.state.bankName,
      accountName: this.state.accountName,
      accountNumber: this.state.accountNumber,
      accountType: this.state.accountType,
      routingNo: this.state.routingNo,

      cardNumber: this.state.cardNumber,
      holderName: this.state.holderName,
      expiryMonth: this.state.expiryMonth
        ? moment().month(this.state.expiryMonth).format("M")
        : "",
      expiryYear: this.state.expiryYear,
      cvv: this.state.cvv,
      paymentType: payType,
    };

    axios
      .post(
        configurations.transactionURL + "/transaction/storeTransaction",
        obj
      )
      .then((res) => {
        if (res.data.code == 200) {
          if (this.state.activeTab == 0) {
            this.setState({
              open: false,
              loader: true,
              waitingRes: "",
              // refresh:true
            });
          }
          if (this.state.activeTab == 0) {
            this.setState({
              open: false,
              loader: true,
              waitingRes: "",
              //  refresh:true
            });
          }
          this.setState({
            successModal: false,
            open: false,
            targetDateModal: true,
            // waitingRes: "",
            loader: false,
            confirmPaymentErrorFlag: false,
            errMsg: "Updated payment details successfully!",
          });
        } else if (res.data.code == 202) {
          let x = JSON.parse(res.data.response).error_message;
          let errMsg = "";
          if (x.includes("-")) {
            let cds = x.split(" - ");
            errMsg = cds[1];
          } else {
            errMsg = x;
          }
          this.setState({
            errMsg: errMsg,
            loader: false,
            confirmPaymentErrorFlag: true,
            targetDateModal: true,
            waitingRes: "",
          });

          if (this.state.activeTab == 0 && this.state.MsgModalerror != "") {
            this.setState({
              errCodeACH: true,
              cvv: "",
              cardNumber: "",
              errCodeCC: false,
              expiryMonth: "",
              expiryYear: "",
              reqFlag: false,
              waitingRes: "",
              // targetDateModal : true,
            });

            let evt = new CustomEvent("errorCode", { detail: { flag: true } });
            window.dispatchEvent(evt);
          }

          if (this.state.activeTab == 1) {
            this.setState({
              errCodeCC: true,
              bankName: "",
              accountNumber: "",
              accountType: "",
              routingNo: "",
              errCodeACH: false,
              waitingRes: "",
              // targetDateModal : true,
            });

            let evt = new CustomEvent("errorCode", { detail: { flag: true } });
            window.dispatchEvent(evt);
          }
        } else if (res.data.code == 204) {
          if (this.state.activeTab == 0) {
            this.setState({
              //   MsgModalerrorFooterACH:'Source is not registered',
              loader: false,
              // MsgModalerrorFooterCC:'',
              errMsg: "Source is not registered",
              confirmPaymentErrorFlag: true,
              successModal: false,
              cvv: "",
              cardNumber: "",
              errCodeCC: false,
              expiryMonth: "",
              expiryYear: "",
              waitingRes: "",
              targetDateModal: true,
            });
          } else {
            this.setState({
              // MsgModalerrorFooterCC:'Source is not registered',
              errMsg: "Source is not registered",
              confirmPaymentErrorFlag: true,
              successModal: false,
              loader: false,
              MsgModalerrorFooterACH: "",
              bankName: "",
              accountNumber: "",
              accountType: "",
              routingNo: "",
              waitingRes: "",
              targetDateModal: true,
            });
          }
        } else if (res.data.code == 500) {
          if (this.state.activeTab == 0) {
            this.setState({
              // MsgModalerrorFooterACH:'Internal server error',
              errMsg: "Internal server error",
              confirmPaymentErrorFlag: true,
              successModal: false,
              loader: false,
              MsgModalerrorFooterCC: "",
              cvv: "",
              cardNumber: "",
              errCodeCC: false,
              expiryMonth: "",
              expiryYear: "",
              waitingRes: "",
              targetDateModal: true,
            });
          } else {
            this.setState({
              //MsgModalerrorFooterCC:'Internal server error',
              errMsg: "Internal server error",
              confirmPaymentErrorFlag: true,
              successModal: false,
              loader: false,
              MsgModalerrorFooterACH: "",
              bankName: "",
              accountNumber: "",
              accountType: "",
              routingNo: "",
              waitingRes: "",
              targetDateModal: true,
            });
          }
        } else {
          let x = JSON.parse(res.data.response).error_message;
          let cds = x.split(" - ");
          if (this.state.activeTab == 0) {
            this.setState({
              // MsgModalerrorFooterACH:cds[1]
              cvv: "",
              cardNumber: "",
              errCodeCC: false,
              expiryMonth: "",
              expiryYear: "",
              waitingRes: "",
              loader: false,
              targetDateModal: true,
              errMsg: cds[1],
              confirmPaymentErrorFlag: true,
            });
          } else {
            this.setState({
              //   MsgModalerrorFooterCC:cds[1],
              loader: false,
              bankName: "",
              accountNumber: "",
              accountType: "",
              routingNo: "",
              waitingRes: "",
              targetDateModal: true,
              errMsg: cds[1],
              confirmPaymentErrorFlag: true,
            });
          }
        }
      });
  };

  // AccountNumber
  getAccountNumber = () => {
    axios
      .get(
        configurations.transactionURL +
          "/transaction/getLast4AccountNumber/" +
          this.state.sourceId
      )
      // getAccountNumber()
      .then((res) => {
        // let AccountNo=res.data.response.replaceAll("*", "X");
        if (res.data.code === 200) {
          this.setState({
            accountNo: res.data.response.replaceAll("*", "X"),
            loader: false,
          });
        } else if (res.data.code === 202) {
          let x = JSON.parse(res.data.response).error_message;
          let errMsg = "";
          if (x.includes("-")) {
            let cds = x.split(" - ");
            errMsg = cds[1];
          } else {
            errMsg = x;
          }
          if (this.state.activeTab === 0) {
            this.setState({
              accountNo: "",
              MsgModalerrorFooterACH: errMsg,
            });
          } else {
            this.setState({
              accountNo: "",
              MsgModalerrorFooterCC: errMsg,
            });
          }
        } else {
          this.setState({ accountNo: "" });
        }
      });
  };

  // ==========================================================================

  validateForm() {
    if (this.state.activeTab === 0) {
      if (
        this.state.bankName !== "" &&
        this.state.accountName !== "" &&
        this.state.accountNumber !== "" &&
        this.state.accountType !== "" &&
        this.state.routingNo !== "" &&
        this.state.monthlyDebitDay !== ""
      ) {
        this.setState({
          disabled: false,
        });
      } else {
        this.setState({
          disabled: true,
        });
      }
    } else if (this.state.activeTab === 1) {
      if (
        this.state.cardNumber !== "" &&
        this.state.holderName !== "" &&
        this.state.expiryMonth !== "" &&
        this.state.expiryYear !== "" &&
        this.state.cvv !== "" &&
        !this.state.validMonth &&
        this.state.monthlyDebitDay !== ""
      ) {
        this.setState({
          disabled2: false,
        });
      } else {
        this.setState({
          disabled2: true,
        });
      }
    }
  }

  handleClose = (event) => {
    this.setState({
      successModal: false,
      // targetDateModal : this.state.isChangeProgram || this.state.isHouseholdUpdate ? true : false
    });
  };

  savePaymentDetails = (flag) => {
    this.setState({
      loaderShow: false,
    });

    let totalCost = this.state.paymentData[this.state.paymentData.length -1].amount;
        let date = moment(new Date().setMonth(new Date().getMonth() + 1)).format('MM')+'/'+moment(new Date().setDate(this.state.monthlyDebitDay)).format('DD')+'/'+moment(new Date()).format('YYYY')
        let amt = totalCost.split('$');
        let month = moment().month(this.state.expiryMonth).format("M");
        const data = {
            subId: this.props.subId,
            bankName: this.state.bankName,
            accountName: this.state.accountName,
            accountNumber: this.state.accountNumber,
            accountType: this.state.accountType,
            routingNo: this.state.routingNo,
            cardNumber: this.state.cardNumber,
            holderName: this.state.holderName,
            expiryMonth: this.state.expiryMonth ? moment().month(this.state.expiryMonth).format("M") : "",
            expiryYear: this.state.expiryYear,
            cvv: this.state.cvv,
            paymentType: flag,
            preferedType: this.state.preferedType,
            monthlyDebitDay: moment(date).format('YYYY-MM-DD'),
            amount : amt[1],
        };



        axios.post(configuration.baseUrl + '/setuppayment/savePaymentDetails', data)
            .then(response => {
                this.getDisabled();
            })
            .catch(error => {
                console.log(error);
            });
    this.getDisabled();
  };
  continuePaymentDetails = (flag) => {
    this.setState({
      targetDateModal: true,
    });
  };
  handleDateChange = (date, didMount) => {
    this.setState(
      {
        beforeEffectiveDate: date,
      },
      () => {
        let panel = document.getElementById("date-picker-dialog");
        panel.addEventListener("onmouseleave", function () {
          document.getElementById("date-picker-dialog-label").style.paddingTop =
            "10px";
        });
      }
    );
  };

  beforeEffectiveDateSelect = () => {
    fetch(configuration.baseUrl + "/plan/getMemberPlan/" + this.props.subId)
      .then((selectedPlan) => selectedPlan.json())
      .then((selectedPlan) => {
        if (selectedPlan.response) {
          this.setState(
            {
              loaderShow: false,
              memberPlanInfo: selectedPlan.response,
            },
            () => {
              let date = moment(this.state.memberPlanInfo.targetDate);
              let now = moment();

              if (date < now && !this.props.reEnroll && !this.props.isAgent) {
                console.log("past date");
                this.setState({
                  beforeEffectiveDate: date,
                  // effectiveDateModal: true,
                  beforeEffectiveDateFlag: true,
                });
              } else {
                this.setState({
                  beforeEffectiveDateFlag: false,
                });
                this.openDraftDayModal();
              }
            }
          );
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  openDraftDayModal = () => {
    if((this.props.clientId == '1002'|| this.props.clientId == 1002) 
    ||(this.props.clientId == '2002'|| this.props.clientId == 2002)
    ||(this.props.clientId == '2003'|| this.props.clientId == 2003)
    ||(this.props.clientId == '2001'|| this.props.clientId == 2001)
    ){
      this.setState({
        loaderShow: true,
        addressModal: false,
        effectiveDateModal: false,
        draftDayModal: true,
      }
      // ,()=>this.submitDraftDay()
      );
    }else{
      this.setState({
        loaderShow: true,
        addressModal: false,
        effectiveDateModal: false,
        // draftDayModal: true,
      },()=>this.submitDraftDay());
    }
    

    var tDate = new Date();

    if (this.state.activeTab === 0) {
      var calApplicatioFee = 1;
    } else {
      var calApplicatioFee = 1 + 1 * 0.035;
      calApplicatioFee = calApplicatioFee.toFixed(2);
    }

    var getFirstPaymentAmount =
      this.state.paymentData[this.state.paymentData.length - 1].amount.split(
        "$"
      )[1];
    getFirstPaymentAmount =
      "$" + (getFirstPaymentAmount - calApplicatioFee).toFixed(2);

    this.setState({
      loaderShow: false,
      firstPaymentAmount: getFirstPaymentAmount,
      todayDate: moment(tDate).format("dddd, MMMM Do, YYYY"),
      initialApplicationFee: "$1",
      //initialApplicationFee: '$' + calApplicatioFee,
    });

    // fetch(configuration.baseUrl + '/plan/getMemberPlan/' + this.props.subId)
    //     .then((selectedPlan) => selectedPlan.json())
    //     .then(selectedPlan => {
    //         if (selectedPlan.response) {
    //             this.setState({
    //                 loaderShow: false,
    //                 memberPlanInfo: selectedPlan.response,
    //                 firstPaymentAmount: getFirstPaymentAmount,
    //                 todayDate: moment(tDate).format('dddd, MMMM Do, YYYY'),
    //                 initialApplicationFee: '$75',
    //                 //initialApplicationFee: '$' + calApplicatioFee,
    //             });

    //             console.log("==selectedPlan==", selectedPlan.response);
    //             console.log("==paymentData==", this.state.paymentData);
    //             console.log("==paymentData Am==", this.state.paymentData[this.state.paymentData.length - 1].amount);
    //             console.log("==paymentType==", this.state.paymentType);

    //         }

    //     }).catch(error => {
    //         console.log(error);
    //     });
  };

  answerChangeHandler = (event, name, optionId) => {
    if (name === "radio") {
      var paymentDate = this.state.beforeEffectiveDateFlag
        ? moment(this.state.beforeEffectiveDate)
            .subtract(event.target.value, "days")
            .format("MM/DD/YYYY")
        : moment(this.state.memberPlanInfo.targetDate)
            .subtract(event.target.value, "days")
            .format("MM/DD/YYYY");
      var getSubsequentPaymentDate = this.state.beforeEffectiveDateFlag
        ? moment(this.state.beforeEffectiveDate)
            .subtract(event.target.value, "days")
            .format("Do")
        : moment(this.state.memberPlanInfo.targetDate)
            .subtract(event.target.value, "days")
            .format("Do");

      var varDate = new Date(paymentDate);
      var today = new Date();

      if (varDate >= today) {
        console.log("future date");
      } else {
        console.log("past date");
        paymentDate = today;
      }
      this.setState({
        draftDaySelected: event.target.value,
        effectivePaymentDate: this.state.beforeEffectiveDateFlag
          ? moment(this.state.beforeEffectiveDate).format("dddd, MMMM Do, YYYY")
          : moment(this.state.memberPlanInfo.targetDate).format(
              "dddd, MMMM Do, YYYY"
            ),
        firstPaymentDate: moment(paymentDate).format("dddd, MMMM Do, YYYY"),
        subsequentPaymentDate: getSubsequentPaymentDate,
      });
    }
  };

  handleDraftModalClose = () => {
    this.setState({
      draftDayModal: false,
      draftDaySelected: "",
      firstPaymentDate: "",
    });
  };

  submitDraftDay = () => {
    let data = {
      subId: this.state.memberPlanInfo.subId,
      planId: this.state.memberPlanInfo.planId,
      planCode: this.state.memberPlanInfo.planCode,
      amount: this.state.memberPlanInfo.amount,
      targetDate: this.state.beforeEffectiveDateFlag
        ? moment(this.state.beforeEffectiveDate).format("YYYY-MM-DD")
        : this.state.memberPlanInfo.targetDate,
      acsm: this.state.memberPlanInfo.acsm,
      draftDay: parseInt(this.state.draftDaySelected),
    };

    console.log("====saveMemberPlan===", data);

    axios
      .post(configuration.baseUrl + "/plan/saveMemberPlan", data)
      .then((response) => {
        this.setState({
          loaderShow: false,
          draftDayModal: true,
        });
        //  this.props.onClick();
        this.submitAddress();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  submitAddress = () => {
    this.setState({
      loaderShow: true,
    });
    let obj = new Object();
    obj.street = this.state.userAddress.street;
    obj.subId = this.props.subId;

    axios
      .post(configuration.baseUrl + "/setupfamily/addMemberAddress", obj)
      .then((response) => {
        if (response.data.code === 200) {
          this.setState({
            addressModal: false,
            
            // storedTranModal: true,
            waitingRes: "true",
          });
          localStorage.removeItem("PAYMENT_ERROR");

          let totalCost =
            this.state.paymentData[this.state.paymentData.length - 1].amount;
          let date =
            moment(new Date().setMonth(new Date().getMonth() + 1)).format(
              "MM"
            ) +
            "/" +
            moment(new Date().setDate(this.state.monthlyDebitDay)).format(
              "DD"
            ) +
            "/" +
            moment(new Date()).format("YYYY");
          let amt = totalCost.split("$");

          let paymentType = "";
          if (this.state.activeTab === 0) {
            paymentType = "ACH";
          } else {
            paymentType = "CC";
          }

          const data = {
            subId: this.props.subId,
            bankName: this.state.bankName,
            accountName: this.state.accountName,
            accountNumber: this.state.accountNumber,
            accountType: this.state.accountType,
            routingNo: this.state.routingNo,
            cardNumber: this.state.cardNumber,
            holderName: this.state.holderName,
            expiryMonth: this.state.expiryMonth
              ? moment().month(this.state.expiryMonth).format("M")
              : "",
            expiryYear: this.state.expiryYear,
            cvv: this.state.cvv,
            paymentType: paymentType,
            preferedType: this.state.preferedType,
            monthlyDebitDay: moment(date).format("YYYY-MM-DD"),
            amount: amt[1],
          };
          if (this.props.isChangeProgram || this.props.isHouseholdUpdate) {
            // for storeTransaction by namita
            if (this.state.activeTab == 0) {
              this.changePaymentMode("ACH");
            } else {
              this.changePaymentMode("CC");
            }
          }
          else {
            axios
              .post(
                configuration.baseUrl + "/setuppayment/storeTransaction",
                data
              )
              .then((res) => {
                console.log(
                  "=============== storeTransaction =================="
                );
                console.log(res);
                if (res.data.code === 200) {
                  axios
                    .post(
                      configuration.baseUrl +
                        "/setuppayment/savePaymentDetails",
                      data
                    )
                    .then((response) => {

                      if (res.data.code === 200){
                      this.setState({
                        storedTranModal: false,
                        // waitingRes: "",
                        loaderShow: false,
                      });
                      if (this.props.isAgent) {
                        this.props.onClick();
                      } else {
                        fetch(
                          configuration.baseUrl +
                            "/plan/getMemberPlan/" +
                            this.props.subId
                        )
                          .then((selectedPlan) => selectedPlan.json())
                          .then((selectedPlan) => {
                            if (selectedPlan.response) {
                              let date = moment(
                                selectedPlan.response.targetDate
                              );
                              let now = moment();

                              if (now > date) { //&& !this.props.reEnroll && !this.props.isAgent (date picker)
                                this.props.onClick();
                              } else {
                                this.setState({
                                  loaderShow: false,
                                  targetDateModal: true,
                                });
                              }
                            }
                          });
                      }
                    }
                    })
                    .catch((error) => {
                      console.log(error);
                    });
                } 
                
                
                
                
                
                
                
                 else if (res.data.code === 202) {
                  let x = JSON.parse(res.data.response).error_message;
                  let errMsg = "";
                  if (x.includes("-")) {
                    let cds = x.split(" - ");
                    errMsg = cds;
                  } else {
                    errMsg = x;
                  }

                  this.setState({
                    waitingRes: errMsg,
                    storedTranModal:true,
                    loaderShow:false
                  });
                } 
                else if(res.data.code === 500){
                  this.setState({
                    waitingRes: "Internal Server Error!",
                    storedTranModal:true,
                    loaderShow:false
                  });
                }
              });
          }
          
        }
      });
  };

  onToggle1(event, name) {
    if (name === "c1") {
      this.setState({
        achChecked: true,
        ccChecked: false,
        preferedType: event.target.checked ? "ACH" : "",
      });
    }
    if (!event.target.checked) {
      this.setState({ achChecked: false });
    }

    if (name === "c2") {
      this.setState({
        ccChecked: true,
        achChecked: false,
        preferedType: event.target.checked ? "CC" : "",
      });
    }
    if (!event.target.checked) {
      this.setState({ ccChecked: false });
    }
  }

  handleDateModal = () => {
    this.setState({
      targetDateModal: false,
    });
    this.props.onClick();
  };

  render() {
    let currentScreen = "";

    let myDate =
      moment(this.state.beforeEffectiveDate).format("MM") +
      "/" +
      moment(this.state.beforeEffectiveDate).format("DD") +
      "/" +
      moment(this.state.beforeEffectiveDate).format("YYYY");
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (this.state.activeTab === 0) {
      currentScreen = (
        <div style={style}>
          <Grid container spacing={1} style={{ marginTop: "1%" }}>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4} style={{ marginBottom: "-1%" }}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={"Bank_Name"}
                    reqFlag={true}
                    label={"Bank Name"}
                    value={this.state.bankName}
                    disable={false}
                    style={CustomeCss.textField}
                    length={120}
                    fieldType={"bank_name"}
                    errMsg={"Enter valid bank name"}
                    helperMsg={"Bank name required"}
                    parentDetails={{ label: "bank_name" }}
                    key={0}
                  ></Sample>
                </Grid>
                <Grid item xs={12} sm={4} style={{ marginBottom: "-1%" }}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={"Account_Name"}
                    reqFlag={true}
                    label={"Name on Account"}
                    value={this.state.accountName}
                    disable={false}
                    style={CustomeCss.textField}
                    length={120}
                    fieldType={"accountName"}
                    errMsg={"Enter valid account name"}
                    helperMsg={"Name on account required"}
                    parentDetails={{ label: "Account_Name" }}
                    key={0}
                  ></Sample>
                </Grid>
                <Grid item xs={12} sm={4} style={{ marginBottom: "-1%" }}>
                  <CommonDropDwn
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={"Account Type"}
                    label={"Account Type"}
                    value={this.state.accountType}
                    disable={false}
                    style={customStyle.dropDown}
                    fieldType={"dropDwn"}
                    helperMsg={"Select account type"}
                    List={this.state.accountTypes}
                    parentDetails={{ label: "Account_Type" }}
                  ></CommonDropDwn>
                </Grid>
              </Grid>
              <Grid container spacing={3} style={{ marginTop: "1.5%" }}>
                <Grid item xs={12} sm={6} style={{ marginBottom: "-3%" }}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={"Routing_Number"}
                    reqFlag={true}
                    label={"Routing Number"}
                    value={this.state.routingNo}
                    disable={false}
                    style={CustomeCss.textField}
                    length={9}
                    fieldType={"routingNo"}
                    errMsg={"Enter valid routing number"}
                    helperMsg={"Routing number required"}
                    parentDetails={{ label: "Routing_Number" }}
                    key={0}
                  ></Sample>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={"Account_Number"}
                    reqFlag={true}
                    label={"Account Number"}
                    value={this.state.accountNumber}
                    disable={false}
                    style={CustomeCss.textField}
                    length={26}
                    fieldType={"accountNumber"}
                    errMsg={"Account number must be 4 and up to 26 digits"}
                    helperMsg={"Account number required"}
                    parentDetails={{ label: "Account_Number" }}
                    key={0}
                  ></Sample>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {this.state.paymentData.map((op, index) => (
                    <div style={CustomeCss.planBox} key={index}>
                      <div
                        style={
                          index === this.state.paymentData.length - 1
                            ? CustomeCss.planTextBold
                            : CustomeCss.planText
                        }
                      >
                        {" "}
                        {op.title}{" "}
                      </div>
                      <div style={CustomeCss.planPrice}> {op.amount}</div>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* </div> */}

          <div style={{ marginTop: "30px" }}>
            <div style={customStyle.bottomMainConatiner}>
              <div style={customStyle.newBottomContainer}>
                <div style={customStyle.bottomChildContainer1}>
                  <NextButton
                    // disabled={this.state.disabled}
                    variant="contained"
                    color="primary"
                    style={{ width: "120px", height: "40px" }}
                    onClick={() => this.savePaymentDetails("ACH")} //this.props.isChangeProgram || this.props.isHouseholdUpdate ? () => this.changePaymentMode('ACH') :
                  >
                    {i18n.t("BUTTON.DONE")}
                  </NextButton>
                  {this.state.accountNo && (
                    <NextButton
                      disabled={!this.state.disabled}
                      variant="contained"
                      color="primary"
                      onClick={() => this.continuePaymentDetails("ACH")} //this.props.isChangeProgram || this.props.isHouseholdUpdate ? () => this.changePaymentMode('CC') :
                      style={{
                        width: "120px",
                        height: "40px",
                        marginLeft: "30px",
                      }}
                    >
                      Continue
                    </NextButton>
                  )}
                </div>
                <div style={customStyle.bottomChildContainer2}></div>
              </div>
              <div style={customStyle.newBottomContainer}></div>
            </div>
          </div>
        </div>
      );
    } else if (this.state.activeTab === 1) {
      currentScreen = (
        <div style={style}>
          <Grid container spacing={1} style={{ marginTop: "1%" }}>
            <Grid item xs={12} sm={8}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6} style={{ marginBottom: "-3%" }}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={"Card_Number"}
                    reqFlag={true}
                    label={"Card Number"}
                    value={this.state.cardNumber}
                    disable={false}
                    style={CustomeCss.textField}
                    length={16}
                    fieldType={"cardNumber"}
                    errMsg={"Card number up to 16 digits"}
                    helperMsg={"Card number required"}
                    parentDetails={{ label: "Card_Number" }}
                  ></Sample>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={"Holder_Name"}
                    reqFlag={true}
                    label={"Card Holder Name"}
                    value={this.state.holderName}
                    disable={false}
                    style={CustomeCss.textField}
                    length={25}
                    fieldType={"holderName"}
                    errMsg={"Enter valid card holder name"}
                    helperMsg={"Card holder name required"}
                    parentDetails={{ label: "Holder_Name" }}
                  ></Sample>
                </Grid>
              </Grid>
              <Grid container spacing={2} style={{ marginTop: "2%" }}>
                <Grid item xs={12} sm={4}>
                  <CommonDropDwn
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={"expiryMonth"}
                    label={"Expiration Month"}
                    value={this.state.expiryMonth}
                    disable={false}
                    style={customStyle.dropDown}
                    fieldType={"dropDwn"}
                    helperMsg={"Select expiration month"}
                    errMsg={
                      "The expiration date is before today's date. Enter valid expiration month"
                    }
                    List={this.state.months}
                    parentDetails={{
                      label: "expiryMonth",
                      val: this.state.expiryYear,
                    }}
                    key={1}
                  ></CommonDropDwn>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <CommonDropDwn
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={"expiryYear"}
                    label={"Expiration Year"}
                    value={this.state.expiryYear}
                    disable={false}
                    style={customStyle.dropDown}
                    fieldType={"dropDwn"}
                    helperMsg={"Select expiration year"}
                    errMsg={
                      "The expiration date is before today's date. Enter valid expiration year"
                    }
                    List={this.state.years}
                    parentDetails={{
                      label: "expiryYear",
                      val: this.state.expiryMonth,
                    }}
                    key={1}
                  ></CommonDropDwn>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={"cvv"}
                    label={"CVV"}
                    reqFlag={true}
                    value={this.state.cvv}
                    disable={false}
                    style={CustomeCss.textField}
                    length={4}
                    fieldType={"cvv"}
                    errMsg={"Enter valid CVV"}
                    helperMsg={"CVV required"}
                    parentDetails={{ label: "cvv" }}
                    key={1}
                  ></Sample>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} sm={4}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  {this.state.paymentData.map((op, index) => (
                    <div style={CustomeCss.planBox} key={index}>
                      <div
                        style={
                          index === this.state.paymentData.length - 1
                            ? CustomeCss.planTextBold
                            : CustomeCss.planText
                        }
                      >
                        {" "}
                        {op.title}{" "}
                      </div>
                      <div style={CustomeCss.planPrice}> {op.amount}</div>
                    </div>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          <div style={{ marginTop: "30px" }}>
            <div style={customStyle.bottomMainConatiner}>
              <div style={customStyle.newBottomContainer}>
                <div style={customStyle.bottomChildContainer1}>
                  <NextButton
                    disabled={this.state.disabled2}
                    variant="contained"
                    color="primary"
                    onClick={() => this.savePaymentDetails("CC")} //this.props.isChangeProgram || this.props.isHouseholdUpdate ? () => this.changePaymentMode('CC') :
                    style={{ width: "120px", height: "40px" }}
                  >
                    {i18n.t("BUTTON.DONE")}
                  </NextButton>
                  {this.state.accountNo && (
                    <NextButton
                      disabled={!this.state.disabled2}
                      variant="contained"
                      color="primary"
                      onClick={() => this.continuePaymentDetails("CC")} //this.props.isChangeProgram || this.props.isHouseholdUpdate ? () => this.changePaymentMode('CC') :
                      style={{
                        width: "120px",
                        height: "40px",
                        marginLeft: "30px",
                      }}
                    >
                      Continue
                    </NextButton>
                  )}
                </div>
                <div style={customStyle.bottomChildContainer2}></div>
              </div>
              <div style={customStyle.newBottomContainer}></div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        {this.state.loaderShow ? <Loader></Loader> : ""}
        <p style={CustomeCss.textAlign}>
          {this.props.isChangeProgram || this.props.isHouseholdUpdate ? (
            <b>Confirm Payment</b>
          ) : (
            <b> {i18n.t("SETUP_PAYMENT.TITLE")}</b>
          )}
        </p>
        {/* {this.props.isChangeProgram || this.props.isHouseholdUpdate ? :<p style={CustomeCss.textAlign1}>{i18n.t('SETUP_PAYMENT.TEXT')}</p>} */}
        {this.props.isChangeProgram || this.props.isHouseholdUpdate ? (
          <div>
            <Grid>
              <p style={CustomeCss.textAlign1}>
                The new monthly contribution amount will be applied on{" "}
                <b>{this.state.nextRecurringDate}</b>. If you want to update
                your payment method, you may do so below.
              </p>
            </Grid>
            <Grid
              container
              direction="row"
              justify="flex-end"
              alignItems="flex-end"
              className="accountNumDiv"
            >
              <Grid item xs={12} sm={3} md={4}>
                <table className="Last_4_digit">
                  <td className="td_style1">
                    Account Number currently on file
                  </td>
                  <td className="td_style" style={{ verticalAlign: "middle" }}>
                    {this.state.accountNo}
                  </td>
                </table>
              </Grid>
            </Grid>
          </div>
        ) : 
          // <p style={CustomeCss.textAlign1}>{i18n.t("SETUP_PAYMENT.TEXT")}</p>
          null
        }
        <div>
          <Grid container spacing={2}>
            {/*<Grid item xs={12} sm={4} style={{marginLeft:'64.7%',marginBottom:'-4%',paddingBottom:'13px',paddingLeft:'28px',paddingRight:'13px'}} >
                {this.state.activeTab === 0 ? <div><Checkbox
                            id='input'
                            inputProps={{
                                'aria-label': 'secondary checkbox',
                            }}
                            style={{ color: '#533278',fontSize:'10px'}}
                            label='Prefered Type'
                            checked={this.state.achChecked}
                            onChange={event=>this.onToggle1(event,'c1')}
                        /> {i18n.t('SETUP_PAYMENT.CHECKBOX')}</div> :

                            <div><Checkbox
                                id='input'
                                inputProps={{
                                    'aria-label': 'secondary checkbox',
                                }}
                                style={{ color: '#533278'}}
                                label='Prefered Type'
                                checked={this.state.ccChecked}
                                onChange={event=>this.onToggle1(event,'c2')}
                            /> {i18n.t('SETUP_PAYMENT.CHECKBOX')}</div>
                        }
                </Grid>*/}
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <AntTabs
                value={this.state.activeTab}
                onChange={this.handleChange}
                indicatorColor="primary"
                textColor="primary"
              >
                <AntTab
                  label="ACH DEBIT"
                  className="ant-col-15"
                  style={{ borderBottom: 0 }}
                />
                {/* style={{width:'200px'}} */}
                <AntTab
                  label="CREDIT/DEBIT CARD"
                  className="ant-col-15"
                  style={{
                    paddingLeft: "0px",
                    fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                    borderBottom: 0,
                  }}
                />
                {/* style={{width:'200px'}} */}
              </AntTabs>
            </Grid>
          </Grid>
          {currentScreen}
        </div>
        <Modal
          size="md"
          show={this.state.successModal}
          onHide={() => this.handleClose}
          style={{ marginTop: "13%" }}
        >
          <Modal.Header>
            <Modal.Title>{i18n.t("SETUP_PAYMENT.MODAL_TITLE")}</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{ fontFamily: "Roboto, Arial, Helvetica, sans-serif" }}
          >
            {this.state.responseCode === 202 && (
              <div>
                <p>{i18n.t("SETUP_PAYMENT.MODAL_MSG1")}</p>
              </div>
            )}
            {this.state.responseCode === 500 && (
              <div>
                <p>{i18n.t("SETUP_PAYMENT.MODAL_MSG2")}</p>
              </div>
            )}
            {this.state.responseCode === 203 && (
              <div>
                <p>{this.state.errMsg}</p>
              </div>
            )}

            {/* {
                            this.state.confirmPaymentErrorFlag  &&
                            <div>
                                <p>{this.state.errMsg}</p>
                            </div>
                            
                        } */}
          </Modal.Body>
          <Modal.Footer>
            <NextButton onClick={() => this.handleClose()}>
              {i18n.t("BUTTON.OK")}
            </NextButton>
          </Modal.Footer>
        </Modal>

        <Modal
          size="lg"
          show={this.state.addressModal}
          onHide={(event) => this.hideModal(event)}
          backdrop="static"
          centered
        >
          <Modal.Header style={customStyle.modal_header} closeButton>
            <Modal.Title>Primary Address</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              maxHeight: "450px",
              overflowY: "auto",
              textAlign: "justify",
              wordSpacing: "2px",
            }}
          >
            {this.state.loaderShow ? <Loader></Loader> : ""}

            <Grid container direction="row" spacing={1} xs={12} md={12} lg={12}>
              <Grid item xs={12} md={12} lg={12}>
                <p style={customStyle.QuickQtTopRightText2}>
                  We've filled in your address based on the Zip Code you shared
                  earlier. Please help complete it by filling in the missing
                  details below.
                </p>
              </Grid>
            </Grid>
            <Grid container direction="row" spacing={1} xs={12} md={12} lg={12}>
              <Grid item xs={6} md={4} lg={4}>
                <div style={customStyle.EnrollNew1ZipPaymentModal}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    value={this.state.userAddress.postalCode}
                    name={"Zip"}
                    label={"Zip Code"}
                    reqFlag={true}
                    disable={true}
                    style={customStyle.textFieldWrp}
                    length={5}
                    fieldType={"zip"}
                    errMsg={"Enter Valid Zip Code"}
                    helperMsg={"Zip Code Required"}
                    parentDetails={{ label: "Zip" }}
                  ></Sample>
                </div>
              </Grid>
              <Grid item xs={6} md={4} lg={4}>
                <div style={customStyle.EnrollNew1ZipPaymentModal}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    value={this.state.userAddress.street}
                    name={"Street_suite"}
                    label={"Street,Suite"}
                    reqFlag={true}
                    disable={false}
                    style={customStyle.textFieldWrp}
                    length={100}
                    fieldType={"street"}
                    errMsg={"Enter valid street"}
                    helperMsg={"Street required"}
                    parentDetails={{ label: "Street" }}
                  ></Sample>
                </div>
              </Grid>
            </Grid>

            <Grid container direction="row" spacing={1} xs={12} md={12} lg={12}>
              <Grid item xs={6} md={4} lg={4}>
                <div style={customStyle.EnrollNew1CityPayModal}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    value={this.state.userAddress.city}
                    name={"City"}
                    label={"City"}
                    reqFlag={true}
                    disable={true}
                    style={customStyle.textFieldWrp}
                    length={100}
                    fieldType={"city"}
                    errMsg={"Enter valid city"}
                    helperMsg={"City required"}
                    parentDetails={{ name: "city" }}
                  ></Sample>
                </div>
              </Grid>
              <Grid item xs={6} md={4} lg={4}>
                <div style={customStyle.EnrollNew1StatePayModal}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={"State"}
                    label={"State"}
                    value={this.state.userAddress.state}
                    reqFlag={true}
                    disable={true}
                    style={customStyle.textFieldWrp}
                    length={2}
                    fieldType={"text"}
                    errMsg={"Enter valid state"}
                    helperMsg={"State required"}
                    parentDetails={{ name: "state" }}
                  ></Sample>
                </div>
              </Grid>
              <Grid item xs={6} md={4} lg={4}>
                <div style={customStyle.EnrollNew1CountryPayModal}>
                  <Sample
                    setChild={this.changeTextFieldHandler.bind(this)}
                    name={"Country"}
                    label={"Country"}
                    value={this.state.userAddress.country}
                    reqFlag={true}
                    disable={true}
                    style={customStyle.textFieldWrp}
                    length={2}
                    fieldType={"text"}
                    errMsg={"Enter valid country"}
                    helperMsg={"Country required"}
                    parentDetails={{ name: "country" }}
                  ></Sample>
                </div>
              </Grid>
            </Grid>
          </Modal.Body>
          <Modal.Footer>
            <CustomeButton
              onClick={(event) => this.hideModal(event)}
              style={customStyle.m10}
            >
              {i18n.t("BUTTON.CANCEL")}
            </CustomeButton>
            {this.state.STATE_PARAM &&
            this.state.STATE_PARAM.reEnrolledByAgent ? (
              <CustomeButton
                disabled={this.state.userAddress.street ? false : true}
                onClick={this.submitAddress}
                style={customStyle.m10}
              >
                Submit
              </CustomeButton>
            ) : (
              // <CustomeButton disabled={this.state.userAddress.street ? false : true} onClick={this.openDraftDayModal} style={customStyle.m10}>
              //     Submit
              // </CustomeButton>
              <CustomeButton
                disabled={this.state.userAddress.street ? false : true}
                onClick={() => this.beforeEffectiveDateSelect()}
                style={customStyle.m10}
              >
                Submit
              </CustomeButton>
            )}

            {/* <CustomeButton disabled={this.state.userAddress.street ? false : true} onClick={this.submitAddress} style={customStyle.m10}>
                            Submit
                        </CustomeButton> */}
          </Modal.Footer>
        </Modal>

        <Modal
          size="md"
          show={this.state.targetDateModal}
          backdrop="static"
          centered
        >
          <Modal.Header>
            <Modal.Title>{i18n.t("SETUP_PAYMENT.MODAL_TITLE")}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.confirmPaymentErrorFlag ? (
              <div style={customStyle.QuickQtTopRightText2}>
                {this.state.errMsg}
              </div>
            ) : (this.props.isChangeProgram || this.props.isHouseholdUpdate) &&
              this.props.showHL ? (
              <div style={customStyle.QuickQtTopRightText2}>
                The new monthly charge will be applied to your payment account
                on <b>{this.state.nextRecurringDate}</b>. This is the date your
                new add-ons will begin.
              </div>
            ) : (this.props.isChangeProgram || this.props.isHouseholdUpdate) &&
              !this.props.showHL ? (
              <div style={customStyle.QuickQtTopRightText2}>
                The new monthly charge will be applied to your payment account
                on <b>{this.state.nextRecurringDate}</b>.
              </div>
            ) : (
              <div style={customStyle.QuickQtTopRightText2}>
                Your account will be charged when you submit this application.
                If you are not prepared to make payment at this time, you may
                logout now and then login at a later time complete the
                enrollment process when you’re ready to pay.
              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            {this.props.isChangeProgram || this.props.isHouseholdUpdate ? (
              <div>
                <NextButton
                  onClick={() =>
                    this.setState({
                      targetDateModal: false,
                      storedTranModal: false,
                      loaderShow: false,
                    })
                  }
                  style={{ marginRight: "10px" }}
                >
                  CANCEL
                </NextButton>
                <NextButton
                  onClick={() =>
                    this.state.confirmPaymentErrorFlag
                      ? this.setState({
                          targetDateModal: false,
                          storedTranModal: false,
                          loaderShow: false,
                        })
                      : this.handleDateModal()
                  }
                >
                  ACCEPT
                </NextButton>
              </div>
            ) : (
              <NextButton
                onClick={() =>
                  this.state.confirmPaymentErrorFlag
                    ? this.setState({
                        targetDateModal: false,
                        storedTranModal: false,
                        loaderShow: false,
                      })
                    : this.handleDateModal()
                }
              >
                {i18n.t("BUTTON.OK")}
              </NextButton>
            )}
          </Modal.Footer>
        </Modal>

        <Modal
          size="md"
          show={this.state.storedTranModal}
          backdrop="static"
          centered
        >
          <Modal.Header>
            <Modal.Title>{i18n.t("SETUP_PAYMENT.MODAL_TITLE")}</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ margin: "15px" }}>
            <div style={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid sm={12} xs={12} md={6} lg={12}>
                  {this.state.waitingRes === "true" ? (
                    <div className="text-center">
                      <span>
                        <img
                          style={{ height: "50px" }}
                          src={require("../../../Assets/Images/hour_glass.gif")}
                        />
                      </span>
                      <p className="text-center">
                        <span className="text-center">
                          {" "}
                          <b>Please wait...</b>
                        </span>
                        <p className="text-center">Checking payment details</p>
                      </p>
                    </div>
                  ) : (
                    <div className="text-center">
                      <span>{this.state.waitingRes}</span>
                    </div>
                  )}
                </Grid>
              </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer
            style={{
              display:
                this.state.waitingRes !== "true" && this.state.waitingRes !== ""
                  ? "block"
                  : "none",
            }}
          >
            <NextButton
              style={{ float: "right" }}
              onClick={() => {
                this.setState({
                  waitingRes: "",
                  storedTranModal: false,
                  loaderShow: false,
                });
              }}
            >
              {i18n.t("BUTTON.OK")}
            </NextButton>
          </Modal.Footer>
        </Modal>

        <Modal
          size="lg"
          show={this.state.draftDayModal}
          onHide={() => this.handleDraftModalClose()}
          backdrop="static"
          centered
        >
          <Modal.Header style={customStyle.modal_header} closeButton>
            <Modal.Title>Choose When You Want to be Charged</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              minHeight: "430px",
              overflowY: "auto",
              textAlign: "justify",
              wordSpacing: "2px",
            }}
          >
            {this.state.loaderShow ? <Loader></Loader> : ""}
            <p
              style={{
                textAlign: "left",
                fontSize: "15px",
                fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              }}
            >
              To make it easier for you to plan your cash flow, you can decide
              when your monthly payment is processed. Please select how many
              days before payment due date, you would like your account to be
              charged.
            </p>

            <div>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="days"
                  name="row-radio-buttons-group"
                  value={this.state.draftDaySelected}
                  onChange={(event) =>
                    this.answerChangeHandler(event, "radio", "")
                  }
                >
                  <FormControlLabel
                    value="5"
                    control={<PurpleRadio />}
                    label="5 days"
                  />
                  <FormControlLabel
                    value="7"
                    control={<PurpleRadio />}
                    label="7 days"
                  />
                  {/* <FormControlLabel
                    value="10"
                    control={<PurpleRadio />}
                    label="10 days"
                  />
                  <FormControlLabel
                    value="15"
                    control={<PurpleRadio />}
                    label="15 days"
                  /> */}
                </RadioGroup>
              </FormControl>
            </div>

            <div style={{ padding: "15px 0 0 0" }}>
              {this.state.draftDaySelected ? (
                <div>
                  {/* <p style={{ textAlign: 'left', fontSize: '15px', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', margin: '0 0 5px 0' }}>
                                        Your program effective date is <b>{this.state.effectivePaymentDate}</b>
                                    </p>
                                    <p style={{ textAlign: 'left', fontSize: '15px', fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', margin: '0 0 5px 0' }}>
                                        Today <b>{this.state.todayDate}</b> you will be charged the application fee of <b>{this.state.initialApplicationFee}</b>. Your first payment of <b>{this.state.firstPaymentAmount}</b>. will be charged on <b>{this.state.firstPaymentDate}</b>
                                    </p> */}

                  <div className="row effectiveDateSection">
                    <div className="col-5">Program Effective Date</div>
                    <div className="col-2"></div>
                    <div className="col-5">
                      {this.state.effectivePaymentDate}
                    </div>
                  </div>

                  <div className="paymentDatesWrapper">
                    <h5>Key Payment Dates</h5>

                    <div className="row detailsTable detailsTableHeader">
                      <div className="col-4 col-md-5 detailsTableRow">
                        Description
                      </div>
                      <div className="col-4 col-md-2 detailsTableRow">
                        Amount
                      </div>
                      <div className="col-4 col-md-5 detailsTableRow">Date</div>
                    </div>

                    <div className="row detailsTable">
                      <div className="col-4 col-md-5 detailsTableRow">
                        Application Fee
                      </div>
                      <div className="col-4 col-md-2 detailsTableRow">
                        {this.state.initialApplicationFee}
                        {this.state.activeTab === 0 ? null : <span>&#42;</span>}
                      </div>
                      <div className="col-4 col-md-5 detailsTableRow">
                        {this.state.todayDate}
                      </div>
                    </div>

                    <div className="row detailsTable">
                      <div className="col-4 col-md-5 detailsTableRow">
                        First Payment
                      </div>
                      <div className="col-4 col-md-2 detailsTableRow">
                        {this.state.firstPaymentAmount}
                        {this.state.activeTab === 0 ? null : <span>&#42;</span>}
                      </div>
                      <div className="col-4 col-md-5 detailsTableRow">
                        {this.state.firstPaymentDate}
                      </div>
                    </div>

                    <div className="row detailsTable">
                      <div className="col-4 col-md-5 detailsTableRow">
                        Recurring Monthly Payments
                      </div>
                      <div className="col-4 col-md-2 detailsTableRow">
                        {this.state.firstPaymentAmount}
                        {this.state.activeTab === 0 ? null : <span>&#42;</span>}
                      </div>
                      <div className="col-4 col-md-5 detailsTableRow">
                        {this.state.subsequentPaymentDate} of Every Month
                        <sup>+</sup>
                      </div>
                    </div>

                    <div style={{ padding: "5px 10px" }}>
                      {this.state.activeTab === 0 ? null : (
                        <h6>
                          {/* <span>&#42;</span>0% merchant fees apply on credit
                          card payments */}
                        </h6>
                      )}
                      <h6>
                        <span>
                          <sup>+</sup>
                        </span>
                        The actual date may change based on the number of days
                        in the month
                      </h6>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <CustomeButton
              onClick={() => this.handleDraftModalClose()}
              style={customStyle.m10}
            >
              {i18n.t("BUTTON.CANCEL")}
            </CustomeButton>
            <CustomeButton
              disabled={this.state.firstPaymentDate ? false : true}
              onClick={this.submitDraftDay}
              style={customStyle.m10}
            >
              Submit
            </CustomeButton>
          </Modal.Footer>
        </Modal>

        {/* ---effective date select modal---  */}

        <Modal
          size="xs"
          show={this.state.effectiveDateModal}
          onHide={(event) =>
            this.setState({ effectiveDateModal: false, loaderShow: false })
          }
          backdrop="static"
          centered
        >
          <Modal.Header style={customStyle.modal_header} closeButton>
            <Modal.Title>Message</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              margin: "10px",
              fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              fontSize: "14px",
            }}
          >
            <div style={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                <Grid item sm={12} xs={12} md={6} lg={12}>
                  The Program Effective Date you selected is no longer valid.
                  Please select a new date when you'd prefer the benefit to
                  begin.
                </Grid>
                <Grid item sm={12} xs={12} md={6} lg={12}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      required
                      onBlur={() => this.setState({ birthDtFocus: true })}
                      onMouseOver={() => this.setState({ birthDt: true })}
                      onMouseLeave={() => this.setState({ birthDt: false })}
                      autoComplete="off"
                      margin="none"
                      id="date-picker-dialog"
                      label="Select Program Effective Date"
                      format="MM/dd/yyyy"
                      error={this.state.dateErr} //&&!this.state.todayDateValid
                      helperText={this.state.dateErr ? "Enter valid date" : ""} //this.state.todayDateValid?'Date Required':
                      value={myDate} //this.state.todayDateValid?null:
                      onFocus={(e) => e.target.blur()}
                      onCopy={this.handlerCopy}
                      onPaste={this.handlerCopy}
                      inputProps={{
                        style: {
                          fontSize: "18px",
                          fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                          paddingLeft: "11px",
                          paddingRight: "10px",
                          marginTop: "11px",
                          "&:focus": { outline: "none" },
                          color: !this.state.birthDt ? "grey" : "#533278",
                        },
                      }}
                      InputLabelProps={{
                        style: {
                          paddingLeft: 10,
                          paddingRight: 10,
                          paddingTop: 12,
                          color: !this.state.birthDtFocus
                            ? "grey"
                            : this.state.birthDt
                            ? "#533278"
                            : "grey",
                        },
                      }} //|| !this.state.todayDateValid
                      onChange={this.handleDateChange.bind(this)}
                      variant="filled"
                      // onMouseEnter={this.handleHover}
                      TextFieldComponent={CssTextField}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                      style={{ width: "100%" }}
                      minDate={new Date(tomorrow)}
                      // maxDate={new Date(futureDate)}
                    />
                    <span id="bd" style={customStyle.EnrollNew2Span}></span>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ alignItems: "right" }}>
            <CustomeButton
              disabled={this.state.beforeEffectiveDate < new Date()}
              style={{ marginTop: "10px", width: "50px", height: "40px" }}
              onClick={() => this.openDraftDayModal()}
            >
              Done
            </CustomeButton>
            {/* <CustomeButton disabled={this.state.targetDate < new Date()} style={{ marginTop: '10px', width: '50px', height: '40px' }} onClick={() => this.saveTargetDate()}>Done</CustomeButton> */}
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subId: state.subId,
  };
};

export default connect(mapStateToProps)(SetupPayment);
