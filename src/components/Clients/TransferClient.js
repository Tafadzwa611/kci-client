import React from 'react';

const TransferClient = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Transfer Client ]</label>
                    </div>
                    <div className="row">
                        <label className="form-label"><b>Branch</b></label>
                        <select className='custom-select-form'>
                            <option>Masvingo</option>
                        </select>
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

export default TransferClient;