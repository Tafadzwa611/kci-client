import React, {Fragment} from 'react';
import { FirstRow, SecondRow, ThirdRow, FourthRow } from './TableRows';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

const Table = ({ clients, currencyIso, minDate, maxDate, selectedBranches }) => {
    const getStrDate = (date) => {
        const mydate = new Date(date);
        const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][mydate.getMonth()];
        return `${month} ${mydate.getDate()}, ${mydate.getFullYear()}`;
    }
    
    const getFileName = () => {
        if (minDate != '' && maxDate != '') {
            return `${currencyIso} Clients report for ${clients[0].tenant} from ${getStrDate(minDate)} to ${getStrDate(maxDate)}`
        }
        if (minDate == '' && maxDate != '') {
            return `${currencyIso} Clients report for ${clients[0].tenant} upto ${getStrDate(maxDate)}`
        }
        if (minDate != '' && maxDate == '') {
            return `${currencyIso} Clients report for ${clients[0].tenant} from ${getStrDate(minDate)}`
        }
        return `${currencyIso} Clients report for ${clients[0].tenant} all time.`
    }

    return (
        <>
            <div style={{margin:"1rem 0", display:"flex", justifyContent:"flex-end"}}>
                <ReactHTMLTableToExcel
                id='test-table-xls-button'
                className='download-table-xls-button btn btn-default'
                table='clients-report'
                filename={getFileName()}
                sheet='tablexls'
                buttonText='Download as XLS'
                />
            </div>
            <div className="table-container" style={{padding:"0", border:"none"}}>
                <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                    <table className="table" id='clients-report' style={{width:"100%"}}>
                        <thead className="clients-report-table">
                            <tr className="journal-details fees__report_thead"> 
                                <th style={{textAlign:"right"}}>Total_Loans_Released</th>
                                <th style={{textAlign:"right"}}>Total_Principal_Released</th>
                                <th style={{textAlign:"right"}}>Current_Principal_At_Risk</th>
                                <th></th>
                                <th style={{textAlign:"right"}}>Principal</th>
                                <th style={{textAlign:"right"}}>Interest</th>
                                <th style={{textAlign:"right"}}>Fees</th>
                                <th style={{textAlign:"right"}}>Penalty</th>
                                <th style={{textAlign:"right"}}>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>Clients Report</td>
                            </tr>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>{getFileName()}</td>
                            </tr>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>
                                    Branches: {selectedBranches.length == 0 ? 'All Branches' : selectedBranches.map(branch => ` ${branch.name}`)}
                                </td>
                            </tr>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>Currency: {currencyIso}</td>
                            </tr>
                            <tr>
                                <td className='text-bold text-left' colSpan={9}>{`Extracted On: ${new Date()}`}</td>
                            </tr>
                            {clients.map(client => {
                                return (
                                <Fragment key={client.id}>
                                    <FirstRow client={client}/>
                                    <SecondRow client={client} currencyIso={currencyIso}/>
                                    <ThirdRow client={client} currencyIso={currencyIso}/>
                                    <FourthRow client={client} currencyIso={currencyIso}/>
                                </Fragment>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

export default Table;