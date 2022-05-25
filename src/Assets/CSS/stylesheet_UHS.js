/* import color from "@material-ui/core/colors/amber" */

/**
 * Created by shree on 3/17/2020.
 */
export default
{
    /*textField: {  //for text input
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
                    color: '#420045',
                    borderBottom: '1px solid #533278'
                },

                '&.MuiFilledInput-underline:after':{
                    borderBottom: '2px solid #420045'
                },
                '&.MuiFilledInput-underline.Mui-error:after':{
                    borderBottomColor: '#f44336'
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
                overflow: 'hidden'
            },

            '& label.Mui-focused': {
                color: '#420045',
                wordBreak: 'normal',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: 'auto',
                overflow: 'hidden'
            },

            '& p.MuiFormHelperText-contained' : {
                margin : 0,
                fontSize: "12px",
                marginTop : '6px'
            }
        }
    },*/

    textField:{
        root: {        

            '& .MuiFilledInput-root': {
                backgroundColor: '#f8f8f8',
                color: '#19191d',
                fontSize: '16px',
                lineHeight: '24px',
                height: '58px',
                WebkitHeight:'90px',
                borderColor: '#533278',
                '&:hover': {
                    backgroundColor: '#f4f4f4',
                    color: '#533278'
                },

               /* '&.MuiFilledInput-underline:after':{
                    borderBottom: '2px solid #533278'
                },
                '&.MuiFilledInput-underline.Mui-error:after':{
                    borderBottomColor: '#f44336'
                },*/

                "&:hover:not($disabled):not($focused):not($error):before": {
                    // hover
                    borderBottom: '2px solid #533278'
                },
                '&.MuiFilledInput-underline:after':{
                    borderBottom: '2px solid #533278'
                },
                '&.MuiFilledInput-underline.Mui-error:after':{
                    //borderBottomColor: '#f44336'
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
                fontSize:'15px',
                overflow: 'hidden',
                paddingBottom:'11px',
                paddingRight:'20px'
                // flexWrap: "wrap",
                // justifyContent: 'space-between'
            },

            '& label.Mui-focused': {
                color: '#533278',
                wordBreak: 'normal',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                width: 'auto',
                overflow: 'hidden'
            },

            '& p.MuiFormHelperText-contained' : {
                margin : 0,
                fontSize: "12px",
                marginTop : '6px'
            }
        }
    },


    phonetextField:{ //for text input- Phone Number
        root: {
            '& .MuiFilledInput-root':  {
                position: 'relative',
                transition: 'background-color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms',
                /* background-color: rgba(0, 0, 0, 0.09); */
                borderTopLeftRadius: '4px',
                borderTopRightRadius: '4px',
            },
            '&.MuiFilledInput-underline:after':{
                borderBottom: '2px solid #533278'
            },
            '&.MuiFilledInput-underline.Mui-error:after':{
                borderBottomColor: '#f44336'
            },
            '& .Mui-focused': {

            },
            '& label.Mui-focused': {
                color: '#420045',
            },
            '& p.MuiFormHelperText-contained' : {
                margin : 0,
                fontSize: "12px",
                marginTop : '6px'
            }
        }
    },
    multiLineTextField:{ //for text input- multiline
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

                '&.MuiFilledInput-underline:after':{
                    borderBottom: '2px solid #420045'
                },
                '&.MuiFilledInput-underline.Mui-error:after':{
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
            '& p.MuiFormHelperText-contained' : {
                margin : 0,
                fontSize: "12px",
                marginTop : '6px'
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


    tableCellNew : {  //for Table Cell
        root: {
            padding: '10px',
            width:'auto'
        },
        
        head: {
            backgroundColor: '#420045',
            color: '#ffffff',
            fontSize: '24px !important',
            // fontSize:'16px',
            fontWeight:'400px',
            fontFamily: "Roboto, Arial, Helvetica, sans-serif",
            border:'2px solid #ffffff',
            lineHeight: '22px',
            

        },
        body: {
            fontSize: '16px',
            lineHeight: '24px',
            // color: '#f30',
            fontWeight : 'bold'
        },
    },


    tableRowNew : { //for Table Row
        root: {
            backgroundColor: '#fae6be',
            height: '38px',
            padding: '10px',
            color:'#ffffff'
        },
       
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

    // =================ACSM POPUP============================
    tableACSM:{overflow: 'auto', maxHeight: '400px',marginTop:'10px',marginBottom:'10px', display : 'inlineTable', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'},
    tableHead1ACSM:{position: 'sticky',fontSize:'16px',fontFamily:'Roboto, Arial, Helvetica, sans-serif',color:'#420045'},
    tableHead2ACSM:{fontFamily:'Roboto, Arial, Helvetica, sans-serif',fontSize:'18px',position: 'sticky',border:'2px solid #ffffff'
},
    tableRowHeadACSM:{textAlign:'center',fontSize:'18px',border:'2px solid #ffffff',
    fontFamily:'Roboto, Arial, Helvetica, sans-serif',color:'rgb(140, 20, 66)' },

    tableRowHead2ACSM:{textAlign:'center',fontSize:'16px',border:'2px solid #ffffff', fontFamily:'Roboto, Arial, Helvetica, sans-serif',color:'#ffffff' },
    cellChildACSM:{
        fontFamily:'Roboto, Arial, Helvetica, sans-serif',
        fontColor:'#420045',backgroundColor:'#fae6be',
        border:'2px solid #ffffff',fontSize:'14px'
    },

    // =================ACSM POPUP============================
    cellChild1:{
        fontFamily:'Roboto, Arial, Helvetica, sans-serif',
        fontColor:'#420045',backgroundColor:'#fae6be',
        border:'2px solid #ffffff',
        fontSize:'14px'
    },

    tableCell : {  //for Table Cell
        root: {
            padding: '10px',
            width:'auto',
            fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
        },
        
        head: {
            backgroundColor: '#420045',
            color: '#ffffff',
            fontSize: '14px',
            // fontSize:'16px',
            fontWeight:'bold',
            lineHeight: '22px',
            width:'20px'
        },
        body: {
            fontSize: '16px',
            lineHeight: '24px',
            // color: '#f30',
            fontWeight : 'bold'
        },
    },
    tableCellNetwell : {  //for Table Cell
        root: {
            padding: '10px',
            width:'auto',
            fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
        },
        
        head: {
            backgroundColor: '#162242',
            color: '#ffffff',
            fontSize: '14px',
            // fontSize:'16px',
            fontWeight:'bold',
            lineHeight: '22px',
            width:'20px'
        },
        body: {
            fontSize: '16px',
            lineHeight: '24px',
            // color: '#f30',
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
    tableRowNetwell : { //for Table Row
        root: {
            // backgroundColor: '#fae6be',
            height: '38px',
            padding: '10px',
            color:'#162242',
            fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
        },
       
    },
    lastRow : {
        backgroundColor : '#febf42',
        borderBottom : '2px solid #420045',
        color:'#FFFFFF',
        body:{
            color:'#ffffff'
        }
    },
    lastRowNetwell : {
        backgroundColor : '#f2b543',
        borderBottom : '2px solid #420045',
        color:'#162242',
        body:{
            color:'#162242'
        }
    },

    cellOverflow : {
        wordBreak: 'normal',
        //  whiteSpace: 'nowrap',
         textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '281px',
        // color:'#ffffff'
    },
    cellOverflow1 : {
        wordBreak: 'normal',
        // whiteSpace: 'nowrap',
         textOverflow: 'ellipsis',
        overflow: 'hidden',
        maxWidth: '90px',
        // color:'#f30'
    },
    
    

    otherRow : {
        backgroundColor : '#e3e3e3',
        borderBottom : '2px solid #420045',
        color:'#333333'
    },

    dropDown : {
        width: '70%',
        // width: '105%',
        // width: '90%',
        // marginTop: '6%',
        marginBottom: '0',
        // marginLeft: '-19%',
        borderRadius: '4px',
        // height: '56px'
    },
    dropDown1 : {
        width: '100%',
        marginTop: '0',
        marginBottom: '0',
        marginLeft: '0',
        borderRadius: '4px',
        // height: '190px'
    },
    multiSelect:{
        backgroundColor: '#ffffff',
        padding: '10px',
        fontSize: '14px',
        lineHeight: '16px',
    },
    //============================Eligibility=======================================
    physicianTxtWrp:{
        width:'35%',
        Color:'#19191d',
        marginTop:'30px',
        fontSize:'14px'
    },

    NextButton:{ //next Button
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
            '&:focus':{
                outline:'none'
            },
        },
    },
    NextButtonNetwell:{ //next Button
        root: {
            width: '120px',
            height: '40px',
            backgroundColor: '#4782c4',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#4782c4',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
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
    areaField: {
        width: '100%',
        marginTop: '0',
        marginBottom: '0',
        marginLeft: '0',
        borderRadius: '4px'
    },

    datePicker:{
        width: '23%',
        height: '56px',
        color: '#19191d',
        borderRadius: '4px',
        padding: '8px'
    },
    datePickerr:{
        width: '35%',
        height : '60px',
        backgroundColor: '#f1f1f1',
        color: '#19191d',
        borderRadius: '4px',
        marginTop:'30px'
    },
    elginputStyle:{
        fontSize: 18,
        color: '#19191d',
        fontfamily: 'Roboto, Arial, Helvetica, sans-serif',
        backgroundColor:'#f1f1f1',
        paddingRight:'14px',
        paddingLeft:'14px',
        marginTop:'10px',
        outline:'0px'
    },
    elginputLabelStyle:{
        fontSize: 16,
        paddingLeft:16,
        paddingRight:16,
        paddingTop:4
    },
    elganswerCheck:{
        fontSize: '14px',
        lineHeight: '16px',
        marginBottom: '5px'
    },
    disqualifiedWrp:{
        width:'100%',
        maxHeight: '400px',
        // overflowX: 'hidden',
        // overflowY: 'auto' ,
        display:'flex',
        
    },
    disqfTextWrp:{
        width:'40%',
        display: "flex",
        flexDirection: "column",
        fontSize: '14px',
        lineHeight: '16px',
        textAlign:'justify',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif',
      
    },
    disqfTableWrp:{
        // width:'55%',
        fontSize: '14px',
        lineHeight: '16px',
        // marginLeft:'5%',
        // overflowX: 'hidden',
        // overflowY: 'auto' ,
        maxHeight:'400px'
    },
    // =========================================EnrollFamily================================================
    w60:{
        width:'60%'
    },
    w40:{
        width:'40%'
    },
    w28:{
        width:'28%'
    },
    w90px:{
        width: '90px'
    },
    w90:{
        width: '90%'
    },
    w35p:{
        width: '35%'
    },
    w370px:{
        width: '370px'
    },
    w375px:{
        width: '375px',

    },
    w100px:{
        width: '100px'
    },
    w55:{
        width:'55%'
    },
    w224:{
        width : '224px'
    },

    w290px:{
        width: '290px'
    },
    w380px:{
        width: '380%'
    },
    w100 : {
        width : '100%'
    },
    w49:{
        width:'49%'
    },
    w50 : {
        width : '50%'
    },
    w51:{
        width:'51%'
    },
    w30 : {
        width : '30%'
    },
    w31 : {
        width : '31%'
    },
    w69:{
        width : '69%'
    },
    w70 : {
        width : '70%'
    },
    w23 : {
        width : '23%'
    },
    planSelectionProcBtn : {
        width : '28.5%'
    },
    w10 : {
        width : '10%'
    },
    p10 : {
        padding : '10px'
    },
    p20 : {
        padding : '20px'
    },
    pB35:{
        paddingBottom:'35px',
        paddingTop:'0px',
        textAlign:'justify',
        fontWeight : 'Roboto, Arial, Helvetica, sans-serif',
        fontSize : '15px'
    },
    p5 : {
        padding : '5px'
    },
    pt9:{
        paddingTop:'9px'
    },
    m10 : {
        margin : '10px'
    },
    m20:{
        marginTop : '20px'
    },
    m5 : {
        margin : '5px'
    },
    mt10 : {
        marginTop : '10px'
    },
    mt5 : {
        marginTop : '5px'
    },
    mb10 : {
        marginBottom : '10px'
    },
    mb5 : {
        marginBottom : '5px'
    },

    /*==========================  button class ========================================*/
    btn : {
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
            '&:focus':{
                outline:'none'
            },
        },
    },
    btnNetwell : {
        root: {
            backgroundColor: '#4782c4',
            color: '#ffffff',
            display: 'inline-flex',
            alignItems: 'center',
            '&:hover': {
                backgroundColor: '#4782c4',
                color: '#ffffff',
              //color:'#b4b4bb',
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

    crudBtn : {
        root: {
            backgroundColor: '#fb6647',
            color: '#ffffff',
            fontFamily : 'Roboto, Arial, Helvetica, sans-serif',
            '&:hover': {
                backgroundColor: '#420045',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#e1e1e3',
                color: '#ffffff'
            },
        },
    },
    crudBtnNetwell : {
        root: {
            backgroundColor: '#4782c4',
            color: '#ffffff',
            fontFamily : 'Roboto, Arial, Helvetica, sans-serif',
            '&:hover': {
                backgroundColor: '#420045',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#e1e1e3',
                color: '#ffffff'
            },
        },
    },

    delBtn : {
        root: {
            backgroundColor: '#f44336',
            color: '#ffffff',
            '&:hover': {
               // backgroundColor: '#F6675E',
               backgroundColor: '#420045',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#e1e1e3',
                color: '#ffffff'
            },
        },
    },

    delBtnNetwell : {
        root: {
            backgroundColor: 'red',
            color: '#ffffff',
            '&:hover': {
               // backgroundColor: '#F6675E',
               backgroundColor: '#420045',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#e1e1e3',
                color: '#ffffff'
            },
        },
    },

    doneBtn : {
        root: {
            width: '120px',
            height: '40px',
            marginTop: '53px',
            paddingTop: '9px',
            backgroundColor: '#fb6647',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#420045',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#e1e1e3',
                color: '#ffffff'
            },
        },
    },
    doneNetwellBtn:{
        root: {
            width: '120px',
            height: '40px',
            marginTop: '53px',
            paddingTop: '9px',
            backgroundColor: '#4782c4',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#420045',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#e1e1e3',
                color: '#ffffff'
            },
        },
    },
    doneBtn1 : {
        root: {
            width: '120px',
            height: '40px',
            marginTop: '53px',
            paddingTop: '9px',
            backgroundColor: '#fb6647',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#420045',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#e1e1e3',
                color: '#ffffff'
            },
        },
    },

    popUpDoneBtn : {
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
            '&:focus':{
                outline:'none'
            },
        },
    },

    proceedBtn : {
        root: {
            backgroundColor: '#fb6647',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#420045',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#e1e1e3',
                color: '#ffffff'
            },
        },
    },
    proceedNetwellBtn : {
        root: {
            backgroundColor: '#4782c4',
            color: '#ffffff',
            '&:hover': {
                backgroundColor: '#420045',
                boxShadow: '0 4px 8px 0 #eae8db, 0 2px 4px 0 #eae8db',
            },
            '&:focus':{
                outline:'none'
            },
            '&:disabled': {
                backgroundColor: '#e1e1e3',
                color: '#ffffff'
            },
        },
    },

    viewBtn : {
        root: {
            backgroundColor: '#4782c4',
            color: '#fff',
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
    
    /*==========================  button class ========================================*/

    /*==========================  radio button ========================================*/
    radioBtn : {
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

    setupfamilyFname:{
        float:'left',
        display:'flex',
        width:'100%',
        marginTop : '15px'
    },
    setupfamilyfnameAfter:{
        display: 'inline-block',
        width: '21%',
        marginRight: '1%',
        borderColor: '#420045'
    },
    setupfamilyfnameAfterGrid:{
        display: 'inline-block',
        width: '100%',
        marginRight: '1%',
        borderColor: '#420045',
        marginBottom:'20px'
    },
    setupfamilyLname:{
        display: 'inline-block',
        width: '21%',
        marginRight: '1.2%'
    },
    setupfamilyLnameGrid:{
        display: 'inline-block',
        width: '100%',
        marginRight: '1.2%',
        marginBottom:'20px'
    },
    setupfamilyGender:{
        display: 'inline-block',
        width: '14.4%',
        marginRight: '1.1%'
    },
    setupfamilyGenderGrid:{
        display: 'inline-block',
        width: '100%',
        marginRight: '1.1%',
        marginBottom:'20px'
    },
    setupfamilyAge:{
        display: 'inline-block',
        width: '17.2%',
        marginRight: '1.5%',
        //fontSize: '14px' ,
        height: '56px',
        backgroundColor: '#f8f8f8',
        borderRadius:'4px'
    },
    setupfamilyAgeGrid:{
        display: 'inline-block',
        width: '100%',
        marginRight: '1.5%',
        //fontSize: '14px' ,
        height: '56px',
        backgroundColor: '#f8f8f8',
        borderRadius:'4px',
        marginBottom:'20px'
    },
    setupfamilyUrDetails:{
        float: 'left',
        display: 'flex',
        width: '100%'
    } ,
    setupfamilyUrdetailsAge:{
        display: 'inline-block',
        width: '8.2%',
        marginRight: '8.7%'
    },
    setupfamilyUrHeading:{
        display: 'inline-block',
        width: '100%'
    },
    setupfamilyDurationbody:{
        /*float: 'left',*/        
        // width: '100%',
        maxHeight: '220px',
        overflowX: 'hidden',
        overflowY: 'auto' ,
        paddingBottom : '5px',
        // paddingRight:'4%'
    },
    setupfamilyDurationBodyBefore:{
        float: 'left',
        display: 'flex',
        width: '100%',
        marginBottom: '20px',
        marginTop : "5px"        
    },

    // =========================================EnrollFamily================================================
    EnrollNew1:{
        display: 'flex',
        width: '100%',
        marginBottom: '20px'
    },
    enrollFamilyDisplay:{

        display: 'flex',
        height: '30px',
        marginBottom:'10px'

    },
    EnrollNew1Display:{
        display: 'flex',
        //marginLeft:'24px'
    },
    enrollFamilySpan:{
        marginBottom : '10px',
        display : 'flex'
    },
    enrollFamilyNotification:{
        fontSize: '15px',
        lineHeight: '16px',
        paddingTop:'3px'
    },
    enrollFamilyEnrollStyle:{
        fontSize: '14px',
        lineHeight: '16px',
        fontWeight: 'bold'
    },
    EnrollNew1Zip:{
        width: '224px',
        marginRight: '24px',
        marginTop: '24px'
    },
    EnrollNew1ZipPaymentModal:{
        width: '100%',
        marginRight: '24px',
        marginTop: '24px'
    },
    EnrollNew1City:{
        width: '224px',
        marginTop: '24px'
    },
    EnrollNew1CityPayModal:{
        width: '100%',
        marginTop: '24px'
    },
    EnrollNew1State:{
        display: 'flex',
        marginRight: '24px',
        marginTop: '24px',
        marginLeft:'24px',
        width: '224px',
    },
    EnrollNew1StatePayModal:{
        // display: 'flex',
        // marginRight: '24px',
        marginTop: '24px',
        // marginLeft:'24px',
        width: '100%',
    },
    EnrollNew1Country:{
        width: '224px',
        marginTop: '24px',
        // marginLeft: '24px'
    },
    EnrollNew1CountryPayModal:{
        width: '100%',
        marginTop: '24px',
        // marginLeft: '24px'
    },
    EnrollNew1Instruction:{
        fontSize: '14px',
        lineHeight: '16px',
        width: '300px'
    },


    //-----------EnrollNew2-----------------
    EnrollNew2Date:{
        width: '101%',
        height: '60px',
        borderRadius: '4px',
        marginRight: '24px',
        fontSize: '14px' ,
        backgroundColor: '#f8f8f8',
        //paddingTop : '8px'
        marginTop : "10px"
    },
    EnrollNew2DateMob:{
        width: '98%',
        height: '60px',
        borderRadius: '4px',
        marginRight: '24px',
        fontSize: '14px' ,
        backgroundColor: '#f8f8f8',
        //paddingTop : '8px'
        marginTop : "15px"
    },
    EnrollNew2Gender:{
        width: '224px' ,
        height: '62px'
    },
    EnrollNew2Height:{
        //width: '137px',
        width: '157px',
        marginTop: '20px'
    },
    EnrollNew2Span:{
        color: '#656262',
        fontSize: '12px'
    },
    EnrollNew2HeightInch:{
        width: '157px',
        marginRight: '24px',
        marginTop: '20px'
    },
    EnrollNew2Inch:{
        width: '137px',
        marginRight: '24px',
        marginLeft:'24px',
        marginTop: '20px'
    },
    EnrollNew2Weight:{
        width: '224px',
        marginTop: '20px',
        marginLeft:'24px'
    },
    EnrollNew2Description:{
        fontSize: '14px',
        lineHeight: '16px',
        width: '300px',
        textAlign:'justify'

    },
//-----------EnrollNew4-------------
    EnrollNew4SubtitleAfter1:{
        width : '100%',
        display : 'inline-flex'
    },
    EnrollNew4SubtitleAfter2:{
        width: '50%',
        display: 'flex',
        marginTop: '15px'
    },
    EnrollNew4TitleBefore:{
        width: '72%',
        paddingTop: '13px'
    },
    EnrollNew4No1:{
        width: '50%',
        height: '56px'
    },
    EnrollNew4BeforeGender:{
        width : '100%',
        display : 'inline-flex',
        paddingTop : '20px'
    },
    EnrollNew4Disply:{
        display:'block'
    },

    // =============EnrollNew3=================

    enrollNew3DivStyle:{
        width: '300px',
        marginRight: '24px',
        padding: '1px'
    },
    enrollNew3DivvStyle:{
        width: '224px',
        marginRight: '24px',
        padding: '1px'
    },
    enrollNew3Display:{
        display:'block',
    },
    enrollNew3Style:{
        width: '300px',
        marginRight: '24px',
        padding: '1px',
        marginTop: '20px'
    },
    enrollNew3DivnewStyle:{
        width: '224px',
        marginRight: '24px',
        marginTop: '20px'
    },
    enrollNew3Description:{
        fontSize: '14px',
        lineHeight: '16px',
        width: '300px',
        textAlign:'justify'
    },
    // =============EnrollNew5=================

    enrollNew5DisplayStyle:{
        width: '100%',
        display: 'flex'
    },
    enrollNew5NewDisplayStyle:{
        width: '70%',
        paddingLeft: '35px'

    },
    enrollNew5pCarePhy:{
        width: '48%',
        marginRight: '24px',
        paddingBottom : '10px'
    },
    enrollNew5phone:{
        width: '48%',
        //marginRight: '24px',
        marginTop: '24px',
        paddingBottom : '10px' ,
        height: '56px' ,
        backgroundColor:'#ffffff',
        marginBottom:'15px'
    },
    enrollNew5radioDiv:{
        width: '100%',
        display: 'flex',
        marginTop: '15px'
    },
    enrollNew5SelectDiv:{
        width: '70%',
        paddingLeft: '35px'
    },
    enrollNew5SelectDiv1:{
        width: '70%',
        //  paddingLeft: '45px'
    },
    enrollNew5SelectMul:{
        width: '50%',
        marginBottom: '5px',
        fontSize: '14px',
        lineHeight: '16px'
    },
    enrollNew5FormCntrl:{
        height: '140px',
        width: '55%'
    },
    enrollNew5selectStyle:{
        backgroundColor: '#ffffff',
        padding: '10px',
        fontSize: '14px',
        lineHeight: '16px',
    },


    //-----------EnrollNew2-----------------
    EnrollNew2DateInputProps:{
        paddingLeft:'12px',
        paddingRight:'12',
        paddingTop:'10',
        color: '#787885',
        '&:hover': {
            color: '#420045',
        },
        EnrollNew2Gender:{
            width: '224px' ,
            height: '62px'
        },
        EnrollNew2Height:{
            width: '137px',
            marginTop: '20px'
        },
        EnrollNew2Span:{
            color: '#656262',
            fontSize: '12px'
        },
        EnrollNew2HeightInch:{
            width: '137px',
            marginRight: '24px',
            marginTop: '20px'
        },
        EnrollNew2Weight:{
            width: '224px',
            marginTop: '20px'
        },
        EnrollNew2Description:{
            fontSize: '14px',
            lineHeight: '16px',
            width: '300px'
        }
    },

    chkEligiScreen : { // progress bar
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

        multi:{
            color:'#420045',
            '&:focused': {
                color: '#420045'
            }
        },

        multi1:{
            paddingLeft:'12px',
            paddingRight:'12px',
            fontSize:'16px',
        },

        selectMenu: {
            backgroundColor:'#ffffff',
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

    netWellEligiScreen : { // progress bar
        colorPrimary: {
            backgroundColor: '#f2f2f2',
            width: '100%',
            marginTop: '24px',
            height: '10px',
            marginBottom: '34px'
        },
        barColorPrimary: {
            backgroundColor: '#a9c43b',
        },
        root: {
            backgroundColor: '#ffffff',
            '&:hover': {
                backgroundColor: '#f4f4f4',
                color: '#420045'
            }
        },

        multi:{
            color:'#420045',
            '&:focused': {
                color: '#420045'
            }
        },

        multi1:{
            paddingLeft:'12px',
            paddingRight:'12px',
            fontSize:'16px',
        },

        selectMenu: {
            backgroundColor:'#ffffff',
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

    enrollScreen : { // progress bar on enroll screen
        root: {
            width: '100%',
            overflowX: 'auto',
        },
        table: {
            minWidth: 650,
        },
        colorPrimary: {
            backgroundColor: '#f2f2f2',
            width: '300px',
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
        button: {
            width: '90px',
            height: '30px'
        }
    },

    phone_number_input : { // input for phone number
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

                '&.MuiFilledInput-underline:after':{
                    borderBottom: '2px solid #420045'
                },
                '&.MuiFilledInput-underline.Mui-error:after':{
                    borderBottomColor: '#f44336'
                }

            },

            '& .Mui-focused': {
                color: '#420045'
            },
            '& label.Mui-focused': {
                color: '#420045',

            },

            '& p.MuiFormHelperText-contained' : {
                margin : 0,
                fontSize: "12px",
                marginTop : '6px'
            }

        },
    },
    CustomHeight:{
        height:'96px'
    },


// -----------------------Auto login------------------------------------------
divMain:{backgroundColor:'grey',height:'100vh'},
cardMain:{marginTop:'10%',backgroundColor:'#fff',boxShadow:'0 6px 16px rgba(0,0,0,1)',borderRadius:'0px'},
cardMedia:{backgroundColor:'#fff', textAlign : 'center', marginBottom : '20px'},
cardContent:{backgroundColor:'#EAE8DB', height:'300px',display:'flex',alignItems:'center',justifyContent:'center'},


// ----------------------------------------------------------------------------



    planText: { width: '70%', fontSize: '14px', lineHeight: '24px', letterSpacing: '0.44px' },
    planText1: { width: '102%', fontSize: '14px', lineHeight: '24px', letterSpacing: '0.44px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif' },
    planTextCheckACSM: { width: '102%', fontSize: '14px',fontWeight:'bold', lineHeight: '24px', letterSpacing: '0.44px',marginBottom:'10px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif' },
    planTextProgramSelection: { width: '102%', fontSize: '20px',fontWeight:'bold', lineHeight: '24px', letterSpacing: '0.44px',paddingTop:'4px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif' },
    planTextACSM: { width: '75%', fontSize: '13px', lineHeight: '24px', letterSpacing: '0.44px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'},
    planTextGrid: { width: '102%', fontSize: '13px', lineHeight: '24px', letterSpacing: '0.44px',fontFamily : 'Roboto, Arial, Helvetica, sans-serif' },
    planTextTotal: { width: '102%', fontSize: '13px', lineHeight: '24px', letterSpacing: '0.44px',fontWeight:'bold',fontFamily : 'Roboto, Arial, Helvetica, sans-serif' },
    planTextTotalRec: { width: '86%', fontSize: '13px', lineHeight: '24px', letterSpacing: '0.44px',fontWeight:'bold' },
    planTextTotal1: { width: '102%', fontSize: '13px', lineHeight: '24px', letterSpacing: '0.44px',fontWeight:'bold', fontFamily : 'Roboto, Arial, Helvetica, sans-serif' },
    planTextTotaltoday: { width: '98%', fontSize: '13px', lineHeight: '24px', letterSpacing: '0.44px',fontWeight:'bold' },
    planPrice: {
        width: '29%',
        // width: '18%',
        float:'right',
        fontSize: '13px',
        lineHeight: '24px',
        letterSpacing: '0.44px',
        fontWeight: 'bold',
        color: '#19191d',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
    },
    
    planPriceToday: {
        // width: '29%',
        // width: '18%',
        float:'right',
        fontSize: '13px',
        lineHeight: '24px',
        letterSpacing: '0.44px',
        fontWeight: 'bold',
        color: '#19191d'
    },
    planPriceSummary: {
        // width: '29%',
        // width: '18%',
        float:'right',
        fontSize: '13px',
        lineHeight: '24px',
        letterSpacing: '0.44px',
        fontWeight: 'bold',
        color: '#19191d'
    },
    planPrice1: {
        width: '29%',
        fontSize: '13px',
        lineHeight: '24px',
        letterSpacing: '0.44px',
        fontWeight: 'bold',
        color: '#19191d',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
    },
    planPrice1Today: {
        // width: '29%',
        fontSize: '13px',
        lineHeight: '24px',
        letterSpacing: '0.44px',
        fontWeight: 'bold',
        color: '#19191d'
    },
    planPriceRec2: {
        width: '29%',
        fontSize: '13px',
        lineHeight: '24px',
        letterSpacing: '0.44px',
        fontWeight: 'bold',
        color: '#19191d',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
    },
    planPriceSub: {
        width: '29%',
        fontSize: '13px',
        lineHeight: '24px',
        letterSpacing: '0.44px',
        fontWeight: 'bold',
        color: '#19191d',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
    },
    planPriceSubRec: {
        // width: '29%',
        fontSize: '13px',
        lineHeight: '24px',
        letterSpacing: '0.44px',
        fontWeight: 'bold',
        color: '#19191d'
    },
    planBox: {
        display: 'flex',
        width: '100%',
        // height: '40px',
        borderBottom: '0.8px solid rgb(192,192,193)',
        // paddingLeft:'10px',
        // paddingRight:'10px',
        paddingTop:'12px',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
    },
    planBoxViewQuote: {
        display: 'flex',
        // width: '100%',
        // height: '40px',
        borderBottom: '0.8px solid rgb(192,192,193)',
        // paddingLeft:'10px',
        paddingRight:'10px',
        paddingTop:'12px'
    },
    planBoxRec: {
        display: 'flex',
        width: '100%',
        // height: '40px',
        borderBottom: '0.8px solid rgb(192,192,193)',
        paddingLeft:'10px',
        paddingRight:'10px',
        paddingTop:'12px'
    },
    planBoxToday: {
        display: 'flex',
        width: '100%',
        // height: '40px',
        borderBottom: '0.8px solid rgb(192,192,193)',
        paddingLeft:'10px',
        paddingRight:'10px',
        paddingTop:'12px'
    },
    planBoxPlanSelection: {
        display: 'flex',
        width: '100%',
        // height: '40px',
        // borderBottom: '0.8px solid #e1e1e3',
        // paddingLeft:'10px',
        paddingTop:'12px',
        // paddingRight:'10px',
    },
    planBoxPlanSelectionNew: {
        display: 'flex',
        width: '63%',
        // height: '40px',
        // borderBottom: '0.8px solid #e1e1e3',
        // paddingLeft:'10px',
        paddingTop:'12px',
        float:'right',
        // paddingRight:'10px',
    },
    planBoxProgram:{
        display: 'flex',
        // width: '63%',
        // height: '40px',
        // borderBottom: '0.8px solid #e1e1e3',
        // paddingLeft:'10px',
        paddingTop:'12px',
        // float:'left',
    },
    leftDiv: {      
               float: 'left'
      },
      
      rightDiv: {
        marginLeft: '15%',
        height: '200px',
       
      },
    planBoxPlanSummary: {
        display: 'flex',
        width: '100%',
        // height: '40px',
        // borderBottom: '0.8px solid #e1e1e3',
        paddingLeft:'10px',
        paddingTop:'12px',
        paddingRight:'10px',
    },
    planBox11: {
        display: 'flex',
        width: '100%',
        height: '40px',
        borderBottom: '1px solid #e1e1e3',
        paddingTop:'12px'
    },
    planBoxTotal: {
        display: 'flex',
        width: '100%',
        // height: '50px',
        marginBottom:'15px',
         borderTop: '1.3px solid ',
        //  paddingLeft:'6px',
        //  paddingRight:'10px',
        paddingTop:'4px',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
    },
    planBoxTotalSummary: {
        display: 'flex',
        width: '100%',
        // height: '50px',
        marginBottom:'15px',
         borderTop: '1.3px solid ',
         paddingLeft:'10px',
         paddingRight:'10px',
        paddingTop:'4px'
    },
    planBoxTotal1: {
        display: 'flex',
        width: '100%',
        // height: '51px',
        // marginBottom:'39px',
        marginBottom:'10px',
         borderTop: '1.3px solid ',
        paddingTop:'4px',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
        // paddingLeft:'10px',
        // paddingRight:'10px',
    },
    planBoxTotal1Rec: {
        display: 'flex',
        width: '100%',
        // height: '51px',
        // marginBottom:'39px',
        marginBottom:'10px',
         borderTop: '1.3px solid ',
        paddingTop:'4px',
        paddingLeft:'10px',
        paddingRight:'10px',
    },
    planBoxTotalselectprog: {
        display: 'flex',
        width: '100%',
        // height: '69px',
        marginBottom:'51px',
        // marginBottom:'10px',
         borderTop: '1.3px solid ',
        paddingTop:'4px',
        // paddingLeft:'10px',
        // paddingRight:'10px',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
    },
    headingTxt : {
        fontSize: '13px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.14',
        letterSpacing: 'normal',
        color: 'rgba(0, 0, 0, 0.87)',
        border:'none!important',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
        // paddingLeft:'10px',
        // textAlign:'justify'
    },
    headingTxtTop : {
        fontSize: '13px',
        fontWeight: 'bold',
        fontStretch: 'normal',
        fontStyle: 'normal',
        lineHeight: '1.14',
        letterSpacing: 'normal',
        color: 'rgba(0, 0, 0, 0.87)',
        border:'none!important',
        // paddingLeft:'10px',
        // textAlign:'justify'
    },
    container : {
        position: 'fixed',
        top: '0',
        width: '100%',
        zIndex : '2'
    },
    header : {
        backgroundColor: '#ffffff',
        height: '75px',
        width: '100%'
    },
    subContainer : {
        height: '46px',
        width: '100%',
        backgroundColor: '#33afb0',
        color: '#ffffff'
    },
    UniverseHealthLogo : {
        width: '150px',
        height: '50px',
        marginBottom: '13.3px',
        marginTop: '12px',
        // marginLeft: '12px'
    },

    associationLogo :  {
        width: '150px',
        padding: '13px',
        objectFit: 'contain',
        float: 'right',
        marginBottom: '13px',
        marginTop: '12px',
        marginRight: '14px',
        textAlign: 'center',
        color : '#4f4f4f',
        backgroundColor: '#eeeeee',
        fontSize: '14px'
    },

    ButtonBG :  {
        width: '90px',
        height: '30px',
        borderRadius: '4px',
        border: 'solid 1px #cdaccf',
        backgroundColor: '#ffffff'
    },

    memberName :  {
        paddingTop: '12.7px',
        paddingBottom: '10.6px',
        float: 'left',
        height: '24px',
        width: '144px',
        fontSize: '16px',
        lineHeight: '24px',
        marginLeft : '26px'
    },

    logoutBtn : {
        paddingTop: '19px',
        paddingBottom: '16.6px',
        float: 'right',
        height: '11px',
        width: '56px',
        fontSize: '16px',
        lineHeight: '11px',
        marginRight: '20px',
        cursor: 'pointer',
        fontWeight : 'bold'
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
        //display:'block',
       // height: '80.2%',
        backgroundColor: '#ffffff',
        padding: '2%',
        //fontFamily : 'Roboto'
    },
    chatBottomWrp:{
        widths:'100%',
        marginTop:'1%',
    },
    welcomeMessage: {
        // width: '302px',
        width:'100%',
        // height: '50px',
        fontWeight: 'bold',
        //fontSize: '32px',
        lineHeight: '40px',
        //color: '#f6356a',
        fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
        fontSize: '24px',
        color: '#f6356a',

},
welcomeMessageNetwell: {
    // width: '302px',
    width:'100%',
    // height: '50px',
    fontWeight: 'bold',
    //fontSize: '32px',
    lineHeight: '40px',
    //color: '#f6356a',
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif',
    fontSize: '24px',
    color: '#162242',

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

    financePopup:{
        textAlign : 'justify',
        maxHeight:'initial',
        overflowX:'auto',
        overflowY:'auto',
        wordSpacing:'-2px',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif',
        fontSize : '15px'
    },

    defaultStyle : {
        completed: {
            color: "#eb5757 !important"
        },
        active: {
            color: "#febf42 !important"
        },
        paper1: {
            padding: '7px',
            width: '19vw',
            margin:'10px',
            
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

        MuiPaperRoot : {
            backgroundColor: '#f6f5ec',
            width : '100%',
        }
    },


    netWellStyle: {
        completed: {
            color: "#a9c43b !important"
        },
        active: {
            color: "#f2b543 !important"
        },
        paper1: {
            padding: '7px',
            width: '19vw',
            margin:'10px',
            
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
            backgroundColor: '#a9c43b',
        },

        MuiPaperRoot : {
            backgroundColor: '#f6f5ec',
            width : '100%',
        }
    },

    modal_header: {
        backgroundColor : '#33afb0',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
    },

    tabs : {
        root: {
            borderBottom: '1px solid #999999'
        },
        indicator: {
            color: '#533278',
            backgroundColor: '#533278',
        },
    },

    tab : {
        root: {
            textTransform: 'none',
            width: '178px',
            fontSize: '13px',
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
                outline:'none'
            },
        },
        selected: {},
    },

    preferredCheckbox : {
        float: 'right',
        borderBottom: '1px solid gray',
        marginTop: '6px'
    },

    checkBoxStyle : {
        width:'100%',
        backgroundColor:'#f8f8f8',
        overflowY: 'auto',
        overflowX: 'hidden',
        height:'125px',
        padding:'6px'
    },

    phoneDiv : {
        width: '224px',
        marginTop: '24px',
        height: '56px' ,
        backgroundColor:'#f8f8f8'
    },
    //==================================QuickQuote1=========================================

    QuickQt1TopWrp:{
        // padding:'25px',
        display:'flex',
        flexDirection:'column',
        marginLeft:'1%',
        paddingBottom:'25px',
        paddingTop:'25px',
        marginRight : '4%'
    },
    QuickQt2TopWrp:{
        // padding:'25px',
        display:'flex',
        flexDirection:'column',
        marginLeft:'1%',
        paddingBottom:'25px',
        paddingTop:'25px',
        paddingRight:'17px'

    },
    QuickQtTopRightText1:{
        width: "302px",
        // height: "40px",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.67",
        letterSpacing: "0.15px",
        color: "#f6356a",
        fontSize: "24px",
        textAlign:'justify'
    },
    QuickQtTopRightText2:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.5",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "15px",
        wordSpacing: '1px',
        textAlign:'justify',
       // paddingRight:'19px'
    },
    QuickQtTopRightText21:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.5",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "15px",
        wordSpacing:'-1px'
    },
    QuickQtZipWrp:{
        width:'26.5%',
        display:'flex',
        flexDirection:'column',
       
    },
    QuickQtZipWrpB:{
        width:'27%',
        display:'flex',
        flexDirection:'column',
       
    },
    QuickQtZipWrp111:{
        width:'25%',
        display:'flex',
        flexDirection:'column',
       
    },    
    QuickQtZipWrp1:{
        width:'23%',
        display:'flex',
        flexDirection:'column',
        marginLeft:'429px',
        //marginTop:'-58px'
    },   
    QuickQtZipTitleCoverage:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "14px",
        marginBottom:'10px',
        // marginLeft:'23.5%'
    },
    QuickQtZipTitle:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "14px",
        // marginBottom:'10px',
        // marginLeft:'3%'
    },
    QuickQtSpouseTitle:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "14px",
        // marginBottom:'10px',
        // marginLeft:'53%'
    },
    QuickQtDtlsWrp:{
        width:'106%',
        display:'flex',
        flexDirection:'row',
    },
    QuickQtDtlsWrp111:{
        width:'108%',
        display:'flex',
        flexDirection:'row',
    },
    QuickQtgenderWrp:{
        width:'50%',
        WebkitHeight:'90px'
    },
    QuickQtAgeWrp:{
        width:'35%',
        marginLeft:'7%'
    },
    QuickQtAgeWrp1:{
        width:'35%',
        marginLeft:'10%'
    },
    QuickQtChildWrp:{paddingLeft:'25px',display:'flex',flexDirection:'row',marginTop:'25px'},
    QuickQtChildWrp1:{paddingLeft:'25px',display:'flex',flexDirection:'coumn',marginTop:'25px'},

    QuickQtChildWrp11:{
        paddingLeft:'25px',
        position:'absolute',
        display:'flex',
        flexDirection:'row'
    },

    QuickAddBtn:{
        width: '56px',
        height: '56px',
        marginTop:'39px',
        marginLeft:'-17%'
    },
    QuickRemoveBtn:{
        width: '56px',
        height: '56px',
        // marginTop:'39px',
        // marginLeft:'-17%'
    },
    QuickAddBtn1:{
        width: '56px',
        height: '56px',
        marginTop:'23px',
        marginLeft:'-3.9%'
    },
    QuickChatBtn:{
        width: '56px',
        height: '56px',
        backgroundColor : "#fb6647",
        color: '#ffffff',
        borderRadius: '50%',
        border: "none",
        marginBottom : '5px'
    },
    QuickChatBtnMob:{
        width: '56px',
        height: '56px',
        backgroundColor : "#fb6647",
        color: '#ffffff',
        borderRadius: '50%',
        border: "none",
        marginBottom : '5px',
        marginRight:'17px'
    },
    CommonChatBtn:{
        width: '56px',
        height: '56px',
        backgroundColor : "#8dc73f",
        color: '#ffffff',
        borderRadius: '50%',
        border: "none",
    },

    QuickQtDepedentTxt:{
        width: '20px',
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "14px",
        marginTop:'51px',
        marginLeft:'10px'
    },
    QuickQtRemoveTxt:{
        width: '20px',
        display:'flex',
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "14px",
        marginTop:'-43px',
        marginLeft:'64px'
    },
    QuickQtDepedentTxt22:{
        width: '20px',
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "14px",
        marginTop:'63px',
        marginLeft:'10px',
    },
    QuickQtDepedentTxt1:{
        width: '20px',
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "14px",
        marginTop:'-33px',
        marginLeft:'129px'
    },
    QuickQtDoneWrp:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center',
        flexDirection:'row'
    },
    QuickQtChatWrp:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
    },
    QuickQtChatWrp2:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        marginRight:'1.1%'
    },
    QuickQtHelpWrp:{
        display:'flex',
        justifyContent:'flex-end',
        marginRight:'2.1%'
    },
    QuickQtHelpWrp2:{
        display:'flex',
        justifyContent:'flex-end',
        marginRight:'1.1%'
    },
    QuickQtHelpTxtNeed:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        //color: "#420045",
        color:'#304d63',
        fontSize: "14px",
        marginRight:'17px'
    },
    QuickQtHelpTxt1:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        //color: "#420045",
        color:'#304d63',
        fontSize: "14px",
    },
    QuickQtHelpTxt2:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
       // color: "#420045",
       color:'#304d63',
        fontSize: "14px",        
    },
    QuickQtHelpTxt2Help:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
       // color: "#420045",
       color:'#304d63',
        fontSize: "14px",
        marginRight:'17px'   ,
        textAlign:'end'     
    },
    text:{
        width:'100%'
    },

    //==============================QuickQuote2===========================================
    QuickQt2EnrollTxtWrp:{
        display:'flex',
        flexDirection:'row',
        paddingLeft:'25px',
        paddingRight:'25px',
        marginTop:'15px'
    },
    txt : {
      textAlign : 'justify'
    },

    QuickQt2EnrollText:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.33",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "15px",
    },
    QuickQt2EnrollText1:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.33",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "15px",
        paddingTop:'20px'
    },
    QuickQt2FeesWrp:{
        display:'flex',
        flexDirection:'column'
    },
    QuickQt2FeesChild1Wrp:{
        width:'68%',
        marginLeft:'90px',
        marginBottom:'7px'
    },
    QuickQt2FeesChild1Wrp1:{
        width:'68%',
        borderBottom:'1px solid #e1e1e3',
        marginLeft:'90px',
        paddingTop:'3px',
        paddingBottom:'7px',
    },
    QuickQt2FeesChild1Wrp1Mob:{
        // width:'68%',
        borderBottom:'1px solid #e1e1e3',
        // marginLeft:'90px',
        paddingTop:'3px',
        paddingBottom:'7px',
        paddingRight:'17px'
    },
    QuickQt2FeesTxt:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "14px",
    },
    QuickQt2FeesTxtMob:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.14",
        letterSpacing: "normal",
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: "14px",
        // marginLeft:'22%'
    },
    QuickQt2FeesTxt1:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.71",
        letterSpacing: "0.44px",
        color: "#19191d",
        fontSize: "14px",
    },
    QuickQt2FeesTxt2:{
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.71",
        letterSpacing: "0.44px",
        color: "#19191d",
        fontSize: "14px",
        float:'right'
    },

    ComponentContainer:{
       /* marginLeft:'21px',
        marginRight:'21px',
        paddingTop : '40px',*/
        marginLeft:'21px',
        marginRight:'21px',
        paddingTop : '45px',
        paddingBottom: '25px',
        backgroundColor:'#ffffff',
        
    },

    HeaderWrp:{
        width:'100%',
        display:'flex',
        flexDirection:'row',
        justifyContent: 'space-between',
        // marginLeft:'12px',
        //marginTop:'12px',
        //paddingBottom:'12px'

    },
    HeaderRightWrp:{
        display:'flex',
        justifyContent:'flex-start',
        alignItems:'center'
    },
    HeaderLeftWrp:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    HeaderLeftWrpNetwell:{
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center',
        marginRight:'2%'
    },
    HeaderRightLogo:{
        width: "150px",
        height: "50px",
    },
    netWellLogo:{
        width: "110px",
        height: "44px",
        margin: '3px 972px 3px 25px'
    },
    HeaderLeftLogo:{
        width: "75px",
        height: "50px",
        marginRight:'8px'
    },
    HeaderLeftText:{
        //width: "150px",
        height: "50px",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "2.86",
        letterSpacing: "0.15px",
        color: "#4f4f4f",
        // backgroundColor: "#eeeeee",
        fontSize: "14px",
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    HeaderLeftTextmobile:{
        //width: "150px",
        height: "50px",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "2.86",
        letterSpacing: "0.15px",
        color: "#4f4f4f",
        // backgroundColor: "#eeeeee",
        fontSize: "14px",
        display:'flex',
        justifyContent:'flex-end',
        alignItems:'center'
    },
    LoginWrp:{
        width:'100%',
        height:'47.3px',
        display:'flex',
        flexDirection:'row',
        backgroundColor: "#33afb0",
        boxShadow:'0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12)',
    },
    LoginWrpNetwell:{
        width:'100%',
        height:'47.3px',
        display:'flex',
        flexDirection:'row',
        backgroundColor: "#e3e3e3",
        boxShadow:'0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12)',
    },
    LoginWrpMobile:{
        // width:'100%',
        height:'47.3px',
        // display:'flex',
        // flexDirection:'row',
        backgroundColor: "#33afb0",
        boxShadow:'0 4px 4px 0 rgba(0, 0, 0, 0.24), 0 0 4px 0 rgba(0, 0, 0, 0.12)',
    },
    
    LoginRight:{
        // width: "200px",
        height: "24px",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.5",
        letterSpacing: "0.15px",
        color: "#ffffff",
        fontSize: "1em",
        display:'flex',
        marginLeft: '10px'
    },
    LoginRightNetwell:{
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
        display:'flex',
        marginLeft: '25px',
    },
    LoginLeft:{
        width: "80px",
        height: "24px",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.5",
        letterSpacing: "0.15px",
        color: "#ffffff",
        fontSize: "16px",
        display:'flex',
        // justifyContent:'flex-end',
        cursor:'pointer'
    },
    LoginLeft1 : {
         width: "30%",
        height: "24px",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.5",
        letterSpacing: "0.15px",
        color: "#ffffff",
        fontSize: "16px",
        display:'flex',
        // justifyContent:'flex-end',
        cursor:'pointer'
    },
    goToDashboardBtn : {
        color: "#420045",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        backgroundColor: "#febf42",
        boxShadow: "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        textTransform: "uppercase",
        padding: "6px 16px",
        fontSize: "0.875rem",
        cursor: "pointer",
        fontWeight: "500",
        lineHeight: "1.75",
        borderRadius: "4px",
        letterSpacing: "0.02857em",
        width: 'max-content',
        marginRight: 12
    },
    bottomCopyTxtWrp:{
        width:'100%',
        display:'flex',
        justifyContent:'center',
        marginTop:'15px',
    },
    bottomCopyText:{
        width: "357px",
        height: "16px",
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "normal",
        fontStretch: "normal",
        fontStyle: "normal",
        lineHeight: "1.33",
        letterSpacing: "normal",
        color: "#333333",
        fontSize: "12px",
        display:'flex',
        justifyContent:'center'
    },

    bmiName : {
        textAlign : 'center',
        padding : '40px',
        fontFamily: "Roboto, Arial, Helvetica, sans-serif",
        fontWeight: "bold",
    },
    //============================bottomStyle==================================
    bottomMainConatiner:{
        width:'100%',
      },
      newBottomContainer:{
        // display:'flex',
        width:'100%',
        // justifyContent:'center',
        alignItems:'center',
        marginBottom:'8px',
        marginTop : '10px',
        
      },
      newBottomContainerElig:{
        // display:'flex',
        width:'100%',
        // justifyContent:'center',
        alignItems:'center',
        marginBottom:'8px',
        marginTop : '10px',
        marginLeft:'15px'
      },
      bottomChildContainer1:{
        // width:'80%',
        width:'auto',
        display : 'flex'
      },
      bottomChildContainer2:{
        display:'flex',
        width:'20%',
      },
      chatContainer:{
        display:'flex',
        marginLeft:'auto'
      },
      bottomHelpConatiner:{
        display:'flex',
        width:'100%',
      },
      needHelpContainer:{
        color: '#304d63', fontSize: '14px', lineHeight: '18px', textAlign: 'right', marginLeft:'auto'
      },
      subCont1:{
          display:'flex',
          width:'55%',
      },
      subCont2:{
        display:'flex',
        width:'45%',
      },
    //==================================Footer===============================
    FooterWrp:{
        width:'40%',
        position:'fixed',
        zIndex:10,
        right:43,
        top:'70%',
        //bottom:'10%'
    },
    FooterChildWrp1:{
        display:'flex',
        width:'100%',
        marginBottom:'1%'
    },
    FooterChildWrp2:{
        display:'flex',
        width:'100%',
    },

    acsmCheckBox : {
        marginLeft:'27px',
        marginTop:'-33px',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
    },

    acsmCheckBoxDisable : {
        marginLeft:'27px',
        marginTop:'-33px',
        color : 'gray',
        fontFamily : 'Roboto, Arial, Helvetica, sans-serif'
    }


}




