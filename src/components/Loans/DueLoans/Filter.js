import React from 'react';

const Filter = () => {
    return (
        <div className="card-body">
            <form>
                <div className="view_search_container online__applications">
                    <div className="row-payments-container">
                        <label className="form-label row-label">Enter</label>
                        <div className="input-group" style={{margin:"10px 0 0"}}>
                            <i class="uil uil-search"></i>
                            <input className="custom-select-form row-form input-background" placeholder="Enter..."/>
                        </div>
                    </div>
                    <div className="row-payments-container">
                        <label className="form-label row-label">Select Branch</label>
                        <select className='custom-select-form row-form' style={{margin:"10px 0 0"}}>
                            <option>Branch 1</option>
                            <option>Branch 2</option>
                        </select>
                    </div>
                    <div className="row-payments-container">
                        <label className="form-label row-label">Select Currency</label>
                        <select className='custom-select-form row-form' style={{margin:"10px 0 0"}}>
                            <option>ZWL</option>
                            <option>USD</option>
                        </select>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <label className="form-label row-label">Search</label>
                        <button className="btn btn-info btn-info-search" style={{margin:"10px 0 0"}}>Search</button>
                    </div>
                </div>

                <div className="filter-container">
                    <h5 className="table-heading">Due Loans</h5>
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
    )
}

export default Filter;