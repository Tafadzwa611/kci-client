
import React, { useState } from 'react';
import UpdateBusinessInfo from './UpdateBusinessInfo';
import { convertDate } from '../../../../Accounting/Journals/utils';

function BusinessInfo({business, setBusiness}) {
  const [openModal, setOpenModal] = useState(false);

  const toggleModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  }

  return (
    <>
      <UpdateBusinessInfo details={business} setBusiness={setBusiness} open={openModal} setOpen={setOpenModal}/>
      <div className='active tab-pane'>
        <div className='post'>
          <div style={{marginBottom:"1.5rem"}}>
              <button type='button' className='btn btn-success' onClick={toggleModal}
                  >Update Business Details
              </button>
          </div>
          <div style={{display:"grid", gridTemplateColumns:"1fr 1fr", marginTop:"1.5rem"}}>
              <div>
                  <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                      <li>Business name: {business.name}</li>
                      <li>Business Start Date: {convertDate(business.business_start_date)}</li>
                      <li>City/Town: {business.city}</li>
                  </ul>
              </div>
              <div>
                  <ul style={{display:"flex", flexDirection:"column", rowGap:"10px"}}>
                      <li>Business Type: {business.business_type}</li>
                      <li>Physical Address: {business.address}</li>
                      <li>Country: {business.country}</li>
                  </ul>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default BusinessInfo;