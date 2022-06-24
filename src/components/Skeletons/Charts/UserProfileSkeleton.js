import React from 'react';

const UserProfileSkeleton = () => {

    return (
        <div className="card">
            <div className="card-body" style={{paddingTop:"0"}}>
                <div className="bloc-tabs">
                    <div className="skeleton btn-skeleton client-tabs"></div>
                </div>

                <div className="content-tabs">

                    <div className="content  active-content">

                        <div className="user-profile" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>

                            <div className="user-details">
                                <div class="skeleton " style={{borderRadius:"50%", height:"70px", width:"70px"}}></div>
                            </div>

                            <div className="user-name">
                                <div className="skeleton skeleton-text form-control-title-skeleton" style={{margin:"15px", padding:"10px", width:"200px"}}></div>
                            </div>

                            <div className="company-name-container">
                                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                            </div>

                            <div className="user-personal-details" style={{display:"flex", flexDirection:"column", alignItems:"center"}}>
                                <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"180px"}}></div>
                                <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"210px"}}></div>
                                <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"130px"}}></div>
                                <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"90px"}}></div>
                                <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"110px"}}></div>
                                <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"130px"}}></div>
                                <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"130px"}}></div>
                            </div>

                        </div>
                        <div className="btn-flex-space-btwn">
                            <div className="skeleton btn-skeleton client-report"></div>
                            <div className="skeleton btn-skeleton client-report" style={{width:"100px"}}></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default UserProfileSkeleton;