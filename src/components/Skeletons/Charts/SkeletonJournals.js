import React from 'react';

const Journals = () => {

    const mystyle_select = {
        width:"40%"
    }

    return (
        <div className="card slide">
            <div className="card-body">
                <div className="skeleton skeleton-text form-control-title-skeleton" style={{marginBottom:"30px"}}></div>

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

                <div className="header-container font-12">
                    <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                    <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                </div>

                <div className="table-container font-12">
                    <div className="table-responsive" style={{maxHeight:"800px"}}>
                        <table className="table">
                            <thead>
                                <tr>
                                    <td className="skeleton bg-gray text-left" colspan="9">
                                        <div className="skeleton" style={{height:"1.125rem"}}></div>
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="reports-table-border-left">
                                        <div className="skeleton skeleton-text" style={{width:"100%"}}></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reports-table-border-left">
                                        <div className="skeleton skeleton-text" style={{width:"100%"}}></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reports-table-border-left">
                                        <div className="skeleton skeleton-text" style={{width:"100%"}}></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reports-table-border-left">
                                        <div className="skeleton skeleton-text" style={{width:"100%"}}></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reports-table-border-left">
                                        <div className="skeleton skeleton-text" style={{width:"100%"}}></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reports-table-border-left">
                                        <div className="skeleton skeleton-text" style={{width:"100%"}}></div>
                                    </td>
                                </tr>
                                <tr>
                                    <td className="reports-table-border-left">
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

export default Journals;