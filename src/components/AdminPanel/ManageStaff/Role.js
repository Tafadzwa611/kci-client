import React, { useState } from 'react';
import { Fetcher } from '../../../common';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Role() {
  const [tab, setTab] = useState('clients__client');

  const params = useParams();

  return (
    <Fetcher urls={[`/usersapi/get_staff_role/${params.roleId}/`, '/usersapi/perms_list_api/']}>
      {({data}) => (
        <>
          <div>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <>
                <button className='btn btn-olive'>
                  <Link to={`/users/admin/staff/editrole/${data[0].id}`}>Edit</Link>
                </button>
              </>
            </div>
            <div style={{margin:'1rem 0', display:'flex', justifyContent:'space-between'}}>
              <div style={{display:'flex', alignItems:'center'}}>
                <span style={{marginRight:'5px'}}><b>Role Name: {data[0].name}</b></span>
              </div>
            </div>
          </div>
          <div className='bloc-tabs'>
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

export default Role;