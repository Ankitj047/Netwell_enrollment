import DateFnsUtils from "@date-io/date-fns";
import { TextField } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import LinearProgress from "@material-ui/core/LinearProgress";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from "@material-ui/pickers";
import { Auth } from "aws-amplify";
import axios from "axios";
import html2canvas from "html2canvas";
import moment from "moment";
import React from "react";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";
import Cookies from "universal-cookie";
import customStyle from "../../../Assets/CSS/stylesheet_UHS";
import configuration from "../../../configurations";
import i18n from "../../../i18next";
import CommonTable from "../../CommonScreens/commonTable";
import Sample from "../../CommonScreens/sampleTextField";
import Loader from "../../loader";
import SignScroll from "./SignScroll";
import customeClasses from "./SubmitApplication.css";
import TextSignature from "./TextSignature";

const cookies = new Cookies();

const styles = (props) => ({
  colorPrimary: {
    backgroundColor: "#f2f2f2",
    width: "100%",
    marginTop: "24px",
    height: "10px",
    marginBottom: "34px",
  },
  barColorPrimary: {
    backgroundColor: "#533278",
  },
});

const ViewButton = withStyles(customStyle.viewBtn)(Button);

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

// const WizardButton = withStyles(customStyle.viewBtn)(Button);

// const FinishButton = withStyles(customStyle.proceedBtn)(Button);

// const CustomeButton = withStyles(customStyle.viewBtn)(Button);

// const NextButton = withStyles(customStyle.NextButton)(Button);

const WizardButton = withStyles(customStyle.viewNetwellBtn)(Button);

const FinishButton = withStyles(customStyle.proceedNetwellBtn)(Button);

const CustomeButton = withStyles(customStyle.viewNetwellBtn)(Button);

const NextButton = withStyles(customStyle.NextButtonNetwell)(Button);

const PurpleRadio = withStyles(customStyle.radioBtn)((props) => (
  <Radio color="default" {...props} />
));

const AUTH_PDF_URL =
  "https://carynhealth-memberportal-prod-documents.s3.us-east-2.amazonaws.com/Important+Documents/UHS-Sharing-Program-Authorizations.pdf";

var reenrollmentFlag = false;

class SubmitApplication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1,
      progress: 0,
      loaderShow: false,
      authorization: false,
      healthTerms: false,
      fullName: "",
      submitDone: false,
      modalShow: false,
      successModal: false,
      popUpMsg: "",
      modalShowPrivacy: false,
      modalShow4Privacy: false,
      authModalShow: false,
      authModalShow4: false,
      privacyPolicy: false,
      privacyPolicy4: false,
      authorize: false,
      authorize4: false,
      authorize1: false,
      nextDisabled: true,
      finaceAuth: false,
      financeAuthModalShow: false,
      authModalShow1: false,
      authorize44: false,
      paymentScreenModal: false,
      planFamilyDetails: [],
      programName: "",
      otherQuote: [],
      todayPayment: [],
      text: "",
      recurringPayment: [],
      totalCost: "",
      headerData: [],
      tooltipData: [],
      plansList: [],
      totalPayment: {},
      planSelectionModal: false,
      enrollFlag: false,
      phoneNumber: "",
      contactModal: false,
      countryCode: "+1",
      targetDate: null,
      targetDateModal: false,
      dateErr: false,
      birthDtFocus: false,
      birthDt: false,
      agentName: "",
      emailPhoneModal: false,
      email: "",
      isvalidEmailPhone: true,
      validationError: false,
      reqType: "",
      tableData: null,
      popTable: null,
      FamilyDetailsMoreInfoModal: false,
      fromMember: false,
      emailModal: false,
      fromLogin: false,
      enroll: false,
      showCommonErrorModal: false,
      inviteStatusModal: false,
      inviteStatusFlag: false,
      inviteStatus: "",
      draftDayModal: false,
      draftDaySelected: "",
      memberPlanInfo: "",
      effectivePaymentDate: "",
      firstPaymentDate: "",
      firstPaymentAmount: "",
      todayDate: "",
      initialApplicationFee: "",
      subsequentPaymentDate: "",
      creditCard: false,
      openSignScroll: false,
      clearSign: false,
      signType: "stylized",

      payflag: null,

      canvasChanged: false,
      canvasDone: false,
      imgUrl: "",
      signScrollImage: null,
      isValidFullName: true,
      submitText: null,
    };

    this.child = React.createRef();
  }

  /*------------------Finance Auth Modal------------------------*/
  showFinanceAuthModal = (event) => {
    this.setState(
      {
        financeAuthModalShow: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  hideModalFinaceAuth = (event) => {
    this.setState(
      {
        financeAuthModalShow: false,
        authorization: false,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  hideModalFinaceAuth11 = (event) => {
    if (this.state.authorization == false) {
      this.setState(
        {
          financeAuthModalShow: false,
          authorization: false,
        },
        () => {
          this.getDisabled();
        }
      );
    } else {
      this.setState(
        {
          financeAuthModalShow: false,
          authorization: true,
        },
        () => {
          this.getDisabled();
        }
      );
    }
  };

  acceptFinaceAuth = () => {
    this.setState(
      {
        financeAuthModalShow: false,
        authorization: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  /*================================ privacy policy modal ===============================*/
  hideModalPrivacy = (event) => {
    this.setState(
      {
        modalShowPrivacy: false,
        privacyPolicy: false,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  hideModalPrivacy11 = (event) => {
    if (this.state.privacyPolicy == true) {
      this.setState(
        {
          modalShowPrivacy: false,
          privacyPolicy: true,
        },
        () => {
          this.getDisabled();
        }
      );
    } else {
      this.setState(
        {
          modalShowPrivacy: false,
          privacyPolicy: false,
        },
        () => {
          this.getDisabled();
        }
      );
    }
  };

  /*---------------------  privacy 4--------- */
  hideModal4Privacy = (event) => {
    this.setState(
      {
        authModalShow4: false,
        authorize44: false,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  hideModal4Privacy11 = (event) => {
    if (this.state.privacyPolicy4 == false) {
      this.setState(
        {
          authModalShow4: false,
          privacyPolicy4: false,
        },
        () => {
          this.getDisabled();
        }
      );
    } else {
      this.setState(
        {
          authModalShow4: false,
          privacyPolicy4: true,
        },
        () => {
          this.getDisabled();
        }
      );
    }
  };

  showModalPopup = (event) => {
    if (event.target.checked) {
      this.setState(
        {
          modalShow: false,
          privacyPolicy: true,
        },
        () => {
          this.getDisabled();
        }
      );
    } else {
      this.setState(
        {
          modalShow: false,
          privacyPolicy: false,
        },
        () => {
          this.getDisabled();
        }
      );
    }
  };

  viewPlanHideModal = (event) => {
    this.setState(
      {
        modalShowPrivacy: false,
        privacyPolicy: false,
        loaderShow: false,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  checkPrivacy = (event) => {
    if (event.target.checked) {
      this.setState(
        {
          privacyPolicy: true,
        },
        () => {
          this.getDisabled();
        }
      );
    } else {
      this.setState(
        {
          privacyPolicy: false,
        },
        () => {
          this.getDisabled();
        }
      );
    }
  };

  showPlansModalPrivacy = () => {
    if (this.state.privacyPolicy == true) {
      this.setState({ privacyPolicy: true, modalShowPrivacy: true });
    } else {
      this.setState(
        {
          modalShowPrivacy: true,
          privacyPolicy: false,
          // loaderShow : true
        },
        () => {
          this.getDisabled();
        }
      );
    }
  };

  acceptPrivacyPolicy = () => {
    this.setState(
      {
        modalShowPrivacy: false,
        privacyPolicy: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  acceptPrivacyPolicy4 = () => {
    this.setState(
      {
        authModalShow4: false,
        authorize44: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };
  /*================================ privacy policy modal ===============================*/

  /*============================authoroise modal ====================================*/
  authorizeHideModal = (event) => {
    this.setState(
      {
        authModalShow: false,
        authorize: false,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  authorizeHideModal22 = (event) => {
    if (this.state.authorize == false) {
      this.setState(
        {
          authModalShow: false,
          authorize: false,
        },
        () => {
          this.getDisabled();
        }
      );
    } else {
      this.setState(
        {
          authModalShow: false,
          authorize: true,
        },
        () => {
          this.getDisabled();
        }
      );
    }
  };

  authorizeHideModal1 = (event) => {
    this.setState(
      {
        authModalShow1: false,
        authorize1: false,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  authorizeHideModal111 = (event) => {
    if (this.state.authorize1 == false) {
      this.setState(
        {
          authModalShow1: false,
          authorize1: false,
        },
        () => {
          this.getDisabled();
        }
      );
    } else {
      this.setState(
        {
          authModalShow1: false,
          authorize1: true,
        },
        () => {
          this.getDisabled();
        }
      );
    }
  };

  showAuthorizeModalPopup = (event) => {
    this.setState(
      {
        authModalShow: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  toggleSignScrollModal = (mode) => {
    this.setState({
      openSignScroll: mode,
    });
  };

  changeSignType = (e, v) => {
    this.setState({
      signType: v,
      fullName: v === "stylized" ? "" : this.state.fullName,
    });
  };

  handleSignClear = () => {
    this.child.current.clearCanvas();
  };

  dataURItoBlob(dataURI) {
    let byteString = atob(dataURI.split(",")[1]);

    let mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];

    let ab = new ArrayBuffer(byteString.length);
    let ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ab], { type: mimeString });
  }

  handleSignDone = () => {
    this.child.current.cropImageFromCanvas();
    this.child.current.disableCanvas();

    this.setState({
      canvasDone: true,
      canvasChanged: false,
    });
    this.nameChangeHandler(this.state.fullName, this.state.fullName !== "");
    const img = this.child.current.convertCanvasToImage();

    this.setState({
      isValidFullName: this.state.fullName === "" ? false : true,
    });

    return img.src;
  };

  showAuthorizeModalPopup4 = (event) => {
    this.setState(
      {
        authModalShow4: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  showAuthorizeModalPopup2 = (event) => {
    this.setState(
      {
        authModalShow1: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  checkFellowshipStatus = () => {
    this.setState(
      {
        authorize: !this.state.authorize,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  acceptAuthorization = () => {
    this.setState(
      {
        authModalShow: false,
        authorize: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  acceptAuthorization1 = () => {
    this.setState(
      {
        authModalShow1: false,
        authorize1: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };
  /*============================authoroise modal ====================================*/

  showPlansModal1 = (event) => {
    this.setState({
      modalShow: true,
    });
  };

  reduceProgress = () => {
    if (this.state.count > 0) {
      this.setState(
        {
          count: this.state.count - 1,
          progress: ((this.state.count - 1) / 4) * 100,
          canvasChanged: false,
          canvasDone: false,
          fullName: "",
        },
        () => {
          this.getDisabled();
        }
      );
    }
  };

  increaseProgress = () => {
    this.setState({
      loaderShow: true,
    });
    let obj = new Object();
    obj.subId = this.props.subId;
    if (this.state.count === 1) {
      obj.policy = true;
      obj.ipAddress = sessionStorage.getItem("PUBLIC-IP");
    } else if (this.state.count === 2) {
      obj.financialPolicy = true;
    } else if (this.state.count === 3) {
      obj.sharePolicy = true;
    }

    axios
      .post(configuration.baseUrl + "/enrollment/saveAuthorization", obj)
      .then((response) => {
        if (response.data.code === 200) {
          if (this.state.count < 4) {
            this.setState(
              {
                count: this.state.count + 1,
                progress: ((this.state.count + 1) / 4) * 100,
                loaderShow: false,
              },
              () => {
                this.getDisabled();
              }
            );
          }
        }
      });
  };

  nameChangeHandler = (val, isValid, parentObj) => {
    if (isValid) {
      this.setState({
        fullName: val,
        isValidFullName: true,
      });
    } else {
      this.setState({
        fullName: "",
        isValidFullName: false,
      });
    }
  };

  //--- Draft Day ------>

  openDraftDayModal = () => {
    this.setState({
      loaderShow: true,
      addressModal: false,
      draftDayModal: true,
    });

    fetch(
      configuration.baseUrl +
        "/setuppayment/getPaymentDetails/" +
        this.props.subId
    )
      .then((response) => response.json())
      .then((response) => {
        if (response.response) {
          var totalAmount = response.response.amount;

          if (response.response.paymentType === "CC") {
            var calApplicatioFee = 1 + 1 * 0.035;
            calApplicatioFee = calApplicatioFee.toFixed(2);
            this.setState({
              initialApplicationFee: "$1",
              firstPaymentAmount: (totalAmount - calApplicatioFee).toFixed(2),
              creditCard: true,
            });
          } else {
            this.setState({
              initialApplicationFee: "$1",
              firstPaymentAmount: (totalAmount - 0).toFixed(2),
              creditCard: false,
            });
          }
        }
      })
      .catch((error) => {
        console.log(error);
      });

    var tDate = new Date();

    fetch(configuration.baseUrl + "/plan/getMemberPlan/" + this.props.subId)
      .then((selectedPlan) => selectedPlan.json())
      .then((selectedPlan) => {
        if (selectedPlan.response) {
          this.setState({
            loaderShow: false,
            memberPlanInfo: selectedPlan.response,
            //firstPaymentAmount: getFirstPaymentAmount,
            todayDate: moment(tDate).format("dddd, MMMM Do, YYYY"),
          });

          console.log("==selectedPlan==", selectedPlan.response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  answerChangeHandler = (event, name, optionId) => {
    if (name === "radio") {
      var paymentDate = moment(this.state.targetDate)
        .subtract(event.target.value, "days")
        .format("MM/DD/YYYY");
      var getSubsequentPaymentDate = moment(this.state.targetDate)
        .subtract(event.target.value, "days")
        .format("MM/DD/YYYY");

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
        effectivePaymentDate: moment(this.state.targetDate).format(
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
    });
  };

  submitDraftDay = () => {
    let data = {
      subId: this.state.memberPlanInfo.subId,
      planId: this.state.memberPlanInfo.planId,
      planCode: this.state.memberPlanInfo.planCode,
      amount: this.state.memberPlanInfo.amount,
      targetDate: moment(this.state.targetDate).format("YYYY-MM-DD"),
      acsm: this.state.memberPlanInfo.acsm,
      draftDay: parseInt(this.state.draftDaySelected),
    };

    console.log("====saveMemberPlan===", data);

    axios
      .post(configuration.baseUrl + "/plan/saveMemberPlan", data)
      .then((response) => {
        this.setState({
          loaderShow: false,
          draftDayModal: false,
          targetDateModal: false,
        });
        this.saveApplication();
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          successModal: true,
          popUpMsg: "Internal Server Error",
          loaderShow: false,
        });
      });
  };

  saveTargetDate = () => {
    //-- Not using this call as we are showing draft day [Safal 29 Oct]
    this.setState({ targetDateModal: false, loaderShow: true });

    let date = moment(this.state.targetDate).format("YYYY-MM-DD");
    let obj = {
      subId: this.props.subId,
      targetDate: date,
    };
    axios
      .post(configuration.baseUrl + "/plan/updateBenefitBeginDate", obj)
      .then((res) => {
        console.log("============ res ===============");
        console.log(res);
        if (res.data.code === 200) {
          this.saveApplication();
        } else {
          this.setState({
            successModal: true,
            popUpMsg: "Internal Server Error",
            loaderShow: false,
          });
        }
      });
  };

  uploadImage = async (file) => {
    this.setState({
      loaderShow: true,
    });
    let formData = new FormData();
    formData.append(
      "file",
      file,
      `${
        JSON.parse(localStorage.getItem("CurrentLoginUser")).id
      }-${new Date().getTime()}.png`
    );

    await axios
      .post(configuration.baseUrl + "/enrollment/uploadImage", formData)
      .then((res) => {
        this.setState({
          loaderShow: false,
          imgUrl: res.data.response,
        });
        return res.data.response;
      });
  };

  textSignatureToImage = () => {
    let node = document.getElementById("signTextContent");
    return html2canvas(node).then(function (canvas) {
      return canvas.toDataURL("image/png");
    });
  };

  beforeSaveApplication = async () => {
    this.setState({
      loaderShow: true,
    });

    if (this.state.signType === "stylized") {
      const img = await this.textSignatureToImage();
      await this.uploadImage(this.dataURItoBlob(img));
    }

    if (this.state.signType === "scribble") {
      await this.uploadImage(this.dataURItoBlob(this.handleSignDone()));
    }

    let obj = new Object();
    obj.subId = this.props.subId;
    obj.signedName = this.state.fullName;
    obj.esign = this.state.imgUrl;

    await axios
      .post(configuration.baseUrl + "/enrollment/saveAuthorization", obj)
      .then((response) => {
        if (response.data.code === 200) {
          fetch(
            configuration.baseUrl + "/plan/getMemberPlan/" + this.props.subId
          )
            .then((selectedPlan) => selectedPlan.json())
            .then((selectedPlan) => {
              if (
                (this.state.fromMember == false &&
                  this.state.fromLogin == false) ||
                this.state.enroll
              ) {
                if (selectedPlan.response) {
                  let date = moment(selectedPlan.response.targetDate);
                  let now = moment();

                  if (date < now) {
                    this.setState({
                      targetDate: date,
                      targetDateModal: true,
                      loaderShow: false,
                    });
                  } else {
                    this.saveApplication();
                  }
                }
              } else {
                this.saveApplication();
              }
            });
        }
      });
  };

  saveApplication = () => {
    this.setState({
      loaderShow: true,
    });
    console.log("payflag---", this.state.payflag);
    let data = new Object();
    data.email = this.state.email;
    data.esign = this.state.imgUrl; //this.props.email

    console.log(":::::::::::: obj", data);

    if (
      this.state.fromMember == false &&
      this.state.fromLogin == false &&
      reenrollmentFlag == false &&
      this.state.enroll
    ) {
      axios
        .post(configuration.baseUrl + "/setuppayment/payment", data)
        .then((response) => {
          if (this.state.payflag == false) {
            if (response.data.code === 200) {
              let evt = new CustomEvent("paymentFlag", {
                detail: { flag: true },
              });
              window.dispatchEvent(evt);

              fetch(
                configuration.baseUrl +
                  "/enrollment/saveEnrollmentMember/" +
                  this.props.subId
              )
                .then((response) => response.json())
                .then((response) => {
                  if (response.code === 200) {
                    let evt = new CustomEvent("enroll_flag", {
                      detail: { flag: true },
                    });
                    window.dispatchEvent(evt);
                    localStorage.removeItem("paymentData");
                    localStorage.removeItem("PAYMENT_ERROR");
                    this.setState({
                      submitDone: true,
                      successModal: false,
                      count: 5,
                      loaderShow: false,
                    });
                  } else if (response.code === 202) {
                    this.setState({
                      loaderShow: false,
                      submitDone: false,
                      successModal: true,
                      popUpMsg:
                        "Oops! Something's not right.",
                    });
                  } else if (response.code === 500) {
                    this.setState({
                      loaderShow: false,
                      submitDone: false,
                      successModal: true,
                      popUpMsg:
                        "Oops! Something's not right.",
                    });
                  } else {
                    this.setState({
                      loaderShow: false,
                      submitDone: false,
                      successModal: true,
                      popUpMsg:
                        "Oops! Something's not right.",
                    });
                  }
                })
                .catch((error) => {
                  this.setState({
                    loaderShow: false,
                    submitDone: false,
                    successModal: true,
                    popUpMsg:
                      "Oops! Something's not right.",
                  });
                });
            } else if (response.data.code === 202) {
              let x = JSON.parse(response.data.response).error_message;
              let errMsg = "";
              if (x.includes("-")) {
                let cds = x.split(" - ");
                errMsg = cds[1];
              } else {
                errMsg = x;
              }
              localStorage.setItem(
                "PAYMENT_ERROR",
                JSON.stringify({
                  loaderShow: false,
                  successModal: true,
                  responseCode: 203,
                  errMsg: errMsg,
                })
              );
              let evt = new CustomEvent("redirect_to_payment", {
                detail: { flag: true },
              });
              window.dispatchEvent(evt);

              let evtNew = new CustomEvent("paymentFlag", {
                detail: { flag: false },
              });
              window.dispatchEvent(evtNew);
            } else if (response.data.code === 500) {
              localStorage.setItem(
                "PAYMENT_ERROR",
                JSON.stringify({
                  loaderShow: false,
                  successModal: true,
                  responseCode: 500,
                })
              );
              let evt = new CustomEvent("redirect_to_payment", {
                detail: { flag: true },
              });
              window.dispatchEvent(evt);
              let evtNew = new CustomEvent("paymentFlag", {
                detail: { flag: false },
              });
              window.dispatchEvent(evtNew);
            }
          } else if (this.state.payflag == true) {
            fetch(
              configuration.baseUrl +
                "/enrollment/saveEnrollmentMember/" +
                this.props.subId
            )
              .then((response) => response.json())
              .then((response) => {
                if (response.code === 200) {
                  let evt = new CustomEvent("enroll_flag", {
                    detail: { flag: true },
                  });
                  window.dispatchEvent(evt);
                  localStorage.removeItem("paymentData");
                  localStorage.removeItem("PAYMENT_ERROR");
                  this.setState({
                    submitDone: true,
                    successModal: false,
                    count: 5,
                    loaderShow: false,
                  });
                } else if (response.code === 202) {
                  this.setState({
                    loaderShow: false,
                    submitDone: false,
                    successModal: true,
                    popUpMsg:
                      "Oops! Something's not right.",
                  });
                } else if (response.code === 500) {
                  this.setState({
                    loaderShow: false,
                    submitDone: false,
                    successModal: true,
                    popUpMsg:
                      "Oops! Something's not right.",
                  });
                } else {
                  this.setState({
                    loaderShow: false,
                    submitDone: false,
                    successModal: true,
                    popUpMsg:
                      "Oops! Something's not right.",
                  });
                }
              })
              .catch((error) => {
                this.setState({
                  loaderShow: false,
                  submitDone: false,
                  successModal: true,
                  popUpMsg:
                    "Oops! Something's not right.",
                });
              });
          }
        })

        .catch((error) => {
          console.log(error);
        });
    } else {
      // localStorage.removeItem('paymentData');
      // localStorage.removeItem('PAYMENT_ERROR');
      fetch(
        configuration.baseUrl +
          "/enrollment/saveEnrollmentMember/" +
          this.props.subId
      )
        .then((response) => response.json())
        .then((response) => {
          if (response.code === 200) {
            let evt = new CustomEvent("enroll_flag", {
              detail: { flag: true },
            });
            window.dispatchEvent(evt);
            localStorage.removeItem("paymentData");
            localStorage.removeItem("PAYMENT_ERROR");
            this.setState({
              submitDone: true,

              count: reenrollmentFlag ? 5 : 6,
              loaderShow: false,
            });
          } else if (response.code === 202) {
            this.setState({
              loaderShow: false,
              submitDone: false,
              successModal: true,
              popUpMsg:
                "Oops! Something's not right.",
            });
          } else if (response.code === 500) {
            this.setState({
              loaderShow: false,
              submitDone: false,
              successModal: true,
              popUpMsg:
                "Oops! Something's not right.",
            });
          } else {
            this.setState({
              loaderShow: false,
              submitDone: false,
              successModal: true,
              popUpMsg:
                "Oops! Something's not right. If you're still having trouble, call us on (800) 921-4505",
            });
          }
        })
        .catch((error) => {
          this.setState({
            loaderShow: false,
            submitDone: false,
            successModal: true,
            popUpMsg:
              "Oops! Something's not right. If you're still having trouble, call us on (800) 921-4505",
          });
        });
    }
  };

  componentDidMount() {
    if (sessionStorage.getItem("notHLC") === "true")
      sessionStorage.setItem("current_screen", "8");
    else {
      sessionStorage.setItem("current_screen", "7");
    }
    this.setState({
      loaderShow: true,
    });
    let cookiesData = null;
    cookiesData = JSON.parse(sessionStorage.getItem("STATE_PARAM")); //cookies.get('STATE_PARAM', false);
    if (cookiesData && cookiesData.fromMember) {
      this.setState({ fromMember: true, fromLogin: false }); // for go to step select program
    } else if (cookiesData && cookiesData.fromLogin === true) {
      this.setState({ fromLogin: true, fromMember: false }); // for go to step select program
    } else {
      this.setState({ enroll: true });
    }

    let URL = "";
    if (this.props.isAgent) {
      //
      if (cookiesData && cookiesData.reEnrolledByAgent == true) {
        // from agent after enrolled
        this.setState({
          paymentScreenModal: true,
        });
      } else if (
        (cookiesData && cookiesData.fromMember == true) ||
        cookiesData.fromLogin == true
      ) {
        // from member
        this.setState({
          paymentScreenModal: false,
        });
      } else {
        this.setState({
          // from agent before enrolled
          paymentScreenModal: true,
        });
      }
    }

    let getDetails = JSON.parse(localStorage.getItem("CurrentLoginUser"));

    if (getDetails.email !== null || getDetails.email !== "") {
      this.setState({
        email: getDetails.email,
      });
    }

    console.log("=====agentDetails===");
    console.log(this.props.agentDetails);

    if (this.props.agentDetails && this.props.agentDetails.brokerId) {
      axios
        .get(
          configuration.agentURL +
            "/agentlogin/getAgentById/" +
            this.props.agentDetails.brokerId
        )
        .then((response) => {
          console.log(
            "===RESPONSE===",
            response.data.response.firstName +
              " " +
              response.data.response.lastName
          );
          this.setState({
            agentName:
              response.data.response.firstName +
              " " +
              response.data.response.lastName,
          });
        });
    }

    if (this.props.isAgent) {
      URL =
        configuration.baseUrl +
        "/setupfamily/getEnrollFlagBySubId/" +
        getDetails.id; //this.props.agentDetails.subId
    } else {
      URL =
        configuration.baseUrl +
        "/setupfamily/getEnrollFlag/" +
        this.props.email;
    }
    //axios.get(configuration.baseUrl + '/setupfamily/getEnrollFlag/' + this.props.email)
    axios.get(URL).then((response) => {
      let enFlag = response.data.response.enrollFlag;
      let paymentFlag = response.data.response.paymentFlag;
      let agentFlag = response.data.response.agentFlag;
      reenrollmentFlag = response.data.response.reenrollmentFlag
        ? response.data.response.reenrollmentFlag
        : false;
      this.setState({
        payflag: paymentFlag,
      });
      if (
        cookiesData &&
        (cookiesData.reEnrolledByAgent == false ||
          cookiesData.fromMember == false ||
          cookiesData.fromLogin == false)
      ) {
        axios
          .get(
            configuration.baseUrl +
              "/enrollment/getAuthorization/" +
              this.props.subId
          )
          .then((response) => {
            if (response.data.code === 200) {
              if (response.data.response.policy) {
                this.setState({
                  privacyPolicy: true,
                  authorize: true,
                  authorize1: true,
                  authorize44: true,
                  healthTerms: response.data.response.sharePolicy,
                  authorization: response.data.response.financialPolicy,
                });
              } else {
                this.setState({
                  privacyPolicy: false,
                  authorize: false,
                  authorize1: false,
                  authorize44: false,
                  healthTerms: response.data.response.sharePolicy,
                  authorization: response.data.response.financialPolicy,
                });
              }

              if (enFlag && paymentFlag) {
                this.setState({
                  count: 5,
                  submitDone: true,
                  planSelectionModal: false,
                  enrollFlag: enFlag,
                  loaderShow: false,
                });
              } else {
                if (agentFlag && !this.props.isAgent && !enFlag) {
                  if (
                    response.data.response.policy &&
                    response.data.response.sharePolicy &&
                    response.data.response.financialPolicy
                  ) {
                    this.setState(
                      {
                        planSelectionModal: true,
                        loaderShow: true,
                        count: 4,
                        enrollFlag: enFlag,
                        progress: (4 / 4) * 100,
                      },
                      () => this.getPlanData()
                    );
                  } else {
                    this.setState(
                      {
                        planSelectionModal: true,
                        loaderShow: true,
                        enrollFlag: enFlag,
                      },
                      () => this.getPlanData()
                    );
                  }
                } else {
                  if (
                    response.data.response.policy &&
                    response.data.response.sharePolicy &&
                    response.data.response.financialPolicy
                  ) {
                    this.setState({
                      count: 3,
                      submitDone: false,
                      paymentScreenModal: true,
                      enrollFlag: enFlag,
                      loaderShow: false,
                      progress: (3 / 4) * 100,
                    });
                  } else {
                    this.setState({
                      count: 1,
                      submitDone: false,
                      enrollFlag: enFlag,
                      loaderShow: false,
                    });
                  }
                }
              }
            }
            this.getDisabled();
          });
      } else {
        if (enFlag && paymentFlag && !this.props.isAgent && !reenrollmentFlag) {
          this.setState({
            count: 5,
            submitDone: true,
            planSelectionModal: false,
            enrollFlag: enFlag,
            loaderShow: false,
          });
        } else {
          this.setState({
            loaderShow: false,
            count: 1,
            privacyPolicy: false,
            authorize: false,
            authorize1: false,
            authorize44: false,
            healthTerms: false,
            authorization: false,
            enrollFlag: true,
            planSelectionModal:
              cookiesData != null
                ? cookiesData.reEnrolledByAgent
                  ? false
                  : true
                : true,
          });
        }
      }
    });

    axios
      .get(
        configuration.baseUrl + "/addon/getReviewChoices/" + this.props.subId
      )
      .then((response) => {
        this.setState(
          {
            tableData: response.data.response[0].header,
            popTable: response.data.response[0].popData.header[0],
          },
          () => {
            const id = this.state.popTable.header.indexOf("Surcharge"); // 2
            const removedSurcharge = this.state.popTable.header.splice(id, 1);
            let header = this.state.popTable.header.forEach((e) => {
              return delete e.Surcharge;
            });
            let body = this.state.popTable.body.forEach((e) => {
              delete e.surchargeAmount;
            });
          }
        );
      });
  }

  getPlanData = () => {
    fetch(configuration.baseUrl + "/plan/getMemberPlan/" + this.props.subId)
      .then((selectedPlan) => selectedPlan.json())
      .then((selectedPlan) => {
        let sharingPlan = selectedPlan.response.planId;
        let selectedPlanCode = selectedPlan.response.planCode;
        fetch(
          configuration.baseUrl + "/plan/quoteByPlanSummary/" + this.props.subId
        )
          .then((res) => res.json())
          .then((res) => {
            let amt = res.quote[res.quote.length - 1].amount.split("$");
            let surcharge =
              res.quote[res.quote.length - 1].surcharge.split("$");
            let val = parseFloat(amt[1]) + parseFloat(surcharge[1]);
            this.setState({
              planFamilyDetails: res.quote,
              headerData: res.header,
              loaderShow: false,
              otherQuote: res.selectPlan,
              text: res.text.text,
              todayPayment: res.todayPayment,
              recurringPayment: res.recurringPayment,
              totalCost: val.toFixed(2),
              sharingPlan: sharingPlan,
              selectedPlanCode: selectedPlanCode,
              tooltipData: res.surchargeTooltip,
              totalPayment: res.total,
            });
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  viewPlanHideModalHealth = (event) => {
    this.setState(
      {
        modalShow: false,
        healthTerms: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  viewPlanHideModalHealth11 = (event) => {
    this.setState({
      modalShow: false,
      healthTerms: false,
    });
  };

  viewPlanHideModalHealth1 = (event) => {
    if (this.state.healthTerms == false) {
      this.setState(
        {
          modalShow: false,
          healthTerms: false,
        },
        () => {
          this.getDisabled();
        }
      );
    } else {
      this.setState(
        {
          modalShow: false,
          healthTerms: true,
        },
        () => {
          this.getDisabled();
        }
      );
    }
  };

  showPlansModalHealth = (event) => {
    this.setState(
      {
        modalShow: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  handleClose = (event) => {
    if (sessionStorage.getItem("notHLC") === "true") {
      sessionStorage.setItem("current_screen", "8");
    } else {
      sessionStorage.setItem("current_screen", "7");
    }

    let currentScreen = sessionStorage.getItem("current_screen");

    if (this.props.isAgent) {
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
      this.setState({
        successModal: false,
      });
    }
  };

  handlerCopy(e) {
    e.preventDefault();
  }

  getDisabled = () => {
    if (this.state.count === 1) {
      if (
        this.state.privacyPolicy &&
        this.state.authorize &&
        this.state.authorize1
      ) {
        /* this.state.authorize44 */
        this.setState({
          nextDisabled: false,
        });
      } else {
        this.setState({
          nextDisabled: true,
        });
      }
    } else if (this.state.count === 2) {
      this.setState({
        nextDisabled: !this.state.authorization,
      });
    } else if (this.state.count === 3) {
      this.setState({
        nextDisabled: !this.state.healthTerms,
      });
    } else if (this.state.count === 4) {
      this.setState({
        nextDisabled: true,
      });
    }
  };

  handleLogout = () => {
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
          window.location.href = "/login";
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  getEmailPhoneDetails = (requestType) => {
    let CurrentLoginUser = JSON.parse(localStorage.getItem("CurrentLoginUser"));
    let stateParams = JSON.parse(sessionStorage.getItem("STATE_PARAM"));
    if (
      CurrentLoginUser.email == null ||
      CurrentLoginUser.email == "" ||
      CurrentLoginUser.phone == null ||
      CurrentLoginUser.phone == ""
    ) {
      axios.get("https://ipapi.co/json/").then((response) => {
        if (response && response.data) {
          let data = response.data;
          this.setState({
            countryCode: "+1",
          });
        }
      });

      this.setState({
        loaderShow: true,
        emailPhoneModal: true,
        reqType: requestType,
      });
    } else {
      if (stateParams.reEnrolledByAgent === true && requestType !== "sms") {
        this.setState({
          emailModal: true,
          loaderShow: true,
          reqType: requestType,
          email: CurrentLoginUser.email,
        });
      } else {
        this.goToAgentDashboard(requestType);
      }
    }
  };

  getInviteStatus = (requestType, phone) => {
    axios
      .get(
        configuration.baseUrl +
          "/setupfamily/getMemberBySubID/" +
          this.props.subId
      )
      .then((response) => {
        if (response.data.response) {
          let data = JSON.parse(JSON.stringify(response.data.response));
          console.log("---Invite status---", data.inviteStatus);
          this.setState(
            {
              inviteStatus:
                data.inviteStatus != null
                  ? moment(data.inviteStatus).format("DD MMM YYYY hh:mm a")
                  : null,
              reqType: requestType,
              phoneNumber: phone,
              loaderShow: false,
            },
            () => {
              if (this.state.inviteStatus == null) {
                this.sendAuthRequest(requestType, phone);
              } else {
                this.setState({
                  loaderShow: false,
                  inviteStatusModal: true,
                });
              }
            }
          );
        }
      });
  };

  closeInviteStatusModal = () => {
    this.setState(
      {
        inviteStatusModal: false,
        inviteStatus: "",
      },
      () => this.handleClose()
    );
  };

  goToAgentDashboard = (requestType) => {
    this.setState({
      loaderShow: true,
      paymentScreenModal: false,
    });
    let CurrentLoginUser = JSON.parse(localStorage.getItem("CurrentLoginUser"));
    if (requestType === "email") {
      if (CurrentLoginUser.email == this.state.email) {
        if (this.state.inviteStatusFlag == false) {
          this.getInviteStatus(requestType, CurrentLoginUser.phone);
        } else {
          this.sendAuthRequest(requestType, CurrentLoginUser.phone);
        }
      } else {
        let cookiesData = JSON.parse(sessionStorage.getItem("STATE_PARAM"));
        let dataObj = {
          subId: cookiesData.subID,
          email: this.state.email,
          phone: CurrentLoginUser.phone,
        };
        console.log("--SAVE EMAIL CALL --", dataObj);
        axios
          .post(configuration.baseUrl + "/setupfamily/saveEmail", dataObj)
          .then((response) => {
            if (response.data.code === 200) {
              if (this.state.inviteStatusFlag == false) {
                this.getInviteStatus(requestType, CurrentLoginUser.phone);
              } else {
                this.sendAuthRequest(requestType, CurrentLoginUser.phone);
              }
            }
          });
      }
    } else if (requestType === "sms") {
      let phone = "";
      if (CurrentLoginUser.phone.length === 13) {
        phone = CurrentLoginUser.phone.substr(3);
      } else {
        phone = CurrentLoginUser.phone.substr(2);
      }

      axios.get("https://ipapi.co/json/").then((response) => {
        if (response && response.data) {
          let data = response.data;
          this.setState({
            countryCode: "+1",
            contactModal: true,
            phoneNumber: phone,
          });
        }
      });
    }
  };

  setUserValue = (value, isValid, parentDetails) => {
    if (parentDetails.name === "email") {
      if (isValid) {
        this.setState(
          {
            email: value,
          },
          () => {
            this.checkEmailPhone();
          }
        );
      } else {
        this.setState({
          email: "",
          isvalidEmailPhone: true,
        });
      }
    } else if (parentDetails.name === "phone") {
      if (isValid) {
        this.setState(
          {
            phoneNumber: value,
          },
          () => {
            this.checkEmailPhone();
          }
        );
      } else {
        this.setState({
          phoneNumber: "",
          isvalidEmailPhone: true,
        });
      }
    }
  };

  setValue = (value, isValid, parentDetails) => {
    if (isValid) {
      this.setState({
        phoneNumber: value,
      });
    } else {
      this.setState({
        phoneNumber: "",
      });
    }
  };

  checkEmailPhone = () => {
    if (this.state.email && this.state.phoneNumber) {
      this.setState({
        isvalidEmailPhone: false,
      });
    }
  };

  confirmContact = () => {
    this.setState({
      loaderShow: true,
      contactModal: false,
    });
    let phone = this.state.countryCode + this.state.phoneNumber;
    this.getInviteStatus("sms", phone);
  };

  saveEmailPhone = () => {
    let cookiesData = JSON.parse(sessionStorage.getItem("STATE_PARAM"));

    let dataObj = {
      subId: cookiesData.subID,
      email: this.state.email,
      phone: this.state.countryCode + this.state.phoneNumber,
    };
    console.log("--dataObj --", dataObj);

    axios
      .post(configuration.baseUrl + "/setupfamily/saveEmail", dataObj)
      .then((response) => {
        if (response.data.code === 200) {
          let CurrentLoginUser = JSON.parse(
            localStorage.getItem("CurrentLoginUser")
          );
          let obj = {
            userName: CurrentLoginUser.userName,
            id: CurrentLoginUser.id,
            email: this.state.email,
            phone: this.state.countryCode + this.state.phoneNumber,
          };
          localStorage.setItem("CurrentLoginUser", JSON.stringify(obj));

          this.setState({
            emailPhoneModal: true,
            validationError: false,
          });

          this.goToAgentDashboard(this.state.reqType);
        } else if (response.data.code === 202) {
          this.setState({ validationError: true });
        }
      });
  };

  handleDateChange = (date, didMount) => {
    this.setState(
      {
        targetDate: date,
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

  sendAuthRequest = (requestType, phoneNumber) => {
    axios
      .get(
        configuration.baseUrl +
          "/enrollment/registration/" +
          this.state.email +
          "/" +
          phoneNumber +
          "/" +
          requestType
      ) //this.props.email
      .then((response) => {
        if (response && response.data.code === 200) {
          this.setState({
            loaderShow: false,
            successModal: true,
            inviteStatusModal: false,
            inviteStatus: "",
            popUpMsg:
              requestType === "sms"
                ? "Authorization SMS sent successfully!"
                : "Authorization mail sent successfully!",
          });
        } else if (response.data.code === 202) {
          this.setState({
            loaderShow: false,
            successModal: true,
            inviteStatusModal: false,
            inviteStatus: "",
            popUpMsg: "Authorization mail sent successfully!",
          });
        } else if (response.data.code === 204) {
          this.setState({
            loaderShow: false,
            successModal: true,
            inviteStatusModal: false,
            inviteStatus: "",
            popUpMsg:
              requestType === "sms"
                ? "The authorization SMS was RESENT!"
                : "The authorization email was RESENT!",
          });
        } else if (response.data.code === 409) {
          this.setState({
            loaderShow: false,
            successModal: true,
            inviteStatusModal: false,
            inviteStatus: "",
            popUpMsg: "User already exists in the given User Pool.",
          });
        } else if (response.data.code === 500) {
          this.setState({
            loaderShow: false,
            successModal: true,
            inviteStatusModal: false,
            inviteStatus: "",
            popUpMsg:
              "Oops! Something's not right.",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        if (error.response.status === 500) {
          this.setState({
            loaderShow: false,
            successModal: true,
            popUpMsg:
              "Oops! Something's not right.",
          });
        }
      });
  };

  handleBack = () => {
    this.setState(
      {
        paymentScreenModal: false,
      },
      () => {
        this.props.handlePrev();
      }
    );
  };

  handleReenrollClose = () => {
    this.handleLogout();
    window.close();
  };

  checkSubmitButtonDisabled = () => {
    if (this.state.count <= 4) {
      return true;
    } else {
      if (this.state.fullName === "") {
        return true;
      } else {
        if (this.state.signType !== "stylized") {
          if (!this.state.canvasDone) {
            return true;
          }
        }
      }
    }
    return false;
  };

  render() {
    const { classes } = this.props;
    let currentScreen = "";
    let myDate =
      moment(this.state.targetDate).format("MM") +
      "/" +
      moment(this.state.targetDate).format("DD") +
      "/" +
      moment(this.state.targetDate).format("YYYY");
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    let futureTomarow = new Date(today);
    let futureDate;
    if (
      this.state.clientId === "6548" ||
      this.state.clientId === "4367" ||
      this.state.clientId === "5540" ||
      this.state.clientId === "4376" ||
      this.state.clientId === "5541" ||
      this.state.clientId === "4377" ||
      this.state.clientId === "5558" ||
      this.state.clientId === "4386"
    ) {
      if (new Date() < new Date("05/01/2021")) {
        if (new Date() < new Date(this.state.empEffectiveDate)) {
          let efectiveDate = new Date(this.state.empEffectiveDate);
          let effectiveDay = new Date(this.state.empEffectiveDate).getDate();
          if (effectiveDay === 1 || effectiveDay > 1) {
            tomorrow.setDate(1);
            tomorrow.setMonth(new Date(efectiveDate).getMonth() + 1);

            futureTomarow.setDate(1);
            futureTomarow.setMonth(new Date(efectiveDate).getMonth() + 1);
          }
        } else {
          tomorrow.setDate(1);
          tomorrow.setMonth(4);
          futureTomarow.setDate(1);
          futureTomarow.setMonth(4);
        }
      } else if (new Date().getDate() === 1 || new Date().getDate() > 1) {
        if (new Date() < new Date(this.state.empEffectiveDate)) {
          let efectiveDate = new Date(this.state.empEffectiveDate);
          let effectiveDay = new Date(this.state.empEffectiveDate).getDate();
          if (effectiveDay === 1 || effectiveDay > 1) {
            tomorrow.setDate(1);
            tomorrow.setMonth(new Date(efectiveDate).getMonth() + 1);

            futureTomarow.setDate(1);
            futureTomarow.setMonth(new Date(efectiveDate).getMonth() + 1);
          }
        } else {
          tomorrow.setDate(1);
          tomorrow.setMonth(today.getMonth() + 1);
          futureTomarow.setDate(1);
          futureTomarow.setMonth(today.getMonth() + 1);
        }
      }
      futureDate = futureTomarow.setDate(futureTomarow.getDate() + 45);
    } else {
      futureDate = futureTomarow.setDate(futureTomarow.getDate() + 90);
    }

    if (this.state.count === 1) {
      currentScreen = (
        <Grid item xs={12} style={{ marginTop: "5px", marginBottom: "5px" }}>
          <Grid item xs={12} style={{ marginTop: "5px" }} id="11">
            <Grid item xs={2}>
              <Checkbox
                checked={this.state.privacyPolicy}
                inputProps={{
                  "aria-label": "secondary checkbox",
                }}
                style={{ color: "#533278", marginLeft: -12 }}
                onClick={this.showPlansModalPrivacy}
              />
            </Grid>
            <Grid
              item
              xs={10}
              style={{
                marginLeft: "25px",
                marginTop: "-36px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              }}
            >
              <span
                style={{
                  cursor: "pointer",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
                onClick={this.showPlansModalPrivacy}
              >
                {i18n.t("SUBMIT_APPLICATION.AGREE")}{" "}
                <span
                  style={{
                    color: "#533278",
                    cursor: "pointer",
                    fontWeight: "bold",
                    borderBottom: "1px solid #533278",
                  }}
                  onClick={this.showPlansModalPrivacy}
                >
                  {i18n.t("SUBMIT_APPLICATION.PRIVACY")}
                </span>
              </span>
            </Grid>
          </Grid>

          <Grid item xs={12} id="12">
            <Grid item xs={2}>
              <Checkbox
                checked={this.state.authorize1}
                inputProps={{
                  "aria-label": "secondary checkbox",
                }}
                style={{ color: "#533278", marginLeft: -12 }}
                onClick={this.showAuthorizeModalPopup2}
              />
            </Grid>
            <Grid
              item
              xs={10}
              style={{
                marginLeft: "25px",
                marginTop: "-36px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              }}
            >
              <span
                style={{ cursor: "pointer" }}
                onClick={this.showAuthorizeModalPopup2}
              >
                {i18n.t("SUBMIT_APPLICATION.AUTHORIZE2")}
                <span
                  style={{
                    color: "#533278",
                    cursor: "pointer",
                    fontWeight: "bold",
                    borderBottom: "1px solid #533278",
                  }}
                  onClick={this.showAuthorizeModalPopup2}
                >
                  {i18n.t("SUBMIT_APPLICATION.AUTHORIZE22")}
                </span>
              </span>
            </Grid>
          </Grid>

          <Grid item xs={12} style={{ marginBottom: "5px" }} id="13">
            <Grid item xs={2}>
              <Checkbox
                checked={this.state.authorize}
                inputProps={{
                  "aria-label": "secondary checkbox",
                }}
                style={{ color: "#533278", marginLeft: -12 }}
                onClick={this.checkFellowshipStatus}
              />
            </Grid>
            <Grid
              item
              xs={10}
              style={{
                marginLeft: "25px",
                marginTop: "-36px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              }}
            >
              <span style={{ cursor: "pointer" }}>
                {i18n.t("SUBMIT_APPLICATION.FELLOWSHIPCHECKBOX3")}
              </span>
            </Grid>
          </Grid>

          <Modal
            size="lg"
            show={this.state.modalShowPrivacy}
            centered
            onHide={(event) => this.hideModalPrivacy11(event)}
            backdrop="static"
          >
            <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title>
                {i18n.t("SUBMIT_APPLICATION.PRIVACY_TITLE")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "450px",
                overflowY: "auto",
                textAlign: "justify",
                wordSpacing: "-2px",
                overflowX: "none",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "15px",
              }}
            >
              {this.state.loaderShow ? <Loader></Loader> : ""}
              <div>
                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.TITLE")}
                </div>

                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.CONTENT1")}
                </div>

                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.CONTENT2")}
                </div>

                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.CONTENT3")}
                </div>

                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.CONTENT4")}
                </div>
                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.QUTESTION1")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER1")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER12")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER13")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER14")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER15")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER16")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER17")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER18")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER19")}
                </div>

                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.QUESTION2")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER2")}
                </div>

                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.QUESTION3")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER3")}
                </div>

                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.QUESTION4")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER4")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER41")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER42")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER43")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER44")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER45")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER46")}
                </div>
                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.QUESTION5")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER5")}
                </div>

                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.QUESTION6")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER6")}
                  <a
                    style={{ color: "#533278", fontWeight: "bold" }}
                    href="mailto:info@UniversalHealthFellowship.org."
                  >
                    {i18n.t("MODAL_POPUP1.ANSWER66")}
                  </a>
                  .
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER61")}
                </div>

                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.QUESTION7")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER7")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER71")}
                  <a
                    style={{ color: "#533278", fontWeight: "bold" }}
                    href="mailto:info@UniversalHealthFellowship.org."
                  >
                    {i18n.t("MODAL_POPUP1.ANSWER72")}
                  </a>
                  .
                </div>

                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.QUESTION8")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER8")}
                  <span>
                    <a
                      style={{ color: "#533278", fontWeight: "bold" }}
                      href="mailto:info@UniversalHealthFellowship.org."
                    >
                      {i18n.t("MODAL_POPUP1.ANSWER81")}
                    </a>
                  </span>
                  <span> {i18n.t("MODAL_POPUP1.ANSWER82")}</span>
                </div>

                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.QUESTION9")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER9")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER91")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER92")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER93")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER94")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  <a
                    style={{ color: "#533278", fontWeight: "bold" }}
                    href="http://www.UniversalHealthFellowship.org"
                  >
                    {i18n.t("MODAL_POPUP1.ANSWER95")}
                  </a>
                </div>

                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.QUESTION10")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER10")}
                </div>

                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.QUESTION11")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER11")}
                </div>
                <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP1.QUESTION12")}
                </div>
                <div style={{ paddingTop: "8px" }}>
                  {i18n.t("MODAL_POPUP1.ANSWER122")}
                </div>

                <div className="text-right" style={{ marginTop: "15px" }}>
                  <CustomeButton
                    onClick={(event) => this.hideModalPrivacy(event)}
                    style={{ marginRight: "15px" }}
                  >
                    {i18n.t("BUTTON.CANCEL")}
                  </CustomeButton>
                  <CustomeButton onClick={() => this.acceptPrivacyPolicy()}>
                    {i18n.t("BUTTON.ACCEPT")}
                  </CustomeButton>
                </div>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            size="lg"
            show={this.state.authModalShow1}
            centered
            onHide={(event) => this.authorizeHideModal111(event)}
            backdrop="static"
          >
            <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title>
                {i18n.t("SUBMIT_APPLICATION.SHARE_TITLE")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "450px",
                overflowY: "auto",
                textAlign: "justify",
                wordSpacing: "-2px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "15px",
              }}
            >
              {i18n.t("SUBMIT_APPLICATION.SHARE0")}
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE1")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE2")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE3")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE4")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE5")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE6")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE61")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE62")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE63")}{" "}
                <b> {this.state.agentName} </b>,{" "}
                {i18n.t("SUBMIT_APPLICATION.SHARE64")}
              </div>

              <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE_HEAD")}
              </div>
              <div style={{ paddingTop: "10px", fontWeight: "bold" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE_HEAD1")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE7")}
              </div>
              <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE_HEAD2")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE8")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("SUBMIT_APPLICATION.SHARE9")}
              </div>
              <div className="text-right" style={{ marginTop: "15px" }}>
                <CustomeButton
                  onClick={(event) => this.authorizeHideModal1(event)}
                  style={{ marginRight: "15px" }}
                >
                  {i18n.t("BUTTON.CANCEL")}
                </CustomeButton>
                <CustomeButton onClick={() => this.acceptAuthorization1()}>
                  {i18n.t("BUTTON.ACCEPT")}
                </CustomeButton>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            size="lg"
            show={this.state.authModalShow}
            centered
            onHide={(event) => this.authorizeHideModal22(event)}
            backdrop="static"
          >
            <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title>
                {i18n.t("SUBMIT_APPLICATION.IMP_NOTICE")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "450px",
                overflowY: "auto",
                textAlign: "justify",
                wordSpacing: "1px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "15px",
              }}
            >
              <div>
                <span
                  style={{
                    fontWeight: "bold",
                    wordSpacing: "1px",
                    textAlign: "left",
                  }}
                >
                  Authorization for Universal Health Fellowship & CarynHealth to
                  Contact Medical Provider :
                </span>
                <p style={{ marginTop: "20px" }}>To Whom It May Concern:</p>
                <span>
                  I, a covered individual (or the parent or legal guardian for
                  my minor) under{" "}
                  <span style={{ fontWeight: "bold" }}>
                    Universal HealthShare{" "}
                  </span>
                  (the “Program”), hereby request, authorize and grant authority
                  to Universal Health Fellowship (“UHF”), or its appointed
                  health plan manager CarynHealth Solutions, LLC
                  (“CarynHealth”), to contact and act on my behalf in dealing
                  with my physician and medical providers (the “Facility”) and
                  any other interested party in reference to charges for
                  treatment, care and services provided in connection with the
                  medical need and medical billing (the “Medical Bill”),
                  including without limitation charges that the Program has
                  determined exceed the Allowable Claim Limits under the terms
                  of the Program Document.
                </span>
                <br />
                <br />
                <p>
                  Additionally, by my acceptance, I acknowledge that I have
                  authorized the Facility to release any records and information
                  related to the Medical Bill, including Protected Health
                  Information (PHI), to UHF and CarynHealth. I am requesting
                  that such Protected Health Information be disclosed under this
                  authorization, as permitted by 164.508(1)(iv) of the privacy
                  regulations issued pursuant to the Health Insurance
                  Portability and Accountability Act (“HIPAA Privacy Rule”). I
                  have retained a copy of this authorization for my records. I
                  understand that I have the right to revoke this authorization
                  in writing, at any time, by sending a written statement of the
                  revocation to UHF and CarynHealth. Unless revoked, this
                  release will remain in effect and valid for one year from the
                  date of this authorization.
                </p>
              </div>
              <div className="text-right" style={{ marginTop: "15px" }}>
                <CustomeButton
                  onClick={(event) => this.authorizeHideModal(event)}
                  style={{ marginRight: "15px" }}
                >
                  {i18n.t("BUTTON.CANCEL")}
                </CustomeButton>
                <CustomeButton onClick={() => this.acceptAuthorization()}>
                  {i18n.t("BUTTON.ACCEPT")}
                </CustomeButton>
              </div>
            </Modal.Body>
          </Modal>

          <Modal
            size="lg"
            show={this.state.authModalShow4}
            centered
            onHide={(event) => this.hideModal4Privacy11(event)}
            backdrop="static"
          >
            <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title>Sharing Vs Insurance</Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "450px",
                overflowY: "auto",
                textAlign: "justify",
                wordSpacing: "-2px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "15px",
              }}
            >
              {this.state.loaderShow ? <Loader></Loader> : ""}
              <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                {i18n.t("MODAL_POPUP2.TITLE")}
              </div>
              <div style={{}}>
                <div style={{ paddingTop: "12px", fontWeight: "bold" }}>
                  {i18n.t("MODAL_POPUP2.QUESTION1")}
                </div>
              </div>

              <div style={{ paddingTop: "8px" }}>
                {i18n.t("MODAL_POPUP2.ANSWER1")}
              </div>

              <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                {i18n.t("MODAL_POPUP2.QUESTION2")}
              </div>

              <div style={{ paddingTop: "8px" }}>
                {i18n.t("MODAL_POPUP2.ANSWER2")}
              </div>

              <div style={{ paddingTop: "8px" }}>
                <ol>
                  <li style={{ paddingBottom: "15px" }}>
                    {" "}
                    {i18n.t("MODAL_POPUP2.ANSWER21")}
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    {" "}
                    {i18n.t("MODAL_POPUP2.ANSWER22")}
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    {" "}
                    {i18n.t("MODAL_POPUP2.ANSWER23")}
                  </li>
                  <li> {i18n.t("MODAL_POPUP2.ANSWER24")}</li>
                </ol>
              </div>
              <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                {i18n.t("MODAL_POPUP2.QUESTION3")}
              </div>

              <div style={{ paddingTop: "8px" }}>
                {i18n.t("MODAL_POPUP2.ANSWER3")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("MODAL_POPUP2.ANSWER31")}
              </div>
              <div style={{ paddingTop: "8px" }}>
                {i18n.t("MODAL_POPUP2.ANSWER32")}
              </div>
              <div
                style={{
                  paddingTop: "8px",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                {i18n.t("MODAL_POPUP2.ANSWER33")}
              </div>
              <div
                style={{
                  paddingTop: "8px",
                  fontWeight: "bold",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                {i18n.t("MODAL_POPUP2.QUESTION4")}
              </div>

              <div
                style={{
                  paddingTop: "8px",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                {i18n.t("MODAL_POPUP2.ANSWER4")}
              </div>
              <div
                style={{
                  paddingTop: "8px",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                {i18n.t("MODAL_POPUP2.ANSWER41")}
                <a
                  href="https://www.universalhealthfellowship.org/faqs/"
                  target="_blank"
                  rel="noopener"
                  style={{
                    color: "#533278",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                >
                  {i18n.t("MODAL_POPUP2.READ")}
                </a>
              </div>
              <div
                style={{
                  paddingTop: "8px",
                  fontWeight: "bold",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                {i18n.t("MODAL_POPUP2.QUESTION5")}
              </div>

              <div
                style={{
                  paddingTop: "8px",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                {i18n.t("MODAL_POPUP2.ANSWER5")}
              </div>
              <div
                style={{
                  paddingTop: "8px",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                {i18n.t("MODAL_POPUP2.ANSWER51")}
                <span>
                  <a
                    href="http://www.universalhealthfellowship.org/wp-content/uploads/2020/02/UHS-State-Legal-Notices-UHS-SLN-22820.pdf"
                    target="_blank"
                    rel="noopener"
                    style={{
                      color: "#533278",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {i18n.t("MODAL_POPUP2.ANSWER52")}
                  </a>
                </span>
              </div>
              <div
                style={{
                  paddingTop: "8px",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                {i18n.t("MODAL_POPUP2.ANSWER53")}
                <span>
                  <a
                    href="http://www.universalhealthfellowship.org/wp-content/uploads/2020/02/UHS-State-Mandate-Penalties-Disclaimer-UHS-SMPD-22820.pdf"
                    target="_blank"
                    rel="noopener"
                    style={{
                      color: "#533278",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                  >
                    {i18n.t("MODAL_POPUP2.ANSWER52")}
                  </a>
                </span>
              </div>
              <div className="text-right" style={{ marginTop: "15px" }}>
                <CustomeButton
                  onClick={(event) => this.hideModal4Privacy(event)}
                  style={{ marginRight: "15px" }}
                >
                  {i18n.t("BUTTON.CANCEL")}
                </CustomeButton>
                <CustomeButton onClick={() => this.acceptPrivacyPolicy4()}>
                  {i18n.t("BUTTON.ACCEPT")}
                </CustomeButton>
              </div>
            </Modal.Body>
          </Modal>
        </Grid>
      );
    } else if (this.state.count === 2) {
      currentScreen = (
        <Grid item xs={12}>
          <Grid item xs={12} style={{ marginLeft: "16px" }}>
            <Typography
              variant="h6"
              component="h3"
              style={customeClasses.questionTitleText}
            >
              {i18n.t("SUBMIT_APPLICATION.TITLE")}
            </Typography>
          </Grid>

          <Grid item xs={12} style={{ marginTop: "10px", marginBottom: "5px" }}>
            <Grid item xs={2}>
              <Checkbox
                checked={this.state.authorization}
                inputProps={{
                  "aria-label": "secondary checkbox",
                }}
                style={{ color: "#533278", marginLeft: -12 }}
                onClick={this.showFinanceAuthModal}
              />
            </Grid>

            <Grid
              item
              xs={10}
              onClick={this.showFinanceAuthModal}
              style={{
                cursor: "pointer",
                fontSize: "14.7px",
                lineHeight: "19px",
                display: "flex",
              }}
            >
              <div
                style={{
                  marginLeft: "25px",
                  marginTop: "-36px",
                  textAlign: "justify",
                }}
              >
                <span
                  style={{
                    cursor: "pointer",
                    fontSize: "14.7px",
                    lineHeight: "19px",
                    textAlign: "justify",
                    fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                  }}
                >
                  {this.props.reEnroll
                    ? i18n.t("SUBMIT_APPLICATION.ReEnrollAUTH") + " "
                    : i18n.t("SUBMIT_APPLICATION.AUTHORIZE1") +
                      " " +
                      i18n.t("SUBMIT_APPLICATION.AUTH2")}
                  <span
                    style={{
                      color: "#533278",
                      cursor: "pointer",
                      fontWeight: "bold",
                      borderBottom: "1px solid #533278",
                    }}
                  >
                    {i18n.t("SUBMIT_APPLICATION.AUTH")}
                  </span>
                </span>
              </div>
            </Grid>
          </Grid>

          <Modal
            size="lg"
            show={this.state.financeAuthModalShow}
            centered
            onHide={(event) => this.hideModalFinaceAuth11(event)}
            backdrop="static"
          >
            <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title>
                {i18n.t("SUBMIT_APPLICATION.FINANCE_TITLE")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body style={customStyle.financePopup}>
              {this.state.loaderShow ? <Loader></Loader> : ""}
              <div style={{ paddingTop: "12px" }}>
                {i18n.t("SUBMIT_APPLICATION.FINANCE_BODY")}
              </div>
              <div style={{ paddingTop: "12px" }}>
                {i18n.t("SUBMIT_APPLICATION.FINANCE_BODY01")}
              </div>
              <div style={{ paddingTop: "12px" }}>
                {i18n.t("SUBMIT_APPLICATION.FINANCE_BODY02")}
              </div>

              <div className="text-right" style={{ marginTop: "15px" }}>
                <CustomeButton
                  onClick={(event) => this.hideModalFinaceAuth(event)}
                  style={{ marginRight: "15px" }}
                >
                  {i18n.t("BUTTON.CANCEL")}
                </CustomeButton>
                <CustomeButton onClick={() => this.acceptFinaceAuth()}>
                  {i18n.t("BUTTON.ACCEPT")}
                </CustomeButton>
              </div>
            </Modal.Body>
          </Modal>
        </Grid>
      );
    } else if (this.state.count === 3) {
      currentScreen = (
        // <>
        <div>
          <Grid item xs={12}>
            <Grid item xs={12} style={{ marginLeft: "16px" }}>
              <Typography
                variant="h6"
                component="h3"
                style={customeClasses.questionTitleText}
              >
                {i18n.t("SUBMIT_APPLICATION.TERMS")}
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              style={{ marginTop: "10px", marginBottom: "5px" }}
            >
              <Grid item xs={2}>
                <Checkbox
                  checked={this.state.healthTerms}
                  inputProps={{
                    "aria-label": "secondary checkbox",
                  }}
                  style={{
                    color: "#533278",
                    cursor: "pointer",
                    marginLeft: -12,
                  }}
                  onClick={this.showPlansModalHealth}
                ></Checkbox>
                {/* } */}
              </Grid>
              <Grid
                item
                xs={12}
                onClick={this.showFinanceAuthModal}
                style={{
                  cursor: "pointer",
                  lineHeight: "19px",
                  display: "flex",
                }}
                onClick={this.showPlansModalHealth}
              >
                <div
                  style={{
                    marginLeft: "25px",
                    marginTop: "-33px",
                    fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                  }}
                >
                  <span
                    style={{
                      fontSize: "14px",
                      lineHeight: "19px",
                      cursor: "pointer",
                      textAlign: "justify",
                      fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                    }}
                    onClick={this.showPlansModalHealth}
                  ></span>
                  {i18n.t("SUBMIT_APPLICATION.TEXT4")}
                  <span
                    style={customeClasses.hyperTextScreen3}
                    onClick={this.showPlansModalHealth}
                  >
                    {i18n.t("SUBMIT_APPLICATION.TEXT5")}
                  </span>
                  {/* </span> */}
                </div>
              </Grid>
            </Grid>
          </Grid>
          <Modal
            size="lg"
            show={this.state.modalShow}
            centered
            onHide={(event) => this.viewPlanHideModalHealth1(event)}
            backdrop="static"
          >
            <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title>
                {i18n.t("SUBMIT_APPLICATION.MODEL_TITLE")}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body
              style={{
                maxHeight: "450px",
                overflowY: "auto",
                textAlign: "justify",
                wordSpacing: "-2px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "15px",
              }}
            >
              <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                {i18n.t("MODAL_LAST.QUESTION_LAST")}
              </div>

              <div style={{ paddingTop: "8px" }}>
                <ol style={{ marginLeft: "-25px" }}>
                  <li style={{ paddingBottom: "15px" }}>
                    {" "}
                    {i18n.t("MODAL_LAST.ANSWER1_LAST")}
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    {" "}
                    {i18n.t("MODAL_LAST.ANSWER2_LAST")}
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    {" "}
                    {i18n.t("MODAL_LAST.ANSWER3_LAST")}
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    {" "}
                    {i18n.t("MODAL_LAST.ANSWER4_LAST")}
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    {" "}
                    {i18n.t("MODAL_LAST.ANSWER5_LAST")}
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    {" "}
                    {i18n.t("MODAL_LAST.ANSWER6_LAST")}
                  </li>
                  <li style={{ paddingBottom: "15px" }}>
                    {" "}
                    {i18n.t("MODAL_LAST.ANSWER7_LAST")}
                  </li>
                </ol>
              </div>
              <div className="text-right" style={{ marginTop: "15px" }}>
                <CustomeButton
                  onClick={(event) => this.viewPlanHideModalHealth11(event)}
                  style={{ marginRight: "15px" }}
                >
                  {i18n.t("BUTTON.CANCEL")}
                </CustomeButton>
                <CustomeButton onClick={() => this.viewPlanHideModalHealth()}>
                  {i18n.t("BUTTON.ACCEPT")}
                </CustomeButton>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      );
    } else if (this.state.count === 4) {
      currentScreen = (
        <div>
          <Grid container spacing={4} justify="space-between">
            <Grid item xs={12} sm={6}>
              <Typography
                variant="h6"
                component="h3"
                style={customeClasses.questionTitleText}
              >
                Authorization for enrollment
              </Typography>
              <Sample
                setChild={this.nameChangeHandler.bind(this)}
                name={"FirstName"}
                isValidFullName={this.state.isValidFullName}
                reqFlag={true}
                label={"Authorize this application by typing in your full name"}
                value={this.state.fullName}
                disable={false}
                style={customeClasses.textField}
                length={120}
                fieldType={"holderName"}
                errMsg={"Enter valid full name"}
                helperMsg={
                  "By typing my name above, I understand and agree that this form of electronic signature has the same legal force and affect as a manual signature."
                }
                parentDetails={{}}
              ></Sample>
              <div>
                <Typography
                  variant="h6"
                  component="h3"
                  style={customeClasses.questionTitleText}
                >
                  e-signature
                </Typography>
                <RadioGroup
                  row
                  aria-label="option"
                  name="row-radio-buttons-group"
                  value={this.state.signType}
                  onChange={(event, value) => {
                    this.changeSignType(event, value);
                    this.setState({
                      canvasChanged: false,
                      canvasDone: false,
                    });
                  }}
                >
                  <FormControlLabel
                    value="stylized"
                    control={<PurpleRadio />}
                    label="Use stylized script"
                  />
                  <FormControlLabel
                    value="scribble"
                    control={<PurpleRadio />}
                    label="Let me draw"
                  />
                </RadioGroup>
              </div>
              <div
                style={{
                  width: "100%",
                  display: "block",
                }}
              >
                {this.state.signType === "stylized" ? (
                  <>
                    <div id="txtsign" style={{ width: "100%", height: "100%" }}>
                      <TextSignature
                        id="textSignature"
                        text={this.state.fullName}
                        fontSize={50}
                      />
                    </div>
                  </>
                ) : (
                  <SignScroll
                    ref={this.child}
                    onCanvasChange={() =>
                      this.setState({
                        canvasChanged: true,
                      })
                    }
                    onCanvasClear={() =>
                      this.setState({
                        canvasChanged: false,
                      })
                    }
                  />
                )}
              </div>
              {this.state.signType !== "stylized" ? (
                <div>
                  <CustomeButton
                    variant="contained"
                    style={customeClasses.viewProgSum}
                    onClick={() => {
                      this.handleSignClear();
                      this.setState({ canvasChanged: false });
                    }}
                    disabled={this.state.canvasChanged ? false : true}
                  >
                    CLEAR
                  </CustomeButton>

                  <CustomeButton
                    variant="contained"
                    style={customeClasses.viewProgSum}
                    onClick={() => this.handleSignDone()}
                    disabled={this.state.canvasChanged ? false : true}
                  >
                    DONE
                  </CustomeButton>
                </div>
              ) : (
                <></>
              )}
            </Grid>
            <Grid
              item
              item
              xs={12}
              sm={5}
              style={{
                textAlign: "justify",
                marginTop: "25px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "14px",
              }}
            >
              <span>
                By authorizing this application you agree that you have
                understood and accepted all terms and policies that have been
                explained to you by your Health Representative.{" "}
              </span>
            </Grid>
          </Grid>
        </div>
      );
    }

    return (
      <div style={customeClasses.root}>
        {this.state.loaderShow ? <Loader></Loader> : ""}

        {this.state.count < 5 && (
          <Grid
            id="grid_div"
            container
            spacing={1}
            style={
              this.props.isAgent
                ? this.state.fromMember
                  ? customeClasses.pt_auto
                  : customeClasses.pt_none
                : customeClasses.pt_auto
            }
          >
            <Grid item xs={12}>
              <Grid item xs={12}>
                <Typography component="p" style={customeClasses.rowText}>
                  {this.props.reEnroll
                    ? i18n.t("SUBMIT_APPLICATION.ReEnrollText3")
                    : i18n.t("SUBMIT_APPLICATION.TEXT3")}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  classes={{
                    colorPrimary: classes.colorPrimary,
                    barColorPrimary: classes.barColorPrimary,
                  }}
                  style={classes.progress}
                  value={this.state.progress}
                />
              </Grid>
              <Grid item xs={12} style={{}}>
                {currentScreen}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={7} md={7} lg={7}>
              {/*style={{marginTop:'30px'}}*/}
              <WizardButton
                variant="contained"
                style={
                  this.state.count === 1
                    ? customeClasses.disabledButton
                    : customeClasses.button
                }
                disabled={this.state.count === 1 ? true : false}
                onClick={this.reduceProgress}
              >
                {i18n.t("BUTTON.BACK")}
              </WizardButton>
              <WizardButton
                variant="contained"
                style={customeClasses.button}
                disabled={this.state.nextDisabled} /*&& this.state.healthTerms*/
                onClick={this.increaseProgress}
              >
                {i18n.t("BUTTON.NEXT")}
              </WizardButton>
              <FinishButton
                variant="contained"
                style={customeClasses.finishButton}
                disabled={
                  (this.state.count <= 4 && this.state.fullName === "") ||
                  (this.state.signType === "scribble" && !this.state.canvasDone)
                }
                onClick={() => this.beforeSaveApplication()}
              >
                {i18n.t("BUTTON.SUBMITAPPLICATION")}
              </FinishButton>
            </Grid>

            {this.state.count === 4 && (
              <Grid item xs={12} sm={5} md={5} lg={5}>
                <CustomeButton
                  variant="contained"
                  style={customeClasses.viewProgSum}
                  onClick={() => this.setState({ planSelectionModal: true })}
                >
                  VIEW PROGRAM SUMMARY
                </CustomeButton>

                <CustomeButton
                  variant="contained"
                  href={AUTH_PDF_URL}
                  target="_blank"
                  style={customeClasses.viewProgSum}
                >
                  DOWNLOAD AUTHORIZATIONS
                </CustomeButton>
              </Grid>
            )}

            <Modal
              size="md"
              show={this.state.successModal}
              centered
              onHide={() => this.handlenClose}
            >
              <Modal.Header style={customStyle.modal_header}>
                <Modal.Title>
                  {i18n.t("SUBMIT_APPLICATION.MODEL_TITLE2")}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div
                  style={{
                    textAlign: "center",
                    fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                  }}
                >
                  <p>{this.state.popUpMsg}</p>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <CustomeButton onClick={() => this.handleClose()}>
                  {i18n.t("BUTTON.OK")}
                </CustomeButton>
              </Modal.Footer>
            </Modal>
          </Grid>
        )}
        {this.state.count === 5 &&
        (this.state.fromMember == false || this.state.fromMember == null) ? (
          <Grid container spacing={3} style={{ textAlign: "center" }}>
            <Grid item xs={12}>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                {this.props.reEnroll
                  ? i18n.t("SUBMIT_APPLICATION.MESSAGE_REENROLL")
                  : i18n.t("SUBMIT_APPLICATION.MESSAGE")}
              </span>
            </Grid>
            <Grid item xs={12}>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                {i18n.t("SUBMIT_APPLICATION.MSG_2")}
              </span>
            </Grid>
            <Grid item xs={12}>
              <FinishButton
                variant="contained"
                style={{ width: "115px", height: "40px" }}
                onClick={() => this.handleLogout()}
              >
                LOGOUT
              </FinishButton>
            </Grid>
          </Grid>
        ) : (
          ""
        )}

        {this.state.count === 6 &&
        (this.state.fromMember == true || this.state.fromLogin) ? (
          <Grid container spacing={3} style={{ textAlign: "center" }}>
            <Grid item xs={12}>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                {this.props.reEnroll
                  ? i18n.t("SUBMIT_APPLICATION.MESSAGE_REENROLL")
                  : i18n.t("SUBMIT_APPLICATION.MESSAGE")}
              </span>
            </Grid>
            <Grid item xs={12}>
              <span
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                {i18n.t("SUBMIT_APPLICATION.MSG_2")}
              </span>
            </Grid>
            <Grid item xs={12}>
              <FinishButton
                variant="contained"
                style={{ width: "115px", height: "40px" }}
                onClick={() =>
                  this.state.fromLogin
                    ? this.handleLogout()
                    : this.handleReenrollClose()
                }
              >
                {this.state.fromLogin ? "LOGOUT" : "CLOSE"}
              </FinishButton>
            </Grid>
          </Grid>
        ) : (
          ""
        )}

        <Modal
          size="md"
          show={this.state.paymentScreenModal}
          onHide={(event) =>
            this.setState({ paymentScreenModal: false, loaderShow: false })
          }
          backdrop="static"
          centered
        >
          <Modal.Header style={customStyle.modal_header}>
            <Modal.Title>You’re done!</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              margin: "10px",
              textAlign: "justify",
              fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              fontSize: "15px",
            }}
          >
            {/*The authorizations need to be done by the prospect. Hence please exit the enrollment wizard to return to your agent dashboard. On the actions menu of the prospect, click 'Send sign-up email' to invite them to complete the process.*/}
            {/*The final authorization must be completed by the prospect. Click the button below to send the authorization request email to the prospect. The prospect will need to click on the link in the email to access this page where they will see a program summary. If acceptable, the prospect will be prompted to type in their full name and click on SUBMIT APPLICATION to authorize this enrollment.*/}
            This final step must be completed by the prospect. Click the button
            below to send the authorization request email to the prospect. The
            prospect will need to click on the link in the email to access this
            step. They will first review a summary of the program and accept the
            terms and policies. To authorize this enrollment the prospect will
            be prompted to type in their full name and click on SUBMIT
            APPLICATION.
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <NextButton
              style={{
                marginTop: "10px",
                marginRight: "10px",
                width: "120px",
                height: "40px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "14px",
              }}
              onClick={() => this.handleBack()}
            >
              BACK
            </NextButton>{" "}
            <NextButton
              style={{
                marginTop: "10px",
                width: "261px",
                height: "40px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "14px",
              }}
              onClick={() => this.getEmailPhoneDetails("email")}
            >
              SEND AUTHORIZATION EMAIl
            </NextButton>
            <NextButton
              style={{
                marginTop: "10px",
                width: "261px",
                height: "40px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "14px",
              }}
              disabled={this.props.reEnroll}
              onClick={() => this.getEmailPhoneDetails("sms")}
            >
              SEND AUTHORIZATION TEXT
            </NextButton>
          </Modal.Footer>
        </Modal>

        <Modal
          size="md"
          show={this.state.emailPhoneModal}
          onHide={(event) =>
            this.setState({ emailPhoneModal: false, loaderShow: false })
          }
          backdrop="static"
          centered
        >
          <Modal.Header style={customStyle.modal_header}>
            <Modal.Title>Contact Details</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              margin: "10px",
              textAlign: "justify",
              fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              fontSize: "15px",
            }}
          >
            <div style={{ flexGrow: 1 }}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={12} sm={12} md={11}>
                  Please add prospect email and contact number.
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={12}>
                  <Sample
                    setChild={this.setUserValue.bind(this)}
                    reqFlag={true}
                    name={"email"}
                    label={"Email ID"}
                    value={this.state.email}
                    disable={false}
                    style={customStyle.textFieldWrp}
                    length={50}
                    fieldType={"email"}
                    errMsg={"Enter valid email Id"}
                    helperMsg={"Email is required"}
                    parentDetails={{ name: "email" }}
                  ></Sample>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={12}>
                  <Sample
                    setChild={this.setUserValue.bind(this)}
                    reqFlag={true}
                    name={"phone"}
                    label={"Mobile No."}
                    value={this.state.phoneNumber}
                    disable={false}
                    style={customStyle.textFieldWrp}
                    length={10}
                    fieldType={"phone"}
                    errMsg={"Enter valid mobile no."}
                    helperMsg={"Mobile no. required"}
                    parentDetails={{ name: "phone" }}
                  ></Sample>
                </Grid>
              </Grid>
            </div>
            {this.state.validationError ? (
              <div
                style={{
                  color: "#f30",
                  fontSize: "12px",
                  textAlign: "left",
                  padding: "10px 0",
                }}
              >
                {" "}
                Email already exist in system{" "}
              </div>
            ) : null}
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <NextButton
              style={{
                marginTop: "10px",
                width: "150px",
                height: "40px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "14px",
              }}
              disabled={this.state.isvalidEmailPhone ? true : false}
              onClick={() => this.saveEmailPhone()}
            >
              SAVE
            </NextButton>
            <NextButton
              style={{
                marginTop: "10px",
                marginLeft: "10px",
                width: "150px",
                height: "40px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "14px",
              }}
              onClick={() => {
                this.setState({ emailPhoneModal: false, loaderShow: false });
              }}
            >
              CANCEL
            </NextButton>
          </Modal.Footer>
        </Modal>

        <Modal
          size="md"
          show={this.state.contactModal}
          onHide={(event) =>
            this.setState({ contactModal: false, loaderShow: false })
          }
          backdrop="static"
          centered
        >
          <Modal.Header style={customStyle.modal_header}>
            <Modal.Title>Contact Details</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              margin: "10px",
              textAlign: "justify",
              fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              fontSize: "15px",
            }}
          >
            <div style={{ flexGrow: 1 }}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={12} sm={12} md={11}>
                  Please confirm prospect contact number.
                </Grid>
                <Grid item xs={12} sm={12} md={11}>
                  <Sample
                    setChild={this.setValue.bind(this)}
                    reqFlag={true}
                    name={"phone"}
                    label={"Mobile No."}
                    value={this.state.phoneNumber}
                    disable={false}
                    style={customStyle.textField}
                    length={10}
                    fieldType={"phone"}
                    errMsg={"Enter valid mobile no."}
                    helperMsg={"Mobile no. required"}
                    parentDetails={{}}
                  ></Sample>
                </Grid>
              </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <NextButton
              style={{
                marginTop: "10px",
                width: "261px",
                height: "40px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "14px",
              }}
              disabled={this.state.phoneNumber === ""}
              onClick={() => this.confirmContact()}
            >
              SEND AUTHORIZATION TEXT
            </NextButton>
            <NextButton
              style={{
                marginTop: "10px",
                marginLeft: "10px",
                width: "150px",
                height: "40px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "14px",
              }}
              onClick={() => {
                this.setState({
                  contactModal: false,
                  paymentScreenModal: true,
                  phoneNumber: "",
                });
              }}
            >
              CANCEL
            </NextButton>
          </Modal.Footer>
        </Modal>

        <Modal
          size="md"
          show={this.state.emailModal}
          onHide={(event) =>
            this.setState({ emailModal: false, loaderShow: false })
          }
          backdrop="static"
          centered
        >
          <Modal.Header style={customStyle.modal_header}>
            <Modal.Title>Contact Details</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              margin: "10px",
              textAlign: "justify",
              fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              fontSize: "15px",
            }}
          >
            <div style={{ flexGrow: 1 }}>
              <Grid container spacing={2} justify="center">
                <Grid item xs={12} sm={12} md={11}>
                  Please confirm prospect Email ID.
                </Grid>
                <Grid item xs={12} sm={12} md={11}>
                  <Sample
                    setChild={this.setUserValue.bind(this)}
                    reqFlag={true}
                    name={"email"}
                    label={"Email ID"}
                    value={this.state.email}
                    disable={false}
                    style={customStyle.textFieldWrp}
                    length={50}
                    fieldType={"email"}
                    errMsg={"Enter valid email Id"}
                    helperMsg={"Email is required"}
                    parentDetails={{ name: "email" }}
                  ></Sample>
                </Grid>
              </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ justifyContent: "center" }}>
            <NextButton
              style={{
                marginTop: "10px",
                width: "261px",
                height: "40px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "14px",
              }}
              disabled={this.state.email === ""}
              onClick={() => this.goToAgentDashboard("email")}
            >
              SEND AUTHORIZATION EMAIL
            </NextButton>
            <NextButton
              style={{
                marginTop: "10px",
                marginLeft: "10px",
                width: "150px",
                height: "40px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "14px",
              }}
              onClick={() => {
                this.setState({
                  emailModal: false,
                  paymentScreenModal: true,
                  email: "",
                });
              }}
            >
              CANCEL
            </NextButton>
          </Modal.Footer>
        </Modal>

        <Modal
          size="xl"
          show={this.state.planSelectionModal}
          onHide={(event) =>
            this.setState({ planSelectionModal: false, loaderShow: false })
          }
          backdrop="static"
        >
          <Modal.Header style={customStyle.modal_header} closeButton>
            <Modal.Title>Program Summary</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.loaderShow ? <Loader></Loader> : ""}
            <div style={customeClasses.root}>
              <Grid container style={{ marginTop: "1%" }}>
                <Grid item xs={12} sm={12}>
                  <div
                    className="addOnTable reviewChoice popupTable"
                    style={{ overflowX: "auto" }}
                  >
                    {this.state.tableData && (
                      <CommonTable
                        quoteData={this.state.tableData.body}
                        check={true}
                        headerData={this.state.tableData.header}
                        tooltip={[]}
                        quickQuote={false}
                        totalReq={true}
                      />
                    )}
                  </div>
                  <p
                    style={{
                      fontSize: "11px",
                      fontWeight: "bold",
                      paddingTop: "10px",
                    }}
                  >
                    *The total amount will include a 3.5% charge for the use of
                    a credit card as your payment method. To avoid the charge,
                    please use ACH as your payment method in the screen that
                    follows.
                  </p>
                </Grid>
                <Grid item xs={12} sm={7}>
                  <CustomeButton
                    style={{ height: "40px" }}
                    onClick={() =>
                      this.setState({ FamilyDetailsMoreInfoModal: true })
                    }
                  >
                    REVIEW FAMILY DETAILS
                  </CustomeButton>
                </Grid>
              </Grid>
            </div>
            <div></div>
          </Modal.Body>
          <Modal.Footer>
            <CustomeButton
              style={{ height: "40px" }}
              onClick={() =>
                this.setState({
                  planSelectionModal: false,
                  loaderShow: false,
                  FamilyDetailsMoreInfoModal: false,
                })
              }
            >
              OK
            </CustomeButton>
          </Modal.Footer>
        </Modal>

        <Modal
          size="xl"
          show={this.state.FamilyDetailsMoreInfoModal}
          onHide={() =>
            this.setState({
              FamilyDetailsMoreInfoModal: false,
              planSelectionModal: true,
            })
          }
          backdrop="static"
          centered
        >
          <Modal.Header style={customStyle.modal_header}>
            <Modal.Title style={{ color: "black" }}>Family Details</Modal.Title>
          </Modal.Header>
          <Modal.Body
            style={{
              fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              padding: "40px 20px",
              fontSize: "14px",
              textAlign: "justify",
            }}
          >
            <div>
              <div
                className={
                  this.props.reEnroll
                    ? "reEnrollTable familyDetailsTable reivewTable"
                    : "reivewTable familyDetailsTable"
                }
                style={{ overflowX: "auto" }}
              >
                {this.state.popTable && (
                  <CommonTable
                    quoteData={this.state.popTable.body}
                    check={true}
                    headerData={this.state.popTable.header}
                    tooltip={[]}
                    quickQuote={false}
                    totalReq={true}
                    reEnroll={this.props.reEnroll}
                  />
                )}
              </div>
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: "bold",
                  paddingTop: "10px",
                }}
              >
                {/* {this.props.reEnroll
                  ? null
                  : "Other applicable fees include a one time non-refundable application fee of $75 and UHF monthly membership dues per household of $15."} */}
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ background: "#f1f1f1" }}>
            <ViewButton
              onClick={() =>
                this.setState({ FamilyDetailsMoreInfoModal: false })
              }
            >
              Done
            </ViewButton>
          </Modal.Footer>
        </Modal>

        <Modal
          size="xs"
          show={this.state.targetDateModal}
          onHide={(event) =>
            this.setState({ targetDateModal: false, loaderShow: false })
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
                      maxDate={new Date(futureDate)}
                    />
                    <span id="bd" style={customStyle.EnrollNew2Span}></span>
                  </MuiPickersUtilsProvider>
                </Grid>
              </Grid>
            </div>
          </Modal.Body>
          <Modal.Footer style={{ alignItems: "right" }}>
            <CustomeButton
              disabled={this.state.targetDate < new Date()}
              style={{ marginTop: "10px", width: "50px", height: "40px" }}
              onClick={() => this.openDraftDayModal()}
            >
              Done
            </CustomeButton>
          </Modal.Footer>
        </Modal>

        <Modal
          size="md"
          show={this.state.inviteStatusModal}
          centered
          onHide={() => this.closeInviteStatusModal}
        >
          <Modal.Header style={customStyle.modal_header}>
            <Modal.Title>Confirmation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div
              style={{
                textAlign: "center",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              }}
            >
              <p>
                Authorization link was already sent on {this.state.inviteStatus}
                . If you proceed to resend link, the prospect will not be able
                to sign-up with any previously sent links.
              </p>
              <p>Are you sure you want to proceed? </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <CustomeButton
              onClick={() =>
                this.sendAuthRequest(this.state.reqType, this.state.phoneNumber)
              }
            >
              YES
            </CustomeButton>
            <CustomeButton
              style={{ marginLeft: "10px" }}
              onClick={() => this.closeInviteStatusModal()}
            >
              NO
            </CustomeButton>
          </Modal.Footer>
        </Modal>

        {/*------ Draft Day Modal ------*/}

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
                        {this.state.creditCard ? <span>&#42;</span> : null}
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
                        ${this.state.firstPaymentAmount}
                        {this.state.creditCard ? <span>&#42;</span> : null}
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
                        ${this.state.firstPaymentAmount}
                        {this.state.creditCard ? <span>&#42;</span> : null}
                      </div>
                      <div className="col-4 col-md-5 detailsTableRow">
                        {this.state.subsequentPaymentDate}
                        <sup>+</sup>
                      </div>
                    </div>

                    <div style={{ padding: "5px 10px" }}>
                      {this.state.creditCard ? (
                        <h6>
                          <span>&#42;</span>3.5% merchant fees apply on credit
                          card payments
                        </h6>
                      ) : null}
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
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    subId: state.subId,
    email: state.email,
  };
};

export default withStyles(styles)(connect(mapStateToProps)(SubmitApplication));
