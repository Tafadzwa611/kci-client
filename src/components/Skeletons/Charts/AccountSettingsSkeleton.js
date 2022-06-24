import React from 'react';

const AccountSettingsSkeleton = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                <div className="table-responsive font-12">
                    <table className="table" style={{margin:"1rem 0"}}>
                        <tbody>            
                            <tr className="skeleton-table-row">
                                <div className="skeleton skeleton-text"></div>
                            </tr>
                            <tr className="skeleton-table-row">
                                <div className="skeleton skeleton-text"></div>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn-flex-space-btwn">
                    <div className="skeleton btn-skeleton"></div>
                </div>

            </div>
        </div>
    )
}

export default AccountSettingsSkeleton;