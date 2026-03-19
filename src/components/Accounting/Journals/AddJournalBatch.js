import React from "react";
import { Formik, Form, FieldArray, getIn } from "formik";
import { useCurrencies } from "../../../contexts/CurrenciesContext";
import { useBranches } from "../../../contexts/BranchesContext";
import {
  CustomMultiSelect,
  CustomSelect,
  CustomDatePicker,
  CustomTextField,
  ButtonSuccess,
  ButtonDefault,
} from "../../../common";
import CustomInputBatch from "./CustomInputBatch";
import CustomSelectRemoteJournalBatch from "./CustomSelectRemoteJournalBatch";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const initialValues = {
  journals: [
    {
      currency_id: "",
      txn_date: "",
      narrative: "",
      entries: [emptyEntry()],
    },
  ],
};

function countPairs(values) {
  let total = 0;

  for (const journal of values.journals || []) {
    for (const entry of journal.entries || []) {
      const debits = entry.accounts_debited || [];
      const credits = entry.account_credited || [];

      if (!debits.length || !credits.length) continue;

      const isManyDebitsOneCredit = debits.length > 1 && credits.length === 1;
      const isManyCreditsOneDebit = credits.length > 1 && debits.length === 1;
      const isOneToOne = debits.length === 1 && credits.length === 1;

      if (isManyDebitsOneCredit) total += debits.length;
      else if (isManyCreditsOneDebit) total += credits.length;
      else if (isOneToOne) total += 1;
    }
  }

  return total;
}

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
          narrative,
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
          narrative,
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
  return { branch: "", account: "", amount: "" };
}

function emptyEntry() {
  return {
    accounts_debited: [emptyLine()],
    account_credited: [emptyLine()],
  };
}

/** helper: keep menu always above other selects (if your custom component forwards props) */
const SELECT_PORTAL_PROPS = {
  menuPortalTarget: typeof document !== "undefined" ? document.body : undefined,
  menuPosition: "fixed",
  classNamePrefix: "sf-select",
  styles: {
    menuPortal: (base) => ({ ...base, zIndex: 2147483647 }),
    menu: (base) => ({ ...base, zIndex: 2147483647 }),
  },
};

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
  disableRemove,
}) {
  const { branches } = useBranches();
  const branchId = selectedBranch?.value ?? "";
  const params = [
    { key: "currency_id", value: currencyId },
    { key: "branch_ids", value: branchId },
  ];

  const hasBranch = Boolean(branchId);

  return (
    <div className="jb-line">
      <CustomMultiSelect
        label="Select Branch"
        name={branchFieldPath}
        isMulti={false}
        setFieldValue={setFieldValue}
        options={branches.map((branch) => ({ label: branch.name, value: branch.id }))}
        required
      />

      {hasBranch ? (
        <CustomSelectRemoteJournalBatch
          label={`${label} Account`}
          url="/acc-api/search_account/"
          selected={selectedAccount}
          params={params}
          setFieldValue={setFieldValue}
          queryParamName="query"
          placeholder="Search Account"
          name={accountFieldPath}
          required
          {...SELECT_PORTAL_PROPS}
        />
      ) : null}

      {hasBranch ? (
        <CustomInputBatch label={`${label} Amount`} name={amountFieldPath} type="number" step="0.01" required />
      ) : null}

      {!disableRemove ? (
        <div className="jb-line-actions">
          <ButtonDefault value={`Remove ${label}`} handler={onRemove} />
        </div>
      ) : null}
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
        <section className="sf-section jb-block">
          <div className="sf-section-head">
            <div className="sf-section-title">Debit lines</div>
            <div className="sf-section-hint">Add one or many debit lines.</div>
          </div>

          <div className="sf-section-body jb-stack">
            {entry.accounts_debited.map((_, dIdx) => {
              const base = `${entryPath}.accounts_debited.${dIdx}`;
              const accountFieldPath = `${base}.account`;
              const amountFieldPath = `${base}.amount`;
              const branchFieldPath = `${base}.branch`;
              const selectedAccount = getIn(values, accountFieldPath);
              const selectedBranch = getIn(values, branchFieldPath);

              return (
                <div key={dIdx} className="jb-card">
                  <div className="jb-card-head">Debit line {dIdx + 1}</div>
                  <div className="jb-card-body">
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
                </div>
              );
            })}

            {canAddDebitLine ? (
              <div className="jb-actions">
                <ButtonSuccess value="+ Add debit line" handler={() => debitsHelpers.push(emptyLine())} />
              </div>
            ) : (
              <div className="jb-rule">
                Rule: If you have more than 1 debit line, you can only have 1 credit line.
              </div>
            )}
          </div>
        </section>
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
        <section className="sf-section jb-block">
          <div className="sf-section-head">
            <div className="sf-section-title">Credit lines</div>
            <div className="sf-section-hint">Add one or many credit lines.</div>
          </div>

          <div className="sf-section-body jb-stack">
            {entry.account_credited.map((_, cIdx) => {
              const base = `${entryPath}.account_credited.${cIdx}`;
              const accountFieldPath = `${base}.account`;
              const amountFieldPath = `${base}.amount`;
              const branchFieldPath = `${base}.branch`;
              const selectedAccount = getIn(values, accountFieldPath);
              const selectedBranch = getIn(values, branchFieldPath);

              return (
                <div key={cIdx} className="jb-card">
                  <div className="jb-card-head">Credit line {cIdx + 1}</div>
                  <div className="jb-card-body">
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
                </div>
              );
            })}

            {canAddCreditLine ? (
              <div className="jb-actions">
                <ButtonSuccess value="+ Add credit line" handler={() => creditsHelpers.push(emptyLine())} />
              </div>
            ) : (
              <div className="jb-rule">
                Rule: If you have more than 1 debit line, you can only have 1 credit line.
              </div>
            )}
          </div>
        </section>
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
  creditTotal,
}) {
  return (
    <div className="jb-entry">
      <div className="jb-entry-head">
        <div className="jb-entry-title">Entry {entryNum + 1}</div>
        {!isEntryBalanced ? (
          <div className="jb-badge jb-badge-danger">
            Imbalance: Debits ({debitTotal}) != Credits ({creditTotal})
          </div>
        ) : (
          <div className="jb-badge jb-badge-ok">Balanced</div>
        )}
      </div>

      <div className="jb-entry-body">
        <DebitLines entry={entry} entryPath={entryPath} journal={journal} setFieldValue={setFieldValue} values={values} />
        <CreditLines entry={entry} entryPath={entryPath} journal={journal} setFieldValue={setFieldValue} values={values} />

        {!disableRemove ? (
          <div className="jb-actions">
            <ButtonDefault value="Remove entry" handler={onRemove} />
          </div>
        ) : null}
      </div>
    </div>
  );
}

function Journal({ journal, journalPath, setFieldValue, values }) {
  const { currencies } = useCurrencies();
  const hasCurrency = Boolean(journal.currency_id);

  return (
    <div className="jb-journal">
      <section className="sf-section">
        <div className="sf-section-head">
          <div className="sf-section-title">Journal</div>
          <div className="sf-section-hint">Set currency, date and narrative before adding entries.</div>
        </div>

        <div className="sf-section-body jb-stack">
          <CustomSelect label="Currency" name={`${journalPath}.currency_id`} required>
            <option value="">------</option>
            {currencies.map((c) => (
              <option key={c.id} value={c.id}>
                {c.fullname}
              </option>
            ))}
          </CustomSelect>

          <CustomDatePicker
            name={`${journalPath}.txn_date`}
            label="Transaction Date"
            setFieldValue={setFieldValue}
            required
          />

          <CustomTextField label="Narrative" name={`${journalPath}.narrative`} required />
        </div>
      </section>

      {hasCurrency ? (
        <FieldArray name={`${journalPath}.entries`}>
          {(entriesHelpers) => (
            <section className="sf-section">
              <div className="sf-section-head">
                <div className="sf-section-title">Entries</div>
                <div className="sf-section-hint">Each entry must balance.</div>
              </div>

              <div className="sf-section-body jb-stack">
                {journal.entries.map((entry, eIdx) => {
                  const entryPath = `${journalPath}.entries.${eIdx}`;
                  const isLast = eIdx === journal.entries.length - 1;
                  const { debitTotal, creditTotal } = getEntryTotals(entry);
                  const balanced = Math.abs(debitTotal - creditTotal) <= 0.00001;

                  return (
                    <div key={eIdx} className="jb-stack">
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
                      {!isLast ? <div className="jb-divider" /> : null}
                    </div>
                  );
                })}

                <div className="jb-actions">
                  <ButtonSuccess
                    value="+ Add entry"
                    handler={(evt) => {
                      evt.preventDefault();
                      entriesHelpers.push(emptyEntry());
                    }}
                  />
                </div>
              </div>
            </section>
          )}
        </FieldArray>
      ) : null}
    </div>
  );
}

function BatchSubmitButton({ isSubmitting, disabled }) {
  const isDisabled = isSubmitting || disabled;

  const label = isSubmitting ? (
    <>
      <i className="fa fa-spinner fa-spin"></i> Please wait..
    </>
  ) : (
    "Submit"
  );

  const button = (
    <button className="btn btn-info" type="submit" disabled={isDisabled}>
      {label}
    </button>
  );

  if (isDisabled) {
    return <div className="modal-footer justify-content-between">{button}</div>;
  }

  return button;
}

export default function JournalsFormikForm() {
  const MAX_PAIRS = 50;
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    actions.setStatus(null);

    const pairsCount = countPairs(values);
    if (pairsCount > MAX_PAIRS) {
      actions.setStatus({
        type: "error",
        message: `Too many transactions: this batch would create ${pairsCount} pairs (max is 50).`,
      });
      actions.setSubmitting(false);
      return;
    }

    const pairs = values.journals.map((journal) => toPairs(journal));
    const payload = {
      currency_id: values.journals[0].currency_id,
      entries: pairs[0],
    };

    try {
      const CONFIG = {
        headers: {
          "X-CSRFToken": Cookies.get("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      };
      const response = await axios.post("/acc-api/create-journals-batch/", payload, CONFIG);
      navigate("/accounting/viewaccounting/journals/batch-results", {
        replace: true,
        state: response.data,
      });
    } catch (error) {
      if (!error.response) {
        actions.setStatus({
          type: "error",
          message: "Network error. Please check your connection and try again.",
        });
        return;
      }

      const status = error.response.status;

      if (status >= 400 && status <= 499) {
        actions.setStatus({
          type: "error",
          message: error.response.data?.detail || "There were validation errors. Please review and try again.",
          data: error.response.data,
        });
        return;
      }

      actions.setStatus({
        type: "error",
        message: `Server error (${error.response.status}). Please try again.`,
      });
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      {({ values, setFieldValue, isSubmitting, status }) => {
        const errorRef = React.useRef(null);

        const hasAnyImbalance = values.journals.some((j) =>
          (j.entries || []).some((e) => !isBalanced(e, 0.00001))
        );

        const pairCount = countPairs(values);
        const exceedsPairLimit = pairCount > MAX_PAIRS;
        const disableSubmit = isSubmitting || hasAnyImbalance || exceedsPairLimit;

        React.useEffect(() => {
          if (status?.type === "error" && errorRef.current) {
            errorRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, [status]);

        return (
          <Form autoComplete="off" className="sf-form">
            <div className="sf-page">
              <div className="sf-shell">
                <div className="sf-shell-head">
                  <div className="sf-shell-title">Journals batch</div>
                  <div className="sf-shell-subtitle">
                    Create multiple journal entries in one batch. Each entry must balance.
                  </div>
                </div>

                <div className="sf-shell-body">
                  {status?.type === "error" ? (
                    <div className="sf-section" ref={errorRef}>
                      <div className="sf-section-body">
                        <div className="jb-alert jb-alert-danger">
                          <strong>{status.message}</strong>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {exceedsPairLimit ? (
                    <div className="sf-section">
                      <div className="sf-section-body">
                        <div className="jb-alert jb-alert-danger">
                          <strong>Too many transactions:</strong> This batch would create {pairCount} pairs (max is{" "}
                          {MAX_PAIRS}).
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <FieldArray name="journals">
                    {(journalsHelpers) => (
                      <div className="jb-stack">
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

                  {hasAnyImbalance ? (
                    <div className="sf-section">
                      <div className="sf-section-body">
                        <div className="jb-alert jb-alert-danger">
                          <strong>Cannot submit:</strong> One or more entries are imbalanced.
                        </div>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="sf-shell-footer">
                  <BatchSubmitButton isSubmitting={isSubmitting} disabled={disableSubmit} />
                </div>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
}