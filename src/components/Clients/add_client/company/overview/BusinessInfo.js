import React from 'react';

function BusinessInfo({businessInfo}) {
  return (
    <div className="text-light">
      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Business Name<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input name='name' type='text' className='form-control well' value={businessInfo.name} required disabled/>
          {businessInfo.name === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Business Type<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input name='business_type' type='text' className='form-control well' value={businessInfo.business_type} required disabled/>
          {businessInfo.business_type === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Business Start Date<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input name='business_start_date' type='text' className='form-control well' value={convertDate(businessInfo.business_start_date)} required disabled/>
          {businessInfo.business_start_date === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Physical Address<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input name='address' type='text' className='form-control well' value={businessInfo.address} required disabled/>
          {businessInfo.address === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>City/Town<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input name='city' type='text' className='form-control well' value={businessInfo.city} required disabled/>
          {businessInfo.city === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Country<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input name='country' type='text' className='form-control well' value={businessInfo.country} required disabled/>
          {businessInfo.country === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>
    </div>
  )
}

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

function convertDate(date_str) {
  if (date_str === '' || date_str === null) {
    return date_str
  }
  const temp_date = date_str.split("-");
  return temp_date[2] + " " + months[Number(temp_date[1]) - 1] + " " + temp_date[0];
}

export default BusinessInfo;