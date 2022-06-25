
import React from 'react';

function EmploymentOverview({employerInfo, employmentErrors}) {
  return (
    <div className="text-light">
      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Employer Name</label>
        <div className='col-sm-5'>
          <input name='employer' type='text' className='form-control well' value={employerInfo.employer} disabled/>
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Employer Type</label>
        <div className='col-sm-5'>
          <input
            name='type_of_employer'
            type='text'
            className='form-control well'
            value={{Gvt: 'Government', Pvt: 'Private'}[employerInfo.type_of_employer]}
            disabled
          />
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Employer Address</label>
        <div className='col-sm-5'>
          <input name='work_address' type='text' className='form-control well' value={employerInfo.work_address} disabled/>
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>Job Position</label>
        <div className='col-sm-5'>
          <input name='job_position' type='text' className='form-control well' value={employerInfo.job_position} disabled/>
        </div>
      </div>

      <div className='form-group row' style={{marginTop: '15px'}}>
        <label className='col-sm-1 control-label'>EC Number</label>
        <div className='col-sm-5'>
          <input name='ec_number' type='text' className='form-control well' value={employerInfo.ec_number} disabled/>
          <p style={{color: 'red'}}>{employmentErrors['ec_number']}</p>
        </div>
      </div>
    </div>
  )
}

export default EmploymentOverview;