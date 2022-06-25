import React from 'react';

const Filter = () => {
    return (
        <form>
            <div className="view_search_container online__applications font-13">
                <div className="row-payments-container" style={{width:"27%"}}>
                    <label className="form-label row-label">Enter Date</label>
                    <div className="input-group" style={{margin:"10px 0 0"}}>
                        <i className="uil uil-calendar-alt"></i>
                        <input className="custom-select-form row-form input-background" type="date"/>
                    </div>
                </div>
                <div className="row-payments-container" style={{width:"27%"}}>
                    <label className="form-label row-label">Select Branch</label>
                    <select className='custom-select-form row-form' style={{margin:"10px 0 0"}}>
                        <option>Branch 1</option>
                        <option>Branch 2</option>
                    </select>
                </div>
                <div className="row-payments-container" style={{width:"27%"}}>
                    <label className="form-label row-label">Select Currency</label>
                    <select className='custom-select-form row-form' style={{margin:"10px 0 0"}}>
                        <option>ZWL</option>
                        <option>USD</option>
                    </select>
                </div>
                <div style={{display:"flex", flexDirection:"column"}}>
                    <label className="form-label row-label">Search</label>
                    <button className="btn btn-olive" style={{margin:"10px 0 0"}}>Apply_filters_</button>
                </div>
            </div>
        </form>
    )
}

export default Filter;