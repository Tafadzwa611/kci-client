import React, {useState, useEffect} from 'react';
import { makeRequest } from '../../utils/utils';

const initialState = {income_type: '', otherincome_name: '', income_amount: '', income_date: '', reference: '', description: '', fund_account_id:''};

function CreateOtherincomeModal({open, setOpen, setOtherIncomes}) {
  const [oth, setOth] = useState(initialState);
  const [serverErrors, setServerErrors] = useState({});

  const [errors, setErrors] = useState({});
  const [otherIncomeTypes, setOtherIncomeTypes] = useState(null);
  const [fundAccount, setFundAccount] = useState(null);

  const handleOtherIncomeChange = (e) => {
    const { name, value } = e.target;
    setOth({ ...oth, [name]: value });
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

  async function fetchOtherIncomeTypes() {
    try {
      const response = await makeRequest.get('/otherincomeapi/otherincometypeslist/', {timeout: 8000});
      if (response.ok) {
        const otherincome_types = await response.json();
        return otherincome_types;
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  async function fetchFundAccount() {
    try {
      const response = await makeRequest.get('/acc-api/cash-and-cash-equivalents-sub-accs/', {timeout: 8000});
      if (response.ok) {
        const fund_accounts = await response.json();
        return fund_accounts;
      }else {
        const error = await response.json();
        console.log(error);
      }
    }catch(error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOtherIncomeTypes()
    getFundAccounts()
  }, []);

  const getOtherIncomeTypes = async () => {
    const data = await fetchOtherIncomeTypes();
    setOtherIncomeTypes(data);
  };

  const getFundAccounts = async () => {
    const data = await fetchFundAccount();
    setFundAccount(data);
  };

  if (otherIncomeTypes===null || fundAccount===null) {
    return <div>Loading</div>
  }

  const submit = async () => {
    const body = {
      income_type_id: oth.income_type,
      otherincome_name: oth.otherincome_name,
      income_amount: oth.income_amount,
      income_date: oth.income_date,
      reference: oth.reference,
      description: oth.description,
      fund_account_id: oth.fund_account_id,
    };
    const response = await makeRequest.post('/otherincomeapi/add_otherincome/', body, {timeout: 8000});
    if (response.ok) {
      const data = await response.json();
      setOtherIncomes(curr => [data, ...curr])
      setOpen(curr => !curr)
      setOth(initialState)
      return data
    }
    const errors = await response.json();
    console.log(errors);
    setServerErrors(errors);
    window.scrollTo(0, 0);
  }

  const inc_type = otherIncomeTypes.filter((value) => value.id == oth.income_type);
  let other_inc_type_currency_id
  if (inc_type != ""){
    other_inc_type_currency_id = inc_type[0].currency.id
  }

  const newFundAccountArray = fundAccount.filter((value) => value.currency ==  other_inc_type_currency_id);

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg modal-dialog-scrollable'>
        <div className='modal-content'>
          <div className='modal-header'>
            <label className="form-title">[ Add Other Income ]</label>
            <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
          </div>
          <div className='modal-body'>

            <div className='row' style={{marginTop: '15px'}}>
              <label className='form-label'>Other Income Type<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <select name='income_type' className='custom-select-form' onFocus={validate} onChange={handleOtherIncomeChange} value={oth.income_type} required>
                  <option></option>
                  {otherIncomeTypes.map((otherincome_type) => (
                    <option key={otherincome_type.id} value={otherincome_type.id}>{otherincome_type.name}</option>
                  ))}
                </select>
                <p style={{color: 'red'}}>{errors['income_type']}</p>
              </div>
            </div>

            <div className='row' style={{marginTop: '15px'}}>
              <label className='form-label'>Fund Account<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <select name='fund_account_id' className='custom-select-form' onFocus={validate} onChange={handleOtherIncomeChange} value={oth.fund_account_id} required>
                  <option></option>
                  {newFundAccountArray.map((account) => (
                    <option key={account.id} value={account.id}>{account.general_ledger_name}</option>
                  ))}
                </select>
                <p style={{color: 'red'}}>{errors['fund_account_id']}</p>
              </div>
            </div>
              
            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Other Income name<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='otherincome_name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleOtherIncomeChange} value={oth.otherincome_name} required/>
                <p style={{color: 'red'}}>{errors['otherincome_name']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Other Income Amount<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='income_amount' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleOtherIncomeChange} value={oth.income_amount} required/>
                <p style={{color: 'red'}}>{errors['income_amount']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Other Income Date<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='income_date' type='date' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleOtherIncomeChange} value={oth.income_date} required/>
                <p style={{color: 'red'}}>{errors['income_date']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Reference<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='reference' type='text' className='custom-select-form' autoComplete='new-password' onChange={handleOtherIncomeChange} value={oth.reference}/>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Description<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='description' type='text' className='custom-select-form' autoComplete='new-password' onChange={handleOtherIncomeChange} value={oth.description}/>
              </div>
            </div>

            <div className="row">
                <p><label className='form-label'><span style={{color: 'red'}}>*</span>required field</label></p>
            </div>

          </div>

          <div className='modal-footer justify-content-between'>
            <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
            <button type='submit' className='btn btn-info' onClick={submit}>
              Add Other Income
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateOtherincomeModal;