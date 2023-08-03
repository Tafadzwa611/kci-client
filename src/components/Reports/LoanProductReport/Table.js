import React from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({report}) => {
  return (
    <>
      <div style={{display: 'flex', justifyContent: 'flex-end', marginTop: '2rem'}}>
        <ReactHTMLTableToExcel
          id='test-table-xls-button'
          className='btn btn-default'
          table='lp-report'
          filename='Product Report'
          sheet='tablexls'
          buttonText='Download as XLS'
        />
      </div>
      <div className='table-container' style={{padding:'0', paddingTop:'1.5rem', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' style={{width:'100%'}} id='lp-report'>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'>
                <th style={{textAlign:'right'}}>Product_Name</th>
                <th style={{textAlign:'right'}}>Interest_Method</th>
                <th style={{textAlign:'right'}}>Client_Type</th>
                <th style={{textAlign:'right'}}>Currency</th>
                <th style={{textAlign:'right'}}>Total_Loans_Released</th>
                <th style={{textAlign:'right'}}>Total_Principal_Released</th>
                <th style={{textAlign:'right'}}>Current_Principal_At_Risk</th>
                <th></th>
                <th style={{textAlign:'right'}}>Principal</th>
                <th style={{textAlign:'right'}}>Interest</th>
                <th style={{textAlign:'right'}}>Fees</th>
                <th style={{textAlign:'right'}}>Penalty</th>
                <th style={{textAlign:'right'}}>Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{textAlign:'right'}}>{report.name}</td>
                <td style={{textAlign:'right'}}>{report.interest_method}</td>
                <td style={{textAlign:'right'}}>{report.client_type}</td>
                <td style={{textAlign:'right'}}>{report.currency}</td>
                <td style={{textAlign:'right'}}>{report.loan_count}</td>
                <td style={{textAlign: 'right'}}>{report.sum_principal}</td>
                <td style={{textAlign: 'right'}}>{report.sum_principal_due}</td>
                <td className='text-bold text-red text-right'>Amount:</td>
                <td className='text-bold text-red text-right'>{report.sum_principal}</td>
                <td className='text-bold text-red text-right'>{report.sum_interest}</td>
                <td className='text-bold text-red text-right'>{report.sum_fees}</td>
                <td className='text-bold text-red text-right'>{report.sum_penalty}</td>
                <td className='text-bold text-red text-right '>{report.total_amount}</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td className='text-bold text-green' style={{textAlign:'right'}}>Total_Payments:</td>
                <td className='text-bold text-green' style={{textAlign: 'right'}}>{report.sum_principal_paid}</td>
                <td className='text-bold text-green' style={{textAlign: 'right'}}>{report.sum_interest_paid}</td>
                <td className='text-bold text-green' style={{textAlign: 'right'}}>{report.sum_fees_paid}</td>
                <td className='text-bold text-green' style={{textAlign: 'right'}}>{report.sum_penalty_paid}</td>
                <td className='text-bold text-green ' style={{textAlign:'right'}}>{report.total_paid}</td>
              </tr>
              <tr>
                <td style={{textAlign:'right'}}  className='last__row__border'></td>
                <td style={{textAlign:'right'}}  className='last__row__border'></td>
                <td style={{textAlign:'right'}}  className='last__row__border'></td>
                <td style={{textAlign:'right'}}  className='last__row__border'></td>
                <td style={{textAlign:'right'}}  className='last__row__border'></td>
                <td style={{textAlign:'right'}} className='last__row__border'></td>
                <td style={{textAlign:'right'}} className='last__row__border'></td>
                <td className='text-bold last__row__border' style={{textAlign:'right', width:'9%'}}>Net_Due:</td>
                <td className='text-bold last__row__border' style={{textAlign:'right', fontWeight:'bold'}}>{report.sum_principal_due}</td>
                <td className='text-bold last__row__border' style={{textAlign:'right', fontWeight:'bold'}}>{report.sum_interest_amount_due}</td>
                <td className='text-bold last__row__border' style={{textAlign:'right', fontWeight:'bold'}}>{report.sum_fees_due}</td>
                <td className='text-bold last__row__border' style={{textAlign:'right', fontWeight:'bold'}}>{report.sum_penalty_due}</td>
                <td className='text-bold last__row__border' style={{textAlign:'right', fontWeight:'bold'}}>{report.total_due}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Table;