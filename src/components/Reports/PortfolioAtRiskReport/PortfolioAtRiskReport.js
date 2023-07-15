import React, { useEffect, useState } from 'react';
import Tile from './Tile';
import { makeRequest } from '../../../utils/utils';
import AddPar from './AddPar';
import MiniLoader from '../../Loader/MiniLoader';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';

const PortfolioAtRiskReport = ({loggedInUser}) => {
    const [pars, setPars] = useState([]);
    const [openModal, setOpen] = useState(false);
    const [intValues, setIntValues] = useState([])
    const [params, setParams] = useState(null);
    const [lowerLimit, setLowerLimit] = useState('');
    const [upperLimit, setUpperLimit] = useState('');
    const [currencyId, setCurrencyId] = useState(null);
    const [selectedBranchesIds, setSelectedBranchesIds] = useState([]);
    const [currency, setCurrency] = useState(null);

    const {currencies} = useCurrencies();
    const {branches} = useBranches();

    const showModal = (e) => {
        e.preventDefault();
        setOpen(true);
    }
  
    return (
        <>
            <AddPar
                open={openModal}
                setOpen={setOpen}
                setPars={setPars}
                branches={branches}
                currencies={currencies}
                setParams={setParams}
                setIntValues={setIntValues}
                setCurrency={setCurrency}
                setLowerLimit={setLowerLimit}
                setUpperLimit={setUpperLimit}
                setCurrencyId={setCurrencyId}
                selectedBranchesIds={selectedBranchesIds}
                setSelectedBranchesIds={setSelectedBranchesIds}
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
                        currencyId={currencyId}
                        branches={branches.filter(branch => par.selectedBIds.includes(branch.id))}
                        selectedBranchesIds={selectedBranchesIds}
                        lowerLimit={lowerLimit}
                        upperLimit={upperLimit}
                        loggedInUser={loggedInUser}
                        intValues={intValues}
                        setParams={setParams}
                        params={params}
                        currency={currency}
                        />
                    )}
                </div>
            </>
        </>
    )
}
  

export default PortfolioAtRiskReport;