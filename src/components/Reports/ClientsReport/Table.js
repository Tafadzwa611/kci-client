import React from 'react';

const Table = () => {
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
                        <tr>
                            <td className="text-bold bg-gray text-left" colspan="9">Tavonga Gudyanga</td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"right"}} className="reports-table-border-left">2</td>
                            <td style={{textAlign:"right"}}>1100.00</td>
                            <td style={{textAlign:"right"}}>1100.00</td>
                            <td className="text-bold text-red text-right">Amount:</td>
                            <td className="text-bold text-red text-right">1100.00</td>
                            <td className="text-bold text-red text-right">530.00</td>
                            <td className="text-bold text-red text-right">0.00</td>
                            <td className="text-bold text-red text-right">0.00</td>
                            <td className="text-bold text-red text-right reports-table-border-right">1630.00</td>
                        </tr>
                        <tr>
                            <td className="reports-table-border-left"></td>
                            <td></td>
                            <td></td>
                            <td className="text-bold text-green" style={{textAlign:"right"}}>Total_Payments:</td>
                            <td className="text-bold text-green" style={{textAlign:"right"}}>0.00</td>
                            <td className="text-bold text-green" style={{textAlign:"right"}}>0.00</td>
                            <td className="text-bold text-green" style={{textAlign:"right"}}>0.00</td>
                            <td className="text-bold text-green" style={{textAlign:"right"}}>0.00</td>
                            <td className="text-bold text-green reports-table-border-right" style={{textAlign:"right"}}>0.00</td>
                        </tr>
                        <tr>
                            <td style={{textAlign:"right", borderBottom:"1px solid #dee2e6"}} className="reports-table-border-left"></td>
                            <td style={{textAlign:"right", borderBottom:"1px solid #dee2e6"}}></td>
                            <td style={{textAlign:"right", borderBottom:"1px solid #dee2e6"}}></td>
                            <td className="text-bold" style={{textAlign:"right", borderBottom:"1px solid #dee2e6", width:"9%"}}>Net Due:</td>
                            <td className="text-bold" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>1100.00</td>
                            <td className="text-bold" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>530.00</td>
                            <td className="text-bold" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>0.00</td>
                            <td className="text-bold" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>0.00</td>
                            <td className="text-bold reports-table-border-right" style={{textAlign:"right", fontWeight:"bold", borderBottom:"1px solid #dee2e6"}}>1630.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;