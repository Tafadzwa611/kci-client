import React from 'react';

function SingleAddress({setAddrToUpdate, addr, setAddrList, isFirstRun}) {
  const update = () => {
    isFirstRun.current = false;
    setAddrToUpdate(addr);
  }

  return (
    <>
      <tr>
        <td>{addr.address}</td>
        <td>{addr.city}</td>
        <td>{addr.country}</td>
        <td>{addr.ownership}</td>
        <td style={{display:"flex", columnGap:"5px"}}>
          <input type='button' value='Update...' onClick={update} style={{background:"#1bbf5f", color:"#fff", border:"none", borderRadius:".15rem", cursor:"pointer", padding:".2rem .25rem"}}/>
          <input type='button' value='Remove...' onClick={e => setAddrList(curr => curr.filter(currAdd => currAdd.id !== addr.id))} style={{background:"#f5424b", color:"#fff", border:"none", borderRadius:".15rem", cursor:"pointer", padding:".2rem .25rem"}}/>
        </td>
      </tr>
    </>
  )
}

export default SingleAddress;