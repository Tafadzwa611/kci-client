import React, { useState, useEffect, useRef, useMemo } from "react";
import { removeEmptyValues, getParams } from "../../../utils/utils";
import axios from "axios";
import Loader from "../../Loader/MiniLoader";
import LineChart from "../LineChart";

function LoanCollections({ currencyId, branchIds, unitId }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const pageNum = useRef(1);

  const isDark =
    document.body.classList.contains("dark") ||
    document.documentElement.dataset.theme === "dark";

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currencyId, branchIds, unitId]);

  const getData = async () => {
    try {
      setErr(false);
      pageNum.current = 1;

      const payload = removeEmptyValues({
        currency_id: currencyId,
        branch_ids: branchIds,
        page_num: pageNum.current,
        unit_id: unitId,
      });
      const params = getParams(payload);

      const response = await axios.get("/dashboardapi/dashboard-collections/", {
        params,
      });
      setData(response.data);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  const viewMore = async () => {
    try {
      setLoadingMore(true);
      const nextPage = pageNum.current + 1;

      const payload = removeEmptyValues({
        currency_id: currencyId,
        branch_ids: branchIds,
        page_num: nextPage,
        unit_id: unitId,
      });
      const params = getParams(payload);

      const response = await axios.get("/dashboardapi/dashboard-collections/", {
        params,
      });

      pageNum.current = nextPage;
      setData((curr) => [...response.data, ...(curr || [])]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingMore(false);
    }
  };

  const chartColors = useMemo(
    () =>
      isDark
        ? {
            line: "#34d399",
            fill: "rgba(52, 211, 153, 0.18)",
          }
        : {
            line: "#16a34a",
            fill: "rgba(22, 163, 74, 0.16)",
          },
    [isDark]
  );

  const dataSet = useMemo(() => {
    const rows = data || [];
    return {
      labels: rows.map((m) => `${m.month} ${m.year}`),
      datasets: [
        {
          label: "Monthly Collections",
          data: rows.map((m) => m.total_amount_paid),
          borderColor: chartColors.line,
          backgroundColor: chartColors.fill,
          fill: true,
          cubicInterpolationMode: "monotone",
          tension: 0.35,
          pointRadius: 2,
          pointHoverRadius: 4,
          borderWidth: 2,
        },
      ],
    };
  }, [data, chartColors]);

  if (err) {
    return (
      <div className="card-body">
        <div className="book-value-section">Error. Please try again.</div>
      </div>
    );
  }

  if (!data) {
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
        <div className="dashboard-title-row">
          <div className="dashboard-section-title">Monthly Collections</div>

          <button
            type="button"
            className="dash-action-btn"
            onClick={viewMore}
            disabled={loadingMore}
            title="Load earlier months"
          >
            {loadingMore ? "Loading..." : "View more"}
          </button>
        </div>

        <div className="chart-section dash-chart-section">
          <div className="chart-container dash-chart-container">
            <div className="chart dash-chart">
              <LineChart data={dataSet} />
            </div>
          </div>

          <div className="chart-scroller bottom dash-chart-scroller">
            <i
              onClick={loadingMore ? undefined : viewMore}
              className={`uil uil-arrow-circle-left ${
                loadingMore ? "is-disabled" : ""
              }`}
              style={{ cursor: loadingMore ? "not-allowed" : "pointer" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoanCollections;