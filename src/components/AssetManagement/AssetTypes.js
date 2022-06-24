import React from 'react';
import { NavLink } from 'react-router-dom';

const AssetTypes = () => {

    return (
        <div className="card slide">
            <div className="card-body">
                <h5 className="table-heading">Asset Types</h5>
                <div style={{margin:"20px 0"}}>
                    <NavLink className="btn btn-success" to="/addassettype">Add Asset Type</NavLink><br/>
                </div>
                <div className="table-responsive font-12">
                    <table className="table table-hover">
                        <tbody>
                            <tr className="bg-gray">
                                <th>Asset Type Name</th>
                                <th>Asset Category</th>
                                <th>Created By</th>
                                <th>Date Created</th>
                            </tr>                      
                            <tr className="table-row">
                                <td>CASH AND CASH EQUIVALENTS</td>
                                <td>Current Assets</td>
                                <td>theresa chikwinya</td>
                                <td>10/05/2021</td>
                            </tr>
                            <tr className="table-row">
                                <td>OFFICE FURNITURE AND EQUIPMENT</td>
                                <td>Fixed Assets</td>
                                <td>Tamuka Mutinhima</td>
                                <td>10/01/2021</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}

export default AssetTypes;