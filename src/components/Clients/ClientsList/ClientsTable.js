import React from 'react';
import { convertDate, getAge } from '../../Accounting/Journals/utils';
import Footer from './Footer';

function ClientsTable({clients, nextPageNumber, loadMoreClients, totalCount, loadingMore}) {

  const goToClientDetails = (evt) => {
    evt.preventDefault();
  }

  return (
    <>
        <div className='table-responsive font-12'>
            <table className='table table-centered table-hover'>
                <thead className="thead-light">
                    <tr>
                        <th style={{textAlign:"start"}}>Client_Number</th>
                        <th style={{textAlign:"start"}}>Full_Name</th>
                        <th style={{textAlign:"start"}}>Type_Of_client</th>
                        <th style={{textAlign:"start"}}>Contact</th>
                        <th style={{textAlign:"start"}}>Gender</th>
                        <th style={{textAlign:"start"}}>Registration_Date</th>
                        <th style={{textAlign:"start"}}>Date_Of_Birth</th>
                        <th style={{textAlign:"start"}}>Branch</th>
                    </tr>
                </thead>
                <tbody>
                  {clients.length > 0 ? clients.map(client => {
                    return (
                      <tr key={client.id}>
                        <td><a id={client.id} href='#' onClick={goToClientDetails}>{client.client_id}</a></td>
                        <td>{client.fullname}</td>
                        <td>{client.type_of_client}</td>
                        <td>{client.phone_number}</td>
                        <td>{client.gender}</td>
                        <td>{convertDate(client.registration_date)}</td>  
                        <td>{convertDate(client.date_of_birth)} <em>({getAge(client.date_of_birth)} years)</em></td>
                        <td>{client.branch}</td>
                      </tr>
                    )
                  }) : <tr><td colSpan={8} style={{textAlign: 'center'}}>No clients could be found.</td></tr>}
                </tbody>
            </table>
        </div>
        <Footer nextPageNumber={nextPageNumber} loadMoreClients={loadMoreClients} loadingMore={loadingMore}/>
    </>
  )
}

export default ClientsTable;