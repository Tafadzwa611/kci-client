import React, { useState } from 'react';
import { SuccessBtn } from '../../../../common';
import Table from './Table';
import AddCollateral from './AddCollateral';

function List({data}) {
  const [collaterals, setCollaterals] = useState(data);
  const [selectedCollateral, setSelectedCollateral] = useState(null);
  const [view, setView] = useState('list');

  const handleClick = (e) => {
    const collateral = collaterals.find(collateral => collateral.id == e.target.id);
    setSelectedCollateral(collateral);
  }

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Collateral Type'}/>
        <Table
          collaterals={collaterals}
          selectedCollateral={selectedCollateral}
          handleClick={handleClick}
          setSelectedCollateral={setSelectedCollateral}
          setCollaterals={setCollaterals}
        />
      </>
    )
  }
  return <AddCollateral setView={setView} setSelectedCollateral={setSelectedCollateral} setCollaterals={setCollaterals}/>
}

export default List;