import React, {useState, useEffect} from 'react';
import { SuccessBtn } from '../../../common';
import Table from './Table';
import AddExpType from './AddExpType';
import EditExpType from './EditExpType';
import Filter from './Filter';

function List({expenseTypeData, setExpenseTypeData}) {
  const [expenseTypeId, setExpenseTypeId] = useState(null);
  const [selectedExpType, setSelectedExpType] = useState(null);
  const [view, setView] = useState('list');
  const [showDetails, setShowDetails] = useState(null);

  const handleClick = (e) => {
    const expt = expenseTypeData.find(expt => expt.id == e.target.id);
    setSelectedExpType(expt);
    setShowDetails(true);
  }

  useEffect(() => {
    if (expenseTypeId !== null) {
      const exp = expenseTypeData.find(exp => exp.id == expenseTypeId);
      setSelectedExpType(exp);
    }
  }, []);

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Expense Type'}/>
        <Filter setExpenseTypeData={setExpenseTypeData}/>
        <div style={{paddingTop: '2rem'}}></div>
        <Table
          setView={setView}
          expTypes={expenseTypeData}
          selectedExpType={selectedExpType}
          showDetails={showDetails}
          handleClick={handleClick}
          setSelectedExpType={setSelectedExpType}
          setExpTypes={setExpenseTypeData}
          setShowDetails={setShowDetails}
        />
      </>
    )
  }else if (view === 'edit') {
    return (
      <EditExpType
        initialValues={selectedExpType}
        setView={setView}
        setSelectedExpType={setSelectedExpType}
        setExpTypes={setExpenseTypeData}
      />
    )
  }
  return <AddExpType setView={setView} setExpenseTypeId={setExpenseTypeId}/>
}

export default List;