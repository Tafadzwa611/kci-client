import React from 'react';

const LoansReportTable = ({loans, currencyIso}) => {
    return (
        <div className="table-container">
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
                            <th style={{textAlign:"right"}} className="text-light">Fees</th>
                            <th style={{textAlign:"right"}} className="text-light">Penalty</th>
                            <th style={{textAlign:"right"}} className="reports-table-border-right text-light">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loans.map(loan => {
                            return (
                                <>
                                    <tr>
                                        <td className='text-bold bg-gray text-left' colSpan='9'>{ loan.client }</td>
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
                                        <td style={{textAlign: 'right'}} className="reports-table-border-left"></td>
                                        <td style={{textAlign: 'right'}}>{`${currencyIso} ${loan.principal}`}</td>
                                        <td style={{textAlign: 'right'}}>{`${currencyIso} ${loan.principal_amount_due}`}</td>
                                        <td className='text-bold text-red text-right'>Amount:</td>
                                        <td className='text-bold text-red text-right'>{`${currencyIso} ${loan.principal}`}</td>
                                        <td className='text-bold text-red text-right'>{`${currencyIso} ${loan.interest}`}</td>
                                        <td className='text-bold text-red text-right'>{`${currencyIso} ${loan.non_deductable_fees_reference}`}</td>
                                        <td className='text-bold text-red text-right'>{`${currencyIso} ${loan.penalty_reference}`}</td>
                                        <td className='text-bold text-red text-right reports-table-border-right'>{`${currencyIso} ${loan.total_due}`}</td>
                                    </tr>
                                    <tr>
                                        <td className="reports-table-border-left"></td>
                                        <td></td>
                                        <td></td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>Total Payments:</td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${loan.total_principal_paid}`}</td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${loan.total_interest_paid}`}</td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${loan.total_fees_paid}`}</td>
                                        <td className='text-bold text-green' style={{textAlign: 'right'}}>{`${currencyIso} ${loan.total_penalty_paid}`}</td>
                                        <td className='text-bold text-green reports-table-border-right' style={{textAlign: 'right'}}>{`${currencyIso} ${loan.total_amount_paid}`}</td>
                                    </tr>
                                    <tr>
                                        <td style={{textAlign:"right", borderBottom:"1px solid #dee2e6"}} className="reports-table-border-left"></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid #dee2e6"}}></td>
                                        <td style={{textAlign:"right", borderBottom:"1px solid #dee2e6"}}></td>
                                        <td className="text-bold" style={{textAlign:"right", borderBottom:"1px solid #dee2e6", width:"9%"}}>Net Due:</td>
                                        <td className="text-bold" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>{`${currencyIso} ${loan.principal_amount_due}`}</td>
                                        <td className="text-bold" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>{`${currencyIso} ${loan.interest_amount_due}`}</td>
                                        <td className="text-bold" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>{`${currencyIso} ${loan.non_deductable_fees}`}</td>
                                        <td className="text-bold" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>{`${currencyIso} ${loan.penalty}`}</td>
                                        <td className="text-bold reports-table-border-right" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>{`${currencyIso} ${loan.total_outstanding_balance}`}</td>
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