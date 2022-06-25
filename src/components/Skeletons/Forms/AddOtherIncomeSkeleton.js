import React from 'react';

const AddOtherIncomeSkeleton = () => {
    return (
        <div className="card text-light">
            <div className="card-body">

                <form>
                    <div className="row">
                        <label className="form-label"></label>
                        <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                    </div>
                    <div className="skeleton skeleton-info-tab" style={{marginTop:"1rem"}}></div>
                    <div className="row">
                        <div className="form-label">
                            <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                        </div>
                        <div className="skeleton custom-select-form-skeleton"></div>
                    </div>
                    <div className="row">
                        <div className="form-label">
                            <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                        </div>
                        <div className="skeleton custom-select-form-skeleton"></div>
                    </div>
                    <div className="row">
                        <div className="form-label">
                            <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                        </div>
                        <div className="skeleton custom-select-form-skeleton"></div>
                    </div>
                    <div className="row">
                        <div className="form-label">
                            <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                        </div>
                        <div className="skeleton custom-select-form-skeleton"></div>
                    </div>
                    <div className="skeleton skeleton-info-tab" style={{marginTop:"1rem"}}></div>
                    <div className="row">
                        <div className="form-label">
                            <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                        </div>
                        <div className="skeleton custom-select-form-skeleton"></div>
                    </div>
                    <div className="row">
                        <div className="form-label">
                            <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                        </div>
                        <div className="skeleton custom-select-textarea-skeleton"></div>
                    </div>
                    <div className="row">
                        <div className="form-label">
                            <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                        </div>
                        <div className="skeleton custom-select-form-skeleton"></div>
                    </div>
                    <div className="form-submit-btn">
                        <label className="form-label"></label>
                        <div className="skeleton btn-skeleton"></div>
                    </div>
                </form>

            </div>
        </div>
    );
}

export default AddOtherIncomeSkeleton;