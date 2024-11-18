import React, {useState} from 'react';
import { SuccessBtn } from '../../../../common';
import Table from './Table';
import AddUnit from './AddUnit';
import EditUnit from './EditUnit';

function List({data}) {
  const [unit, setUnit] = useState(null);
  const [units, setUnits] = useState(data);
  const [view, setView] = useState('list');

  const handleClick = (e) => {
    const unit = units.find(unit => unit.id == e.target.id);
    setUnit(unit);
  }

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Unit'}/>
        <Table
          setView={setView}
          units={units}
          selectedUnit={unit}
          handleClick={handleClick}
          setUnit={setUnit}
          setUnits={setUnits}
        />
      </>
    )
  } else if (view === 'edit') {
    return (
      <EditUnit
        initialValues={unit}
        setView={setView}
        setUnit={setUnit}
        setUnits={setUnits}
      />
    )
  }

  return (
    <AddUnit
      setView={setView}
      setUnit={setUnit}
      setUnits={setUnits}
    />
  )
}

export default List;