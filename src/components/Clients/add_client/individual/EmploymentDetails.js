import React from 'react';

function EmploymentDetails({employerInfo, setEmployerInfo, employmentErrors, setEmploymentErrors, setTab}) {
  const handleChange = (evt) => {
    setEmployerInfo(curr => {
      return {...curr, [evt.target.name]: evt.target.value}
    })
    if (evt.target.name==='ec_number') {
      validateEc(evt);
    }else if (evt.target.name==='type_of_employer') {
      validateEc(evt);
    }
  }

  const validateEc = evt => {
    const re  = /^\d{7}[A-Za-z]{1}$/;
    if (evt.target.name==='type_of_employer') {
      if (evt.target.value==='Gvt') {
        if (employerInfo.ec_number==='') {
          setEmploymentErrors(curr => {
            return {...curr, ec_number: 'This field is required'}
          })
        }else {
          if (!re.test(String(employerInfo.ec_number).toLowerCase())) {
            setEmploymentErrors(curr => {
              return {...curr, ec_number: 'EC Number is invalid'}
            })
          }
        }
      }else {
        setEmploymentErrors(curr => {
          return {...curr, ec_number: ''}
        })
      }
    }else if(evt.target.name==='ec_number') {
      if (!re.test(String(evt.target.value).toLowerCase()) && employerInfo.type_of_employer === 'Gvt') {
        setEmploymentErrors(curr => {
          return {...curr, ec_number: 'EC Number is invalid'}
        })
      }else {
        setEmploymentErrors(curr => {
          return {...curr, ec_number: ''}
        })
      }
    }
  }

  return (
    <>
      <div className='card-body text-light'>
        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Employer Name</b></label>
          <div className='col-8'>
            <input name='employer' type='text' className='custom-select-form' onChange={handleChange} value={employerInfo.employer}/>
          </div>
        </div>

        <div className='row' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Employer Type</b></label>
          <div className='col-8'>
            <select name='type_of_employer' className='custom-select-form' onChange={handleChange} value={employerInfo.type_of_employer}>
              <option value=''></option>
              <option value='Gvt'>Government</option>
              <option value='Pvt'>Private</option>
            </select>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Employer Address</b></label>
          <div className='col-8'>
            <input name='work_address' type='text' className='custom-select-form' onChange={handleChange} value={employerInfo.work_address}/>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>Job Position</b></label>
          <div className='col-8'>
            <input name='job_position' type='text' className='custom-select-form' onChange={handleChange} value={employerInfo.job_position}/>
          </div>
        </div>

        <div className='row custom-background' style={{marginTop: '15px'}}>
          <label className='form-label'><b>EC Number</b></label>
          <div className='col-8'>
            <input name='ec_number' type='text' className='custom-select-form' onChange={handleChange} value={employerInfo.ec_number}/>
            <p style={{color: 'red', fontSize:'0.8125rem'}}>{employmentErrors['ec_number']}</p>
          </div>
        </div>
      </div>
      <div className="load-more-container">
        <button onClick={e => setTab('addr')} type='button' className='btn btn-default'>Back</button>
        <button onClick={e => setTab('bnk')} type='button' className='btn btn-info'>Next</button>
      </div>
    </>
  )
}

export default EmploymentDetails;