import React from 'react'
import MiniLoader from '../../Loader/MiniLoader';
import Empty from './Empty';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Display = ({report, loading, currencyIso, reportDate, loggedInUser}) => {
    if (loading) {
        return <MiniLoader />
    }

    if (report===null) {
        return <Empty message='Select Report Date and at least one branch to run income statement.'/>
    }

    const getStrDate = () => {
        const mydate = new Date(reportDate);
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mydate.getMonth()];
        return `${month} ${mydate.getDate()}, ${mydate.getFullYear()}`;
    }

    const assetAccs = report.balance_sheet.filter(acc => acc.type === 'ASSET');
    const liabAccs = report.balance_sheet.filter(acc => acc.type === 'LIABILITY');
    const equityAccs = report.balance_sheet.filter(acc => acc.type === 'EQUITY');

    return (
        <div style={{paddingTop: "17px"}}>
            <div className='cardone card-success card-outline' style={{paddingTop: "17px"}}>
                <div className='table-responsive no-padding'>
                    <div className='col-sm-12'>
                        <div style={{marginBottom:"1rem"}}>
                            <ReactHTMLTableToExcel
                                id='test-table-xls-button'
                                className='download-table-xls-button btn btn-default'
                                table='balance-sheet'
                                filename={`${currencyIso} Balance Sheet for ${loggedInUser.company_name} as on ${getStrDate()}`}
                                sheet='tablexls'
                                buttonText='Download as XLS'
                            />
                        </div>
                        <table id='balance-sheet' className='table table-bordered table-condensed table-hover'>
                            <thead>
                                <tr className="journal-details header">
                                    <th>Account Branch</th>
                                    <th>GL Code</th>
                                    <th>Account Name</th>
                                    <th>Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                <td><b>{currencyIso} Balance Sheet</b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                </tr>
                                <tr>
                                <td><b>{loggedInUser.company_name} as on {getStrDate()}</b></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                </tr>
                                {assetAccs.map((acc, idx) => {
                                return (
                                    <tr key={idx}>
                                    <td>{acc.branch_name}</td>
                                    <td>{acc.code}</td>
                                    <td>{acc.name}</td>
                                    <td>{acc.balance}</td>
                                    </tr>
                                )
                                })}
                                <tr>
                                <td></td>
                                <td></td>
                                <td><b>TOTAL ASSETS</b></td>
                                <td><b>{report.total_assets}</b></td>
                                </tr>
                                {liabAccs.map((acc, idx) => {
                                return (
                                    <tr key={idx}>
                                    <td>{acc.branch_name}</td>
                                    <td>{acc.code}</td>
                                    <td>{acc.name}</td>
                                    <td>{acc.balance}</td>
                                    </tr>
                                )
                                })}
                                <tr>
                                <td></td>
                                <td></td>
                                <td><b>TOTAL LIABILITIES</b></td>
                                <td><b>{report.total_liabs}</b></td>
                                </tr>
                                {equityAccs.map((acc, idx) => {
                                return (
                                    <tr key={idx}>
                                    <td>{acc.branch_name}</td>
                                    <td>{acc.code}</td>
                                    <td>{acc.name}</td>
                                    <td>{acc.balance}</td>
                                    </tr>
                                )
                                })}
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
    )
}

export default Display