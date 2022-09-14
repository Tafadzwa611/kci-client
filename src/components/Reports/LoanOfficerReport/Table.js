import React,  { Fragment } from 'react';

const Table = ({report, currencyIso}) => {
    return (
        <div className="table-container" style={{padding:"0", paddingTop:"1.5rem", border:"none"}}>
            <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                <table className="table" style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th style={{textAlign:"right"}} className="reports-table-border-left text-light">Total_Loans_Released</th>
                            <th style={{textAlign:"right"}} className="text-light">Total_Principal_Released</th>
                            <th style={{textAlign:"right"}} className="text-light">Current_Principal_At_Risk</th>
                            <th></th>
                            <th style={{textAlign:"right"}} className="text-light">Principal</th>
                            <th style={{textAlign:"right"}} className="text-light">Interest</th>
                            <th style={{textAlign:"right"}} className="text-light">Penalty</th>
                            <th style={{textAlign:"right"}} className="reports-table-border-right text-light">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map(officer => {
                            return (
                                <Fragment key={officer.id}>
                                    <tr>
                                        <td className='text-bold journal-details header text-left' colSpan='9'>{officer.first_name} {officer.last_name}</td>
                                        <td style={{display: 'none'}}></td>
                                        <td style={{display: 'none'}}></td>
                                        <td style={{display: 'none'}}></td>
                                        <td style={{display: 'none'}}></td>
                                        <td style={{display: 'none'}}></td>
                                        <td style={{display: 'none'}}></td>
                                        <td style={{display: 'none'}}></td>
                                        <td style={{display: 'none'}}></td>
                                    </tr>
                                    <tr>
                                        <td style={{textAlign: 'right'}} className="reports-table-border-left">{ officer.loan_count }</td>
                                        <td style={{textAlign: 'right'}}>{`${currencyIso} ${officer.sum_principal}`}</td>
                                        <td style={{textAlign: 'right'}}>{`${currencyIso} ${officer.sum_principal_due}`}</td>
                                        <td className='text-bold text-red text-right'>Amount:</td>
                                        <td className='text-bold text-red text-right'>{`${currencyIso} ${officer.sum_principal}`}</td>
                                        <td className='text-bold text-red text-right'>{`${currencyIso} ${officer.sum_interest}`}</td>
                                        <td className='text-bold text-red text-right'>{`${currencyIso} ${officer.sum_penalty}`}</td>
                                        <td className='text-bold text-red text-right reports-table-border-right'>{`${currencyIso} ${officer.total_amount}`}</td>
                                    </tr>
                                    <tr>
                                        <td className="reports-table-border-left"></td>
                                        <td></td>
                                        <td></td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>Total Payments:</td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${officer.sum_principal_paid}`}</td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${officer.sum_interest_paid}`}</td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${officer.sum_penalty_paid}`}</td>
                                        <td className='text-bold text-green reports-table-border-right' style={{textAlign: 'right'}}>{`${currencyIso} ${officer.total_paid}`}</td>
                                    </tr>
                                    <tr>
                                        <td style={{textAlign:"right"}} className="reports-table-border-left"></td>
                                        <td style={{textAlign:"right"}}></td>
                                        <td style={{textAlign:"right"}}></td>
                                        <td className="text-bold" style={{textAlign:"right", width:"9%"}}>Net Due:</td>
                                        <td className="text-bold" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${officer.sum_principal_due}`}</td>
                                        <td className="text-bold" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${officer.sum_interest_due}`}</td>
                                        <td className="text-bold" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${officer.sum_penalty_due}`}</td>
                                        <td className="text-bold reports-table-border-right" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${officer.total_due}`}</td>
                                    </tr>
                                </Fragment>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;