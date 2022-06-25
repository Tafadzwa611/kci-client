import React from 'react';

const AddOldAsset = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Asset ]</label>
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>
                            Required_Fields
                        </span>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Asset Type</b></label>
                        <select className='custom-select-form'>
                            <option></option>
                            <option>Asset Type 1</option>
                            <option>Asset Type 2</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Asset Name</b></label>
                        <input className='custom-select-form' placeholder="Asset Name" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Asset Cost</b></label>
                        <input className='custom-select-form' placeholder="Asset Cost" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Salvage Cost</b></label>
                        <input className='custom-select-form' placeholder="Salvage Cost" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Useful Life</b></label>
                        <input className='custom-select-form' placeholder="Useful Life" />
                    </div>
                    <div className="info-tab" style={{marginTop:"1rem"}}>
                        <span>
                            Optional_Fields
                        </span>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Purchase Date</b></label>
                        <input className='custom-select-form' placeholder="Purchase Date" type="date" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Serial Number</b></label>
                        <input className='custom-select-form' placeholder="Serial Number" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Bought From</b></label>
                        <input className='custom-select-form' placeholder="Bought From" />
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Description</b></label>
                        <textarea style={{width:"50%", height:"5rem"}} className='custom-select-form'></textarea>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Asset Files</b></label>
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

export default AddOldAsset;