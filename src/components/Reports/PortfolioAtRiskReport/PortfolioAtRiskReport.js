import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import { makeRequest } from '../../../utils/utils';
import AddPar from './AddPar';
import MiniLoader from '../../Loader/MiniLoader';

const PortfolioAtRiskReport = () => {
    const [currencies, setCurrencies] = useState(null);
    const [pars, setPars] = useState([]);
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
            <AddPar
                open={openModal}
                setOpen={setOpenModal}
                setPars={setPars}
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
                    {pars.map((par, idx) => <Tile
                    key={idx}
                    loans_in_arrears_count={par.loans_in_arrears_count}
                    total_loan_count={par.total_loan_count}
                    par_name={par.par_name}
                    par_value={par.par_value}
                    principal_at_risk={par.principal_at_risk}
                    total_loan_portfolio={par.total_loan_portfolio}
                    currencyIso={par.currencyIso}
                    currencyId={par.currencyId}
                    branches={branches.filter(branch => par.selectedBranchesIds.includes(branch.id))}
                    limits={par.limits}
                    />)}
                </div>
            </>
        </>
    )
}
  

export default PortfolioAtRiskReport;