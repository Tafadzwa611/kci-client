import React from 'react';

const AddMainAccount = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Add Main Account ]</label>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>General Ledger Name</b></label>
                        <input className='custom-select-form' placeholder="General Ledger Name"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>General Ledger Code</b></label>
                        <input className='custom-select-form' placeholder="General Ledger Code"/>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Date of Account Opening</b></label>
                        <input className='custom-select-form' type="date" placeholder="Date of Account Opening"/>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Account Type</b></label>
                        <select className='custom-select-form'>
                            <option>ASSET</option>
                            <option>LIABILITY</option>
                            <option>EQUITY</option>
                            <option>INCOME</option>
                            <option>EXPENSE</option>
                            <option>CONTRA ASSET</option>
                        </select>
                    </div>
                    <div className="row custom-background">
                        <label className="form-label"><b>Description</b></label>
                        <textarea style={{width:"50%", height:"5rem"}} className='custom-select-form' placeholder="Enter ..."></textarea>
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

export default AddMainAccount;