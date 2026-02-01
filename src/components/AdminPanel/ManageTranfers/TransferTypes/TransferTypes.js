import React from "react";
import { Fetcher } from "../../../../common";

function TransferTypes() {
  const formatAccount = (a) => {
    if (a == null) return "";
    if (typeof a === "number" || typeof a === "string") return String(a);

    const base = a.label ?? `${a.general_ledger_name ?? ""} - ${a.general_ledger_code ?? ""}`.trim();
    const branch = a.branch_name ?? a.branch?.name ?? a.branch; // supports string/object/id
    return branch ? `${base} (${branch})` : base;
  };

  return (
    <Fetcher urls={["/acc-api/transfer-types/"]}>
      {({ data }) => {
        const transferTypes = data?.tranfertypes ?? data?.[0] ?? [];

        return (
          <div style={{ padding: "0", border: "none", marginTop: "20px" }} className="table-container full__width font-12">
            <div className="full__table">
              <div className="table-responsive">
                <div className="table__height">
                  <table className="table">
                    <tbody>
                      <tr className="journal-details header" style={{ position: "sticky", top: 0 }}>
                        <th>Transfer_Type_Name</th>
                        <th>Receiving_Accounts</th>
                        <th>Sending_Accounts</th>
                      </tr>

                      {transferTypes.map((transfer_type) => (
                        <tr key={transfer_type.id}>
                          <td>
                              {transfer_type.name}
                          </td>

                          <td>
                            {(transfer_type.receiving_accounts || []).map(formatAccount).filter(Boolean).join(", ")}
                          </td>

                          <td>
                            {(transfer_type.sending_accounts || []).map(formatAccount).filter(Boolean).join(", ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      }}
    </Fetcher>
  );
}

export default TransferTypes;
