import React from 'react';

const AddAssetSkeleton = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                <div className="add-assets">
                    <div className="skeleton btn-skeleton"></div>
                    <div className="skeleton btn-skeleton"></div>
                </div>
            </div>
        </div>
    );
}

export default AddAssetSkeleton;