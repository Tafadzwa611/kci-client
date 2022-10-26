import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import { makeRequest } from '../../../utils/utils';
import AddOtherIncomeReport from './AddOtherIncomeReport';
import MiniLoader from '../../Loader/MiniLoader';

const OtherIncomeReport = () => {
    const [currencies, setCurrencies] = useState(null);
    const [otherincomeR, setOtherIncomeR] = useState([]);
    const [branches, setBranches] = useState(null);
    const [openModal, setOpenModal] = useState(false);
  
    useEffect(() => {
        fetchCurrencies();
        fetchBranches();
    }, []);
  
    async function fetchCurrencies() {
        try {
            const response = await makeRequest.get('/usersapi/list_currencies/', {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                return setCurrencies([...data.map(result => ({...result, label: result.shortname, value:result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }
  
    async function fetchBranches() {
        try {
            const response = await makeRequest.get('/usersapi/get-branches/', {timeout: 8000});
            if (response.ok) {
                const data = await response.json();
                return setBranches([...data.results.map(result => ({...result, label: result.name, value:result.id}))]);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }
  
    const showModal = (e) => {
        e.preventDefault();
        setOpenModal(true);
    }
  
    if (currencies===null || branches===null) {
        return (
            <MiniLoader />
        )
    }
  
    return (
        <>
            <AddOtherIncomeReport
                open={openModal}
                setOpen={setOpenModal}
                setOtherIncomeR={setOtherIncomeR}
                branches={branches}
                setBranches={setBranches}
                currencies={currencies}
            />
            <>
                <div style={{paddingBottom: '40px'}}>
                    <a href='#' onClick={showModal} className='btn btn-success float-left'>
                    Add New
                    </a>
                </div>
                <div className='row'>
                    {otherincomeR.map((othrincomerpt, idx) => <Tile
                    key={idx}
                    total_otherincome_count={othrincomerpt.total_otherincome_count}
                    total_otherincome_amount={othrincomerpt.total_otherincome_amount}
                    otherincome_name={othrincomerpt.otherincome_name}
                    currencyIso={othrincomerpt.currencyIso}
                    currencyId={othrincomerpt.currencyId}
                    branches={branches.filter(branch => othrincomerpt.selectedBranchesIds.includes(branch.id))}
                    limits={othrincomerpt.limits}
                    />)}
                </div>
            </>
        </>
    )
}
  

export default OtherIncomeReport;