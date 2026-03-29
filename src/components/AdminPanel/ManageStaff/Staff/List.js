import React, {useState} from 'react';
import Filter from './Filter';
import Table from './Table';
import {
  Fetcher,
} from '../../../../common';


const List = () => {
  const [params, setParams] = useState(null);
  const [users, setUsers] = useState({count: 0, next_page_num: 0, users: []});

  return (
    <>
        <Fetcher urls={['/usersapi/staffroles/']}>
            {({data}) => (
                <>
                    <Filter roles={data[0]} setUsers={setUsers} setParams={setParams} />
                    <div style={{paddingTop: '2rem'}}></div>
                    <Table
                        users={users} 
                        setUsers={setUsers}
                        params={params}
                    />
                </>
            )}
        </Fetcher>
    </>
  )
}

export default List;