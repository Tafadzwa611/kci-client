import React from 'react';

const Table = () => {
    return (
        <div className="table-container">
            <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                <table className="table table-hover" style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th className="text-left text-light">Client</th>
                            <th className="text-right text-light">Branch Client</th>
                            <th className="text-right text-light">Total Principal Borrowed</th>
                            <th className="text-right text-light">Current Principal At Risk</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="table-row">
                            <td style={{textAlign:"left"}}>Tavonga Gudyanga</td>
                            <td style={{textAlign:"right"}}>Main Branch</td>
                            <td style={{textAlign:"right"}}>ZWL 1000.00</td>
                            <td style={{textAlign:"right"}}>ZWL 1000.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;