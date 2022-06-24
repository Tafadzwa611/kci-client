import React from 'react';

const Filter = () => {

    const input_group = {
        margin: "10px 0"
    }

    return (
        <div className="report-container font-13">
            <div className="row-reports date-ranger-upper-top"> 
                <div className="fields-container">
                    <label className="form-label row-label">Start Date</label>
                    <div className="input-group" style={input_group}>
                        <i className="uil uil-calendar-alt"></i>
                        <input className="form-control" placeholder="Start Date" type="date" />
                    </div>
                </div>
                <div className="fields-container">
                    <label className="form-label row-label">End Date</label>
                    <div className="input-group" style={input_group}>
                        <i className="uil uil-calendar-alt"></i>
                        <input className="form-control" placeholder="Start Date" type="date" />
                    </div>
                </div>
                <div className="fields-container">
                    <label className="form-label row-label">Search Guarantor</label>
                    <div className="input-group" style={input_group}>
                        <i className="uil uil-search"></i>
                        <input className="form-control" placeholder="Search Guarantor..." />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter;