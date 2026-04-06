import React from 'react';
import {
  useNavigate,
  useParams,
  useSearchParams
} from 'react-router-dom';
import axios from 'axios';
import { Form, Formik, useFormikContext } from 'formik';
import Cookies from 'js-cookie';
import {
  NonFieldErrors,
  SubmitButton,
  CustomInput,
  CustomTextField
} from '../../../common';
import { useCash } from '../../../contexts/CashContext';


function EditCashCount() {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [denominations, setDenominations] = React.useState(null);
  const [total, setTotal] = React.useState(0);
  const [sysBalance, setSysBalance] = React.useState(0);
  const [report, setReport] = React.useState(null);

  const { cash } = useCash();

  React.useEffect(() => {
    const fetch = async () => {
      const response = await axios.get('/acc-api/list_denomination/');
      setDenominations(response.data);
    }
    fetch();
  }, []);

  React.useEffect(() => {
    const fetch = async () => {
      const reportId = searchParams.get('reportId');
      const response = await axios.get(`/acc-api/cash_count_report/?type=Total&report_id=${reportId}`);
      setReport(response.data[0]);
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
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  }

  if (!denominations || !report) {
    return <div>Loading...</div>
  }

  const accountId = params.accountId;
  const date = searchParams.get('date');
  const explanation = searchParams.get('explanation');

  const account = cash.accounts.find(account => account.value == accountId);

  const oldLabelQuantities = report.note_counts.reduce((acc, item) => {
    acc[item.label] = item.quantity;
    return acc;
  }, {});

  const noteCounts = (
    denominations
    .filter(item => item.currency.id == account.currency_id)
    .map(denomination => ({
      label: denomination.label,
      value: denomination.value,
      denomination_id: denomination.id,
      quantity: oldLabelQuantities[denomination.label] || 0
    }))
  );

  const initialValues = {
    count_date: date,
    account_id: accountId,
    variance_explanation: explanation,
    note_counts: noteCounts
  };

  return (
    <div>
      <Formik initialValues={initialValues} onSubmit={onSubmit}>
        {({ isSubmitting, values, errors }) => (
          <Form autoComplete='off' className='sf-form'>
            <div className='sf-page'>
              <div className='sf-shell'>
                <div className='sf-shell-head'>
                  <div className='sf-shell-title'>Record Cash Count</div>
                  <div className='sf-shell-subtitle'>
                    Balance your cash by denomination.
                  </div>
                </div>

                <div className='sf-shell-body'>
                  <section className='sf-section'>
                    <div className='sf-section-body' style={{ display: 'grid', gap: 12 }}>
                      <div className='sf-shell-subtitle' style={{fontWeight:'bold', fontSize:'0.8125rem'}}>
                        <p>
                          Fund Account: { account.label } as at { date }
                        </p>
                      </div>
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
                    <div className='sf-shell-subtitle' style={{fontWeight:'bold', fontSize:'0.8125rem'}}>
                      <p>
                        System Balance: {sysBalance}
                      </p>
                      <p>
                        Total Cash In Hand: {total}
                      </p>
                    </div>
                  </section>
                </div>
                <div className='sf-shell-footer'>
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

export default EditCashCount;
