import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import AgeingAnalysis from './AgeingAnalysis';


function Tile({
    loans_in_arrears_count,
    total_loan_count,
    par_name,
    par_value,
    principal_at_risk,
    total_loan_portfolio,
    currencyIso,
    currencyId,
    branches,
    lowerLimit,
    upperLimit,
    loggedInUser,
    selectedBranchesIds,
}) {
    const [openModal, setOpenModal] = useState(false);
    const [newBranches, setNewBranches] = useState(null);

    useEffect(() => {
        setNewBranches([...branches.map(result => ({...result, label: result.name, value:result.id}))]);
    }, [])

    const handleClick = () => {
        setOpenModal(true);
  }

  return (
        <>
            <AgeingAnalysis
                open={openModal}
                setOpen={setOpenModal}
                par_name={par_name}
                par_value={par_value}
                currencyIso={currencyIso}
                currencyId={currencyId}
                branches={newBranches}
                selectedBranchesIds={selectedBranchesIds}
                lowerLimit={lowerLimit}
                upperLimit={upperLimit}
                loans_in_arrears_count={loans_in_arrears_count}
                total_loan_count={total_loan_count}
                principal_at_risk={principal_at_risk}
                total_loan_portfolio={total_loan_portfolio}
                loggedInUser={loggedInUser}
            />
            <div onClick={handleClick} style={{width:"100%", marginBottom:"1.5rem", cursor: 'grab'}}>
                <div style={{display:"flex", flexDirection:"column", rowGap:"1rem", padding:"1.5rem"}} className="par-card">
                    <div>
                        <span>
                            <Select
                                isMulti
                                name='branches'
                                options={newBranches}
                                value={newBranches}
                                classNamePrefix='select'
                                className='basic-multi-select'
                                placeholder='Select Branches'
                                isDisabled={true}
                            />
                        </span>
                    </div>
                    <div style={{display:"flex", flexDirection:"column", rowGap:"5px"}}>
                        <span><b>Par Value: {par_value}%</b></span>
                        <span>{currencyIso} PAR {par_name}</span>
                        <span>Number of loans {par_name} days late: <b>{loans_in_arrears_count}</b></span>
                        <span>Total Loan Count: <b>{total_loan_count}</b></span>
                        <span>Principal At Risk: <b>{currencyIso} {principal_at_risk}</b></span>
                        <span>Total Loan Portfolio: <b>{currencyIso} {total_loan_portfolio}</b></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tile;