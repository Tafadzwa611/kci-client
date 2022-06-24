import React from 'react';

const AddBranch = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Branch ]</label>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Branch Name</b></label>
                        <input className='custom-select-form' placeholder="Branch Name"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Branch Code</b></label>
                        <input className='custom-select-form' placeholder="Branch Code"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Location</b></label>
                        <input className='custom-select-form' placeholder="Branch Location"/>
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

export default AddBranch;