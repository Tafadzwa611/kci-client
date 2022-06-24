import React from 'react';

const LoanTerms = () => {
    return (
        <div className="table-responsive loan-terms-table">
            <table className="table">
                <tbody>

                    <tr>
                        <td><b>Loan Status</b></td> 
                        <td>Open</td>
                    </tr>  
                    <tr>
                        <td width="200"><b>Loan#</b></td>                      
                        <td>10000001354</td>
                    </tr>
                    <tr>
                        <td><b>Loan Product</b></td>
                        <td>
                            <a href="/loans/loan_products/" className="link" target="_blank">
                            October 1 month
                        </a>
                        </td>            
                    </tr>
                    <tr><td colspan="2"> </td></tr>
                    <tr>
                        <td colspan="2" className="bg-gray">
                        Loan Terms
                        </td>
                    </tr>
                    <tr>
                        <td><b>Disbursed By</b></td>
                        <td>Bank Transfer</td>
                    </tr>
                    <tr>
                        <td><b>Principal Disbursed</b></td>                      
                        <td>ZWL 4705.00</td>
                    </tr>
                    <tr>
                        <td><b>Principal Outstanding</b></td>                      
                        <td>ZWL 4705.00</td>
                    </tr> 
                    <tr>
                        <td><b>Interest Outstanding</b></td>                      
                        <td>ZWL 1882.00</td>
                    </tr>               
                    <tr>
                        <td><b>Loan Maturity Date</b></td>                      
                        <td>03/25/2022</td>
                    </tr>
                    <tr>
                        <td><b>Loan Interest Method</b></td>                      
                        <td> Flat Rate</td>             
                    </tr>
                    <tr>
                        <td><b>Loan Interest</b></td>                      
                        <td>40.00%/Month(Nominal APR: 480.00%)</td>             
                    </tr>
                    <tr>
                        <td><b>Repayment Cycle</b></td>
                        <td>Monthly</td>
                    </tr>
                    <tr>
                        <td><b>Number of Repayments</b></td>                      
                        <td>1</td>
                    </tr>
                    <tr>
                        <td><b>Interest Start Date</b></td>
                        <td>03/25/2022</td>
                    </tr>
                    <tr>
                        <td><b>Reason For Loan</b></td>
                        <td>CONSUMER</td>
                    </tr>
                    <tr>
                        <td colspan="2" className="bg-gray">Loan Fees</td>
                    </tr>
                    <tr>
                        <td><b>Admin Fee<small>  15.00% Of Total Loan Due Principal Amount </small></b></td>      
                        <td>ZWL 705.75 <b> (Deductable) </b></td>
                    </tr>
                    <tr>
                        <td colspan="2" className="bg-gray">
                        Loan Comments
                        </td>
                    </tr>
                    <tr>
                        <td colspan="2">No Comments</td>
                    </tr>
                    <tr>
                        <td colspan="2"><i>Loan added on March 9, 2022, 10 a.m. by Tamuka Mutinhima</i></td>
                    </tr>

                </tbody>  
            </table>
        </div>
    )
}

export default LoanTerms;