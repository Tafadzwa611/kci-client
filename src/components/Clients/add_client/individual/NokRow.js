import React from 'react';

function NokRow({setNokToUpdate, nok, setNokList, isFirstRun}) {
  const update = () => {
    isFirstRun.current = false;
    setNokToUpdate(nok);
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
      <td style={{display:"flex", columnGap:"5px"}}>
        <input type='button' value='Update...' onClick={update} style={{background:"#1bbf5f", color:"#fff", border:"none", borderRadius:".15rem", cursor:"pointer", padding:".2rem .25rem"}}/>
        <input type='button' value='Remove...' onClick={e => setNokList(curr => curr.filter(currNok => currNok.id !== nok.id))} style={{background:"#f5424b", color:"#fff", border:"none", borderRadius:".15rem", cursor:"pointer", padding:".2rem .25rem"}}/>
      </td>
    </tr>
  )
}

export default NokRow;