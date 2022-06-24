import React from 'react';

const LoanDetailSkeleton = () => {

    return (
        <div className="text-light">
            <div className="card">
                <div className="card-body">
                    <div className="loan-details-client-info-section">

                        <div className="loan-details-client-info">
                            <div></div>
                            <div>
                                <ul className="loan-details-client-info-list">
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"200px"}}></div>
                                    </li>
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"170px"}}></div>
                                    </li>
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"175px"}}></div>
                                    </li>
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"165px"}}></div>
                                    </li>
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"145px"}}></div>
                                    </li>
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"172px"}}></div>
                                    </li>
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"125px"}}></div>
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <ul className="loan-details-client-info-list">
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"150px"}}></div>
                                    </li>
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"295px"}}></div>
                                    </li>
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"155px"}}></div>
                                    </li>
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"95px"}}></div>
                                    </li>
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"80px"}}></div>
                                    </li>
                                    <li>
                                        <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"130px"}}></div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div style={{display:"flex", columnGap:"5px"}}>
                            <div className="skeleton btn-skeleton client-report"></div>
                            <div className="skeleton btn-skeleton client-report"></div>
                        </div>

                    </div>

                    <div className='table-responsive font-12' style={{marginTop:"20px"}}>
                        <table className='table table-centered'>
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
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="card">
                <div className="card-body">

                    <div style={{marginTop:"20px", fontSize:"0.6875rem"}}>
                        <div className="bloc-tabs">
                            <div className="skeleton btn-skeleton client-tabs"></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton loan__details__skeleton" style={{margin:"15px 5px"}}></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton loan__details__skeleton" style={{margin:"15px 5px"}}></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton loan__details__skeleton" style={{margin:"15px 5px"}}></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton loan__details__skeleton" style={{margin:"15px 5px"}}></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton loan__details__skeleton" style={{margin:"15px 5px"}}></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton loan__details__skeleton" style={{margin:"15px 5px"}}></div>
                        </div>
                        <div className="">
                            <div className="">

                                <div className="tab-1-download-btn" style={{padding:"5px 0"}}>
                                    <div className="skeleton btn-skeleton client-report edtbtn"></div>
                                    <div className="skeleton btn-skeleton client-report edtbtn"></div>
                                </div>

                                <div className='table-responsive' style={{marginTop:"20px"}}>
                                    <table className='table table-centered table-hover'>
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
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default LoanDetailSkeleton;