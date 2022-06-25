import React from 'react';

const MonthlyTable = () => {
    return (
        <div className="table-container">
            <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                <table className="table" style={{width:"100%"}}>
                    <thead>
                        <tr>
                            <th className="text-right text-light">Month</th>
                            <th className="text-right text-light">New_Loans</th>
                            <th className="text-right text-light">Active_Clients</th>
                            <th className="text-right text-light">Number_of_Repayments</th>
                            <th className="text-right text-light">Total_Principal_Released</th>
                            <th className="text-right text-light">Current_Principal_At_Risk</th>
                            <th></th>
                            <th className="text-right text-light">Principal_Disbursed</th>
                            <th className="text-right text-light">Interest_Expected</th>
                            <th className="text-right text-light">Fees_Expected</th>
                            <th className="text-right text-light">Penalty</th>
                            <th className="text-right text-light">Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="text-bold bg-gray text-left" colspan="12">April 2022</td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
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
                            <td style={{textAlign:"right"}}></td>
                            <td style={{textAlign:"right"}}>2</td>
                            <td style={{textAlign:"right"}}>1</td>
                            <td style={{textAlign:"right"}}>0</td>
                            <td style={{textAlign:"right"}}>1100.00</td>
                            <td style={{textAlign:"right"}}>1100.00</td>
                            <td className="text-bold text-red text-right">Amount Disbursed:</td>
                            <td className="text-bold text-red text-right">1100.00</td>
                            <td className="text-bold text-red text-right">530.00</td>
                            <td className="text-bold text-red text-right">0.00</td>
                            <td className="text-bold text-red text-right">0.00</td>
                            <td className="text-bold text-red text-right">1630.00</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td className="text-bold text-green" style={{textAlign:"right"}}>Total Payments:</td>
                            <td className="text-bold text-green" style={{textAlign:"right"}}>0.00</td>
                            <td className="text-bold text-green" style={{textAlign:"right"}}>0.00</td>
                            <td className="text-bold text-green" style={{textAlign:"right"}}>0.00</td>
                            <td className="text-bold text-green" style={{textAlign:"right"}}>0.00</td>
                            <td className="text-bold text-green" style={{textAlign:"right"}}>0.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default MonthlyTable;