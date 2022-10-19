import React, {useState, useEffect} from 'react';
import { makeRequest } from '../../../../utils/utils';
import MiniLoader from '../../../Loader/MiniLoader';

const initialState = {name: '', fee_calculation: '', is_mandatory: '', date_created: '', calculate_fee_as_percentage_of: '', deductable_fees:'', currency: ''};

function CreateLoanFee({open, setOpen, setFees}) {
  const [loanfee, setLoanFeee] = useState(initialState);
  const [currencies, setCurrencies] = useState(null);
  const [serverErrors, setServerErrors] = useState([]);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoanFeee({ ...loanfee, [name]: value });
    validate(e)
  };

  const validate = (evt) => {
    if (evt.target.required && evt.target.value === '') {
      setErrors(curr => {
        return {...curr, [evt.target.name]: 'This field is required'}
      })
    }else {
      setErrors(curr => {
        return {...curr, [evt.target.name]: ''}
      })
    }
  }

  async function fetchCurrency() {
    try {
      const response = await makeRequest.get('/usersapi/currencieslist/', {timeout: 8000});
      if (response.ok) {
        const currency_types = await response.json();
        return currency_types;
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getCurrency()
  }, []);

  const getCurrency = async () => {
    const data = await fetchCurrency();
    setCurrencies(data);
  };

  const submit = async () => {
    const body = {
      name: loanfee.name,
      fee_calculation: loanfee.fee_calculation,
      is_mandatory: loanfee.is_mandatory,
      date_created: loanfee.date_created,
      calculate_fee_as_percentage_of: loanfee.calculate_fee_as_percentage_of,
      deductable_fees: loanfee.deductable_fees,
      currency_id: loanfee.currency,
    };
    const response = await makeRequest.post('/loansapi/add_loan_fee/', body, {timeout: 8000});
    if (response.ok) {
      const data = await response.json();
      setFees(curr => [data, ...curr])
      setOpen(curr => !curr)
      setLoanFeee(initialState)
      return data
    }
    const errors = await response.json();
    setServerErrors(errors);
  }

  // const disableAdd = Object.values(loanfee).findIndex(el => el==='') != -1;

  if (currencies===null) {
    return <MiniLoader />
  }

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <label className="form-title">[ Add Loan Fee ]</label>
            <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
          </div>
          <div className='modal-body text-light'>

            {/* {serverErrors && serverErrors.map((error, index) => (
              <div className='row custom-background' style={{marginTop: '15px'}}>
                <label className='form-label'></label>
                <div className='col-9'>
                  <div style={{fontSize: 12, color: 'red'}} key={index}>{error}</div>
                </div>
              </div>
            ))} */}

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Name<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={loanfee.name} required/>
                <p style={{color: 'red'}}>{errors['name']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Date<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='date_created' type='date' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={loanfee.date_created} required/>
                <p style={{color: 'red'}}>{errors['date_created']}</p>
              </div>
            </div>

            <div className='row' style={{marginTop: '15px'}}>
              <label className='form-label'>Currency<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <select name='currency' className='custom-select-form' onFocus={validate} onChange={handleChange} value={loanfee.currency} required>
                  <option></option>
                  {currencies.map((currency) => (
                    <option key={currency.id} value={currency.id}>{currency.fullname}</option>
                  ))}
                </select>
                <p style={{color: 'red'}}>{errors['currency']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Fee Calculation<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <div>
                  <input name='fee_calculation' type='radio' autoComplete='new-password' onFocus={validate} onChange={handleChange} value='Fixed Amount' />
                  <span className="radio-span">Fixed Amount</span>
                </div>
                <div>
                  <input name='fee_calculation' type='radio' autoComplete='new-password' onFocus={validate} onChange={handleChange} value='Percent Based' />
                  <span className="radio-span">Percent Based</span>
                </div>
                <p style={{color: 'red'}}>{errors['fee_calculation']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Calculate fee as % of<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <div>
                  <input name='calculate_fee_as_percentage_of' type='radio' autoComplete='new-password' onFocus={validate} onChange={handleChange} value='Total Loan Due Principal Amount' />
                  <span className="radio-span">Total Loan Due Principal Amount </span>
                </div>
                <div>
                  <input name='calculate_fee_as_percentage_of' type='radio' autoComplete='new-password' onFocus={validate} onChange={handleChange} value='Total Loan Due Interest Amount' />
                  <span className="radio-span">Total Loan Due Interest Amount</span>
                </div>
                <div>
                  <input name='calculate_fee_as_percentage_of' type='radio' autoComplete='new-password' onFocus={validate} onChange={handleChange} value='Total Loan Due Principal and Interest Amount' />
                  <span className="radio-span">Total Loan Due Principal and Interest Amount </span>
                </div>
                <p style={{color: 'red'}}>{errors['calculate_fee_as_percentage_of']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Is Mandatory<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='is_mandatory' type='checkbox' autoComplete='new-password' onFocus={validate} onChange={handleChange} value={loanfee.is_mandatory}/>
              </div>
            </div>

            <div className="row">
                <p><label className='form-label'><span style={{color: 'red'}}>*</span>required field</label></p>
            </div>

          </div>

          <div className='modal-footer justify-content-between'>
            <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
            <button type='submit' className='btn btn-info' onClick={submit}>
              Add Loan Fee
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateLoanFee;