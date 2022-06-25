import React from 'react';

const AddBankName = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Bank Name ]</label>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Bank Name</b></label>
                        <input className='custom-select-form' placeholder="Bank Name"/>
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

export default AddBankName;