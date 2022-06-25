import React from 'react';
import { NavLink } from 'react-router-dom';

const Admin = () => {
    return (
        <div className="card slide">
            <div className="card-body">

                <h5 className="table-heading">Admin Panel</h5>

                <div className="font-12 admin-panel">
                    <div className="row">
                        <div className="col-sm-4">
                            <strong>Settings</strong><br/>
                            <NavLink className="link" to="/app/users/accountsettings">Account Settings</NavLink><br/>
                            <NavLink className="link" to="/app/users/banknames">Bank Names</NavLink><br/>
                            <NavLink className="link" to="/app/users/currencies">Currencies</NavLink><br/>
                        </div>
                        <div className="col-sm-4">
                            <strong>Manage Staff</strong><br/>
                            <NavLink className="link" to="/app/users/staff">Staff</NavLink><br/>
                            <NavLink className="link" to="/app/users/staffroles">Staff Roles and Permissions</NavLink><br/>       
                        </div>
                        <div className="col-sm-4">
                            <strong>Loans</strong><br/>
                            <NavLink className="link" to="/app/loans/loanproducts">Loan Products</NavLink><br/>
                            <NavLink className="link" to="/app/loans/addloanproduct">Add Loan Product</NavLink><br/>
                            <NavLink className="link" to="/app/loans/loanfees">Loan Fees</NavLink><br/>
                            <NavLink className="link" to="/app/loans/addloanfee">Add Loan Fee</NavLink><br/>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-4">
                            <strong>Manage Branches</strong><br/>
                            <NavLink className="link" to="/app/users/branches">Branches</NavLink><br/>
                            <NavLink className="link" to="/app/users/addbranch">Add Branch</NavLink><br/>   
                        </div>
                        <div className="col-sm-4">
                            <strong>Collateral</strong><br/>
                            <NavLink className="link" to="/app/loans/collateraltypes">Collateral Types</NavLink><br/>         
                        </div>
                        <div className="col-sm-4">
                            <strong>Other Income</strong><br/>
                            <NavLink className="link" to="/app/otherincome/otherincometypes">Other Income Types</NavLink><br/>    
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-4">
                            <strong>Expense</strong><br/>
                            <NavLink className="link" to="/app/expenses/expensetypes">Expense Types</NavLink><br/>    
                        </div>
                        {/* <div className="col-sm-4">
                            <strong>Payrolls</strong><br/>
                            <a href="">Add Payroll</a><br/>
                        </div> */}
                        <div className="col-sm-4">
                            <strong>Asset Management</strong><br/>
                            <NavLink className="link" to="/app/assets/assettypes">Asset Management Types</NavLink><br/>    
                        </div>
                    </div>
                    <hr/>
                </div>


            </div>
        </div>
    );
}

export default Admin;