import React from 'react';

const AdminSkeleton = () => {
    return (
        <div className="card">
            <div className="card-body">

                <div className="skeleton skeleton-text form-control-title-skeleton"></div>

                <div className="font-12 admin-panel">
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="link"><div className="skeleton skeleton-text skeleton-settings"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-account-settings"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-bank-names"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-currencies"></div></div>
                        </div>
                        <div className="col-sm-4">
                            <div className="link"><div className="skeleton skeleton-text skeleton-manage-staff"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-staff"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-staff-roles-and-permissions"></div></div>
                        </div>
                        <div className="col-sm-4">
                            <div className="link"><div className="skeleton skeleton-text skeleton-loans"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-loan-products"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-add-loan-product"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-loan-fees"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-add-loan-fee"></div></div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="link"><div className="skeleton skeleton-text skeleton-manage-branches"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-branches"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-add-branch"></div></div>
                        </div>
                        <div className="col-sm-4">
                            <div className="link"><div className="skeleton skeleton-text skeleton-collateral"></div></div>   
                            <div className="link"><div className="skeleton skeleton-text skeleton-collateral-types"></div></div>   
                        </div>
                        <div className="col-sm-4">
                            <div className="link"><div className="skeleton skeleton-text skeleton-other-income"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-other-income-types"></div></div>
                        </div>
                    </div>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-4">
                            <div className="link"><div className="skeleton skeleton-text skeleton-expense"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-expense-types"></div></div>    
                        </div>
                        {/* <div className="col-sm-4">
                            <strong>Payrolls</strong><br/>
                            <a href="">Add Payroll</a><br/>
                        </div> */}
                        <div className="col-sm-4">
                            <div className="link"><div className="skeleton skeleton-text skeleton-asset-management"></div></div>
                            <div className="link"><div className="skeleton skeleton-text skeleton-asset-management-types"></div></div>
                        </div>
                    </div>
                    <hr/>
                </div>


            </div>
        </div>
    );
}

export default AdminSkeleton;