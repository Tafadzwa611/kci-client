import React from 'react';

const DailyReportSkeleton = () => {
    return (
        <div className="card">
            <div className="card-body">
                <div className="skeleton skeleton-text form-control-title-skeleton" style={{marginBottom:"30px"}}></div>

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

                <div className="header-container font-12">
                    <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                    <div style={{display:"none"}}>
                        Showing 1 of 100 loans
                    </div>
                </div>

                <div className="table-container font-12">
                    <div class="table-responsive" style={{maxHeight:"800px"}}>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <td className="skeleton bg-gray text-left" colspan="6">
                                        <div className="skeleton" style={{height:"1.125rem"}}></div>
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
                                <tr>
                                    <td className="skeleton bg-gray text-left" colspan="6">
                                        <div className="skeleton" style={{height:"1.125rem"}}></div>
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
                                <tr>
                                    <td className="skeleton bg-gray text-left" colspan="6">
                                        <div className="skeleton" style={{height:"1.125rem"}}></div>
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
                                <tr>
                                    <td className="skeleton bg-gray text-left" colspan="9">
                                        <div className="skeleton" style={{height:"1.125rem"}}></div>
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

                <div className="footer-container font-12">

                    <div className="load-btn">
                        <div className="skeleton btn-skeleton client-report"></div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default DailyReportSkeleton;