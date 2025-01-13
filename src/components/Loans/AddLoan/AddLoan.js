import React, { useEffect, useState } from 'react';
import SolidarityGroupForm from './SolidarityGroupForm';
import { NonFieldErrors, CustomSelect } from '../../../common';
import { Form, Formik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ClientFormFields from './ClientFormFields';
import { removeEmptyValues, isNumeric } from '../../../utils/utils';

function AddLoan({products, lcontrols, customForms, units, clientControls, cashAccounts}) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const application_id = searchParams.get('application_id');
  const loan_product_id = searchParams.get('loan_product_id') || '';
  const client_id = searchParams.get('client_id') || '';
  const client_name = searchParams.get('client_name') || '';
  let princ = searchParams.get('principal') || '';
  products = products.filter(prod => prod.is_active);
  const [product, setProduct] = useState(null);
  const [clientId, setClientId] = useState('');
  const [clientName, setClientName] = useState('');
  const [principal, setPrincipal] = useState('');
  const [formIds, setFormIds] = useState([]);

  useEffect(() => {
    const prod = products.find(prod => prod.id.toString() === loan_product_id) || null;
    setProduct(prod);
    setClientId(client_id);
    setClientName(client_name);
    if (isNumeric(princ)) {
      setPrincipal(princ);
    }else {
      setPrincipal('');
    }
  }, [princ, loan_product_id, client_id, client_name]);

  const initialValuesCustomForms = {};
  customForms.forEach(customForm => {
    customForm.fields.forEach(field => {
      initialValuesCustomForms[`custom_${field.id}`] = '';
    });
  });

  const initialValues = {
    ...initialValuesCustomForms,
    loan_product_id: loan_product_id,
    principal: principal,
    interest_rate: '',
    installment: '',
    application_date: '',
    number_of_repayments: '',
    first_repayment_date: '',
    schedule_strategy: '',
    reason_for_loan: '',
    fees: [],
    files: [],
    principal_distribution: [],
    client_id: clientId,
    client_name: clientName,
    group_id: '',
    unit_id: '',
    receipt_number: '',
    ...(application_id && {application_id}),
    ...(!lcontrols.auto_generate_loan_id && {loan_id: ''})
  };

  const onChange = (evt, setFieldValue, prevProductId) => {
    const {value} = evt.target;
    const product = products.find(prod => prod.id == value) || null;
    setProduct(product);
    setFieldValue('loan_product_id', value);
    if (product) {
      const productFormIds = product.custom_forms.filter(form => form.required_on === 'CREATION').map(form => form.custom_field_set_id);
      setFormIds(productFormIds);
      setFieldValue('schedule_strategy', product.schedule_strategy);
      setFieldValue('fees', product.fees);
    }
    const prevProduct = products.find(prod => prod.id == prevProductId);
    if (prevProduct) {
      if (!product || prevProduct.client_type !== product.client_type) {
        setFieldValue('client_id', '');
        setFieldValue('group_id', '');
      }
    }
  }

  const onSubmit = async (values, actions) => {
    const custom_data = processValues(values, customForms, formIds);
    try {
      const data = removeEmptyValues(values);
      if (data.fund_account) {
        data.fund_account_id = data.fund_account.value;
      }
      if (data.branch) {
        data.branch_id = data.branch.value;
      }
      const url = product.client_type === 'Groups (solidarity)' ? '/loansapi/add_soloan_api/' : '/loansapi/add_loan_api/';
      const CONFIG = {headers: {'X-CSRFToken': Cookies.get('csrftoken'), 'Accept': 'application/json', 'Content-Type': 'application/json'}};
      const response = await axios.post(url, {...data, fees: values.fees, custom_data_list: custom_data}, CONFIG);
      navigate({pathname: `/loans/viewloans/loandetails/cli/${response.data.loan_id}`});
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

  return (
    <Formik key={JSON.stringify(initialValues)} initialValues={initialValues} onSubmit={onSubmit}>
      {({isSubmitting, setFieldValue, errors, values}) => (
        <Form>
          <NonFieldErrors errors={errors}>
            <div className='divider divider-info'>
              <span>Loan Product</span>
            </div>
            <CustomSelect label='Loan Product' name='loan_product_id' value={product ? product.id : ''} onChange={(evt) => onChange(evt, setFieldValue, values.loan_product_id)} required>
              <option value=''>------</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  ({product.currency})-{product.name}-{product.client_type}
                </option>
              ))}
            </CustomSelect>
            {product ? {
              'Groups': <ClientFormFields
                product={product}
                lcontrols={lcontrols}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
                values={values}
                formIds={formIds}
                customForms={customForms}
                units={units}
                clientControls={clientControls}
                cashAccounts={cashAccounts}
              />,
              'Clients': <ClientFormFields
                product={product}
                lcontrols={lcontrols}
                clientName={clientName}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
                values={values}
                formIds={formIds}
                customForms={customForms}
                units={units}
                clientControls={clientControls}
                cashAccounts={cashAccounts}
              />,
              'Groups (solidarity)': <SolidarityGroupForm
                product={product}
                isSubmitting={isSubmitting}
                setFieldValue={setFieldValue}
                values={values}
                units={units}
                clientControls={clientControls}
              />
            }[product.client_type] : null}
          </NonFieldErrors>
        </Form>
      )}
    </Formik>
  )
}

const processValues = (values, customForms, formIds) => {
  const applicableForms = customForms.filter(form => formIds.includes(form.id));
  const custom_data = applicableForms.map(form => {
    const fields = [];
    form.fields.forEach(field => {
      if (values[`custom_${field.id}`]) {
        fields.push({'field_id': field.id, [field.data_type]: values[`custom_${field.id}`]});
      }
    });
    return {'field_set_id': form.id, 'fields': fields}
  });
  return custom_data
}

export default AddLoan;