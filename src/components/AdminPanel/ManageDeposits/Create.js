import React from 'react';
import { Form, Formik, FieldArray } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import {
    ButtonDefault,
    ButtonSuccess,
    CustomSelect,
    CustomInput,
    SubmitButton,
    NonFieldErrors,
    CustomCheckbox,
    Fetcher
} from '../../../common';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { removeEmptyValues } from '../../../utils/utils';

function Create() {
    // const [accounts, setAccounts] = React.useState([]);
    const { currencies } = useCurrencies();
    const navigate = useNavigate();

    // React.useEffect(() => {}, [])

    const onSubmit = async (values, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            const response = await axios.post('/deposits/products/create/', removeEmptyValues(values), CONFIG);
            navigate({pathname: `/users/admin/deposits/${response.data.id}`});
        } catch (error) {
            console.log(error);
            if (error.message === 'Network Error') {
                actions.setErrors({responseStatus: 'Network Error'});
            } else if (error.response.status >= 400 && error.response.status < 500) {
                actions.setErrors({responseStatus: error.response.status, ...error.response.data});
            } else {
                actions.setErrors({responseStatus: error.response.status});
            }
        }
    }

    const initialValues = {
        name: '',
        currency_id: '',
        interest_term: '',
        fixed_interest_rate: '',
        overdraft_interest_rate: '',
        interest_method: '',
        interest_posting_frequency: '',
        allow_overdraft: '',
        accounting_rules: {},
        fees: []
    };

    return (
        <div>
            <button type='button' className='btn btn-default max'>
                <Link to='/users/admin/deposits'>Back</Link>
            </button>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ values, isSubmitting, errors}) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <div className='divider divider-info'>
                                <span>Product Information</span>
                            </div>
                            <CustomInput label='Product Name' name='name' type='text' required/>
                            <CustomSelect label='Currency' name='currency_id' required>
                                <option value=''>------</option>
                                {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
                            </CustomSelect>
                            <CustomSelect label='Interest Term' name='interest_term' required>
                                <option value=''>------</option>
                                <option value='Fixed'>Fixed</option>
                            </CustomSelect>
                            {values.interest_term === 'Fixed' && (
                                <CustomInput 
                                    label='Annual Fixed Interest Rate' 
                                    name='fixed_interest_rate' 
                                    type='number'
                                />
                            )}
                            <CustomCheckbox label='Allow Overdraft' name='allow_overdraft'/>
                            <CustomInput 
                                label='Annual Overdraft Interest Rate'
                                name='overdraft_interest_rate' 
                                type='number'
                            />
                            <CustomSelect label='Interest Method' name='interest_method' required>
                                <option value=''>------</option>
                                <option value='End of Day Balance'>End of Day Balance</option>
                            </CustomSelect>
                            <CustomSelect label='Interest Posting Frequency' name='interest_posting_frequency' required>
                                <option value=''>------</option>
                                <option value='Daily'>Daily</option>
                                <option value='Weekly'>Weekly</option>
                                <option value='Monthly'>Monthly</option>
                                <option value='Quarterly'>Quarterly</option>
                                <option value='Semi-Annually'>Semi-Annually</option>
                                <option value='Annually'>Annually</option>
                            </CustomSelect>
                            <div className='divider divider-info'>
                                <span>Fees</span>
                            </div>
                            <FieldArray name='fees'>
                                {({ push, remove }) => (
                                    <div>
                                        {values.fees.map((fee, index) => (
                                            <div key={index}>
                                                <CustomInput label='Fee Name' name={`fees[${index}].name`} type='text' required/>
                                                <CustomSelect label='Fee Calculation' name={`fees[${index}].fee_calculation`} required>
                                                    <option value=''>------</option>
                                                    <option value='Flat'>Flat</option>
                                                </CustomSelect>
                                                <CustomSelect label='Fee Type' name={`fees[${index}].fee_type`} required>
                                                    <option value=''>------</option>
                                                    <option value='Monthly Fee'>Monthly Fee</option>
                                                    <option value='Manual Fee'>Manual Fee</option>
                                                </CustomSelect>
                                                <CustomInput label='Amount' name={`fees[${index}].amount`} type='number' required/>
                                                <ButtonDefault value='Remove Fee' handler={() => remove(index)} />
                                                <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
                                            </div>
                                        ))}
                                        <div style={{marginTop: '10px'}}>
                                            <ButtonSuccess value='Add Fee' handler={() => push({name: '', fee_calculation: '', fee_type: '', amount: ''})} />
                                        </div>
                                    </div>
                                )}
                            </FieldArray>
                            <div className='divider divider-info'>
                                <span>Accounting Rules</span>
                            </div>
                            {values.currency_id && (
                                <Fetcher urls={[`/acc-api/sub_accounts_api/?page_num=1&currency_id=${values.currency_id}&show_ib=0`]}>
                                    {({data}) => (
                                        <>
                                            <CustomSelect label='Fund Account ASSET' name='accounting_rules.fund_account_id' required>
                                                <option value=''>------</option>
                                                {data[0].accounts.filter(account => account.account_type === 'ASSET' && account.is_cash_account).map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.general_ledger_name} {account.general_ledger_code}
                                                    </option>
                                                ))}
                                            </CustomSelect>
                                            <CustomSelect label='Savings Control LIABILITY' name='accounting_rules.savings_control_id' required>
                                                <option value=''>------</option>
                                                {data[0].accounts.filter(account => account.account_type === 'LIABILITY').map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.general_ledger_name} {account.general_ledger_code}
                                                    </option>
                                                ))}
                                            </CustomSelect>
                                            <CustomSelect label='Fee Income INCOME' name='accounting_rules.fee_income_id' required>
                                                <option value=''>------</option>
                                                {data[0].accounts.filter(account => account.account_type === 'INCOME').map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.general_ledger_name} {account.general_ledger_code}
                                                    </option>
                                                ))}
                                            </CustomSelect>
                                            <CustomSelect label='Overdraft Control ASSET' name='accounting_rules.overdraft_control_id' required>
                                                <option value=''>------</option>
                                                {data[0].accounts.filter(account => account.account_type === 'ASSET' && !account.is_cash_account).map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.general_ledger_name} {account.general_ledger_code}
                                                    </option>
                                                ))}
                                            </CustomSelect>
                                            <CustomSelect label='Interest Income INCOME' name='accounting_rules.interest_income_id' required>
                                                <option value=''>------</option>
                                                {data[0].accounts.filter(account => account.account_type === 'INCOME').map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.general_ledger_name} {account.general_ledger_code}
                                                    </option>
                                                ))}
                                            </CustomSelect>
                                            <CustomSelect label='Interest Expense EXPENSE' name='accounting_rules.interest_expense_id' required>
                                                <option value=''>------</option>
                                                {data[0].accounts.filter(account => account.account_type === 'EXPENSE').map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.general_ledger_name} {account.general_ledger_code}
                                                    </option>
                                                ))}
                                            </CustomSelect>
                                            <CustomSelect label='Negative Interest Receivable ASSET' name='accounting_rules.negative_interest_receivable_id' required>
                                                <option value=''>------</option>
                                                {data[0].accounts.filter(account => account.account_type === 'ASSET' && !account.is_cash_account).map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.general_ledger_name} {account.general_ledger_code}
                                                    </option>
                                                ))}
                                            </CustomSelect>
                                            <CustomSelect label='Negative Interest Income INCOME' name='accounting_rules.negative_interest_income_id' required>
                                                <option value=''>------</option>
                                                {data[0].accounts.filter(account => account.account_type === 'INCOME').map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.general_ledger_name} {account.general_ledger_code}
                                                    </option>
                                                ))}
                                            </CustomSelect>
                                            <CustomSelect label='Taxes Payable LIABILITY' name='accounting_rules.taxes_payable_id' required>
                                                <option value=''>------</option>
                                                {data[0].accounts.filter(account => account.account_type === 'LIABILITY').map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.general_ledger_name} {account.general_ledger_code}
                                                    </option>
                                                ))}
                                            </CustomSelect>
                                            <CustomSelect label='Interest Payable LIABILITY' name='accounting_rules.interest_payable_id' required>
                                                <option value=''>------</option>
                                                {data[0].accounts.filter(account => account.account_type === 'LIABILITY').map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.general_ledger_name} {account.general_ledger_code}
                                                    </option>
                                                ))}
                                            </CustomSelect>
                                            <CustomSelect label='Overdraft Writeoff EXPENSE' name='accounting_rules.od_writeoff_expense_id' required>
                                                <option value=''>------</option>
                                                {data[0].accounts.filter(account => account.account_type === 'EXPENSE').map(account => (
                                                    <option key={account.id} value={account.id}>
                                                        {account.general_ledger_name} {account.general_ledger_code}
                                                    </option>
                                                ))}
                                            </CustomSelect>
                                        </>
                                    )}
                                </Fetcher>
                            )}
                            <div className='divider divider-default' style={{padding: '1.25rem'}}></div>
                            <div style={{display:'flex', justifyContent: 'flex-end'}}> 
                                <SubmitButton isSubmitting={isSubmitting}/>
                            </div>
                        </NonFieldErrors>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default Create;