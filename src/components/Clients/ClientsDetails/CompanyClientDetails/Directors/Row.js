import React from 'react';
import { convertDate } from '../../../../Accounting/Journals/utils';
import { makeRequest } from '../../../../../utils/utils';

function Row({director, setDirectors}) {
  const deleteDirector = async (evt) => {
    try {
      const response = await makeRequest.delete(`/clientsapi/delete_dir/${evt.target.id}`, {timeout: 8000});
      if (response.ok) {
        setDirectors(curr => curr.filter(dir => dir.id != evt.target.id));
      }
    }catch(error) {
      console.log(error);
    }
  }

  return (
    <tr>
      <td>{director.first_name}</td>
      <td>{director.last_name}</td>
      <td>{director.gender}</td>
      <td>{director.phone_number}</td>
      <td>{director.identification_number}</td>
      <td>{convertDate(director.date_of_birth)}</td>
      <td><input id={director.id} type='button' value='Remove...' onClick={deleteDirector}/></td>
    </tr>
  )
}

export default Row;