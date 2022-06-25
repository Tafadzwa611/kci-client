import React from 'react';
import { NavLink } from 'react-router-dom';
import Filter from './Filter';
import Table from './Table';
import Footer from './Footer';

const ViewGuarantors = () => {
    return (
        <div className="slide">
            <h5 className="table-heading" style={{margin:"24px", marginBottom:"0"}}>Guarantors</h5>
            <div style={{margin:"20px 24px 0"}}>
                <NavLink className="btn btn-success" to="/addguarantor">Add Guarantor</NavLink><br/>
            </div>
            <div className="card">
                <Filter />
            </div>
            <div className="card">
                <Table />
                <Footer />
            </div>
        </div>
    );
}

export default ViewGuarantors;