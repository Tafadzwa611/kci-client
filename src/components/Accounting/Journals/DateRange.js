import React from 'react';

const DateRange = () => {

    const mystyle = {
        width:"100%"
    }

    const mystyle_select = {
        width:"40%"
    }

    return (
        <div className="reports__filter__container font-13 text-light" style={{padding:"20px"}}>
            <div className="filter-upper" style={{display:"flex", justifyContent:"space-between", columnGap:"1rem", width:"100%"}}>
                <div className="input-container" style={{width:"30%"}}>
                    <label className="">Enter Account</label>
                    <div className="input-group" style={{margin:"10px 0 0"}}>
                        <i className="uil uil-search"></i>
                        <input className="form-control input-background" placeholder="Enter Account..." />
                    </div>
                </div>
                <div className="input-container" style={{width:"30%"}}>
                    <label className="">Start Date</label>
                    <div className="input-group" style={{margin:"10px 0 0"}}>
                        <i className="uil uil-calendar-alt"></i>
                        <input className="form-control input-background" placeholder="Start Date" type="date" />
                    </div>
                </div>
                <div className="input-container" style={{width:"30%"}}>
                    <label className="">End Date</label>
                    <div className="input-group" style={{margin:"10px 0 0"}}>
                        <i className="uil uil-calendar-alt"></i>
                        <input className="form-control input-background" placeholder="End Date" type="date" />
                    </div>
                </div>
            </div>
            <div className="filter-lower" style={{display:"flex", justifyContent:"space-between", columnGap:"1rem", width:"100%", marginTop:"20px"}}>
                <div className="fields-container-select" style={mystyle_select}>
                    <select className='custom-select-form' placeholder="Select Branches" style={mystyle}>
                        <option style={{display:"none"}} selected>Select Branches </option>
                        <option>Branch 1</option>
                        <option>Branch 2</option>
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
    );
}


export default DateRange;