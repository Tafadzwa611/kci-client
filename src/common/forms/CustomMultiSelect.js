import React, { useState, useEffect, useMemo } from "react";
import Select from "react-select";
import { useField } from "formik";
import { uuidv4 } from "../../utils";

function CustomMultiSelect({ label, options, initVals, setFieldValue, ...props }) {
  const [optionSelected, setOptionSelected] = useState(initVals);
  const [field, meta] = useField(props);

  const inputId = useMemo(() => uuidv4(), []);

  useEffect(() => {
    const el = document.getElementById(inputId);
    if (el) el.required = props.required;
  }, [inputId, props.required]);

  const handleMultiSelect = (selected) => {
    let selectedOpts;

    if (
      selected !== null &&
      selected.length > 0 &&
      selected[selected.length - 1].value === "*"
    ) {
      selectedOpts = options;
    } else {
      selectedOpts = selected;
    }

    setOptionSelected(selectedOpts);
    setFieldValue(field.name, selectedOpts);

    const el = document.getElementById(inputId);
    if (!el) return;

    if (selected === null || selected.length === 0) el.required = props.required;
    else el.required = false;
  };

  const selectStyles = useMemo(
    () => ({
      control: (base) => ({
        ...base,
        border: "1px solid var(--border-color)",
        boxShadow: "none",
        backgroundColor: "var(--white)",
      }),

      menuPortal: (base) => ({
        ...base,
        zIndex: 2147483647,
      }),

      menu: (base) => ({
        ...base,
        zIndex: 2147483647,
        backgroundColor: "var(--white)",
        border: "1px solid var(--border-color)",
      }),

      option: (base, state) => {
        const isDark =
          document.body.classList.contains("dark") ||
          document.documentElement.dataset.theme === "dark";

        return {
          ...base,
          fontSize: "12px",
          lineHeight: "1.2",
          paddingTop: 8,
          paddingBottom: 8,
          backgroundColor: isDark
            ? state.isSelected
              ? "rgba(59,130,246,0.25)"
              : state.isFocused
              ? "rgba(148,163,184,0.14)"
              : "transparent"
            : state.isSelected
            ? "rgba(59,130,246,0.12)"
            : state.isFocused
            ? "rgba(15,23,42,0.06)"
            : "transparent",
          color: "var(--text-color)",
          cursor: "pointer",
        };
      },

      singleValue: (base) => ({
        ...base,
        color: "var(--text-color)",
      }),

      input: (base) => ({
        ...base,
        color: "var(--text-color)",
        margin: 0,
        padding: 0,
      }),

      placeholder: (base) => {
        const isDark =
          document.body.classList.contains("dark") ||
          document.documentElement.dataset.theme === "dark";

        return {
          ...base,
          color: isDark ? "rgba(148,163,184,0.9)" : "#64748b",
        };
      },

      valueContainer: (base) => ({
        ...base,
        paddingTop: 0,
        paddingBottom: 0,
      }),

      multiValue: (base) => {
        const isDark =
          document.body.classList.contains("dark") ||
          document.documentElement.dataset.theme === "dark";

        return {
          ...base,
          marginTop: 0,
          marginBottom: 0,
          backgroundColor: isDark
            ? "rgba(148,163,184,0.16)"
            : "rgba(15,23,42,0.06)",
        };
      },

      multiValueLabel: (base) => ({
        ...base,
        color: "var(--text-color)",
      }),

      multiValueRemove: (base) => ({
        ...base,
        color: "var(--text-color)",
      }),
    }),
    []
  );

  return (
    <div className="row custom-background custom-multi-select" style={{ alignItems: "center" }}>
      <label className="form-label">
        {label}
        {props.required && <span style={{ color: "red" }}>&#42;</span>}
      </label>

      <div className="col-9">
        <div className="custom__select__width">
        {props.isMulti === false ? (
          <Select
            isClearable
            name="multi-select"
            options={options}
            value={optionSelected}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleMultiSelect}
            inputId={inputId}
            styles={selectStyles}
            menuPortalTarget={document.body}
            menuPosition="absolute"

            // menuIsOpen={true}              // ✅ FORCE OPEN
            // hideSelectedOptions={false}
          />
        ) : (
          <Select
            isMulti
            name="multi-select"
            options={[{ label: "Select all", value: "*" }, ...options]}
            value={optionSelected}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleMultiSelect}
            inputId={inputId}
            styles={selectStyles}
            menuPortalTarget={document.body}
            menuPosition="absolute"

            // menuIsOpen={true}              // ✅ FORCE OPEN
            // hideSelectedOptions={false}
          />
        )}

        {meta.error && <div className="error">{JSON.stringify(meta.error)}</div>}
        </div>
      </div>
    </div>
  );
}

export default CustomMultiSelect;