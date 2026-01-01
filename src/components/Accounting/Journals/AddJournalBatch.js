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
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";


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

function toPairs(journal) {
  const { txn_date, narrative } = journal;
  const out = [];

  for (const [entryIdx, entry] of (journal.entries || []).entries()) {
    const debits = entry.accounts_debited || [];
    const credits = entry.account_credited || [];

    if (!debits.length || !credits.length) {
      throw new Error(`Entry ${entryIdx}: missing debit or credit lines`);
    }

    const isManyDebitsOneCredit = debits.length > 1 && credits.length === 1;
    const isManyCreditsOneDebit = credits.length > 1 && debits.length === 1;
    const isOneToOne = debits.length === 1 && credits.length === 1;

    if (!isManyDebitsOneCredit && !isManyCreditsOneDebit && !isOneToOne) {
      throw new Error(
        `Entry ${entryIdx}: unsupported shape. Expected (many debits, 1 credit) OR (1 debit, many credits) OR (1,1). Got debits=${debits.length}, credits=${credits.length}`
      );
    }

    if (isManyCreditsOneDebit || isOneToOne) {
      const debitAccountId = debits[0]?.account?.id;
      if (!debitAccountId) throw new Error(`Entry ${entryIdx}: missing debit account id`);

      for (const c of credits) {
        const creditAccountId = c?.account?.id;
        if (!creditAccountId) throw new Error(`Entry ${entryIdx}: missing credit account id`);

        out.push({
          account_debited_id: debitAccountId,
          account_credited_id: creditAccountId,
          amount: Number(c.amount) || 0,
          txn_date,
          narrative
        });
      }
    }

    if (isManyDebitsOneCredit) {
      const creditAccountId = credits[0]?.account?.id;
      if (!creditAccountId) throw new Error(`Entry ${entryIdx}: missing credit account id`);

      for (const d of debits) {
        const debitAccountId = d?.account?.id;
        if (!debitAccountId) throw new Error(`Entry ${entryIdx}: missing debit account id`);

        out.push({
          account_debited_id: debitAccountId,
          account_credited_id: creditAccountId,
          amount: Number(d.amount) || 0,
          txn_date,
          narrative
        });
      }
    }
  }

  return out;
}

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
  return {branch: '', account: '', amount: ''};
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
            step='0.01'
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

      {!disableRemove && (
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
          required
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
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    actions.setStatus(null);
    const pairs = values.journals.map(journal => toPairs(journal));
    const payload = {
      currency_id: values.journals[0].currency_id,
      entries: pairs[0]
    }

    try {
      const CONFIG = {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      };
      const response = await axios.post('/acc-api/create-journals-batch/', payload, CONFIG);
      navigate('/accounting/viewaccounting/journals/batch-results', {
        replace: true,
        state: response.data
      });
    } catch (error) {
      if (!error.response) {
        actions.setStatus({
          type: "error",
          message: "Network error. Please check your connection and try again."
        });
        return;
      }

      const status = error.response.status;

      if (status >= 400 && status <= 499) {
        actions.setStatus({
          type: "error",
          message: error.response.data?.detail || "There were validation errors. Please review and try again.",
          data: error.response.data
        });
        return;
      }

      actions.setStatus({
        type: "error",
        message: `Server error (${error.response.status}). Please try again.`
      });
    } finally {
      actions.setSubmitting(false);
    }
  }

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, setFieldValue, isSubmitting, status }) => {
        const errorRef = React.useRef(null);
        const hasAnyImbalance = values.journals.some((j) =>
          (j.entries || []).some((e) => !isBalanced(e, 0.00001))
        );

        React.useEffect(() => {
          if (status?.type === "error" && errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, [status]);

        return (
          <Form>
            <h3>Journals</h3>

            {status?.type === "error" && (
              <div ref={errorRef} style={{ color: "red", fontSize: "20px", marginBottom: "12px", scrollMarginTop: "90px" }}>
                <strong>{status.message}</strong>
              </div>
            )}

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
