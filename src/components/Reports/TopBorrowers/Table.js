import React, {useState} from 'react';
import Row from './Row';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import Header from './Header';

const Table = ({report, currencyIso, minDate, maxDate, selectedBranches, changeOrder, order, disableSelect}) => {
    const [showLoans, setShowLoans] = useState(false);

    const getStrDate = (date) => {
      const mydate = new Date(date);
      const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mydate.getMonth()];
      return `${month} ${mydate.getDate()}, ${mydate.getFullYear()}`;
    }
  
    const getFileName = () => {
      if (minDate != '' && maxDate != '') {
        return `${currencyIso} Borrowers Report for Theocash from ${getStrDate(minDate)} to ${getStrDate(maxDate)}`
      }
      if (minDate == '' && maxDate != '') {
        return `${currencyIso} Borrowers Report for Theocash upto ${getStrDate(maxDate)}`
      }
      if (minDate != '' && maxDate == '') {
        return `${currencyIso} Borrowers Report for Theocash from ${getStrDate(minDate)}`
      }
      return `${currencyIso} Borrowers Report for Theocash all time.`
    }

    return (
        <>
            <div style={{display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"2rem"}}>
                <div style={{display:"flex", alignItems:"center", columnGap:"1rem"}}>
                    <Header changeOrder={changeOrder} order={order} disableSelect={disableSelect} />
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
                            <tr>
                                <td colSpan={12} title={selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)} className='text-bold text-left' style={{whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden', maxWidth: '5px'}}>
                                Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={12} className='text-bold text-left'>Currency: {currencyIso}</td>
                            </tr>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>{`Extracted On: ${new Date()}`}</td>
                            </tr>
                            {report.map((client, idx) => <Row key={client.id} idx={idx} client={client} currencyIso={currencyIso} showLoans={showLoans}/>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Table;