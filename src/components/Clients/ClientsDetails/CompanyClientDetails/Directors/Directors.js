
import React, {useState} from 'react';
import Row from './Row';
import AddDirector from './AddDirector';

function Directors({directors, business, setDirectors}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <div className='card-body'>
        <div className='row'>
          <div className='col-6'>
            <div className='pull-left'>
              <div className='btn-group-horizontal'>
                <button type='button' className='button button-success' onClick={(e) => setOpenModal(curr => !curr)}>Add Director</button>
              </div>
            </div>
          </div>
        </div>
        <AddDirector businessId={business.id} setDirectors={setDirectors} open={openModal} setOpen={setOpenModal}/>
        <div className='card-body table-responsive p-0' style={{marginTop: '15px'}}>
          <table className='table table-bordered table-head-fixed text-nowrap' width='100%'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Gender</th>
                <th>Phone Number</th>
                <th>Identification Number</th>
                <th>Date of Birth</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {directors.length > 0 ? directors.map((director, idx) => <Row key={idx} director={director} setDirectors={setDirectors}/>):
              <tr><td colSpan={10} style={{textAlign: 'center'}}>No data in table.</td></tr>}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Directors;