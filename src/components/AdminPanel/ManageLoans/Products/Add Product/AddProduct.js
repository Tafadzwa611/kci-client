import React from 'react';
import { Form, Formik } from 'formik';
import {
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  Button,
  CustomTextField,
  CustomSelect,
  CustomCheckbox,
  CustomMultiSelect,
  CustomSortableSelect
} from '../../../../../common';
import {createLoanProductSchema} from './schema';
import { useCurrencies } from '../../../../../contexts/CurrenciesContext';
import { scheduleStrategies } from './data';
import { useBranches } from '../../../../../contexts/BranchesContext';
import {Fee, AddFee} from './Fees';
import { post } from './post';

function AddProduct({productGrps, setView}) {
  const {currencies} = useCurrencies();
  const {branches} = useBranches();

  const initialValues = {
    name: '',
    description: '',
    product_category_id: '',
    product_type: '',
    loan_product_id: '',
    minimum_principal_amount: '',
    default_principal_amount: '',
    maximum_principal_amount: '',
    currency_id: '',
    minimum_interest_rate: '',
    default_interest_rate: '',
    maximum_interest_rate: '',
    interest_method: '',
    interest_interval: '',
    loan_duration_time_unit: '',
    schedule_strategy: '',
    action_on_holiday: '',
    minimum_loan_duration: '',
    default_loan_duration: '',
    maximum_loan_duration: '',
    number_of_decimal_places: '',
    rounding_scheme: '',
    allow_early_settlement_on_penalties: false,
    client_type: '',
    allowed_branches: [],
    repayment_order: {first: 'penalty', second: 'fees', third: 'interest', fourth: 'principal'},
    fees: [],
    action_on_loan_default: 'Do Nothing',
    apply_late_repayment_penalty_on: '',
    penalty_charged_per: '',
    late_repayment_penalty_percentage: '',
    grace_period: '',
  };

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    post(values, actions.setErrors);
  }

  return (
    <>
      <Button value={'Back'} handler={() => setView('list')} />
      <Formik initialValues={initialValues} validationSchema={createLoanProductSchema} onSubmit={onSubmit}>
        {({ isSubmitting, errors, setFieldValue, values }) => (
          <Form>
            <NonFieldErrors errors={errors}>
              <CustomInput label='Name' name='name' type='text'/>
              <CustomInput label='Product ID' name='loan_product_id' type='text'/>
              <CustomTextField label='Description' name='description'/>
              <CustomSelect label='Product Category' name='product_category_id'>
                <option value=''>------</option>
                {productGrps.map(grp => <option key={grp.id} value={grp.id}>{grp.name}</option>)}
              </CustomSelect>
              <CustomSelect label='Product Type' name='product_type'>
                <option value=''>------</option>
                <option value='Fixed Term Loan'>Fixed Term Loan</option>
                <option value='Interest-Free Loan'>Interest-Free Loan</option>
              </CustomSelect>
              <CustomSelect label='Currency' name='currency_id'>
                <option value=''>------</option>
                {currencies.map(currency => <option key={currency.id} value={currency.id}>{currency.fullname}</option>)}
              </CustomSelect>
              <CustomInput label='Minimum Principal Amount' name='minimum_principal_amount' type='number'/>
              <CustomInput label='Default Principal Amount' name='default_principal_amount' type='number'/>
              <CustomInput label='Maximum Principal Amount' name='maximum_principal_amount' type='number'/>
              <CustomSelect label='Interest Method' name='interest_method'>
                <option value=''>------</option>
                <option value='Flat Rate'>Flat Rate</option>
                <option value='Reducing Balance - Equal Installments'>Reducing Balance - Equal Installments</option>
                <option value='Reducing Balance - Equal Principal'>Reducing Balance - Equal Principal</option>
              </CustomSelect>
              <CustomSelect label='Interest Interval' name='interest_interval'>
                <option value=''>------</option>
                <option value='/Day'>Per Day</option>
                <option value='/Week'>Per Week</option>
                <option value='/Month'>Per Month</option>
                <option value='/Year'>Per Year</option>
              </CustomSelect>
              <CustomInput label='Minimum Loan Interest' name='minimum_interest_rate' type='number'/>
              <CustomInput label='Default Loan Interest' name='default_interest_rate' type='number'/>
              <CustomInput label='Maximum Loan Interest' name='maximum_interest_rate' type='number'/>
              <CustomSelect label='Repayment Cycle' name='loan_duration_time_unit'>
                <option value=''>------</option>
                <option value='Days'>Daily</option>
                <option value='Weeks'>Weekly</option>
                <option value='2 Weeks'>Biweekly</option>
                <option value='Months'>Monthly</option>
                <option value='2 Months'>Bimonthly</option>
                <option value='3 Months'>Quarterly</option>
                <option value='4 Months'>Every 4 Months</option>
                <option value='6 Months'>Semi-annually</option>
                <option value='Years'>Annually</option>
              </CustomSelect>
              <CustomSelect label='Default Loan Schedule Strategy' name='schedule_strategy'>
                <option value=''>------</option>
                {scheduleStrategies.map(strategy => <option key={strategy} value={strategy}>{strategy}</option>)}
              </CustomSelect>
              <CustomSelect label='Non Working Days Rescheduling' name='action_on_holiday'>
                <option value=''>------</option>
                <option value='NXT'>Move ahead to next working day</option>
                <option value='PREV'>Move backwards to previous working day</option>
                <option value='EXT'>Extend Schedule</option>
              </CustomSelect>
              <CustomInput label='Minimum Number of Repayments' name='minimum_loan_duration' type='number'/>
              <CustomInput label='Default Number of Repayments' name='default_loan_duration' type='number'/>
              <CustomInput label='Maximum Number of Repayments' name='maximum_loan_duration' type='number'/>
              <CustomSelect label='Decimal Places' name='number_of_decimal_places'>
                <option value=''>------</option>
                <option value='0.01'>Round Off to Two Decimal Places</option>
                <option value='0.1'>Round Off to One Decimal Place</option>
                <option value='1'>Round Off to Integer</option>
              </CustomSelect>
              <CustomSelect label='Rounding Scheme' name='rounding_scheme'>
                <option value=''>------</option>
                <option value='ROUND_HALF_UP'>Round Half Up</option>
                <option value='ROUND_UP'>Round Up</option>
                <option value='ROUND_DOWN'>Round Down</option>
              </CustomSelect>
              <CustomCheckbox label='Allow Early Settlement On Loans With Unpaid Penalties' name='allow_early_settlement_on_penalties'/>
              <CustomSelect label='Client Type' name='client_type'>
                <option value=''>------</option>
                <option value='Clients'>Clients</option>
                <option value='Groups'>Groups</option>
                <option value='Groups (solidarity)'>Groups (solidarity)</option>
              </CustomSelect>
              <CustomMultiSelect label='Branches' options={branches.map(br => ({label: br.name, value:br.id}))} setFieldValue={setFieldValue} name='allowed_branches'/>
              <CustomSortableSelect label='Repayment Order' setFieldValue={setFieldValue} name='repayment_order' options={['Penalty', 'Fees', 'Interest', 'Principal']}/>
              {values.fees.map((fee, index) => {
                return(
                  <React.Fragment key={fee.id}>
                    <Fee id={fee.id} index={index} fees={values.fees} setFieldValue={setFieldValue} />
                  </React.Fragment>
                )
              })}
              <AddFee fees={values.fees} setFieldValue={setFieldValue} />
              <CustomSelect label='Action On Default' name='action_on_loan_default'>
                <option value='Do Nothing'>Do Nothing</option>
                <option value='Add Penalty'>Add Penalty</option>
              </CustomSelect>
              {values.action_on_loan_default === 'Add Penalty' &&
                <>
                  <CustomSelect label='Apply Penalty On' name='apply_late_repayment_penalty_on'>
                    <option value=''>------</option>
                    <option value='Principal'>Principal</option>
                    <option value='Principal + Interest'>Principal + Interest</option>
                  </CustomSelect>
                  <CustomSelect label='Penalty Rate Interval' name='penalty_charged_per'>
                    <option value=''>------</option>
                    <option value='/Day'>Per Day</option>
                    <option value='/Week'>Per Week</option>
                    <option value='/Month'>Per Month</option>
                    <option value='/Year'>Per Year</option>
                  </CustomSelect>
                  <CustomInput label='Penalty Rate' name='late_repayment_penalty_percentage' type='number'/>
                  <CustomInput label='Penalty Tolerance Period In Days' name='grace_period' type='number'/>
                </>
              }
              <SubmitButton isSubmitting={isSubmitting}/>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default AddProduct;