import React from 'react';

const AddCollateralType = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Collateral Type ]</label>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Name</b></label>
                        <input className='custom-select-form' placeholder="Collateral Type name"/>
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

export default AddCollateralType;