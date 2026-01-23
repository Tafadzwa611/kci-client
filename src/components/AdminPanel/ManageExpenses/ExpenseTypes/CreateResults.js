import React from 'react';
import { useLocation, Navigate, Link } from "react-router-dom";

function CreateResults() {
    const location = useLocation();
    const state = location.state;

    if (!state) return <Navigate to='/users/admin/manageexps/addtype' replace />;
    console.log(state);

    return (
        <div>
            <div style={{margin:'20px 0'}}>
                <button type='button' className='btn btn-success'>
                <Link to='/users/admin/manageexps/addtype'>Add Expense Type</Link>
                </button>
            </div>
            <h2>Failed Expense Types</h2>
            <FailTable failRes={state.failed}/>
            <div style={{marginTop: '30px'}}></div>
            <h2>Successful Expense Types</h2>
            <SuccessTable successRes={state.success}/>
        </div>
    )
}

function SuccessTable({successRes}) {
    return (
        <div style={{display:'block'}}>
            <div style={{padding:'0', border:'none'}}>
                <div style={{width:'100%', overflowX:'auto'}}>
                    <div className='table__height'>
                        <table className='table' id='loans'>
                            <thead>
                                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                                    <th>Name</th>
                                    <th>Branch</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {successRes.length > 0 ? (
                                    successRes.map(res => {
                                    return (
                                        <tr className='tr-class' key={res.branch}>
                                            <td className='td-class'>{res.name}</td>
                                            <td className='td-class'>{res.branch}</td>
                                            <td className='td-class'>{res.detail}</td>
                                        </tr>
                                    )
                                })) : (
                                    <tr className='tr-class'>
                                        <td className='td-class' colSpan={3} style={{ textAlign: 'center' }}>
                                            They were no successful expense types.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

function FailTable({failRes}) {
    return (
        <div style={{display:'block'}}>
            <div style={{padding:'0', border:'none'}}>
                <div style={{width:'100%', overflowX:'auto'}}>
                    <div className='table__height'>
                        <table className='table' id='loans'>
                            <thead>
                                <tr className='journal-details header' style={{position:'sticky', top:'0'}}>
                                    <th>Name</th>
                                    <th>Branch</th>
                                    <th>Detail</th>
                                </tr>
                            </thead>
                            <tbody>
                                {failRes.length > 0 ? (
                                    failRes.map((res, idx) => {
                                    return (
                                        <tr className='tr-class' key={idx}>
                                            <td className='td-class'>{res.name}</td>
                                            <td className='td-class'>{res.branch}</td>
                                            <td className='td-class'>{res.detail}</td>
                                        </tr>
                                    )
                                })) : (
                                    <tr className='tr-class'>
                                        <td className='td-class' colSpan={9} style={{ textAlign: 'center' }}>
                                            They were no failed expense types.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateResults;
