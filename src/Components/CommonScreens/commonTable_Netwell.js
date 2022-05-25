import React,{Component} from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, TableCell,Paper, TableBody, TableHead, TableRow, Tooltip, Typography, Button } from '@material-ui/core';
import customStyle from '../../Assets/CSS/stylesheet_UHS';
import Checkbox from '@material-ui/core/Checkbox';

import InfoRoundedIcon from '@material-ui/icons/InfoRounded';
const ACSMCheckbox = withStyles({
    root: {
        color: '#533278',
        "&$checked": {
            color: '#533278',
        },
        "&$disabled": {
            color: 'grey'
        }
    },
    checked: {},
    disabled: {
        color: 'grey'
    }
})(Checkbox);
const HtmlTooltip = withStyles(theme => ({
    tooltip: {
        backgroundColor: '#4a4b57',//theme.palette.common.black,
        border: '1px solid #dadde9',
        fontSize : '12px',
        maxWidth : '500px',
        marginLeft:'75px'
    },
    arrow: {
        color: '#4a4b57',
    },
}))(Tooltip);
const HtmlTooltip1 = withStyles(theme => ({
    tooltip: {
        backgroundColor: '#4a4b57',//theme.palette.common.black,
        border: '1px solid #dadde9',
        fontSize : '12px',
        maxWidth : '500px',
        marginRight:'65px'
    },
    arrow: {
        color: '#4a4b57',
    },
}))(Tooltip);
const useStylesBootstrap = makeStyles(theme => ({
    arrow: {
        color: '#4a4b57',//theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: '#4a4b57',//theme.palette.common.black,
        border: '1px solid #dadde9',
        fontSize : '12px'
    },
}));

function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}

const StyledTableCell = withStyles(theme => (customStyle.tableCell))(TableCell);

const StyledTableRow = withStyles(theme => (customStyle.tableRow))(TableRow);


export default  class commonTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rxchecked: [],
            reEnrollTotal:'',
        }
    }
    handleAddOnRxSimpleShare(e, data, i){
        let  RxSimpleShare= e.target.checked;
        if(RxSimpleShare){
            this.props.addRxSimpleShare(i);
        }else{
            this.props.removeRxSimpleShare(i);
        }
    }
    componentDidMount(){
        if(this.props.reEnroll){
            var reEnrollTotal=parseFloat(this.props.quoteData[this.props.quoteData.length-1].total.replace(/[^\d.-]/g, ''))+15;
            var reEnroll = Number(reEnrollTotal).toFixed(2);
            this.setState({reEnrollTotal:"$"+reEnroll})
        }
    }
    render() {
        return (
            
            <Table  style={{minWidth:'350px', fontFamily : 'Roboto, Arial, Helvetica, sans-serif'}}>
                <TableHead >
                    <TableRow >
                        {this.props.healthTool ?<StyledTableCell></StyledTableCell>:null}
                        {this.props.RxSimpleShare ?<StyledTableCell></StyledTableCell>:null}
                        {
                            this.props.headerData.map((row,index)=>(
                                index === 0?
                                    <StyledTableCell key={index}>{row}</StyledTableCell>
                                    :
                                    row == "Surcharge"?
                                    null
                                //     <StyledTableCell key={index}>
                                //     {row}
                                //     <BootstrapTooltip disableFocusListener title="Surcharge" placement='top'>
                                //                                             <InfoRoundedIcon style={{ color : '#ffffff', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                                //                                             </InfoRoundedIcon>
                                //                                         </BootstrapTooltip>
                                //    </StyledTableCell>  
                                   :
                                    <StyledTableCell key={index} align="left">{row}</StyledTableCell>

                            ))

                        }
                    </TableRow>
                </TableHead>
                <TableBody>

                    {this.props.quoteData.map((row,index,key) => (
                            <StyledTableRow key={index} style={ ( (this.props.totalReq && this.props.ACSM) ? (this.props.quoteData.length - 2 === index || this.props.quoteData.length - 1 === index) : this.props.totalReq ? this.props.quoteData.length - 1 === index : false) ? customStyle.lastRow : customStyle.otherRow}>
                               {this.props.healthTool && <StyledTableCell> 
                                   {
                                ((this.props.totalReq && this.props.ACSM) ? (this.props.quoteData.length - 2 === index || this.props.quoteData.length - 1 === index) : this.props.totalReq ? this.props.quoteData.length - 1 === index : false) ?
                                        null : <ACSMCheckbox
                                                checked={this.props.familyTotal}
                                                inputProps={{'aria-label': 'secondary checkbox',}}
                                                style={{ marginLeft:'-11px' }}/>
                                    }
                                    </StyledTableCell> }
                                    {/*for HEalthTool */}
                                {this.props.RxSimpleShare && <StyledTableCell> 
                                   {((this.props.totalReq && this.props.ACSM) ? (this.props.quoteData.length - 2 === index || this.props.quoteData.length - 1 === index) : this.props.totalReq ? this.props.quoteData.length - 1 === index : false) ?
                                        null : <ACSMCheckbox
                                                checked={row.amount !== "-"}
                                                disabled={!this.props.RxEnable}
                                                inputProps={{'aria-label': 'secondary checkbox',}}
                                                style={{ marginLeft:'-11px' }}
                                                onClick ={(event => this.handleAddOnRxSimpleShare(event, row, index))}/>
                                    }
                                    </StyledTableCell> }{/*for RxSimpleShare*/}
                                {

                                    Object.keys(row).map((keyName, i) => (
                                        
                                        i===0 && this.props.quickQuote === false ?

                                            ( <StyledTableCell key={i} component="th" scope="row"  style={customStyle.cellOverflow1}>

                                                { (this.props.totalReq  && index !== this.props.quoteData.length - 1) || (!this.props.totalReq && index !== this.props.quoteData.length ) ?

                                                    <HtmlTooltip disableFocusListener title={row[keyName]} placement='top'>
                                                        
                                                            <span>
                                                                {
                                                                    row[keyName] && Array.isArray(row[keyName]) ?
                                                                        row[keyName].map((key, index) => {
                                                                            return  <span>
                                                                                {key}
                                                                                </span>
                                                                        })
                                                                        :
                                                                        <span>
                                                                            {row[keyName]}
                                                                        </span>
                                                                }
                                                               </span>
                                                    </HtmlTooltip>

                                                    :
                                                    <span>{row[keyName]}</span>
                                                }
                                            </StyledTableCell>):

                                            i===0 && this.props.quickQuote === true ?
                                                (
                                                    <StyledTableCell key={i} component="th" scope="row"  style={customStyle.cellOverflow}>

                                                        { (this.props.totalReq  && index !== this.props.quoteData.length - 1) || (!this.props.totalReq && index !== this.props.quoteData.length ) ?

                                                            <span>
                                                                {

                                                                    row[keyName] && Array.isArray(row[keyName]) ?
                                                                        row[keyName].map((key, index) => {
                                                                            return  <span>{key}</span>
                                                                        })
                                                                        :
                                                                        <span>
                                                                            {row[keyName]}
                                                                            { this.props.quickQuote === true && this.props.tooltip[index] ?

                                                                                <BootstrapTooltip disableFocusListener title={this.props.tooltip[index]} placement='top'>
                                                                                    <InfoRoundedIcon style={{ color : '#4a4b57', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                                                                                    </InfoRoundedIcon>
                                                                                </BootstrapTooltip>
                                                                                :
                                                                                ''
                                                                            }
                                                                        </span>
                                                                }
                                                               </span>

                                                            :
                                                            <span>
                                                                { row[keyName]}
                                                            </span>


                                                        }
                                                    </StyledTableCell>
                                                )
                                                :
                                                keyName !="surcharge"?
                                                <StyledTableCell key={i} align="left" style={customStyle.cellOverflow1} >
                                                    {
                                                        row[keyName] && Array.isArray(row[keyName]) ?
                                                            <div style={{display:'flex',flexDirection:'column'}}>
                                                                {
                                                                    row[keyName].map((key, index) => {
                                                                        return  <span key={index}>{key}</span>
                                                                    })
                                                                }
                                                            </div>

                                                            :
                                                            <span>
                                                                {keyName=='surcharge' ?
                                                                null
                                                                :

                                                               keyName=='amount' && this.props.check ==false ?
                                                                '-'
                                                                :
                                                                row[keyName]
                                                            }
                                                            </span>
                                                    }
                                                    {!this.props.quickQuote &&  this.props.tooltip.length > 0 && (this.props.tooltip[index] && this.props.tooltip[index].length > 0) && this.props.headerData.length-1===i && this.props.check &&
                                                    <HtmlTooltip1
                                                        placement='top'
                                                        title={
                                                            <React.Fragment>
                                                                <Typography color="inherit" style={{borderBottom : '1px solid #4a4b57', width : '100%'}}>Surcharges</Typography>
                                                                <div style={{display:'flex',flexDirection:'column'}}>
                                                                    {
                                                                        this.props.tooltip[index] && this.props.tooltip[index].map((key,j)=>{
                                                                            return(
                                                                                <span style={{ marginTop : '5px'}} key={j}>{j+1}. {key}</span>
                                                                            )
                                                                        })
                                                                    }
                                                                </div>
                                                            </React.Fragment>
                                                        }>
                                                        <InfoRoundedIcon style={{ color : '#4a4b57', marginBottom: "3px", marginLeft: "5px"}} fontSize="small"></InfoRoundedIcon>
                                                    </HtmlTooltip1>
                                                    }</StyledTableCell>
                                                    :
                                                    null
                                    ))
                                }
                            </StyledTableRow>
                        ),
                    )}
                    {this.props.reEnroll ? 
                    <StyledTableRow style={{ borderBottom : '2px solid #420045',}}>
                        <StyledTableCell style={{backgroundColor:'#EAE8DB'}}>Monthly Payment</StyledTableCell>
                        <StyledTableCell colSpan={this.props.headerData.length-2} style={{backgroundColor:'#EAE8DB'}}>(Includes UHF monthly membership dues per household of $11)</StyledTableCell>
                        <StyledTableCell>{this.state.reEnrollTotal}</StyledTableCell>
                    </StyledTableRow>: null}
                </TableBody>
            </Table>
            
        )
    }

}


