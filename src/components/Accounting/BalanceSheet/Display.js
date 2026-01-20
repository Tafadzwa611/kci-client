import React from 'react'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { Margin, usePDF } from 'react-to-pdf';

const Display = ({report}) => {
  const { toPDF, targetRef } = usePDF({
    filename: 'balance-sheet.pdf',
    page: { margin: Margin.MEDIUM, orientation: 'landscape' },
  });

  const groupedAssetAccs = report.grouped_accounts.ASSET;
  const groupedLiabilityAccs = report.grouped_accounts.LIABILITY;
  const groupedEquityAccs = report.grouped_accounts.EQUITY;

  const assetAccs = report.ungrouped_accounts.filter(acc => acc.type === 'ASSET');
  const liabAccs = report.ungrouped_accounts.filter(acc => acc.type === 'LIABILITY');
  const equityAccs = report.ungrouped_accounts.filter(acc => acc.type === 'EQUITY');

  return (
    <div style={{paddingTop: '17px'}}>
      <div className='cardone card-success card-outline' style={{paddingTop: '17px'}}>
        <div className='table-responsive no-padding'>
          <div className='col-sm-12'>
            <div style={{marginBottom:'1rem', display: 'flex', columnGap: '5px'}}>
              <ReactHTMLTableToExcel
                id='test-table-xls-button'
                className='download-table-xls-button btn btn-default'
                table='balance-sheet'
                filename={`${report.currency} Balance Sheet for ${report.company_name} as at ${report.report_date}`}
                sheet='tablexls'
                buttonText='Download as XLS'
              />
              <button className='btn btn-default' onClick={toPDF}>Download as PDF</button>
            </div>
            <div ref={targetRef}>
              <table id='balance-sheet' className='table table-bordered table-condensed table-hover'>
                <thead>
                  <tr className='journal-details header'>
                    <th>GL Code</th>
                    <th>Account Branch</th>
                    <th>Account Name</th>
                    <th>Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>{report.currency} - Balance Sheet</b></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td><b>{report.company_name} as on {report.report_date}</b></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  {Object.keys(groupedAssetAccs).map((headerAccountName, idx) => (
                    <GroupedAccounts key={idx} headerAccountName={headerAccountName} detailAccounts={groupedAssetAccs[headerAccountName]}/>
                  ))}
                  {assetAccs.map((acc, idx) => <DetailAccount key={idx} acc={acc} />)}
                  <tr>
                    <td></td>
                    <td></td>
                    <td><b>TOTAL ASSETS</b></td>
                    <td><b>{report.total_assets}</b></td>
                  </tr>
                  {Object.keys(groupedLiabilityAccs).map((headerAccountName, idx) => (
                    <GroupedAccounts key={idx} headerAccountName={headerAccountName} detailAccounts={groupedLiabilityAccs[headerAccountName]}/>
                  ))}
                  {liabAccs.map((acc, idx) => <DetailAccount key={idx} acc={acc} />)}
                  <tr>
                    <td></td>
                    <td></td>
                    <td><b>TOTAL LIABILITIES</b></td>
                    <td><b>{report.total_liabs}</b></td>
                  </tr>
                  {Object.keys(groupedEquityAccs).map((headerAccountName, idx) => (
                    <GroupedAccounts key={idx} headerAccountName={headerAccountName} detailAccounts={groupedEquityAccs[headerAccountName]}/>
                  ))}
                  {equityAccs.map((acc, idx) => <DetailAccount key={idx} acc={acc} />)}
                  <tr>
                    <td></td>
                    <td></td>
                    <td><b>TOTAL EQUITY</b></td>
                    <td><b>{report.total_equity}</b></td>
                  </tr>
                  <tr>
                    <td></td>
                    <td></td>
                    <td><b>EQUITY + LIABILITIES</b></td>
                    <td><b>{report.total_equity_and_liab}</b></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const DetailAccount = ({acc}) => {
  return (
    <tr>
      <td>{acc.code}</td>
      <td>{acc.branch_name ? acc.branch_name : 'Interbranch'}</td>
      <td>{acc.name}</td>
      <td>{acc.balance}</td>
    </tr>
  )
}

const GroupedAccounts = ({headerAccountName, detailAccounts}) => {
  return (
    <>
      <tr>
        <td><b>{headerAccountName}</b></td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
      {detailAccounts.map((acc, idx) => (
        <tr key={idx}>
          <td style={{paddingLeft:'5rem'}}>{acc.code}</td>
          <td>{acc.branch_name}</td>
          <td>{acc.name}</td>
          <td>{acc.balance}</td>
        </tr>
      ))}
    </>
  )
}

export default Display