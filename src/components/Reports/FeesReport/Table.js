import React from 'react';

const Table = () => {
    return (
        <div className="table-container">
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
                        <tr>
                            <td class="text-bold bg-gray text-left" colspan="9">2022-04-01</td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
                        </tr>
                        <tr className="table-row">
                            <td style={{textAlign:"right"}}><a id="2" className="link" href="#">Tavonga Gudyanga</a></td>
                            <td style={{textAlign:"right"}}><a href="#" className="link">L10000000002</a></td>
                            <td style={{textAlign:"right"}}>Main Branch</td>
                            <td style={{textAlign:"right"}}>Admin Fee</td>
                            <td style={{textAlign:"right"}}>ZWL 150.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;