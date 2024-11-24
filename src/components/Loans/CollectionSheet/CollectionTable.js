import React from 'react';
import TableHeader from './TableHeader';

const CollectionTable = ({sheet, setSheet, params}) => {
  if (!sheet || !sheet?.installments) {
    return <div></div>
  }

  const columnHeaders = Object.keys(sheet.installments[0]);

  return (
    <>
      <TableHeader
        tableName='Collection Sheet'
        length={sheet.installments.length}
        totalCount={sheet.count}
        pageNum={sheet.number}
        numOfpages={sheet.num_of_pages}
        nextPage={sheet.next_page_num}
        params={params}
        prevPage={sheet.prev_page_num}
        setData={setSheet}
        url='/reportsapi/collection_sheet/'
      />
      <div className='table-container' style={{padding:'0', border:'none'}}>
        <div className='table-responsive font-12' style={{maxHeight:'600px'}}>
          <table className='table' style={{width:'100%'}} id='loans-report'>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'>
                {columnHeaders.map(header => (
                  <th key={header}>{COLUMNS[header]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sheet.installments.map((installment, index) => {
                return (
                  <tr key={index}>
                    {columnHeaders.map(header => <td key={header}>{installment[header]}</td>)}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

const COLUMNS = {
  installment_principal: 'Installment_Principal',
  installment_interest: 'Installment_Interest',
  installment_fees: 'Installment_Fees',
  installment_penalty: 'Installment_Penalty',

  installment_principal_due: 'Installment_Principal_Balance',
  installment_interest_due: 'Installment_Interest_Balance',
  installment_fees_due: 'Installment_Fees_Balance',
  installment_penalty_due: 'Installment_Penalty_Balance',

  installment_principal_arrears: 'Principal_In_Arrears',
  installment_interest_arrears: 'Interest_In_Arrears',
  installment_fees_arrears: 'Fees_In_Arrears',
  installment_penalty_arrears: 'Penalty_In_Arrears',
  min_date: 'Oldest_Installment_Date',
  max_date: 'Newest_Installment_Date',

  client_name: 'Client_Name',
  client_phone_number: 'Client_Phone_Number',
  group_name: 'Group_Name',
  group_phone_number: 'Group_Phone_Number',
  original_principal: 'Applied_Amount',
  principal: 'Principal',
  interest: 'Interest',
  penalty: 'Penalty',
  fees: 'Fees',

  principal_balance: 'Principal_Balance',
  interest_balance: 'Interest_Balance',
  penalty_balance: 'Penalty_Balance',
  fees_balance: 'Fees_Balance',

  loan_id: 'Loan_ID',
  currency: 'Currency',
  loan_number: 'Loan_Number',
  disbursement_date: 'Disbursement_Date',
  application_date: 'Application_Date',
  entry_date: 'Entry_Date',
  first_repayment_date: 'First_Repayment_Date',
  maturity_date: 'Maturity_Date',
  loan_status: 'Loan_Status',

}

export default CollectionTable;
export {COLUMNS};