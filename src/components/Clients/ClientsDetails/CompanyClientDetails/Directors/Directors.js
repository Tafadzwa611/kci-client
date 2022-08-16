
import React, {useState} from 'react';
import Row from './Row';
import AddDirector from './AddDirector';

function Directors({directors, business, setDirectors}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div style={{marginBottom:"1.5rem"}}>
          <button type='button' className='btn btn-success' onClick={(e) => setOpenModal(curr => !curr)}
              >Add Director
          </button>
      </div>
      <AddDirector businessId={business.id} setDirectors={setDirectors} open={openModal} setOpen={setOpenModal}/>
      <table className='table'>
        <thead>
          <tr className="client__address__table">
            <th className="table-head-dark-color">First Name</th>
            <th className="table-head-dark-color">Last Name</th>
            <th className="table-head-dark-color">Gender</th>
            <th className="table-head-dark-color">Phone Number</th>
            <th className="table-head-dark-color">Identification Number</th>
            <th className="table-head-dark-color">Date of Birth</th>
            <th className="table-head-dark-color">Action</th>
          </tr>
        </thead>
        <tbody>
          {directors.length > 0 ? directors.map((director, idx) => <Row key={idx} director={director} setDirectors={setDirectors}/>):
          <tr><td colSpan={10} style={{textAlign: 'center'}}>No data in table.</td></tr>}
        </tbody>
      </table>
    </>
  )
}

export default Directors;