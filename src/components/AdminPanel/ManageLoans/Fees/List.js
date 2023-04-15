import React, {useState} from 'react';
import { SuccessBtn } from '../../../../common';
import Table from './Table';
import AddFee from './AddFee';
import EditFee from './EditFee';

function List({data}) {
  const [selectedFee, setSelectedFee] = useState(null);
  const [fees, setFees] = useState(data);
  const [view, setView] = useState('list');

  const handleClick = (e) => {
    const fee = fees.find(fee => fee.id == e.target.id);
    setSelectedFee(fee);
  }

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Fee'}/>
        <Table
          setView={setView}
          fees={fees}
          selectedFee={selectedFee}
          handleClick={handleClick}
          setSelectedFee={setSelectedFee}
          setFees={setFees}
        />
      </>
    )
  } else if (view === 'edit') {
    return (
      <EditFee
        initialValues={selectedFee}
        setView={setView}
        setSelectedFee={setSelectedFee}
        setFees={setFees}
      />
    )
  }
  return <AddFee setView={setView} setSelectedFee={setSelectedFee} setFees={setFees}/>
}

export default List;