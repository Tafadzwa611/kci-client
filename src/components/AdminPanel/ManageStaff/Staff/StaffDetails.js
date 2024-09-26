import React, {useState} from 'react';
import { Fetcher } from '../../../../common';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function StaffDetails() {
  const [tab, setTab] = useState('users__toplevelperms');

  const params = useParams();
  return (
    <Fetcher urls={[`/usersapi/user_details/${params.staffId}/`]}>
      {({data}) => (
        <>
          <div style={{marginBottom:'20px'}}>
            <button type='button' className='btn btn-default max'>
              <Link to='/users/admin/staff'>Back</Link>
            </button>
          </div>
          <div className='search_background' style={{padding:'20px'}}>
            <div>
              <div style={{display:'flex', justifyContent:'space-between', marginBottom:'1rem'}}>
                <>
                  <button className='btn btn-olive'>
                    <Link to={`/users/admin/staff/editstaff/${data[0].id}`}>Edit</Link>
                  </button>
                  <button className='btn btn-olive'>
                    <Link to={`/users/admin/staff/updateperms/${data[0].id}`}>Edit Permissions</Link>
                  </button>
                </>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr 1fr'}}>
                <div>
                  <div style={{margin:'1rem 0', display:'flex', justifyContent:'space-between'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                      <span style={{marginRight:'5px'}}><b>Staff Information</b></span>
                    </div>
                  </div>
                  <div style={{margin:'1rem 0', display:'flex', justifyContent:'space-between'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                      <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
                        <li>Name: {data[0].first_name} {data[0].last_name}</li>
                        <li>Email: {data[0].email}</li>
                        <li>Role: {data[0].staff_role}</li>
                        <li>Branch: {data[0].branch_name}</li>
                        <li>Is Active: {`${data[0].is_active}`}</li>
                        <li>Is Loan Officer: {`${data[0].is_loan_officer}`}</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div>
                  <div style={{margin:'1rem 0', display:'flex', justifyContent:'space-between'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                      <span style={{marginRight:'5px'}}><b>Branch Access</b></span>
                    </div>
                  </div>
                  {data[0].branch_access.map(branch => <div key={branch.id} style={{marginRight:'5px'}}>{branch.name}</div>)}
                </div>
                <div>
                  <div style={{margin:'1rem 0', display:'flex', justifyContent:'space-between'}}>
                    <div style={{display:'flex', alignItems:'center'}}>
                      <span style={{marginRight:'5px'}}><b>Notifications</b></span>
                    </div>
                  </div>
                  {data[0].notification_types.map(notification_type => <div key={notification_type} style={{marginRight:'5px'}}>{notification_type}</div>)}
                </div>
              </div>
            </div>
            <div style={{margin:'1rem 0', display:'flex', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <span style={{marginRight:'5px'}}><b>Permissions</b></span>
              </div>
            </div>
            <div className='bloc-tabs'>
              <button className={tab === 'users__toplevelperms' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('users__toplevelperms')}>Module Level Permissions</button>
              <button className={tab === 'clients__client' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('clients__client')}>Clients</button>
              <button className={tab === 'clients__group' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('clients__group')}>Groups</button>
              <button className={tab === 'loans__loan' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('loans__loan')}>Loans</button>
              <button className={tab === 'otherincome__otherincome' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('otherincome__otherincome')}>Other Income</button>
              <button className={tab === 'reports__dataexportreport' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('reports__dataexportreport')}>Data Export</button>
              <button className={tab === 'reports__rightssupport' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('reports__rightssupport')}>Reports</button>
              <button className={tab === 'admin_perms' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('admin_perms')}>Admin</button>
              <button className={tab === 'expenses__expense' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('expenses__expense')}>Expenses</button>
              <button className={tab === 'accounting__generalledgeraccount' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('accounting__generalledgeraccount')}>
                Accounting
              </button>
              <button className={tab === 'accounting__journal' ? 'tabs-client active-tabs' : 'tabs-client'} onClick={() => setTab('accounting__journal')}>Journal</button>
            </div>
            <div className='tab-content font-12' style={{marginTop: '3rem'}}>
              <PermList perms={data[0].perms[tab]}/>
            </div>
          </div>
        </>
      )}
    </Fetcher>
  )
}

const PermList = ({perms}) => {
  if (!perms)return null;
  return (
    <div>
      <ul style={{display:'flex', flexDirection:'column', rowGap:'10px'}}>
        {perms.map((perm, idx) => <li key={perm.id}>{idx+1}. {perm.name}</li>)}
      </ul>
    </div>
  )
}

export default StaffDetails;
