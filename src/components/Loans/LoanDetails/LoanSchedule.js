import React from 'react';

const LoanSchedule = () => {
    return (
        <div className="table-responsive" style={{marginTop:"2rem"}}>
            <table className="table table-schedule">
                <thead>
                    <tr style={{backgroundColor: "#F2F8FF"}}>
                        <th style={{width: "10px"}}><b>#</b></th>
                        <th className=""><b>Date</b></th>
                        <th className=""><b>Description</b></th>
                        <th className="text-right"><b>Principal</b></th>
                        <th className="text-right"><b>Interest</b></th>
                        <th className="text-right"><b>Fees</b></th>
                        <th className="text-right"><b>Penalty</b></th>
                        <th className="text-right"><b>Installment</b></th>
                        <th className="text-right"><b>Paid</b></th>
                        <th className="text-right"><b>Pending_Due</b></th>
                        <th className="text-right"><b>Total_Due</b></th>
                        <th className="text-right"><b>Interest_Due</b></th>
                        <th className="text-right"><b>Principal_Due</b></th>
                        <th className="text-right"><b>Principal_Balance</b></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td className="text-right">4705.00</td>
                    </tr>
                    <tr>
                        <td></td> 
                        <td className="bg-gray-active text-bold">03/20/2022</td>
                        <td className="text-bold" colspan="11">Today</td>
                    </tr>
                    <tr className="success">
                        <td>1</td>
                        <td>03/25/2022</td>
                        <td className="">maturity</td>
                        <td className="text-right">4705.00</td>
                        <td className="text-right">1882.00</td>
                        <td className="text-right">0.00</td>
                        <td className="text-right">0.00</td>
                        <td className="text-right">6587.00</td>
                        <td></td>
                        <td className="text-right">6587.00</td>
                        <td className="text-right">6587.00</td>
                        <td className="text-right">1882.00</td>
                        <td className="text-bold text-right">4705.00</td>
                        <td className="text-right">0.00</td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td className=""><b>Total Due</b></td>
                        <td className="text-right">4705.00</td>
                        <td className="text-right">1882.00</td>
                        <td className="text-right">0.00</td>
                        <td className="text-right">0.00</td>
                        <td className="text-right"><b>6587.00</b></td>
                        <td className="text-right"><b>
                            0.00
                        </b></td>
                        <td className="text-right text-bold"><b>6587.00</b></td>
                        <td className="text-right">6587.00</td>
                        <td className="text-right"><b>1882.00</b></td>
                        <td className="text-right"><b>4705.00</b></td>
                        <td className="text-right"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><b>Total Paid</b></td>
                        <td className="text-right">0.00</td>
                        <td className="text-right">0.00</td>
                        <td className="text-right">0.00</td>
                        <td className="text-right">0.00</td>
                        <td className="text-right"><b></b></td>
                        <td className="text-right"><b></b></td>
                        <td className="text-right text-bold"><b></b></td>
                        <td className="text-right"></td>
                        <td className="text-right"><b></b></td>
                        <td className="text-right"><b></b></td>
                        <td className="text-right"></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td><b>Total Pending Due</b></td>
                        <td className="text-right">4705.00</td>
                        <td className="text-right">1882.00</td>
                        <td className="text-right">0.00</td>
                        <td className="text-right">0.00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>            
        </div>
    )
}

export default LoanSchedule;