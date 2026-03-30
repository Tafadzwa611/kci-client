import React from 'react';
import {
  NonFieldErrors,
  SubmitButton,
  CustomInput,
  CustomTextField
} from '../../../common';
import axios from 'axios';
import { Form, Formik, useFormikContext } from "formik";
import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";


function RecordCashCount() {
  const [denominations, setDenominations] = React.useState(null);
  const [total, setTotal] = React.useState(0);
  const [sysBalance, setSysBalance] = React.useState(0);
  const params = useParams();
  const accountId = params.accountId;
  const date = params.date;
  const currencyId = params.currencyId;

  const navigate = useNavigate();

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/acc-api/list_denomination/');
      setDenominations(response.data);
    }
    fetch();
  }, []);

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(`/acc-api/account_balance/${accountId}/`);
      setSysBalance(response.data.balance);
    }
    fetch();
  }, []);

  const FormObserver = () => {
    const { values } = useFormikContext();

    React.useEffect(() => {
      const total = values.note_counts.reduce((sum, item) => sum + (item.value * item.quantity), 0);
      setTotal(total);
    }, [values.note_counts]);

    return null;
  };

  const onSubmit = async (values, actions) => {
    try {
      const CONFIG = {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const data = {
        account_id: accountId,
        count_date: date,
        variance_explanation: values.variance_explanation,
        note_counts: values.note_counts,
      };
      await axios.post("/acc-api/record_cash_count/", data, CONFIG);
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

  console.log(currencyId);

  const noteCounts = (
    denominations
    .filter(item => item.currency.id == currencyId)
    .map(denomination => ({
      label: denomination.label,
      value: denomination.value,
      denomination_id: denomination.id,
      quantity: 0
    }))
  );

  console.log(denominations);
  console.log(noteCounts);

  const initialValues = {
    variance_explanation: '',
    note_counts: noteCounts
  }

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, values, errors }) => (
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
                      {/* <CustomMultiSelect
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
                      /> */}
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
