import React, {useState, useEffect} from 'react';
import { SuccessBtn } from '../../../common';
import Table from './Table';
import AddIncType from './AddIncType';
import EditIncType from './EditIncType';
import Filter from './Filter';

function List({incomeTypeData, setIncomeTypeData}) {
  const [incomeTypeId, setIncomeTypeId] = useState(null);
  const [selectedIncType, setSelectedIncType] = useState(null);
  const [view, setView] = useState('list');
  const [showDetails, setShowDetails] = useState(null);

  const handleClick = (e) => {
    const inct = incomeTypeData.find(inct => inct.id == e.target.id);
    setSelectedIncType(inct);
    setShowDetails(true);
  }

  useEffect(() => {
    if (incomeTypeId !== null) {
      const inc = incomeTypeData.find(inc => inc.id == incomeTypeId);
      setSelectedIncType(inc);
    }
  }, []);

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Other Income Type'}/>
        <Filter setIncomeTypeData={setIncomeTypeData}/>
        <div style={{paddingTop: '2rem'}}></div>
        <Table
          setView={setView}
          incTypes={incomeTypeData}
          selectedIncType={selectedIncType}
          showDetails={showDetails}
          handleClick={handleClick}
          setSelectedIncType={setSelectedIncType}
          setIncomeTypeData={setIncomeTypeData}
          setShowDetails={setShowDetails}
        />
      </>
    )
  }else if (view === 'edit') {
    return (
      <EditIncType
        initialValues={selectedIncType}
        setView={setView}
        setSelectedIncType={setSelectedIncType}
        setIncomeTypeData={setIncomeTypeData}
      />
    )
  }
  return <AddIncType setView={setView} setIncomeTypeId={setIncomeTypeId} setIncomeTypeData={setIncomeTypeData}/>
}

export default List;