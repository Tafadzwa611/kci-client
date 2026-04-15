import React from 'react';
import { Form, Formik } from 'formik';
import {
  NonFieldErrors,
  CustomDatePickerFilter,
  CustomSelectFilter,
  SubmitButtonFilter,
} from '../../../common';
import axios from 'axios';
import { getParams } from '../../../utils/utils';

const DateRange = ({ setStatement, accounts }) => {
  const onSubmit = async (values, actions) => {
    try {
      const { account_id, min_report_date, max_report_date } = values;
      const params = getParams({ min_report_date, max_report_date });
      const response = await axios.get(`/acc-api/cash_book/${account_id}/`, { params });
      setStatement(response.data);
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response?.status || 'Server Error' });
      }
    }
  };

  return (
    <Formik
      initialValues={{ account_id: '', min_report_date: '', max_report_date: '' }}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, setFieldValue, errors }) => (
        <div className="search_background">
          <div className="row-containers sf-shellwrap">
            <Form>
              <NonFieldErrors errors={errors}>
                <div className="row row-payments row-loans sf-card">
                  <div className="sf-row sf-row-3">
                    <div className="row-payments-container sf-w-32">
                      <CustomDatePickerFilter
                        label="Min Report Date"
                        name="min_report_date"
                        setFieldValue={setFieldValue}
                        required
                      />
                    </div>

                    <div className="row-payments-container sf-w-32">
                      <CustomDatePickerFilter
                        label="Max Report Date"
                        name="max_report_date"
                        setFieldValue={setFieldValue}
                        required
                      />
                    </div>

                    <div className="row-payments-container sf-w-32">
                      <CustomSelectFilter label="Cash Account" name="account_id" required>
                        <option value="">------</option>
                        {accounts.map((account) => (
                          <option key={account.id} value={account.id}>
                            {account.currency} {account.label} {account.branch}
                          </option>
                        ))}
                      </CustomSelectFilter>
                    </div>
                  </div>
                </div>

                <div className="sf-submit">
                  <SubmitButtonFilter isSubmitting={isSubmitting} />
                </div>
              </NonFieldErrors>
            </Form>
          </div>
        </div>
      )}
    </Formik>
  );
};

export default DateRange;
