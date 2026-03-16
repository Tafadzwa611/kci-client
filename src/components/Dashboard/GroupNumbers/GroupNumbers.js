import React, { useMemo, useState, useEffect } from "react";
import { removeEmptyValues, getParams } from "../../../utils/utils";
import axios from "axios";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import Loader from "../../Loader/MiniLoader";

ChartJS.register(ArcElement, Tooltip, Legend);

function GroupNumbers({ branchIds, unitId }) {
  const [data, setData] = useState(null);
  const [err, setErr] = useState(false);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [branchIds, unitId]);

  const getData = async () => {
    try {
      setErr(false);
      const payload = removeEmptyValues({ branch_ids: branchIds, unit_id: unitId });
      const params = getParams(payload);
      const response = await axios.get("/dashboardapi/group-numbers/", { params });
      setData(response.data);
    } catch (error) {
      console.log(error);
      setErr(true);
    }
  };

  const statusColors = useMemo(
    () => ({
      Active: "var(--chart-green)",
      Blacklisted: "var(--chart-blue)",
      Processing: "var(--chart-amber)",
      "Pending Approval": "var(--chart-teal)",
      Inactive: "var(--chart-purple)",
      Left: "var(--chart-orange)",
      Rejected: "var(--chart-red)",
    }),
    []
  );

  const statusDataSet = useMemo(() => {
    const rows = data?.group_status || [];
    return {
      labels: rows.map((s) => s.status),
      datasets: [
        {
          label: "# Group Status",
          data: rows.map((s) => s.count),
          backgroundColor: rows.map((s) => statusColors[s.status] || "var(--chart-gray)"),
          borderWidth: 0,
        },
      ],
    };
  }, [data, statusColors]);

  const chartOptions = useMemo(
    () => ({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "bottom",
          labels: {
            boxWidth: 10,
            boxHeight: 10,
            usePointStyle: true,
            pointStyle: "circle",
          },
        },
        tooltip: {
          callbacks: {
            label: (ctx) => {
              const label = ctx.label || "";
              const value = ctx.parsed ?? 0;
              return `${label}: ${value}`;
            },
          },
        },
      },
    }),
    []
  );

  const groupTypes = useMemo(() => data?.group_types || [], [data]);
  const totalGroups = useMemo(
    () => groupTypes.reduce((acc, x) => acc + (Number(x.count) || 0), 0),
    [groupTypes]
  );

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

  // keep your original behavior: show nothing if no group types
  if (!data.group_types || data.group_types.length === 0) return null;

  return (
    <div className="card-body">
      <div className="book-value-section">
        <div className="dash-grid">
          {/* LEFT: CHART */}
          <div className="book-value-section">
            <div className="dash-charts">
              <div className="dash-chart dash-chart--single">
                <div className="dash-chart-title">Group Status</div>
                <div className="dash-chart-canvas">
                  <Pie data={statusDataSet} options={chartOptions} />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: TYPES LIST */}
          <div className="book-value-section">
            <div className="book-value-update-section dash-types">
              <div className="book-value-info-box group__type">
                <div className="dash-list">
                  <div className="dash-list-header">
                    <div>Group Types</div>
                    <div className="dash-list-meta">Total: {totalGroups}</div>
                  </div>

                  <div className="dash-list-body">
                    {groupTypes.map((gt, idx) => (
                      <div key={idx} className="dash-list-row">
                        <div className="dash-list-name">{gt.group_type__name}</div>
                        <div className="dash-list-count">{gt.count}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* END RIGHT */}
        </div>
      </div>
    </div>
  );
}

export default GroupNumbers;
