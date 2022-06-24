import React from 'react';

function DirRow({setDirToUpdate, isFirstRun, director, setDirList}) {
  const update = () => {
    isFirstRun.current = false;
    setDirToUpdate(director);
  }

  return (
    <tr>
      <td>{director.first_name}</td>
      <td>{director.last_name}</td>
      <td>{director.identification_number}</td>
      <td>{director.phone_number}</td>
      <td>{director.gender}</td>
      <td>{director.date_of_birth}</td>
      <td style={{display:"flex", columnGap:"5px"}}>
        <input type='button' value='Update...' onClick={update} style={{background:"#1bbf5f", color:"#fff", border:"none", borderRadius:".15rem", cursor:"pointer", padding:".2rem .25rem"}}/>
        <input type='button' value='Remove...' onClick={e => setDirList(curr => curr.filter(currDir => currDir.id !== director.id))} style={{background:"#f5424b", color:"#fff", border:"none", borderRadius:".15rem", cursor:"pointer", padding:".2rem .25rem"}}/>
      </td>
    </tr>
  )
}

export default DirRow;