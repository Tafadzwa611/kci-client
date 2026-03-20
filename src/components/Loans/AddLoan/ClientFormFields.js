import React from 'react';
import {
  CustomSelect,
  CustomInput,
  CustomDatePicker,
  CustomSelectRemote,
  CustomMultiSelect,
} from '../../../common';
import { scheduleStrategies } from './data';
import Fee from './Fee';
import { useBranches } from '../../../contexts/BranchesContext';
import CustomForm from './CustomForm';
import { useReceiptBooks } from '../../../contexts/ReceiptBooksContext';

function ClientFormFields({
  product,
  lcontrols,
  isSubmitting,
  setFieldValue,
  clientName,
  values,
  edit,
  customForms,
  formIds,
  units,
  clientControls,
  cashAccounts
}) {
  const [selectedRb, setSelectedRb] = React.useState({});
  const { branches } = useBranches();
  const { receiptBooks } = useReceiptBooks();
  const receiptBooksObj = Object.fromEntries(receiptBooks.map(rb => [rb.id, rb]));

  const hideInterest = Boolean(product.default_interest_rate);
  const hideInstallments = Boolean(product.default_loan_duration);
  const hideFirstRepayment = Boolean(product.days_to_first_repayment);
  const hideUnit = units.length === 0;
  const hideFees = values.fees.length === 0;

  return (
    <>
      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-title">Loan details</div>
          <div className="sf-section-hint">Core loan setup and validation limits.</div>
        </div>

        <div className="sf-section-body sf-stack">
          {clientName ? (
            <div className="sf-static-field">
              <div className="sf-static-label">
                Client <span className="sf-required">*</span>
              </div>
              <div className="sf-static-value">{clientName}</div>
            </div>
          ) : (
            <ClientSelect values={values} product={product} setFieldValue={setFieldValue} />
          )}

          {!lcontrols.auto_generate_loan_id && (
            <CustomInput
              label='Loan ID'
              name='loan_id'
              type='text'
              required
            />
          )}

          <div className="sf-field-block">
            <CustomInput
              label='Principal'
              name='principal'
              type='number'
              min={product.minimum_principal_amount}
              max={product.maximum_principal_amount}
              step={product.number_of_decimal_places}
              required
            />
            <div className="sf-help">
              <em>
                Minimum = {product.minimum_principal_amount} Maximum = {product.maximum_principal_amount}
              </em>
            </div>
          </div>

          {product.calculate_using_installment ? (
            <CustomInput
              label='Installment Amount'
              name='installment'
              type='number'
              step={product.number_of_decimal_places}
              required
            />
          ) : (
            <>
              {!hideInterest && (
                <div className="sf-field-block">
                  <CustomInput
                    label='Interest Rate'
                    name='interest_rate'
                    type='number'
                    min={product.minimum_interest_rate}
                    max={product.maximum_interest_rate}
                    step={product.number_of_decimal_places}
                    required
                  />
                  <div className="sf-help">
                    <em>
                      Minimum = {product.minimum_interest_rate} Maximum = {product.maximum_interest_rate}
                    </em>
                  </div>
                </div>
              )}
            </>
          )}

          <CustomDatePicker
            label='Application Date'
            name='application_date'
            setFieldValue={setFieldValue}
            required
          />

          {!hideInstallments && (
            <div className="sf-field-block">
              <CustomInput
                label='Number of Repayments'
                name='number_of_repayments'
                type='number'
                min={product.minimum_loan_duration}
                max={product.maximum_loan_duration}
                required
              />
              <div className="sf-help">
                <em>
                  Minimum = {product.minimum_loan_duration} Maximum = {product.maximum_loan_duration}
                </em>
              </div>
            </div>
          )}

          {!hideFirstRepayment && (
            <CustomDatePicker
              label='First Repayment Date'
              name='first_repayment_date'
              setFieldValue={setFieldValue}
              required
            />
          )}

          {product.allow_editing_schedule_strategy_on_loan_creation && (
            <CustomSelect label='Loan Schedule Strategy' name='schedule_strategy' required>
              <option value=''>------</option>
              {scheduleStrategies[product.loan_duration_time_unit].map(strategy => (
                <option key={strategy} value={strategy}>
                  {strategy}
                </option>
              ))}
            </CustomSelect>
          )}

          {clientControls.use_client_units ? (
            <CustomSelect label='Unit' name='unit_id' required>
              <option value=''>------</option>
              {units.map(ut => (
                <option key={ut.id} value={ut.id}>
                  {ut.name}
                </option>
              ))}
            </CustomSelect>
          ) : (
            <>
              {!hideUnit && (
                <CustomSelect label='Unit' name='unit_id'>
                  <option value=''>------</option>
                  {units.map(ut => (
                    <option key={ut.id} value={ut.id}>
                      {ut.name}
                    </option>
                  ))}
                </CustomSelect>
              )}
            </>
          )}

          <CustomSelect label='Reason For Loan' name='reason_for_loan' required>
            <option value=''>------</option>
            <option value='CONSUMER'>CONSUMER</option>
            <option value='COMMERCIAL - Agriculture'>COMMERCIAL - Agriculture</option>
            <option value='COMMERCIAL - Manufacturing'>COMMERCIAL - Manufacturing</option>
            <option value='COMMERCIAL - Mining'>COMMERCIAL - Mining</option>
            <option value='COMMERCIAL - Housing'>COMMERCIAL - Housing</option>
            <option value='COMMERCIAL - Distribution & Services'>COMMERCIAL - Distribution & Services</option>
            <option value='COMMERCIAL - Retail'>COMMERCIAL - Retail</option>
            <option value='COMMERCIAL - Transport'>COMMERCIAL - Transport</option>
            <option value='COMMERCIAL - Health'>COMMERCIAL - Health</option>
            <option value='COMMERCIAL - Education'>COMMERCIAL - Education</option>
            <option value='COMMERCIAL - Cross Border Traders'>COMMERCIAL - Cross Border Traders</option>
            <option value='COMMERCIAL - Construction'>COMMERCIAL - Construction</option>
            <option value='COMMERCIAL - Vendors'>COMMERCIAL - Vendors</option>
            <option value='OTHER'>OTHER</option>
          </CustomSelect>

          {(lcontrols.select_branch_on_loan_creation && !edit) && (
            <CustomMultiSelect
              label='Branch'
              name='branch'
              isMulti={false}
              setFieldValue={setFieldValue}
              options={branches.map(branch => ({ label: branch.name, value: branch.id }))}
              required
            />
          )}

          {lcontrols.disburse_loan_on_capture && (
            <CustomMultiSelect
              label='Fund Account'
              name='fund_account'
              isMulti={false}
              setFieldValue={setFieldValue}
              options={cashAccounts.accounts
                .filter(account => !account.suspended)
                .map(account => ({
                  label: `${account.label} - ${account.branch}`,
                  value: account.value
                }))}
              required
            />
          )}
        </div>
      </section>

      {lcontrols.request_receipt_number && lcontrols.disburse_loan_on_capture && (
        <section className="sf-section">
          <div className="sf-section-head">
            <div className="sf-section-title">Receipt</div>
            <div className="sf-section-hint">
              Receipt details are required when disbursing on capture.
            </div>
          </div>

          <div className="sf-section-body sf-stack">
            {lcontrols.use_receipt_book ? (
              <>
                <CustomMultiSelect
                  label='Receipt Book'
                  name='receipt_book'
                  isMulti={false}
                  setFieldValue={(fieldName, selectedOpts) => {
                    setFieldValue(fieldName, selectedOpts);
                    const selectedRb = receiptBooksObj[selectedOpts.value];
                    setSelectedRb(selectedRb);
                    if (selectedRb.mode == 1) {
                      setFieldValue('receipt_number', '');
                    }
                  }}
                  options={receiptBooks
                    .filter(rb => rb.is_active && rb.currency.id == product.currency_id)
                    .map(rb => ({
                      label: `${rb.name} - ${rb.branch.name} - ${rb.branch.name}`,
                      value: rb.id
                    }))}
                  required
                />

                {selectedRb.mode === 2 && (
                  <CustomInput
                    label='Receipt Number'
                    name='receipt_number'
                    type='text'
                    required
                  />
                )}
              </>
            ) : (
              <CustomInput
                label='Receipt Number'
                name='receipt_number'
                type='text'
                required
              />
            )}
          </div>
        </section>
      )}

      {customForms.filter(form => formIds.includes(form.id)).length > 0 && (
        <section className="sf-section">
          <div className="sf-section-head">
            <div className="sf-section-title">Additional fields</div>
            <div className="sf-section-hint">Custom fields required by the selected product.</div>
          </div>

          <div className="sf-section-body sf-stack">
            {customForms
              .filter(form => formIds.includes(form.id))
              .map(form => (
                <div key={form.id} className="sf-subsection">
                  <div className="sf-subsection-title">{form.name}</div>
                  <CustomForm form={form} setFieldValue={setFieldValue} />
                </div>
              ))}
          </div>
        </section>
      )}

      {!hideFees && product.allow_editing_fees_on_loan_creation && (
        <section className="sf-section">
          <div className="sf-section-head">
            <div className="sf-section-title">Loan fees</div>
            <div className="sf-section-hint">Review the fees for this loan.</div>
          </div>

          <div className="sf-section-body sf-stack">
            {values.fees.map((fee, index) => (
              <Fee
                key={index}
                index={index}
                setFieldValue={setFieldValue}
                fee={fee}
                values={values}
              />
            ))}
          </div>
        </section>
      )}

      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-title">Guarantors</div>
          <div className="sf-section-hint">Optional guarantors for this loan.</div>
        </div>

        <div className="sf-section-body sf-stack">
          <CustomSelectRemote
            selected={values.guarantor || ''}
            label='Client Guarantor (Optional)'
            url='/clientsapi/search_client/'
            setFieldValue={(fieldName, selected) => {
              setFieldValue('guarantor', selected);
              setFieldValue(fieldName, selected.value);
            }}
            queryParamName='query'
            params={[{ key: 'guarantors_only', value: 1 }, { key: 'all_branches', value: 1 }]}
            placeholder='Search Client Guarantor'
            name='guarantor_id'
          />

          <CustomSelectRemote
            selected={values.group_guarantor || ''}
            label='Group Guarantor (Optional)'
            url='/clientsapi/search_group/'
            setFieldValue={(fieldName, selected) => {
              setFieldValue('group_guarantor', selected);
              setFieldValue(fieldName, selected.value);
            }}
            queryParamName='query'
            params={[{ key: 'guarantors_only', value: 1 }, { key: 'all_branches', value: 1 }]}
            placeholder='Search Group Guarantor'
            name='group_guarantor_id'
          />
        </div>
      </section>
    </>
  );
}

const ClientSelect = ({ values, product, setFieldValue }) => {
  if (product.client_type === 'Clients') {
    return (
      <CustomSelectRemote
        key={product.client_type}
        selected={values.client || ''}
        label='Client'
        url='/clientsapi/search_client/'
        setFieldValue={(fieldName, selected) => {
          setFieldValue('client', selected);
          setFieldValue(fieldName, selected.value);
        }}
        params={[
          { key: 'all_branches', value: 1 },
          { key: 'exclude_blacklisted', value: 1 },
          { key: 'exclude_rejected', value: 1 }
        ]}
        queryParamName='query'
        placeholder='Search Client'
        name='client_id'
        required
      />
    );
  }

  return (
    <CustomSelectRemote
      key={product.client_type}
      selected={values.group || ''}
      label='Group'
      url='/clientsapi/search_group/'
      setFieldValue={(fieldName, selected) => {
        setFieldValue('group', selected);
        setFieldValue(fieldName, selected.value);
      }}
      queryParamName='query'
      placeholder='Search Group'
      name='group_id'
      required
    />
  );
};

export default ClientFormFields;