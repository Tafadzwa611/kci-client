import React, { useEffect, useMemo, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import Select from 'react-select';
import LoansTable from './LoansTable';
import AgeingAnalysisFilter from './AgeingAnalysisFilter';

ChartJS.register(ArcElement, Tooltip, Legend);

function AgeingAnalysis({ open, setOpen, branches, par }) {
  return (
    <div className={open ? 'modal fade show sf-modal-open' : 'modal fade sf-modal-closed'}>
      <div
        className="modal-dialog modal-xl modal-dialog-scrollable"
        style={{
          maxWidth: 'calc(100% - 3rem)',
          height: 'calc(100% - 7rem)',
          top: '3.8rem',
        }}
      >
        <div className="modal-content">
          <div className="modal-header">
            <span style={{ fontWeight: '700', color: 'var(--sf-text)' }}>
              Aging Report {par.par_name}
            </span>

            <button
              type="button"
              className="close"
              onClick={() => setOpen(false)}
              aria-label="Close"
            >
              <span aria-hidden="true" className="close__times">
                &times;
              </span>
            </button>
          </div>

          <ModalBody branches={branches} par={par} />

          <div className="modal-footer sf-modal-footer justify-content-between">
            <button
              type="button"
              className="btn btn-default"
              onClick={() => setOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const ModalBody = ({ par, branches }) => {
  const [loans, setLoans] = useState(null);
  const [params, setParams] = useState(null);
  const [themeVars, setThemeVars] = useState({
    text: '#0f172a',
    muted: '#64748b',
    chartRed: 'rgba(239, 68, 68, 0.32)',
    chartBlue: 'rgba(59, 130, 246, 0.28)',
  });

  const otherLoans = 100 - Number(par.par_value);

  useEffect(() => {
    const readThemeVars = () => {
      const styles = getComputedStyle(document.documentElement);

      setThemeVars({
        text: styles.getPropertyValue('--app-text').trim() || '#0f172a',
        muted: styles.getPropertyValue('--app-muted').trim() || '#64748b',
        chartRed: styles.getPropertyValue('--chart-red').trim() || 'rgba(239, 68, 68, 0.32)',
        chartBlue: styles.getPropertyValue('--chart-blue').trim() || 'rgba(59, 130, 246, 0.28)',
      });
    };

    readThemeVars();

    const observer = new MutationObserver(() => {
      readThemeVars();
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['data-theme', 'class'],
    });

    return () => observer.disconnect();
  }, []);

  const chartData = useMemo(() => {
    return {
      labels: [`% of Loan portfolio ${par.par_name} days late`, 'Other Running Loans'],
      datasets: [
        {
          label: 'Par',
          data: [par.par_value, otherLoans],
          backgroundColor: [themeVars.chartRed, themeVars.chartBlue],
          borderColor: [themeVars.chartRed, themeVars.chartBlue],
          borderWidth: 1.5,
        },
      ],
    };
  }, [par.par_name, par.par_value, otherLoans, themeVars]);

  const chartOptions = useMemo(() => {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: themeVars.text,
            padding: 16,
            boxWidth: 14,
            font: {
              size: 12,
              weight: 600,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: (context) => `${context.label}: ${context.raw}%`,
          },
        },
      },
    };
  }, [themeVars]);

  const selectStyles = useMemo(() => {
    return {
      control: (base, state) => ({
        ...base,
        minHeight: 42,
        borderRadius: 12,
        borderColor: state.isFocused ? 'var(--sf-focus)' : 'var(--sf-border)',
        backgroundColor: 'var(--sf-input-bg)',
        boxShadow: state.isFocused ? '0 0 0 4px var(--sf-focus-ring)' : 'none',
        '&:hover': {
          borderColor: 'var(--sf-border-strong)',
        },
      }),
      valueContainer: (base) => ({
        ...base,
        padding: '2px 10px',
      }),
      input: (base) => ({
        ...base,
        color: 'var(--sf-text)',
      }),
      placeholder: (base) => ({
        ...base,
        color: 'var(--sf-muted)',
      }),
      singleValue: (base) => ({
        ...base,
        color: 'var(--sf-text)',
      }),
      multiValue: (base) => ({
        ...base,
        background: 'var(--app-pill)',
        borderRadius: 999,
      }),
      multiValueLabel: (base) => ({
        ...base,
        color: 'var(--app-text)',
        fontWeight: 600,
      }),
      multiValueRemove: (base) => ({
        ...base,
        color: 'var(--app-muted)',
        ':hover': {
          backgroundColor: 'var(--app-pill-hover)',
          color: 'var(--app-text)',
        },
      }),
      menu: (base) => ({
        ...base,
        backgroundColor: 'var(--app-surface)',
        border: '1px solid var(--app-border)',
        boxShadow: 'var(--app-shadow)',
        zIndex: 20,
      }),
      menuList: (base) => ({
        ...base,
        color: 'var(--app-text)',
      }),
      option: (base, state) => ({
        ...base,
        backgroundColor: state.isFocused ? 'var(--app-surface-2)' : 'var(--app-surface)',
        color: 'var(--app-text)',
        cursor: 'pointer',
      }),
    };
  }, []);

  return (
    <div className="modal-body">
      <div className="sf-page">
        <div className="sf-section">
          <div className="sf-section-head">
            <div>
              <div className="sf-section-title">Portfolio Risk Overview</div>
              <div className="sf-section-hint">
                Aging summary and portfolio exposure for the selected PAR bucket.
              </div>
            </div>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '1.5rem',
            }}
            className="ageing-analysis-grid"
          >
            <div className="sf-card dash-chart-section">
              <div className="dash-chart-title">Portfolio Split</div>
              <div className="dash-chart">
                <div
                  className="dash-chart-canvas dash-chart--single"
                  style={{ height: '400px' }}
                >
                  <Pie data={chartData} options={chartOptions} />
                </div>
              </div>
            </div>

            <div className="sf-card age-report-select-disabled">
              <div className="dash-chart-title">Aging Summary</div>

              <div className="sf-field" style={{ marginBottom: '1rem' }}>
                <label
                  className="sf-label is-floated"
                  style={{
                    position: 'static',
                    transform: 'none',
                    marginBottom: '0.5rem',
                  }}
                >
                  Branches
                </label>

                <Select
                  isMulti
                  name="branches"
                  options={branches}
                  value={branches}
                  classNamePrefix="sf-select"
                  className="basic-multi-select"
                  placeholder="Select Branches"
                  isDisabled
                  styles={selectStyles}
                />
              </div>

              <div className="loanbook-grid">
                <div className="loanbook-row">
                  <span className="loanbook-label">Par Value</span>
                  <span className="loanbook-value">{par.par_value}%</span>
                </div>

                <div className="loanbook-row">
                  <span className="loanbook-label">
                    Number of loans {par.par_name} days late
                  </span>
                  <span className="loanbook-value">{par.loans_in_arrears_count}</span>
                </div>

                <div className="loanbook-row">
                  <span className="loanbook-label">Total Loan Count</span>
                  <span className="loanbook-value">{par.total_loan_count}</span>
                </div>

                <div className="loanbook-row">
                  <span className="loanbook-label">Principal At Risk</span>
                  <span className="loanbook-value">
                    {par.currency} {par.principal_at_risk}
                  </span>
                </div>

                <div className="loanbook-row">
                  <span className="loanbook-label">Total Loan Portfolio</span>
                  <span className="loanbook-value">
                    {par.currency} {par.total_loan_portfolio}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sf-section" style={{ marginTop: '1rem' }}>
          <div className="sf-section-head">
            <div>
              <div className="sf-section-title">Filter Loans</div>
              <div className="sf-section-hint">
                Narrow down loans included in this aging report.
              </div>
            </div>
          </div>

          <AgeingAnalysisFilter setParams={setParams} setLoans={setLoans} par={par} />
        </div>

        {loans ? (
          <div className="sf-section" style={{ marginTop: '1rem' }}>
            <div className="sf-section-head">
              <div>
                <div className="sf-section-title">Loans Table</div>
                <div className="sf-section-hint">
                  Detailed list of loans matching this aging analysis.
                </div>
              </div>
            </div>

            <LoansTable loans={loans} params={params} setLoans={setLoans} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AgeingAnalysis;