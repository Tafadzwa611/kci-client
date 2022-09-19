import React, {useState, useEffect} from 'react';
import { makeRequest } from '../../../../utils/utils';

const initialState = {name: '', date_of_account: '', currency: ''};

function EditStaffRolesPermissions({open, setOpen, selectedroleID}) {
  const [othInType, setOthInType] = useState(initialState);
  const [currencies, setCurrencies] = useState(null);
  const [serverErrors, setServerErrors] = useState([]);
  const [errors, setErrors] = useState({});

//   const handleExpenseTypeChange = (e) => {
//     const { name, value } = e.target;
//     setOthInType({ ...othInType, [name]: value });
//     validate(e)
//   };

//   const validate = (evt) => {
//     if (evt.target.required && evt.target.value === '') {
//       setErrors(curr => {
//         return {...curr, [evt.target.name]: 'This field is required'}
//       })
//     }else {
//       setErrors(curr => {
//         return {...curr, [evt.target.name]: ''}
//       })
//     }
//   }

//   async function fetchCurrency() {
//     try {
//       const response = await makeRequest.get('/usersapi/currencieslist/', {timeout: 8000});
//       if (response.ok) {
//         const currency_types = await response.json();
//         return currency_types;
//       }else {
//         const error = await response.json();
//         console.log(error);
//       }
//     }catch(error) {
//       console.log(error);
//     }
//   }

//   useEffect(() => {
//     getCurrency()
//   }, []);

//   const getCurrency = async () => {
//     const data = await fetchCurrency();
//     setCurrencies(data);
//   };

//   if (currencies===null) {
//     return <div>Loading</div>
//   }

//   const submit = async () => {
//     const body = {
//       name: othInType.name,
//       date_of_account: othInType.date_of_account,
//       currency_id: othInType.currency,
//     };
//     const response = await makeRequest.post('/otherincomeapi/add_otherincome_type/', body, {timeout: 8000});
//     if (response.ok) {
//       const data = await response.json();
//       setOtherIncomeTypes(curr => [data, ...curr])
//       setOpen(curr => !curr)
//       setOthInType(initialState)
//       return data
//     }
//     const errors = await response.json();
//     setServerErrors(errors);
//     window.scrollTo(0, 0);
//   }


  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <label className="form-title">[ Set Permissions ]</label>
            <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
          </div>
          <div className='modal-body text-light'>

            Permissions Role ID {selectedroleID}
            {/* {serverErrors.map((error, index) => (
              <div className='row custom-background' style={{marginTop: '15px'}}>
                <label className='form-label'></label>
                <div className='col-9'>
                  <div style={{fontSize: 12, color: 'red'}} key={index}>{error}</div>
                </div>
              </div>
            ))}

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Name<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleExpenseTypeChange} value={othInType.name} required/>
                <p style={{color: 'red'}}>{errors['name']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Date of Account<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='date_of_account' type='date' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleExpenseTypeChange} value={othInType.date_of_account} required/>
                <p style={{color: 'red'}}>{errors['date_of_account']}</p>
              </div>
            </div>

            <div className='row' style={{marginTop: '15px'}}>
              <label className='form-label'>Currency<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <select name='currency' className='custom-select-form' onFocus={validate} onChange={handleExpenseTypeChange} value={othInType.currency} required>
                  <option></option>
                  {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>{currency.fullname}</option>
                  ))}
                </select>
                <p style={{color: 'red'}}>{errors['currency']}</p>
              </div>
            </div>

            <div className="row">
                <p><label className='form-label'><span style={{color: 'red'}}>*</span>required field</label></p>
            </div> */}

          </div>

          <div className='modal-footer justify-content-between'>
            <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
            <button type='submit' className='btn btn-info'>
                Set Permissions
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditStaffRolesPermissions;