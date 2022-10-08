import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import { makeRequest } from '../../../utils/utils';
import AddPaymentsReport from './AddPaymentsReport';
import MiniLoader from '../../Loader/MiniLoader';

const PaymentsReport = () => {
    const [currencies, setCurrencies] = useState(null);
    const [paymentR, setPaymentsR] = useState([]);
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
            <AddPaymentsReport
                open={openModal}
                setOpen={setOpenModal}
                setPaymentsR={setPaymentsR}
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
                    {paymentR.map((paymentrpt, idx) => <Tile
                    key={idx}
                    total_payments_count={paymentrpt.total_payments_count}
                    total_amount_paid={paymentrpt.total_amount_paid}
                    payment_name={paymentrpt.payment_name}
                    currencyIso={paymentrpt.currencyIso}
                    currencyId={paymentrpt.currencyId}
                    branches={branches.filter(branch => paymentrpt.selectedBranchesIds.includes(branch.id))}
                    limits={paymentrpt.limits}
                    />)}
                </div>
            </>
        </>
    )
}
  

export default PaymentsReport;