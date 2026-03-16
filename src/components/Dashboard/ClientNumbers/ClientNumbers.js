import React, { useMemo, useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import { removeEmptyValues, getParams } from "../../../utils/utils";
import Loader from "../../Loader/MiniLoader";

ChartJS.register(ArcElement, Tooltip, Legend);

const ClientNumbers = ({ branchIds, unitId }) => {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getData();
  }, [branchIds, unitId]);

  const getData = async () => {
    try {
      setErr(false);
      const payload = removeEmptyValues({ branch_ids: branchIds, unit_id: unitId });
      const params = getParams(payload);
      const response = await axios.get("/dashboardapi/client-numbers/", { params });
      setData(response.data);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  const isDark =
    document.body.classList.contains("dark") ||
    document.documentElement.dataset.theme === "dark";

  const statusColors = useMemo(
    () =>
      isDark
        ? {
            Active: "#34d399",
            Blacklisted: "#60a5fa",
            Processing: "#fbbf24",
            "Pending Approval": "#2dd4bf",
            Inactive: "#c084fc",
            Left: "#fb923c",
            Rejected: "#f87171",
          }
        : {
            Active: "#16a34a",
            Blacklisted: "#2563eb",
            Processing: "#d97706",
            "Pending Approval": "#0d9488",
            Inactive: "#7c3aed",
            Left: "#ea580c",
            Rejected: "#dc2626",
          },
    [isDark]
  );

  const splitStatusByGender = (gender) => {
    const rows = (data?.client_status || []).filter((s) => s.gender === gender);

    return {
      labels: rows.map((s) => `${s.gender} ${s.status}`),
      datasets: [
        {
          label: `# ${gender === "MALE" ? "Male" : "Female"} Clients Status`,
          data: rows.map((s) => s.count),
          backgroundColor: rows.map((s) => statusColors[s.status] || (isDark ? "#94a3b8" : "#64748b")),
          borderWidth: 0,
        },
      ],
    };
  };

  const maleStatusDataSet = useMemo(() => splitStatusByGender("MALE"), [data, statusColors]);
  const femaleStatusDataSet = useMemo(() => splitStatusByGender("FEMALE"), [data, statusColors]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            color: "var(--text-color)",
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
            pointStyle: "circle",
            font: { size: 11 },
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => `${ctx.label || ""}: ${ctx.parsed ?? 0}`,
          },
        },
      },
    }),
    []
  );

  const maleTypes = useMemo(
    () => (data?.client_types || []).filter((ct) => ct.gender === "MALE"),
    [data]
  );

  const femaleTypes = useMemo(
    () => (data?.client_types || []).filter((ct) => ct.gender === "FEMALE"),
    [data]
  );

  const sumCounts = (arr) => arr.reduce((acc, x) => acc + (Number(x.count) || 0), 0);
  const maleTotal = useMemo(() => sumCounts(maleTypes), [maleTypes]);
  const femaleTotal = useMemo(() => sumCounts(femaleTypes), [femaleTypes]);

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
        <div className="dash-grid">

          <div className="book-value-section">
            <div className="dash-charts">

              <div className="dash-chart dash-chart--responsive">
                <div className="dash-chart-title">Male Status</div>
                <div className="dash-chart-canvas dash-chart-canvas--responsive">
                  <Pie data={maleStatusDataSet} options={chartOptions} />
                </div>
              </div>

              <div className="dash-chart dash-chart--responsive">
                <div className="dash-chart-title">Female Status</div>
                <div className="dash-chart-canvas dash-chart-canvas--responsive">
                  <Pie data={femaleStatusDataSet} options={chartOptions} />
                </div>
              </div>

            </div>
          </div>

          <div className="book-value-section">
            <div className="book-value-update-section dash-types">

              <div className="book-value-info-box client__type">
                <div className="dash-list">

                  <div className="dash-list-header">
                    <div>Male Client Types</div>
                    <div className="dash-list-meta">Total: {maleTotal}</div>
                  </div>

                  <div className="dash-list-body">
                    {maleTypes.length ? (
                      maleTypes.map((ct, idx) => (
                        <div key={idx} className="dash-list-row">
                          <div className="dash-list-name">{ct.client_type__name}</div>
                          <div className="dash-list-count">{ct.count}</div>
                        </div>
                      ))
                    ) : (
                      <div className="dash-empty">No male client types found.</div>
                    )}
                  </div>

                </div>
              </div>

              <div className="book-value-info-box client__type">
                <div className="dash-list">

                  <div className="dash-list-header">
                    <div>Female Client Types</div>
                    <div className="dash-list-meta">Total: {femaleTotal}</div>
                  </div>

                  <div className="dash-list-body">
                    {femaleTypes.length ? (
                      femaleTypes.map((ct, idx) => (
                        <div key={idx} className="dash-list-row">
                          <div className="dash-list-name">{ct.client_type__name}</div>
                          <div className="dash-list-count">{ct.count}</div>
                        </div>
                      ))
                    ) : (
                      <div className="dash-empty">No female client types found.</div>
                    )}
                  </div>

                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ClientNumbers;