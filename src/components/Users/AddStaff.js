import React from 'react';

const AddStaff = () => {
    return (
        <div className="card slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Staff ]</label>
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>User Details</span>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Staff Roles</b></label>
                        <select className='custom-select-form'>
                            <option></option>
                            <option>Admin</option>
                            <option>Loans Officer</option>
                        </select>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Branch</b></label>
                        <select className='custom-select-form'>
                            <option>Main Branch</option>
                            <option>Masvingo</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>First Name</b></label>
                        <input className='custom-select-form' placeholder="First Name" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Last name</b></label>
                        <input className='custom-select-form' placeholder="Last Name" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Email</b></label>
                        <input className='custom-select-form' placeholder="Email" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Password</b></label>
                        <input className='custom-select-form' placeholder="New Password"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Confirm Password</b></label>
                        <input className='custom-select-form' placeholder="Confirm Password" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Optional Details</span>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Date of Birth</b></label>
                        <input className='custom-select-form' type="date" />
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Gender</b></label>
                        <select className='custom-select-form'>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Phone Number</b></label>
                        <input className='custom-select-form' placeholder="Phone Number" />
                    </div>                
                    <div className="row custom-background">
                        <label className="form-label"><b>Address</b></label>
                        <input className='custom-select-form' placeholder="Address" />
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Image</b></label>
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

export default AddStaff;