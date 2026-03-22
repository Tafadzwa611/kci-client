import React, { useEffect, useMemo, useState } from "react";
import { useCurrencies } from "../../../contexts/CurrenciesContext";
import axios from "axios";
import { removeEmptyValues, getParams } from "../../../utils/utils";
import Loader from "../../Loader/MiniLoader";

const endpoints = [1, 30, 60, 90];

function Par({ currencyId, branchIds, unitId }) {
  const [par, setPar] = useState(null);
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

      const base = removeEmptyValues({
        currency_id: currencyId,
        branch_ids: branchIds,
        unit_id: unitId,
      });

      const requests = endpoints.map((lower) => {
        const params = getParams({ ...base, lower_limit: lower });
        return axios.get("/reportsapi/par-report/", { params });
      });

      const responses = await Promise.all(requests);

      const out = {};
      responses.forEach((response) => {
        // safest way to get lower_limit even if params is a URLSearchParams or plain object
        const p = response?.config?.params;
        let lower = null;

        if (p && typeof p.get === "function") lower = p.get("lower_limit");
        else if (p && Object.prototype.hasOwnProperty.call(p, "lower_limit")) lower = p.lower_limit;

        // fallback: align with endpoints order
        if (lower === null || lower === undefined) lower = endpoints[responses.indexOf(response)];

        out[Number(lower)] = response.data;
      });

      setPar(out);
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

  if (!par) {
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
        <div className="book-value-update-section par-grid">
          <ParInfoBox par_val={1} par={par} currencyShort={cur} fmtMoney={fmtMoney} />
          <ParInfoBox par_val={30} par={par} currencyShort={cur} fmtMoney={fmtMoney} />
          <ParInfoBox par_val={60} par={par} currencyShort={cur} fmtMoney={fmtMoney} />
          <ParInfoBox par_val={90} par={par} currencyShort={cur} fmtMoney={fmtMoney} />
        </div>
      </div>
    </div>
  );
}

const ParInfoBox = ({ par_val, par, currencyShort, fmtMoney }) => {
  const d = par?.[par_val] || {};
  const parPct = d?.par_value ?? 0;
  const principalAtRisk = d?.principal_at_risk ?? 0;
  const loansCount = d?.loans_in_arrears_count ?? 0;

  return (
    <div className="book-value-info-box loan__book par-card">
      <div className="par-title">PAR {par_val}</div>
      <div className="par-subtitle">{currencyShort}</div>

      <div className="par-row">
        <div className="par-label">PAR Value</div>
        <div className="par-value">{parPct}%</div>
      </div>

      <div className="par-row">
        <div className="par-label">Principal at Risk</div>
        <div className="par-value">
          {currencyShort} {fmtMoney(principalAtRisk)}
        </div>
      </div>

      <div className="par-row">
        <div className="par-label">Loan Count</div>
        <div className="par-value">{Number(loansCount).toLocaleString()}</div>
      </div>
    </div>
  );
};

export default Par;
