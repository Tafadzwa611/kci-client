import React, { Component } from 'react';

class Filter extends Component {

    render() {

        return (
            <div className="card-body">
                <form>
                    <div className="view_search_container online__applications">
                        <div className="row-payments-container">
                            <label className="form-label row-label">Enter Loan #</label>
                            <div className="input-group" style={{margin:"10px 0 0"}}>
                                <i class="uil uil-search"></i>
                                <input className="custom-select-form row-form input-background" placeholder="Enter Loan # ..."/>
                            </div>
                        </div>
                        <div className="row-payments-container">
                            <label className="form-label row-label">Min Reg Date</label>
                            <div className="input-group" style={{margin:"10px 0 0"}}>
                                <i class="uil uil-calendar-alt"></i>
                                <input className="custom-select-form row-form input-background" placeholder="Start Date" type="date" />
                            </div>
                        </div>
                        <div className="row-payments-container">
                            <label className="form-label row-label">Max Reg Date</label>
                            <div className="input-group" style={{margin:"10px 0 0"}}>
                                <i class="uil uil-calendar-alt"></i>
                                <input className="custom-select-form row-form input-background" placeholder="End Date" type="date" />
                            </div>
                        </div>
                        <div style={{display:"flex", flexDirection:"column"}}>
                            <label className="form-label row-label">Search</label>
                            <button className="btn btn-info btn-info-search" style={{margin:"10px 0 0"}}>Search</button>
                        </div>
                    </div>

                    <div className="filter-container">
                        <h5 className="table-heading">View Refunds</h5>
                        <div className="filter-container-float-right">
                            <div className="show">
                                <span>Showing</span>
                                <select className="custom-select">
                                    <option>10</option>
                                    <option>20</option>
                                    <option>30</option>
                                    <option>50</option>
                                    <option>100</option>
                                </select>
                            </div>
                            <button className="btn btn-export"><i class="uil uil-download-alt"></i> <span>Download Excel</span></button>
                        </div>
                    </div>
                </form>
            </div>
            );
        }
    }

export default Filter;