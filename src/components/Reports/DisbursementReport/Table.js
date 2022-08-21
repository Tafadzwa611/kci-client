import React, { Fragment } from 'react';
import { convertDate } from '../../Accounting/Journals/utils';

const Table = ({report, currencyIso}) => {
    return (
        <div className="table-container">
            <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th style={{textAlign:"right"}} className="text-light">Client</th>
                            <th style={{textAlign:"right"}} className="text-light">Loan</th>
                            <th style={{textAlign:"right"}} className="text-light">Branch</th>
                            <th style={{textAlign:"right"}} className="text-light">Principal Released</th>
                            <th style={{textAlign:"right"}} className="text-light">Interest</th>
                            <th style={{textAlign:"right"}} className="text-light">Total Due</th>
                            <th style={{textAlign:"right"}} className="text-light">Total Amount Paid</th>
                            <th style={{textAlign:"right"}} className="text-light">Balance</th>
                        </tr>
                    </thead>
                    <tbody>
                        {report.map(date => {
                            return (
                            <Fragment key={date.day}>
                                <tr>
                                <td className='text-bold bg-gray text-left' colSpan='9'>{convertDate(date.day)}</td>
                                <td style={{display: 'none'}}></td>
                                <td style={{display: 'none'}}></td>
                                <td style={{display: 'none'}}></td>
                                </tr>
                                {date.loans.map(loan => (
                                <tr key={loan.id}>
                                    <td style={{textAlign: 'right'}}><a id={loan.client_id} href='#'>{loan.fullname}</a></td>
                                    <td style={{textAlign: 'right'}}><a href="#">{loan.loan_id}</a></td>
                                    <td style={{textAlign: 'right'}}>{loan.branch}</td>
                                    <td style={{textAlign: 'right'}}>{`${currencyIso} ${loan.principal}`}</td>
                                    <td style={{textAlign: 'right'}}>{`${currencyIso} ${loan.interest}`}</td>
                                    <td style={{textAlign: 'right'}}>{`${currencyIso} ${loan.amount_due}`}</td>
                                    <td style={{textAlign: 'right'}}>{`${currencyIso} ${loan.total_amount_paid}`}</td>
                                    <td style={{textAlign: 'right'}}>{`${currencyIso} ${loan.balance}`}</td>
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