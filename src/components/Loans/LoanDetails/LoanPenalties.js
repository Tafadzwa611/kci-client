import React from 'react';
import { NavLink } from 'react-router-dom';

const LoanPenalties = () => {
    return (
        <div>
            <div style={{marginTop:"20px"}}>
                <button className="btn bg-gray"><NavLink className="loan_details_tab_btns" to="/addloanpenalty">Add Penalty</NavLink></button>
            </div>
            <div className="tab-1-download-btn">
                <button className="btn btn-export"><span>Remove Selected Penalties</span></button>
                <button className="btn btn-export"><i class="uil uil-download-alt"></i> <span>Download Excel</span></button>
            </div>
            <a style={{color:"#6666FF"}} href>Select All</a>
            <div className='table-responsive' style={{marginTop:"20px"}}>
                <table className='table table-centered'>
                    <thead className="thead-light">
                        <tr>
                            <th style={{textAlign:"start"}}>Select</th>
                            <th style={{textAlign:"start"}}>Penalty Date</th>
                            <th style={{textAlign:"start"}}>Added_by</th>
                            <th style={{textAlign:"start"}}>Reason_for_Penalty</th>
                            <th style={{textAlign:"start"}}>Amount</th>
                            <th style={{textAlign:"start"}}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="checkbox" /></td>
                            <td>12/12/21</td>
                            <td>Tamuka Mutinhima</td>
                            <td>Late Repayment</td>
                            <td>ZWL 11436.00</td>
                            <td>delete</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default LoanPenalties;