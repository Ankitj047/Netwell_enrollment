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
  MuiPickersUtilsProvider,
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
      checkBox5: false,

      ModalShow6: false,
      checkBox6: false,
      disQualifiedData: null,
      ModalShow7: false,
      checkBox7: false,
      showCheckBox6: true,
      ModalShow8: false,
      checkBox8: false,
      checkBoxFirst: false,
      checkBoxSecond: false,
      checkBoxThird: false,
      checkBoxFourth: false,
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

  showCheckbox5 = (event) => {
    this.setState(
      {
        checkBox5: !this.state.checkBox5,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  hideCheckbox5 = (event) => {
    this.setState(
      {
        financeAuthModalShow: false,
        checkBox5: false,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  showModal6 = (event) => {
    this.setState(
      {
        ModalShow6: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  hideModal6 = (event) => {
    this.setState(
      {
        ModalShow6: false,
        checkBox6: false,
      },
      () => {
        this.getDisabled();
      }
    );
  };
  acceptModal6 = () => {
    this.setState(
      {
        ModalShow6: false,
        checkBox6: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  showModal7 = (event) => {
    this.setState(
      {
        ModalShow7: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  hideModal7 = (event) => {
    this.setState(
      {
        ModalShow7: false,
        checkBox7: false,
      },
      () => {
        this.getDisabled();
      }
    );
  };
  acceptModal7 = () => {
    this.setState(
      {
        ModalShow7: false,
        checkBox7: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  showModal8 = (event) => {
    this.setState(
      {
        ModalShow8: true,
      },
      () => {
        this.getDisabled();
      }
    );
  };

  hideModal8 = (event) => {
    this.setState(
      {
        ModalShow8: false,
        checkBox8: false,
      },
      () => {
        this.getDisabled();
      }
    );
  };
  acceptModal8 = () => {
    this.setState(
      {
        ModalShow8: false,
        checkBox8: true,
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
  getWaitingPeriodSummary = () => {
    let subId = JSON.parse(localStorage.getItem("CurrentLoginUser")).id;
    axios
      .get(
        configuration.baseUrl + `/questionbank/getEnrollMemberSummary/${subId}`
      )
      .then((response) => {
        if (response.data.response && Object.keys(response.data.response).length !== 0) {
          var data = [];
          Object.keys(response.data.response).map((key, index) => {
            key !== "knockoutMember" &&
              data.push({
                "family member": [
                  <span style={{ fontWeight: "500" }}>{key}</span>,
                ],
                reason: [
                  response.data.response[key].map((res, i) => (
                    <span style={{ fontWeight: "500" }}>
                      {res.disease}
                      {response.data.response[key].length === i + 1
                        ? "."
                        : ","}{" "}
                    </span>
                  )),
                ],
                "Eligibility Details": [
                  <div>
                    {response.data.response[key].map(
                      (res, i) =>
                        i == 0 &&
                        (res.limitation === "Lifetime" ? (
                          <span style={{ fontWeight: "500", fontSize: "15px" }}>
                            {res.limitation} limitation
                          </span>
                        ) : (
                          <span style={{ fontWeight: "500", fontSize: "15px" }}>
                            Initial waiting period of {res.limitation}-years
                          </span>
                        ))
                    )}
                  </div>,
                ],
              });
          });

          this.setState({
            disQualifiedData: {
              header: [
                "Family Member",
                "Health Condition",
                "Limitation Details",
              ],
              data: data,
              instruction: [
                //  <span style={{fontWeight:"bold"}}>"Here is a summary of the eligibility check [TBD]."</span>,
                <br></br>,
                [
                  "The family members listed alongside are either not eligible for enrollment into the netWell Program or have an initial waiting period. You can choose to exclude members and continue enrolling other members of your family for this program.",
                ],
              ],
              flag: false,
              questionFlag: true,
            },
          });
        } else {
          this.setState({ checkBox6: true, showCheckBox6: false });
        }
      })
      .catch((error) => {});
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
        // modalShowPrivacy: false,
        privacyPolicy: !this.state.privacyPolicy,
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
        authorize1: !this.state.authorize1,
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
          // count: this.state.count - 1,
          count: 1,

          // progress: ((this.state.count - 1) / 4) * 100,
          progress: (3 / 4) * 100,

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
      obj.enrollFlag = true;
    }

    axios
      .post(configuration.baseUrl + "/enrollment/saveAuthorization", obj)
      .then((response) => {
        if (response.data.code === 200) {
          if (this.state.count < 4) {
            this.setState(
              {
                // count: this.state.count + 1,
                count: 4,

                // progress: ((this.state.count + 2) / 4) * 100,
                progress: (4 / 4) * 100,

                loaderShow: false,
              },
              () => {
                this.getDisabled();
              }
            );
          } else {
            this.setState(
              {
                // count: this.state.count + 1,
                count: 4,

                // progress: ((this.state.count + 2) / 4) * 100,
                progress: (4 / 4) * 100,

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
      // draftDayModal: true,
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
    obj.enrollFlag = true;
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
                      // targetDateModal: true,
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
    // this.setState({
    //   loaderShow: true,
    // });
    console.log("payflag---", this.state.payflag);
    let data = new Object();
    if(sessionStorage.getItem("CLIENT_ID")== "2002" || sessionStorage.getItem("CLIENT_ID")== "2001"|| sessionStorage.getItem("CLIENT_ID")== "2003"
    || sessionStorage.getItem("CLIENT_ID")== "1002" || sessionStorage.getItem("CLIENT_ID")== 1002 || sessionStorage.getItem("CLIENT_ID")== 2002
    || sessionStorage.getItem("CLIENT_ID")== 2001 || sessionStorage.getItem("CLIENT_ID")== 2003
    ){
      data.subId = this.props.subId;
      data.email = this.state.email;

    // data.esign = this.state.imgUrl;
    }else{
      data.email = this.state.email;
      data.subId = this.props.subId;
      // data.esign = this.state.imgUrl; //this.props.email
    }
    

    console.log(":::::::::::: obj", data);

    if (
      this.state.fromMember == false &&
      this.state.fromLogin == false &&
      reenrollmentFlag == false &&
      this.state.enroll
    ) {
      if (this.state.payflag == false) {
        let evt = new CustomEvent("paymentFlag", {
          detail: { flag: true },
        });
        window.dispatchEvent(evt);
        this.setState({
          submitDone: true,
          successModal: true,
          count: 5,
          loaderShow: false,
        });
      } else if (this.state.payflag == true) {
        // let evt = new CustomEvent("enroll_flag", {
        //   detail: { flag: true },
        // });
        // window.dispatchEvent(evt);
        // localStorage.removeItem("paymentData");
        // localStorage.removeItem("PAYMENT_ERROR");
        this.setState({
          submitDone: true,
          successModal: false,
          count: 5,
          loaderShow: false,
        });
      } else {
        // let evt = new CustomEvent("enroll_flag", {
        //   detail: { flag: true },
        // });
        // window.dispatchEvent(evt);
        // localStorage.removeItem("paymentData");
        // localStorage.removeItem("PAYMENT_ERROR");
        this.setState({
          submitDone: true,

          count: 5,
          loaderShow: false,
        });
      }
      // if(sessionStorage.getItem("CLIENT_ID")== "1004" || sessionStorage.getItem("CLIENT_ID")== 1004){ //condition for employer flow
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

        // if(sessionStorage.getItem("CLIENT_ID")== "1004" || sessionStorage.getItem("CLIENT_ID")== 1004){
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
   // }
  // }
  }
  // else if(sessionStorage.getItem("CLIENT_ID")== "1002" || sessionStorage.getItem("CLIENT_ID")== 1002){
  //   this.setState(
  //     {
  //       // count: this.state.count + 1,
  //       // count: 4,

  //       // progress: ((this.state.count + 2) / 4) * 100,
  //       progress: (4 / 4) * 100,

  //       loaderShow: false,
  //       submitDone:true,
  //       count: 5,
  //     },
  //     () => {
  //       this.getDisabled();
  //     }
  //   );
  // }
  };

  componentDidMount() {
    if (sessionStorage.getItem("notHLC") === "true")
      sessionStorage.setItem("current_screen", "8");
    else {
      sessionStorage.setItem("current_screen", "7");
    }
    this.setState({
      loaderShow: true,
      privacyPolicy: false,
      authorize1: false,
      authorize: false,
      authorization: false,
      checkBox5: false,
      checkBox7: false,
      checkBox8: false,
    });
    let cookiesData = null;
    this.getWaitingPeriodSummary();
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
          console.log("===RESPONSE===", response.data.response);
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
                  // privacyPolicy: true,
                  // authorize: true,
                  // authorize1: true,
                  // authorize44: true,
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
        configuration.baseUrl +
          "/addon/getReviewChoices/" +
          this.props.subId +
          "/Netwell"
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
          configuration.baseUrl +
            "/plan/quoteByPlanSummary/" +
            this.props.subId +
            "/Netwell"
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
        // this.state.privacyPolicy &&
        // this.state.authorize &&
        // this.state.authorize1 &&
        // this.state.checkBox5 &&
        this.state.checkBox6 &&
        // this.state.checkBox7 &&
        // this.state.checkBox8
        this.state.checkBoxFirst &&
        this.state.checkBoxSecond &&
        // this.state.checkBoxThird &&
        this.state.checkBoxFourth
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
    console.log("state", this.state);
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
                checked={this.state.checkBoxFirst}
                inputProps={{
                  "aria-label": "secondary checkbox",
                }}
                style={{ color: "#533278", marginLeft: -12 }}
                // onClick={this.showPlansModalPrivacy}
                onClick={() => {
                  this.setState({ checkBoxFirst: !this.state.checkBoxFirst });
                  setTimeout(() => this.getDisabled(), 100);
                }}
                // this.setState({ privacyPolicy: !this.state.privacyPolicy })
                // }
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginLeft: "30px",
                marginTop: "-36px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              }}
            >
              {/* <span
                style={{
                  cursor: "pointer",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
                onClick={this.showPlansModalPrivacy}
              > */}
              I have READ, I UNDERSTAND, I ACKNOWLEDGE, I ACCEPT and I AGREE to
              COMPLY with ALL that is contained in the
              <span
                style={{ cursor: "pointer", color: "blue" }}
                // onClick={this.showPlansModalPrivacy}
              >
                {" "}
                <a href="https://netwell-prod.s3.amazonaws.com/Member/Member-Acknowledgement-Agreement.pdf" target="_blank"> <u>MEMBER ACKNOWLEDGEMENT</u></a>
              </span>,{" "}
               the what
              <span
                style={{ cursor: "pointer", color: "blue" }}
                // onClick={this.showAuthorizeModalPopup2}
              >               <a href="https://netwell-prod.s3.amazonaws.com/Member/Member-Acknowledgement-Agreement.pdf" target="_blank"><u>netWell is and is not</u></a>
              </span>,{" "}
               the{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                // onClick={this.showAuthorizeModalPopup}
              >
               <a href="https://netwell-prod.s3.amazonaws.com/Member/Member-Acknowledgement-Agreement.pdf" target="_blank"> <u>netWell’s Membership Overview</u></a></span>,{" "}
               the{" "}
               <span
                style={{ cursor: "pointer", color: "blue" }}
                // onClick={this.showAuthorizeModalPopup}
              ><a href="https://netwell-prod.s3.amazonaws.com/Member/Member-Acknowledgement-Agreement.pdf" target="_blank"> <u> Appeals Review and Arbitration Process</u></a>
              </span>,{" "}
               the{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                // onClick={this.showFinanceAuthModal}
              >
               <a href="https://netwell-prod.s3.amazonaws.com/Member/Member-Consent-Form.pdf" target="_blank"> <u>Consents</u></a>
              </span>
              , the{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                // onClick={this.showModal7}
              >
              <a href="https://netwell-prod.s3.amazonaws.com/Member/Limited-Power-of-Attorney.pdf" target="_blank">  <u>Limited Power of Attorney </u></a>
              </span>{" "}
              & Other Agreements with Respect to my Health Share Account, AND
              agree to live by the netWell Biblically based Statement of
              Religious and Ethical Beliefs and ensure compliance, on behalf of
              myself and all the members of my membership.
              {/* </span> */}
              {/* </Grid>
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
            > */}
              {/* <span
                style={{ cursor: "pointer" }}
                onClick={this.showAuthorizeModalPopup2}
              > */}
              {/* , the what 
                <span
                  style={{
                    cursor: "pointer",
                    color: "blue"
                    
                  }}
                  onClick={this.showAuthorizeModalPopup2}
                >
                 &nbsp; <u>netWell is and is not</u>
                </span> */}
              {/* </span> */}
              {/* </Grid>
          </Grid>

          <Grid item xs={12} style={{ marginBottom: "5px" }} id="13">
            <Grid item xs={2}>
              <Checkbox
                checked={this.state.authorize}
                inputProps={{
                  "aria-label": "secondary checkbox",
                }}
                style={{ color: "#533278", marginLeft: -12 }}
                onClick={this.showAuthorizeModalPopup}
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
            > */}
              {/* {i18n.t("SUBMIT_APPLICATION.FELLOWSHIPCHECKBOX3")} */}
              {/* , the <span style={{ cursor: "pointer",color: "blue" }} onClick={this.showAuthorizeModalPopup}><u>netWell’s Membership Overview, </u> 
                <u> Appeals Review and Arbitration Process</u></span>  */}
              {/* AND agree to ensure compliance, 
                on behalf of myself and all the members of my membership, to live by the Biblically
                 based Statement of Religious and Ethical Beliefs.
              
            </Grid>

           

          </Grid>
          <Grid item xs={12} style={{ marginBottom: "5px" }} id="14">
            <Grid item xs={2}> */}
              {/* <Checkbox
                checked={this.state.authorization}
                inputProps={{
                  "aria-label": "secondary checkbox",
                }}
                style={{ color: "#533278", marginLeft: -12 }}
                onClick={this.showFinanceAuthModal}
              /> */}
              {/* </Grid>
          <Grid
              item
              xs={10}
              style={{
                marginLeft: "25px",
                marginTop: "-36px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              }}
            > */}
              {/* {i18n.t("SUBMIT_APPLICATION.FELLOWSHIPCHECKBOX3")} */}
              {/* , <span style={{ cursor: "pointer", color: "blue" }} onClick={this.showFinanceAuthModal}><u>consents</u></span>, the  <span style={{ cursor: "pointer", color: "blue"}} onClick={this.showModal7}><u>Limited Power of Attorney </u></span> contained 
                herein these forms and agree to ensure compliance with these acknowledgements on behalf of 
                myself and all members of my membership. */}
            </Grid>
          </Grid>

          {/* checkbox 5 */}
          <Grid item xs={12} style={{ marginBottom: "5px" }} id="14">
            <Grid item xs={2}>
              <Checkbox
                checked={this.state.checkBoxSecond}
                inputProps={{
                  "aria-label": "secondary checkbox",
                }}
                style={{ color: "#533278", marginLeft: -12 }}
                // onClick={this.showCheckbox5}
                onClick={() => {
                  this.setState({ checkBoxSecond: !this.state.checkBoxSecond });
                  setTimeout(() => this.getDisabled(), 100);
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginLeft: "30px",
                marginTop: "-36px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              }}
            >
              {/* {i18n.t("SUBMIT_APPLICATION.FELLOWSHIPCHECKBOX3")} */}I
              ACKNOWLEDGE receipt of the{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                // onClick={this.showModal7}
              >
               <a href="https://netwell-prod.s3.amazonaws.com/Member/netWell-Comprehensive-Book.pdf" target="_blank"><u>Member Guide</u></a>
              </span>{" "}
              and AGREE to reading it in its entirety and ensuring that this
              program fully meets my health care needs. I will closely review
              all the limitations of what is not an eligible sharing expense on
              the program. I hereby AUTHORIZE the release of my{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                // onClick={this.showModal8}
              >
               <a href="https://netwell-prod.s3.amazonaws.com/Member/Authorization-for-Release-of-Protected-Health-Information.pdf" target="_blank"> <u>Protected Health Information.</u></a>
              </span>
              , to ensure that all sharing requests are reviewed and processed
              correctly.
            </Grid>
          </Grid>

          {/* checkbox 6 */}
          {this.state.showCheckBox6 && (
            <Grid item xs={12} style={{ marginBottom: "5px" }} id="14">
              <Grid item xs={2}>
                <Checkbox
                  checked={this.state.checkBox6}
                  inputProps={{
                    "aria-label": "secondary checkbox",
                  }}
                  style={{ color: "#533278", marginLeft: -12 }}
                  onClick={this.showModal6}
                />
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  marginLeft: "25px",
                  marginTop: "-36px",
                  fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                }}
              >
                I have
              FULLY READ, ACKNOWLEDGE, and ACCEPT the waiting period
              requirements within the{" "} 
              {/* <span style={{ cursor: "pointer",color: "blue" }} onClick={this.showModal6}><u>Member Banking Agreement & Authorization</u></span>  */}
              <span style={{ cursor: "pointer", color: "blue" }}> <a href="https://netwell-prod.s3.amazonaws.com/Member/netWell-Comprehensive-Book.pdf" target="_blank"> <u>Member Guide</u></a></span> {" "}
              for myself and/or my family members on the program.
              </Grid>
            </Grid>
          )}

          {/* checkbox 7 */}
          {/* <Grid item xs={12} style={{ marginBottom: "5px" }} id="14">
            <Grid item xs={2}>
              <Checkbox
                checked={this.state.checkBoxThird}
                inputProps={{
                  "aria-label": "secondary checkbox",
                }}
                style={{ color: "#533278", marginLeft: -12 }}
                // onClick={this.showModal7}
                onClick={() => {
                  this.setState({ checkBoxThird: !this.state.checkBoxThird });
                  setTimeout(() => this.getDisabled(), 100);
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginLeft: "30px",
                marginTop: "-36px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              }}
            >
              {i18n.t("SUBMIT_APPLICATION.FELLOWSHIPCHECKBOX3")}I have
              FULLY READ, ACKNOWLEDGE, and ACCEPT the waiting period
              requirements within the{" "}
              <span
                style={{ cursor: "pointer", color: "blue" }}
                onClick={this.showModal7}
              >
               <a href="https://netwell-prod.s3.amazonaws.com/Member/netWell-Comprehensive-Book.pdf" target="_blank">  <u>Member Guide</u></a>
              </span>{" "}
              for myself and/or my family members on the program.
            </Grid>
          </Grid> */}

          {/* checkbox 8 */}
          <Grid item xs={12} style={{ marginBottom: "5px" }} id="14">
            <Grid item xs={2}>
              <Checkbox
                checked={this.state.checkBoxFourth}
                inputProps={{
                  "aria-label": "secondary checkbox",
                }}
                style={{ color: "#533278", marginLeft: -12 }}
                // onClick={this.showModal8}
                onClick={() => {
                  this.setState({ checkBoxFourth: !this.state.checkBoxFourth });
                  setTimeout(() => this.getDisabled(), 100);
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              style={{
                marginLeft: "30px",
                marginTop: "-36px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
              }}
            >
              I CONFIRM that the billing account information on this
              application, or that if the credit card on file is in my name,
              that I or a representative submitted to netWell, is correct and
              that I authorize netWell to initiate debit entries from the
              account provided.
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
                {i18n.t("SUBMIT_APPLICATION_NETWELL.PRIVACY_TITLE")}
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
                <div style={{ paddingTop: "8px" }}>
                  I acknowledge and agree that the membership option, number of
                  dependents, effective date, monthly contributions and fees,
                  and the answers to all medical questions on the Member
                  Enrollment Request above are true and correct. All enrollment
                  fees and charitable donations are{" "}
                  <sapn style={{ fontWeight: "bold" }}>non-refundable</sapn>{" "}
                  after the submission of my Member Enrollment Request.
                </div>

                {/* <div className="text-right" style={{ marginTop: "15px" }}>
                  <CustomeButton
                    onClick={(event) => this.hideModalPrivacy(event)}
                    style={{ marginRight: "15px" }}
                  >
                    {i18n.t("BUTTON.CANCEL")}
                  </CustomeButton>
                  <CustomeButton onClick={() => this.acceptPrivacyPolicy()}>
                    {i18n.t("BUTTON.ACCEPT")}
                  </CustomeButton>
                </div> */}
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
                {i18n.t("SUBMIT_APPLICATION_NETWELL.SHARE_TITLE")}
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
                <u>{i18n.t("SUBMIT_APPLICATION_NETWELL.SHARE0")}</u>
              </div>

              <div style={{ paddingTop: "8px" }}>
                <ul>
                  <li>
                    {/* {i18n.t("SUBMIT_APPLICATION_NETWELL.SHARE1")} */}I
                    acknowledge that netWell is <b>not</b> insurance and that
                    netWell has &nbsp;<b>not</b> been presented to me as
                    insurance either by a netWell coordinator or by any third
                    party.
                  </li>
                  <li style={{ paddingTop: "8px" }}>
                    I acknowledge that netWell does <b>not</b> replace
                    traditional insurance and that <i>members</i> remain
                    responsible for their own <i>medical requests</i>. netWell
                    does <b>not</b> assume any legal risk or obligation, nor do
                    its <i>members</i> guarantee or promise that{" "}
                    <i>eligible medical requests</i> will be <i>shared</i> or{" "}
                    <i>funded</i> by the <i>membership.</i>
                  </li>
                </ul>
              </div>
              <div style={{ paddingTop: "8px", fontWeight: "bold" }}>
                <u>{i18n.t("SUBMIT_APPLICATION_NETWELL.SHARE2")}</u>
              </div>
              <div style={{ paddingTop: "8px" }}>
                <ul>
                  <li>
                    {/* {i18n.t("SUBMIT_APPLICATION_NETWELL.SHARE1")} */}I
                    acknowledge that netWell <b>is</b> a Health Care Sharing
                    Ministry (“HCSM”). HCSM <i>members</i>
                    believe in a common core of religious or ethical beliefs and{" "}
                    <i>voluntarily</i> contribute toward{" "}
                    <i>members’ eligible medical requests</i> based on those
                    beliefs.
                  </li>
                  <li style={{ paddingTop: "8px" }}>
                    I acknowledge that netWell <b>is</b> a HCSM that facilitates{" "}
                    <i>sharing of eligible medical requests</i> based on{" "}
                    <i>Member Commitment Contributions</i> and the provisions of
                    the Member Guide.
                  </li>
                </ul>
              </div>

              {/* <div className="text-right" style={{ marginTop: "15px" }}>
                <CustomeButton
                  onClick={(event) => this.authorizeHideModal1(event)}
                  style={{ marginRight: "15px" }}
                >
                  {i18n.t("BUTTON.CANCEL")}
                </CustomeButton>
                <CustomeButton onClick={() => this.acceptAuthorization1()}>
                  {i18n.t("BUTTON.ACCEPT")}
                </CustomeButton>
              </div> */}
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
                {i18n.t("SUBMIT_APPLICATION_NETWELL.IMP_NOTICE")}
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
                  <u> Member Guide:</u>
                </span>
                <ul>
                  <li style={{ padding: "8px" }}>
                    I acknowledge and agree that I have or will fully read and
                    understand the most current Member Guide. I acknowledge that
                    I have determined that this <i>membership</i> meets my
                    healthcare needs. I acknowledge that I have had the
                    opportunity to voice any questions and received satisfactory
                    answers leading up to the purchase of this plan.
                  </li>
                  <li style={{ padding: "8px" }}>
                    I acknowledge that I have access to the most current Member
                    Guide online (In my Welcome Email and in my Member Portal.)
                    I acknowledge that the Member Guide is part of the{" "}
                    <i>Member Enrollment Request.</i>
                  </li>
                  <li style={{ padding: "8px" }}>
                    I acknowledge that the Member Guide outlines which of my{" "}
                    <i>medical requests</i> may or may not be{" "}
                    <i>eligible for sharing</i> but does not constitute a
                    contract and carries no promise or guarantee to <i>share</i>{" "}
                    in my <i>eligible medical requests,</i> implied or
                    otherwise.
                  </li>
                  <li style={{ padding: "8px" }}>
                    I acknowledge that the provisions of the Member Guide in
                    effect on the date of service for any of my{" "}
                    <i>
                      medical requests, encompasses the rules of the health plan
                      and is the document of truth
                    </i>{" "}
                    (controlling document) even if I have been given verbal{" "}
                    <i>communications</i> that are contradictory to the document
                    of truth.
                  </li>
                </ul>
              </div>

              <div>
                <span
                  style={{
                    fontWeight: "bold",
                    wordSpacing: "1px",
                    textAlign: "left",
                  }}
                >
                  <u>Member Duties:</u>
                </span>
                <ul>
                  <li style={{ padding: "8px" }}>
                    It is my duty to honestly, accurately and completely answer
                    the medical questions on the
                    <i>Member Enrollment Request.</i>
                  </li>
                  <li style={{ padding: "8px" }}>
                    It is my duty to read the most current Member Guide as it is
                    subject to change or update with appropriate written notice.
                  </li>
                  <li style={{ padding: "8px" }}>
                    It is my duty to make the necessary authorizations and
                    consents for my <i>Monthly Commitment Contributions </i>and{" "}
                    <i>Monthly Membership Fees</i> to be submitted.
                  </li>
                  <li style={{ padding: "8px" }}>
                    It is my duty to request a review of any{" "}
                    <i>medical request</i> that I believe has not been processed
                    correctly and, if I am still dissatisfied after such review,
                    I will utilize the provisions in the Member Guide to make an
                    appeal.
                  </li>
                  <li style={{ padding: "8px" }}>
                    It is my duty to ensure that all <i>active members</i> under{" "}
                    <i>my membership</i> abide by the
                    <i>Statement of Religious and Ethical Beliefs,</i> as it is
                    my understanding that failure to abide by these beliefs
                    and/or this Member Acknowledgement Agreement may result in
                    the <i>cancellation</i> of my <i>membership</i> and/or my{" "}
                    <i>medical requests</i> may be processed as{" "}
                    <i>ineligible </i>
                    for <i>sharing</i> per the Member Guide.
                  </li>
                </ul>
              </div>

              <div>
                <span
                  style={{
                    fontWeight: "bold",
                    wordSpacing: "1px",
                    textAlign: "left",
                  }}
                >
                  <u> Monthly Commitment Contributions:</u>
                </span>
                <ul>
                  <li style={{ padding: "8px" }}>
                    I acknowledge that my <i>Monthly Commitment Contribution</i>{" "}
                    is based on the size of my <i>membership,</i> the age of the
                    oldest <i>member,</i> my place of residence and the{" "}
                    <i>membership</i>
                    option I have chosen.
                  </li>
                  <li style={{ padding: "8px" }}>
                    I acknowledge that my <i>Monthly Commitment Contribution</i>{" "}
                    changes at certain ages based on the oldest <i>member’s</i>{" "}
                    age and if I change my place of residence. It can also
                    change if
                    <i>Monthly Commitment Contributions</i> change for all
                    members and I am notified in advance.
                  </li>
                  <li style={{ padding: "8px" }}>
                    I acknowledge that my <i>Monthly Commitment Contribution</i>{" "}
                    includes <i>Monthly Membership Fees</i> that are itemized on
                    my <i>Monthly Commitment Contribution Request.</i>
                  </li>
                </ul>
              </div>

              <div>
                <span
                  style={{
                    fontWeight: "bold",
                    wordSpacing: "1px",
                    textAlign: "left",
                  }}
                >
                  <u> Length of Membership:</u>
                </span>
                <ul>
                  <li style={{ padding: "8px" }}>
                    I acknowledge that my <i>membership</i> can become effective
                    not less than seven (7) days after nor more than sixty (60)
                    days after my enrollment, the date to be chosen by me.
                  </li>
                  <li style={{ padding: "8px" }}>
                    I acknowledge that my <i>membership</i> is <i>voluntary</i>{" "}
                    and that I may <i>cancel</i> my membership at any time as
                    provided in the Member Guide and that my cancelation request
                    must be submitted in writing to netWell no later than{" "}
                    <b>72 hours prior to the next draft date.</b>
                  </li>
                  <li style={{ padding: "8px" }}>
                    I acknowledge that my <i>membership</i> can be{" "}
                    <i>cancelled</i> by netWell if I fail to follow the
                    <i>Statement of Religious and Ethical Beliefs</i> contained
                    in this Member Acknowledgement Agreement or if I fail to
                    make my <i>Monthly Commitment Contribution.</i>
                  </li>
                </ul>
              </div>

              <div>
                <span
                  style={{
                    fontWeight: "bold",
                    wordSpacing: "1px",
                    textAlign: "left",
                  }}
                >
                  <u> Appeal Review and Arbitration Process:</u>
                </span>
                <ul>
                  <li style={{ padding: "8px" }}>
                    I agree that I expect to be treated with respect in my
                    dealings with netWell coordinators and that I will treat the
                    coordinators with the same respect.
                  </li>
                  <li style={{ padding: "8px" }}>
                    I agree that I will use the <i>Appeals Review Process</i> to
                    resolve any disagreements I may have regarding any{" "}
                    <i>eligibility</i> determination or how any{" "}
                    <i>medical request</i> has been processed.
                  </li>
                  <li style={{ padding: "8px" }}>
                    I agree that I will hold netWell, its partners, its
                    employees or directors harmless and will not file a lawsuit
                    for any reason related to my participation in the netWell
                    <i>membership.</i>
                  </li>
                  <li style={{ padding: "8px" }}>
                    I agree that in the event of an unresolved disagreement that
                    I will submit said disagreement for arbitration as outlined
                    in the Member Guide.
                  </li>
                  <li style={{ padding: "8px" }}>
                    I acknowledge that any request for arbitration will be
                    handled with either the American Arbitration Association
                    (AAA) or Institute for Christian Conciliation (ICC) at the
                    mutual agreement between myself and netWell and will be held
                    in Atlanta, GA unless an alternate city is mutually agreed
                    upon.
                  </li>
                </ul>
              </div>

              <div>
                <span
                  style={{
                    fontWeight: "bold",
                    wordSpacing: "1px",
                    textAlign: "left",
                  }}
                >
                  <u> Statement of Religious and Ethical Beliefs:</u>
                </span>
                <ol>
                  <li style={{ padding: "8px" }}>
                    We believe in the God of the Bible and the Power of Prayer.
                    <br />
                    <span style={{ color: "blue", fontSize: "12px" }}>
                      <i>
                        Philippians 4:6, <u>NIV:</u> “Do not be anxious about
                        anything, but in every situation, by prayer and
                        petition, with thanksgiving, present your requests to
                        God.”
                      </i>
                    </span>
                  </li>
                  <li style={{ padding: "8px" }}>
                    We believe it is our Duty to Love and Accept one another.
                    <br />
                    <span style={{ color: "blue", fontSize: "12px" }}>
                      <i>
                        John 13:34, <u>NIV:</u> "A new command I give you: Love
                        one another. As I have loved you, so you must love one
                        another.”
                      </i>
                    </span>
                  </li>
                  <li style={{ padding: "8px" }}>
                    We believe it is our obligation to God and our fellow
                    members to Live a healthy lifestyle which avoids habits and
                    behaviors that are harmful to the body.
                    <br />
                    <span style={{ color: "blue", fontSize: "12px" }}>
                      <i>
                        1 Corinthians 10:31, <u>NIV:</u> “So whether you eat or
                        drink or whatever you do, do it all for the glory of
                        God.”
                      </i>
                    </span>
                  </li>

                  <li style={{ padding: "8px" }}>
                    We believe it is our ethical and moral responsibility to
                    Carry each other’s Burdens.
                    <br />
                    <span style={{ color: "blue", fontSize: "12px" }}>
                      <i>
                        Galatians 6:2, <u>NIV:</u> “Carry each other’s burdens,
                        and in this way you will fulfill the law of Christ."
                      </i>
                    </span>
                  </li>
                </ol>
              </div>

              {/* <div className="text-right" style={{ marginTop: "15px" }}>
                <CustomeButton
                  onClick={(event) => this.authorizeHideModal(event)}
                  style={{ marginRight: "15px" }}
                >
                  {i18n.t("BUTTON.CANCEL")}
                </CustomeButton>
                <CustomeButton onClick={() => this.acceptAuthorization()}>
                  {i18n.t("BUTTON.ACCEPT")}
                </CustomeButton>
              </div> */}
            </Modal.Body>
          </Modal>

          {/* modal 4 */}

          <Modal
            size="lg"
            show={this.state.financeAuthModalShow}
            centered
            onHide={(event) => this.hideModalFinaceAuth11(event)}
            backdrop="static"
          >
            <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title>
                {/* {i18n.t("SUBMIT_APPLICATION.FINANCE_TITLE")} */}
                MEMBER CONSENT FORM 
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
              {this.state.loaderShow ? <Loader></Loader> : ""}
              <div style={{ paddingTop: "12px" }}>
                {/* {i18n.t("SUBMIT_APPLICATION.FINANCE_BODY")} */}
                This Member Consent Form <i> (“Consent”) </i> covers your{" "}
                <i>member Account,</i> membership options, and discount or
                contracted services with netWell and its affiliates that are
                accessible, either currently or in the future, through our
                websites (through a personal computer or mobile device).
              </div>
              <ol>
                <li>
                  <div style={{ paddingTop: "12px" }}>
                    <u>
                      <i>
                        To be an active member, you must Consent to receive all
                        your membership Communications, electronically,
                      </i>
                    </u>{" "}
                    such as your <i>Monthly Commitment Contribution</i>{" "}
                    (including single
                    <i>funding</i> or recurring <i>funding</i> authorizations
                    and notices),{" "}
                    <i>Explanation of Sharing (EOS), Privacy Policy </i>(if
                    applicable), and any amendment or other disclosures related
                    thereto (collectively referred to as <i>“Communications”</i>
                    ) electronically rather than on paper.
                    <b>
                      You agree that netWell shall electronically provide to
                      you, your Communications and information related to your{" "}
                      <i>membership.</i>
                    </b>{" "}
                    You will not receive the <i>Communications</i> in paper
                    form.
                  </div>
                </li>

                <li>
                  <div style={{ paddingTop: "12px" }}>
                    <u>
                      <i>
                        All Communications from netWell delivered to you in
                        electronic format will be considered “in writing.”
                      </i>
                    </u>{" "}
                    You should print or download (for your records) a copy of
                    the document and any other <i>Communications</i> that are
                    important to you. netWell may always, in our sole discretion
                    or if required by law, provide you with any{" "}
                    <i>Communication</i> in paper form, even if you have chosen
                    to receive it electronically. <i>Communications</i> shall be
                    sent to the <i>key member’s</i> address that netWell has for
                    you at the time any paper <i>Communications</i> are mailed.
                  </div>
                </li>

                <li>
                  <div style={{ paddingTop: "12px" }}>
                    <u>
                      <i>Request for Copies </i>
                    </u>
                    <br />
                    <br />
                    You may request a paper copy of a Communication at any time
                    by calling netWell at 1-866-NETWELL (638-9355) or in writing
                    to netWell at 5051 Peachtree Corners Circle, Suite 200,
                    Norcross, GA 30092. If you request a copy of a previous
                    Communications, we may charge you a reasonable service
                    charge for the delivery of paper copies of any
                    Communications provided to you electronically.
                  </div>
                </li>

                <li>
                  <div style={{ paddingTop: "12px" }}>
                    <u>
                      <i>Withdrawal of This Consent </i>
                    </u>
                    <br />
                    <br />
                    You may withdraw this <i>Consent</i> at any time after
                    submission by calling netWell at 1-866-NETWELL (638-9355).
                    netWell coordinators are available to assist you from 9:00am
                    to 6:00 pm EST, if you withdraw your <i>Consent</i> to
                    obtain electronic <i>Communications,</i>
                    your <i>membership</i> can be <i>cancelled.</i>
                  </div>
                </li>

                <li>
                  <div style={{ paddingTop: "12px" }}>
                    <u>
                      <i>Updating Electronic Information </i>
                    </u>
                    <br />
                    <br />
                    It is your responsibility to provide netWell with a true,
                    accurate and complete email address, contact information and
                    any other information needed to contact you electronically.
                    To update your electronic address, you may call us at
                    1-866-NETWELL (638- 9355) or update your information within
                    your secure Member Portal. You agree to promptly notify
                    netWell when you change your email or other electronic
                    address. At our option, netWell may treat your provision of
                    an invalid email address, or the subsequent malfunction of a
                    previously valid email address, as a withdrawal of your{" "}
                    <i>Consent</i> to receive electronic <i>Communications.</i>
                  </div>
                </li>

                <li>
                  <div style={{ paddingTop: "12px" }}>
                    <u>
                      <i>System Requirements </i>
                    </u>
                    <br />
                    To receive the requested <i>Communications</i>{" "}
                    electronically, you will need the following:
                    <br />
                    <br />
                    <ol type="a">
                      <li style={{ paddingTop: "8px" }}>
                        An active email address, an internet connection, along
                        with a web-enabled device with an operating system
                        capable of supporting items 2 and 3.
                      </li>
                      <li style={{ paddingTop: "8px" }}>
                        A current version* of an Internet browser we support,
                        which may include Microsoft Internet Explorer, Firefox,
                        Safari, or Chrome.
                      </li>
                      <li style={{ paddingTop: "8px" }}>
                        Access to a printer or the ability to download
                        information to keep copies for your records. You will
                        also need a current version* of a program that
                        accurately reads and displays PDF files, such as Adobe
                        Acrobat Reader.
                      </li>
                    </ol>
                  </div>
                </li>
                {/* <li> */}
                <div style={{ paddingTop: "12px" }}>
                  *By “current version,” we mean a version of the software that
                  is currently being supported by its publisher and that we
                  support.
                </div>
                {/* </li> */}

                <div style={{ paddingTop: "12px" }}>
                  If you have any questions regarding our hardware or software
                  requirements, please contact us at 1-866-NETWELL (638-9355) or
                  via email at enrollment@netwell.com.
                </div>

                <div style={{ paddingTop: "12px" }}>
                  You affirm to <i>Consent</i> to netWell to provide electronic{" "}
                  <i>Communications</i> to you, as described above. You further
                  affirm and confirm that you have the hardware and software
                  described above, that you can receive, review, and retain
                  electronic records, and that you have provided, or will
                  provide to netWell, a current, valid email address to which
                  netWell may deliver electronic <i>Communications.</i>
                </div>

                <div style={{ paddingTop: "12px" }}>
                  As a <i>member,</i> by executing this{" "}
                  <b>
                    <i>Member Acknowledgement Agreement </i>
                  </b>
                  and{" "}
                  <b>
                    <i>Member Consent Form </i>
                  </b>
                  for netWell, I ACKNOWLEDGE, ACCEPT AND AGREE TO COMPLY WITH
                  ALL the agreements and consents contained herein these forms
                  and agree to ensure compliance with these acknowledgements on
                  behalf of myself and all members of my membership, and to live
                  by the Biblically based{" "}
                  <b>
                    <i>Statement of Religious and Ethical Beliefs</i>
                  </b>{" "}
                  as stated above.
                </div>
              </ol>

              {/* <div className="text-right" style={{ marginTop: "15px" }}>
                <CustomeButton
                  onClick={(event) => this.hideModalFinaceAuth(event)}
                  style={{ marginRight: "15px" }}
                >
                  {i18n.t("BUTTON.CANCEL")}
                </CustomeButton>
                <CustomeButton onClick={() => this.acceptFinaceAuth()}>
                  {i18n.t("BUTTON.ACCEPT")}
                </CustomeButton>
              </div> */}
            </Modal.Body>
          </Modal>

          {/* modal 6 */}

          <Modal
            size="lg"
            show={this.state.ModalShow6}
            centered
            onHide={(event) => this.hideModal6(event)}
            backdrop="static"
          >
            <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title>
                Waiting Period Summary
                {/* Member Banking Agreement & Authorization to Draw on Members Billing Account */}
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
              {this.state.loaderShow ? <Loader></Loader> : ""}
              <div style={{ paddingTop: "12px" }}>
                I accept and agree with all my Initial Waiting Periods.
                <div style={{ paddingTop: "12px" }}>
                  {this.state.disQualifiedData && (
                    <CommonTable
                      quoteData={this.state.disQualifiedData.data}
                      check={true}
                      headerData={this.state.disQualifiedData.header}
                      tooltip={[]}
                      quickQuote={false}
                      totalReq={false}
                    />
                  )}
                </div>
              </div>

              <div className="text-right" style={{ marginTop: "15px" }}>
                <CustomeButton
                  onClick={(event) => this.hideModal6(event)}
                  style={{ marginRight: "15px" }}
                >
                  {i18n.t("BUTTON.CANCEL")}
                </CustomeButton>
                <CustomeButton onClick={() => this.acceptModal6()}>
                  {i18n.t("BUTTON.ACCEPT")}
                </CustomeButton>
              </div>
            </Modal.Body>
          </Modal>

          {/* modal 7 */}

          <Modal
            size="lg"
            show={this.state.ModalShow7}
            centered
            onHide={(event) => this.hideModal7(event)}
            backdrop="static"
          >
            <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title>
                {/* {i18n.t("SUBMIT_APPLICATION.FINANCE_TITLE")} */}
                Limited Power of Attorney
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
              {this.state.loaderShow ? <Loader></Loader> : ""}
              <div style={{ paddingTop: "12px" }}>
                <b>
                  Limited Power of Attorney & Other Agreements with Respect to
                  Members HealthShare Account
                </b>
              </div>
              <ol>
                <li>
                  <div style={{ paddingTop: "12px" }}>
                    <b>
                      <u>Purpose</u>; Appointment of netWell Healthcare as
                      Authorized Agent.
                    </b>{" "}
                    The purpose of this Healthcare Sharing Limited Power of
                    Attorney (<i>“Limited Power of Attorney”</i>) is for the
                    undersigned account holder (<i>“Member”</i>) to give Health
                    Care Sharing Ministry (“netWell”) rights to conduct business
                    related to <i>Members</i> HealthShare Account (
                    <i>“Account”</i>).
                  </div>
                </li>

                <li>
                  <div style={{ paddingTop: "12px" }}>
                    <b>
                      <u>General Terms.</u>
                    </b>{" "}
                    <i>Member</i> acknowledges and agrees as follows:
                    <ol type="a">
                      <li>
                        <b>Duration and Cancellation.</b> netWell may exercise
                        the rights and powers granted to it under this Limited
                        Power of Attorney until it is revoked.
                      </li>

                      <li>
                        <b>Signing of Document.</b> This{" "}
                        <i>Limited Power of Attorney</i> must be dated and
                        signed by the{" "}
                        <i>Member listed as the account holder.</i>
                      </li>
                    </ol>
                  </div>
                </li>

                <li>
                  <div style={{ paddingTop: "12px" }}>
                    <b>
                      <u>Scope of Limited Power of Attorney.</u>
                    </b>{" "}
                    By signing this <i>Limited Power of Attorney, Member</i>{" "}
                    hereby authorizes netWell, including, but not limited to its
                    agents, officers and employees, to act for and on{" "}
                    <i>Member’s</i> behalf in all matters related to the Members
                    Account including, but not limited to, the following:
                    <ol type="a">
                      <li>
                        <b>Open Account.</b> <i>Member</i> hereby authorizes
                        netWell, to take all actions necessary to open or reopen
                        the Members <i>Account.</i> Member understands and
                        agrees that the <i>Account</i> shall be titled in the
                        name of the <i>Member.</i>
                      </li>

                      <li>
                        <b>
                          Transfer Funds to Other netWell <u>member</u>{" "}
                          accounts.
                        </b>{" "}
                        Member hereby authorizes netWell to initiate transfers
                        electronically, on <i>Member’s</i> behalf of{" "}
                        <i>funds</i> deposited in his or her
                        <i>Account</i> to the accounts of other netWell{" "}
                        <i>members.</i>
                      </li>

                      <li>
                        <b>
                          Transfer <i>Funds</i> to Medical Providers.
                        </b>{" "}
                        <i>Member</i> hereby authorizes netWell, to initiate
                        transfers, electronically, on <i>Member’s</i> behalf of{" "}
                        <i>funds</i> deposited in <i>Member’s Account</i> to
                        medical providers <i>medical requests.</i> This includes
                        their own eligible sharing needs, as well as on behalf
                        of other members sharing needs.
                      </li>

                      <li>
                        <b>Transfer Funds to netWell.</b> <i>Member</i> hereby
                        authorizes netWell to initiate transfers electronically,
                        on <i>Member’s</i> behalf of <i>funds</i> deposited in{" "}
                        <i>Member’s Account</i> to netWell
                      </li>

                      <li>
                        <b>
                          Transfer to and Deposit Funds in{" "}
                          <i>Member Account.</i>
                        </b>{" "}
                        <i>Member</i> hereby authorizes netWell to make deposits
                        into the Members <i>Account. </i>
                      </li>

                      <li>
                        <b>
                          Transfer <i>Funds</i> into and from the{" "}
                          <i>Member Account</i> for Other Purposes.
                        </b>{" "}
                        <i>Member</i> hereby authorizes netWell to initiate
                        transfers electronically, on <i>Member’s</i> behalf of{" "}
                        <i>funds</i> into or from the Members <i>Account</i> for
                        any other purpose authorized by the agreements between
                        <i>Member</i> and netWell.
                      </li>

                      <li>
                        <b>Close Member Account.</b> <i>Member</i> hereby
                        authorizes netWell to take all actions necessary to
                        close the Members <i>Account</i> when applicable and to
                        direct the distribution of any <i>funds </i>
                        contained therein.
                      </li>
                    </ol>
                  </div>
                </li>
                <li>
                  <b>
                    <u>Other Agreements </u>
                  </b>
                  <ol type="a">
                    <li>
                      <b>Governing Law.</b> The internal laws of the State of
                      Georgia, including its Power of Attorney Law, shall govern
                      the construction, interpretation and other matters arising
                      out of or in connection with this{" "}
                      <i>Limited Power of Attorney,</i> whether arising in
                      contract, tort, equity or otherwise, without reference to
                      any principles of conflicts of law that would apply
                      another jurisdiction’s laws.
                    </li>

                    <li>
                      <b>Ratification.</b> <i>Member</i> hereby ratifies, to the
                      extent permitted by law, all that netWell has done, shall
                      do or cause to be done related to the Members{" "}
                      <i>Account.</i>
                    </li>

                    <li>
                      <b>Legal Rights Affected.</b> THIS{" "}
                      <i>LIMITED POWER OF ATTORNEY</i> IS AN IMPORTANT LEGAL
                      DOCUMENT. BY SIGNING THIS{" "}
                      <i>LIMITED POWER OF ATTORNEY, MEMBER</i> AUTHORIZES
                      ANOTHER PERSON TO ACT FOR AND ON BEHALF OF <i>MEMBER</i>{" "}
                      AND WITHOUT FURTHER INSTRUCTION OR AUTHORITY FROM{" "}
                      <i>MEMBER. MEMBER</i>
                      SHOULD READ THIS <i>LIMITED POWER OF ATTORNEY</i>{" "}
                      CAREFULLY AND OBTAIN THE ASSISTANCE OF LEGAL COUNSEL OR
                      ANY OTHER QUALIFIED PERSON TO THE EXTENT THAT ANY
                      PROVISION OF THIS <i>LIMITED POWER OF ATTORNEY </i>IS NOT
                      FULLY UNDERSTOOD.
                    </li>
                  </ol>
                </li>
              </ol>

              {/* <div className="text-right" style={{ marginTop: "15px" }}>
                <CustomeButton
                  onClick={(event) => this.hideModal7(event)}
                  style={{ marginRight: "15px" }}
                >
                  {i18n.t("BUTTON.CANCEL")}
                </CustomeButton>
                <CustomeButton onClick={() => this.acceptModal7()}>
                  {i18n.t("BUTTON.ACCEPT")}
                </CustomeButton>
              </div> */}
            </Modal.Body>
          </Modal>

          {/* modal 8 */}

          <Modal
            size="lg"
            show={this.state.ModalShow8}
            centered
            onHide={(event) => this.hideModal8(event)}
            backdrop="static"
          >
            <Modal.Header style={customStyle.modal_header} closeButton>
              <Modal.Title>
                {/* {i18n.t("SUBMIT_APPLICATION.FINANCE_TITLE")} */}
                netWell AUTHORIZATION FOR RELEASE OF PROTECTED HEALTH
                INFORMATION
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
              {this.state.loaderShow ? <Loader></Loader> : ""}
              <div style={{ paddingTop: "12px" }}>
                I understand that I have the right to revoke this authorization
                in writing unless netWell has taken any action in reliance upon
                it.
              </div>

              <div style={{ paddingTop: "12px" }}>
                I understand that netWell has requested and will receive from me
                and my health care providers certain protected health
                information during my enrollment in netWell. netWell will use
                this information during and after my enrollment. I further
                understand that netWell will protect the confidentiality of that
                information in the same manner as all other protected health
                information netWell maintains and, if I do not enroll, netWell
                will not use or disclose the information netWell obtained for
                any other purpose.
              </div>

              <div style={{ paddingTop: "12px" }}>
                A doctor or health facility involved in my care may request some
                of my protected health information that netWell holds in order
                to make decisions about my care. I understand that netWell may
                make disclosures of my protected health information as necessary
                for such treatment.
              </div>

              <div style={{ paddingTop: "12px" }}>
                I understand that netWell will make use and disclosure of my
                protected health information as necessary for funding purposes.
                For instance, netWell may use information regarding my medical
                procedures and treatment to process and arrange for the funding
                of medical, to determine whether services are medically
                appropriate or to otherwise pre-authorize or certify services as
                eligible to be shared under netWell’s Member Guide. netWell may
                also forward such information to another health plan that may
                also have an obligation to process and pay expenses on my
                behalf.
              </div>

              <div style={{ paddingTop: "12px" }}>
                I understand that netWell will use and disclose my protected
                health information as necessary for health care operations which
                include peer review, business management, accreditation and
                licensing, utilization review and management, quality
                improvement and assurance, enrollment, voluntary disclosure of
                health conditions, compliance, auditing, and other functions
                related to my healthcare management. netWell may also disclose
                my protected health information to another health care facility,
                health care professional or health plan for such things as
                quality assurance and case management, but only if that
                facility, professional, or plan also has, or had, a patient
                relationship with me.
              </div>

              <div style={{ paddingTop: "12px" }}>
                I understand that netWell may from time to time disclose my
                protected health information to my spouse, children, or others
                who are involved in my care or in payment for my care in order
                to facilitate that person’s involvement in caring for me or
                paying for my care. If I am unavailable, incapacitated, or
                facing an emergency medical situation and netWell determines
                that a limited disclosure may be in my best interest, netWell
                may share limited protected health information with such
                individuals without my approval. netWell may also disclose
                limited protected health information to a public or protected
                entity that is authorized to assist in disaster relief efforts
                in order for that entity to locate a family member or other
                persons that may be involved in some aspect of caring for me.
              </div>

              <div style={{ paddingTop: "12px" }}>
                I understand that certain aspects and components of netWell
                services are performed through contracts with outside persons or
                organizations, such as legal services, bank services, medical
                discount organizations, pharmacy managers, etc. At times it may
                be necessary for netWell to provide some of my protected health
                information to one or more of these outside persons or
                organizations who assist with health care operations. In all
                cases, netWell requires these business associates to
                appropriately safeguard the privacy of my information.
              </div>

              <div style={{ paddingTop: "12px" }}>
                I understand that netWell may communicate with me regarding my
                medical requests, Monthly Commitment Contribution, or other
                matters related to my health. If I am concerned that the
                information being sent to me may be viewed by another person, I
                understand that reasonable requests to receive communications
                regarding my protected health information by alternative means
                or at alternative locations will be accommodated by netWell.
              </div>

              <div style={{ paddingTop: "12px" }}>
                I understand that netWell may, from time to time, use my
                protected health information to determine whether I might be
                interested in or benefit from treatment alternatives or other
                health-related programs, products or services which may be
                available to me as a member. netWell may use my protected health
                information to identify whether I have a particular illness, and
                contact me to advise me that, as a member, a disease management
                and/or wellness program may help me manage my illness or health
                condition.
              </div>

              <div style={{ paddingTop: "12px" }}></div>

              <div style={{ paddingTop: "12px" }}></div>

              {/* <div className="text-right" style={{ marginTop: "15px" }}>
                <CustomeButton
                  onClick={(event) => this.hideModal8(event)}
                  style={{ marginRight: "15px" }}
                >
                  {i18n.t("BUTTON.CANCEL")}
                </CustomeButton>
                <CustomeButton onClick={() => this.acceptModal8()}>
                  {i18n.t("BUTTON.ACCEPT")}
                </CustomeButton>
              </div> */}
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
              {/* <div className="text-right" style={{ marginTop: "15px" }}>
                <CustomeButton
                  onClick={(event) => this.hideModal4Privacy(event)}
                  style={{ marginRight: "15px" }}
                >
                  {i18n.t("BUTTON.CANCEL")}
                </CustomeButton>
                <CustomeButton onClick={() => this.acceptPrivacyPolicy4()}>
                  {i18n.t("BUTTON.ACCEPT")}
                </CustomeButton>
              </div> */}
            </Modal.Body>
          </Modal>
        </Grid>
      );
    } else if (this.state.count === 2) {
      currentScreen = <div></div>;
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
                // onClick={this.showPlansModalHealth}
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

                {/* <CustomeButton
                  variant="contained"
                  href={AUTH_PDF_URL}
                  target="_blank"
                  style={customeClasses.viewProgSum}
                >
                  DOWNLOAD AUTHORIZATIONS
                </CustomeButton> */}
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
                // marginTop: "10px",
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
                // marginTop: "10px",
                width: "261px",
                height: "40px",
                fontFamily: "Roboto, Arial, Helvetica, sans-serif",
                fontSize: "14px",
              }}
              onClick={() => this.getEmailPhoneDetails("email")}
            >
              SEND AUTHORIZATION EMAIl
            </NextButton>
            {/* <NextButton
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
            </NextButton> */}
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
            {/* <NextButton
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
            </NextButton> */}
            <NextButton
              style={{
                // marginTop: "10px",
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
                // marginTop: "10px",
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
                  {this.props.clientId == "1004" ||
                  this.props.clientId == 1004 ? null : (
                    <p
                      style={{
                        fontSize: "11px",
                        fontWeight: "bold",
                        paddingTop: "10px",
                      }}
                    >
                      {/* *The total amount will include a 0% charge for the use of
                      a credit card as your payment method. To avoid the charge,
                      please use ACH as your payment method in the screen that
                      follows. */}
                    </p>
                  )
                  }
                </Grid>
                {/* <Grid item xs={12} sm={7}>
                  <CustomeButton
                    style={{ height: "40px" }}
                    onClick={() =>
                      this.setState({ FamilyDetailsMoreInfoModal: true })
                    }
                  >
                    REVIEW FAMILY DETAILS
                  </CustomeButton>
                </Grid> */}
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
                          {/* <span>&#42;</span>0% merchant fees apply on credit
                          card payments */}
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
