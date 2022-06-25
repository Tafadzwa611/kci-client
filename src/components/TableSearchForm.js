import React from 'react';

const TableSearchForm = (props) => {
    return (
        <div className="card-body">
            <form>
                <div className="view_search_container">
                    <div className="input-group">
                        <i class="uil uil-search"></i>
                        <input className="form-control" placeholder="Search..."/>
                    </div>
                    <div className="input-group">
                        <i class="uil uil-calendar-alt"></i>
                        <input className="form-control" placeholder="Start Date" type="date" />
                    </div>
                    <div className="input-group">
                        <i class="uil uil-calendar-alt"></i>
                        <input className="form-control" placeholder="End Date" type="date" />
                    </div>
                    <button className="btn btn-info btn-info-search">Search</button>
                </div>

                <div className="filter-container">
                    <h5 className="table-heading">{props.heading}</h5>
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

export default TableSearchForm;