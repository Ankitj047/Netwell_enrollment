
 export default
 {
     textField: {
         root: {
             '& .MuiFilledInput-root': {
                 backgroundColor: '#f8f8f8',
                 color: '#19191d',
                 fontSize: '16px',
                 lineHeight: '24px',
                 height: '56px',
                 WebkitHeight: '90px',
                 borderColor: '#533278',
                 width: '100%',
                 '&:hover': {
                     backgroundColor: '#f4f4f4',
                     color: '#533278'
                 },

                 "&:hover:not($disabled):not($focused):not($error):before": {
                     borderBottom: '2px solid #533278'
                 },
                 '&.MuiFilledInput-underline:after': {
                     borderBottom: '2px solid #533278'
                 },
                 '&.MuiFilledInput-underline.Mui-error:after': {
                     borderBottom: '2px solid #f44336',
                 },


             },
             '&.MuiInputBase-formControl': {
                 height: '56px',
             },
             '& .Mui-focused': {

             },
             '& .MuiInputLabel-filled': {
                 wordBreak: 'normal',
                 whiteSpace: 'nowrap',
                 textOverflow: 'ellipsis',
                 width: '98%',
             },
             '& label.Mui-focused': {
                 color: '#533278',
                 wordBreak: 'normal',
                 whiteSpace: 'nowrap',
                 textOverflow: 'ellipsis',
                 width: 'auto',
                 overflow: 'hidden'
             },

             '& p.MuiFormHelperText-contained': {
                 margin: 0,
                 fontSize: "11px",
                 marginTop: '6px'
             }
         }
     },


     phonetextField: { //for text input- Phone Number
         root: {
             '& .MuiFilledInput-root': {
                 position: 'relative',
                 transition: 'background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
                 /* background-color: rgba(0, 0, 0, 0.09); */
                 borderTopLeftRadius: '4px',
                 borderTopRightRadius: '4px',
             },
             '&.MuiFilledInput-underline:after': {
                 borderBottom: '2px solid #533278'
             },
             '&.MuiFilledInput-underline.Mui-error:after': {
                 borderBottomColor: '#f44336'
             },
             '& .Mui-focused': {

             },
             '& label.Mui-focused': {
                 color: '#420045',
             },
             '& p.MuiFormHelperText-contained': {
                 margin: 0,
                 fontSize: "12px",
                 marginTop: '6px'
             }
         }
     },
     multiLineTextField: { //for text input- multiline
         root: {
             '& .MuiFilledInput-root': {
                 backgroundColor: '#f8f8f8',
                 color: '#19191d',
                 fontSize: '16px',
                 lineHeight: '24px',
                 //height: '56px',
                 borderColor: '#420045',
                 '&:hover': {
                     backgroundColor: '#f4f4f4',
                     color: '#420045'
                 },

                 '&.MuiFilledInput-underline:after': {
                     borderBottom: '2px solid #420045'
                 },
                 '&.MuiFilledInput-underline.Mui-error:after': {
                     borderBottomColor: '#f44336'
                 }
             },

             '& .MuiInputLabel-filled': {
                 /*wordBreak: 'normal',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  width: '90%',
                  overflow: 'hidden'*/
             },

             '& label.Mui-focused': {
                 color: '#420045',
                 /*wordBreak: 'normal',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                  width: '95%',
                  overflow: 'hidden'*/
             },
             '& .Mui-focused': {

             },
             '& p.MuiFormHelperText-contained': {
                 margin: 0,
                 fontSize: "12px",
                 marginTop: '6px'
             }
         }
     },
     textFieldWrp33: {
         width: '130%',
         marginTop: '0',
         marginBottom: '0',
         marginLeft: '0',
         borderRadius: '4px'
     },

     textFieldWrp: {
         width: '100%',
         marginTop: '0',
         marginBottom: '0',
         marginLeft: '0',
         borderRadius: '4px'
     },
     textFieldWrp11: {
         width: '130%',
         marginTop: '0',
         marginBottom: '0',
         marginLeft: '0',
         borderRadius: '4px'
     },
     textFieldWrp22: {
         width: '100%',
         marginTop: '0',
         marginBottom: '0',
         marginLeft: '30px',
         borderRadius: '4px'
     },

     tableCell: {  //for Table Cell
         root: {
             padding: '10px'
         },
         head: {
             backgroundColor: '#420045',
             color: '#ffffff',
             fontSize: '14px',
             lineHeight: '22px'
         },
         body: {
             fontSize: '16px',
             lineHeight: '24px',
             color: '#420045',
             fontWeight: 'bold'
         },
     },
     tableCell1 : {  //for Table Cell
        root: {
            padding: '10px',
            width:'auto'
        },
        head: {
            backgroundColor: '#420045',
            color: '#ffffff',
            // fontSize: '14px',
            fontSize:'16px',
            fontWeight:'bold',
            lineHeight: '22px'
        },
        body: {
            fontSize: '16px',
            lineHeight: '24px',
            color: '#ffffff',
            fontWeight : 'bold'
        },
    },
     tableRow : { //for Table Row
        root: {
            backgroundColor: '#fae6be',
            height: '38px',
            padding: '10px',
            color:'#ffffff',
            fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
        },
       
    },
     lastRow: {
         backgroundColor: '#f0c8a0',
         borderBottom: '2px solid #420045'
     },

     cellOverflow: {
         wordBreak: 'normal',
         // whiteSpace: 'nowrap',
         textOverflow: 'ellipsis',
         overflow: 'hidden',
         maxWidth: '281px'
     },
     cellOverflow1: {
         wordBreak: 'normal',
         whiteSpace: 'nowrap',
         textOverflow: 'ellipsis',
         overflow: 'hidden',
         maxWidth: '90px'
     },


     otherRow: {
         backgroundColor: '#fae6be',
         borderBottom: '2px solid #420045'
     },

     dropDown: {
         width: '100%',
         marginTop: '0',
         marginBottom: '0',
         marginLeft: '0',
         borderRadius: '4px',
         // height: '56px'
     },
     dropDown1: {
         width: '100%',
         marginTop: '0',
         marginBottom: '0',
         marginLeft: '0',
         borderRadius: '4px',
         // height: '190px'
     },
     multiSelect: {
         backgroundColor: '#ffffff',
         padding: '10px',
         fontSize: '14px',
         lineHeight: '16px',
     },
     //============================Eligibility=======================================
     physicianTxtWrp: {
         width: '35%',
         Color: '#19191d',
         marginTop: '30px',
         fontSize: '14px'
     },

     NextButton: { //next Button
         root: {
             width: '120px',
             height: '40px',
             backgroundColor: '#fb6647',
             color: '#ffffff',
             '&:hover': {
                 backgroundColor: '#420045',
                 boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
             },
             '&:disabled': {
                 backgroundColor: '#e1e1e3',
                 color: '#ffffff'
             },
             '&:focus': {
                 outline: 'none'
             },
         },
     },

     areaField: {
         width: '100%',
         marginTop: '0',
         marginBottom: '0',
         marginLeft: '0',
         borderRadius: '4px'
     },

     datePicker: {
         width: '23%',
         height: '56px',
         color: '#19191d',
         borderRadius: '4px',
         padding: '8px'
     },
     datePickerr: {
         width: '35%',
         height: '60px',
         backgroundColor: '#f1f1f1',
         color: '#19191d',
         borderRadius: '4px',
         marginTop: '30px'
     },
     elginputStyle: {
         fontSize: 18,
         color: '#19191d',
         fontfamily: 'Roboto',
         backgroundColor: '#f1f1f1',
         paddingRight: '14px',
         paddingLeft: '14px',
         marginTop: '10px',
         outline: '0px'
     },
     elginputLabelStyle: {
         fontSize: 16,
         paddingLeft: 16,
         paddingRight: 16,
         paddingTop: 4
     },
     elganswerCheck: {
         fontSize: '14px',
         lineHeight: '16px',
         marginBottom: '5px'
     },
     disqualifiedWrp: {
         width: '100%',
         maxHeight: '400px',
         overflowX: 'hidden',
         overflowY: 'auto',
         display: 'flex',
     },
     disqfTextWrp: {
         width: '40%',
         display: "flex",
         flexDirection: "column",
         fontSize: '14px',
         lineHeight: '16px',
         textAlign: 'justify'
     },
     disqfTableWrp: {
         width: '55%',
         fontSize: '14px',
         lineHeight: '16px',
         marginLeft: '5%',
     },
     // =========================================EnrollFamily================================================
     w60: {
         width: '60%'
     },
     w40: {
         width: '40%'
     },
     w28: {
         width: '28%'
     },
     w90px: {
         width: '120px',

     },
     w200px: {
         width: '200px',

     },
     w90: {
         width: '90%'
     },
     w35p: {
         width: '23%',

     },
     w370px: {
         width: '365px',

     },
     w375px: {
         width: '375px',

     },
     lastUpadateWrp: {
         width: '120px',

     },
     w100px: {
         width: '120px',

     },
     w55: {
         width: '55%'
     },
     w224: {
         width: '224px'
     },

     w290px: {
         width: '290px'
     },
     w380px: {
         width: '380%'
     },
     w100: {
         width: '100%'
     },
     w49: {
         width: '49%'
     },
     w50: {
         width: '50%'
     },
     w51: {
         width: '51%'
     },
     w30: {
         width: '30%'
     },
     w31: {
         width: '31%'
     },
     w32: {
         width: '32%'
     },
     w69: {
         width: '69%'
     },
     w70: {
         width: '75%',
     },
     w23: {
         width: '23%'
     },
     w10: {
         width: '10%'
     },
     p10: {
         padding: '10px'
     },
     p20: {
         padding: '20px'
     },
     pB35: {
         paddingBottom: '35px',
         paddingTop: '0px',
         textAlign: 'justify'
     },
     p5: {
         padding: '5px'
     },
     pt9: {
         paddingTop: '9px'
     },
     m10: {
         margin: '10px'
     },
     m20: {
         marginTop: '20px'
     },
     m5: {
         margin: '5px'
     },
     mt10: {
         marginTop: '10px'
     },
     mt5: {
         marginTop: '5px'
     },
     mb10: {
         marginBottom: '10px'
     },
     mb5: {
         marginBottom: '5px'
     },
     rowHead:{
        backgroundColor:'#8c1442',
        fontColor:'#ffffff',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
    },
    cellHead:{
        textAlign:'center',fontColor:'#ffffff',fontSize:'18px',border:'2px solid #ffffff',
        fontFamily:'Roboto, Arial, Helvetica, sans-serif'
    },
     cellTitle:{
        fontColor:'#420045',backgroundColor:'#f0c8a0',
        fontFamily:'Roboto, Arial, Helvetica, sans-serif',
        border:'2px solid #ffffff'
    },
    cellTitleACSM:{
        fontColor:'#420045',backgroundColor:'#f0c8a0',
        fontFamily:'Roboto, Arial, Helvetica, sans-serif',
        border:'2px solid #ffffff',fontSize:'14px'
    },
    cellChild:{
        fontFamily:'Roboto, Arial, Helvetica, sans-serif',
        fontColor:'#420045',backgroundColor:'#fae6be',
        border:'2px solid #ffffff'
    },
    tableACSM:{overflow: 'auto', maxHeight: '400px',marginTop:'10px',marginBottom:'10px', display : 'inlineTable', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'},
    tableHead1ACSM:{position: 'sticky',fontSize:'16px',fontFamily:'Roboto, Arial, Helvetica, sans-serif',color:'#420045'},
    tableHead2ACSM:{fontFamily:'Roboto, Arial, Helvetica, sans-serif',fontSize:'18px',position: 'sticky',border:'2px solid #ffffff',color:'#ffffff'
},
    tableRowHeadACSM:{textAlign:'center',fontSize:'18px',border:'2px solid #ffffff',
    fontFamily:'Roboto, Arial, Helvetica, sans-serif',color:'rgb(140, 20, 66)' },

    tableRowHead2ACSM:{textAlign:'center',fontSize:'16px',border:'2px solid #ffffff', fontFamily:'Roboto, Arial, Helvetica, sans-serif',color:'#ffffff' },
    cellChildACSM:{
        fontFamily:'Roboto, Arial, Helvetica, sans-serif',
        fontColor:'#420045',backgroundColor:'#fae6be',
        border:'2px solid #ffffff',fontSize:'14px'
    },
     /*==========================  button class ========================================*/
     btn: {
         root: {
             backgroundColor: '#febf42',
             color: '#420045',
             display: 'inline-flex',
             alignItems: 'center',
             '&:hover': {
                 backgroundColor: '#420045',
                 color: '#ffffff',
                 //color:'#b4b4bb',
                 boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db'
             },
             '&:disabled': {
                 backgroundColor: '#e1e1e3',
                 color: '#ffffff'
             },
             '&:focus': {
                 outline: 'none'
             },
         },
     },

     crudBtn: {
         root: {
             backgroundColor: '#fb6647',
             color: '#ffffff',
             '&:hover': {
                 backgroundColor: '#420045',
                 boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
             },
             '&:focus': {
                 outline: 'none'
             },
             '&:disabled': {
                 backgroundColor: '#e1e1e3',
                 color: '#ffffff'
             },
         },
     },

     crudBtnNetwell: {
        root: {
            backgroundColor: '#fb6647',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#420045',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
            },
            '&:focus': {
                outline: 'none'
            },
            '&:disabled': {
                backgroundColor: '#e1e1e3',
                color: '#ffffff'
            },
        },
    },
    viewNetwellBtn : {
        root: {
            backgroundColor: '#4782c4',
            color: '#ffffff',
            display: 'inline-flex',
            alignItems: 'center',
            fontFamily : 'Roboto, Arial, Helvetica, sans-serif',
            '&:hover': {
                backgroundColor: '#420045',
                color: '#ffffff',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db'
            },
            '&:disabled': {
                backgroundColor: '#e1e1e3',
                color: '#ffffff'
            },
            '&:focus':{
                outline:'none'
            },
        },
    },

     delBtn: {
         root: {
             backgroundColor: '#f44336',
             color: '#ffffff',
             '&:hover': {
                 // backgroundColor: '#F6675E',
                 backgroundColor: '#420045',
                 boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
             },
             '&:focus': {
                 outline: 'none'
             },
             '&:disabled': {
                 backgroundColor: '#e1e1e3',
                 color: '#ffffff'
             },
         },
     },

     doneBtn: {
         root: {
             width: '120px',
             height: '40px',
            //  marginTop: '53px',
            borderRadius:'50px',
             paddingTop: '8px',
             backgroundColor: '#fb6647',
             color: '#ffffff',
             '&:hover': {
                 backgroundColor: '#420045',
                 boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
             },
             '&:focus': {
                 outline: 'none'
             },
             '&:disabled': {
                 backgroundColor: '#e1e1e3',
                 color: '#ffffff'
             },
         },
     },
     doneBtnNetwell: {
        root: {
            width: '120px',
            height: '40px',
           //  marginTop: '53px',
           borderRadius:'50px',
            paddingTop: '8px',
            backgroundColor: '#4782c4',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#4782c4',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
            },
            '&:focus': {
                outline: 'none'
            },
            '&:disabled': {
                backgroundColor: '#e1e1e3',
                color: '#ffffff'
            },
        },
    },
     popUpDoneBtn: {
         root: {
             backgroundColor: '#ffffff',
             color: '#420045',
             width: '90px',
             height: '30px',
             fontSize: '14px',
             fontWeight: '500',
             fontStretch: 'normal',
             fontStyle: 'normal',
             lineHeight: 'normal',
             letterSpacing: '0.75px',
             borderRdius: '4px',
             '&:hover': {
                 backgroundColor: '#f4f4f4',
                 boxShadow: '0 4px 8px 0 #cdaccf, 0 2px 4px 0 #cdaccf'
             },
             '&:disabled': {
                 backgroundColor: '#f0f0f1',
                 color: '#b4b4bb'
             },
             '&:focus': {
                 outline: 'none'
             },
         },
     },

     proceedBtn: {
         root: {
             backgroundColor: '#fb6647',
             color: '#ffffff',
             '&:hover': {
                 backgroundColor: '#420045',
                 boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
             },
             '&:focus': {
                 outline: 'none'
             },
             '&:disabled': {
                 backgroundColor: '#e1e1e3',
                 color: '#ffffff'
             },
         },
     },

     viewBtn: {
         root: {
             backgroundColor: '#febf42',
             color: '#420045',
             display: 'inline-flex',
             alignItems: 'center',
             marginBottom:'2vh',
             '&:hover': {
                 backgroundColor: '#420045',
                 color: '#ffffff',
                 boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db'
             },
             '&:disabled': {
                 backgroundColor: '#e1e1e3',
                 color: '#ffffff'
             },
             '&:focus': {
                 outline: 'none'
             },
         },
     },
     viewBtn2: {
         root: {
             backgroundColor: '#58bae8',
             color: '#420045',
             display: 'inline-flex',
             alignItems: 'center',
             '&:hover': {
                 backgroundColor: '#420045',
                 color: '#ffffff',
                 boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db'
             },
             '&:disabled': {
                 backgroundColor: '#e1e1e3',
                 color: '#ffffff'
             },
             '&:focus': {
                 outline: 'none'
             },
         },

     },
     /*==========================  button class ========================================*/

     /*==========================  radio button ========================================*/
     radioBtn: {
         root: {
             color: '#420045',
             '&$checked': {
                 color: '#420045',
             },
         },
         checked: {},
     },
     /*==========================  radio button ========================================*/

     //----class for setupfamily--------

     setupfamilyFname: {
         float: 'left',
         display: 'flex',
         width: '100%',
         marginTop: '15px'
     },
     setupfamilyfnameAfter: {
         display: 'inline-block',
         width: '21%',
         marginRight: '2.5%',
         borderColor: '#420045'
     },
     setupfamilyLname: {
         display: 'inline-block',
         width: '21%',
         marginRight: '2.5%'
     },
     setupfamilyGender: {
         display: 'inline-block',
         width: '12.4%',
         marginRight: '2.5%'
     },
     setupfamilyAge: {
         display: 'inline-block',
         width: '15.2%',
         marginRight: '2.5%',
         fontSize: '14px',
         height: '56px',
         backgroundColor: '#f8f8f8',

     },

     setupfamilyUrDetails: {
         float: 'left',
         display: 'flex',
         width: '100%'
     },
     setupfamilyUrdetailsAge: {
         display: 'inline-block',
         width: '8.2%',
         marginRight: '8.7%'
     },
     setupfamilyUrHeading: {
         display: 'inline-block',
         width: '100%'
     },
     setupfamilyDurationbody: {
         /*float: 'left',*/
         width: '100%',
         maxHeight: '220px',
         overflowX: 'hidden',
         overflowY: 'auto',
         paddingBottom: '5px'
     },
     setupfamilyDurationBodyBefore: {
         float: 'left',
         display: 'flex',
         width: '100%',
         marginBottom: '20px',
         marginTop: "5px"
     },

     // =========================================EnrollFamily================================================
     EnrollNew1: {
         display: 'flex',
         width: '100%',
         // marginBottom: '20px'
     },
     enrollFamilyDisplay: {
         display: 'flex',
         height: '36px',
         marginBottom: '10px',

     },
     EnrollNew1Display: {
         display: 'flex',
         //marginLeft:'24px'
     },
     enrollFamilySpan: {
         marginBottom: '10px',
         display: 'flex'
     },
     enrollFamilyNotification: {
         fontSize: '15px',
         lineHeight: '16px',
         paddingTop: '3px',
         border: '1px solid black'
     },
     enrollFamilyEnrollStyle: {
         fontSize: '14px',
         lineHeight: '16px',
         fontWeight: 'bold'
     },
     EnrollNew1Zip: {
         width: '224px',
         marginRight: '24px',
         marginTop: '24px'
     },
     EnrollNew1City: {
         width: '224px',
         marginTop: '24px'
     },
     EnrollNew1State: {
         display: 'flex',
         /*marginRight: '24px',*/
         marginTop: '24px',
         /*marginLeft:'24px'*/
     },
     EnrollNew1Country: {
         width: '224px',
         //marginTop: '24px',
         marginLeft: '24px'
     },
     EnrollNew1Instruction: {
         fontSize: '14px',
         lineHeight: '16px',
         width: '300px'
     },


     //-----------EnrollNew2-----------------
     EnrollNew2Date: {
         width: '37%',
         height: '56px',
         borderRadius: '4px',
         marginRight: '24px',
         fontSize: '14px',
         backgroundColor: '#f8f8f8',
         //paddingTop : '8px'
     },
     EnrollNew2Gender: {
         width: '224px',
         height: '62px',
         marginLeft: '24px'
     },
     EnrollNew2Email: {
         width: '410px',
         height: '62px',
         marginTop: '25px'
     },
     EnrollNew2Height: {
         //width: '137px',
         width: '157px',
         marginTop: '20px'
     },
     EnrollNew2Height1: {
         //width: '137px',
         width: '580px',
         marginTop: '20px',
         fontWeight: '400'
     },
     EnrollNew2Span: {
         color: '#656262',
         fontSize: '12px'
     },
     EnrollNew2HeightInch: {
         width: '157px',
         marginRight: '24px',
         marginTop: '20px'
     },
     EnrollNew2Inch: {
         width: '137px',
         marginRight: '24px',
         marginLeft: '24px',
         marginTop: '20px'
     },
     EnrollNew2Weight: {
         width: '224px',
         marginTop: '20px',
         marginLeft: '24px'
     },
     EnrollNew2Description: {
         fontSize: '14px',
         lineHeight: '16px',
         width: '300px',
         textAlign: 'justify',
         fontWeight: '400'

     },
     //-----------EnrollNew4-------------
     EnrollNew4SubtitleAfter1: {
         width: '100%',
         display: 'inline-flex'
     },
     EnrollNew4SubtitleAfter2: {
         width: '50%',
         display: 'flex',
         marginTop: '15px',
         fontWeight: '400'
     },
     EnrollNew4TitleBefore: {
         width: '72%',
         paddingTop: '13px'
     },
     EnrollNew4No1: {
         width: '60%',
         height: '56px'
     },
     EnrollNew4BeforeGender: {
         width: '100%',
         display: 'inline-flex',
         paddingTop: '20px'
     },
     EnrollNew4Disply: {
         display: 'block'
     },

     // =============EnrollNew3=================

     enrollNew3DivStyle: {
         width: '300px',
         marginRight: '24px',
         padding: '1px'
     },
     enrollNew3DivvStyle: {
         width: '224px',
         marginRight: '24px',
         padding: '1px'
     },
     enrollNew3Display: {
         display: 'block',
     },
     enrollNew3Style: {
         width: '300px',
         marginRight: '24px',
         padding: '1px',
         marginTop: '20px'
     },
     enrollNew3DivnewStyle: {
         width: '224px',
         marginRight: '24px',
         marginTop: '20px'
     },
     enrollNew3Description: {
         fontSize: '14px',
         lineHeight: '16px',
         width: '300px',
         fontWeight: '400',
         textAlign: 'justify'
     },
     // =============EnrollNew5=================

     enrollNew5DisplayStyle: {
         width: '100%',
         fontWeight: '400',
         display: 'flex'
     },
     enrollNew5NewDisplayStyle: {
         width: '68%',
         paddingLeft: '35px'

     },
     enrollNew5pCarePhy: {
         width: '48%',
         marginRight: '24px',
         paddingBottom: '10px'
     },
     enrollNew5phone: {
         width: '48%',
         //marginRight: '24px',
         marginTop: '24px',
         paddingBottom: '10px',
         height: '56px',
         backgroundColor: '#ffffff',
         marginBottom: '15px'
     },
     enrollNew5radioDiv: {
         width: '100%',
         display: 'flex',
         marginTop: '15px',
         fontWeight: '400'
     },
     enrollNew5SelectDiv: {
         width: '70%',
         paddingLeft: '35px'
     },
     enrollNew5SelectDiv1: {
         width: '70%',
         //  paddingLeft: '45px'
     },
     enrollNew5SelectMul: {
         width: '50%',
         marginBottom: '5px',
         fontSize: '14px',
         lineHeight: '16px'
     },
     enrollNew5FormCntrl: {
         height: '140px',
         width: '55%'
     },
     enrollNew5selectStyle: {
         backgroundColor: '#ffffff',
         padding: '10px',
         fontSize: '14px',
         lineHeight: '16px',
     },


     //-----------EnrollNew2-----------------
     EnrollNew2DateInputProps: {
         paddingLeft: '12px',
         paddingRight: '12',
         paddingTop: '10',
         color: '#787885',
         '&:hover': {
             color: '#420045',
         },
         EnrollNew2Gender: {
             width: '224px',
             height: '62px'
         },
         EnrollNew2Height: {
             width: '137px',
             marginTop: '20px'
         },
         EnrollNew2Span: {
             color: '#656262',
             fontSize: '12px'
         },
         EnrollNew2HeightInch: {
             width: '137px',
             marginRight: '24px',
             marginTop: '20px'
         },
         EnrollNew2Weight: {
             width: '224px',
             marginTop: '20px'
         },
         EnrollNew2Description: {
             fontSize: '14px',
             lineHeight: '16px',
             width: '300px'
         }
     },

     chkEligiScreen: { // progress bar
         colorPrimary: {
             backgroundColor: '#f2f2f2',
             width: '100%',
             marginTop: '24px',
             height: '10px',
             marginBottom: '34px'
         },
         barColorPrimary: {
             backgroundColor: '#420045',
         },
         root: {
             backgroundColor: '#ffffff',
             '&:hover': {
                 backgroundColor: '#f4f4f4',
                 color: '#420045'
             }
         },

         multi: {
             color: '#420045',
             '&:focused': {
                 color: '#420045'
             }
         },

         multi1: {
             paddingLeft: '12px',
             paddingRight: '12px',
             fontSize: '16px',
         },

         selectMenu: {
             backgroundColor: '#ffffff',
             '&:hover': {
                 backgroundColor: '#f4f4f4',
                 color: '#420045'
             },
             "&:focus": {
                 backgroundColor: "#ffffff",
                 color: '#420045'
             }
         }
     },

     enrollScreen: { // progress bar on enroll screen
         root: {
             width: '100%',
             overflowX: 'auto',
         },
         table: {
             minWidth: 650,
         },
         colorPrimary: {
             backgroundColor: '#f2f2f2',
             // width: '300px',
             height: '10px'
         },
         barColorPrimary: {
             backgroundColor: '#420045',
             borderRadius: 0,
             width: '100%'
         },
         barColorPrimaryComplete: {
             backgroundColor: '#27ae60',
             borderRadius: 0,
             width: '100%'
         },
         progresscolorPrimary: {
             backgroundColor: '#f2f2f2',
             width: '100%',
             marginTop: '24px',
             height: '10px',
             marginBottom: '34px'
         },
         progressbarColorPrimary: {
             backgroundColor: '#420045',
         },
         progressbarColorPrimaryNew: {
             backgroundColor: '#fec465',
         },
         button: {
             width: '90px',
             height: '30px',
             fontWeight: '400'
         }
     },

     phone_number_input: { // input for phone number
         root: {
             '& .MuiFilledInput-root': {
                 backgroundColor: '#f8f8f8',
                 color: '#19191d',
                 fontSize: '16px',
                 lineHeight: '24px',
                 height: '56px',
                 borderColor: '#420045',
                 '&:hover': {
                     backgroundColor: '#f4f4f4',
                     color: '#420045'
                 },

                 '&.MuiFilledInput-underline:after': {
                     borderBottom: '2px solid #420045'
                 },
                 '&.MuiFilledInput-underline.Mui-error:after': {
                     borderBottomColor: '#f44336'
                 }

             },

             '& .Mui-focused': {
                 color: '#420045'
             },
             '& label.Mui-focused': {
                 color: '#420045',

             },

             '& p.MuiFormHelperText-contained': {
                 margin: 0,
                 fontSize: "12px",
                 marginTop: '6px'
             }

         },
     },

     planText: { width: '70%', fontSize: '14px', lineHeight: '24px', letterSpacing: '0.44px' },
     planPrice: {
         width: '30%',
         fontSize: '16px',
         lineHeight: '24px',
         letterSpacing: '0.44px',
         fontWeight: 'bold',
         color: '#19191d'
     },
     planBox: {
         display: 'flex',
         width: '100%',
         height: '40px',
         borderBottom: '1px solid #e1e1e3',
         paddingTop: '12px'
     },

     headingTxt: {
         fontSize: '14px',
         fontWeight: 'bold',
         fontStretch: 'normal',
         fontStyle: 'normal',
         lineHeight: '1.14',
         letterSpacing: 'normal',
         color: 'rgba(0, 0, 0, 0.87)'
     },
     container: {
         position: 'fixed',
         top: '0',
         width: '100%',
         zIndex: '2'
     },
     header: {
         backgroundColor: '#ffffff',
         height: '75px',
         width: '100%'
     },
     subContainer: {
         height: '46px',
         width: '100%',
         backgroundColor: '#33afb0',
         color: '#ffffff'
     },
     UniverseHealthLogo: {
         width: '150px',
         height: '50px',
         marginBottom: '13.3px',
         marginTop: '12px',
         marginLeft: '12px'
     },

     associationLogo: {
         width: '150px',
         padding: '13px',
         objectFit: 'contain',
         float: 'right',
         marginBottom: '13px',
         marginTop: '12px',
         marginRight: '14px',
         textAlign: 'center',
         color: '#4f4f4f',
         backgroundColor: '#eeeeee',
         fontSize: '14px'
     },

     ButtonBG: {
         width: '90px',
         height: '30px',
         borderRadius: '4px',
         border: 'solid 1px #cdaccf',
         backgroundColor: '#ffffff'
     },

     memberName: {
         paddingTop: '12.7px',
         paddingBottom: '10.6px',
         float: 'left',
         height: '24px',
         width: '144px',
         fontSize: '16px',
         lineHeight: '24px',
         marginLeft: '26px'
     },

     logoutBtn: {
         paddingTop: '19px',
         paddingBottom: '16.6px',
         float: 'right',
         height: '11px',
         width: '56px',
         fontSize: '16px',
         lineHeight: '11px',
         marginRight: '20px',
         cursor: 'pointer',
         fontWeight: 'bold'
     },

     /*------------------------------------------- Enrollment ------------------------------------*/
     block: {
         'borderRadius': '25px',
         'border': '2px solid #19191d',
         'textAlign': 'center',
         'marginRight': '15px',
         'verticalAlign': 'middle',
         'cursor': 'pointer',
         'height': '120px',
         'width': '100%'
     },
     optOut: {
         'backgroundColor': '#8c827a',
         'width': '100%',
         'position': 'fixed',
         'bottom': '0',
         'color': 'white',
         zIndex: '2',
         padding: '10px'
     },
     caption: {
         width: '90px',
         height: '30px',
         fontSize: '14px',
         fontWeight: '500',
         fontStretch: 'normal',
         fontStyle: 'normal',
         lineHeight: 'normal',
         letterSpacing: '0.75px',
         borderRdius: '4px',
         marginLeft: '25px'
     },
     mainArea: {
         height: '100%',

         backgroundColor: '#ffffff',
         padding: '1%'
     },

     welcomeMessage: {
         width: '302px',
         height: '50px',
         fontWeight: 'bold',
         //fontSize: '32px',
         lineHeight: '40px',
         //color: '#f6356a',
         fontFamily: 'Candara, Calibri, Optima, Arial, sans-serif',
         fontSize: '24px',
         color: '#f6356a',

     },
     modalSubmitBtn: {
         width: '92px',
         height: '36px',
         fontSize: '14px',
         fontWeight: '500',
         fontStretch: 'normal',
         fontStyle: 'normal',
         lineHeight: 'normal',
         letterSpacing: '0.75px',
         borderRdius: '4px'
     },
     modalCancelBtn: {
         width: '92px',
         height: '36px',
         fontSize: '14px',
         fontWeight: '500',
         fontStretch: 'normal',
         fontStyle: 'normal',
         lineHeight: '24px',
         letterSpacing: '0.15px',
         borderRdius: '4px',
         marginRight: '10px'
     },
     startBtn: {
         width: '100px',
         height: '40px',
     },
     copyRightText: {
         color: '#304d63',
         marginTop: '10px',
         marginBottom: '74px',
         fontSize: '12px',
         lineHeight: '16px',
         textAlign: 'center'
     },

     financePopup: {
         textAlign: 'justify',
         height: '325px',
         overflowX: 'hidden',
         overflowY: 'auto'
     },

     defaultStyle: {
         completed: {
             color: "#eb5757 !important"
         },
         active: {
             color: "#febf42 !important"
         },
         paper1: {
             padding: '10px',
             width: '28vw',
             margin: '20px',

         },
         popover: {
             pointerEvents: 'none',
         },

         paper: {
             width: '58%',
             height: '50',
             position: 'absolute',
             //backgroundColor: theme.palette.background.paper,
             borderRadius: '4px',
             border: 'none',
             padding: '28px 27px 9px 23px',
         },
         formControl: {
             width: '223px',
             height: '56px',
             marginRight: '21px'
         },
         colorPrimary: {
             backgroundColor: '#f2f2f2',
             width: '100%',
             marginTop: '24px',
             height: '10px',
             marginBottom: '34px'
         },
         barColorPrimary: {
             backgroundColor: '#533278',
         },

         MuiPaperRoot: {
             backgroundColor: '#f6f5ec'
         }
     },

     modal_header: {
         backgroundColor: '#33afb0'
     },

     tabs: {
         root: {
             borderBottom: '1px solid #999999'
         },
         indicator: {
             color: '#533278',
             backgroundColor: '#533278',
         },
     },

     tab: {
         root: {
             textTransform: 'none',
             width: '180px',
             fontSize: '14px',
             fontWeight: 500,
             letterSpacing: '0.75px',
             borderBottom: '1px solid #999999',
             backgroundColor: '#ffffff',
             borderRadius: '4px',
             '&:hover': {
                 backgroundColor: 'rgba(205, 172, 207, 0.5)',
                 color: '#533278'
             },
             '&$selected': {
                 color: '#533278',
                 backgroundColor: '#cccccc'
             },
             '&:focus': {
                 color: '#533278',
                 outline: 'none'
             },
         },
         selected: {},
     },

     preferredCheckbox: {
         float: 'right',
         borderBottom: '1px solid gray',
         marginTop: '6px'
     },

     checkBoxStyle: {
         width: '100%',
         backgroundColor: '#f8f8f8',
         overflowY: 'auto',
         overflowX: 'hidden',
         height: '125px',
         padding: '6px'
     },

     phoneDiv: {
         width: '224px',
         marginTop: '24px',
         height: '56px',
         backgroundColor: '#f8f8f8'
     },
     //==================================QuickQuote1=========================================

     QuickQt1TopWrp: {
         padding: '25px',
         display: 'flex',
         flexDirection: 'column'
     },
     QuickQtTopRightText1: {
         width: "302px",
         height: "40px",
         fontFamily: "Roboto",
         fontWeight: "bold",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.67",
         letterSpacing: "0.15px",
         color: "#f6356a",
         fontSize: "24px",
     },
     QuickQtTopRightText2: {
         fontFamily: "Roboto",
         fontWeight: "normal",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.07",
         letterSpacing: "normal",
         color: "rgba(0, 0, 0, 0.87)",
         fontSize: "15px",
         wordSpacing: '1px'
     },
     QuickQtTopRightText21: {
         fontFamily: "Roboto",
         fontWeight: "normal",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.07",
         letterSpacing: "normal",
         color: "rgba(0, 0, 0, 0.87)",
         fontSize: "15px",
         wordSpacing: '-1px'
     },
     QuickQtZipWrp: {
         width: '23%',
         display: 'flex',
         flexDirection: 'column',

     },
     QuickQtZipWrp11: {
         width: '98%',
         display: 'flex',
         flexDirection: 'column',
         marginLeft: '3px',
         // marginTop:'-98px',
         // justifyContent: 'flex-end',
         position: 'absolute'
     },
     QuickQtZipTitle: {
         fontFamily: "Roboto",
         fontWeight: "bold",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.14",
         letterSpacing: "normal",
         color: "rgba(0, 0, 0, 0.87)",
         fontSize: "14px",
         marginBottom: '10px'
     },
     QuickQtDtlsWrp: {
         width: '100%',
         display: 'flex',
         flexDirection: 'row',
     },
     QuickQtgenderWrp: {
         width: '55%',
         WebkitHeight: '90px'
     },
     QuickQtAgeWrp: {
         width: '35%',
         marginLeft: '10%'
     },
     QuickQtAgeWrp1: {
         width: '35%',
         marginLeft: '10%'
     },
     QuickQtChildWrp: { paddingLeft: '25px', display: 'flex', flexDirection: 'row', marginTop: '25px' },
     QuickQtChildWrp1: { paddingLeft: '25px', display: 'flex', flexDirection: 'coumn', marginTop: '25px' },

     QuickQtChildWrp11: {
         paddingLeft: '25px',
         position: 'absolute',
         display: 'flex',
         flexDirection: 'row'
     },

     QuickAddBtn: {
         width: '56px',
         height: '56px',
         marginTop: '25px'
     },
     QuickAddBtn1: {
         width: '56px',
         height: '56px',
         marginTop: '23px',
         marginLeft: '-3.9%'
     },
     QuickChatBtn: {
         width: '56px',
         height: '56px',
     },
     QuickQtDepedentTxt: {
         width: '20px',
         fontFamily: "Roboto",
         fontWeight: "bold",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.14",
         letterSpacing: "normal",
         color: "rgba(0, 0, 0, 0.87)",
         fontSize: "14px",
         marginTop: '33px',
         marginLeft: '10px'
     },
     QuickQtDepedentTxt22: {
         width: '20px',
         fontFamily: "Roboto",
         fontWeight: "bold",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.14",
         letterSpacing: "normal",
         color: "rgba(0, 0, 0, 0.87)",
         fontSize: "14px",
         marginTop: '63px',
         marginLeft: '10px'
     },
     QuickQtDepedentTxt1: {
         width: '20px',
         fontFamily: "Roboto",
         fontWeight: "bold",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.14",
         letterSpacing: "normal",
         color: "rgba(0, 0, 0, 0.87)",
         fontSize: "14px",
         marginTop: '-33px',
         marginLeft: '129px'
     },
     QuickQtDoneWrp: {
         display: 'flex',
         justifyContent: 'flex-start',
         alignItems: 'center',
         flexDirection: 'row'
     },
     QuickQtChatWrp: {
         display: 'flex',
         justifyContent: 'flex-end',
         alignItems: 'center'
     },
     QuickQtHelpWrp: {
         display: 'flex',
         justifyContent: 'flex-end',
     },
     QuickQtHelpTxt1: {
         fontFamily: "Roboto",
         fontWeight: "bold",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.14",
         letterSpacing: "normal",
         //color: "#420045",
         color: '#304d63',
         fontSize: "14px",
     },
     QuickQtHelpTxt2: {
         fontFamily: "Roboto",
         fontWeight: "normal",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.14",
         letterSpacing: "normal",
         // color: "#420045",
         color: '#304d63',
         fontSize: "14px",
     },
     text: {
         width: '100%'
     },

     //==============================QuickQuote2===========================================
     QuickQt2EnrollTxtWrp: {
         display: 'flex',
         flexDirection: 'row',
         paddingLeft: '25px',
         paddingRight: '25px',
         marginTop: '15px'
     },
     txt: {
         textAlign: 'justify'
     },

     QuickQt2EnrollText: {
         fontFamily: "Roboto",
         fontWeight: "normal",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.33",
         letterSpacing: "normal",
         color: "rgba(0, 0, 0, 0.87)",
         fontSize: "15px",
     },
     QuickQt2EnrollText1: {
         fontFamily: "Roboto",
         fontWeight: "bold",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.33",
         letterSpacing: "normal",
         color: "rgba(0, 0, 0, 0.87)",
         fontSize: "15px",
         paddingTop: '20px'
     },
     QuickQt2FeesWrp: {
         display: 'flex',
         flexDirection: 'column'
     },
     QuickQt2FeesChild1Wrp: {
         width: '68%',
         marginLeft: '90px',
         marginBottom: '7px'
     },
     QuickQt2FeesChild1Wrp1: {
         width: '68%',
         borderBottom: '1px solid #e1e1e3',
         marginLeft: '90px',
         paddingTop: '3px',
         paddingBottom: '7px',
     },
     QuickQt2FeesTxt: {
         fontFamily: "Roboto",
         fontWeight: "bold",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.14",
         letterSpacing: "normal",
         color: "rgba(0, 0, 0, 0.87)",
         fontSize: "14px",
     },
     QuickQt2FeesTxt1: {
         fontFamily: "Roboto",
         fontWeight: "normal",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.71",
         letterSpacing: "0.44px",
         color: "#19191d",
         fontSize: "14px",
     },
     QuickQt2FeesTxt2: {
         fontFamily: "Roboto",
         fontWeight: "bold",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.71",
         letterSpacing: "0.44px",
         color: "#19191d",
         fontSize: "14px",
         float: 'right'
     },

     ComponentContainer: {
         /* marginLeft:'21px',
          marginRight:'21px',
          paddingTop : '40px',*/
         marginLeft: '21px',
         marginRight: '21px',
         paddingTop: '45px',
         paddingBottom: '25px',
         backgroundColor: '#ffffff',
     },

     HeaderWrp: {
         width: '98%',
         display: 'flex',
         flexDirection: 'row',
         marginLeft: '12px',
         //marginTop:'12px',
         //paddingBottom:'12px'

     },
     HeaderRightWrp: {
         display: 'flex',
         justifyContent: 'flex-start',
         alignItems: 'center'
     },
     HeaderLeftWrp: {
         display: 'flex',
         justifyContent: 'flex-end',
         alignItems: 'center'
     },
     HeaderRightLogo: {
         width: "150px",
         height: "50px",
     },
     HeaderLeftLogo: {
         width: "75px",
         height: "50px",
         marginRight: '8px'
     },
     HeaderLeftText: {
         //width: "150px",
         height: "50px",
         fontFamily: "Roboto",
         fontWeight: "normal",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "2.86",
         letterSpacing: "0.15px",
         color: "#4f4f4f",
         // backgroundColor: "#eeeeee",
         fontSize: "14px",
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center'
     },
     LoginWrp: {
         width: '100%',
         height: '47.3px',
         display: 'flex',
         flexDirection: 'row',
         backgroundColor: "#33afb0",
         boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12)',
     },
     LoginRight: {
         width: "200px",
         height: "24px",
         fontFamily: "Roboto",
         fontWeight: "bold",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.5",
         letterSpacing: "0.15px",
         color: "#ffffff",
         fontSize: "16px",
         display: 'flex',
     },
     LoginLeft: {
         width: "80px",
         height: "24px",
         fontFamily: "Roboto",
         fontWeight: "bold",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.5",
         letterSpacing: "0.15px",
         color: "#ffffff",
         fontSize: "16px",
         display: 'flex',
         justifyContent: 'flex-end',
         cursor: 'pointer'
     },
     bottomCopyTxtWrp: {
         width: '100%',
         display: 'flex',
         justifyContent: 'center',
         marginTop: '15px',
     },
     bottomCopyText: {
         width: "357px",
         height: "16px",
         fontFamily: "Roboto",
         fontWeight: "normal",
         fontStretch: "normal",
         fontStyle: "normal",
         lineHeight: "1.33",
         letterSpacing: "normal",
         color: "#333333",
         fontSize: "12px",
         display: 'flex',
         justifyContent: 'center'
     },

     bmiName: {
         textAlign: 'center',
         padding: '40px',
         fontFamily: "Roboto",
         fontWeight: "bold",
     },
   

 }




