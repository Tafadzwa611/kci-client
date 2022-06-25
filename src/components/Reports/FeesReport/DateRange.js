import React from 'react';

const DateRange = () => {
    return (
        <div className="font-13 text-light">

            <div className="disbursement_date_range">

                <div className="disbursement-report-fields">
                    <div style={{width:"100%"}}>
                        <label className="form-label">Min Date</label>
                        <div className="reports-input-group" style={{margin:"10px 0 0"}}>
                            <i class="uil uil-calendar-alt"></i>
                            <input className="reports-form-control" type="date" />
                        </div>
                    </div>
                    <div style={{width:"100%"}}>
                        <label className="form-label">Max Date</label>
                        <div className="reports-input-group" style={{margin:"10px 0 0"}}>
                            <i class="uil uil-calendar-alt"></i>
                            <input className="reports-form-control" type="date" />
                        </div>
                    </div>
                </div>

                <div style={{marginTop:"20px"}}>
                    <div className="disbursement-report-fields">
                        <select className="report-custom-form-control">
                            <option style={{display:"none"}} selected>Select Branches </option>
                            <option>Harare</option>
                            <option>Harare</option>
                        </select>
                        <select className="report-custom-form-control currency">
                            <option style={{display:"none"}} selected>Select Currency </option>
                            <option>USD</option>
                            <option>USD</option>
                        </select>
                        <button className="btn btn-olive">Apply_Filter_!</button>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default DateRange;