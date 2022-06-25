import React from 'react';

const Table = () => {
    return (
        <div className="table-container font-12">
            <div class="table-responsive" style={{maxHeight:"800px"}}>
                <table class="table">
                    <tbody>
                        <tr>
                            <td className="text-bold bg-gray text-left" colspan="6">Clients</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="text-bold">New Clients</td>
                            <td className="text-bold">Returning Clients</td>
                            <td className="text-bold">Number of Clients on Fri Apr 08 2022</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>0</td>
                            <td>0</td>
                            <td>1</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="text-bold bg-gray text-left" colspan="6">Loans</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="text-bold">Number Of Loans Disbursed</td>
                            <td className="text-bold">Total Principal Disbursed</td>
                            <td className="text-bold">Loans Awaiting Approval</td>
                            <td className="text-bold">Loans Issued From Restructured Loans</td>
                            <td className="text-bold">Principal Disbursed From Restructured Loans</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>1</td>
                            <td>ZWL 1000.00</td>
                            <td>0</td>
                            <td>0</td>
                            <td>ZWL 0.00</td>
                        </tr>
                        <tr>
                            <td className="text-bold bg-gray text-left" colspan="6">Payments</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="text-bold">Payment Method</td>
                            <td className="text-bold">Amount Paid</td>
                            <td className="text-bold">Number of Payments</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Bank Transfer</td>
                            <td>ZWL 100.00</td>
                            <td>1</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td className="text-bold bg-gray text-left" colspan="6">Fees</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td className="text-bold">Fee Name</td>
                            <td className="text-bold">Number Of Fees Recorded</td>
                            <td className="text-bold">Total Amount Recorded</td>
                            <td></td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>Admin Fee</td>
                            <td>1</td>
                            <td>ZWL 100.00</td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Table;