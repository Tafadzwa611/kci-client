import React from 'react';
import { makeRequest } from '../../../../../utils/utils';

const validateInput = (state, setErrors) => {
    let validInput = true;
    let newErrors = {};
    if (state.general_ledger_name === '') {
        newErrors.general_ledger_name = 'Account name is a required field.';
        validInput = false;
    }
    if (state.account_balance === '') {
        newErrors.account_balance = 'Opening balance is a required field.';
        validInput = false;
    }
    if (state.account_open_date === '') {
        newErrors.account_open_date = 'Account Date is a required field.';
        validInput = false;
    }
    if (state.cash_account_type === '') {
        newErrors.cash_account_type = 'Mode is a required field.';
        validInput = false;
    }
    if (state.currency_id === '') {
        newErrors.currency_id = 'Currency is a required field.';
        validInput = false;
    }
    if (state.opening_balance_type === '') {
        newErrors.opening_balance_type = 'Debit/Credit is a required field.';
        validInput = false;
    }
    setErrors(curr => {
        return {...curr, ...newErrors};
    })
    return validInput;
};

function processErrors(errors, setErrorMessage) {
    if ('general_ledger_name' in errors) {
        setErrorMessage(errors['general_ledger_name'][0]);
    }
    if ('account_balance' in errors) {
        setErrorMessage(errors['account_balance'][0]);
    }
}

export const AddCashAccountForm = ({ setSubAccounts, currencies, mainAccountId, setOpen }) => {
    const [state, setState] = React.useState({
        general_ledger_name: "",
        account_balance: "",
        account_open_date: "",
        description: "",
        cash_account_type: "",
        currency_id: "",
        opening_balance_type: "",
        parent_id: mainAccountId
    });
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [errors, setErrors] = React.useState({general_ledger_name: null, account_balance: null, account_open_date: null, cash_account_type: null, currency_id: null, opening_balance_type: null});

    const handleChange = (evt) => {
        setState({...state, [evt.target.name]: evt.target.value});
        setErrors({...errors, [evt.target.name]: null});
    }

    async function handleSubmission (evt) {
        evt.preventDefault();
        const validInput = validateInput(state, setErrors);
        if (!validInput) {
            return null;
        }
        const response = await makeRequest.post('/acc-api/create-sub-account/', state);
        if (response.ok) {
            let newAccount = await response.json();
            setErrorMessage(null);
            setSubAccounts(previousAccounts => [newAccount, ...previousAccounts]);
            setState({general_ledger_name: "", account_balance: "", description: "", account_open_date: "",
            opening_balance_type: "", cash_account_type: "", currency_id: "",  parent_id: mainAccountId});
            setOpen(curr => !curr);
        }else {
            const errors = await response.json();
            processErrors(errors, setErrorMessage);
            document.getElementById('add-account-form-body').scrollTop = 0;
        }
    }

    return (
        <>
            {errorMessage != null && <div className="alert alert-danger alert-dismissible">
                <h4><i className="icon fa fa-ban"></i> Error!</h4>
                {errorMessage}
            </div>}
            <form>
                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>General Ledger Name<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input
                            id='general_ledger_name'
                            className='custom-select-form'
                            name='general_ledger_name'
                            autoComplete='new-password'
                            type='text'
                            value={state['general_ledger_name']}
                            onChange={handleChange}
                            placeholder='General Ledger Name'
                            required={true}
                        />
                        <p style={{color: 'red'}}>{errors.general_ledger_name}</p>
                    </div>
                </div>
                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>Opening balance<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input
                            id='account_balance'
                            className='custom-select-form'
                            name='account_balance'
                            autoComplete='new-password'
                            type='text'
                            value={state['account_balance']}
                            onChange={handleChange}
                            placeholder='Opening balance'
                            required
                        />
                        <p style={{color: 'red'}}>{errors.account_balance}</p>
                    </div>
                </div>
                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>Debit/Credit<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <select id="opening_balance_type" name="opening_balance_type" className="custom-select-form" value={state.opening_balance_type} onChange={handleChange} required>
                            <option value=''></option>
                            <option value='Dr'>Debit</option>
                            <option value='Cr'>Credit</option>
                        </select>
                        <p style={{color: 'red'}}>{errors.opening_balance_type}</p>
                    </div>
                </div>
                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>Account Date<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input
                            name='account_open_date'
                            type='date'
                            className='custom-select-form'
                            onKeyDown={(e) => e.preventDefault()}
                            onChange={handleChange}
                            value={state.account_open_date}
                            required
                        />
                        <p style={{color: 'red'}}>{errors.account_open_date}</p>
                    </div>
                </div>
                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>Currency<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <select id="currency_id" name="currency_id" className="custom-select-form" value={state.currency_id} onChange={handleChange}>
                            <option value=''></option>
                            {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                        </select>
                        <p style={{color: 'red'}}>{errors.currency_id}</p>
                    </div>
                </div>
                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>Mode<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <select id="cash_account_type" name="cash_account_type" className="custom-select-form" value={state.cash_account_type} onChange={handleChange} required>
                            <option value=''></option>
                            <option value='Cash'>Cash</option>
                            <option value='Ecocash'>EcoCash</option>
                            <option value='Onemoney'>OneMoney</option>
                            <option value='Telecash'>TeleCash</option>
                            <option value='Bank'>Bank</option>
                        </select>
                        <p style={{color: 'red'}}>{errors.cash_account_type}</p>
                    </div>
                </div>
                <div className='row custom-background'>
                    <label className='form-label'>Description</label>
                    <div className='col-9'>
                        <textarea
                            id='description'
                            className='custom-select-form'
                            name='description'
                            autoComplete='new-password'
                            rows='3'
                            value={state['description']}
                            onChange={handleChange}
                            placeholder='Enter ...'
                            >
                        </textarea>
                    </div>
                </div>
                <div style={{paddingBottom: "1rem"}}></div>
                <div className='modal-footer justify-content-between'>
                    <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
                    <button type='submit' className='btn btn-info' onClick={handleSubmission}>
                        Add Sub Account
                    </button>
                 </div>
            </form>
        </>
    )
}

export const AddAccountForm = ({ setSubAccounts, currencies, mainAccountId, setOpen }) => {
    const [state, setState] = React.useState({
        general_ledger_name: "",
        account_balance: "",
        account_open_date: "",
        description: "",
        currency_id: "",
        opening_balance_type: "",
        parent_id: mainAccountId
    });
    const [errorMessage, setErrorMessage] = React.useState(null);
    const [errors, setErrors] = React.useState({general_ledger_name: null, account_balance: null, account_open_date: null, cash_account_type: null, currency_id: null, opening_balance_type: null});

    const handleChange = (evt) => {
        setState({...state, [evt.target.name]: evt.target.value});
        setErrors({...errors, [evt.target.name]: null});
    }

    async function handleSubmission (evt) {
        evt.preventDefault();
        const validInput = validateInput(state, setErrors);
        if (!validInput) {
            return null;
        }
        const response = await makeRequest.post('/acc-api/create-sub-account/', {...state, cash_account_type: null});
        if (response.ok) {
            let newAccount = await response.json();
            setErrorMessage(null);
            setSubAccounts(previousAccounts => [newAccount, ...previousAccounts]);
            setState({general_ledger_name: "", account_balance: "", account_open_date: "",
            opening_balance_type: "", description: "", currency_id: "", parent_id: mainAccountId});
            setOpen(curr => !curr);
        }else {
            const errors = await response.json();
            processErrors(errors, setErrorMessage);
            document.getElementById('add-account-form-body').scrollTop = 0;
        }
    }

    return (
        <>
            {errorMessage != null && <div className="alert alert-danger alert-dismissible">
                <h4><i className="icon fa fa-ban"></i> Error!</h4>
                {errorMessage}
                </div>}
            <form>
                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>General Ledger Name<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input
                            id='general_ledger_name'
                            className='custom-select-form'
                            name='general_ledger_name'
                            autoComplete='new-password'
                            type='text'
                            value={state['general_ledger_name']}
                            onChange={handleChange}
                            placeholder='General Ledger Name'
                            required={true}
                        />
                        <p style={{color: 'red'}}>{errors.general_ledger_name}</p>
                    </div>
                </div>
                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>Opening balance<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input
                            id='account_balance'
                            className='custom-select-form'
                            name='account_balance'
                            autoComplete='new-password'
                            type='text'
                            value={state['account_balance']}
                            onChange={handleChange}
                            placeholder='Opening balance'
                            required
                        />
                        <p style={{color: 'red'}}>{errors.account_balance}</p>
                    </div>
                </div>
                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>Debit/Credit<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <select id="opening_balance_type" name="opening_balance_type" className="custom-select-form" value={state.opening_balance_type} onChange={handleChange} required>
                            <option value=''></option>
                            <option value='Dr'>Debit</option>
                            <option value='Cr'>Credit</option>
                        </select>
                        <p style={{color: 'red'}}>{errors.opening_balance_type}</p>
                    </div>
                </div>
                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>Account Date<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <input
                            name='account_open_date'
                            type='date'
                            className='custom-select-form'
                            onKeyDown={(e) => e.preventDefault()}
                            onChange={handleChange}
                            value={state.account_open_date}
                            required
                        />
                        <p style={{color: 'red'}}>{errors.account_open_date}</p>
                    </div>
                </div>
                <div className='row custom-background' style={{marginTop: '15px'}}>
                    <label className='form-label'>Currency<span style={{color: 'red'}}>*</span></label>
                    <div className='col-9'>
                        <select id="currency_id" name="currency_id" className="custom-select-form" value={state.currency_id} onChange={handleChange}>
                            <option value=''></option>
                            {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                        </select>
                        <p style={{color: 'red'}}>{errors.currency_id}</p>
                    </div>
                </div>
                <div className='row custom-background'>
                    <label className='form-label'>Description</label>
                    <div className='col-9'>
                        <textarea
                            id='description'
                            className='custom-select-form'
                            name='description'
                            autoComplete='new-password'
                            rows='3'
                            value={state['description']}
                            onChange={handleChange}
                            placeholder='Enter ...'
                            >
                        </textarea>
                    </div>
                </div>
                <div style={{paddingBottom: "1rem"}}></div>
                <div className='modal-footer justify-content-between'>
                    <button type='button' className='btn btn-default' onClick={(e) => setOpen(curr => !curr)}>Close</button>
                    <button type='submit' className='btn btn-info' onClick={handleSubmission}>
                        Add Sub Account
                    </button>
                 </div>
            </form>
        </>
    )
}