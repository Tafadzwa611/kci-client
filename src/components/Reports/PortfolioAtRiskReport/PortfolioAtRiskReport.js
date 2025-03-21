import React, { useState } from 'react';
import Tile from './Tile';
import AddPar from './AddPar';

const PortfolioAtRiskReport = () => {
  const [pars, setPars] = useState([]);
  const [openModal, setOpen] = useState(false);

  const showModal = (e) => {
    e.preventDefault();
    setOpen(true);
  }
  console.log(pars)
  return (
    <>
      <AddPar open={openModal} setOpen={setOpen} setPars={setPars} />
      <div style={{paddingBottom: '40px'}}>
        <a href='#' onClick={showModal} className='btn btn-success float-left'>Add New</a>
      </div>
      <div className='row'>
        {pars.map((par, idx) => <Tile key={idx} par={par}/>)}
      </div>
    </>
  )
}

export default PortfolioAtRiskReport;