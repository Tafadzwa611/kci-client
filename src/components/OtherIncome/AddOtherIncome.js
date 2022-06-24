import React from 'react';

const AddOtherIncome = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Other Income ]</label>
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>
                            Required_Fields
                        </span>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Other Income Type</b></label>
                        <select className='custom-select-form'>
                            <option></option>
                            <option>Other Income Type 1</option>
                            <option>Other Income Type 2</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Other Income Name</b></label>
                        <input className='custom-select-form' placeholder="Other Income Name" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Other Income Amount</b></label>
                        <input className='custom-select-form' placeholder="Other Income Amount" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Other Income Date</b></label>
                        <input className='custom-select-form' placeholder="Other Income Date" type="date" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>
                            Optional_Fields
                        </span>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Reference</b></label>
                        <input className='custom-select-form' placeholder="Reference" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Description</b></label>
                        <textarea style={{width:"50%", height:"5rem"}} className='custom-select-form'></textarea>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Other Income Files</b></label>
                        <input type="file" />
                    </div>
                    <div className="form-submit-btn">
                        <label className="form-label"></label>
                        <button className="btn btn-info">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddOtherIncome;