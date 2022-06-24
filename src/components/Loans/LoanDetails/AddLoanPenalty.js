import React from 'react';

const AddLoanPenalty = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Penalty ]</label>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Amount</b></label>
                        <input className='custom-select-form' placeholder="Enter Amount"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Description</b></label>
                        <textarea style={{width:"50%", height:"5rem"}} className='custom-select-form' placeholder="Enter"></textarea>
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

export default AddLoanPenalty;