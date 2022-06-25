import React from 'react';

const Table = () => {
    return (
        <div class="col-12 font-12">
            <div style={{marginTop:"40px"}} className="trial_balance_table_container">
                <div style={{float:"right", margin:"20px", marginRight:"0", marginTop:"0"}}>
                    <button class="btn btn-default" type="button">Download as XLS</button>
                </div>
                <div class="table-responsive" style={{maxHeight:"1000px"}}>
                    <table class="table" style={{width:"100%"}}>
                        <thead>
                            <tr>
                                <th>Account</th>
                                <th>Branch</th>
                                <th>Debit</th>
                                <th>Credit</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Loans To Clients</td>
                                <td>Main Branch</td>
                                <td className="trial-balance-text-color" style={{background:"rgb(127, 255, 0) none repeat scroll 0% 0%", textAlign:"center"}}>ZWL 2000.00</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Interest Receivable</td>
                                <td>Main Branch</td>
                                <td className="trial-balance-text-color" style={{background:"rgb(127, 255, 0) none repeat scroll 0% 0%", textAlign:"center"}}>ZWL 900.00</td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Cash Boz ZWL</td>
                                <td>Main Branch</td>
                                <td></td>
                                <td className="trial-balance-text-color" style={{background:"rgb(255, 182, 193) none repeat scroll 0% 0%", textAlign:"center"}}>ZWL -1650.00</td>
                            </tr>
                            <tr>
                                <td>Interest Revenue</td>
                                <td>Main Branch</td>
                                <td></td>
                                <td className="trial-balance-text-color" style={{background:"rgb(255, 182, 193) none repeat scroll 0% 0%", textAlign:"center"}}>ZWL -1000.00</td>
                            </tr>
                            <tr>
                                <td>Admin Fee</td>
                                <td>Main Branch</td>
                                <td></td>
                                <td className="trial-balance-text-color" style={{background:"rgb(255, 182, 193) none repeat scroll 0% 0%", textAlign:"center"}}>ZWL -250.00</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{display:"flex", justifyContent:"center", alignItems:"center", columnGap:"5px", margin:"20px"}}>
                    <i class="uil uil-exclamation-triangle" style={{color:"#ffc107"}}></i> 
                    Please note that, only accounts that had transactions in the selected time periods are shown.
                </div>
            </div>
        </div>
    );
}

export default Table;