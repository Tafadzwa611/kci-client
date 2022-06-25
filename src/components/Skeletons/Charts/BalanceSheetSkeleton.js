import React from 'react';

const BalanceSheetSkeleton = () => {

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

                <div className="col-12 font-12 balance_sheet_date_range">
                    <div className="row" style={{display:"flex", columnGap:"1px", alignItems:"center", marginTop:"0"}}>
                        <div className="input-group">
                            <div className="skeleton custom-select-form-skeleton client-report" style={{width:"400px"}}></div>
                        </div>
                        <div style={{width:"400px", margin:"10px"}}>
                            <div className="skeleton custom-select-form-skeleton client-report" style={{width:"100%"}}></div>
                        </div>
                        <div style={{display:"flex", columnGap:"10px", margin:"10px"}}>
                            <div className="skeleton btn-skeleton client-report" style={{width:"100px"}}></div>
                            <div className="skeleton btn-skeleton client-report" style={{width:"80px"}}></div>
                        </div>
                    </div>
                    <div className="row row-balance-sheet" style={{padding:"0 10px 20px"}}>
                    <div className="skeleton skeleton-text form-control-title-skeleton"></div>
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

export default BalanceSheetSkeleton;