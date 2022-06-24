import React from 'react';

const HomeSkeleton = () => {
    return (
        <div className="card">
            <div className="info-box">
                <div className="skeleton skeleton-text form-control-title-skeleton welcome-note"></div>
                <div className="skeleton skeleton-text form-control-title-skeleton welcome-instructions"></div>
            </div>
        </div>
    )
}

export default HomeSkeleton;