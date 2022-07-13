import React from 'react';

const OnlineApplicationsSkeleton = () => {
    return (
        <>
            <div className="card">
                <div className="card-body">
                    <form>
                        <div className="view_search_container online__applications">
                            <div className="row-payments-container">
                                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                                <div className="skeleton skeleton-text skeleton-input"></div>
                            </div>
                            <div className="row-payments-container">
                                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                                <div className="skeleton skeleton-text skeleton-input"></div>
                            </div>
                            <div className="row-payments-container">
                                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                                <div className="skeleton skeleton-text skeleton-input"></div>
                            </div>
                            <div style={{display:"flex", flexDirection:"column"}}>
                                <div className="skeleton skeleton-text btn-w"></div>
                                <div className="skeleton btn-skeleton"></div>
                            </div>
                        </div>

                        <div className="filter-container">
                            <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                            <div className="filter-container-float-right">
                                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                                <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            <div className="card">
                <div className='table-responsive font-12'>
                    <table className='table table-centered table-hover'>
                        <thead className="thead-light">
                            <tr className="skeleton-table-thead">
                                <td><div className="skeleton skeleton-text"></div></td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="skeleton-table-row">
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                            </tr>
                            <tr className="skeleton-table-row">
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                            </tr>
                            <tr className="skeleton-table-row">
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                            </tr>
                            <tr className="skeleton-table-row">
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                            </tr>
                            <tr className="skeleton-table-row">
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                            </tr>
                            <tr className="skeleton-table-row">
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                            </tr>
                            <tr className="skeleton-table-row">
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                            </tr>
                            <tr className="skeleton-table-row">
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                            </tr>
                            <tr className="skeleton-table-row">
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                            </tr>
                            <tr className="skeleton-table-row last-row">
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="filter-container skeleton-table-footer">
                    <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                    <div className="skeleton skeleton-text form-control-title-skeleton"></div>
                </div>

            </div>
        </>
    )
}

export default OnlineApplicationsSkeleton;