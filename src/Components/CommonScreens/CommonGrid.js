import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { Table, Tooltip,TableCell, TableBody, TableHead, TableRow } from '@material-ui/core';


import customStyle from '../../Assets/CSS/stylesheet_UHS';
import InfoRoundedIcon from '@material-ui/icons/InfoRounded';


const useStylesBootstrap = makeStyles(theme => ({
    arrow: {
        color: '#4a4b57',//theme.palette.common.black,
    },
    tooltip: {
        backgroundColor: '#fa6446',//theme.palette.common.black,
        border: '1px solid #dadde9',
        fontSize : '12px'
    },
}));
function BootstrapTooltip(props) {
    const classes = useStylesBootstrap();

    return <Tooltip arrow classes={classes} {...props} />;
}
const StyledTableCell = withStyles(theme => (customStyle.tableCellNew))(TableCell);
const StyledTableCell1 = withStyles(theme => (customStyle.tableCell1))(TableCell);

const StyledTableRow = withStyles(theme => (customStyle.tableRowNew))(TableRow);

function createData(NAME, AFA1, AFA2, AFA3, AFA4,AFA5,AFA6) {
    return { NAME, AFA1, AFA2, AFA3, AFA4,AFA5,AFA6 };
  }
  const row1=[
    createData('Non-Sharable Amount (NSA) Per Member	', '$1,000', '$1,500', '$2,500', '$5,000','$5,000','$6,000'),
    createData('Non-Sharable Amount (NSA) for 2 Persons	', '$2,000', '$3,000','$5,000','$10,000','$10,000','$12,000'),
    createData('Non-Sharable Amount (NSA) for 3 or more	', '$3,000','$4,500	','$7,500','$15,000','$15,000','$18,000'),
  ];
  const row2=[
    createData('Application Fee	', '$75	','$75	','$75	','$75	','$75	','$75	'),
    createData('UHF Monthly Membership Dues	', '$15	','$15	','$15	','$15	','$15	','$15	'),
  ];
  const row3=[
    createData('Sharing Program Restrictions', 'Waiting period of 12 months for maternity and 90 days for all other services. Restricted sharing for pre-existing conditions. Elective cosmetic surgery is not eligible for sharing.'),
    createData('Sharable Amount Limit (facility & professional) per Medical Incident ', '$400,000','$300,000','$250,000	','$200,000	','$150,000	','$100,000'),
    createData('Sharing Program Maximums per Member  ', 'Nine (9) visit maximum for any combination of Primary Care, Specialist and Urgent Care. Nine (9) visit maximum for pre-natal care.'),
    createData('Annual Sharing Maximum Per Member	', '$900,000','$700,000	','$500,000	','$400,000	','$300,000	','$200,000'),
  ];
  const row4=[
    createData('Telemedicine - Unlimited per Member, available 24/7	', '$0 Consultation Fee','$0 Consultation Fee','$0 Consultation Fee','$0 Consultation Fee','$0 Consultation Fee','$0 Consultation Fee','$0 Consultation Fee'),
    createData('Annual Physical / Wellness Exam and Preventive Services  	', 'Members are eligible for one (1) Routine Physical/Wellness Exam per year after 90 days of continuous membership. Limit of Sharing Amount for Routine Physical, Wellness Exam and Preventive Care services combined is $500 per member per year.'),
    createData('Primary Care - Office Visit  	  	', '$0 Consult Fee','$0 Consult Fee','$0 Consult Fee','$0 Consult Fee','$0 Consult Fee','$0 Consult Fee','$0 Consult Fee'),
    createData('Specialty Care - Office Visit  	  	', '$50 Consult Fee','$50 Consult Fee','$50 Consult Fee','$50 Consult Fee','$50 Consult Fee','$50 Consult Fee','$50 Consult Fee'),
    createData('Urgent Care ', '$75 Consult Fee','$75 Consult Fee','$75 Consult Fee','$75 Consult Fee','$75 Consult Fee','$75 Consult Fee','$75 Consult Fee'),
  ];
  const row5=[
    createData('Emergency Room ','$300 Consult Fee','$300 Consult Fee','$300 Consult Fee','$300 Consult Fee','$300 Consult Fee','$300 Consult Fee','$300 Consult Fee'),
    createData('Therapy - Physical, Occupational, Speech, Chiropractic ','$25 Consult Fee','$25 Consult Fee','$25 Consult Fee','$25 Consult Fee','$25 Consult Fee','$25 Consult Fee','$25 Consult Fee'),
  ];
  const row6=[
    createData('Hospitalization ','85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA' ),
    createData('Surgery ','85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA'),
    createData('Maternity - Labor & Delivery','85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA'),
  ];
  const rows = [
    {id:1,name:'Physician and Ancillary services', ans:'In Network Only - Arizona Foundation Medical Care (AFMC)'},
    {id:2,name:'Hospital  ',ans: 'Open'},
     
     {id:3,name:'Non-Sharable Amount (NSA) Per Member', ans:['$1,000','$1,500', '$2,500', '$5,000','$5,000','$6,000']},
    {id:4,name:'Non-Sharable Amount (NSA) for 2 Persons	',ans:['$2,000', '$3,000','$5,000','$10,000','$10,000','$12,000']},
    {id:5,name:'Non-Sharable Amount (NSA) for 3 or more	', ans:['$3,000','$4,500	','$7,500','$15,000','$15,000','$18,000']},
    {id:5,name:'Application Fee	', ans:['$75	','$75	','$75	','$75	','$75	','$75	']},
    {id:6,name:'UHF Monthly Membership Dues	', ans:['$15	','$15	','$15	','$15	','$15	','$15	']},
    {id:7,name:'Sharing Program Restrictions', ans:'Waiting period of 12 months for maternity and 90 days for all other services. Restricted sharing for pre-existing conditions. Elective cosmetic surgery is not eligible for sharing.'},
    {id:8,name:'Sharable Amount Limit (facility & professional) per Medical Incident ', ans:['$400,000','$300,000','$250,000	','$200,000	','$150,000	','$100,000']},
    {id:9,name:'Sharing Program Maximums per Member  ', ans:'Nine (9) visit maximum for any combination of Primary Care, Specialist and Urgent Care. Nine (9) visit maximum for pre-natal care.'},
    {id:10,name:'Annual Sharing Maximum Per Member	', ans:['$900,000','$700,000	','$500,000	','$400,000	','$300,000	','$200,000']},
    {id:11,name:'Telemedicine - Unlimited per Member, available 24/7	', ans:['$0 Consultation Fee','$0 Consultation Fee','$0 Consultation Fee','$0 Consultation Fee','$0 Consultation Fee','$0 Consultation Fee']},
    {id:12,name:'Annual Physical / Wellness Exam and Preventive Services  	', ans:'Members are eligible for one (1) Routine Physical/Wellness Exam per year after 90 days of continuous membership. Limit of Sharing Amount for Routine Physical, Wellness Exam and Preventive Care services combined is $500 per member per year.'},
    {id:13,name:'Primary Care - Office Visit', ans:['$0 Consult Fee','$0 Consult Fee','$0 Consult Fee','$0 Consult Fee','$0 Consult Fee','$0 Consult Fee']},
    {id:14,name:'Specialty Care - Office Visit', ans:['$50 Consult Fee','$50 Consult Fee','$50 Consult Fee','$50 Consult Fee','$50 Consult Fee','$50 Consult Fee']},
    {id:15,name:'Urgent Care ', ans:['$75 Consult Fee','$75 Consult Fee','$75 Consult Fee','$75 Consult Fee','$75 Consult Fee','$75 Consult Fee']},
    {id:16,name:'Emergency Room ',ans:['$300 Consult Fee','$300 Consult Fee','$300 Consult Fee','$300 Consult Fee','$300 Consult Fee','$300 Consult Fee']},
    {id:17,name:'Therapy - Physical, Occupational, Speech, Chiropractic ',ans:['$25 Consult Fee','$25 Consult Fee','$25 Consult Fee','$25 Consult Fee','$25 Consult Fee','$25 Consult Fee']},
    {id:18,name:'Hospitalization ',ans:['85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA' ]},
    {id:19,name:'Surgery ',ans:['85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA']},
    {id:20,name:'Maternity - Labor & Delivery',ans:['85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA']},
    {id:21,name:'Pharmaceuticals',ans:'Prescription drugs are only eligible for sharing when provided by a hospital as part of inpatient treatment or provided by a facility during an outpatient surgical procedure.'},
    {id:22,name:'Diagnostics Accessed Via Non-Hospital Only',ans:['85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA','85% After NSA']},
    {id:23,name:'Non-Sharable Amount'},
  ];
  
  const headCells = [
     { id: 'programname', numeric: false, disablePadding: true, label: 'Program Name' },
    { id: 'AFA1', numeric: true, disablePadding: false, label: 'AFA1' },
    { id: 'AFA2', numeric: true, disablePadding: false, label: 'AFA2' },
    { id: 'AFA3', numeric: true, disablePadding: false, label: 'AFA3' },
    { id: 'AFA4', numeric: true, disablePadding: false, label: 'AFA4' },
    { id: 'AFA5', numeric: true, disablePadding: false, label: 'AFA5' },
    { id: 'AFA6', numeric: true, disablePadding: false, label: 'AFA6' },
  ];
  
const style1={
    backgroundColor:'rgb(234, 232, 219)',borderBottom : '2px solid #420045'
};
const style2={
    backgroundColor:'rgb(51, 175, 176)',borderBottom : '2px solid #420045',textAlign:'center'
}
class GridLayout extends React.Component {

    componentDidMount() {
    }

    render(){
        let answer=rows.map((rw)=>{
            return rw.ans
        });
        let data=[];
        for (const [index, value] of answer.entries()) {
            data.push({value})
          }
        
        return(
            <div>
              <Table aria-label="customized table" 
              style={{overflow: 'auto', maxHeight: '400px',display:'block'}}>
               <TableHead style={{backgroundColor:'#420045',position: 'sticky'
                }}>
               <TableRow style={{position: 'sticky'}} key={1}>
               
                {headCells.map((headCell,index) => ( 
                
                            <StyledTableCell1 style={{fontFamily:'Palatino Linotype, Book Antiqua, Palatino, serif',fontSize:'24px',position: 'sticky',border:'2px solid #ffffff' 
                          }} padding='checkbox' align='center' key={index} > 
                               {headCell.label}
                            </StyledTableCell1>
                           
               ))}
            
 

             </TableRow>

                </TableHead> 

                <TableBody >
                <StyledTableRow align='center' style={customStyle.rowHead} key={2}>
                    <StyledTableCell1  align="center" colSpan={7} style={customStyle.cellHead} key={3}>
                        Provider Networks                
                  </StyledTableCell1>
            </StyledTableRow>
            <StyledTableRow style={{backgroundColor:'rgb(234, 232, 219)',border:'2px solid #ffffff',fontColor:'#420045'}} key={4}>
              <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
              Physician and Ancillary services
              <BootstrapTooltip disableFocusListener title="This network access shall be limited to the AFMC's physician and ancillary network providers, including: Physicians, Laboratory, Pathology, Urgent Care and Radiology facilities. In-Network Providers can be found in the CarynHealth Provider Search in the Member Portal." placement='right'>
                <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                </InfoRoundedIcon></BootstrapTooltip>

              </StyledTableCell>
              <StyledTableCell align="center" colSpan={6} style={customStyle.cellChild} >
                  In Network Only - Arizona Foundation Medical Care (AFMC)
                  <br></br>  
                  (Search for Doctors/Providers - <a href="https://www.azfmc.com/providersearch" target="_blank" style={{color:'#533278',fontWeight:'bold', paddingLeft : '3px'}}> https://www.azfmc.com/providersearch</a>)
              </StyledTableCell>
              </StyledTableRow>
             
                <StyledTableRow style={{backgroundColor:'rgb(234, 232, 219)',border:'2px solid #ffffff'}} key={5}>
                <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                Hospital
                <BootstrapTooltip disableFocusListener title="Elective cosmetic surgery is not eligible for sharing. There is a maximum shared amount per hospital admission based on the sharing program selected. All outpatient imaging and diagnostic services must be procured at a free-standing diagnostic center unless received as an admitted patient. Pre-authorization is required for all hospital admissions except for a case of a true emergency." placement='right'>
                <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                </InfoRoundedIcon></BootstrapTooltip>
              </StyledTableCell>
              <StyledTableCell align="center" colSpan={6} style={customStyle.cellChild} >Open</StyledTableCell>
             
        </StyledTableRow>
        <StyledTableRow align='center' style={customStyle.rowHead} key={6}>
            <StyledTableCell1  align="center" colSpan={7} style={customStyle.cellHead} >Non-Sharable Amount
        <BootstrapTooltip disableFocusListener title="Non-Sharable Amounts must be met in full before medical expenses can be shared, except where noted in the Sharing Program Guidelines.
" placement='right'>
                <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                </InfoRoundedIcon></BootstrapTooltip>
          </StyledTableCell1>
        </StyledTableRow>
        {row1.length > 0 && row1.map((row,index) => (
                    
         <StyledTableRow align="left" style={{backgroundColor:'rgb(234, 232, 219)',border : '2px solid #ffffff'}} key={index}>
                <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                {/* Non-Sharable Amount (NSA) Per Member */}
                {row.NAME}
              </StyledTableCell>
              <StyledTableCell align="center" style={customStyle.cellChild}  >{row.AFA1}</StyledTableCell>
                            <StyledTableCell align="center" style={customStyle.cellChild} >{row.AFA2}</StyledTableCell>
                            <StyledTableCell align="center" style={customStyle.cellChild}>{row.AFA3}</StyledTableCell>
                            <StyledTableCell align="center" style={customStyle.cellChild} >{row.AFA4}</StyledTableCell>
                            <StyledTableCell align="center" style={customStyle.cellChild} >{row.AFA5}</StyledTableCell>
                            <StyledTableCell align="center" style={customStyle.cellChild} >{row.AFA6}</StyledTableCell>
             
        </StyledTableRow>                                
        ))}
        <StyledTableRow align='center' style={customStyle.rowHead} key={8}>
            <StyledTableCell1  align="center" colSpan={7} style={customStyle.cellHead} >Application Fee and Monthly Membership Dues</StyledTableCell1></StyledTableRow>
        {row2.map((row,index) => (
                    
                    <StyledTableRow align="left" style={{backgroundColor:'rgb(234, 232, 219)',border : '2px solid #ffffff'}} key={index}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           
                           {row.NAME}
                         </StyledTableCell>
                         <StyledTableCell align="center" style={customStyle.cellChild}>{row.AFA1}</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>{row.AFA2}</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >{row.AFA3}</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >{row.AFA4}</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >{row.AFA5}</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >{row.AFA6}</StyledTableCell>
                        
                   </StyledTableRow>                                
                   ))}
                    <StyledTableRow align='center' style={customStyle.rowHead} key={9}>
                    <StyledTableCell1  align="center" colSpan={7} style={customStyle.cellHead} >
                       Benefits Restrictions and Maximums
                    </StyledTableCell1> 
                     </StyledTableRow>
        
                    
                    <StyledTableRow  style={{backgroundColor:'rgb(234, 232, 219)',border : '2px solid #ffffff'}} key={10}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                           Sharing Program Restrictions
                           <BootstrapTooltip disableFocusListener title="The sharing programs have a waiting period of 90 days that applies to sharing for all medical services, except maternity. This 90 day waiting period will count toward any specific sharing program waiting period (pre-existing conditions, etc.). In addition to this waiting period, there is restrictive sharing for pre-existing medical conditions. Pre-existing conditions are defined in the Sharing Guidelines." placement='right'>
                        <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                        </InfoRoundedIcon></BootstrapTooltip>
                        <BootstrapTooltip disableFocusListener title="Sharing for pre-existing medical conditions is limited, as follows, from the date of sharing program membership: (a) First year of membership - no sharing, (b) Second and third year of sharing - eligible for sharing up to $50,000, (c) Starting with the fourth membership (sharing program) year, a condition is no longer considered pre-existing. A pre-existing condition is any condition at the time of enrollment that has exhibited symptoms, or received treatment or medication in the past 36 months." placement='right'>
                        <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                        </InfoRoundedIcon></BootstrapTooltip>
                         </StyledTableCell>
                         <StyledTableCell align="center" colSpan={6} style={customStyle.cellChild}>
                             Waiting period of 12 months for maternity and 90 days for all other services. Restricted sharing for pre-existing conditions. Elective cosmetic surgery is not eligible for sharing.</StyledTableCell>
                                       
                        
                   </StyledTableRow>                                

                   <StyledTableRow  style={{border:'2px solid #ffffff'}} key={11}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle} >
                           Sharable Amount Limit (facility & professional) per Medical Incident
                           <BootstrapTooltip disableFocusListener title="Medical Incident means, a medically diagnosed condition and all medical treatment(s) received and medical expenses incurred relating to that particular diagnosis of such condition (i.e., all medical bills of any nature relating to the same diagnosis are part of the same Medical Incident)." placement='right'>
                          <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                          </InfoRoundedIcon></BootstrapTooltip>
                          <BootstrapTooltip disableFocusListener title="Sharing for pre-existing medical conditions is limited, as follows, from the date of sharing program membership: (a) First year of membership - no sharing, (b) Second and third year of sharing - eligible for sharing up to $50,000, (c) Starting with the fourth membership (sharing program) year, a condition is no longer considered pre-existing. A pre-existing condition is any condition at the time of enrollment that has exhibited symptoms, or received treatment or medication in the past 36 months." placement='right'>
                          <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                          </InfoRoundedIcon></BootstrapTooltip>
                         </StyledTableCell>
                         <StyledTableCell align="center" style={customStyle.cellChild}>$400,000</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>$300,000</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>$250,000</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>$200,000</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>$150,000</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>$100,000</StyledTableCell>
                        
                   </StyledTableRow>                                

                   <StyledTableRow style={{border: '2px solid #ffffff'}} key={12}>
                           <StyledTableCell component="th" scope="row" style={{fontColor:'#420045',backgroundColor:'#f0c8a0',fontFamily:'Palatino Linotype, Book Antiqua, Palatino, serif',border: '2px solid #ffffff'}}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                           Sharing Program Maximums per Member
                           <BootstrapTooltip disableFocusListener title="Sharing for pre-existing medical conditions is limited, as follows, from the date of sharing program membership: (a) First year of membership - no sharing, (b) Second and third year of sharing - eligible for sharing up to $50,000, (c) Starting with the fourth membership (sharing program) year, a condition is no longer considered pre-existing. A pre-existing condition is any condition at the time of enrollment that has exhibited symptoms, or received treatment or medication in the past 36 months." placement='right'>
                          <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                          </InfoRoundedIcon></BootstrapTooltip>
                         </StyledTableCell>
                         <StyledTableCell align="center" colSpan={6} style={{fontFamily:'Palatino Linotype, Book Antiqua, Palatino, serif',fontColor:'#420045',backgroundColor:'#fae6be'}}>Nine (9) visit maximum for any combination of Primary Care, Specialist and Urgent Care. Nine (9) visit maximum for pre-natal care.</StyledTableCell>
                                       
                        
                   </StyledTableRow>   
                   <StyledTableRow style={{border: '2px solid #ffffff'}} key={13}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           Annual Sharing Maximum Per Member
                         </StyledTableCell>
                         <StyledTableCell align="center" style={customStyle.cellChild} >$900,000</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>$700,000</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>$500,000</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>$400,000</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>$300,000</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>$200,000</StyledTableCell>
                        
                   </StyledTableRow>                                
                   	
                   <StyledTableRow align='center' style={customStyle.rowHead} key={14}><StyledTableCell1  align="center" colSpan={7} style={customStyle.cellHead} >Eligible Services - Prior to Meeting NSA
                   <BootstrapTooltip disableFocusListener title="Emergency room cost sharing is only intended for treatment of medical conditions that are life threatening or could seriously jeopardize the health of the individual.  If the member is admitted to the hospital, the consult fee will be applied to the NSA." placement='right'>
                  <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                  </InfoRoundedIcon></BootstrapTooltip>
                    </StyledTableCell1></StyledTableRow>
                   {/* {row4.map((row) => ( */}
                    
                    <StyledTableRow style={{border : '2px solid #ffffff'}} key={15}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                          
                           Telemedicine - Unlimited per Member, available 24/7
                           </StyledTableCell>	
                         <StyledTableCell align="center" style={customStyle.cellChild}>
                             $0 
                                        Consultation Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $0 
                                        Consultation Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $0 
                                        Consultation Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $0 
                                        Consultation Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $0 
                                        Consultation Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $0 
                                        Consultation Fee	</StyledTableCell>
                        
                   </StyledTableRow>     
                   
                   <StyledTableRow style={{border : '2px solid #ffffff'}} key={16}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                           Annual Physical / Wellness Exam and Preventive Services  	
                           <BootstrapTooltip disableFocusListener title="Annual Physical and Wellness Exam has a 90 day waiting period before eligible for sharing.  Other waiting periods may apply.  Please consult Sharing Guidelines for details. The sharing program shares a maximum $500 per member per year for physical, wellness exams and other preventive services." placement='right'>
                          <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                          </InfoRoundedIcon></BootstrapTooltip>

                         </StyledTableCell>
                         <StyledTableCell align="center" colSpan={6} style={customStyle.cellChild}>Members are eligible for one (1) Routine Physical/Wellness Exam per year after 90 days of continuous membership. 
                                       Limit of Sharing Amount for Routine Physical, Wellness Exam and Preventive Care services combined is $500 per member per year.

                                       </StyledTableCell>                                      
                        
                   </StyledTableRow>     
                   <StyledTableRow style={{border: '2px solid #ffffff'}} key={17}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                          
                           Primary Care - Office Visit  	
                           <BootstrapTooltip disableFocusListener title="A maximum of nine (9) visits per year per member will be shared among any combination of the primary care, specialty care, and urgent care categories. Annual Physical/Wellness Exam visit is not included in these 9 visits." placement='right'>
                            <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                            </InfoRoundedIcon></BootstrapTooltip>
                           </StyledTableCell>	
                         <StyledTableCell align="center" style={customStyle.cellChild} >
                             $0 
                                        Consult Fee		</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $0 
                                        Consult Fee		</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $0 
                                        Consult Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild} >
                             $0 
                                        Consult Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $0 
                                        Consult Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild} >
                             $0 
                                        Consult Fee	</StyledTableCell>
                        
                   </StyledTableRow>      
                   <StyledTableRow style={{border : '2px solid #ffffff'}} key={18}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                          
                           Specialty Care - Office Visit 
                           <BootstrapTooltip disableFocusListener title="A maximum of nine (9) visits per year per person will be shared among any combination of the primary care, specialty care, and urgent care categories.  Annual Physical/Wellness Exam visit is not included in these 9 visits." placement='right'>
                            <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                            </InfoRoundedIcon></BootstrapTooltip>

                           </StyledTableCell>	
                         <StyledTableCell align="center" style={customStyle.cellChild}>
                             $50 
                                        Consult Fee		</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $50 
                                        Consult Fee		</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $50 
                                        Consult Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $50 
                                        Consult Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $50 
                                        Consult Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $50 
                                        Consult Fee	</StyledTableCell>
                        
                   </StyledTableRow>

                   <StyledTableRow style={{border : '2px solid #ffffff'}} key={19}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                          
                           Urgent Care  	
                           <BootstrapTooltip disableFocusListener title="A maximum of nine (9) visits per year per person will be shared among any combination of the primary care, specialty care, and urgent care categories.  Annual Physical/Wellness Exam visit is not included in these 9 visits." placement='right'>
                          <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                          </InfoRoundedIcon></BootstrapTooltip>
                           </StyledTableCell>	
                         <StyledTableCell align="center" style={customStyle.cellChild} >
                             $75 
                                        Consult Fee		</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild} >
                             $75 
                                        Consult Fee		</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $75 
                                        Consult Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $75 
                                        Consult Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $75 
                                        Consult Fee	</StyledTableCell>
                                        <StyledTableCell align="center" style={customStyle.cellChild}>
                             $75 
                                        Consult Fee	</StyledTableCell>
                        
                   </StyledTableRow>                      

                   <StyledTableRow align='center' style={customStyle.rowHead} key={20}>
                       <StyledTableCell1  align="center" colSpan={7} style={customStyle.cellHead} >
            Physician Services - After Meeting NSA</StyledTableCell1></StyledTableRow>
        {/* {row5.map((row) => ( */}
                    
                    <StyledTableRow style={{border : '2px solid #ffffff'}}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                           {/* {row.NAME} */}
                           Emergency Room
                           <BootstrapTooltip disableFocusListener title="Emergency room cost sharing is only intended for treatment of medical conditions that are life threatening or could seriously jeopardize the health of the individual.  If the member is admitted to the hospital, the consult fee will be applied to the NSA." placement='right'>
                <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                </InfoRoundedIcon></BootstrapTooltip>
                <BootstrapTooltip disableFocusListener title="Elective cosmetic surgery is not eligible for sharing. There is a maximum shared amount per hospital admission based on the sharing program selected. All outpatient imaging and diagnostic services must be procured at a free-standing diagnostic center unless received as an admitted patient. Pre-authorization is required for all hospital admissions except for a case of a true emergency." placement='right'>
                <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                </InfoRoundedIcon></BootstrapTooltip>
                         </StyledTableCell>
                         <StyledTableCell align="center" style={customStyle.cellChild} >$300 Consult Fee	</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >$300 Consult Fee	</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}  >$300 Consult Fee	</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >$300 Consult Fee	</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >$300 Consult Fee	</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >$400 Consult Fee	</StyledTableCell>
                        
                   </StyledTableRow>                                
                   {/* ))} */}

                   <StyledTableRow style={{border : '2px solid #ffffff'}} key={21}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}
>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                           {/* {row.NAME} */}
                           Therapy - Physical, Occupational, Speech, Chiropractic  	
                           <BootstrapTooltip disableFocusListener title="Physical Therapy and Chiropractic combined sessions are limited to twelve (12) per member per year, Speech and Occupational Therapy combined are limited to ten (10) per member per year   * Therapies may be sharable only if they are directly related to the treatment of a disease or injury, but not for general wellness or maintenance purposes.   Please consult Sharing Guidelines for details." placement='right'>
                <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                </InfoRoundedIcon></BootstrapTooltip>
                
                         </StyledTableCell>
                         <StyledTableCell align="center" style={customStyle.cellChild} >$25 Consult Fee	</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >$25 Consult Fee	</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >$25 Consult Fee	</StyledTableCell>
                                       <StyledTableCell align="center"  style={customStyle.cellChild}>$25 Consult Fee	</StyledTableCell>
                                       <StyledTableCell align="center"  style={customStyle.cellChild}>$25 Consult Fee	</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >$25 Consult Fee	</StyledTableCell>
                        
                   </StyledTableRow>                                

                   <StyledTableRow align='center' style={customStyle.rowHead} key={22}>
                       <StyledTableCell1  align="center" colSpan={7} style={customStyle.cellHead} >
                        Inpatient Hospital Services - Except for Maternity has a 90 day Waiting Period and After Meeting NSA
                  </StyledTableCell1></StyledTableRow>
                {/* {row6.map((row) => ( */}
                    
                    <StyledTableRow style={{border : '2px solid #ffffff'}} key={23}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                           {/* {row.NAME} */}
                           Hospitalization  
                           <BootstrapTooltip disableFocusListener title="Elective cosmetic surgery is not eligible for sharing. There is a maximum shared amount per hospital admission based on the sharing program selected. All outpatient imaging and diagnostic services must be procured at a free-standing diagnostic center unless received as an admitted patient. Pre-authorization is required for all hospital admissions except for a case of a true emergency." placement='right'>
                          <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                          </InfoRoundedIcon></BootstrapTooltip>
                         </StyledTableCell>
                         <StyledTableCell align="center" style={customStyle.cellChild}>85% After NSA	</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >80% After NSA</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>75% After NSA</StyledTableCell>
                                       <StyledTableCell align="center"  style={customStyle.cellChild}>70% After NSA</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >65% After NSA</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >60% After NSA</StyledTableCell>
                        
                   </StyledTableRow>                                
                   {/* ))} */}
                   <StyledTableRow style={{border : '2px solid #ffffff'}} key={24}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                           {/* {row.NAME} */}
                           Surgery    
                           <BootstrapTooltip disableFocusListener title="Elective cosmetic surgery is not eligible for sharing. There is a maximum shared amount per hospital admission based on the sharing program selected. All outpatient imaging and diagnostic services must be procured at a free standing diagnostic center unless received as an admitted patient. Pre-authorization is required for all hospital admissions except for a case of a true emergency." placement='right'>
                          <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                          </InfoRoundedIcon></BootstrapTooltip>
                         </StyledTableCell>
                         <StyledTableCell align="center" style={customStyle.cellChild} >85% After NSA	</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >80% After NSA</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>75% After NSA</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >70% After NSA</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >65% After NSA</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >60% After NSA</StyledTableCell>
                        
                   </StyledTableRow>                                
                   <StyledTableRow style={{border: '2px solid #ffffff'}} key={25}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                           {/* {row.NAME} */}
                           Maternity - Labor & Delivery  
                           <BootstrapTooltip disableFocusListener title="There is a 12 month waiting period for maternity sharing once sharing program membership begins. Maternity sharing is limited to $5000 for normal delivery, $8000 for c-section and $50,000 for complications. Prenatal visits are limited to 9 and are available 90 days after sharing program membership begins." placement='right'>
                          <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                          </InfoRoundedIcon></BootstrapTooltip>	    
                         </StyledTableCell>
                         <StyledTableCell align="center" style={customStyle.cellChild}>85% After NSA	</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >85% After NSA</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>85% After NSA</StyledTableCell>
                                       <StyledTableCell align="center"  style={customStyle.cellChild}>85% After NSA</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >85% After NSA</StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild} >85% After NSA</StyledTableCell>
                        
                   </StyledTableRow>                                
                   <StyledTableRow align='center' style={{backgroundColor:'#8c1442',fontColor:'#ffffff'}} key={26}><StyledTableCell1  align="center" colSpan={7} style={{textAlign:'center',fontColor:'#ffffff',fontSize:'18px',border:'2px solid #ffffff',fontFamily:'Palatino Linotype, Book Antiqua, Palatino, serif'}} >
                       Pharmacy</StyledTableCell1></StyledTableRow>                    
                   <StyledTableRow style={{border : '2px solid #ffffff'}} key={27}>
                           <StyledTableCell component="th" scope="row" style={{fontColor:'#420045',backgroundColor:'#f0c8a0',fontFamily:'Palatino Linotype, Book Antiqua, Palatino, serif',border : '2px solid #ffffff'}}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                           Pharmaceuticals

                         </StyledTableCell>
                         <StyledTableCell align="center" colSpan={6} style={{fontFamily:'Palatino Linotype, Book Antiqua, Palatino, serif',fontColor:'#420045',backgroundColor:'#fae6be'}}>Prescription drugs are only eligible for sharing when provided by a hospital as part of inpatient treatment or provided by a facility during an outpatient surgical procedure.
                                       </StyledTableCell>
                                       
                        
                   </StyledTableRow>     

                   <StyledTableRow align='center' style={customStyle.rowHead} key={28}>
                       <StyledTableCell1  align="center" colSpan={7} style={customStyle.cellHead} >
                       Diagnostics and Tests
                    </StyledTableCell1></StyledTableRow>                    
                   <StyledTableRow style={{border : '2px solid #ffffff'}} key={29}>
                           <StyledTableCell component="th" scope="row" style={customStyle.cellTitle}>
                           {/* Non-Sharable Amount (NSA) Per Member */}
                           Diagnostics Accessed Via Non-Hospital Only  	
                           <BootstrapTooltip disableFocusListener title="Elective cosmetic surgery is not eligible for sharing. There is a maximum shared amount per hospital admission based on the sharing program selected. All outpatient imaging and diagnostic services must be procured at a free standing diagnostic center unless received as an admitted patient. Pre-authorization is required for all hospital admissions except for a case of a true emergency." placement='right'>
                          <InfoRoundedIcon style={{ color : '#fa6446', marginBottom: "3px", marginLeft: "5px"}} fontSize="small">
                          </InfoRoundedIcon></BootstrapTooltip>
                         </StyledTableCell>
                         <StyledTableCell align="center" style={customStyle.cellChild}>85% 
                                       After NSA	
                                       </StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>80%
                                       After NSA	
                                       </StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>75%
                                       After NSA	
                                       </StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>70%
                                       After NSA	
                                       </StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>65%
                                       After NSA	
                                       </StyledTableCell>
                                       <StyledTableCell align="center" style={customStyle.cellChild}>60%
                                       After NSA	
                                       </StyledTableCell>
                         
                        
                   </StyledTableRow>     

                   <StyledTableRow align='center' style={customStyle.rowHead} key={30}>
                       <StyledTableCell1  align="center" colSpan={7} style={customStyle.cellHead} >
                       Please refer to the Sharing Guidelines for definitive rules and guidelines. In case of any discrepancies, the Sharing Guidelines will prevail.
                  </StyledTableCell1>
            </StyledTableRow>

        </TableBody>


                </Table>

            </div>

        )
    }
}
export default GridLayout;