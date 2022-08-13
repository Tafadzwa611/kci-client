import React, {useState, useEffect} from 'react';
import { makeRequest } from '../../utils/utils';

const initialState = {expense_type: '', expense_name: '', expense_amount: '', expense_date: '', reference: '', description: '', fund_account_id:''};

function CreateExpenseModal({open, setOpen, setExpenses}) {
  const [exp, setExp] = useState(initialState);
  const [disable, setDisable] = useState(true);
  const [serverErrors, setServerErrors] = useState({});

  const [errors, setErrors] = useState({});
  const [expenseTypes, setExpenseTypes] = useState(null);
  const [fundAccount, setFundAccount] = useState(null);

  const handleExpenseChange = (e) => {
    const { name, value } = e.target;
    setExp({ ...exp, [name]: value });
    validate(e)
  };

  useEffect(() => {
    if  (exp.expense_type != "" && exp.expense_name != "" &&  exp.expense_amount != "" && exp.expense_date != "" && exp.fund_account_id != "" ) {
      setDisable(false)
    }
  },[exp]);

  const validate = (evt) => {
    if (evt.target.required && evt.target.value === '') {
      setDisable(true)
      setErrors(curr => {
        return {...curr, [evt.target.name]: 'This field is required'}
      })
    }else {
      setErrors(curr => {
        return {...curr, [evt.target.name]: ''}
      })
    }
  }

  async function fetchExpenseTypes() {
    try {
      const response = await makeRequest.get('/expensesapi/expensetypeslist/', {timeout: 8000});
      if (response.ok) {
        const expense_types = await response.json();
        return expense_types;
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
    getExpenseTypes()
    getFundAccounts()
  }, []);

  const getExpenseTypes = async () => {
    const data = await fetchExpenseTypes();
    setExpenseTypes(data);
  };

  const getFundAccounts = async () => {
    const data = await fetchFundAccount();
    setFundAccount(data);
  };

  if (expenseTypes===null || fundAccount===null) {
    return <div>Loading</div>
  }

  const submit = async () => {
    const body = {
      expense_type_id: exp.expense_type,
      expense_name: exp.expense_name,
      expense_amount: exp.expense_amount,
      expense_date: exp.expense_date,
      reference: exp.reference,
      description: exp.description,
      fund_account_id: exp.fund_account_id,
    };
    const response = await makeRequest.post('/expensesapi/add_expense/', body, {timeout: 8000});
    if (response.ok) {
      const data = await response.json();
      setExpenses(curr => [data, ...curr])
      setOpen(curr => !curr)
      setExp(initialState)
      return data
    }
    const errors = await response.json();
    console.log(errors);
    setServerErrors(errors);
    window.scrollTo(0, 0);
  }

  const exp_type = expenseTypes.filter((value) => value.id == exp.expense_type);
  let exp_type_currency_id
  if (exp_type != ""){
    exp_type_currency_id = exp_type[0].currency.id
  }

  const newFundAccountArray = fundAccount.filter((value) => value.currency ==  exp_type_currency_id);

  return (
    <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
      <div className='modal-dialog modal-lg modal-dialog-scrollable text-light'>
        <div className='modal-content'>
          <div className='modal-header'>
            <label className="form-title">[ Add Expense ]</label>
            <button type='button' className='close' onClick={(e) => setOpen(curr => !curr)} style={{cursor:"pointer"}}><span aria-hidden='true'>&times;</span></button>
          </div>
          <div className='modal-body'>

            <div className='row' style={{marginTop: '15px'}}>
              <label className='form-label'>Expense Type<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <select name='expense_type' className='custom-select-form' onFocus={validate} onChange={handleExpenseChange} value={exp.expense_type} required>
                  <option></option>
                  {expenseTypes.map((expense_type) => (
                    <option key={expense_type.id} value={expense_type.id}>{expense_type.name}</option>
                  ))}
                </select>
                <p style={{color: 'red'}}>{errors['expense_type']}</p>
              </div>
            </div>

            <div className='row' style={{marginTop: '15px'}}>
              <label className='form-label'>Fund Account<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <select name='fund_account_id' className='custom-select-form' onFocus={validate} onChange={handleExpenseChange} value={exp.fund_account_id} required>
                  <option></option>
                  {newFundAccountArray.map((account) => (
                    <option key={account.id} value={account.id}>{account.general_ledger_name}</option>
                  ))}
                </select>
                <p style={{color: 'red'}}>{errors['fund_account_id']}</p>
              </div>
            </div>
              
            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Expense name<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='expense_name' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleExpenseChange} value={exp.expense_name} required/>
                <p style={{color: 'red'}}>{errors['expense_name']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Expense Amount<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='expense_amount' type='text' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleExpenseChange} value={exp.expense_amount} required/>
                <p style={{color: 'red'}}>{errors['expense_amount']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Expense Date<span style={{color: 'red'}}>*</span></label>
              <div className='col-9'>
                <input name='expense_date' type='date' className='custom-select-form' autoComplete='new-password' onFocus={validate} onChange={handleExpenseChange} value={exp.expense_date} required/>
                <p style={{color: 'red'}}>{errors['expense_date']}</p>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Reference</label>
              <div className='col-9'>
                <input name='reference' type='text' className='custom-select-form' autoComplete='new-password' onChange={handleExpenseChange} value={exp.reference}/>
              </div>
            </div>

            <div className='row custom-background' style={{marginTop: '15px'}}>
              <label className='form-label'>Description</label>
              <div className='col-9'>
                <input name='description' type='text' className='custom-select-form' autoComplete='new-password' onChange={handleExpenseChange} value={exp.description}/>
              </div>
            </div>

            <div className="row">
                <p><label className='form-label'><span style={{color: 'red'}}>*</span>required field</label></p>
            </div>

          </div>

          <div className='modal-footer justify-content-between'>
            <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
            <button type='submit' className='btn btn-info' onClick={submit} style={disable ? {pointerEvents: 'none', opacity: '0.7'} : {}} disabled={disable}>
              Add Expense
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateExpenseModal;