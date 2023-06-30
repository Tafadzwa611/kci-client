import React, { Fragment } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


function Summary({summary, intValues, loggedInUser, currency}) {
    
    const getFileName = () => {
        if (intValues.min_date != '' && intValues.max_date != '') {
          return `Fees Report Summary for ${loggedInUser.company_name} from ${intValues.min_date} to ${intValues.max_date}`
        }
        if (intValues.min_date == '' && intValues.max_date != '') {
          return `Fees Report Summary for ${loggedInUser.company_name} upto ${intValues.max_date}`
        }
        if (intValues.min_date != '' && intValues.max_date == '') {
          return `Fees Report Summary for ${loggedInUser.company_name} from ${intValues.min_date}`
        }
        return `Fees Report Summary for ${loggedInUser.company_name} all time.`
    }
    return (
        <div className='table-responsive' style={{maxHeight: '600px'}}>
            <div style={{marginBottom:"1rem", float:"right"}}>
                <ReactHTMLTableToExcel
                    id='test-table-xls-button'
                    className='download-table-xls-button btn btn-default'
                    table='summary'
                    filename={getFileName()}
                    sheet='tablexls'
                    buttonText='Download as XLS'
                />
            </div>
            <table className='table' id="summary">
                <thead className="journal-details fees__report_thead">
                    <tr>
                        <th>Fee Name</th>
                        <th>Total Fees Recorded</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td colSpan={9}>Fees Report Summary</td>
                    </tr>
                    <tr>
                        <td colSpan={9}>
                            {getFileName()}
                        </td>
                    </tr>
                    {/* <tr>
                        <td colSpan={9}>
                            Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                        </td>
                    </tr> */}
                    <tr>
                        <td colSpan={9}>Currency: {currency}</td>
                    </tr>
                    <tr>
                        <td colSpan={9}>{`Extracted On: ${new Date()}`}</td>
                    </tr>
                    {summary.map(lf => {
                        return (
                            <Fragment key={lf.loan_fee}>
                                <tr>
                                <td>{ lf.loan_fee }</td>
                                <td>{currency} {lf.sum}</td>
                                </tr>
                            </Fragment>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Summary;