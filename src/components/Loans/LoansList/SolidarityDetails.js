import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

function SolidarityDetails({loan}) {
  console
  useEffect(() => {
    const element = document.getElementById('loan-details');
    element.scrollIntoView({ behavior: 'instant' });
  }, []);

  return (
    <div id='loan-details'>
      <div style={{position:'sticky', top:'0', width:'100%'}}>
        <div style={{display:'flex', flexDirection:'column', padding:'1.5rem'}} className='j-details-container'>
          <div style={{display:'flex', alignItems:'center', columnGap:'1rem'}}>
            <span><b>{loan.group_name}&apos;s</b> Loan Details</span>
          </div>
          <Actions loan={loan}/>
        </div>
      </div>
    </div>
  )
}

const Actions = ({loan}) => {
  return (  
    <div style={{display:'flex', columnGap:'3px'}}>
      <div className='client-state-btns' style={{display:'flex', columnGap:'3px', justifyContent:'flex-end'}}>
        <button className='btn btn-olive' onClick={(e) => console.log(e)}>Approve</button>
        <button className='btn btn-olive' onClick={(e) => console.log(e)}>Reject</button>
        <Link to={`/loans/viewloans/editloan/sol/${loan.id}`}>Edit</Link>
        <button className='btn btn-olive' onClick={(e) => console.log(e)}>Delete</button>
      </div>
    </div>
  )
}

export default SolidarityDetails;