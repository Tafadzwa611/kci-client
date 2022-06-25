import React from 'react';

const TrialBalanceSkeleton = () => {

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

                <div className="font-13">
                    <form>
                        <div className="view_search_container online__applications font-13">
                            <div className="row-payments-container" style={{width:"27%"}}>
                                <div className="skeleton skeleton-text client-report" style={{marginBottom:"12px"}}></div>
                                <div className="input-group" style={{margin:"10px 0 0"}}>
                                    <div className="skeleton custom-select-form-skeleton client-report"></div>
                                </div>
                            </div>
                            <div className="row-payments-container" style={{width:"27%"}}>
                                <div className="skeleton skeleton-text client-report" style={{marginBottom:"12px"}}></div>
                                <div className="skeleton custom-select-form-skeleton client-report" style={{margin:"10px 0 0"}}></div>
                            </div>
                            <div className="row-payments-container" style={{width:"27%"}}>
                                <div className="skeleton skeleton-text client-report" style={{marginBottom:"12px"}}></div>
                                <div className="skeleton custom-select-form-skeleton client-report" style={{margin:"10px 0 0"}}></div>
                            </div>
                            <div style={{display:"flex", flexDirection:"column"}}>
                                <div className="skeleton skeleton-text client-report" style={{marginBottom:"12px"}}></div>
                                <div className="skeleton btn-skeleton client-report" style={{margin:"10px 0 0"}}></div>
                            </div>
                        </div>
                    </form>
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

export default TrialBalanceSkeleton;