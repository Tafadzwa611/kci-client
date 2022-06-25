import React from 'react';
import { NavLink } from 'react-router-dom'

const Table = () => {
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
                        <tr>
                            <td className="text-bold bg-gray text-left" colspan="9">2022-04-01</td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
                            <td style={{display:"none"}}></td>
                        </tr>
                        <tr className="table-row">
                            <td style={{textAlign:"right"}}><NavLink className="link" to="/clientdetails">Fsfgs Fhsdfhds</NavLink></td>
                            <td style={{textAlign:"right"}}><NavLink className="link" to="/loandetails">L10000000001</NavLink></td>
                            <td style={{textAlign:"right"}}>Main Branch</td>
                            <td style={{textAlign:"right"}}>300.00</td>
                            <td style={{textAlign:"right"}}>60.00</td>
                            <td style={{textAlign:"right"}}>360.00</td>
                            <td style={{textAlign:"right"}}>0.00</td>
                            <td style={{textAlign:"right"}}>360.00</td>
                        </tr>
                        <tr className="table-row">
                            <td style={{textAlign:"right"}}><NavLink className="link" to="/clientdetails">Fsfgs Fhsdfhds</NavLink></td>
                            <td style={{textAlign:"right"}}><NavLink className="link" to="/loandetails">L10000000001</NavLink></td>
                            <td style={{textAlign:"right"}}>Main Branch</td>
                            <td style={{textAlign:"right"}}>1000.00</td>
                            <td style={{textAlign:"right"}}>500.00</td>
                            <td style={{textAlign:"right"}}>1500.00</td>
                            <td style={{textAlign:"right"}}>0.00</td>
                            <td style={{textAlign:"right"}}>1500.00</td>
                        </tr>
                        <tr className="table-row">
                            <td style={{textAlign:"right"}}><NavLink className="link" to="/clientdetails">Fsfgs Fhsdfhds</NavLink></td>
                            <td style={{textAlign:"right"}}><NavLink className="link" to="/loandetails">L10000000001</NavLink></td>
                            <td style={{textAlign:"right"}}>Main Branch</td>
                            <td style={{textAlign:"right"}}>100.00</td>
                            <td style={{textAlign:"right"}}>30.00</td>
                            <td style={{textAlign:"right"}}>130.00</td>
                            <td style={{textAlign:"right"}}>0.00</td>
                            <td style={{textAlign:"right"}}>130.00</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;