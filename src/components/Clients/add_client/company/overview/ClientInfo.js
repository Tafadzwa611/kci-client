import React from 'react';

function ClientInfo({clientInfo, clientErrors}) {
  return (
    <div className="text-light">
      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>First Name<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input type='text' className='form-control well' value={clientInfo.first_name} disabled/>
          {clientInfo.first_name === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Last Name<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input type='text' className='form-control well' value={clientInfo.last_name} disabled/>
          {clientInfo.last_name === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Gender<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input type='text' className='form-control well' value={{MALE: 'Male', FEMALE: 'Female'}[clientInfo.gender]} disabled/>
          {clientInfo.gender === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Date of Birth<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input type='text' className='form-control well' value={convertDate(clientInfo.date_of_birth)} disabled/>
          {clientInfo.date_of_birth === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Client Registration Date<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input type='text' className='form-control well' value={convertDate(clientInfo.registration_date)} disabled/>
          {clientInfo.registration_date === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Phone Number<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input type='text' className='form-control well' value={clientInfo.phone_number} disabled/>
          {clientInfo.phone_number === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Identification Number<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input type='text' className='form-control well' value={clientInfo.identification_number} disabled/>
          {clientInfo.identification_number === '' && <p style={{color: 'red'}}>This field is required</p>}
          <p style={{color: 'red'}}>{clientErrors['identification_number']}</p>
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Identification Type<span style={{color: 'red'}}>*</span></label>
        <div className='col-sm-5'>
          <input
            type='text'
            className='form-control well'
            value={{ID: 'National ID Card', Passport: 'Passport', Licence: 'Licence', Other: 'Other'}[clientInfo.identification_type]}
            disabled
          />
          {clientInfo.identification_type === '' && <p style={{color: 'red'}}>This field is required</p>}
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Email</label>
        <div className='col-sm-5'>
          <input type='text' className='form-control well' value={clientInfo.email} disabled/>
          <p style={{color: 'red'}}>{clientErrors['email']}</p>
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

export default ClientInfo;