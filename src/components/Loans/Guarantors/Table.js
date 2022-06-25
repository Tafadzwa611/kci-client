import React from 'react';

const Table = () => {
    return (
        <div className="guarantor_border">
            <div className="table-responsive font-12">

                <div className="info-tab info-flex">
                    <div className="hide_text">
                        Example
                    </div>
                    <button class="btn btn-export on_info"><i class="uil uil-download-alt"></i> <span>Download_Excel</span></button>
                </div>

                <table className="table table-hover" style={{marginTop:"20px"}}>
                    <tbody>
                        <tr style={{background:"#F4F5F8"}}>
                            <th>Full Name</th>
                            <th>Guarantor_#</th>
                            <th>EC_Number</th>
                            <th>Contact</th>
                            <th>Work_Address</th>
                            <th>Date_Added</th>
                            <th>Action</th>
                        </tr>                      
                        <tr className="table-row">
                            <td>Guarantor 1</td>
                            <td>10000000001</td>
                            <td>8909890H</td>
                            <td>0778909890</td>
                            <td>3887 Chesvingo Drive</td>
                            <td>04/01/2021</td>
                            <td class="action-td">
                                <span class="badge badge-success">edit</span>
                            </td>     
                        </tr>
                        <tr className="table-row">
                            <td>Guarantor 2</td>
                            <td>10000000002</td>
                            <td>8909890H</td>
                            <td>0778909890</td>
                            <td>3887 Chesvingo Drive</td>
                            <td>04/01/2021</td>
                            <td class="action-td">
                                <span class="badge badge-success">edit</span>
                            </td>     
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;