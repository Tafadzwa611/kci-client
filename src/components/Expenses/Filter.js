import React from 'react';
import { NavLink } from 'react-router-dom';


const Filter = (props) => {

    const {
        expName,
        setExpName,
        minDateCreated,
        setMinDateCreated,
        maxDateCreated,
        setMaxDateCreated,
        onSubmit
    } = props;

    return (
        <div className="card-body">
            <div style={{marginBottom:"1.5rem"}}>
                <NavLink className="btn btn-success" to="/app/expenses/addexpense">Add Expense</NavLink>
            </div>
            <form onSubmit={onSubmit}>
                <div className="view_search_container online__applications">
                    <div className="row-payments-container">
                        <label className="form-label row-label">Enter Expense Name</label>
                        <div className="input-group" style={{margin:"10px 0 0"}}>
                            <i class="uil uil-search"></i>
                            <input 
                                className="custom-select-form row-form input-background" 
                                placeholder="Enter Expense Name..."
                                autoComplete='off'
                                type="text"
                                value={expName}
                                onChange={(e) => setExpName(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row-payments-container">
                        <label className="form-label row-label">Min Date Created</label>
                        <div className="input-group" style={{margin:"10px 0 0"}}>
                            <i class="uil uil-calendar-alt"></i>
                            <input 
                                className="custom-select-form row-form input-background" 
                                type="date" 
                                value={minDateCreated}
                                onKeyDown={(e) => e.preventDefault()}
                                onChange={(e) => setMinDateCreated(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="row-payments-container">
                        <label className="form-label row-label">Max Date Created</label>
                        <div className="input-group" style={{margin:"10px 0 0"}}>
                            <i class="uil uil-calendar-alt"></i>
                            <input 
                                className="custom-select-form row-form input-background" 
                                type="date" 
                                value={maxDateCreated}
                                onKeyDown={(e) => e.preventDefault()}
                                onChange={(e) => setMaxDateCreated(e.target.value)}
                            />
                        </div>
                    </div>
                    <div style={{display:"flex", flexDirection:"column"}}>
                        <label className="form-label row-label">Search</label>
                        <button type="submit" className="btn btn-info btn-info-search" style={{margin:"10px 0 0"}}>Search</button>
                    </div>
                </div>

                <div className="filter-container">
                    <h5 className="table-heading">View Expenses</h5>
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

export default Filter;