import React, {useState, Fragment} from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({report, currency}) => {
  const [showLoans, setShowLoans] = useState(false);

  return (
    <>
      <div style={{display:'flex', justifyContent:'space-between'}}>
        <div style={{display:'flex', alignItems:'center', columnGap:'10px'}}>
          <div style={{display:'flex', alignItems:'center', columnGap:'5px'}}>
            <span>Expand</span>
            <input type='checkbox' checked={showLoans} onChange={() => setShowLoans(curr => !curr)}/>
          </div>
        </div>
      </div>
      <TableHeader/>
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table table-hover' id='borrowers-report' style={{width:'100%'}}>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'>
                <th className='text-left'>#</th>
                <th className='text-left'>Client</th>
                <th className='text-right'>Branch Client</th>
                <th className='text-right'>Total Principal Borrowed ({currency})</th>
                <th className='text-right'>Oustanding Principal ({currency})</th>
                <th className='text-right'>Maturity Date</th>
              </tr>
            </thead>
            <tbody>
              {report.borrowers.map((client, idx) => (
                <Fragment key={idx}>
                  <tr className='journal-details'>
                    <td style={{textAlign: 'left'}}><p style={{fontWeight: 'bold'}}>{idx+1}</p></td>
                    <td style={{textAlign: 'left'}}>{client.fullname}</td>
                    <td style={{textAlign: 'right'}}>{client.branch}</td>
                    <td style={{textAlign: 'right'}}>{client.sum_principal}</td>
                    <td style={{textAlign: 'right'}}>{client.sum_principal_amount_due}</td>
                    <td style={{textAlign: 'right'}}>{client.maturity_date}</td>
                  </tr>
                  {showLoans ? client.loans.map((loan, loanIdx) => {
                    return (
                      <tr key={`${idx}${loanIdx}`}>
                        <td></td>
                        <td></td>
                        <td style={{textAlign: 'right'}}>{loan.loan_id} <small className={statusClasses[loan.status]} style={{margin: '3px'}}>{loan.status}</small></td>
                        <td style={{textAlign: 'right'}}>{loan.principal}</td>
                        <td style={{textAlign: 'right'}}>{loan.principal_amount_due}</td>
                        <td style={{textAlign: 'right'}}>{loan.maturity_date}</td>
                      </tr>
                    )
                  }) : null}
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

const TableHeader = () => {
  return (
    <div className='table-header' style={{marginTop:'1rem'}}>
      <div style={{display:'flex', columnGap:'10px', alignItems:'center'}}>
        <div>
          <ReactHTMLTableToExcel
            id='test-table-xls-button'
            className='btn btn-default'
            table='borrowers-report'
            filename='borrowers-report'
            sheet='tablexls'
            buttonText='Download as XLS'
          />
        </div>
      </div>
    </div>
  )
}

const statusClasses = {
  'Fully Paid': 'badge badge-success',
  'Early Settlement': 'badge badge-success',
  'Restructured': 'badge badge-dark',
  'Processing': 'badge badge-info-lighter',
  'Arrears': 'badge badge-danger',
  'Approved': 'badge badge-info-light',
  'Open': 'badge badge-info',
  'Over Paid': 'badge badge-warning',
  'Defaulted': 'badge badge-danger',
  'Rejected': 'badge badge-danger',
  'Written-Off': 'badge badge-dark',
};

export default Table;