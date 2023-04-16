import React, { useState, useEffect } from 'react';
import MainTable from './MainTable';
import MiniTable from './MiniTable';
import MiniGroupDetails from './MiniGroupDetails';
import { Fetcher } from '../../../common';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

function Table({groupData, setGroupDetails, groupDetails, groupId, setGroupId, setGroupsData}) {
  const [selectedGroupId, setSelectedGroupId] = useState(null);


  const handleClick = (e) => {
    setGroupId(e.target.id);
    setSelectedGroupId(e.target.id);
  }

  return (
    <>
      {groupId ?
        <div className='table-header'>
          <div>
            Showing {groupData.groups.length} of {groupData.count} groups.
          </div>
        </div>
      :
        <div className='table-header'>
          <div>
            Showing {groupData.groups.length} of {groupData.count} groups.
          </div>
          <div>
            <ReactHTMLTableToExcel
              id='test-table-xls-button'
              className='btn btn-default'
              table='groups'
              filename='groups'
              sheet='tablexls'
              buttonText='Download as XLS'
            />
          </div>
        </div>
      }
      <div style={{padding:"0", border:"none"}} className={groupId ? 'table-container journal__table font-12' :'table-container full__width font-12'}>
        <div className={groupId ? "table-responsive journal__table-container-journals" : "table-responsive full__table"} >
          {groupId ?
            <MiniTable 
              groupData={groupData} 
              handleClick={handleClick} 
              selectedGroupId={selectedGroupId}
            /> :
            <MainTable 
              groupData={groupData} 
              handleClick={handleClick}
            />
          }
          {groupId &&
          <Fetcher urls={[`/clientsapi/group/${groupId}/`]} extra={{groupDetails, setGroupDetails, setGroupId, setGroupsData}}>
            {({data, extra}) => <MiniGroupDetails groupData={data[0]} extra={extra} />}
          </Fetcher>
          }
        </div>
      </div>
    </>
  )
}

export default Table;
















































