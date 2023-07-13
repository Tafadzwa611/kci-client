import React from 'react';
import { Fetcher } from '../../../../common';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function BranchDetails() {
  const params = useParams();

  return (
    <Fetcher urls={[`/usersapi/get_branch/${params.branchId}/`]}>
      {({data}) => (
        <>
          <div style={{marginBottom:'20px'}}>
            <button type='button' className='btn btn-default max'>
              <Link to='/users/admin/managebranches'>Back</Link>
            </button>
          </div>
          <div className='search_background' style={{padding:'20px'}}>
            <div>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <>
                  <button className='btn btn-olive'>
                    <Link to={`/users/admin/managebranches/editbranch/${data[0].id}`}>Edit</Link>
                  </button>
                </>
              </div>
            </div>
            <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', marginTop:'1.5rem'}}>
              <div>
                <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
                  <li>Name: {data[0].name}</li>
                  <li>Geographical Location: {data[0].geographical_location}</li>
                  <li>Branch Code: {data[0].branch_code}</li>
                  <li>Date Of Opening: {data[0].date_of_opening}</li>
                  <li>Loan Products:{data[0].products.map(br => ` ${br.name},`)}</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </Fetcher>
  )
}

export default BranchDetails;