import React, {useState, useEffect} from 'react';
import { SuccessBtn } from '../../../common';
import Table from './Table';
import AddExpType from './AddExpType';
import EditExpType from './EditExpType';

function List({data, extra}) {
  const {expenseTypeId, setExpenseTypeId} = extra;
  const [selectedExpType, setSelectedExpType] = useState(null);
  const [expTypes, setExpTypes] = useState(data);
  const [view, setView] = useState('list');

  useEffect(() => {
    if (expenseTypeId !== null) {
      const cat = expTypes.find(prd => prd.id == expenseTypeId);
      setSelectedExpType(cat);
    }
  }, []);

  const handleClick = (e) => {
    const cat = expTypes.find(cat => cat.id == e.target.id);
    setSelectedExpType(cat);
  }

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Expense Type'}/>
        <Table
          setView={setView}
          expTypes={expTypes}
          selectedExpType={selectedExpType}
          handleClick={handleClick}
          setSelectedExpType={setSelectedExpType}
          setExpTypes={setExpTypes}
        />
      </>
    )
  }else if (view === 'edit') {
    return (
      <EditExpType
        initialValues={selectedExpType}
        setView={setView}
        setSelectedExpType={setSelectedExpType}
        setExpTypes={setExpTypes}
      />
    )
  }
  return <AddExpType setView={setView} setExpenseTypeId={setExpenseTypeId}/>
}

export default List;