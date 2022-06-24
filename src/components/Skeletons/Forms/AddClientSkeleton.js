import React from 'react';

const AddClientSkeleton = () => {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row" style={{margin:"0 0 20px"}}>
                        <label className="form-label"></label>
                        <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                    </div>
                    <div className="skeleton-bloc-tabs">
                        <div className="skeleton btn-skeleton"></div>
                        <div className="skeleton btn-skeleton"></div>
                        <div className="skeleton btn-skeleton"></div>
                        <div className="skeleton btn-skeleton"></div>
                        <div className="skeleton btn-skeleton"></div>
                        <div className="skeleton btn-skeleton"></div>
                        <div className="skeleton btn-skeleton"></div>
                        <div className="skeleton btn-skeleton"></div>
                    </div>
                    <div className="tab-content">
                        <div className="text-light">
                            <div className="row">
                                <div className="radio">
                                    <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                                </div>
                                <div className="radio-container font-13" style={{rowGap:"20px"}}>
                                    <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                                    <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                                </div>
                            </div>
                            <div className="load-more-container">
                                <label className="form-label"></label>
                                <div className="skeleton btn-skeleton"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AddClientSkeleton;