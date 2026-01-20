import React from 'react';

function Forms({custom_forms}) {
  return (
    <div style={{marginTop:'1rem'}}>
      <div className="miniLoanDetails-container" style={{padding:'1.5rem'}}>
        <table className="table">
          <tbody>
            <tr className="journal-details header">
              <th>Form Name</th>
              <th>Required On</th>
              <th>Ask In Clients Portal</th>
            </tr>
            {custom_forms.map(custom_form => {
              return (
                <tr key={custom_form.id}>
                  <td>{custom_form.custom_field_set_name}</td>
                  <td>{custom_form.required_on}</td>
                  <td>{custom_form.ask_in_clients_portal ? 'Yes' : 'No'}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Forms;