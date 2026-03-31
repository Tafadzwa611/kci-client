// NavbarModern.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, Link, useLocation } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";
import { Form, Formik } from "formik";

import { useNotifications } from "../../contexts/NotificationsContext";
import {
  Modal,
  ModalSubmit,
  NonFieldErrors,
  CustomInput,
  CustomPasswordInput,
  CustomSelect,
} from "../../common";
import { getParams } from "../../utils/utils";

import "./navbar-modern.css";

const MINUTE_MS = 30000;

const MODAL_STATES = {
  search: "search",
  login: "login",
};

const API_URLS = {
  LOAN: "/loansapi/search_txn/",
  PAYMENT: "/loansapi/search_txn/",
  JOURNAL: "/loansapi/search_txn/",
  CLIENTS: "/clientsapi/search_client/?all_branches=1",
  GROUPS: "/clientsapi/search_group/",
};

const ROUTES = {
  LOAN: "/loans/viewloans/loandetails/cli/{value}",
  PAYMENT: "/loans/viewloans/loandetails/cli/{value}",
  JOURNAL: "/accounting/viewaccounting/journals/journal/{value}",
  CLIENTS: "/clients/viewclients/clientdetails/{value}",
  GROUPS: "/groups/viewgroups?group_id={value}",
};

function cx(...args) {
  return args.filter(Boolean).join(" ");
}

function initials(first = "", last = "") {
  return `${first?.[0] ?? ""}${last?.[0] ?? ""}`.toUpperCase();
}

/**
 * If your app already controls theme globally, keep using props.toggleTheme
 * but ALSO ensure data-theme is set on <html>. This makes the navbar CSS switch.
 */
function syncHtmlTheme(theme) {
  try {
    const root = document.documentElement; // <html>
    if (!theme) return;
    root.setAttribute("data-theme", theme === "dark" ? "dark" : "light");
  } catch {
    // ignore
  }
}

const NavbarModern = (props) => {
  const modalRef = useRef(null);
  const [modal, setModal] = useState(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [modulesOpen, setModulesOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);

  const { unreadNotifs, setUnreadNotifs } = useNotifications(0);
  const location = useLocation();

  // Make sure navbar follows the same theme as the rest of the app
  useEffect(() => {
    syncHtmlTheme(props.theme);
  }, [props.theme]);

  // Close menus on route change
  useEffect(() => {
    setMobileOpen(false);
    setModulesOpen(false);
    setUserOpen(false);
  }, [location.pathname]);

  const openSearch = (evt) => {
    evt?.preventDefault?.();
    setModal(MODAL_STATES.search);
  };

  const checkNotifs = async () => {
    if (modalRef.current === MODAL_STATES.login) return;
    try {
      const response = await axios.get("/usersapi/check_new_notifications/");
      if (response.request?.responseURL?.includes("users/login")) {
        modalRef.current = MODAL_STATES.login;
        setModal(MODAL_STATES.login);
      }
      setUnreadNotifs(response.data.count);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkNotifs();
    const interval = setInterval(checkNotifs, MINUTE_MS);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Build modules list from perms (keeps your permission gates)
  const modules = useMemo(() => {
    const p = props.stafftoplevelperms || {};
    const items = [];

    if (p.can_view_dashboard_module)
      items.push({ to: "/dashboard", label: "Dashboard" });
    if (p.can_view_dashboard_module)
      items.push({ to: "/authorizationdashboard", label: "Authorization Dashboard" });
    if (p.can_view_client_module)
      items.push({ to: "/clients/viewclients", label: "Clients" });
    if (p.can_view_group_module)
      items.push({ to: "/groups/viewgroups", label: "Groups" });
    if (p.can_view_deposits_module)
      items.push({ to: "/deposits", label: "Deposits" });
    if (p.can_view_loan_module)
      items.push({ to: "/loans/viewloans", label: "Loans" });
    if (p.can_view_payment_module)
      items.push({ to: "/payments/viewpayments", label: "Payments" });
    if (p.can_view_otherincome_module)
      items.push({ to: "/otherincome/viewotherincome", label: "Other Income" });
    if (p.can_view_expense_module)
      items.push({ to: "/expenses/viewexpenses", label: "Expenses" });
    if (p.can_view_reports_module)
      items.push({ to: "/reports/viewreports", label: "Reports" });
    if (p.can_view_transfer_module)
      items.push({ to: "/transfers/viewtransfers", label: "Transfers" });
    if (p.can_view_accounting_module)
      items.push({ to: "/accounting/viewaccounting", label: "Accounting" });
    if (p.can_view_dataexport_module)
      items.push({ to: "/data/viewdata", label: "Data Export" });
    if (p.can_view_admin_module)
      items.push({ to: "/users/admin", label: "Admin" });

    return items;
  }, [props.stafftoplevelperms]);

  const canSearch = !!props?.stafftoplevelperms?.can_view_search_module;

  // click-outside close (desktop menus)
  const shellRef = useRef(null);
  useEffect(() => {
    const onDocClick = (e) => {
      const el = shellRef.current;
      if (!el) return;
      if (!el.contains(e.target)) {
        setModulesOpen(false);
        setUserOpen(false);
      }
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  const handleToggleTheme = () => {
    // Your existing theme toggle
    props.toggleTheme?.();

    // Also sync HTML attribute immediately (helps if toggleTheme is async)
    const next = props.theme === "light" ? "dark" : "light";
    syncHtmlTheme(next);
  };

  return (
    <>
      {modal === MODAL_STATES.search ? <Search setOpen={setModal} /> : null}
      {modal === MODAL_STATES.login ? (
        <Login
          modalRef={modalRef}
          email={props.loggedInUser.email}
          setOpen={setModal}
        />
      ) : null}

      <header ref={shellRef} className="navshell">
        <div className="navinner">
          {/* Left */}
          <div className="navleft">
            <button
              className="iconbtn mobileOnly"
              onClick={() => setMobileOpen((s) => !s)}
              aria-label="Open menu"
              type="button"
            >
              ☰
            </button>

            <Link to="/" className="brand">
              {/* <span className="brandDot" /> */}
              <span className="brandText">
                {props?.loggedInUser?.company_name || "Lenda"}
              </span>
            </Link>

            <nav className="navlinks desktopOnly" aria-label="Primary">
              <NavLink
                to="/"
                className={({ isActive }) => cx("navitem", isActive && "active")}
              >
                Home
              </NavLink>

              {/* Modules dropdown */}
              {modules.length > 0 && (
                <div className="menuWrap">
                  <button
                    type="button"
                    className={cx(
                      "navitem",
                      "navitemBtn",
                      modulesOpen && "active"
                    )}
                    onClick={() => setModulesOpen((s) => !s)}
                    aria-expanded={modulesOpen}
                  >
                    Modules <span className="chev">▾</span>
                  </button>

                  {modulesOpen && (
                    <div className="menu">
                      <div className="menuGrid">
                        {modules.map((m) => (
                          <NavLink
                            key={m.to}
                            to={m.to}
                            className={({ isActive }) =>
                              cx("menuItem", isActive && "menuItemActive")
                            }
                          >
                            {m.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {canSearch && (
                <a href="/search" onClick={openSearch} className="navitem">
                  Search
                </a>
              )}
            </nav>
          </div>

          {/* Right */}
          <div className="navright">
            <button
              type="button"
              className="iconbtn"
              onClick={handleToggleTheme}
              aria-label="Toggle theme"
              title="Toggle theme"
            >
              {props.theme === "light" ? "☾" : "☀"}
            </button>

            <NavLink
              to="/users/notifications"
              className="iconbtn notifBtn"
              aria-label="Notifications"
            >
              <span aria-hidden="true">🔔</span>
              {unreadNotifs ? (
                <span className="badge">
                  {unreadNotifs > 9 ? "9+" : unreadNotifs}
                </span>
              ) : null}
            </NavLink>

            <div className="menuWrap">
              <button
                type="button"
                className="userPill"
                onClick={() => setUserOpen((s) => !s)}
                aria-expanded={userOpen}
              >
                <span className="avatar">
                  {initials(
                    props.loggedInUser.first_name,
                    props.loggedInUser.last_name
                  )}
                </span>
                <span className="userMeta desktopOnly">
                  <span className="userName">
                    {props.loggedInUser.first_name}{" "}
                    {props.loggedInUser.last_name}
                  </span>
                  <span className="userSub">
                    {props.loggedInUser.company_name}
                  </span>
                </span>
                <span className="chev">▾</span>
              </button>

              {userOpen && (
                <div className="menu menuRight">
                  <div className="menuHeader">
                    <div className="menuHeaderTitle">
                      {props.loggedInUser.company_name}
                    </div>
                    <div className="menuHeaderSub">
                      {props.loggedInUser.first_name}{" "}
                      {props.loggedInUser.last_name}
                    </div>
                  </div>
                  <div className="menuSep" />
                  <a className="menuItem danger" href="/users/logout/">
                    Logout
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="drawer" onClick={() => setMobileOpen(false)}>
            <div
              className="drawerInner"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="drawerTop">
                <div className="drawerTitle">Menu</div>
                <button
                  className="iconbtn"
                  onClick={() => setMobileOpen(false)}
                  type="button"
                  aria-label="Close menu"
                >
                  ✕
                </button>
              </div>

              <div className="drawerSection">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    cx("drawerItem", isActive && "active")
                  }
                >
                  Home
                </NavLink>

                {canSearch && (
                  <button
                    type="button"
                    className="drawerItem drawerBtn"
                    onClick={(e) => {
                      e.preventDefault();
                      openSearch(e);
                    }}
                  >
                    Search
                  </button>
                )}
              </div>

              {modules.length > 0 && (
                <div className="drawerSection">
                  <div className="drawerLabel">Modules</div>
                  {modules.map((m) => (
                    <NavLink
                      key={m.to}
                      to={m.to}
                      className={({ isActive }) =>
                        cx("drawerItem", isActive && "active")
                      }
                    >
                      {m.label}
                    </NavLink>
                  ))}
                </div>
              )}

              <div className="drawerSection">
                <a className="drawerItem danger" href="/users/logout/">
                  Logout
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

const Search = ({ setOpen }) => {
  const [results, setResults] = useState([]);

  const onSubmit = async (values, actions) => {
    const url = API_URLS[values.entity];
    try {
      const params = getParams({ ...values, entity: values.entity });
      const response = await axios.get(url, { params });
      setResults(response.data);
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error") {
        actions.setErrors({ responseStatus: "Network Error" });
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        actions.setErrors({
          responseStatus: error.response.status,
          ...error.response.data,
        });
      } else {
        actions.setErrors({ responseStatus: error.response?.status });
      }
    }
  };

  const handleOnChange = (event) => {
    if (event.target.name === "entity") setResults([]);
  };

  return (
    <Modal open={true} setOpen={setOpen} title={"Search"}>
      <Formik initialValues={{ query: "", entity: "CLIENTS" }} onSubmit={onSubmit}>
        {({ errors, values, isSubmitting }) => (
          <Form onChange={handleOnChange}>
            <NonFieldErrors errors={errors}>
              <div className="create_modal_container">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    rowGap: "1.25rem",
                    fontSize: "0.8125rem",
                  }}
                >
                  <div>
                    <CustomSelect label="Search" name="entity" required>
                      <option value="CLIENTS">Search Clients</option>
                      <option value="GROUPS">Search Groups</option>
                      <option value="LOAN">Search Loans</option>
                      <option value="PAYMENT">Search Payments</option>
                      <option value="JOURNAL">Search Journal</option>
                    </CustomSelect>
                    <CustomInput label="Search text" name="query" type="text" required />
                  </div>

                  <div>
                    <ul className="searchList">
                      {results.map((result, index) => (
                        <li key={index} className="searchItem">
                          <Link
                            onClick={() => setOpen(null)}
                            to={ROUTES[values.entity].replace("{value}", result.value)}
                          >
                            {result.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <ModalSubmit isSubmitting={isSubmitting} setOpen={setOpen} />
              </div>
            </NonFieldErrors>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

const TOP_Z_INDEX = 2147483647;
const BACKDROP_Z_INDEX = 2147483646;

const Login = ({ email, setOpen, modalRef }) => {
  const onSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        "/users/login/",
        { username: email, password: values.password },
        {
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (
        typeof response.data === "string" &&
        response.data.includes("Please enter a correct email and password")
      ) {
        actions.setErrors({
          responseStatus: 400,
          detail:
            "Please enter a correct password. Note that the field may be case-sensitive.",
        });
        return;
      }

      modalRef.current = null;
      setOpen(null);
    } catch (error) {
      console.log(error);
      if (error.message === "Network Error") {
        actions.setErrors({ responseStatus: "Network Error" });
      } else if (error.response?.status >= 400 && error.response?.status < 500) {
        actions.setErrors({
          responseStatus: error.response.status,
          ...error.response.data,
        });
      } else {
        actions.setErrors({ responseStatus: error.response?.status });
      }
    }
  };

  // Ensure your template has: <div id="modal-root"></div>
  const modalRoot =
    typeof document !== "undefined" ? document.getElementById("modal-root") : null;

  // Lock page scroll while this session modal is open
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  if (!modalRoot) return null;

  return createPortal(
    <div className="login-modal">
      {/* Backdrop */}
      <div
        className="modal-backdrop fade show"
        style={{
          position: "fixed",
          inset: 0,
          background: "var(--modal-background)",
          zIndex: BACKDROP_Z_INDEX,
        }}
      />

      {/* Modal */}
      <div
        className={"modal fade show"}
        style={{
          top: "4rem",
          display: "block",
          zIndex: TOP_Z_INDEX,
        }}
      >
        <div
          className="modal-dialog modal-lg modal-dialog-scrollable"
          style={{ height: "calc(100% - 7rem)" }}
        >
          <div className="modal-content">
            <div className="modal-body text-light">
              <Formik initialValues={{ password: "" }} onSubmit={onSubmit}>
                {({ errors, isSubmitting }) => (
                  <Form>
                    <NonFieldErrors errors={errors}>
                      <div />
                    </NonFieldErrors>

                    <div className="create_modal_container">
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          rowGap: "1.25rem",
                          position: "relative",
                          top: "33%",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            rowGap: "1rem",
                          }}
                        >
                          <div className="login__session__message">
                            Session expired. Please enter your password to continue.
                          </div>

                          <div className="row custom-background">
                            <CustomPasswordInput
                              label="Password"
                              name="password"
                              type="password"
                              placeholder="Password"
                              required
                            />
                          </div>

                          <div style={{ display: "grid" }}>
                            {isSubmitting ? (
                              <button
                                className="btn btn-info"
                                type="submit"
                                style={{ pointerEvents: "none", opacity: "0.7" }}
                                disabled
                              >
                                <i className="fa fa-spinner fa-spin" /> Please wait..
                              </button>
                            ) : (
                              <button className="btn btn-info" type="submit">
                                Login
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>,
    modalRoot
  );
};

export default NavbarModern;
