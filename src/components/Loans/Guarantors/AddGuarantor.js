import React from 'react';

const AddGuarantor = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Guarantor ]</label>
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Personal details</span>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>First Name</b></label>
                        <input className='custom-select-form' placeholder="Enter First Name" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Last Name</b></label>
                        <input className='custom-select-form' placeholder="Enter Last Name" />
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Gender</b></label>
                        <select className='custom-select-form'>
                            <option></option>
                            <option>Male</option>
                            <option>Female</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Date of Birth</b></label>
                        <input className='custom-select-form' type="date" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Phone Number</b></label>
                        <input className='custom-select-form' placeholder="Enter Phone Number" />
                    </div>                
                    <div className="row custom-background">
                        <label className="form-label"><b>Email</b></label>
                        <input className='custom-select-form' placeholder="Enter Email" />
                    </div>                
                    <div className="row custom-background">
                        <label className="form-label"><b>Home Address</b></label>
                        <input className='custom-select-form' placeholder="Enter Home Address" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Work details</span>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Employer</b></label>
                        <input className='custom-select-form' placeholder="Enter Employer" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Job Position</b></label>
                        <input className='custom-select-form' placeholder="Enter Job Position" />
                    </div>                
                    <div className="row custom-background">
                        <label className="form-label"><b>Ec Number</b></label>
                        <input className='custom-select-form' placeholder="Enter Ec Number" />
                    </div>                
                    <div className="row custom-background">
                        <label className="form-label"><b>Work Address</b></label>
                        <input className='custom-select-form' placeholder="Enter Work Address" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Identification</span>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Identification Number</b></label>
                        <input className='custom-select-form' placeholder="Enter Identification Number" />
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Identification Type</b></label>
                        <select className='custom-select-form'>
                            <option>National ID</option>
                            <option>Passport</option>
                            <option>Licence</option>
                        </select>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Guarantor's Files</b></label>
                        <input type="file" />
                    </div>
                    <div className="form-submit-btn">
                        <label className="form-label"></label>
                        <button className="btn btn-info">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddGuarantor;