import React, { Component } from 'react';
import customeClasses from './Eligibility.css';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker, DatePicker } from '@material-ui/pickers';
import axios from 'axios';
import configuration from '../../../configurations';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import Loader from '../../loader';
import CommonSelect from "../../CommonScreens/CommonSelect";
import customStyle from "../../../Assets/CSS/stylesheet_UHS";
import Sample from "../../CommonScreens/sampleTextField";
import i18n from '../../../i18next';
import CommonTable from "../../CommonScreens/commonTable";
import Grid from '@material-ui/core/Grid';
import { Modal } from 'react-bootstrap';
import MenuItem from '@material-ui/core/MenuItem';
import ForumIcon from "@material-ui/icons/Forum";
import Fab from "@material-ui/core/Fab";
import { Auth } from "aws-amplify";
import Cookies from "universal-cookie";
import InputLabel from "@material-ui/core/InputLabel";
import NativeSelect from "@material-ui/core/NativeSelect";
import DropdownButton from "react-bootstrap/DropdownButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { data } from 'jquery';

import style from "./Eligibility.module.css";

const cookies = new Cookies();

const styles = props => (
    customStyle.netWellEligiScreen
);

const PurpleRadio = withStyles(
    customStyle.radioBtn
)(props => <Radio color="default" {...props} />);

const WizardButton = withStyles(
    customStyle.viewBtn
)(Button);

const ProceedButton = withStyles(
    customStyle.proceedBtn
)(Button);

const CustomTextField = withStyles(
    customStyle.textField,
)(TextField);

const CrudButton = withStyles(
    customStyle.crudBtn,
)(Fab);

const CustomeTextField = withStyles({
    root: {
        '& .MuiFilledInput-root': {
            backgroundColor: '#f8f8f8',
            color: '#19191d',
            fontSize: '16px',
            lineHeight: '24px',
            height: '56px',
            margin: '0px',
            '&:hover': {
                backgroundColor: '#f4f4f4',
                color: '#533278'
            }
        },
        '&:not(.Mui-disabled):hover::before': {
            borderBottom: 'red'
        },
        '&:not(.Mui-disabled):hover::after': {
            borderBottom: 'purple'
        },

        '& .Mui-focused': {
            backgroundColor: '#ffffff',
            color: '#19191d',

        },
        '& label.Mui-focused': {
            color: '#533278',
        },
        overridesUnderline: {
            '&:hover:not($disabled):not($error):not($focused):before': {
                borderBottomColor: '#cdcde7',
            }
        },
        disabled: {},
        error: {},
        focused: {},
    }
})(TextField);

class Eligibility extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            count: 0,
            progress: 1,
            isValid: true,
            disablePrev: false,
            checkedB: true,
            radio: '',
            input: '',
            select: '',
            check: '',
            value: '',
            setSelectedDate: '',
            selectedDate: '',
            date: new Date(),
            questions: [
                {
                    id: 1,
                    question: '',
                    ans: '',
                    type: 'textbox',
                    subType: 'text',
                    subTitle: [],
                    relatedQuestions: []
                }
            ],
            checkedList: [],
            selected: [],
            knockoutList: [],
            checkMember: [],
            questionData: [],
            answerList: [],
            membersList: [],
            knockOutList: [],
            loaderShow: false,
            name: '',
            formErrors: { Physician: '', diagnosis: '', },
            Physician: '',
            diagnosis: '',
            disQualifiedData: [],
            disqual: [],
            dateOfTreatment: false,
            dateOfTrtmt: false,
            allQueAnswred: false,
            bmiData: [],
            submitValid: false,
            backValid: false,
            disQuailifyModal: false,
            optReasonList: [],
            modalOpen: false,
            optReason: '',
            otherReason: '',
            formValid: false,
            disOtReason: false,
            errorText: '',
            isValidopt: false,
            msgModal: false,
            isAgent: false,
            showDropDown: false,
            AshowDropDown: false,
            BshowDropDown: false,
            CshowDropDown: false,
            showMessage: false,
            family: "",
            checkradio: [],
            datas: [],
            disableProceed: true,
            femaleList :[],
            waitingData:[],
            checkwaitingData:[],
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    componentDidMount() {
        window.scrollTo(0, 0);
        this._isMounted = true;
        let cookiesData = JSON.parse(sessionStorage.getItem('STATE_PARAM'))
        if (cookiesData && cookiesData.isAgent) {
            this.setState({
                isAgent: true
            })
        }
        sessionStorage.setItem('current_screen', '3');
        let subId = JSON.parse(localStorage.getItem('CurrentLoginUser')).id;
        this.setState({
            loaderShow: true,
            progress: this.state.progress + 14.28
        })

        //get All members
        fetch(configuration.baseUrl + '/enrollment/getMemberBySubId/' + subId)
            .then((response) => response.json())
            .then(membersResult => {
                if (membersResult.response) {
                    if (this._isMounted) {
                        this.setState({
                            membersList: membersResult.response,
                            knockOutList: membersResult.response,
                        }, () => {console.log("membersList---", this.state.membersList)
                        let femaleList=this.state.knockOutList.map(val=> {return val.gender == "FEMALE" ? val :[]})
                        console.log("femaleList---", femaleList)
                        this.setState({
                            femaleList: femaleList
                        })
                        })
                    }
                }
            });
        // this.onClickBack();

        //get ans given by member

        /*let bmiData = responseAns.data.response.bmiList;*/

        //question
        fetch(configuration.baseUrl + '/questionbank/getQuestions/' + sessionStorage.getItem('CLIENT_ID'))
            .then((response) => response.json())
            .then(response => {
                if (response.response) {
                    let validCount = 0;
                    


                    console.log("getQuestions===",response.response)
                    let getQuestions=response.response
                    axios.get(configuration.baseUrl + '/questionbank/getMemberAns/' + subId)
                        .then(responseAns => {
                            if (responseAns && responseAns.data) {
                                let answers = [];
                                let answerData = responseAns.data.response.questionAnswer ? responseAns.data.response.questionAnswer : [];
                                
                                if(answerData.length > 0){
                                let ds = answerData.map(val => val.memberDiseaseList)
                                console.log("answerData==", answerData)
                                console.log("membersList---", this.state.membersList)
                                let mList=  this.state.membersList.map((ob,i)=>{return ob})

                                console.log("answerData==", answerData.filter((obj) => obj.memberDiseaseList.length != 0 ? obj.memberDiseaseList : null))
                                let membeList = answerData.filter((obj) => obj.memberDiseaseList.length != 0 ? obj.memberDiseaseList : null)
                                
                                console.log("membeList==", membeList)
                            
                               let diseaseID=[]
                               let knockOutData=[]
                                for (let i = 0; i < answerData.length; i++){
                                    if((answerData[i].memberDiseaseList == [] || answerData[i].memberDiseaseList.length ==0) && answerData[i].answer !== 'Yes' && answerData[i].answer !== 'No'  ){
                                        knockOutData.push(answerData[i])
                                    }else{
                                        diseaseID = diseaseID.concat(answerData[i].memberDiseaseList);
                                        console.log("diseaseID===",diseaseID)
                                    }
                                     
                                   }  





                                let memberID=[]
                                //find member from memberlist
                            

                                let tempChecklist=[]
                                let tempSelected=[]
                                let tempSelected1=[]
                                let data1=[]
                                

                                for(var check=0;check < diseaseID.length;check++){
                                    
                                   // tempChecklist[check] = diseaseID[check].diseaseId ? diseaseID[check].diseaseId:null
                                    var derivedDisease;
                                   if(diseaseID[check].diseaseId != null || diseaseID[check].diseaseId != NaN){
                                        for(let r = 0; r < response.response.length; r++){
                     
                                            let findID= response.response[r].disease.find(obj=>obj.diseaseId == diseaseID[check].diseaseId)
                                            console.log("find Id===",findID)
                                            // diseaseID[check].diseaseId= parseInt(findID.id)
                                            if(findID){
                                                derivedDisease = findID;
                                                break;

                                            }
                                        }
                                

                                    }
                                     tempChecklist.push(derivedDisease.diseaseId);

                                    //    data1[]=tempSelected1[check] && tempSelected1[check].map(val => {return val.id})
                                       diseaseID[check].diseaseId= parseInt(derivedDisease.id)
                                    
                                       let fname= this.state.membersList && this.state.membersList.find(list=> list.id == parseInt(diseaseID[check].memberId))
                                       console.log("fname===",fname)
                                       diseaseID[check].firstName = fname.firstName
                                       diseaseID[check].lastName = fname.lastName
                                       diseaseID[check].id = fname.id
                                       diseaseID[check].disease = derivedDisease.diseaseId

                                       console.log("fname===",diseaseID)
                                }



                                // console.log("tempChecklist===",DataMember)
                                console.log("tempChecklist===",tempChecklist)
                                console.log("dataMember==", diseaseID)

                            let knockOutList = []
                                for(var knockVar = 0; knockVar < knockOutData.length; knockVar ++){
                                    var knockoutMemberIds = knockOutData[knockVar].answer.split(',')
                                    if(knockoutMemberIds.length>0){
                                        for(var memberIndex=0 ; memberIndex < knockoutMemberIds.length ; memberIndex++){
                                            var tempKnockOut =  this.state.membersList && this.state.membersList.find(list=>list.id == knockoutMemberIds[memberIndex])
                                                if(tempKnockOut){
                                                    var temp = Object.assign({}, tempKnockOut)
                                                    temp["questionId"] = knockOutData[knockVar].questionId
                                                    knockOutList.push(temp)
                                                }
                                        }

                                    }
                                  
                                }


                                this.setState({
                                    checkedList: tempChecklist,
                                    selected: diseaseID,
                                    knockoutList:knockOutList
                                }, () => console.log("selected===question desiesid", this.state.selected))

                                }







                                /* for(let i=0; i<bmiData.length; i++){
                                     if((bmiData[i].feet === 0 || bmiData[i].feet) && (bmiData[i].inches === 0 || bmiData[i].inches) && bmiData[i].weight){
                                         validCount++;
                                     }
                                 }*/
                                /*if(answerData.length === response.response.length){ /!*&& validCount === bmiData.length*!/
                                    this.state.allQueAnswred = true;
                                }*/




                                let resultArray = []
                                for (let i = 0; i < response.response.length; i++) {
                                    let result = answerData ? answerData.find(obj => obj.questionId === response.response[i].question.id) : {};
                    let nam= response.response[i].question && response.response[i].disease.map((key, index) => {
                       
                      return key
                    })
                    console.log("nam====",nam)
                                    let relatedQuestionAns = [];
                                    for (let j = 0; j < response.response[i].question.relatedQuestions.length; j++) {
                                        let relatedSubQuestionAns = [];
                                        let relatedQuestionsResult = result && result.relatedQuestionAns ? result.relatedQuestionAns.find(obj => obj.relatedQuestionId === response.response[i].question.relatedQuestions[j].id) : [];
                                        for (let k = 0; k < response.response[i].question.relatedQuestions[j].relatedSubQuestions.length; k++) {
                                            let relatedSubQuestionsResult = relatedQuestionsResult && relatedQuestionsResult.relatedSubQuestionAns ? relatedQuestionsResult.relatedSubQuestionAns.find(obj => obj.relatedSubQuestionId === response.response[i].question.relatedQuestions[j].relatedSubQuestions[k].id) : [];
                                            let a = new Date();
                                            relatedSubQuestionAns.push({
                                                relatedSubQuestionId: response.response[i].question.relatedQuestions[j].relatedSubQuestions[k].id,
                                                answer: relatedSubQuestionsResult && relatedSubQuestionsResult.answer ? relatedSubQuestionsResult.answer : (response.response[i].question.relatedQuestions[j].relatedSubQuestions[k].subType === 'date' ? new Date() : ''),
                                                optionId: relatedSubQuestionsResult ? relatedSubQuestionsResult.optionId : ''
                                            });

                                        }

                                        let memArr = relatedQuestionsResult && relatedQuestionsResult.answer ? relatedQuestionsResult.answer.split(',') : [];
                                        let valArr = [];
                                        if (memArr.length > 0) {
                                            for (let i = 0; i < memArr.length; i++) {
                                                let findIndex = this.state.membersList.findIndex(obj => obj.id.toString() === memArr[i]);
                                                if (findIndex > -1) {
                                                    valArr.push(memArr[i]);
                                                }
                                            }
                                        }

                                        relatedQuestionAns.push({
                                            relatedQuestionId: response.response[i].question.relatedQuestions[j].id,
                                            answer: valArr,
                                            optionId: relatedQuestionsResult ? relatedQuestionsResult.optionId : '',
                                            relatedSubQuestionAns: relatedSubQuestionAns
                                        });
                                    }
                                    let knockOutAns =result && result.answer ? result.answer:'No'
                                    if(result){
                                        if(result.answer !='Yes' && result.answer !='No' && result.answer !='') {
                                            knockOutAns = 'Yes' 
                                        }
                                    }
                                    

                                    answers.push({
                                        questionId: response.response[i].question.id,
                                        optionId: result && result.optionId ? result.optionId : '',
                                        answer:  knockOutAns,
                                        relatedQuestionAns: relatedQuestionAns
                                    });
                                }




                                console.log("answer", answers)
                                //BMI question login for surcharges
                                /*let BMI_DATA = [];
                                for(let j=0; j<this.state.membersList.length; j++){
                                    let obj = {};
                                    let findIndex = bmiData.findIndex(obj => obj.id === this.state.membersList[j].id);
                                    if(findIndex > -1){
                                        obj.feet = (bmiData[j].feet === 0 || bmiData[j].feet) ? bmiData[j].feet : '';
                                        obj.inches = (bmiData[j].inches === 0 || bmiData[j].inches) ? bmiData[j].inches : '';
                                        obj.weight = bmiData[j].weight ? bmiData[j].weight : '';
                                    } else {
                                        obj.feet = '';
                                        obj.inches = '';
                                        obj.weight = '';
                                    }

                                    obj.id = this.state.membersList[j].id ? bmiData[j].id : '';
                                    obj.name = this.state.membersList[j].firstName + ' ' + this.state.membersList[j].lastName;

                                    let count = 0;
                                    Object.keys(obj).map( (key,index) => {
                                        if(parseInt(obj.feet) === 0 && parseInt(obj.inches) === 0){
                                            obj.heightValid = false;
                                        } else if(obj.feet === '' && obj.inches === ''){
                                            obj.heightValid = false;
                                        } else {
                                            obj.heightValid = true;
                                        }
                                    });
                                    BMI_DATA.push(obj);
                                }*/

                                if (this._isMounted) {
                                    this.setState({
                                        questions: response.response,

                                        answerList: answers,
                                        loaderShow: false,
                                        /*bmiData : BMI_DATA*/
                                    }, () => {
                                        console.log("response-=--", response.response)
                                        let result = response.response.map(val => { return val.disease })
                                        console.log("result-=--", this.state.questions[this.state.count].disease)
                                        this.isAllValidHandler();
                                        this.enableSubmit()
                                    });
                                }
                            }
                        })
                }

            })
            .catch(error => {
                console.log(error);
            })
        //     }
        // })
        // .catch(error => {
        //     console.log(error);
        // })

    }
    reduceProgress = () => {
        if (this.state.count > 0) {
            this.setState({
                count: this.state.count - 1,
                progress: (this.state.count) / this.state.questions.length * 100,
                dateOfTreatment: false
            }, () => {
                this.isAllValidHandler();
            // this.isAllValidHandler('back','');

                this.enableSubmit()
            });
        }
    }

    onClickBack = (event) => {
        let subId = JSON.parse(localStorage.getItem('CurrentLoginUser')).id;
        axios.get(configuration.baseUrl + '/questionbank/getMemberAns/' + subId)
            .then(response => {
                for (var i = 0; i < response.data.response && response.data.response.questionAnswer.length; i++) {

                    for (var j = 0; j < response.data.response.questionAnswer[i].memberDiseaseList.length; j++) {

                        this.setState({
                            answerList: response.data.response.questionAnswer[i].answer,
                            checkedList: response.data.response.questionAnswer[i].memberDiseaseList[j].diseaseId,

                            selected: response.data.response.questionAnswer[i].memberDiseaseList[j].memberId
                        }, () => console.log("checkedList===", this.state.checkedList))
                    }


                }

            })


        for (let i = 0; i < this.state.answerList.length; i++) {
            for (let j = 0; j < this.state.answerList[i].relatedQuestionAns.length; j++) {
                if (this.state.answerList[i].relatedQuestionAns[j].answer && !Array.isArray(this.state.answerList[i].relatedQuestionAns[j].answer)) {
                    //this.state.answerList[i].relatedQuestionAns[j].answer = this.state.answerList[i].relatedQuestionAns[j].answer.toString();
                    this.state.answerList[i].relatedQuestionAns[j].answer = this.state.answerList[i].relatedQuestionAns[j].answer ? this.state.answerList[i].relatedQuestionAns[j].answer.split(',') : [];
                }
            }
        }


        let count = 0;
        // if(this.state.count === this.state.questions.length - 1){
        //     count = this.state.count;
        // } else {
        //     count = this.state.count + 1
        // }
        let progress = ((count) / this.state.questions.length * 100) + 14.28;
        // this.setState({
        //         disqualified : false,
        //         count : count,
        //         progress : progress
        // },() => {
        //     this.isAllValidHandler();
        //     this.enableSubmit()
        // }) 

        this.setState({
            disqualified: false,
            count: count,
            progress: progress
        }, () => {
            // this.isAllValidHandler('back','');
            this.enableSubmit()
        })

    }


    increaseProgress = () => {

        this.setState({
            loaderShow: false
        });

        if (this.state.answerList[this.state.count].answer === 'No') {
            // this.handleContinue('NEXT','');
            if (this.state.questions[this.state.count].question.code === 'Knockout' || this.state.questions[this.state.count].question.code === 'SMO') {
                this.handleContinue('NEXT', 'Knockout');
            } else {

                this.handleContinue('NEXT', 'WaitingPeriod');
            }
        } else if (this.state.answerList[this.state.count].answer === 'Yes' && this.state.answerList[this.state.count].answer.length > 0) {
            if (this.state.questions[this.state.count].question.code === 'Knockout' || this.state.questions[this.state.count].question.code === 'SMO') {
                this.handleContinue('NEXT', 'Knockout');
            } else {
                // this.setState({
                //     disQuailifyModal : true
                // });
                this.handleContinue('NEXT', 'WaitingPeriod');
            }
        }
    }
    
    multiselectAnswerChangeHandler = (e, key, index,question) => {
        console.log("select member---",question.id )
        console.log("key---",key)
        console.log("index---",index)

        var id = key.id;
        const value = e.target.value;
        console.log("value===", value)
        // remove duplicate records
        for (var i = 0; i < value.length; i++) {

            var tempObj = value[i];
            var index = value.findIndex(val => tempObj.id == val.id && !val.diseaseId && tempObj.diseaseId == id);
            console.log("Index===",index)
            if (index >= 0) {
                value.splice(index, 1);
                index = value.indexOf(tempObj);
                value.splice(index, 1);
                this.state.selected.splice(this.state.selected.findIndex(item=> item.disease ==id))
            }


        }

        this.state.selected = this.state.selected.filter((item) => item.diseaseId != id);

        var arr = []
        /* this.state.selected.forEach((res, index) => {
             if ( res.diseaseId == id) {
                 this.state.selected.splice(index, 1) // remove element
         };
         })*/


        for (var i = 0; i < value.length; i++) {
            var temp = Object.assign({}, value[i])
            temp["diseaseId"] = id
            temp["disease"] = key.diseaseId;
            temp["questionId"]=question.id
            arr = arr.concat(temp)
        }
        console.log("temp===", temp)
        console.log("arr===", arr)
        // value.forEach(val=>({

        // }))


        // this.state.selected = this.state.selected.concat(arr)
        // if(this.state.selected[id]){
        //         // this.state.selected[id] = value
        //         this.state.selected[id] = this.state.selected[id].concat(value)
        //     }else{
        //         this.state.selected[id] = values
        //     }

        this.setState({
            selected: this.state.selected.concat(arr)
        }, () => {console.log("selected===", this.state.selected)
    
    
    })

    }

    selectKnockOut = (e, id,question,selected) => {
        console.log("index===", selected)

        let resultArray = this.state.knockoutList
        if (e.target.checked)      //if checked (true), then add this id into checkedList
        {
            
            let valIndex = resultArray.findIndex(val => val.id == id.id && val.questionId == question.id)
            if(valIndex <0){
            var temp = Object.assign({}, id)
            temp['questionId'] = question.id
            resultArray.push(temp)
            }
            
        }
        else                    //if not checked (false), then remove this id from checkedList
        {
            
            
            let valIndex = resultArray.findIndex(val => val.id == id.id && val.questionId == question.id)
            if(valIndex >= 0){
                resultArray.splice(valIndex,1)
            }
        }
        // if(resultArray.length > 0 && this.state.count === this.state.questions.length - 2){
        //     this.setState({
        //         submitValid: true,
        //         backValid: false
        //     });
        // }else{
        //     this.setState({
        //         submitValid: false,
        //         backValid: false
        //     });
        
        // }

        
        

        console.log("resultArray==", resultArray)

        this.setState({
            knockoutList: resultArray
            
        })


        // if(event.target.checked){

        //         for (let i = 0 ; i < this.state.membersList.length; i++) {

        //             if (index === this.state.membersList[i].id ) {
        //                     if(!Array.isArray(this.state.answerList[index].answer)){
        //                         this.state.answerList[index].answer = [];
        //                         this.state.answerList[index].answer.push(this.state.membersList[i].id.toString());
        //                         console.log("answer.push---",this.state.answerList[index].answer)
        //                     } else {
        //                         this.state.answerList[index].answer.push(this.state.membersList[i].id.toString());
        //                     }
        //             }

        //         }  
        //     } else {  
        //         let findIndex = this.state.answerList[index].answer.indexOf(id.toString());
        //         if(findIndex > -1 ){
        //             this.state.answerList[index].answer.splice(findIndex, 1);

        //         }
        //     }   

    }


    isAllValidHandler = (name, value) => {
        let flag = false;

        // if(name== 'back'){
        //     this.setState({
        //             selected: this.state.selected,
        //             checkedList : this.state.checkedList
        //         });
        // }  else
         if (this.state.answerList[this.state.count].answer !== '' && this.state.answerList[this.state.count].answer === 'Yes') {

            // this.setState({selected:[],checkedList:[]})
            this.setState({
                selected: this.state.selected,
                checkedList : this.state.checkedList,
                knockoutList:this.state.knockoutList,
                knockOutList : this.state.knockOutList
            },()=>{console.log("onBack===",this.state.selected)});


            if (this.state.answerList[this.state.count].relatedQuestionAns[0] && this.state.answerList[this.state.count].relatedQuestionAns[0].relatedSubQuestionAns && this.state.answerList[this.state.count].relatedQuestionAns[0].relatedSubQuestionAns.length === 0) {
                if (this.state.answerList[this.state.count].relatedQuestionAns[0].answer.length > 0) {
                    let data = this.state.answerList[this.state.count].relatedQuestionAns[0].answer;
                    var found;
                    for (let i = 0; i < data.length; i++) {
                        let ind = this.state.membersList.findIndex((obj) => obj.id == data[i]);
                        found = ind;
                    }
                    if ((found && found > 0) || (found === 0)) {
                        flag = true;
                    } else {
                        flag = false;
                    }
                } else {
                    flag = false;
                }
            } else {
                let check = true;
                // if (this.state.answerList[this.state.count].relatedQuestionAns[0] && this.state.answerList[this.state.count].relatedQuestionAns[0].relatedSubQuestionAns) {
                //     for (let i = 0; i < this.state.answerList[this.state.count].relatedQuestionAns[0].relatedSubQuestionAns.length; i++) {
                //         if (this.state.answerList[this.state.count].answer && this.state.answerList[this.state.count].answer.length !== '') {
                //             check = true;
                //         } else {
                //             check = false;
                //             break;
                //         }
                //     }
                // }
                if (this.state.answerList[this.state.count].answer && this.state.answerList[this.state.count].answer.length !== '') {
                    check = true;
                } else {
                    check = false;

                }
                flag = check;
            }
        } else if (this.state.answerList[this.state.count].answer === '') {
            flag = false;
        } else {
            flag = true;
        }
        if (this.state.count === this.state.questions.length - 1) {
            this.setState({
                isValid: false
            }, () => {
                this.enableSubmit()
            });
        } else {
            this.setState({
                isValid: flag
            }, () => {
                this.enableSubmit()
            });
        }


    }

    handlerCopy(e) {
        e.preventDefault();
    }

    textAnswerChangeHandler = (val, itemValid, parentDetails) => {
        if (itemValid) {
            this.state.answerList[this.state.count].relatedQuestionAns[parentDetails.index].relatedSubQuestionAns[parentDetails.subindex].answer = val;

            this.setState({
                refresh: true
            }, () => {
                this.isAllValidHandler(parentDetails.name, val);

            });
        } else {
            this.state.answerList[this.state.count].relatedQuestionAns[parentDetails.index].relatedSubQuestionAns[parentDetails.subindex].answer = '';

            this.setState({
                refresh: true,
                isValid: false
            }, () => {
                this.enableSubmit()
            });
        }

    }


    dieseaseCheck = (event, name, key) => {
        // console.log(name,key)
        // if(name == 'check'){
        //     this.setState({showDropDown : ! this.state.showDropDown, showMessage: ! this.state.showDropDown})
        //     }            
    }

    onDieseaseSelect = (e, id) => {
        console.log("id===",id)
        let resultArray = []
        if (e.target.checked)      //if checked (true), then add this id into checkedList
        {
            resultArray = this.state.checkedList.filter(CheckedId =>
                CheckedId !== id
            )
            resultArray.push(id)
        }
        else                    //if not checked (false), then remove this id from checkedList
        {
            resultArray = this.state.checkedList.filter(CheckedId =>
                CheckedId !== id
            )
            // resultArray.splice(id,1)
        
            let index = this.state.selected.findIndex(item=> item.disease == id)
            if(index >= 0){
                this.state.selected.splice(index,1)
            }
          
        // this.state.selected.splice(this.state.selected.findIndex(item=> item.disease == id))

        }
        console.log("resultArray==", resultArray)

        this.setState({
            checkedList: resultArray,
            selected : this.state.selected
        })

    }

    answerChangeHandler = (event, name, optionId, code) => {
        if (name === 'check') {
            this.state.answerList[this.state.count].answer = event.target.checked;
            this.state.answerList[this.state.count].optionId = optionId;
        } else if ((name === 'radio' || name === 'dropdown') && (code == 'WaitingPeriod' || code == 'HealthQuestion')) {
            this.state.answerList[this.state.count].answer = event.target.value;
            for (let i = 0; i < this.state.questions[this.state.count].options.length; i++) {
                if (this.state.questions[this.state.count].options[i].option === event.target.value) {
                    this.state.answerList[this.state.count].optionId = this.state.questions[this.state.count].options[i].id;
                }
            }

            if (event.target.value === 'No') {
                this.state.answerList[this.state.count].answer = event.target.value;
                // this.setState({
                //     checkedList:[],
                //     selected:[]
                // })
                let resultArray = this.state.checkedList.filter(CheckedId =>
                    CheckedId !== this.state.answerList[this.state.count].questionId
                )
                let resultSelectedMember = this.state.selected.filter(CheckedId =>
                    CheckedId !== this.state.answerList[this.state.count].questionId
                )
                this.setState({

                    checkedList: resultArray,
                    selected: resultSelectedMember
                })
            }
        } else if ((name === 'radio' || name === 'dropdown') && (code == 'Knockout' || code == 'SMO')) {
            this.state.answerList[this.state.count].answer = event.target.value;
            for (let i = 0; i < this.state.questions[this.state.count].options.length; i++) {
                if (this.state.questions[this.state.count].options[i].option === event.target.value) {
                    this.state.answerList[this.state.count].optionId = this.state.questions[this.state.count].options[i].id;
                }
            }

            if (event.target.value === 'No') {
                this.state.answerList[this.state.count].answer = event.target.value;
                // this.setState({

                //     checkedList:[],
                //     selected:[]
                // })
                let resultArray = this.state.checkedList.filter(CheckedId =>
                    CheckedId !== this.state.answerList[this.state.count].questionId
                )
                let resultSelectedMember = this.state.selected.filter(CheckedId =>
                    CheckedId !== this.state.answerList[this.state.count].questionId
                )
                this.setState({

                    checkedList: resultArray,
                    selected: resultSelectedMember,
                    knockoutList:this.state.knockoutList
                })
            }
        } else {
            this.state.answerList[this.state.count].answer = event.target.value;
            this.state.answerList[this.state.count].optionId = optionId;
        }
        this.setState({
            refresh: true
        }, () => {
            // this.isAllValidHandler();
            this.enableSubmit();
        });
    }

    handleDateChange = (date, index, subindex) => {
        this.state.answerList[this.state.count].relatedQuestionAns[index].relatedSubQuestionAns[subindex].answer = new Date(date);
        this.setState({
            refresh: true,
            dateOfTreatment: true
        }, () => {
            this.isAllValidHandler();
        });
    };




    submitAnswers = () => {
        this.setState({
            loaderShow: true
        });


        axios.get(configuration.baseUrl + '/questionbank/saveNoMember/' + JSON.parse(localStorage.getItem('CurrentLoginUser')).id)
            .then(response => {
                if (this.state.answerList[this.state.count].answer === 'No') {
                    //  this.handleContinue('SUBMIT');
                    if (this.state.questions[this.state.count].question.code === 'Knockout' || this.state.questions[this.state.count].question.code === 'SMO') {
                        this.handleContinue('SUBMIT', "Knockout")
                    } else {
                        //      this.setState({
                        //          disQuailifyModal : false,
                        //          loaderShow: false
                        //      });

                        this.handleContinue('SUBMIT', 'WaitingPeriod')
                    }
                } else if (this.state.answerList[this.state.count].answer === 'Yes' && this.state.answerList[this.state.count].answer.length > 0) {
                    if (this.state.questions[this.state.count].question.code === 'Knockout' || this.state.questions[this.state.count].question.code === 'SMO') {
                        this.handleContinue('SUBMIT', "Knockout")
                    } else {
                        //      this.setState({
                        //          disQuailifyModal : false,
                        //          loaderShow: false
                        //      });

                        this.handleContinue('SUBMIT', 'WaitingPeriod')
                    }
                }
            });
        /*for (let i = 0; i < this.state.answerList.length; i++) {
            for (let j = 0; j < this.state.answerList[i].relatedQuestionAns.length; j++) {
                this.state.answerList[i].relatedQuestionAns[j].answer = this.state.answerList[i].relatedQuestionAns[j].answer.toString();
            }
        }
       
        const data = {
            id: localStorage.getItem('memberId'),
            subId: JSON.parse(localStorage.getItem('CurrentLoginUser')).id,
            memberQuestionAnswers: this.state.answerList,
            /!*bmiList : this.state.bmiData*!/
        };
        if(this._isMounted) {
        this.setState({
            loaderShow: true,
        })
    }
        axios.post(configuration.baseUrl + '/questionbank/saveMemberAnswer', data)
            .then(response => {
                if(this._isMounted) {
                this.checkQualified();
                }
            })
            .catch(error => {
                console.log(error);
            })*/


        /*let obj;
        obj.bmiList  = this.state.bmiData;*/
        // if(this._isMounted) {
        /*this.setState({
            loaderShow: true,
        });
        // }
        axios.post(configuration.baseUrl + '/questionbank/saveMemberBMIList', this.state.bmiData)
            .then(response => {
                if(this._isMounted) {
                this.checkQualified();
                }
            })
            .catch(error => {
                console.log(error);
            })*/

    }

    // checkQualified(){
    //     let subId = JSON.parse(localStorage.getItem('CurrentLoginUser')).id;
    //     axios.get(configuration.baseUrl+'/questionbank/getEligibleMember/'+subId)
    //         .then(response=>{
    //             if(response.data.response){
    //                 if(this._isMounted) {
    //                 if(response.data.response.data && response.data.response.data.length > 0){

    //                     this.setState({
    //                         disQualifiedData:response.data.response,
    //                         loaderShow: false,
    //                         disqualified:true,
    //                         disqual:response.data.reason
    //                     });

    //                 }else{
    //                     this.setState({
    //                         loaderShow: false,
    //                     }, () => {
    //                         this.props.onClick();
    //                     });
    //                 }
    //             }
    //             }else{
    //                 this.setState({
    //                     loaderShow: false,
    //                 }, () => {
    //                     this.props.onClick();
    //                 });
    //             }

    //         })
    //         .catch(error => {
    //             this.setState({
    //                 loaderShow: false,
    //             });
    //         })


    // }
    selectSummary = (event, keyObject, index, subId) => {
        var datas = this.state.datas;
        datas[index] = {
            "memberId": keyObject[0].memberId,
            "limitation": keyObject[0].limitation,
            "flag": event,
            "name": keyObject[0].name,
            "subId": subId
        }
        var checkradio = this.state.checkradio
        checkradio[index] = event;
        this.setState({ datas: datas, checkradio: checkradio, loaderShow: true }, () => {
            axios.post(configuration.baseUrl + "/questionbank/saveWaitingPeriodSummary", datas).then((response) => {
                this.checkQualified()
            })
        })
    }
    checkQualified(){    
        let subId = JSON.parse(localStorage.getItem('CurrentLoginUser')).id;
        let waitingData=[];
        axios.get(configuration.baseUrl+`/questionbank/getWaitingPeriodSummary/${subId}`)
            .then(response=>{
                if(response.data.response && Object.keys(response.data.response).length !== 0){
                    var data=[];
                    Object.keys(response.data.response).map((key, index)=>{

                        key==="knockoutMember" && response.data.response.knockoutMember.length>0 &&
                        response.data.response.knockoutMember.map((knockoutMember)=>
                        data.push({
                            "family member":[<span style={{fontWeight:'500'}}>{knockoutMember.name}</span>], 
                            "reason":[<span style={{fontWeight:'500'}}>{knockoutMember.disease} </span> ],
                            "Eligibility Details":[
                                            <div onChange={(e)=>{}}>
                                            <span style={{fontWeight:'bold', fontSize:'15px'}} >Not Eligibile for enrollment</span>
                                            <div><input type="radio" checked={true}  value={"Exclude"}></input> <span style={{fontWeight:'500'}}>Exclude the family member from the enrollment.</span></div>                              
                                            </div> ]
                        }))

                       key!=="knockoutMember" && data.push({
                            "family member":[<span style={{fontWeight:'500'}}>{key}</span>], 
                            "reason":[
                                response.data.response[key].map((res, i)=>
                                <span style={{fontWeight:'500'}}>{res.disease}{response.data.response[key].length === i+1?".": ","} </span>)
                            ],
                            "Eligibility Details":[
                                            <div onChange={(e)=>this.selectSummary(e.target.value, response.data.response[key], index, subId)}>
                                            {response.data.response[key].map((res, i)=>i==0 &&( 
                                                res.limitation ==="Lifetime"?
                                                <span style={{fontWeight:'bold', fontSize:'15px'}} >{res.limitation}</span> :
                                                <span style={{fontWeight:'bold', fontSize:'15px'}} >
                                                    Initial waiting period of {res.limitation}-years</span>))}
                                            <div><input type="radio" checked={this.state.datas[index] && this.state.datas[index].flag==="Include"} value={"Include"}></input> <span style={{fontWeight:'100'}}>I accept and agree to the initial wait period.</span></div>                            
                                            <div><input type="radio"  checked={this.state.datas[index] && this.state.datas[index].flag==="Exclude"}  value={"Exclude"}></input> <span style={{fontWeight:'100'}}>Exclude the family member from the enrollment.</span></div>                              
                                            </div> ]
                        })
                        key!=="knockoutMember" && waitingData.push(response.data.response[key][0].flag)
                    })
                    if(this._isMounted) {
                    // if(response.data.response.data && response.data.response.data.length > 0){
                        
                        this.setState({
                            sumarryData:response.data.response,
                            disQualifiedData: {
                                "header": [
                                    // "Family Member",
                                    // "Reason for Non Eligibility"
                                    "Family Member",
                                    "Health Condition",
                                    "Eligibility Details and Action Required"
                                ],
                                "data": data,
                                "instruction": [
                                //  <span style={{fontWeight:"bold"}}>"Here is a summary of the eligibility check [TBD]."</span>,
                                 <br></br>,
                                    ["The family members listed alongside are either not eligible for enrollment into the netWell Program or have an initial waiting period. You can choose to exclude members and continue enrolling other members of your family for this program."]
                                ],
                                "flag": false,
                                "questionFlag": true
                            },
                            
                            disqualified:true,
                            disqual:response.data.reason
                        },()=>{
                            axios.get(configuration.baseUrl+`/enrollment/getEnrollMemberBySubId/${subId}`).then((response) => {
                                
                                var datafromWaitingPeriod =[];
                                this.state.datas.map((data) => {
                                    data && datafromWaitingPeriod.push(data) 
                                })
                                console.log("=========responsefromeli 111",response.data.code, waitingData, this.state.datas, datafromWaitingPeriod)

                                if(response.data.code===200 && datafromWaitingPeriod.length === waitingData.length){
                                    this.setState({loaderShow: false, disableProceed:false, waitingData:datafromWaitingPeriod, checkwaitingData:waitingData})
                                }else{
                                    this.setState({loaderShow: false, disableProceed:true, waitingData:datafromWaitingPeriod, checkwaitingData:waitingData })
                                }
                            })
                        });
                    
                    // }else{
                    //     this.setState({
                    //         loaderShow: false,
                    //     }, () => {
                    //         this.props.onClick();
                    //     });
                    // }
                }
                }else{
                    this.setState({
                        loaderShow: false,
                    }, () => {
                        this.props.onClick();
                    });
                }

            })
            .catch(error => {
                this.setState({
                    loaderShow: false,
                });
            })

            
    }

    fourthMethod(e) {
        const re = /^[0-9]*$/;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    }
    firstMethod(e) {
        const re = /^[a-zA-Z]*$/;
        if (!re.test(e.key)) {
            e.preventDefault();
        }
    }


    textChangeHandler = (val, valid, details) => {
        if (valid) {
            this.state.bmiData[details.index][details.name] = val;
            if (details.name === 'feet' || details.name === 'inches') {
                if ((parseInt(this.state.bmiData[details.index].feet) === 0) && parseInt(this.state.bmiData[details.index].inches) === 0) {
                    let evt = new CustomEvent('feet_eligibility', { detail: { flag: true, parentData: details, value: val, index: details.index } });
                    window.dispatchEvent(evt);
                    this.state.bmiData[details.index].heightValid = false;
                } else if (this.state.bmiData[details.index].feet !== "" && this.state.bmiData[details.index].inches !== "") {
                    let evt = new CustomEvent('feet_eligibility', { detail: { flag: false, parentData: details, value: val, index: details.index } });
                    window.dispatchEvent(evt);
                    this.state.bmiData[details.index].heightValid = true;
                }
            }
        } else if (details) {
            this.state.bmiData[details.index][details.name] = '';
        }
        this.setState({
            refresh: true
        }, () => {
            this.enableSubmit()
        });
    }

    enableSubmit = () => {
        /*if(this.state.count === this.state.questions.length-1){
            if(this.state.questions[this.state.count].question.type === 'form'){
                let count = 0;
                for(let i=0; i<this.state.bmiData.length; i++){
                    if(this.state.bmiData[i].heightValid && this.state.bmiData[i].weight && (this.state.bmiData[i].feet === 0 || this.state.bmiData[i].feet) && (this.state.bmiData[i].inches === 0 || this.state.bmiData[i].inches)){
                        count++;
                    }
                }

                if(count === this.state.bmiData.length){
                    this.setState({
                        submitValid : false,
                        backValid : false
                    });   
                } else {
                    this.setState({
                        submitValid : true,
                        backValid : true
                    });
                }
            } else {
                this.setState({
                    submitValid : true,
                    backValid : true
                });
            }
        } else*/
        if (this.state.count !== this.state.questions.length) {
            if (this.state.answerList[this.state.count] && this.state.answerList[this.state.count].answer) {
                if (this.state.answerList[this.state.count].answer === 'Yes') {
                    console.log("answerlist--", this.state.answerList[this.state.count].answer)
                    if (this.state.answerList[this.state.count].answer && this.state.answerList[this.state.count].answer.length > 0) {
                        if (this.state.allQueAnswred) {
                            console.log("validation submit--",this.state.allQueAnswred)
                            this.setState({
                                submitValid: false,
                                backValid: false
                            });
                        } else if (this.state.count === this.state.questions.length - 1) {
                            console.log("this.state.count === this.state.questions.length - 1",this.state.knockoutList.length)
                            // if(this.state.knockoutList.length == 0){
                            //     this.setState({
                            //         submitValid: true,
                            //         backValid: false
                            //     });
                            // }else{
                                this.setState({
                                    submitValid: false,
                                    backValid: false
                                });
                            // }
                            
                        } else {
                            console.log("Else this.state.count === this.state.questions.length - 1",this.state.allQueAnswred)
                            
                            this.setState({
                                submitValid: true,
                                backValid: false
                            });
                        }

                    } else {
                        console.log("answerlist <0",this.state.allQueAnswred)

                        this.setState({
                            submitValid: true,
                            backValid: true
                        });
                    }
                } else if (this.state.answerList[this.state.count].answer === 'No') {
                    if (this.state.allQueAnswred) {
                        console.log("allQueAnswred <0",this.state.allQueAnswred)

                        this.setState({
                            submitValid: false,
                            backValid: false
                        });
                    } else if (this.state.count === this.state.questions.length - 1) {
                        this.setState({
                            submitValid: false,
                            backValid: false
                        });
                    } else {
                        this.setState({
                            submitValid: true,
                            backValid: false
                        });
                    }
                } else {
                    this.setState({
                        submitValid: true,
                        backValid: true
                    });
                }
            } else {
                this.setState({
                    submitValid: true,
                    backValid: true
                });
            }
        } else if (this.state.allQueAnswred) {
            this.setState({
                submitValid: true,
                backValid: false
            });
        } else {
            this.setState({
                submitValid: true,
                backValid: true
            });
        }
    };

    handleContinue = (flag, code) => {

        console.log("flag---", code)
        this.setState({
            loaderShow: false
        });
        let subId = JSON.parse(localStorage.getItem('CurrentLoginUser')).id;
        let idObj = this.state.membersList.find(obj => obj.subId == subId);
        let obj = new Object();
        obj.subId = subId;
        obj.id = idObj.id;
        obj.memberQuestionAnswers = [];
        let ans = JSON.parse(JSON.stringify(this.state.answerList[this.state.count]));
        console.log("ans--", ans)
        if (code == 'Knockout' || code == 'SMO') {
        

            // for(let i=0; i< ans.relatedQuestionAns.length; i++){

            if (ans.answer == 'No') {
                ans.answer = ans.answer.toString()
            } else if (ans.answer == 'Yes') {
                
                let tempArr = this.state.knockoutList.filter(data => data.questionId == ans.questionId)
                if(tempArr){
                    ans.answer = tempArr.map(val => { 
                        return val.id 
                    });
                    ans.answer = ans.answer.toString()
                    console.log("Knockout--", ans.answer.length==1 ? ans.answer.split(','):ans.answer)
                }
                
            }
            // }
            ans.memberDiseaseList = []


            obj.memberQuestionAnswers.push(ans);
        } else if (code == 'WaitingPeriod' || code == 'HealthQuestion') {
           
            for (let i = 0; i < ans.relatedQuestionAns.length; i++) {
                ans.relatedQuestionAns[i].answer = ans.relatedQuestionAns[i].answer.toString();
            }
            if (ans.answer == 'No'){
                ans.answer = ans.answer.toString()
                ans.memberDiseaseList = []
                obj.memberQuestionAnswers.push(ans);

            }else if (ans.answer == 'Yes'){
            ans.memberDiseaseList = []
            console.log(" this.state.selected====", this.state.selected)
            this.state.selected && this.state.selected.forEach(item => {
                if(item.questionId == ans.questionId){
                    ans.memberDiseaseList.push({
                        "diseaseId": item.disease,
                        "memberId": item.id
                    })
                }
                
            });
            obj.memberQuestionAnswers.push(ans);
            }
            
        }
        console.log("obje==", obj)
        let count = 0;
        count = this.state.count + 1
        if (flag === 'SUBMIT') {
            if (this._isMounted) {
                this.checkQualified();
            }
        }
        if (flag === 'NEXT' || flag === 'BUTTON') {
            this.setState({
                disQuailifyModal: false,
                count: this.state.count + 1,
                progress: (this.state.count + 1) / this.state.questions.length * 100,
                loaderShow: false
            }, () => {
                this.isAllValidHandler();
                // this.state.selected=[]
                this.enableSubmit();
            });
        }

        axios.post(configuration.baseUrl + '/questionbank/saveMemberEligibiltyAnswer', obj)
            .then(response => {
                if (response.data.code === 200) {
                    let count = 0;
                    /* if(this.state.count === this.state.questions.length-1){
                         count = this.state.count;
                     } else {
                         count = this.state.count + 1;
                     }
 
                     if(flag === 'SUBMIT'){
                         if(this._isMounted) {
                             this.checkQualified();
                         }
                     } else if (flag === 'NEXT' || flag === 'BUTTON') {
                         this.setState({
                             disQuailifyModal : false,
                             count : this.state.count + 1,
                             progress: (this.state.count + 1) / this.state.questions.length * 100,
                             loaderShow : false
                         }, () => {
                             this.isAllValidHandler();
                             this.enableSubmit();
                         });
                     } else {
                         if(this._isMounted) {
                             this.checkQualified();
                         }
                     }*/
                }
            })
            .catch(error => {
                this.setState({
                    loaderShow: false,
                });
            })
    };

    handleQuite = (code) => {
        this.setState({
            loaderShow: false
        });
        let subId = JSON.parse(localStorage.getItem('CurrentLoginUser')).id;
        let idObj = this.state.membersList.find(obj => obj.subId == subId);
        let obj = new Object();
        obj.subId = subId;
        obj.id = idObj.id;
        obj.memberQuestionAnswers = [];



        let ans = JSON.parse(JSON.stringify(this.state.answerList[this.state.count]));
        if (code == 'Knockout' || code == 'SMO') {
            for (let i = 0; i < ans.relatedQuestionAns.length; i++) {
                ans.relatedQuestionAns[i].answer = this.state.membersList.map(val => { return val.id });
                console.log("Knockout--", ans.relatedQuestionAns[i].answer)
            }
            console.log("Knockout--", ans.relatedQuestionAns)
            ans.memberDiseaseList = []


            obj.memberQuestionAnswers.push(ans);
        } else if (code == 'WaitingPeriod' || code == 'HealthQuestion') {
            for (let i = 0; i < ans.relatedQuestionAns.length; i++) {
                ans.relatedQuestionAns[i].answer = ans.relatedQuestionAns[i].answer.toString();
            }

            ans.memberDiseaseList = []

            this.state.selected && this.state.selected.forEach(item => {
                ans.memberDiseaseList.push({
                    "diseaseId": item.diseaseId,
                    "memberId": item.id.toString()
                })
            });
            obj.memberQuestionAnswers.push(ans);
        }

        this.setState({
            loaderShow: true,
            disQuailifyModal: false
        }, this.checkQualified);
        axios.post(configuration.baseUrl + '/questionbank/saveMemberEligibiltyAnswer', obj)
            .then(response => {
                if (response.data.code === 200) {
                    this.setState({
                        loaderShow: true,
                        disQuailifyModal: false
                    }, this.checkQualified);
                }
            })
            .catch(error => {
                this.setState({
                    loaderShow: false,
                });
            })
    };

    handleSetupFamily = () => {
        this.setState({
            loaderShow: false
        });
    }

    hideModal = () => {
        this.setState({
            loaderShow: false,
            disQuailifyModal: false
        });
    };

    optOutFromEligibility = () => {
        if (this.props.isAgent) {
            this.setState({
                loaderShow: true
            })
            let currentScreen = sessionStorage.getItem('current_screen');
            axios.get(configuration.baseUrl + '/enrollment/saveCompletionStatus/' + JSON.parse(localStorage.getItem('CurrentLoginUser')).id + '/' + currentScreen)
                .then(response => {
                    if (response && response.data.code === 200) {
                        sessionStorage.removeItem('STATE_PARAM');
                        sessionStorage.removeItem('STATE_VAL');
                        sessionStorage.removeItem('CLIENT_ID');
                        sessionStorage.removeItem('CHAT_BOX_Id');
                        cookies.remove("STATE_PARAM", { path: '/' });
                        window.close();
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            this.setState({
                modalOpen: true,
                loaderShow: true
            });
            fetch(configuration.baseUrl + '/enrollment/getOptoutReasons')
                .then((response) => response.json())
                .then(response => {
                    if (response.response) {
                        let opRes = '';
                        let disOtReason = false;
                        let arr = [];
                        let fondobj = response.response.find(obj => obj.reasondCode === 'Family member ineligible');
                        arr.push(fondobj);
                        if (fondobj) {
                            opRes = fondobj.id;
                            disOtReason = false;
                        } else {
                            opRes = '';
                            disOtReason = true;
                        }
                        this.setState({
                            optReasonList: arr,
                            modalOpen: true,
                            optReason: opRes,
                            otherReason: '',
                            formValid: false,
                            loaderShow: false,
                            disOtReason: disOtReason,
                            isValidopt: false,
                            errorText: ''
                        });
                    }
                })
                .catch(error => {
                    this.setState({
                        modalOpen: true,
                        loaderShow: false,
                        optReason: '',
                        otherReason: '',
                        formValid: false,
                        disOtReason: true
                    });
                })
        }
    };

    optoutCancelHandler = () => {
        this.state.optReason = '';
        this.state.otherReason = '';
        this.state.modalOpen = false;
        this.state.formValid = false;
        this.setState({
            refresh: true,
            isValidopt: false,
            errorText: ''
        })
    }

    handleSetFamily = () => {
        this.props.jumpsetupfamily();
    }

    handleExit = () => {
        this.props.jumptoexit();
    }

    optoutSubmitHandler = () => {
        this.setState({
            loaderShow: true,
            modalOpen: false,
        });
        let data = {
            subId: JSON.parse(localStorage.getItem('CurrentLoginUser')).id,
            optReason: this.state.optReason,
            otherReason: this.state.otherReason
        };
        axios.post(configuration.baseUrl + '/enrollment/saveMemberOptout', data)
            .then(response => {
                this.setState({
                    loaderShow: false,
                    msgModal: true
                })
            })
            .catch(error => {
                console.log(error);
            })
    }

    otherOptingReasonChangeHandler = (event, name) => {
        event.preventDefault();
        let txtVal = event.target.value;

        if (txtVal !== '') {
            if (txtVal.match(/^[a-zA-Z ]*$/)) {
                this.setState({ errorText: '', isValidopt: false, otherReason: txtVal, formValid: false });
            } else {
                this.setState({ errorText: 'Please enter valid reason', isValidopt: true, otherReason: txtVal, formValid: true });
            }
        } else {
            this.setState({ errorText: '', isValidopt: false, otherReason: txtVal, formValid: false });
        }
    }

    optingReasonChangeHandler = (event, name) => {
        let value = event.target.value;
        this.state[name] = value;
    }

    handlefamilyChange = (event) => {
        console.log("family---", event.target.value)
        this.setState({ family: event.target.value });
    };

    hideMsgModal = (event) => {
        this.setState({
            msgModal: false,
            loaderShow: true
        });
        let currentScreen = sessionStorage.getItem('current_screen');
        axios.get(configuration.baseUrl + '/enrollment/saveCompletionStatus/' + JSON.parse(localStorage.getItem('CurrentLoginUser')).id + '/' + currentScreen)
            .then(response => {
                if (response && response.data.code === 200) {
                    Auth.signOut();
                    localStorage.clear();
                    sessionStorage.removeItem('STATE_PARAM');
                    sessionStorage.removeItem('STATE_VAL');
                    sessionStorage.removeItem('CLIENT_ID');
                    sessionStorage.removeItem('CHAT_BOX_Id');
                    localStorage.setItem('isLogged', false);
                    sessionStorage.setItem('isLogged', false);
                    cookies.remove("STATE_PARAM", { path: '/' });
                    window.location.href = '/login';
                }
            })
            .catch(error => {
                console.log(error);
            });

    };


    render() {
        // console.log("questions----",this.state.questions[this.state.count].question.type)
        const { classes } = this.props;
        const { value } = this.state;
        const { selectedDate, setSelectedDate } = (new Date());
        let relatedSubQuestions = this.state.questions[this.state.count].question
        let answerField, finishButton, finishLaterButton;
        if (this.state.questions[this.state.count] && this.state.questions[this.state.count].question.type === 'check') {
            answerField = this.state.questions[this.state.count].options.map((key, index) => (
                <div key={index}>0
                    <FormControl component="fieldset">
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={this.state.answerList[this.state.count].answer}
                                        onChange={(event) => this.answerChangeHandler(event, 'check', key.id)}
                                        inputProps={{
                                            'aria-label': 'secondary checkbox',
                                        }}
                                        style={{ color: '#533278' }}></Checkbox>
                                }

                                label={key.option}
                            />
                        </FormGroup>
                    </FormControl>
                </div>
            ))
        } else if (this.state.questions[this.state.count] && this.state.questions[this.state.count].question.type === 'textbox') {
            if (this.state.questions[this.state.count] && this.state.questions[this.state.count].question.subType === 'text') {
                answerField = <div>

                    <CustomeTextField
                        required
                        id="filled-required"
                        label="Enter Text"
                        value={this.state.answerList[this.state.count].answer}
                        style={customeClasses.textField}
                        variant="filled"
                        autoComplete="off"
                        onKeyPress={this.firstMethod}
                        onCopy={this.handlerCopy}
                        onPaste={this.handlerCopy}
                        onChange={(event) => this.answerChangeHandler(event, 'textbox', '')}
                    />

                </div>
            } else if (this.state.questions[this.state.count] && this.state.questions[this.state.count].question.subType === 'date') {
                answerField = <div >
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDatePicker
                            disableToolbar
                            variant="inline"
                            format="MM/dd/yyyy"
                            id="date-picker-inline"
                            label="Date picker inline"
                            onCopy={this.handlerCopy}
                            onPaste={this.handlerCopy}
                            style={customStyle.datePicker}
                            value={this.state.answerList[this.state.count].answer}
                            onChange={this.handleDateChange}
                        />

                    </MuiPickersUtilsProvider>
                </div>
            } else if (this.state.questions[this.state.count] && this.state.questions[this.state.count].question.subType === 'number') {
                answerField = <div>
                    <CustomeTextField
                        required
                        id="filled-required"
                        label="Enter Text"
                        type="number"
                        value={this.state.answerList[this.state.count].answer}
                        style={customeClasses.textField}
                        variant="filled"
                        autoComplete="off"
                        onKeyPress={this.firstMethod}

                        onCopy={this.handlerCopy}
                        onPaste={this.handlerCopy}
                        onChange={(event) => this.answerChangeHandler(event, 'textbox', '')}
                    />
                </div>
            }
        } else if (this.state.questions[this.state.count] && this.state.questions[this.state.count].question.type === 'radio') {
            answerField = <div>
                <RadioGroup aria-label="gender" name="gender1" style={{ display: 'block' }} value={this.state.answerList[this.state.count].answer ? this.state.answerList[this.state.count].answer : ''} onChange={(event) => this.answerChangeHandler(event, 'radio', '', relatedSubQuestions.code)}>
                    {
                        this.state.questions[this.state.count].options.map((key, index) => (
                            <FormControlLabel key={index} value={key.option} control={<PurpleRadio />} label={key.option} />
                        ))
                    }
                </RadioGroup>
            </div>
        } else if (this.state.questions[this.state.count] && this.state.questions[this.state.count].question.type === 'dropdown') {
            answerField = <div>
                <CustomeTextField
                    select
                    label="Select Value"
                    SelectProps={{
                        native: true
                    }}
                    variant="filled"
                    autoComplete="off"
                    onCopy={this.handlerCopy}
                    onPaste={this.handlerCopy}
                    style={customeClasses.selectField}
                    value={this.state.answerList[this.state.count].answer}
                    onChange={(event) => this.answerChangeHandler(event, 'dropdown', '')}
                >
                    <option value="">
                    </option>
                    {this.state.questions[this.state.count].options.map((key, index) => (
                        <option key={index} value={key.option}>
                            {key.option}
                        </option>
                    ))}
                </CustomeTextField>
            </div>
        } /*else if(this.state.questions[this.state.count].question.type === 'form' && this.state.questions[this.state.count].question.code === 'BMI'){
            answerField = this.state.bmiData.map((key, i) => (
                    <Grid xs={12} item={true} key={i} style={{width: '100%', display:'flex',flexDirection:'row'}}>
                        <Grid xs={4} item={true} style={customStyle.bmiName}>
                            {key.name}
                        </Grid>
                        <Grid xs={4} item={true} style={{display:'flex',flexDirection:'row'}}>
                            <div style={customStyle.EnrollNew2Height}>
                                <Sample setChild={this.textChangeHandler.bind(this)} reqFlag={true} name={'Height_Feet' + i} label={'Height (feet)'} value={this.state.bmiData[i].feet} disable={false} style={customStyle.textFieldWrp33} length={2}  fieldType={'feet'} errMsg={'Enter valid height'} helperMsg={'Height required'}  parentDetails={{name:'feet', index : i, id : key.id}}></Sample>
                            </div>
                            <div style={customStyle.EnrollNew2HeightInch}>
                                <Sample setChild={this.textChangeHandler.bind(this)} reqFlag={true} name={'Height_Inch' + i} label={'Height (inches)'} value={this.state.bmiData[i].inches} disable={false} style={customStyle.textFieldWrp11} length={2}  fieldType={'inch'} errMsg={'Enter valid height'} helperMsg={'Height required'}  parentDetails={{name:'inches', index : i, id : key.id}}></Sample>
                            </div>
                        </Grid>
                        <Grid xs={4} item={true}>
                            <div style={customStyle.EnrollNew2Weight}>
                                <Sample setChild={this.textChangeHandler.bind(this)} reqFlag={true} name={'Weight' + i} label={'Weight (pounds)'} value={this.state.bmiData[i].weight} disable={false} style={customStyle.textFieldWrp22} length={3}  fieldType={'num'} errMsg={'Enter valid weight'} helperMsg={'Weight required'}  parentDetails={{name:'weight', index : i, id : key.id}}></Sample>
                            </div>
                        </Grid>
                    </Grid>
                ))

        }*/

        /*finishLaterButton = <WizardButton
            variant="contained" style={customeClasses.finishButton}
            onClick={this.submitAnswers}>{i18n.t('BUTTON.FINISH_LATER')}
            </WizardButton>  */

        finishButton = <WizardButton disabled={this.state.submitValid }
            variant="contained" style={customeClasses.finishButton}
            onClick={this.submitAnswers}>{i18n.t('BUTTON.SUBMIT')}
        </WizardButton>

        let currScreen;
        let relatedQuestions = this.state.questions[this.state.count].disease && this.state.questions[this.state.count].disease ? this.state.questions[this.state.count].disease : [];
        // let relatedSubQuestions = this.state.questions[this.state.count].question && this.state.questions[this.state.count].question.relatedQuestions ? this.state.questions[this.state.count].question.relatedQuestions : [];



        console.log("relatedQuestions.map((val, index)===", relatedSubQuestions.code)


        return (
            <div style={customeClasses.wizContainer}>
                {
                    this.state.loaderShow ? <Loader></Loader> : ''
                }
                <div style={customStyle.w100}>
                    <div>
                        {
                            !this.state.disqualified ?
                                <div>
                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography component="p" style={customeClasses.rowText}>
                                                {/* {this.props.reEnroll? i18n.t('Eligibility.ReEnrollmentTilte'): i18n.t('Eligibility.TITLE')} */}

                                                {
                                                    this.state.isAgent && this.props.reEnroll == false ?
                                                        // i18n.t('Eligibility.AGENTS') 
                                                        <p>We need to confirm that everyone in the family meets eligibility requirements by asking some medical questions. Some medical conditions may exclude one or more family members from sharing program membership. Some information, such as smoking, may result in increased sharing contribution amounts. Please answer these questions as accurately as possible.</p>
                                                        :
                                                        this.state.isAgent && this.props.reEnroll ?
                                                            // i18n.t('Eligibility.REENROLLMENTTITLEAGENT')
                                                            <p>Because you’ve made changes, we need to confirm that everyone
                                                                in the family meets eligibility requirements by asking some medical questions. Some medical conditions may exclude one or more family members from sharing program membership. Some information, such as smoking, may result in increased sharing contribution amounts. Please answer these questions as accurately as possible.</p>
                                                            :
                                                            this.state.isAgent == false && this.props.reEnroll ?

                                                                i18n.t('Eligibility.ReEnrollmentTilte')
                                                                :
                                                                i18n.t('Eligibility.TITLE')
                                                }
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12}>
                                            <LinearProgress variant="determinate" classes={{ colorPrimary: classes.colorPrimary, barColorPrimary: classes.barColorPrimary }} style={classes.progress} value={this.state.progress} />
                                        </Grid>
                                    </Grid>

                                    <Grid container>
                                        <Grid item xs={12}>
                                            <Typography variant="h6" component="h3" style={customeClasses.questionTitleText}>
                                                {this.state.questions[this.state.count].question.title}
                                            </Typography>
                                        </Grid>
                                    </Grid>

                                    <div >
                                        <div >
                                            {/* =================Question==================== */}

                                            <Grid container style={{ alignItems: 'center' }}>
                                                <Grid item xs={10} md={8} lg={7} >
                                                    <div style={customeClasses.questionText}>
                                                        {
                                                            this.state.questions[this.state.count].question.type === 'form' ?
                                                                <div dangerouslySetInnerHTML={{ __html: this.state.questions[this.state.count].question.question }} /> :
                                                                this.state.questions[this.state.count].question.question ? this.state.questions[this.state.count].question.question.replace('SHOW DATE', new Date()) : ''
                                                        }
                                                    </div>
                                                </Grid>
                                                <Grid item xs={6} md={2} lg={2} style={{marginLeft:'15px'}} >
                                                    <div style={customeClasses.answerText}>
                                                        {answerField}
                                                    </div>
                                                </Grid>
                                            </Grid>


                                            {/* ===================List====================== */}
                                            <Grid container>
                                                <Grid item xs={12} md={8} lg={7} style={customeClasses.questionSubtext} >

                                                    {
                                                        this.state.questions[this.state.count].disease ?
                                                            <div>
                                                                {
                                                                    relatedSubQuestions.code == 'WaitingPeriod' ||  relatedSubQuestions.code == 'HealthQuestion'?
                                                                        this.state.questions[this.state.count].question && this.state.questions[this.state.count].disease ? this.state.questions[this.state.count].disease.map((key, index) => (
                                                                            // <li className="listStyle" key={index}>{key}</li>
                                                                            this.state.answerList[this.state.count] && this.state.answerList[this.state.count].answer === 'Yes' ?
                                                                                <FormControl component="fieldset" style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
                                                                                    <Grid item xs={12} md={6} lg={6}>
                                                                                        <FormGroup>
                                                                                            <FormControlLabel style={{ marginBottom: '7px' }}
                                                                                                control={
                                                                                                    <Checkbox
                                                                                                        checked={this.state.checkedList.indexOf(key.diseaseId) >= 0}
                                                                                                        // onClick={(event) => this.dieseaseCheck(event)}
                                                                                                        value={key.disease}
                                                                                                        onChange={(e) => this.onDieseaseSelect(e, key.diseaseId)}
                                                                                                        // inputProps={{
                                                                                                        //     'aria-label': 'secondary checkbox',
                                                                                                        // }}
                                                                                                        style={{ color: '#533278', padding: '0px' }}></Checkbox>
                                                                                                }

                                                                                                label={key.disease}
                                                                                            />
                                                                                        </FormGroup>


                                                                                    </Grid>
                                                                                    {/* </FormControl>: <li className="listStyle" key={index}>{key}</li>
                                                                )) : ''
                                                        }
                                                    </div> : ''
                                            }
                                            </Grid> */}
                                                                                    {/* </Grid> */}



                                                                                    {/* ========================if yes ============================= */}
                                                                                    {/* <Grid container> */}
                                                                                    <Grid item xs={12} md={6} lg={6}>

                                                                                        {
                                                                                            // <div>Srlect</div>
                                                                                            this.state.checkedList.indexOf(key.diseaseId) >= 0 &&
                                                                                            <FormControl fullWidth style={{ width: "100%" }}>
                                                                                                {/* {this.state.family === 
                                                                      "" && ( */}
                                                                                                {
                                                                                                    this.state.selected.filter(obj=>obj.diseaseId == key.id).length  == 0 ?

                                                                                                        <InputLabel id="demo-multiple-name-label"
                                                                                                            style={{ color: "black", transform: "translate(0, 0px) scale(1)" }}>
                                                                                                            Select Family Member*
                                                                                                        </InputLabel>
                                                                                                        :
                                                                                                        ''
                                                                                                }
                                                                                                {/* )}  */}

                                                                                                <Select style={{ marginTop: '0px', lineHeight: '0.5em' }}

                                                                                                    //   value={member.firstName +" " +member.lastName}

                                                                                                    labelId="demo-multiple-name-label"
                                                                                                    multiple
                                                                                                    value={this.state.selected.filter(item => item.diseaseId == key.id)}
                                                                                                    onChange={(e) => this.multiselectAnswerChangeHandler(e, key, index,this.state.questions[this.state.count].question)}
                                                                                                    renderValue={(selected) => selected.map(val => val.firstName + " " + val.lastName).join(", ")}
                                                                                                    disableUnderline={true}
                                                                                                >

                                                                                                    {this.state.membersList.map(
                                                                                                        (member) => (
                                                                                                            <MenuItem value={member} key={key.id + "_" + member.id}>
                                                                                                                <Checkbox

                                                                                                                    style={{ color: "#533278" }}
                                                                                                                    checked={this.state.selected.find(val => val.id === member.id && val.diseaseId == key.id)}

                                                                                                                />
                                                                                                                {member.firstName + " " + member.lastName}
                                                                                                            </MenuItem>
                                                                                                        )
                                                                                                    )}
                                                                                                </Select>
                                                                                            </FormControl>
                                                                                        }

                                                                                    </Grid>
                                                                                </FormControl>
                                                                                :


                                                                                <li className="listStyle" key={index}>{key.disease}</li>


                                                                        )) : ''
                                                                        :

                                                                       (relatedSubQuestions.code == 'Knockout' || relatedSubQuestions.code == 'SMO') && this.state.answerList[this.state.count] && this.state.answerList[this.state.count].answer === 'Yes' ?
                                                                            <Grid container>
                                                                                <Grid item xs={12} md={8} lg={8}>
                                                                                    {/* <FormControl > */}

                                                                                    <div style={customStyle.checkBoxStyle}>
                                                                                        {this.state.knockOutList.map(key => (
                                                                                          this.state.knockOutList.length > 1 && ((relatedSubQuestions.code == 'Knockout' && key.gender =='FEMALE') || (relatedSubQuestions.code == 'SMO')) ?                 
                                                                                            <label key={key.id} value={key.id} style={{ display: 'block', marginBottom: '0px' }}>
                                                                                                <Checkbox
                                                                                                 id={'Knockout'+ key.id + this.state.questions[this.state.count].question.id}   
                                                                                                    inputProps={{
                                                                                                        'aria-label': 'secondary checkbox',

                                                                                                    }}
                                                                                                    style={{ color: '#533278' }}
                                                                                                    checked={this.state.knockoutList.find(val => val.id == key.id && val.questionId ==  this.state.questions[this.state.count].question.id) ? true : false}
                                                                                                    // checked = {this.state.knockoutList.indexOf(key.id) >= 0}
                                                                                                    onChange={event => this.selectKnockOut(event, key,this.state.questions[this.state.count].question,this.state.knockoutList.find(val => val.id == key.id && val.questionId ==  this.state.questions[this.state.count].question.id) ? true : false)}
                                                                                                />
                                                                                                <span style={{ display: 'block', marginLeft: '38px', marginTop: '-31px', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}>{key.firstName + ' ' + key.lastName}</span>
                                                                                            </label>
                                                                                            
                                                                                            :
                                                                                            null
                                                                                        ))}

                                                                                    </div>


                                                                                    {/* </FormControl>  */}
                                                                                </Grid>
                                                                            </Grid>
                                                                            :


                                                                            null

                                                                }



                                                            </div> : ''
                                                    }
                                                </Grid>

                                                {/* static placeholder */}

                                                <Grid item xs={12} md={4} lg={4}>
                                                    {this.state.answerList[this.state.count] &&
                                                        this.state.answerList[this.state.count].answer ===
                                                        "Yes" ? (
                                                        //  <> <ArrowBackIcon/> <span>{message}</span></>
                                                        <>
                                                            <ArrowBackIcon />
                                                            {this.state.count === 3 || this.state.count === 4 ? (
                                                                <span>Please select member.</span>
                                                            ) :
                                                                <span> Please select all applicable diagnoses,
                                                                    <br />
                                                                    <span style={{ margin: "6%" }}>
                                                                        then select member this applies to.
                                                                    </span>
                                                                </span>
                                                            }
                                                        </>
                                                    ) : null}
                                                </Grid>

                                            </Grid>




                                        </div>
                                        {/* ----------------- */}

                                        {this.state.questions[this.state.count].question.instruction !== '' &&
                                            <div style={customeClasses.w30}>
                                                <div style={customeClasses.subTitle}>{i18n.t('ENROLL_NEW.SUB_TITLE')}</div>
                                                <div style={customeClasses.instTxt}>
                                                    {this.state.questions[this.state.count].question.instruction}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                                :
                                <div> <span style={{ fontWeight: "bold" }} > Here is a summary of the eligibility check </span>
                                    <hr style={{ height: "10px", borderWidth: "0", color: "#a9c43b", backgroundColor: "#a9c43b", marginRight: "25px" }}></hr>
                                    <div className={style.disqualifiedWrp}>
                                        <div className={style.disqfTextWrp}>
                                            {
                                                this.state.disQualifiedData.instruction && this.state.disQualifiedData.instruction.map((key, index) => {
                                                    return (
                                                        <span key={index}>{key}</span>
                                                    )
                                                })
                                            }
                                        </div>
                                        <Grid container justify="flex-end">
                                            <Grid xs={12} md={8} lg={8} style={{ paddingLeft: '10px', paddingRight: '25px', tableLayout: 'fixed', paddingBottom: '15px', paddingTop: '15px', maxWidth: '95%', flexBasis: '100%' }} item={true}>
                                                <div style={{ overflowX: "auto" }} >
                                                    <div className={style.disqfTableWrp}>
                                                        <CommonTable quoteData={this.state.disQualifiedData.data} check={true} headerData={this.state.disQualifiedData.header} tooltip={[]} quickQuote={false} totalReq={false} sumarryScreenfromEligibility={true} />
                                                    </div>
                                                </div>
                                            </Grid>
                                        </Grid>


                                    </div>
                                </div>

                        }


                        <Modal size="lg" show={this.state.disQuailifyModal} onHide={(event) => this.hideModal(event)} backdrop="static" centered>
                            <Modal.Header style={customStyle.modal_header} closeButton>

                                <Modal.Title>
                                    <span><img alt="logo" style={{ maxWidth: "15%", maxHeight: "60%", padding: "10px" }} src={require('../../../Assets/Images/alert_round.png')} /></span>
                                    Conditional  Enrollment Waiting Period Applies</Modal.Title>
                            </Modal.Header>
                            <Modal.Body style={{ padding: '5px', textAlign: 'justify', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}>
                                {
                                    this.state.loaderShow ? <Loader></Loader> : ''
                                }
                                <p style={{ paddingLeft: '10px' }} >Waiting period applies for the selected members. Please confirm to proceed </p>
                            </Modal.Body>
                            <Modal.Footer>
                                {/* <WizardButton style={customStyle.m10} onClick={() => this.handleQuite()}>{i18n.t('BUTTON.QUITE')}</WizardButton>
                                <WizardButton onClick={() => this.handleContinue('BUTTON')}>{i18n.t('BUTTON.CONTINUE')}</WizardButton> */}
                                <WizardButton style={customStyle.m10} onClick={() => this.handleExit()}>{i18n.t('EXIT')}</WizardButton>
                                <WizardButton style={customStyle.m10} onClick={() => this.handleSetFamily()}>{i18n.t('Remove member')}</WizardButton>
                                {/* <WizardButton style={customStyle.m10} onClick={() => this.handleContinue('BUTTON')}>{i18n.t('GO TO NEXT SCREEN')}</WizardButton> */}
                                <WizardButton onClick={() => this.handleContinue('BUTTON')}>{i18n.t('BUTTON.CONFIRM')}</WizardButton>
                            </Modal.Footer>
                        </Modal>

                    </div>
                    <div style={customStyle.bottomMainConatiner}>
                        <div style={customStyle.newBottomContainer}>
                            <div style={customStyle.bottomChildContainer1}>

                                {

                                    this.state.disqualified ?

                                        <Grid container>
                                            <Grid item xs={12} sm= {12} md={12} lg={12}>
                                                <div style={{marginTop:40}}>

                                                    <WizardButton
                                                        variant="contained" style={customeClasses.button}
                                                        onClick={(event) => this.onClickBack(event)}
                                                    >{i18n.t('BUTTON.BACK')}
                                                    </WizardButton>
                                                    <WizardButton
                                                        variant="contained" style={this.state.disableProceed || this.state.datas.length !== this.state.checkwaitingData.length ? customeClasses.disabledButton : customeClasses.button}
                                                        disabled={(this.state.disableProceed || this.state.datas.length !== this.state.checkwaitingData.length)}
                                                        onClick={() => { this.props.onClick(this.state.datas) }}
                                                    >{i18n.t('BUTTON.PROCEED_UNDERSTAND')}</WizardButton>
                                                   <WizardButton
                                                variant="contained" style={(!this.state.disableProceed || this.state.datas.length !== this.state.waitingData.length || this.state.datas.length !== this.state.checkwaitingData.length || this.state.waitingData.length===0) ? customeClasses.disabledButtonGotoDashboard : customeClasses.buttonCGoDashboard}
                                                disabled={(!this.state.disableProceed || this.state.datas.length !== this.state.waitingData.length || this.state.datas.length !== this.state.checkwaitingData.length || this.state.waitingData.length===0)}
                                                onClick={()=> window.close()}
                                            >GO TO DASHBOARD</WizardButton>
                                                    {/* <ProceedButton
                                                disabled={false}
                                                variant="contained"
                                                color="primary"
                                                onClick={this.optOutFromEligibility}
                                                style={{width: '302px', height: '40px',marginBottom:'20px'}}
                                                >{this.props.isAgent ? "GO TO DASHBOARD" : i18n.t('BUTTON.NOT_PROCEED')}</ProceedButton> */}
                                                </div>
                                            </Grid>
                                        </Grid>
                                        :
                                        <Grid container xs={12} md={7} lg={7} >
                                            <Grid item xs={4} md={2} lg={2}>


                                                <WizardButton
                                                    variant="contained" style={this.state.count === 0 ? customeClasses.disabledButton : customeClasses.button}
                                                    disabled={this.state.count === 0 || this.state.backValid ? true : false}  /*((this.state.answerList[this.state.count].answer === 'Yes' && this.state.answerList[this.state.count].relatedQuestionAns[0].answer && this.state.answerList[this.state.count].relatedQuestionAns[0].answer.length > 0) )*/
                                                    onClick={this.reduceProgress}>{i18n.t('BUTTON.BACK')}
                                                </WizardButton>
                                            </Grid>
                                            <Grid item xs={4} md={2} lg={2}>
                                                <WizardButton
                                                    variant="contained" style={(this.state.count === this.state.questions.length-1) ? customeClasses.disabledButton : customeClasses.button}

                                                    // disabled={(this.state.count === this.state.questions.length - 1) || (this.state.answerList[this.state.count].answer === 'Yes' &&
                                                    //     this.state.selected.length == 0)}
                                                disabled={this.state.count === this.state.questions.length-1}
                                                    onClick={this.increaseProgress}>{i18n.t('BUTTON.NEXT')}
                                                </WizardButton>
                                            </Grid>
                                            <Grid item xs={4} md={2} lg={2}>
                                                {finishButton}

                                            </Grid>
                                        </Grid>
                                }

                                {/*((this.state.count === this.state.questions.length-1) && (this.state.answerList[this.state.count] && this.state.answerList[this.state.count].answer) && ((this.state.answerList[this.state.count].answer === 'Yes' && this.state.answerList[this.state.count].relatedQuestionAns[0].answer && this.state.answerList[this.state.count].relatedQuestionAns[0].answer.length > 0) || this.state.answerList[this.state.count].answer === 'No' )) ||
                                                    */}
                            </div>
                            <div style={customStyle.bottomChildContainer2}>
                                {/*<div style={customStyle.chatContainer}>
                                <CrudButton  className={'purechat-button-expand'} color="primary" aria-label="add"  style={customStyle.QuickChatBtn}>
                                                    <ForumIcon style={{fontSize : '30px'}} />
                                        </CrudButton>
                                </div>*/}
                            </div>
                        </div>
                        <div style={customStyle.newBottomContainer}>
                            {/*<div style={customStyle.needHelpContainer}>*/}
                            {/*        <div style={{ fontWeight: 'bold' }}>{i18n.t('ENROLL_FAMILY.HELP')}</div>*/}
                            {/*        <div>{i18n.t('ENROLL_FAMILY.SUPPORT')}</div>*/}
                            {/*</div>  */}
                        </div>
                    </div>
                </div>
                <Modal size="xs" show={this.state.modalOpen} onHide={(event) => this.optoutCancelHandler(event)} backdrop="static" centered>
                    <Modal.Header style={customStyle.modal_header} closeButton>
                        <Modal.Title>Opt-out</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ 'maxHeight': '450px', 'overflowY': 'auto', textAlign: 'justify', wordSpacing: '2px' }}>
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }
                        <span style={customStyle.QuickQtTopRightText2}>{i18n.t('ENROLLMENT.TITLE')}</span>
                        <form style={{ marginTop: '10px' }}>
                            <div style={{ flexGrow: 1 }}>
                                <Grid container spacing={2} >
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <FormControl variant="filled" style={{ width: '100%', height: '56px', marginRight: '21px' }}>
                                            <CustomTextField select variant='filled' label='Reason for opting-out ' id="demo-simple-select-filled" value={this.state.optReason} onChange={(event) => this.optingReasonChangeHandler(event)} required>
                                                {
                                                    this.state.optReasonList.map((key, index) => (
                                                        <MenuItem key={key.id} name={key.reasondCode} value={key.id}>{key.reasondCode}</MenuItem>

                                                    ))
                                                }
                                            </CustomTextField>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={6} lg={6}>
                                        <CustomTextField id="filled-required" label="Other reason" margin="normal" variant="filled" autoComplete="off" style={{ width: '100%', margin: 0 }} disabled={this.state.disOtReason} value={this.state.otherReason} onChange={(event) => this.otherOptingReasonChangeHandler(event)} required={false} helperText={this.state.errorText} error={this.state.isValidopt} InputLabelProps={{ style: { color: this.state.isValidopt ? '#FA1515' : '' } }} />
                                    </Grid>
                                </Grid>
                            </div>
                        </form>
                        {/*<form>
                                    <div style={{ display: 'flex', width: '100%',marginTop:'10px' }}>
                                        <div>
                                            <FormControl variant="filled" style={{width: '223px', height: '56px', marginRight: '21px'}}>
                                                <CustomTextField select variant='filled' label='Reason for opting-out ' id="demo-simple-select-filled" value={this.state.optReason} onChange={(event) => this.optingReasonChangeHandler(event)} required>
                                                    {
                                                        this.state.optReasonList.map((key, index) => (
                                                            <MenuItem key={key.id} name={key.reasondCode} value={key.id}>{key.reasondCode}</MenuItem>

                                                        ))
                                                    }
                                                </CustomTextField>
                                            </FormControl>
                                        </div>
                                        <div style={{ width: '100%' }}>

                                        </div>
                                    </div>
                                </form>*/}

                    </Modal.Body>
                    <Modal.Footer>
                        <WizardButton onClick={(event) => this.optoutCancelHandler(event)} style={customStyle.m10}>
                            {i18n.t('BUTTON.CANCEL')}
                        </WizardButton>
                        <WizardButton disabled={this.state.formValid} onClick={this.optoutSubmitHandler} style={customStyle.m10}>
                            {i18n.t('BUTTON.SUBMIT')}
                        </WizardButton>
                    </Modal.Footer>
                </Modal>

                <Modal size="lg" show={this.state.msgModal} onHide={(event) => this.hideMsgModal(event)}>
                    <Modal.Header style={customStyle.modal_header} closeButton>
                        <Modal.Title>Message</Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{ 'maxHeight': '450px', 'overflowY': 'auto', textAlign: 'justify', wordSpacing: '1px' }}>
                        {
                            this.state.loaderShow ? <Loader></Loader> : ''
                        }
                        <div style={{ display: 'inline-block', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}>
                            <div>We regret that Universal HealthShare is currently unable to meet your family's health and wellness care. We would love to see how we can support you. Please call our number 800-921-4505 and talk to one of our representatives. Or, you can chat with a live agent on our website :</div>
                            <a href="https://www.universalhealthfellowship.org" target="_blank" style={{ color: '#533278', fontWeight: 'bold', paddingLeft: '3px', fontFamily: 'Roboto, Arial, Helvetica, sans-serif' }}>https://www.universalhealthfellowship.org</a>.
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <WizardButton onClick={(event) => this.hideMsgModal(event)} style={customStyle.m10}>
                            {i18n.t('BUTTON.OK')}
                        </WizardButton>
                    </Modal.Footer>
                </Modal>

            </div>
        );
    }
};

export default withStyles(styles)(Eligibility);
