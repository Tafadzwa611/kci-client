
import React from 'react';

function EmploymentOverview({employerInfo, employmentErrors}) {
  return (
    <div className="text-light">
      <div className='row custom-background' style={{marginTop: '15px'}}>
        <label className='form-label'>Employer Name</label>
        <div className='col-8'>
          <input name='employer' type='text' className='custom-select-form' value={employerInfo.employer} disabled/>
        </div>
      </div>

      <div className='row custom-background' style={{marginTop: '15px'}}>
        <label className='form-label'>Employer Type</label>
        <div className='col-8'>
          <input
            name='type_of_employer'
            type='text'
            className='custom-select-form'
            value={{Gvt: 'Government', Pvt: 'Private'}[employerInfo.type_of_employer]}
            disabled
          />
        </div>
      </div>

      <div className='row custom-background' style={{marginTop: '15px'}}>
        <label className='form-label'>Employer Address</label>
        <div className='col-8'>
          <input name='work_address' type='text' className='custom-select-form' value={employerInfo.work_address} disabled/>
        </div>
      </div>

      <div className='row custom-background' style={{marginTop: '15px'}}>
        <label className='form-label'>Job Position</label>
        <div className='col-8'>
          <input name='job_position' type='text' className='custom-select-form' value={employerInfo.job_position} disabled/>
        </div>
      </div>

      <div className='row custom-background' style={{marginTop: '15px'}}>
        <label className='form-label'>EC Number</label>
        <div className='col-8'>
          <input name='ec_number' type='text' className='custom-select-form' value={employerInfo.ec_number} disabled/>
          <p style={{color: 'red'}}>{employmentErrors['ec_number']}</p>
        </div>
      </div>
    </div>
  )
}

export default EmploymentOverview;