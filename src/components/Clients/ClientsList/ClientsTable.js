import React from "react";
import Client from "../ClientsDetails/Client";
import { Modal } from '../../../common';
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Fetcher } from "../../../common";
import Pager from "./Pager";

function ClientsTable({ clientId, setClientId, clientsData, params, setClientsData, units }) {
  const [mobileClientId, setMobileClientId] = React.useState(null);

  const handleClick = (e) => {
    const id = e.currentTarget.id;

    if (window.innerWidth <= 900) {
      setMobileClientId(id);
      return;
    }

    setClientId(id);
  };

  const close = () => setClientId(null);
  const closeMobileModal = () => setMobileClientId(null);

  const urls = [
    `/clientsapi/get_client/${clientId}/`,
    "/clientsapi/client_controls/",
    "/usersapi/staff/?loan_officers_only=1&status=all",
    "/usersapi/staff_toplevel_perms/",
  ];

  const mobileUrls = [
    `/clientsapi/get_client/${mobileClientId}/`,
    "/clientsapi/client_controls/",
    "/usersapi/staff/?loan_officers_only=1&status=all",
    "/usersapi/staff_toplevel_perms/",
  ];

  return (
    <>
      <TableHeader clientsData={clientsData} setClientsData={setClientsData} params={params} />

      {clientId ? (
        <div className="table-container journal__table font-12 clients-table-wrap">
          <div className="table-responsive journal__table-container-journals">
            <MiniTable clients={clientsData.clients} handleClick={handleClick} clientId={clientId} />
            <Fetcher urls={urls} extra={{ close }}>
              {({ data, extra }) => (
                <Client
                  clientData={data[0]}
                  clientControls={data[1]}
                  staff={data[2]}
                  staffTopLevelPerm={data[3]}
                  units={units}
                  close={extra.close}
                />
              )}
            </Fetcher>
          </div>
        </div>
      ) : (
        <div className="table-container full__width font-12 clients-table-wrap">
          <div className="table-responsive full__table">
            <MainTable clientsData={clientsData} handleClick={handleClick} />
          </div>
        </div>
      )}

      <Modal
        open={!!mobileClientId}
        setOpen={closeMobileModal}
        title="Client Details"
      >
        {mobileClientId ? (
          <Fetcher urls={mobileUrls} extra={{ close: closeMobileModal }}>
            {({ data, extra }) => (
              <Client
                clientData={data[0]}
                clientControls={data[1]}
                staff={data[2]}
                staffTopLevelPerm={data[3]}
                units={units}
                close={extra.close}
              />
            )}
          </Fetcher>
        ) : null}
      </Modal>
    </>
  );
}

const TableHeader = ({ clientsData, params, setClientsData }) => {
  return (
    <div className="table-header clients-table-header">
      <div className="clients-table-header-left">
        <Pager
          nextPageNumber={clientsData.next_page_num}
          params={params}
          prevPageNumber={clientsData.prev_page_num}
          setClientsData={setClientsData}
        />
        <div className="clients-table-meta">
          Showing {clientsData.clients.length} of {clientsData.count} clients.
        </div>
      </div>

      <div className="clients-table-header-right">
        <div className="clients-table-meta">
          Page {clientsData.number} of {clientsData.num_of_pages}
        </div>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="btn btn-default clients-xls-btn"
          table="clients"
          filename="clients"
          sheet="tablexls"
          buttonText="Download as XLS"
        />
      </div>
    </div>
  );
};

const MiniTable = ({ clients, handleClick, clientId }) => {
  return (
    <div className="clients-mini-table">
      <div className="clients-table-scroll">
        <div className="table__height">
          <table className="table" id="clients">
            <thead>
              <tr className="journal-details header clients-sticky-head">
                <th className="clients-th-left">Full_Name</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <button
                      type="button"
                      onClick={handleClick}
                      id={client.id}
                      className={`clients-mini-link ${String(clientId) === String(client.id) ? "is-active" : ""}`}
                    >
                      {client.fullname}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const MainTable = ({ clientsData, handleClick }) => {
  return (
    <div className="clients-main-table">
      <div className="clients-table-scroll">
        <div className="table__height">
          <table className="table" id="clients">
            <thead>
              <tr className="journal-details header clients-sticky-head">
                <th className="clients-th-left">Client_Number</th>
                <th className="clients-th-left">Full_Name</th>
                <th className="clients-th-left">Type_Of_client</th>
                <th className="clients-th-left">Contact</th>
                <th className="clients-th-left">Gender</th>
                <th className="clients-th-left">Registration_Date</th>
                <th className="clients-th-left">Date_Of_Birth</th>
                <th className="clients-th-left">Branch</th>
              </tr>
            </thead>
            <tbody>
              {clientsData.clients.map((client) => (
                <tr key={client.id}>
                  <td>
                    <button type="button" onClick={handleClick} id={client.id} className="clients-cell-link">
                      {client.client_id}
                    </button>
                  </td>
                  <td>{client.fullname}</td>
                  <td>{client.type_of_client}</td>
                  <td>{client.phone_number}</td>
                  <td>{client.gender}</td>
                  <td>{client.db_registration_date}</td>
                  <td>
                    {client.db_date_of_birth}{" "}
                    <em>
                      ({client.age_year} years, {client.age_month} month(s))
                    </em>
                  </td>
                  <td>{client.branch_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ClientsTable;