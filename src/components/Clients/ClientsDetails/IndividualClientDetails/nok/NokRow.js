
import React from 'react';
import { makeRequest } from '../../../../../utils/utils';

function NokRow({nok, setNokList}) {
    const deleteNok = async () => {
        try {
            const response = await makeRequest.delete(`/clientsapi/delete_nok/${nok.id}`, {timeout: 8000});
            if (response.ok) {
                setNokList(curr => curr.filter(currNok => currNok.id != nok.id));
            }
        }catch(error) {
            console.log(error);
        }
    }

  return (
    <tr>
        <td>{nok.first_name}</td>
        <td>{nok.last_name}</td>
        <td>{nok.gender}</td>
        <td>{nok.relationship}</td>
        <td>{nok.phone_number}</td>
        <td>{nok.address}</td>
        <td>{nok.city}</td>
        <td>{nok.country}</td>
        <td>{nok.ownership}</td>
        <td>
            <input type='button' value='Remove...' onClick={deleteNok}/>
        </td>
    </tr>
  )
}

export default NokRow;