import React from 'react';

const UploadPaymentsFileSkeleton = () => {
    return (
        <div className="card text-light">
            <div className="card-body">
                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                    </div>

                    <div className="row">
                        <div className="form-label">
                            <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                        </div>
                        <div className="skeleton btn-skeleton upload-payments-file"></div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default UploadPaymentsFileSkeleton;