import React, { useEffect, useMemo, useState } from "react";
import Select from "react-select";
import { useCurrencies } from "../../contexts/CurrenciesContext";
import { useBranches } from "../../contexts/BranchesContext";

import LoanBook from "./LoanBook/LoanBook";
import Par from "./Par/Par";
import ClientNumbers from "./ClientNumbers/ClientNumbers";
import GroupNumbers from "./GroupNumbers/GroupNumbers";
import LoansReleased from "./LoansReleased/LoansReleased";
import LoanCollections from "./LoanCollections/LoanCollections";
import { Fetcher } from "../../common";

export default function Dashboard() {
  useEffect(() => {
    document.title = "Dashboard";
  }, []);

  const { currencies } = useCurrencies();

  const [currencyId, setCurrencyId] = useState("");
  useEffect(() => {
    if (!currencyId && currencies.length > 0) setCurrencyId(currencies[0].id);
  }, [currencies, currencyId]);

  const [unitId, setUnitId] = useState("");
  const [branchIds, setBranchIds] = useState(null);

  return (
    <Fetcher urls={["/usersapi/dashboard_units/"]}>
      {({ data }) => (
        <DashboardSections
          setCurrencyId={setCurrencyId}
          currencyId={currencyId}
          unitId={unitId}
          setUnitId={setUnitId}
          branchIds={branchIds}
          setBranchIds={setBranchIds}
          units={data?.[0] || []}
        />
      )}
    </Fetcher>
  );
}

const DashboardSections = ({
  setCurrencyId,
  currencyId,
  setBranchIds,
  setUnitId,
  branchIds,
  units,
  unitId,
}) => {
  return (
    <div className="font-13 dashboard-page">
      <div className="dashboard-head">
        <h5 className="table-heading">Dashboard</h5>
      </div>

      <div className="card dashboard-card">
        <Filter
          currencyId={currencyId}
          setCurrencyId={setCurrencyId}
          setBranchIds={setBranchIds}
          setUnitId={setUnitId}
          units={units}
          unitId={unitId}
        />

        {currencyId ? (
          <div className="dashboard-sections">
            <LoanBook currencyId={currencyId} branchIds={branchIds} unitId={unitId} />
            <Par currencyId={currencyId} branchIds={branchIds} unitId={unitId} />
            <ClientNumbers branchIds={branchIds} unitId={unitId} />
            <GroupNumbers branchIds={branchIds} unitId={unitId} />
            <LoansReleased currencyId={currencyId} branchIds={branchIds} unitId={unitId} />
            <LoanCollections currencyId={currencyId} branchIds={branchIds} unitId={unitId} />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const Filter = ({ currencyId, setCurrencyId, setBranchIds, setUnitId, units, unitId }) => {
  const { currencies } = useCurrencies();
  const { branches } = useBranches();

  const selectAllOption = useMemo(() => ({ label: "Select all", value: "*" }), []);
  const [optionSelected, setOptionSelected] = useState([]);
  const [unitOptions, setUnitOptions] = useState([]);

  const branchOptions = useMemo(
    () => branches.map((b) => ({ label: b.name, value: b.id })),
    [branches]
  );

  const selectStyles = useMemo(
    () => ({
      container: (base) => ({
        ...base,
        zIndex: "auto",
      }),
      control: (base) => ({
        ...base,
        border: "1px solid var(--app-border)",
        boxShadow: "none",
        background: "var(--app-surface)",
        minHeight: "38px",
        borderRadius: "12px",
        "&:hover": { border: "1px solid var(--app-border)" },
      }),
      menu: (base) => ({
        ...base,
        background: "var(--app-surface)",
        border: "1px solid var(--app-border)",
        boxShadow: "var(--app-shadow)",
        borderRadius: "12px",
        overflow: "hidden",
        zIndex: 20,
      }),
      menuPortal: (base) => ({
        ...base,
        zIndex: 20,
      }),
      option: (base, state) => ({
        ...base,
        background: state.isSelected
          ? "color-mix(in srgb, var(--app-accent) 16%, var(--app-surface))"
          : state.isFocused
            ? "var(--app-surface-2)"
            : "var(--app-surface)",
        color: "var(--app-text)",
      }),
      multiValue: (base) => ({
        ...base,
        background: "var(--app-surface-2)",
        borderRadius: "999px",
      }),
      multiValueLabel: (base) => ({
        ...base,
        color: "var(--app-text)",
        fontWeight: 600,
      }),
      multiValueRemove: (base) => ({
        ...base,
        borderRadius: "999px",
        ":hover": {
          background: "color-mix(in srgb, var(--app-danger) 14%, transparent)",
          color: "var(--app-danger)",
        },
      }),
      placeholder: (base) => ({ ...base, color: "var(--app-muted)" }),
      singleValue: (base) => ({ ...base, color: "var(--app-text)" }),
      input: (base) => ({ ...base, color: "var(--app-text)" }),
    }),
    []
  );

  const onBranchesChange = (selected) => {
    const selectedList = selected || [];
    const hasSelectAll = selectedList.some((opt) => opt.value === "*");

    let uiSelected;
    let effectiveBranches;

    if (hasSelectAll) {
      uiSelected = [selectAllOption];
      effectiveBranches = branchOptions;
    } else {
      uiSelected = selectedList;
      effectiveBranches = selectedList;
    }

    setOptionSelected(uiSelected);
    setBranchIds(effectiveBranches.length ? effectiveBranches.map((b) => b.value) : null);

    const filteredUnits = (units || []).filter((u) =>
      effectiveBranches.some((b) => Number(b.value) === Number(u.branch))
    );

    setUnitOptions(filteredUnits);

    if (unitId && filteredUnits.every((u) => Number(u.id) !== Number(unitId))) {
      setUnitId("");
    }
  };

  return (
    <div className="card-body">
      <div className="book-value-section">
        <div className="book-value-select-section dashboard-filter">
          <div className="fields-container-select select_container_width">
            <select
              value={currencyId}
              onChange={(evt) => setCurrencyId(Number(evt.target.value) || "")}
              className="custom-select-form select_width dashboard-select"
            >
              <option value="">Select Currency</option>
              {currencies.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.shortname}
                </option>
              ))}
            </select>
          </div>

          <div className="fields-container-select select_container_width">
            <select
              value={unitId}
              onChange={(evt) => setUnitId(Number(evt.target.value) || "")}
              className="custom-select-form select_width dashboard-select"
            >
              <option value="">Units</option>
              {unitOptions.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          <div className="fields-container-select select_container_width branch">
            <Select
              isMulti
              name="branches"
              options={[selectAllOption, ...branchOptions]}
              value={optionSelected}
              classNamePrefix="select"
              className="basic-multi-select"
              placeholder="Select Branches"
              onChange={onBranchesChange}
              styles={selectStyles}
              menuPosition="absolute"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
