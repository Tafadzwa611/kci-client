import React from 'react';

const AddCollateral = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Collateral ]</label>
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Required Fields</span>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Collateral Types </b></label>
                        <select className='custom-select-form'>
                            <option></option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Product Name</b></label>
                        <input className='custom-select-form' placeholder="Product Name"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Value</b></label>
                        <input className='custom-select-form' placeholder="Value" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Personal Details</span>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Current Status</b></label>
                        <select className='custom-select-form'>
                            <option>Lost</option>
                            <option>Sold</option>
                            <option>Under Auction</option>
                            <option>Repossesed</option>
                            <option>Repossession Initiated</option>
                            <option>returned to Client</option>
                            <option>Collateral with Client</option>
                            <option>Deposited into Bank</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Status Date</b></label>
                        <input className='custom-select-form' type="date" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Serial Number</b></label>
                        <input className='custom-select-form' placeholder="Serial Number" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Model Number</b></label>
                        <input className='custom-select-form' placeholder="Model Number" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Color</b></label>
                        <input className='custom-select-form' placeholder="Color" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Manufacture Date</b></label>
                        <input className='custom-select-form' type="date"/>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Condition</b></label>
                        <select className='custom-select-form'>
                            <option>Excellent</option>
                            <option>Good</option>
                            <option>Fair</option>
                            <option>Damaged</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Address</b></label>
                        <input className='custom-select-form' type="text" placeholder="Address"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Description</b></label>
                        <textarea style={{width:"50%", height:"5rem"}} className='custom-select-form' placeholder="Enter"></textarea>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Collateral Files</b></label>
                        <input type="file" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>Optional Fields (Vehicle Details)</span>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Registration Number</b></label>
                        <input className='custom-select-form' placeholder="Registration Number" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Mileage</b></label>
                        <input className='custom-select-form' placeholder="Mileage" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Engine Number</b></label>
                        <input className='custom-select-form' placeholder="Engine Number" />
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

export default AddCollateral;