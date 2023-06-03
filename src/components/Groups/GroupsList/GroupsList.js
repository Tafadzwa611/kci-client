import React, {useState} from 'react';
import Filter from './Filter';
import GroupsTable from './GroupsTable';
import GroupDetails from './GroupDetails';
import { useSearchParams } from 'react-router-dom';
import { Fetcher } from '../../../common';

function GroupsList() {
  const [searchParams] = useSearchParams();
  const [params, setParams] = useState(null);
  const [groupData, setGroupsData] = useState({count: 0, next_page_num: 0, groups: []});
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupId, setGroupId] = useState(null);


  return (
    <>
      {searchParams.get('group_id') ?
        <GroupDetailsView 
          groupId={searchParams.get('group_id')} 
          groupDetails={groupDetails}
          setGroupDetails={setGroupDetails}
        /> :
        <>
          <Filter 
            setGroupsData={setGroupsData} 
            setGroupId={setGroupId} 
            setGroupDetails={setGroupDetails}
            setParams={setParams}
          />
          <div style={{paddingTop: '2rem'}}></div>
          <GroupsTable
            groupData={groupData} 
            setGroupDetails={setGroupDetails}
            groupId={groupId}
            groupDetails={groupDetails}
            setGroupId={setGroupId}
            setGroupsData={setGroupsData}
            params={params}
          />
        </>
      }
    </>
  )
}

const GroupDetailsView = ({groupId, groupDetails, setGroupDetails}) => {
  if (groupDetails) {
    return <GroupDetails groupDetails={groupDetails} setGroupDetails={setGroupDetails}/>
  }

  return (
    <Fetcher urls={[`/clientsapi/group/${groupId}/`]}>
      {({data}) => <GroupDetails groupApiData={data[0]} groupDetails={groupDetails} setGroupDetails={setGroupDetails}/>}
    </Fetcher>
  )
}

export default GroupsList;