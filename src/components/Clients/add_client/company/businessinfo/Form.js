import React from 'react';

function Form({businessInfo, businessErrors, handleChange, validate, setTab}) {
  return (
    <>
      <div className='text-light'>
        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Business Name</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <input name='name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={businessInfo.name} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{businessErrors['name']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Business Type</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <input name='business_type' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={businessInfo.business_type} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{businessErrors['business_type']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Business Start Date</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <input name='business_start_date' type='date' className='custom-select-form' onFocus={validate} onKeyDown={(e) => e.preventDefault()} onChange={handleChange} value={businessInfo.business_start_date} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{businessErrors['business_start_date']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Physical Address</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <input name='address' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={businessInfo.address} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{businessErrors['address']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>City/Town</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <input name='city' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={businessInfo.city} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{businessErrors['city']}</p>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Country</b><span style={{color: 'red'}}>*</span></label>
          <div className='col-8'>
            <input name='country' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={businessInfo.country} required/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{businessErrors['country']}</p>
          </div>
        </div>
      </div>
      <div className="load-more-container">
        <button onClick={e => setTab('cinfo')} type='button' className='btn btn-default'>Back</button>
        <button onClick={e => setTab('dirs')} type='button' className='btn btn-info'>Next</button>
      </div>
    </>
  )
}

export default Form;