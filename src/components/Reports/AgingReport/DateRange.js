import React from 'react';

const DateRange =()=> {

    const mystyle = {
        width:"100%"
    }

    const mystyle_select = {
        width:"40%"
    }

    const input_group = {
        margin: "10px 0"
    }

    return (
        <div className="report-container font-13">
            <div className="row-reports date-ranger-upper-top"> 
                <div className="fields-container">
                    <label className="form-label">Start Date</label>
                    <div className="input-group" style={input_group}>
                        <i className="uil uil-calendar-alt"></i>
                        <input className="form-control" placeholder="Start Date" type="date" />
                    </div>
                </div>
                <div className="fields-container">
                    <label className="form-label">End Date</label>
                    <div className="input-group" style={input_group}>
                        <i className="uil uil-calendar-alt"></i>
                        <input className="form-control" placeholder="Start Date" type="date" />
                    </div>
                </div>
                <div className="fields-container">
                    <label className="form-label">Search</label>
                    <div className="input-group" style={input_group}>
                        <select className='custom-select-form' placeholder="Select Branches">
                            <option style={{display:"none"}} selected>Select Branches </option>
                            <option>Branch 1</option>
                            <option>Branch 2</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="row-reports date-ranger-bottom">
                <div className="fields-container-select" style={mystyle_select}>
                    <select className='custom-select-form' placeholder="Select Loan Period" style={mystyle}>
                        <option style={{display:"none"}} selected>Select Period </option>
                        <option>
                            Loans that are overdue between 1 and 30 days
                        </option>
                        <option>
                            Loans that are overdue between 31 and 60 days
                        </option>
                        <option>
                            Loans that are overdue between 61 and 90 days
                        </option>
                        <option>                         
                            Loans that are overdue by 91+ days
                        </option>
                    </select>
                </div>
                <div className="fields-container-select" style={mystyle_select}>
                    <select className='custom-select-form' placeholder="Select Currency" style={mystyle}>
                        <option style={{display:"none"}} selected>Select Currency </option>
                        <option>USD</option>
                        <option>ZWL</option>
                    </select>
                </div>
                <div className="fields-container">
                    <button className="btn btn-olive">Apply filters !</button>
                </div>
            </div>
        </div>
    )
}

export default DateRange;