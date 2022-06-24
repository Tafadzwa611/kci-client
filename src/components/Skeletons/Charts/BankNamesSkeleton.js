import React from 'react';

const BankNamesSkeleton = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                <div style={{margin:"20px 0"}}>
                    <div className="skeleton btn-skeleton add-btn"></div>
                </div>
                <div className='table-responsive font-12'>
                    <table className='table table-centered table-hover'>
                        <thead className="thead-light">
                            <tr className="skeleton-table-thead">
                                <div className="skeleton skeleton-text"></div>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="skeleton-table-row">
                                <div className="skeleton skeleton-text"></div>
                            </tr>
                            <tr className="skeleton-table-row">
                                <div className="skeleton skeleton-text"></div>
                            </tr>
                            <tr className="skeleton-table-row">
                                <div className="skeleton skeleton-text"></div>
                            </tr>
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

export default BankNamesSkeleton;