import React from 'react';

const FeesReport = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="skeleton skeleton-text form-control-title-skeleton" style={{marginBottom:"30px"}}></div>

                <div className="font-13 text-light">

                    <div className="disbursement_date_range">

                        <div className="disbursement-report-fields">
                            <div style={{width:"100%"}}>
                                <div className="skeleton skeleton-text client-report" style={{marginBottom:"20px"}}></div>
                                <div className="reports-input-group" style={{margin:"10px 0 0"}}>
                                    <div className="skeleton custom-select-form-skeleton client-report"></div>
                                </div>
                            </div>
                            <div style={{width:"100%"}}>
                            <div className="skeleton skeleton-text client-report" style={{marginBottom:"20px"}}></div>
                                <div className="reports-input-group" style={{margin:"10px 0 0"}}>
                                    <div className="skeleton custom-select-form-skeleton client-report"></div>
                                </div>
                            </div>
                        </div>

                        <div style={{marginTop:"20px"}}>
                            <div className="disbursement-report-fields">
                                <div className="skeleton custom-select-form-skeleton client-report"></div>
                                <div className="skeleton custom-select-form-skeleton client-report"></div>
                                <div className="skeleton btn-skeleton client-report" style={{width:"200px"}}></div>
                            </div>
                        </div>

                    </div>
                </div>

                <div className="header-container font-12">
                    <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                    <div style={{display:"none"}}>
                        Showing 1 of 100 loans
                    </div>
                </div>

                <div className="table-container">
                    <div class="table-responsive font-12" style={{maxHeight:"600px"}}>
                        <table class="table table-hover">
                            <thead>
                                <tr>
                                    <th className="reports-table-border-left reports-table-border-right">
                                        <div className="skeleton skeleton-text" style={{width:"100%"}}></div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="skeleton bg-gray text-left" colspan="9">
                                        <div className="skeleton" style={{height:"1.125rem"}}></div>
                                    </td>
                                </tr>
                                <tr className="table-row">
                                    <td className="reports-table-border-left reports-table-border-right skeleton-table-bottom">
                                        <div className="skeleton skeleton-text" style={{width:"100%"}}></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="footer-container font-12">

                    <div className="load-btn">
                        <div className="skeleton btn-skeleton client-report"></div>
                    </div>
                    
                </div>

            </div>
        </div>
    );
}

export default FeesReport;