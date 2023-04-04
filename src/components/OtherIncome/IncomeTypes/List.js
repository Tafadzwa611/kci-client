import React, {useState, useEffect} from 'react';
import { SuccessBtn } from '../../../common';
import Table from './Table';
import AddIncType from './AddIncType';
import EditIncType from './EditIncType';

function List({data, extra}) {
  const {incomeTypeId, setIncomeTypeId} = extra;
  const [selectedIncType, setSelectedIncType] = useState(null);
  const [incTypes, setIncTypes] = useState(data);
  const [view, setView] = useState('list');

  useEffect(() => {
    if (incomeTypeId !== null) {
      const incm = incTypes.find(inc => inc.id == incomeTypeId);
      setSelectedIncType(incm);
    }
  }, []);

  const handleClick = (e) => {
    const incm = incTypes.find(inc => inc.id == e.target.id);
    setSelectedIncType(incm);
  }

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Other Income Type'}/>
        <Table
          setView={setView}
          incTypes={incTypes}
          selectedIncType={selectedIncType}
          handleClick={handleClick}
          setSelectedIncType={setSelectedIncType}
          setIncTypes={setIncTypes}
        />
      </>
    )
  }else if (view === 'edit') {
    return (
      <EditIncType
        initialValues={selectedIncType}
        setView={setView}
        setSelectedIncType={setSelectedIncType}
        setIncTypes={setIncTypes}
      />
    )
  }
  return <AddIncType setView={setView} setIncomeTypeId={setIncomeTypeId}/>
}

export default List;