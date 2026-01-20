import React from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Form, Formik } from 'formik';
import {
    Modal,
    ModalSubmit,
    NonFieldErrors,
    CustomInput,
    CustomDatePicker,
    CustomSelect,
    CustomTextField,
    CustomMultiSelect
} from '../../../common';

const TXN_NAMES = Object.freeze({
    DEPOSIT: "Deposit",
    INTEREST: "Manual Interest",
    WITHDRAWAL: "Withdrawal",
    FEES: "Manual Fees",
});

function Transact({deposit, setDeposit, setModal}) {
    const [cashAccounts, setCashAccounts] = React.useState([]);
    const [error, setError] = React.useState(null);
    const generateKey = () => (window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random()}`);
    const idemKeyRef = React.useRef(generateKey());

    React.useEffect(() => {
        async function fetch() {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            try {
                const response = await axios.get('/acc-api/cash-accounts-list/', CONFIG);
                setCashAccounts(response.data.accounts);
            } catch (error) {
                if (error.response) {
                    setError(error.response.data.detail);
                    return;
                }
                console.error('An error occurred while fetching clients:', error);
            }
        }
        fetch();
    }, []);

    const onSubmit = async (values, actions) => {
        try {
            const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
            const payload = {
                ...values,
                idempotency_key: idemKeyRef.current,
                ...([TXN_NAMES.DEPOSIT, TXN_NAMES.WITHDRAWAL].includes(values.transaction_name) && {
                    fund_account_id: values.fund_account.value,
                }),
            };
            delete payload.fee;
            delete payload.fund_account;
            const response = await axios.post(`/deposits/${deposit.id}/transact/`, payload, CONFIG);
            setDeposit(curr => ({
                ...curr,
                statement: response.data.statement,
                status: response.data.status,
                balance: response.data.new_balance,
                last_updated: response.data.last_updated
            }));
            setModal(null);
        } catch (error) {
            if (error.message === 'Network Error') {
                actions.setErrors({responseStatus: 'Network Error'});
            } else if (error.response.status >= 400 && error.response.status < 500) {
                actions.setErrors({responseStatus: error.response.status, ...error.response.data});
            } else {
                actions.setErrors({responseStatus: error.response.status});
            }
        }
    }

    if (error) {
        return (
            <div className='alert alert-danger' role='alert'>
                {error}
            </div>
        );
    }

    if (!cashAccounts) {
        return <div>Loading...</div>;
    }

    const initialValues = {
        transaction_name: '',
        amount: '',
        txn_date: '',
        description: '',
        fund_account: ''
    };

    const changeTxnType = (evt, setFieldValue) => {
        const { value } = evt.target;
        setFieldValue('transaction_name', value);
        setFieldValue('amount', '');
        setFieldValue('description', '');
    };

    const changeFee = (evt, setFieldValue) => {
        const { value } = evt.target;
        const fee = deposit.fees.find(f => f.name === value);
        let amount = '';
        let description = '';
        if (fee) {
            amount = fee.amount;
            description = fee.name;
        }
        setFieldValue('fee', value);
        setFieldValue('amount', amount);
        setFieldValue('description', description);
    };

    return (
        <Modal open={true} setOpen={setModal} title='Process Transaction'>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
                {({ values, errors, isSubmitting, setFieldValue }) => (
                    <Form>
                        <NonFieldErrors errors={errors}>
                            <div className='create_modal_container'>
                                <div>
                                    <CustomSelect label='Transaction Name' name='transaction_name' onChange={(evt) => changeTxnType(evt, setFieldValue)} required>
                                        <option value=''>------</option>
                                        <option value='Deposit'>Deposit</option>
                                        <option value='Withdrawal'>Withdrawal</option>
                                        <option value='Manual Fees'>Fees</option>
                                        <option value='Manual Interest'>Interest</option>
                                    </CustomSelect>
                                    <CustomDatePicker
                                        label='Transaction Date'
                                        name='txn_date'
                                        setFieldValue={setFieldValue}
                                        required
                                    />
                                    {[TXN_NAMES.DEPOSIT, TXN_NAMES.WITHDRAWAL].includes(values.transaction_name) && (
                                        <CustomMultiSelect
                                            label='Fund Account'
                                            name='fund_account'
                                            isMulti={false}
                                            setFieldValue={setFieldValue}
                                            options={cashAccounts.filter(account => !account.suspended && account.currency_id == deposit.currency_id).map(account => (
                                                {label: `${account.label} - ${account.branch}`, value: account.value}
                                            ))}
                                            required
                                        />
                                    )}
                                    {values.transaction_name == 'Fees' && (
                                        <CustomSelect label='Select Fee' name='fee' onChange={(evt) => changeFee(evt, setFieldValue)} required>
                                            <option value=''>------</option>
                                            {deposit.fees.map((fee, idx) => (
                                                <option key={idx} value={fee.name}>{fee.name}</option>
                                            ))}
                                        </CustomSelect>
                                    )}
                                    <CustomInput label='Transaction Amount' name='amount' type='number' required/>
                                    <CustomTextField label='Description' name='description'/>
                                </div>
                                <ModalSubmit isSubmitting={isSubmitting} setOpen={setModal}/>
                            </div>
                        </NonFieldErrors>
                    </Form>
                )}
            </Formik>
        </Modal>
    )
}

export default Transact;