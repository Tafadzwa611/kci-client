import React, { useState } from 'react';
import Select from 'react-select';
import AgeingAnalysis from './AgeingAnalysis';
import { useBranches } from '../../../contexts/BranchesContext';


function Tile({ par }) {
  const [openModal, setOpenModal] = useState(false);

  const {branches} = useBranches();
  const selectedBranches = branches.filter(branch => par.selectedBIds.includes(branch.id)).map(
    result => ({...result, label: result.name, value:result.id})
  );

  const handleClick = () => {
    setOpenModal(true);
  }

  return (
    <>
      <AgeingAnalysis open={openModal} setOpen={setOpenModal} branches={selectedBranches} par={par}/>
      <div onClick={handleClick} style={{width: '100%', marginBottom: '1.5rem', cursor: 'grab'}}>
        <div style={{display: 'flex', flexDirection:'column', rowGap: '1rem', padding: '1.5rem'}} className='par-card'>
          <div>
            <span>
              <Select
                isMulti
                name='branches'
                options={selectedBranches}
                value={selectedBranches}
                classNamePrefix='select'
                className='basic-multi-select'
                placeholder='Select Branches'
                isDisabled={true}
              />
            </span>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', rowGap: '5px'}}>
            <span><b>Par Value: {par.par_value}%</b></span>
            <span>{par.currency} PAR {par.par_name}</span>
            <span>Number of loans {par.par_name} days late: <b>{par.loans_in_arrears_count}</b></span>
            <span>Total Loan Count: <b>{par.total_loan_count}</b></span>
            <span>Principal At Risk: <b>{par.currency} {par.principal_at_risk}</b></span>
            <span>Total Loan Portfolio: <b>{par.currency} {par.total_loan_portfolio}</b></span>
          </div>
        </div>
      </div>
    </>
  )
}

export default Tile;
