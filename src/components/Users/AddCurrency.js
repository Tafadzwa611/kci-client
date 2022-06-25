import React from 'react';

const AddCurrency = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Currency ]</label>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Currency Fullname</b></label>
                        <input className='custom-select-form' placeholder="e.g. Zimbabwean Dollar"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Currency ISO Code</b></label>
                        <input className='custom-select-form' placeholder="e.g. ZWL"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Date</b></label>
                        <input className='custom-select-form' type="date"/>
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

export default AddCurrency;