
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
        <td style={{paddingLeft:"0"}}>{nok.first_name}</td>
        <td style={{paddingLeft:"0"}}>{nok.last_name}</td>
        <td style={{paddingLeft:"0"}}>{nok.gender}</td>
        <td style={{paddingLeft:"0"}}>{nok.relationship}</td>
        <td style={{paddingLeft:"0"}}>{nok.phone_number}</td>
        <td style={{paddingLeft:"0"}}>{nok.address}</td>
        <td style={{paddingLeft:"0"}}>{nok.city}</td>
        <td style={{paddingLeft:"0"}}>{nok.country}</td>
        <td style={{paddingLeft:"0"}}>{nok.ownership}</td>
        <td style={{paddingLeft:"0"}}>
            <input type='button' value='Remove...' onClick={deleteNok}/>
        </td>
    </tr>
  )
}

export default NokRow;