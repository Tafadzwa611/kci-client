import React from 'react';
import {
  CustomMultiSelect,
  NonFieldErrors,
  SubmitButton,
  CustomInput,
  CustomTextField
} from '../../../common';
import axios from 'axios';
import { Form, Formik, useFormikContext } from "formik";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useCash } from '../../../contexts/CashContext';


function RecordCashCount() {
  const [denominations, setDenominations] = React.useState(null);
  const [total, setTotal] = React.useState(0);
  const [sysBalance, setSysBalance] = React.useState(0);

  const navigate = useNavigate();
  const { cash } = useCash();

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/acc-api/list_denomination/');
      setDenominations(response.data);
    }
    fetch();
  }, []);

  const FormObserver = () => {
    const { values } = useFormikContext();

    React.useEffect(() => {
      const total = values.note_counts.reduce((sum, item) => sum + (item.value * item.quantity), 0);
      setTotal(total);
    }, [values.note_counts]);

    React.useEffect(() => {
      const fetch = async () => {
        const response = await axios.get(`/acc-api/account_balance/${values.account_id}/`);
        setSysBalance(response.data.balance);
      }
      if (values.account_id) {
        fetch();
      }
    }, [values.account_id]);

    return null;
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      };
      await axios.post('/acc-api/record_cash_count/', values, CONFIG);
      navigate('/accounting/viewaccounting/balanced_cashbook');
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error") {
        actions.setErrors({ responseStatus: "Network Error" });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  }

  if (!denominations) {
    return <div>Loading...</div>
  }

  const initialValues = {
    account_id: '',
    variance_explanation: '',
    note_counts: []
  }

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, values, setFieldValue, errors }) => (
          <Form autoComplete="off" className="sf-form">
            <div className="sf-page">
              <div className="sf-shell">
                <div className="sf-shell-head">
                  <div className="sf-shell-title">Record Cash Count</div>
                  <div className="sf-shell-subtitle">
                    Balance your cash by denomination.
                  </div>
                </div>

                <div className="sf-shell-body">
                  <section className="sf-section">
                    <div className="sf-section-body" style={{ display: "grid", gap: 12 }}>
                      <CustomMultiSelect
                        label='Fund Account'
                        name='account'
                        isMulti={false}
                        setFieldValue={(fieldName, selectedOpts) => {
                          const account = cash.accounts.find(account => account.value == selectedOpts.value);
                          const noteCounts = (
                            denominations
                            .filter(item => item.currency.id == account.currency_id)
                            .map(denomination => ({
                              label: denomination.label,
                              value: denomination.value,
                              denomination_id: denomination.id,
                              quantity: 0
                            }))
                          );
                          setFieldValue('note_counts', noteCounts);
                          setFieldValue(fieldName, selectedOpts);
                          setFieldValue('account_id', selectedOpts.value);
                        }}
                        options={cash.accounts.map(account => (
                          {label: `${account.label} - ${account.branch}`, value: account.value}
                        ))}
                        required
                      />
                      {values.note_counts.map((item, index) => (
                        <div key={index}>
                          <CustomInput
                            label={`Number Of ${item.label} Notes/Coins`}
                            name={`note_counts.${index}.quantity`}
                            type='number'
                            step='1'
                            required
                          />
                        </div>
                      ))}
                      <CustomTextField label='Comment' name='variance_explanation' required />
                    </div>
                    <div className="sf-shell-subtitle">
                      <h2>
                        System Balance: {sysBalance}
                      </h2>
                      <h2>
                        Total Cash In Hand: {total}
                      </h2>
                    </div>
                  </section>
                </div>
                <div className="sf-shell-footer">
                  <SubmitButton isSubmitting={isSubmitting} />
                </div>
              </div>
            </div>
            <NonFieldErrors errors={errors}/>
            <FormObserver />
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default RecordCashCount;
