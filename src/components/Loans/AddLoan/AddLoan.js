import React from 'react';
import SolidarityGroupForm from './SolidarityGroupForm';
import { CustomMultiSelect } from '../../../common';
import { Form, Formik } from 'formik';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import ClientFormFields from './ClientFormFields';
import { removeEmptyValues, isNumeric } from '../../../utils/utils';
import { useProducts } from '../../../contexts/ProductsContext';
import { useUnits } from '../../../contexts/UnitsContext';
import { useLoanControls } from '../../../contexts/LoanControlsContext';
import { useCash } from '../../../contexts/CashContext';
import { useClientControls } from '../../../contexts/ClientControlsContext';
import { useLoanForms } from '../../../contexts/LoanFormsContext';

function AddLoan() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const application_id = searchParams.get('application_id');
  const loan_product_id = searchParams.get('loan_product_id') || '';
  const client_id = searchParams.get('client_id') || '';
  const client_name = searchParams.get('client_name') || '';
  let princ = searchParams.get('principal') || '';

  let { products } = useProducts();
  const { units } = useUnits();
  const { clientControls } = useClientControls();
  const { loanForms } = useLoanForms();
  const customForms = loanForms;

  let { cash } = useCash();
  const cashAccounts = cash;

  const { loanControls } = useLoanControls();
  const lcontrols = loanControls;

  if (products.length > 1) {
    products.sort((a, b) => a.loan_product_id.localeCompare(b.loan_product_id));
  }
  products = products.filter(prod => prod.is_active);

  const [product, setProduct] = React.useState(null);
  const [clientId, setClientId] = React.useState('');
  const [clientName, setClientName] = React.useState('');
  const [principal, setPrincipal] = React.useState('');
  const [formIds, setFormIds] = React.useState([]);

  React.useEffect(() => {
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

  const onChange = (value, setFieldValue, prevProductId) => {
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
          <div className='divider divider-info'>
            <span>Loan Product</span>
          </div>
          <CustomMultiSelect
            label='Loan Product'
            name='product'
            isMulti={false}
            setFieldValue={(fieldName, selectedOpts) => {
              onChange(selectedOpts.value, setFieldValue, values.loan_product_id);
              setFieldValue(fieldName, selectedOpts);
            }}
            options={products.map(product => ({
              label: `${product.currency_shortname} - ${product.loan_product_id} ${product.name}`,
              value: product.id
            }))}
            required
          />
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
          {Object.keys(errors).length > 0 && (
            <div className='row custom-background' style={{marginTop: '15px'}}>
              <div className='col-9'>
                <div style={{fontSize: 12, color: 'red'}}>{JSON.stringify(errors)}</div>
              </div>
            </div>
          )}
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