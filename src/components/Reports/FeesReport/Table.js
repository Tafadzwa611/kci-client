import React, { Fragment } from 'react';

const Table = ({report, currencyIso}) => {

    return (
        <div className="table-container" style={{padding:"0", paddingTop:"1.5rem", border:"none"}}>
            <div class="table-responsive font-12" style={{maxHeight:"600px"}}>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th style={{textAlign:"right"}} className="text-light">Client</th>
                            <th style={{textAlign:"right"}} className="text-light">Loan</th>
                            <th style={{textAlign:"right"}} className="text-light">Branch</th>
                            <th style={{textAlign:"right"}} className="text-light">Fee Name</th>
                            <th style={{textAlign:"right"}} className="text-light">Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map(date => {
                            return (
                                <Fragment key={date.day}>
                                    <tr>
                                        <td class="text-bold journal-details header text-left" colspan="9">{ date.day }</td>
                                        <td style={{display:"none"}}></td>
                                        <td style={{display:"none"}}></td>
                                        <td style={{display:"none"}}></td>
                                    </tr>
                                    {date.fees_recorded.map(fee => (
                                        <tr key={fee.loan_pk} className="table-row">
                                            <td style={{textAlign:"right"}}>{ fee.fullname }</td>
                                            <td style={{textAlign:"right"}}>{ fee.loan_id }</td>
                                            <td style={{textAlign:"right"}}>{ fee.branch }</td>
                                            <td style={{textAlign:"right"}}>{ fee.fee_name }</td>
                                            <td style={{textAlign:"right"}}>{`${currencyIso} ${fee.amount}`}</td>
                                        </tr>
                                    ))}
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