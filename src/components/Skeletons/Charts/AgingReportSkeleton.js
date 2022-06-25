import React from 'react';

const AgingReportSkeleton = () => {

    const mystyle_select = {
        width:"40%"
    }

    return (
        <div className="card">
            <div className="card-body font-12">
                
                <div className="skeleton skeleton-text form-control-title-skeleton" style={{marginBottom:"30px"}}></div>
                <div class="skeleton callout callout-info" style={{marginTop:"20px"}}>
                    <div className="skeleton custom-select-form-skeleton client-report"></div>
                </div>

                <div className="reports__filter__container font-13 text-light" style={{padding:"20px"}}>
                    <div className="filter-upper" style={{display:"flex", justifyContent:"space-between", columnGap:"1rem", width:"100%"}}>
                        <div className="input-container" style={{width:"30%"}}>
                            <div className="skeleton skeleton-text client-report" style={{marginBottom:"20px"}}></div>
                            <div className="input-group" style={{margin:"10px 0 0"}}>
                                <div className="skeleton custom-select-form-skeleton client-report"></div>
                            </div>
                        </div>
                        <div className="input-container" style={{width:"30%"}}>
                            <div className="skeleton skeleton-text client-report" style={{marginBottom:"20px"}}></div>
                            <div className="input-group" style={{margin:"10px 0 0"}}>
                                <div className="skeleton custom-select-form-skeleton client-report"></div>
                            </div>
                        </div>
                        <div className="input-container" style={{width:"30%"}}>
                            <div className="skeleton skeleton-text client-report" style={{marginBottom:"20px"}}></div>
                            <div className="input-group" style={{margin:"10px 0 0"}}>
                                <div className="skeleton custom-select-form-skeleton client-report"></div>
                            </div>
                        </div>
                    </div>
                    <div className="filter-lower" style={{display:"flex", justifyContent:"space-between", columnGap:"1rem", width:"100%", marginTop:"20px"}}>
                        <div className="fields-container-select" style={mystyle_select}>
                            <div className="skeleton custom-select-form-skeleton client-report"></div>
                        </div>
                        <div className="fields-container-select" style={mystyle_select}>
                            <div className="skeleton custom-select-form-skeleton client-report"></div>
                        </div>
                        <div className="fields-container">
                            <div className="skeleton btn-skeleton client-report"></div>
                        </div>
                    </div>
                </div>

                <div style={{marginTop:"40px"}} className="aging_report">
                    <div className='table-responsive font-12'>
            `           <table className='table table-centered table-hover'>
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
                                <tr className="skeleton-table-row">
                                    <div className="skeleton skeleton-text"></div>
                                </tr>
                            </tbody>
                        </table>
                    </div>`
                    <div className="load-more-container card-body border__bottom">
                        <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                        <div className="skeleton btn-skeleton client-report"></div>
                    </div>

                </div>

            </div>
        </div>
    );
}

export default AgingReportSkeleton;