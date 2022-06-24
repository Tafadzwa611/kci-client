import React from 'react';

const UploadPaymentsFile = () => {
    return (
        <div className="card text-light slide">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <label className="form-title">[ Upload Payments File  ]</label>
                    </div>

                    <div className="row">
                        <label className="form-label"><b>Add payments file</b></label>
                        <button className="btn btn-info">Upload Payments File</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadPaymentsFile;