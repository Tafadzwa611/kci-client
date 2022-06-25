import React from 'react';

const SkeletonTable = () => {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <div className="row-containers">
                        <div className="row row-payments" style={{marginTop:"0"}}>
                            <div className="row-payments-container">
                                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                                <div className="skeleton skeleton-text skeleton-input"></div>
                            </div>
                            <div className="row-payments-container">
                                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                                <div className="skeleton skeleton-text skeleton-input"></div>
                            </div>
                            <div className="row-payments-container">
                                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                                <div className="skeleton skeleton-text skeleton-input"></div>
                            </div>
                            <div className="row-payments-container">
                                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                                <div className="skeleton skeleton-text skeleton-input"></div>
                            </div>
                        </div>
                        <div className="row row-payments" style={{marginTop:"1.5rem"}}>
                            <div className="row-payments-container">
                                <div className="skeleton skeleton-text skeleton-input"></div>
                            </div>
                            <div className="row-payments-container">
                                <div className="skeleton skeleton-text skeleton-input"></div>
                            </div>
                            <div className="row-payments-container">
                                <div className="skeleton skeleton-text skeleton-input"></div>
                            </div>
                            <div className="row-payments-container">
                                <div className="skeleton skeleton-text skeleton-input"></div>
                            </div>
                            <div className="skeleton btn-skeleton"></div>
                        </div>
                    </div>

                    <div className="filter-container">
                        <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                        <div className="filter-container-float-right">
                            <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="card">
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
                            <tr className="skeleton-table-row last-row">
                                <div className="skeleton skeleton-text"></div>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="filter-container skeleton-table-footer">
                    <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                    <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                </div>
            </div>
        </>
    )
}

export default SkeletonTable;