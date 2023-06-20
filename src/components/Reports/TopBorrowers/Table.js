import React, {useState} from 'react';
import Row from './Row';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({report, intValues, loggedInUser, currency}) => {
    const [showLoans, setShowLoans] = useState(false);
  
    const getFileName = () => {
      if (intValues.min_date != '' && intValues.max_date != '') {
        return `${currency} Borrowers Report for ${loggedInUser.company_name} from ${intValues.min_date} to ${intValues.max_date}`
      }
      if (intValues.min_date == '' && intValues.max_date != '') {
        return `${currency} Borrowers Report for ${loggedInUser.company_name} upto ${intValues.max_date}`
      }
      if (intValues.min_date != '' && intValues.max_date == '') {
        return `${currency} Borrowers Report for ${loggedInUser.company_name} from ${intValues.min_date}`
      }
      return `${currency} Borrowers Report for ${loggedInUser.company_name} all time.`
    }

    return (
        <>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"2rem"}}>
                <div style={{display:"flex", alignItems:"center", columnGap:"1rem"}}>
                    <div style={{display:"flex", alignItems:"center", columnGap:"5px"}}>
                        <span>Expand</span>
                        <input type='checkbox' checked={showLoans} onChange={_=> setShowLoans(curr => !curr)}/>
                    </div>
                </div>
                <div>
                    <ReactHTMLTableToExcel
                        id='test-table-xls-button'
                        className='download-table-xls-button btn btn-default'
                        table='borrowers-report'
                        filename={getFileName()}
                        sheet='tablexls'
                        buttonText='Download as XLS'
                    />
                </div>
            </div>
            <div className="table-container" style={{padding:"0", paddingTop:"1.5rem", border:"none"}}>
                <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                    <table className="table table-hover" id='borrowers-report' style={{width:"100%"}}>
                        <thead className="clients-report-table">
                            <tr className="journal-details fees__report_thead">
                                <th className="text-left">#</th>
                                <th className="text-left">Client</th>
                                <th className="text-right">Branch Client</th>
                                <th className="text-right">Total Principal Borrowed</th>
                                <th className="text-right">Current Principal At Risk</th>
                            </tr>
                        </thead>
                        <tbody> 
                            <tr>
                                <td colSpan={12} className='text-bold text-left'>Borrowers Report</td>
                            </tr>
                            <tr>
                                <td colSpan={12} title={getFileName()} className='text-bold text-left' style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '5px'}}>
                                {getFileName()}
                                </td>
                            </tr>
                            {/* <tr>
                                <td colSpan={12} title={selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)} className='text-bold text-left' style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '5px'}}>
                                Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                                </td>
                            </tr> */}
                            <tr>
                                <td colSpan={12} className='text-bold text-left'>Currency: {currency}</td>
                            </tr>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>{`Extracted On: ${new Date()}`}</td>
                            </tr>
                            {report.report.map((client, idx) => <Row key={client.id} idx={idx} client={client} currency={currency} showLoans={showLoans}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Table;