import React from 'react';

const Filter = () => {
    return (
        <div className="col-12 font-12 balance_sheet_date_range text-light">
            <div className="row" style={{display:"flex", columnGap:"1px", alignItems:"center", marginTop:"0"}}>
                <div className="input-group">
                    <i class="uil uil-calendar-alt"></i>
                    <input type="date" className="form-control input-background" style={{width:"400px"}}/>
                </div>
                <div style={{width:"400px", margin:"10px"}}>
                    <select className="report-custom-form-control currency" style={{width:"100%"}}>
                        <option style={{display:"none"}} selected>Select Currency </option>
                        <option>USD</option>
                        <option>USD</option>
                    </select>
                </div>
                <div style={{display:"flex", columnGap:"10px", margin:"10px"}}>
                    <button className="btn btn-olive">Apply_Filters_!</button>
                    <button className="btn btn-purple">Reset</button>
                </div>
            </div>
            <div className="row row-balance-sheet">
                <div className="row-balance-sheet-items">
                    <input type="checkbox"/>
                    <label>All Branches</label>
                </div>
                <div className="row-balance-sheet-items">
                    <input type="checkbox"/>
                    <label>Masvingo</label>
                </div>
                <div className="row-balance-sheet-items">
                    <input type="checkbox"/>
                    <label>Gweru</label>
                </div>
            </div>
        </div>
    )
}

export default Filter;