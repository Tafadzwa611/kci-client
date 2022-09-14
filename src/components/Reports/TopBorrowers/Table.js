import React from 'react';

const Table = ({report, currencyIso}) => {

    const [showLoans, setShowLoans] = React.useState(false);

    const statusClasses = {
        'Fully Paid': 'badge badge-success',
        'Early Settlement': 'badge badge-success',
        'Restructured': 'badge badge-dark',
        'Processing': 'badge badge-info-lighter',
        'Arrears': 'badge badge-info-light',
        'Open': 'badge badge-info',
        'Over Paid': 'badge badge-warning',
        'Defaulted': 'badge badge-danger',
        'Rejected': 'badge badge-danger',
        'Written-Off': 'badge badge-dark',
    };

    return (
        <div className="table-container" style={{padding:"0", paddingTop:"1.5rem", border:"none"}}>
            <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                <table className="table table-hover" style={{width:"100%"}}>
                    <thead>
                        <tr className="journal-details header">
                            <th className="text-left text-light">#</th>
                            <th className="text-left text-light">Client</th>
                            <th className="text-right text-light">Branch Client</th>
                            <th className="text-right text-light">Total Principal Borrowed</th>
                            <th className="text-right text-light">Current Principal At Risk</th>
                        </tr>
                    </thead>
                    <tbody> 
                    {report.map((client, idx) => {
                            return (
                                <>
                                    <tr key={client.id} onClick={e => setShowLoans(!showLoans)} style={{cursor:"grab"}}>
                                        <td style={{textAlign: 'left'}}><p style={{fontWeight: "bold"}}>{idx+1}</p></td>
                                        <td style={{textAlign: 'left'}}>{client.fullname}</td>
                                        <td style={{textAlign: 'right'}}>{client.branch}</td>
                                        <td style={{textAlign: 'right'}}>{`${currencyIso} ${client.sum_principal}`}</td>
                                        <td style={{textAlign: 'right'}}>{`${currencyIso} ${client.sum_principal_amount_due}`}</td> 
                                    </tr>
                                    {showLoans && client.loans.map(loan => {
                                        return (
                                            <tr key={loan.loan_id}>
                                                <td></td>
                                                <td></td>
                                                <td style={{textAlign: 'right'}}>
                                                    {loan.loan_id} <small className={statusClasses[loan.status]} style={{margin: '3px'}}>{loan.status}</small>
                                                </td>
                                                <td style={{textAlign: 'right'}}>{`${currencyIso} ${loan.principal}`}</td>
                                                <td style={{textAlign: 'right'}}>{`${currencyIso} ${loan.principal_amount_due}`}</td>
                                            </tr>
                                        )
                                    })}
                                </>
                            )
                        }
                    )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;