import React, { Fragment } from 'react';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';


function Summary({summary, currencyIso, minDate, maxDate, selectedBranches, loggedInUser}) {
    const getStrDate = (date) => {
        const mydate = new Date(date);
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mydate.getMonth()];
        return `${month} ${mydate.getDate()}, ${mydate.getFullYear()}`;
      }
    
      const getFileName = () => {
        if (minDate != '' && maxDate != '') {
          return `Fees Report Summary for ${loggedInUser.company_name} from ${getStrDate(minDate)} to ${getStrDate(maxDate)}`
        }
        if (minDate == '' && maxDate != '') {
          return `Fees Report Summary for ${loggedInUser.company_name} upto ${getStrDate(maxDate)}`
        }
        if (minDate != '' && maxDate == '') {
          return `Fees Report Summary for ${loggedInUser.company_name} from ${getStrDate(minDate)}`
        }
        return `Fees Report Summary for ${loggedInUser.company_name} all time.`
    }
    return (
        <div className='table-responsive' style={{maxHeight: '600px', marginTop:"1.5rem"}}>
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
                    <tr>
                        <td colSpan={9}>
                            Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={9}>Currency: {currencyIso}</td>
                    </tr>
                    <tr>
                        <td colSpan={9}>{`Extracted On: ${new Date()}`}</td>
                    </tr>
                    {summary.map(lf => {
                        return (
                            <Fragment key={lf.loan_fee}>
                                <tr>
                                <td>{ lf.loan_fee }</td>
                                <td>{`${currencyIso} ${lf.sum}`}</td>
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