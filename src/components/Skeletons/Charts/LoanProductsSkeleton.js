import React from 'react';


const LoanProductsSkeleton = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                <div style={{margin:"20px 0"}}>
                    <div className="skeleton btn-skeleton add-btn"></div>
                </div>
                <div className="report-container font-13">
                    <div className="row-reports date-ranger-upper-top"> 
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
                </div>
                <div style={{marginTop:"40px"}} className="loan_products_table_container">
                    <div className="table-responsive font-12">

                        <div className="skeleton skeleton-info-tab" style={{marginTop:"1rem"}}></div>

                        <table className="table table-hover" style={{marginTop:"20px"}}>
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
                            </tbody>
                        </table>
                    </div>
                    <div className="btn-flex-space-btwn">
                        <div className="skeleton btn-skeleton"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LoanProductsSkeleton;