import React from 'react';

const DateRange = () => {

    const mystyle = {
        width:"100%"
    }

    const mystyle_select = {
        width:"25%"
    }

    const input_group = {
        margin: "0"
    }

    return (
        <div className="report-container font-13 top-borrowers">
            <div className="row-reports date-ranger-upper-top"> 
                <div className="fields-container">
                    <div className="input-group" style={input_group}>
                        <i className="uil uil-calendar-alt"></i>
                        <input className="form-control" type="date" />
                    </div>
                </div>
                <div className="fields-container-select" style={mystyle_select}>
                    <select className='custom-select-form' placeholder="Select Branches" style={mystyle}>
                        <option style={{display:"none"}} selected>Select Branches </option>
                        <option>Branch 1</option>
                        <option>Branch 2</option>
                    </select>
                </div>
                <div className="fields-container-select" style={mystyle_select}>
                    <select className='custom-select-form' placeholder="Select Branches" style={mystyle}>
                        <option style={{display:"none"}} selected>Select Currency</option>
                        <option>ZWL</option>
                        <option>USD</option>
                    </select>
                </div>
                <div className="fields-container">
                    <button className="btn btn-olive">Apply_filters_!</button>
                </div>
            </div>
        </div>
    );
}

export default DateRange;