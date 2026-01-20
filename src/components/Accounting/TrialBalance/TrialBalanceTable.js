import React, { useEffect, useState } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Margin, usePDF } from 'react-to-pdf';

const TrialBalanceTable = ({trialBalance}) => {
  const [omitZeroBalances, setOmitZeroBalances] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const { toPDF, targetRef } = usePDF({
    filename: 'trial-balance.pdf',
    page: { margin: Margin.MEDIUM, orientation: 'landscape' },
  });

  useEffect(() => {
    if (omitZeroBalances) {
      setAccounts(trialBalance.accounts.filter(account => Number(account.balance) != 0));
    }else {
      setAccounts(trialBalance.accounts);
    }
  }, [omitZeroBalances, JSON.stringify(trialBalance)]);

  return (
    <div className='col-12 font-12'>
      <div style={{marginTop:'40px', border:'none', padding:'0'}} className='trial_balance_table_container'>
        <div style={{float:'left', margin:'20px', marginLeft:'0', marginTop:'0', display:'flex', flexDirection:'row', alignItems:'center', columnGap:'10px'}}>
          <div style={{ display: 'flex', columnGap: '5px' }}>
            <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='download-table-xls-button btn btn-default'
              table='trial-balance'
              filename={`${trialBalance.currency} Trial Balance for ${trialBalance.company_name} as on ${trialBalance.maxDate}`}
              sheet='tablexls'
              buttonText='Download as XLS'
            />
            <button className='btn btn-default' onClick={toPDF}>Download as PDF</button>
          </div>
          <div style={{marginTop:'12px'}}>
            <input type='checkbox' checked={omitZeroBalances} onChange={() => setOmitZeroBalances(!omitZeroBalances)} style={{marginRight:'5px'}}/>
            <label> Omit Accounts with zero balances</label>
          </div>
        </div>
        <div className='table-responsive' style={{maxHeight:'1000px'}} ref={targetRef}>
          <table className='table' style={{width:'100%'}} id='trial-balance'>
            <thead className='clients-report-table'>
              <tr className='journal-details fees__report_thead'>
                <th>Account</th>
                <th>Branch</th>
                <th>Account Type</th>
                <th>Opening Balance</th>
                <th>Debits({trialBalance.currency} {trialBalance.total_debits})</th>
                <th>Credits({trialBalance.currency} {trialBalance.total_credits})</th>
                <th>Net Change</th>
                <th>Closing Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><b>{trialBalance.currency} Trial Balance</b></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              <tr>
                <td><b>{trialBalance.company_name} as at {trialBalance.maxDate}</b></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
              {accounts.map((account, index) => {
                return (
                  <tr key={index}>
                    <td style={{textAlign:'start'}}>{account.account_name}</td>
                    <td style={{textAlign:'start'}}>{account.branch_name || 'Consolidated'}</td>
                    <td style={{textAlign:'start'}}>{account.account_type}</td>
                    <td className='trial-balance-text-color' style={Number(account.balance_at_opening) >= 0 ? {background: 'rgb(127, 255, 0) none repeat scroll 0% 0%', textAlign: 'center'}: {background: 'rgb(255, 182, 193) none repeat scroll 0% 0%', textAlign: 'center'}}>
                      {account.balance_at_opening}
                    </td>
                    <td style={{textAlign:'start'}}>{account.range_debits}</td>
                    <td style={{textAlign:'start'}}>{account.range_credits}</td>
                    <td style={{textAlign:'start'}}>{account.net_change}</td>
                    <td className='trial-balance-text-color' style={Number(account.balance_at_closing) >= 0 ? {background: 'rgb(127, 255, 0) none repeat scroll 0% 0%', textAlign: 'center'}: {background: 'rgb(255, 182, 193) none repeat scroll 0% 0%', textAlign: 'center'}}>
                      {account.balance_at_closing}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default TrialBalanceTable;