import React from 'react';

const AddOtherIncomeType = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Other Income Type ]</label>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Name</b></label>
                        <input className='custom-select-form' placeholder="Other Income Type name"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Date</b></label>
                        <input className='custom-select-form' type="date"/>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Currency</b></label>
                        <select className='custom-select-form'>
                            <option></option>
                            <option>Currency 1</option>
                            <option>Currency 2</option>
                        </select>
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

export default AddOtherIncomeType;