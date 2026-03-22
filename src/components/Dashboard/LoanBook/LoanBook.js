import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { removeEmptyValues, getParams } from "../../../utils/utils";
import Loader from "../../Loader/MiniLoader";
import { useCurrencies } from "../../../contexts/CurrenciesContext";

function LoanBook({ currencyId, branchIds, unitId }) {
  const [loanBook, setLoanBook] = useState(null);
  const [err, setErr] = useState(false);

  const { currencies } = useCurrencies();
  const currency = useMemo(
    () => currencies.find((c) => c.id === currencyId),
    [currencies, currencyId]
  );

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyId, branchIds, unitId]);

  const getData = async () => {
    try {
      setErr(false);
      const payload = removeEmptyValues({
        currency_id: currencyId,
        branch_ids: branchIds,
        unit_id: unitId,
      });
      const params = getParams(payload);
      const response = await axios.get("/dashboardapi/dashboard-loan-book/", { params });
      setLoanBook(response.data);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  const fmtMoney = (value) => {
    if (value === null || value === undefined) return "0.00";
    const n = Number(value);
    if (Number.isNaN(n)) return String(value);
    return n.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  const cur = currency?.shortname || "";

  if (err) {
    return (
      <div className="card-body">
        <div className="book-value-section">Error. Please try again.</div>
      </div>
    );
  }

  if (!loanBook) {
    return (
      <div className="card-body">
        <div className="book-value-section">
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="card-body">
      <div className="book-value-section">
        <div className="book-value-update-section loanbook-grid">
          {/* 1 */}
          <div className="book-value-info-box loan__book loanbook-card">
            <div className="loanbook-title">Loan Book Value</div>

            <div className="loanbook-row">
              <div className="loanbook-label">P</div>
              <div className="loanbook-value">
                {cur} {fmtMoney(loanBook.principal_balance)}
              </div>
            </div>

            <div className="loanbook-row">
              <div className="loanbook-label">P+I</div>
              <div className="loanbook-value">
                {cur} {fmtMoney(loanBook.principal_interest_balance)}
              </div>
            </div>

            <div className="loanbook-row">
              <div className="loanbook-label">P+I+P</div>
              <div className="loanbook-value">
                {cur} {fmtMoney(loanBook.principal_interest_penalty_balance)}
              </div>
            </div>

            <div className="loanbook-row">
              <div className="loanbook-label">P+I+P+F</div>
              <div className="loanbook-value">
                {cur} {fmtMoney(loanBook.principal_interest_penalty_fees_balance)}
              </div>
            </div>
          </div>

          {/* 2 */}
          <div className="book-value-info-box loan__book loanbook-card">
            <div className="loanbook-title">Loan Book Value Categories (P)</div>

            <div className="loanbook-row">
              <div className="loanbook-label">Open</div>
              <div className="loanbook-value">
                {cur} {fmtMoney(loanBook.principal_balance_of_open_loans)}
              </div>
            </div>

            <div className="loanbook-row">
              <div className="loanbook-label">Arrears</div>
              <div className="loanbook-value">
                {cur} {fmtMoney(loanBook.principal_balance_of_arrears_loans)}
              </div>
            </div>
          </div>

          {/* 3 */}
          <div className="book-value-info-box loan__book loanbook-card">
            <div className="loanbook-title">Loan Book Value Categories (P+I)</div>

            <div className="loanbook-row">
              <div className="loanbook-label">Open</div>
              <div className="loanbook-value">
                {cur} {fmtMoney(loanBook.principal_interest_balance_of_open_loans)}
              </div>
            </div>

            <div className="loanbook-row">
              <div className="loanbook-label">Arrears</div>
              <div className="loanbook-value">
                {cur} {fmtMoney(loanBook.principal_interest_balance_of_arrears_loans)}
              </div>
            </div>
          </div>

          {/* 4 */}
          <div className="book-value-info-box loan__book loanbook-card">
            <div className="loanbook-title">Loan Book Categories Count</div>

            <div className="loanbook-row">
              <div className="loanbook-label">Open</div>
              <div className="loanbook-value">
                {Number(loanBook.num_of_open_loans || 0).toLocaleString()}
              </div>
            </div>

            <div className="loanbook-row">
              <div className="loanbook-label">Arrears</div>
              <div className="loanbook-value">
                {Number(loanBook.num_of_arrears_loans || 0).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanBook;
