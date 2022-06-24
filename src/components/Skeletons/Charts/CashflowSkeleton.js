import React from 'react';

const CashflowSkeleton = () => {

    const nodata_container = {
        display: "block",
        textAlign: "center",
        marginTop: "20px"
    }

    const flex = {
        display:"flex",
        columnGap:"10px",
        justifyContent:"center",
        alignItems:"center"
    }

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

                <div style={nodata_container}>
                    <div className="text" style={flex}>
                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{marginBottom:"30px"}}></div>
                    </div>
                    <div style={{display:"flex", justifyContent:"center"}}>
                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"40%"}}></div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default CashflowSkeleton;