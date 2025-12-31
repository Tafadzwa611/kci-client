import React from 'react';
import { Formik, Form, FieldArray, getIn } from 'formik';
import { useCurrencies } from '../../../contexts/CurrenciesContext';
import { useBranches } from '../../../contexts/BranchesContext';
import {
  CustomMultiSelect,
  CustomSelect,
  CustomDatePicker,
  CustomTextField,
  ButtonSuccess,
  ButtonDefault
} from '../../../common';
import CustomInputBatch from './CustomInputBatch';
import CustomSelectRemoteJournalBatch from './CustomSelectRemoteJournalBatch';

const initialValues = {
  journals: [
    {
      currency_id: '',
      txn_date: '',
      narrative: '',
      entries: [emptyEntry()]
    }
  ]
};

function toNumber(v) {
  const n = typeof v === "number" ? v : parseFloat(String(v ?? "").trim());
  return Number.isFinite(n) ? n : 0;
}

function sumAmounts(lines = []) {
  return lines.reduce((acc, line) => acc + toNumber(line?.amount), 0);
}

function getEntryTotals(entry) {
  const debitTotal = sumAmounts(entry?.accounts_debited);
  const creditTotal = sumAmounts(entry?.account_credited);
  return { debitTotal, creditTotal };
}

function isBalanced(entry, epsilon = 0.00001) {
  const { debitTotal, creditTotal } = getEntryTotals(entry);
  return Math.abs(debitTotal - creditTotal) <= epsilon;
}

function emptyLine() {
  return {key: '', value: '', amount: ''};
}

function emptyEntry() {
  return {
    accounts_debited: [emptyLine()],
    account_credited: [emptyLine()]
  };
}

function LineFields({
  label,
  branchFieldPath,
  accountFieldPath,
  amountFieldPath,
  selectedBranch,
  selectedAccount,
  setFieldValue,
  currencyId,
  onRemove,
  disableRemove
}) {
  const { branches } = useBranches();
  const branchId = selectedBranch?.value ?? "";
  const params = [
    { key: "currency_id", value: currencyId },
    { key: "branch_ids", value: branchId }
  ];

  const hasBranch = Boolean(branchId);

  return (
    <div>
      <CustomMultiSelect
        label="Select Branch"
        name={branchFieldPath}
        isMulti={false}
        setFieldValue={setFieldValue}
        options={branches.map(branch => ({label: branch.name, value: branch.id}))}
        required
      />

      <div style={{marginTop: '8px'}}>
        {hasBranch && (
          <CustomSelectRemoteJournalBatch
            label={`${label} Account`}
            url='/acc-api/search_account/'
            selected={selectedAccount}
            params={params}
            setFieldValue={setFieldValue}
            queryParamName='query'
            placeholder='Search Account'
            name={accountFieldPath}
            required
          />
        )}
      </div>

      <div style={{marginTop: '8px'}}>
        {hasBranch && (
          <CustomInputBatch
            label={`${label} Amount`}
            name={amountFieldPath}
            type='number'
            step='0.00001'
            required
          />
        )}
      </div>

      {!disableRemove && (
        <ButtonDefault
          value={`Remove ${label}`}
          handler={onRemove}
        />
      )}
    </div>
  );
}

function DebitLines({ entry, entryPath, journal, setFieldValue, values }) {
  const debitCount = entry.accounts_debited.length;
  const creditCount = entry.account_credited.length;
  const canAddDebitLine = creditCount <= 1;

  return (
    <FieldArray name={`${entryPath}.accounts_debited`}>
      {(debitsHelpers) => (
        <div
          style={{
            border: "3px solid #ccc",
            padding: "12px",
            marginBottom: "12px"
          }}
        >
          <strong>Debit Lines</strong><br/>

          {entry.accounts_debited.map((_, dIdx) => {
            const base = `${entryPath}.accounts_debited.${dIdx}`;
            const accountFieldPath = `${base}.account`;
            const amountFieldPath = `${base}.amount`;
            const branchFieldPath = `${base}.branch`;
            const selectedAccount = getIn(values, accountFieldPath);
            const selectedBranch = getIn(values, branchFieldPath);

            return (
              <div
                key={dIdx}
                style={{
                  border: "3px solid #ccc",
                  padding: "12px",
                  marginBottom: "12px"
                }}
              >
                <strong>Debit Line {dIdx+1}</strong>
                <LineFields
                  label="Debit Line"
                  branchFieldPath={branchFieldPath}
                  accountFieldPath={accountFieldPath}
                  amountFieldPath={amountFieldPath}
                  selectedBranch={selectedBranch}
                  selectedAccount={selectedAccount}
                  setFieldValue={setFieldValue}
                  currencyId={journal.currency_id}
                  onRemove={() => debitsHelpers.remove(dIdx)}
                  disableRemove={debitCount <= 1}
                />
              </div>
            );
          })}

          {canAddDebitLine ? (
              <ButtonSuccess
                value='+ Add debit line'
                handler={() => debitsHelpers.push(emptyLine())}
              />
            ) : (
            <div>
              Rule: If you have more than 1 debit line, you can only have 1 credit line.
            </div>
          )}
        </div>
      )}
    </FieldArray>
  );
}

function CreditLines({ entry, entryPath, journal, setFieldValue, values }) {
  const debitCount = entry.accounts_debited.length;
  const creditCount = entry.account_credited.length;
  const canAddCreditLine = debitCount <= 1;

  return (
    <FieldArray name={`${entryPath}.account_credited`}>
      {(creditsHelpers) => (
        <div
          style={{
            border: "3px solid #ccc",
            padding: "12px",
            marginBottom: "12px"
          }}
        >
          <strong>Credit Lines</strong><br/>

          {entry.account_credited.map((_, cIdx) => {
            const base = `${entryPath}.account_credited.${cIdx}`;
            const accountFieldPath = `${base}.account`;
            const amountFieldPath = `${base}.amount`;
            const branchFieldPath = `${base}.branch`;
            const selectedAccount = getIn(values, accountFieldPath);
            const selectedBranch = getIn(values, branchFieldPath);

            return (
              <div
                key={cIdx}
                style={{
                  border: "3px solid #ccc",
                  padding: "12px",
                  marginBottom: "12px"
                }}
              >
                <strong>Credit Line {cIdx+1}</strong>
                <LineFields
                  label="Credit Line"
                  accountFieldPath={accountFieldPath}
                  amountFieldPath={amountFieldPath}
                  selectedBranch={selectedBranch}
                  branchFieldPath={branchFieldPath}
                  selectedAccount={selectedAccount}
                  setFieldValue={setFieldValue}
                  currencyId={journal.currency_id}
                  onRemove={() => creditsHelpers.remove(cIdx)}
                  disableRemove={creditCount <= 1}
                />
              </div>
            );
          })}

          {canAddCreditLine ? (
              <ButtonSuccess
                value='+ Add credit line'
                handler={() => creditsHelpers.push(emptyLine())}
              />
            ) : (
            <div>
              Rule: If you have more than 1 debit line, you can only have 1 credit line.
            </div>
          )}
        </div>
      )}
    </FieldArray>
  );
}

function Entry({
  entryNum,
  entry,
  entryPath,
  journal,
  setFieldValue,
  values,
  onRemove,
  disableRemove,
  isEntryBalanced,
  debitTotal,
  creditTotal
}) {
  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "12px"
      }}
    >
      <h3>Entry {entryNum + 1}</h3>

      <DebitLines
        entry={entry}
        entryPath={entryPath}
        journal={journal}
        setFieldValue={setFieldValue}
        values={values}
      />

      <CreditLines
        entry={entry}
        entryPath={entryPath}
        journal={journal}
        setFieldValue={setFieldValue}
        values={values}
      />

      {!isEntryBalanced && (
        <div style={{ marginTop: "12px", color: "red", fontSize: "20px" }}>
          <strong>Imbalance:</strong> Debits ({debitTotal}) != Credits ({creditTotal})
        </div>
      )}

      {disableRemove && (
        <ButtonDefault
          value="Remove entry"
          handler={onRemove}
        />
      )}
    </div>
  );
}

function Journal({ journal, journalPath, setFieldValue, values }) {
  const { currencies } = useCurrencies();
  const hasCurrency = Boolean(journal.currency_id);

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "12px",
        marginBottom: "12px"
      }}
    >
      <div>
        <CustomSelect
          label='Currency'
          name={`${journalPath}.currency_id`}
          required
        >
          <option value=''>------</option>
          {currencies.map((c) => (
            <option key={c.id} value={c.id}>
              {c.fullname}
            </option>
          ))}
        </CustomSelect>
      </div>

      <div style={{marginTop: '8px'}}>
        <CustomDatePicker
          name={`${journalPath}.txn_date`}
          label="Transaction Date"
          setFieldValue={setFieldValue}
        />
      </div>

      <div style={{marginTop: '8px'}}>
        <CustomTextField
          label='Narrative'
          name={`${journalPath}.narrative`}
          required
        />
      </div>

      {hasCurrency && (
        <FieldArray name={`${journalPath}.entries`}>
          {(entriesHelpers) => (
            <div>
              <h5>Entries</h5>
              {journal.entries.map((entry, eIdx) => {
                const entryPath = `${journalPath}.entries.${eIdx}`;
                const isLast = eIdx === journal.entries.length - 1;
                const { debitTotal, creditTotal } = getEntryTotals(entry);
                const balanced = Math.abs(debitTotal - creditTotal) <= 0.00001;
                return (
                  <div key={eIdx}>
                    <Entry
                      entryNum={eIdx}
                      entry={entry}
                      entryPath={entryPath}
                      journal={journal}
                      setFieldValue={setFieldValue}
                      values={values}
                      onRemove={() => entriesHelpers.remove(eIdx)}
                      disableRemove={journal.entries.length <= 1}
                      isEntryBalanced={balanced}
                      debitTotal={debitTotal}
                      creditTotal={creditTotal}
                    />
                    {!isLast && (
                      <hr style={{ border: 0, borderTop: "6px solid #111", margin: "12px 0" }} />
                    )}
                  </div>
                );
              })}
              <ButtonSuccess
                value='+ Add entry'
                handler={(evt) => {
                  evt.preventDefault();
                  entriesHelpers.push(emptyEntry());
                }}
              />
            </div>
          )}
        </FieldArray>
      )}
    </div>
  );
}

function SubmitButton({ isSubmitting, disabled }) {
  const isDisabled = isSubmitting || disabled;

  const label = isSubmitting ? (
    <>
      <i className="fa fa-spinner fa-spin"></i> Please wait..
    </>
  ) : (
    "Submit"
  );

  const button = (
    <button
      className="btn btn-info"
      type="submit"
      disabled={isDisabled}
      style={isDisabled ? { pointerEvents: "none", opacity: "0.7" } : undefined}
    >
      {label}
    </button>
  );

  if (isDisabled) {
    return <div className="modal-footer justify-content-between">{button}</div>;
  }

  return button;
}

export default function JournalsFormikForm() {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => console.log("SUBMIT:", values)}
    >
      {({ values, setFieldValue, isSubmitting }) => {
        const hasAnyImbalance = values.journals.some((j) =>
          (j.entries || []).some((e) => !isBalanced(e, 0.00001))
        );

        return (
          <Form>
            <h3>Journals</h3>

            <FieldArray name="journals">
              {(journalsHelpers) => (
                <div>
                  {values.journals.map((journal, jIdx) => {
                    const journalPath = `journals.${jIdx}`;
                    return (
                      <Journal
                        key={jIdx}
                        journal={journal}
                        journalPath={journalPath}
                        setFieldValue={setFieldValue}
                        values={values}
                        onRemove={() => journalsHelpers.remove(jIdx)}
                        disableRemove={values.journals.length <= 1}
                      />
                    );
                  })}
                </div>
              )}
            </FieldArray>

            {hasAnyImbalance && (
              <div style={{ marginTop: "12px", color: "red", fontSize: "20px" }}>
                <strong>Cannot submit:</strong> One or more entries are imbalanced.
              </div>
            )}

            <div className="divider divider-default" style={{ padding: "1.25rem" }}></div>

            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <SubmitButton isSubmitting={isSubmitting} disabled={isSubmitting || hasAnyImbalance} />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}