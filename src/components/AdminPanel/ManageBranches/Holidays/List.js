import React, {useState} from 'react';
import { SuccessBtn } from '../../../../common';
import Table from './Table';
import AddHoliday from './AddHoliday';
import EditHoliday from './EditHoliday';

function List({data}) {
  const [holiday, setHoliday] = useState(null);
  const [holidays, setHolidays] = useState(data);
  const [view, setView] = useState('list');

  const handleClick = (e) => {
    const holiday = holidays.find(holiday => holiday.id == e.target.id);
    setHoliday(holiday);
  }

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('add')} value={'Add Fee'}/>
        <Table
          setView={setView}
          holidays={holidays}
          selectedHoliday={holiday}
          handleClick={handleClick}
          setHoliday={setHoliday}
          setHolidays={setHolidays}
        />
      </>
    )
  } else if (view === 'edit') {
    return (
      <EditHoliday
        initialValues={holiday}
        setView={setView}
        setHoliday={setHoliday}
        setHolidays={setHolidays}
      />
    )
  }

  return (
    <AddHoliday
      setView={setView}
      setHoliday={setHoliday}
      setHolidays={setHolidays}
    />
  )
}

export default List;