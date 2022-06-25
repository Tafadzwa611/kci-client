import React from 'react';

const OtherIncomeDetailsSkeleton = () => {
    return (
		<div className="card text-light">
			<div className="card-body">
                <div className="skeleton skeleton-text form-control-title-skeleton" style={{marginBottom:"30px"}}></div>

				<div class="row font-13">

					<div class="col-6">
						<ul>
                            <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"185px"}}></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"220px"}}></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"183px"}}></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"100px"}}></div>
						</ul>
					</div>

					<div class="col-6">
						<ul>
                            <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"165px"}}></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"120px"}}></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"165px"}}></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"165px"}}></div>
                            <div className="skeleton skeleton-text form-control-title-skeleton" style={{width:"70px"}}></div>
						</ul>
					</div>

				</div>
				<div className="btn-flex-space-btwn">
                    <div className="skeleton btn-skeleton client-report"></div>
				</div>

			</div>
		</div>
    );
}

export default OtherIncomeDetailsSkeleton;