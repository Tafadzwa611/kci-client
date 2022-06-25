import React from 'react';

const AddStaffRole = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Staff Role ]</label>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Staff Role Name</b></label>
                        <input className='custom-select-form' placeholder="Staff Role"/>
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

export default AddStaffRole;