import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { removeEmptyValues } from '../../../utils/utils';
import { NonFieldErrors, CustomSelect, SubmitButton } from '../../../common';
import ClientFormFields from './ClientFormFields';
import { Form, Formik } from 'formik';

const EditLoanFoam = ({
  loan,
  loanProducts,
  lcontrols,
  customForms,
  clientControls,
  units,
  cashAccounts
}) => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(
    loanProducts.find(prod => prod.id == loan.loan_product_id)
  );

  const products = loanProducts.filter(
    prod => prod.client_type === loan.client_type && prod.is_active && prod.id !== product.id
  );

  if (products.length > 1) {
    products.sort((a, b) => a.loan_product_id.localeCompare(b.loan_product_id));
  }

  const interestRate = product.calculate_using_installment ? '' : loan.interest_rate;
  const productFormIds = product.custom_forms
    .filter(form => form.required_on === 'CREATION')
    .map(form => form.custom_field_set_id);
  const [formIds, setFormIds] = useState(productFormIds);

  const hideInterest = Boolean(product.default_interest_rate);
  const hideInstallments = Boolean(product.default_loan_duration);
  const hideFirstRepayment = Boolean(product.days_to_first_repayment);

  const initialValues = {
    loan_product_id: product.id,
    principal: loan.org_principal,
    interest_rate: hideInterest ? '' : interestRate,
    installment: '',
    application_date: loan.app_date,
    number_of_repayments: hideInstallments ? '' : loan.number_of_repayments,
    first_repayment_date: hideFirstRepayment ? '' : loan.first_payment_date,
    schedule_strategy: loan.schedule_strategy,
    reason_for_loan: loan.reason_for_borrowing,
    receipt_number: loan.receipt_number || '',
    fees: product.fees,
    files: [],
    client_id: loan.client_id || '',
    group_id: loan.group_id || '',
    unit_id: loan.unit_id || '',
    client: loan.client_id
      ? { value: loan.client_id, label: `${loan.client_fullname} - ${loan.client_branch}` }
      : '',
    group: loan.group_id
      ? { value: loan.group_id, label: `${loan.group_name} - ${loan.group_branch}` }
      : '',
    guarantor_id: loan.guarantor_id,
    guarantor: loan.guarantor_id
      ? { value: loan.guarantor_id, label: `${loan.guarantor_fullname}` }
      : '',
    group_guarantor_id: loan.group_guarantor_id,
    group_guarantor: loan.group_guarantor_id
      ? { value: loan.group_guarantor_id, label: `${loan.group_guarantor_name}` }
      : '',
  };

  loan.custom_data.forEach(form =>
    form.values.forEach(val => (initialValues[`custom_${val.id}`] = val.data || ''))
  );

  const onChange = (evt, setFieldValue) => {
    const { value } = evt.target;
    const product = products.find(prod => prod.id == value);
    setProduct(product);
    setFieldValue('fees', product.fees);
    setFieldValue('loan_product_id', value);
    const productFormIds = product.custom_forms
      .filter(form => form.required_on === 'CREATION')
      .map(form => form.custom_field_set_id);
    setFormIds(productFormIds);
  };

  const onSubmit = async (values, actions) => {
    try {
      const custom_data = processValues(values, customForms, formIds);
      const data = removeEmptyValues(values);

      if (data.fund_account) {
        data.fund_account_id = data.fund_account.value;
      }

      const CONFIG = {
        headers: {
          'X-CSRFToken': Cookies.get('csrftoken'),
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      };

      await axios.put(
        `/loansapi/update_loan_api/${loan.id}/`,
        { ...data, fees: values.fees, custom_data_list: custom_data },
        CONFIG
      );

      navigate({ pathname: `/loans/viewloans/loandetails/cli/${loan.id}` });
    } catch (error) {
      if (error.message === 'Network Error') {
        actions.setErrors({ responseStatus: 'Network Error' });
      } else if (error.response.status >= 400 && error.response.status < 500) {
        actions.setErrors({ responseStatus: error.response.status, ...error.response.data });
      } else {
        actions.setErrors({ responseStatus: error.response.status });
      }
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ isSubmitting, setFieldValue, errors, values }) => (
        <Form autoComplete="off" className="sf-form">
          <div className="sf-page">
            <div className="sf-shell">
              <div className="sf-shell-head">
                <div className="sf-shell-title">Edit Loan</div>
                <div className="sf-shell-subtitle">
                  Update the loan product and edit the loan details below.
                </div>
              </div>

              <div className="sf-shell-body">
                <section className="sf-section">
                  <div className="sf-section-head">
                    <div className="sf-section-title">Loan product</div>
                    <div className="sf-section-hint">
                      Select the active loan product for this loan.
                    </div>
                  </div>

                  <div className="sf-section-body sf-stack">
                    <CustomSelect
                      label="Loan Product"
                      name="loan_product_id"
                      value={product.id}
                      onChange={evt => onChange(evt, setFieldValue)}
                      required
                    >
                      {[product, ...products].map(product => (
                        <option key={product.id} value={product.id}>
                          ({product.currency})-{product.name} ({product.loan_product_id})-
                          {product.client_type}
                        </option>
                      ))}
                    </CustomSelect>
                  </div>
                </section>

                <section className="sf-section">
                  <div className="sf-section-head">
                    <div className="sf-section-title">Loan details</div>
                    <div className="sf-section-hint">
                      Update the fields below while keeping the existing loan structure intact.
                    </div>
                  </div>

                  <div className="sf-section-body">
                    <ClientFormFields
                      product={product}
                      lcontrols={lcontrols}
                      isSubmitting={isSubmitting}
                      setFieldValue={setFieldValue}
                      values={values}
                      edit={true}
                      customForms={customForms}
                      formIds={formIds}
                      units={units}
                      clientControls={clientControls}
                      cashAccounts={cashAccounts}
                    />
                  </div>
                </section>

                <NonFieldErrors errors={errors} />
              </div>

              <div className="sf-shell-footer">
                <SubmitButton isSubmitting={isSubmitting} />
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const processValues = (values, customForms, formIds) => {
  const applicableForms = customForms.filter(form => formIds.includes(form.id));
  const custom_data = applicableForms.map(form => {
    const fields = [];
    form.fields.forEach(field => {
      if (values[`custom_${field.id}`]) {
        fields.push({ field_id: field.id, [field.data_type]: values[`custom_${field.id}`] });
      }
    });
    return { field_set_id: form.id, fields: fields };
  });
  return custom_data;
};

export default EditLoanFoam;