import React from 'react';
import { NavLink } from 'react-router-dom';

const AddAsset = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading">Add Asset</h5>
                <div className="add-assets">
                    <NavLink className="btn btn-success" to="/addoldasset">Add Old Asset</NavLink>
                    <NavLink className="btn btn-success" to="/addnewasset">Add New Asset</NavLink>
                </div>
            </div>
        </div>
    );
}

export default AddAsset;