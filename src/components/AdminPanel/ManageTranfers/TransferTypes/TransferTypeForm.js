// import React, { useEffect } from "react";
// import { Form, Formik } from "formik";
// import {
//   CustomMultiSelect,
//   CustomInput,
//   NonFieldErrors,
//   SubmitButton,
//   CustomSelect,
//   Fetcher,
// } from "../../../../common";
// import { useCurrencies } from "../../../../contexts/CurrenciesContext";

// function TransferTypeForm({ initialValues, onSubmit }) {
//   const { currencies } = useCurrencies();

//   useEffect(() => {
//     document.title = "Transfer Type Form";
//   }, []);

//   return (
//     <div className="sf-page">
//       <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
//         {({ values, isSubmitting, errors, setFieldValue }) => (
//           <Form autoComplete="off" className="sf-form">
//             <NonFieldErrors errors={errors}>
//               <div className="sf-shell">
//                 <div className="sf-shell-head">
//                   <div className="sf-shell-title">Transfer Type</div>
//                   <div className="sf-shell-subtitle">
//                     Create a transfer type and select allowed sending and receiving cash accounts by currency.
//                   </div>
//                 </div>

//                 <div className="sf-shell-body">
//                   <section className="sf-section">
//                     <div className="sf-section-head">
//                       <div className="sf-section-title">Transfer type information</div>
//                       <div className="sf-section-hint">
//                         Choose the currency first, then pick the receiving and sending accounts.
//                       </div>
//                     </div>

//                     <div className="sf-section-body sf-stack">
//                       <CustomInput
//                         label="Transfer Type Name"
//                         name="name"
//                         type="text"
//                         required
//                       />

//                       <CustomSelect label="Currency" name="currency_id" required>
//                         <option value="">------</option>
//                         {currencies.map((currency) => (
//                           <option key={currency.id} value={currency.id}>
//                             {currency.fullname}
//                           </option>
//                         ))}
//                       </CustomSelect>

//                       {values.currency_id && (
//                         <Fetcher
//                           urls={[
//                             `/acc-api/cash-accounts-by-currency-list/?currency_id=${values.currency_id}`,
//                           ]}
//                         >
//                           {({ data }) => (
//                             <>
//                               <CustomMultiSelect
//                                 label="Receiving Accounts"
//                                 initVals={[]}
//                                 options={data[0].accounts.map((account) => ({
//                                   label: `${account.general_ledger_name} - ${account.general_ledger_code} ${account.branch} `,
//                                   value: account.id,
//                                 }))}
//                                 setFieldValue={setFieldValue}
//                                 name="receiving_accounts_ids"
//                                 required
//                               />

//                               <CustomMultiSelect
//                                 label="Sending Accounts"
//                                 initVals={[]}
//                                 options={data[0].accounts.map((account) => ({
//                                   label: `${account.general_ledger_name} - ${account.general_ledger_code} ${account.branch} `,
//                                   value: account.id,
//                                 }))}
//                                 setFieldValue={setFieldValue}
//                                 name="sending_accounts_ids"
//                                 required
//                               />
//                             </>
//                           )}
//                         </Fetcher>
//                       )}
//                     </div>
//                   </section>
//                 </div>

//                 <div className="sf-shell-footer">
//                   <SubmitButton isSubmitting={isSubmitting} />
//                 </div>
//               </div>
//             </NonFieldErrors>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// }

// export default TransferTypeForm;

import React, { useEffect } from "react";
import { Form, Formik } from "formik";
import {
  CustomMultiSelect,
  CustomInput,
  NonFieldErrors,
  SubmitButton,
  CustomSelect,
  Fetcher,
  CustomCheckbox,
} from "../../../../common";
import { useCurrencies } from "../../../../contexts/CurrenciesContext";

function TransferTypeForm({ initialValues, onSubmit }) {
  const { currencies } = useCurrencies();

  useEffect(() => {
    document.title = "Transfer Type Form";
  }, []);

  return (
    <div className="sf-page">
      <Formik initialValues={initialValues} onSubmit={onSubmit} enableReinitialize>
        {({ values, isSubmitting, errors, setFieldValue }) => (
          <Form autoComplete="off" className="sf-form">
            <NonFieldErrors errors={errors}>
              <div className="sf-shell">
                <div className="sf-shell-head">
                  <div className="sf-shell-title">Transfer Type</div>
                  <div className="sf-shell-subtitle">
                    Create a transfer type and select allowed sending and receiving cash accounts by currency.
                  </div>
                </div>

                <div className="sf-shell-body">
                  <section className="sf-section">
                    <div className="sf-section-head">
                      <div className="sf-section-title">Transfer type information</div>
                      <div className="sf-section-hint">
                        Choose the currency first, then pick the receiving and sending accounts.
                      </div>
                    </div>

                    <div className="sf-section-body sf-stack">
                      <CustomInput
                        label="Transfer Type Name"
                        name="name"
                        type="text"
                        required
                      />

                      <CustomSelect label="Currency" name="currency_id" required>
                        <option value="">------</option>
                        {currencies.map((currency) => (
                          <option key={currency.id} value={currency.id}>
                            {currency.fullname}
                          </option>
                        ))}
                      </CustomSelect>

                      <CustomCheckbox
                        label="File Required"
                        name="is_file_required"
                      />

                      <CustomCheckbox
                        label="Approval Required"
                        name="is_approval_required"
                      />

                      {values.currency_id && (
                        <Fetcher
                          urls={[
                            `/acc-api/cash-accounts-by-currency-list/?currency_id=${values.currency_id}`,
                          ]}
                        >
                          {({ data }) => (
                            <>
                              <CustomMultiSelect
                                label="Receiving Accounts"
                                initVals={values.receiving_accounts_ids || []}
                                options={data[0].accounts.map((account) => ({
                                  label: `${account.general_ledger_name} - ${account.general_ledger_code} ${account.branch} `,
                                  value: account.id,
                                }))}
                                setFieldValue={setFieldValue}
                                name="receiving_accounts_ids"
                                required
                              />

                              <CustomMultiSelect
                                label="Sending Accounts"
                                initVals={values.sending_accounts_ids || []}
                                options={data[0].accounts.map((account) => ({
                                  label: `${account.general_ledger_name} - ${account.general_ledger_code} ${account.branch} `,
                                  value: account.id,
                                }))}
                                setFieldValue={setFieldValue}
                                name="sending_accounts_ids"
                                required
                              />
                            </>
                          )}
                        </Fetcher>
                      )}
                    </div>
                  </section>
                </div>

                <div className="sf-shell-footer">
                  <SubmitButton isSubmitting={isSubmitting} />
                </div>
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default TransferTypeForm;