import React from 'react';

const PortfolioAtRiskReport = () => {
    return (
        <div className="card">
            <div className="card-body font-12">
                <div className="skeleton skeleton-text form-control-title-skeleton" style={{marginBottom:"30px"}}></div>
                <div class="skeleton callout callout-info" style={{marginTop:"20px"}}>
                    <div className="skeleton custom-select-form-skeleton client-report"></div>
                </div>
                <div className="table-container par_report" style={{marginTop:"24px"}}>
                    <div className="table-responsive font-12" style={{maxHeight:"600px"}}>
                        <table className="table" style={{width:"100%"}}>
                            <thead>
                                <tr>
                                    <td className="skeleton bg-gray text-left">
                                        <div className="skeleton" style={{height:"1.125rem"}}></div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>
                                        <div className="skeleton skeleton-text" style={{width:"100%"}}></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="skeleton skeleton-text" style={{width:"100%"}}></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className="skeleton skeleton-text" style={{width:"100%"}}></div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PortfolioAtRiskReport;