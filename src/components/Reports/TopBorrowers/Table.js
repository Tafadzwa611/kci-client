import React from 'react';

const Table = ({report, currencyIso}) => {
    return (
        <div className="table-container">
            <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                <table className="table table-hover" style={{width:"100%"}}>
                    <thead>
                        <tr>
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
                                <tr key={client.id} onClick={e => setShowLoans(!showLoans)} className="table-row">
                                    <td style={{textAlign: 'left'}}><p style={{fontWeight: "bold"}}>{idx+1}</p></td>
                                    <td style={{textAlign: 'left'}}>{client.fullname}</td>
                                    <td style={{textAlign: 'right'}}>{client.branch}</td>
                                    <td style={{textAlign: 'right'}}>{`${currencyIso} ${client.sum_principal}`}</td>
                                    <td style={{textAlign: 'right'}}>{`${currencyIso} ${client.sum_principal_amount_due}`}</td>
                                </tr>
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