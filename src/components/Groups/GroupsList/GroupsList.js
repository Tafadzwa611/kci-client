import React, {useState} from 'react';
import Filter from './Filter';
import GroupsTable from './GroupsTable';
import GroupDetails from './GroupDetails';
import { useSearchParams } from 'react-router-dom';
import { Fetcher } from '../../../common';

function GroupsList() {
  const [searchParams] = useSearchParams();
  const [groupData, setGroupsData] = useState({count: 0, next_page_num: 0, groups: []});
  const [groupDetails, setGroupDetails] = useState(null);
  const [groupId, setGroupId] = useState(null);


  return (
    <>
      {searchParams.get('group_id') ?
        <GroupDetailsView groupId={searchParams.get('group_id')} groupDetails={groupDetails}/> :
        <>
          <Filter 
            setGroupsData={setGroupsData} 
            setGroupId={setGroupId} 
            setGroupDetails={setGroupDetails}
          />
          <div style={{paddingTop: '2rem'}}></div>
          <GroupsTable
            groupData={groupData} 
            setGroupDetails={setGroupDetails}
            groupId={groupId}
            setGroupId={setGroupId}
          />
        </>
      }
    </>
  )
}

const GroupDetailsView = ({groupId, groupDetails}) => {
  if (groupDetails) {
    return <GroupDetails groupDetails={groupDetails}/>
  }

  return (
    <Fetcher urls={[`/clientsapi/group/${groupId}/`]}>
      {({data}) => <GroupDetails groupDetails={data[0]}/>}
    </Fetcher>
  )
}

export default GroupsList;