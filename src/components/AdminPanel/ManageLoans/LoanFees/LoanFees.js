import React, {useEffect, useState} from 'react';
import { makeRequest } from '../../../../utils/utils';
import MiniLoader from '../../../Loader/MiniLoader';
// import CreateBranchModal from './CreateBranchModal';

const LoanFees = () => {

    const [fees, setFees] = useState([])
    const [open, setOpen] = useState(false);

    useEffect(() => {
        getLoanFeesList()
    }, []);

    const getLoanFeesList = async () => {
        const data = await fetchLoanFeesList();
        setFees(data);
    };

    async function fetchLoanFeesList() {
        try {
            const response = await makeRequest.get(`/loansapi/loan_fees/`, {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                return data;
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (fees == null) {
        return <MiniLoader />;
    } 

    return (
        <>
            {/* <CreateBranchModal open={open} setOpen={setOpen} setFees={setFees} /> */}
            <div style={{margin:"20px 0"}}>
                <button type='button' className='btn btn-success' onClick={(e) => setOpen(curr => !curr)}>Add Branch</button>
            </div>
            <div className="table-responsive font-12">
                <table className="table">
                    <tbody>
                        <tr className="journal-details header">
                            <th>Date Created</th>
                            <th>Name</th>
                            <th>Calculation</th>
                            <th>Deductable</th>
                            <th>Is Mandatory</th>
                            <th>Currency</th>
                        </tr>  
                        {fees.map((fee) => (
                            <tr className="table-row" key={fee.id}>
                                <td>{fee.date_created}</td>
                                <td>{fee.name}</td>
                                <td>{fee.fee_calculation}</td>
                                <td>{fee.deductable_fees.toString().toUpperCase()}</td>
                                <td>{fee.is_mandatory.toString().toUpperCase()}</td>
                                <td>{fee.currency.shortname}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default LoanFees;