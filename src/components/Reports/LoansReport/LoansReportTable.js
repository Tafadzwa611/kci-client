import React from 'react';

const LoansReportTable = ({loans, currencyIso}) => {
    return (
        <div className="table-container" style={{padding:"0", paddingTop:"1.5rem", border:"none"}}>
            <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                <table className="table" style={{width:"100%"}}>
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
                        {loans.map(loan => {
                            return (
                                <>
                                    <tr>
                                        <td className='text-bold journal-details header text-left' colSpan='9'>{ loan.client }</td>
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
                                        <td style={{textAlign: 'right'}}></td>
                                        <td style={{textAlign: 'right'}}>{`${currencyIso} ${loan.principal}`}</td>
                                        <td style={{textAlign: 'right'}}>{`${currencyIso} ${loan.principal_amount_due}`}</td>
                                        <td className='text-bold text-red text-right'>Amount:</td>
                                        <td className='text-bold text-red text-right'>{`${currencyIso} ${loan.principal}`}</td>
                                        <td className='text-bold text-red text-right'>{`${currencyIso} ${loan.interest}`}</td>
                                        <td className='text-bold text-red text-right'>{`${currencyIso} ${loan.non_deductable_fees_reference}`}</td>
                                        <td className='text-bold text-red text-right'>{`${currencyIso} ${loan.penalty_reference}`}</td>
                                        <td className='text-bold text-red text-right'>{`${currencyIso} ${loan.total_due}`}</td>
                                    </tr>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>Total Payments:</td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${loan.total_principal_paid}`}</td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${loan.total_interest_paid}`}</td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${loan.total_fees_paid}`}</td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${loan.total_penalty_paid}`}</td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${loan.total_amount_paid}`}</td>
                                    </tr>
                                    <tr>
                                        <td style={{textAlign:"right"}} className="last__row__border"></td>
                                        <td style={{textAlign:"right"}} className="last__row__border"></td>
                                        <td style={{textAlign:"right"}} className="last__row__border"></td>
                                        <td className="text-bold last__row__border" style={{textAlign:"right", width:"9%"}}>Net Due:</td>
                                        <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${loan.principal_amount_due}`}</td>
                                        <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${loan.interest_amount_due}`}</td>
                                        <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${loan.non_deductable_fees}`}</td>
                                        <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${loan.penalty}`}</td>
                                        <td className="text-bold last__row__border" style={{textAlign:"right", fontWeight:"bold"}}>{`${currencyIso} ${loan.total_outstanding_balance}`}</td>
                                    </tr>
                                </>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LoansReportTable;