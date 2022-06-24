import React from 'react';
import { NavLink } from 'react-router-dom';
import DateRange from './DateRange';
import Table from './Table';

const LoanProducts = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading" style={{marginBottom:"20px"}}>Loan Products</h5>
                <div style={{margin:"20px 0"}}>
                    <NavLink className="btn btn-success" to="/addloanproduct">Add Loan Product</NavLink><br/>
                </div>
                <DateRange />
                <Table />
            </div>
        </div>
    );
}

export default LoanProducts;