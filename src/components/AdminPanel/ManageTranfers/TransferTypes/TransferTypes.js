import React from "react";
import { Fetcher } from "../../../../common";
import { Link } from "react-router-dom";
import DeleteTransferType from "./DeleteTransferType"; 

function TransferTypes() {
  return (
    <Fetcher urls={["/acc-api/transfer-types/"]}>
      {({ data }) => {
        const apiTransferTypes = data?.tranfertypes ?? data?.[0] ?? [];
        return <TransferTypesTable apiTransferTypes={apiTransferTypes} />;
      }}
    </Fetcher>
  );
}

function TransferTypesTable({ apiTransferTypes }) {
  const [transferTypes, setTransferTypes] = React.useState([]);
  const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
  const [selectedTransferTypeId, setSelectedTransferTypeId] = React.useState(null);

  React.useEffect(() => {
    setTransferTypes(Array.isArray(apiTransferTypes) ? apiTransferTypes : []);
  }, [apiTransferTypes]);

  const formatAccount = (a) => {
    if (a == null) return "";
    if (typeof a === "number" || typeof a === "string") return String(a);

    const base =
      a.label ??
      `${a.general_ledger_name ?? ""} - ${a.general_ledger_code ?? ""}`.trim();

    const branch = a.branch_name ?? a.branch?.name ?? a.branch;
    return branch ? `${base} (${branch})` : base;
  };

  const openDelete = (id) => {
    setSelectedTransferTypeId(id);
    setOpenDeleteModal(true);
  };

  const onDeleted = (deletedId) => {
    setTransferTypes((curr) => curr.filter((t) => t.id !== deletedId));
    setOpenDeleteModal(false);
    setSelectedTransferTypeId(null);
  };

  return (
    <>
      {openDeleteModal && selectedTransferTypeId != null && (
        <DeleteTransferType
          setOpenModal={setOpenDeleteModal}
          transfertypeId={selectedTransferTypeId}
          onDeleted={onDeleted}
        />
      )}

      <div
        style={{ padding: "0", border: "none", marginTop: "20px" }}
        className="table-container full__width font-12"
      >
        <div className="full__table">
          <div className="table-responsive">
            <div className="table__height">
              <table className="table">
                <tbody>
                  <tr
                    className="journal-details header"
                    style={{ position: "sticky", top: 0 }}
                  >
                    <th>Transfer_Type_Name</th>
                    <th>Receiving_Accounts</th>
                    <th>Sending_Accounts</th>
                    <th>Action</th>
                  </tr>

                  {transferTypes.map((transfer_type) => (
                    <tr key={transfer_type.id}>
                      <td>{transfer_type.name}</td>

                      <td>
                        {(transfer_type.receiving_accounts || [])
                          .map(formatAccount)
                          .filter(Boolean)
                          .join(", ")}
                      </td>

                      <td>
                        {(transfer_type.sending_accounts || [])
                          .map(formatAccount)
                          .filter(Boolean)
                          .join(", ")}
                      </td>

                      <td>
                        <div style={{ display: "flex", columnGap: "5px" }}>
                          <Link
                            to={`edittransfertype/${transfer_type.id}`}
                            className="badge badge-success"
                          >
                            edit
                          </Link>

                          <button
                            type="button"
                            className="badge badge-danger"
                            onClick={() => openDelete(transfer_type.id)}
                          >
                            delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}

                  {transferTypes.length === 0 && (
                    <tr>
                      <td colSpan={4} style={{ padding: "12px" }}>
                        No transfer types found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TransferTypes;

