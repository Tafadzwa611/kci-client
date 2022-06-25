import React from 'react';
import { NavLink } from 'react-router-dom';

const Table = () => {
    return (
        <div style={{marginTop:"40px"}} className="loan_products_table_container">
            <div className="table-responsive font-12">

                <div className="info-tab info-flex">
                    <div className="hide_text">
                        Example
                    </div>
                    <button class="btn btn-export on_info"><i class="uil uil-download-alt"></i> <span>Download_Excel</span></button>
                </div>

                <table className="table table-hover" style={{marginTop:"20px"}}>
                    <tbody>
                        <tr style={{background:"#F4F5F8"}} className="table-head">
                            <th>Name</th>
                            <th>Loan_Product_#</th>
                            <th>Interest_Rate</th>
                            <th>Interest_Method</th>
                            <th>Currency</th>
                            <th>Date_Created</th>
                            <th>Action</th>
                        </tr>                      
                        <tr className="table-row">
                            <td>Loan Product 1</td>
                            <td>10000000001</td>
                            <td>50.00% /Month</td>
                            <td>Flat Rate</td>
                            <td>Zimbabwean Dollar</td>
                            <td>04/01/2021</td>
                            <td class="action-td">
                                <span class="badge badge-success">edit</span>
                                <span class="badge badge-danger">delete</span>
                            </td>     
                        </tr>
                        <tr className="table-row">
                            <td>Loan Product 2</td>
                            <td>10000000002</td>
                            <td>30.00% /Month</td>
                            <td>Flat Rate</td>
                            <td>US Dollar</td>
                            <td>04/01/2021</td>
                            <td class="action-td">
                                <span class="badge badge-success">edit</span>
                                <span class="badge badge-danger">delete</span>
                            </td>     
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="btn-flex-space-btwn">
                <NavLink className="btn btn-default" to="/admin"><i class="uil uil-arrow-left"></i>Back</NavLink>
            </div>
        </div>
    );
}

export default Table;