import React from 'react';

const NotificationSkeleton = () => {
    return (
        <div className="card">
            <div className="skeleton callout callout-info font-12">
                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
            </div>
        </div>
    );
}

export default NotificationSkeleton;