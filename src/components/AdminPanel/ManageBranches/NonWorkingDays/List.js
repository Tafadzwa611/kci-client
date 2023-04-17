import React, {useState} from 'react';
import { SuccessBtn } from '../../../../common';
import Edit from './Edit';

const DAYS_MAP = {
  0: 'Monday',
  1: 'Tuesday',
  2: 'Wednesday',
  3: 'Thursday',
  4: 'Friday',
  5: 'Saturday',
  6: 'Sunday'
}

function List({data}) {
  const [view, setView] = useState('list');
  const [days, setDays] = useState(data);

  if (view === 'list') {
    return (
      <>
        <SuccessBtn handler={() => setView('edit')} value={'Edit'}/>
        <table className='table'>
          <tbody>
            {days.sort().map(day => {
              return (
                <tr key={day}>
                  <td>{DAYS_MAP[day]}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </>
    )
  }
  return (
    <Edit
      days={days}
      setDays={setDays}
      setView={setView}
    />
  )
}

export default List;