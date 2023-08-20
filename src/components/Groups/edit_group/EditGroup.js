import React from 'react';
import { useParams } from 'react-router-dom';
import { Fetcher } from '../../../common';
import EditGroupForm from './EditGroupForm';

function EditGroup({groupTypes, loanOfficers, groupRoles, clientControls}) {
  const params = useParams();

  return (
    <Fetcher urls={[`/clientsapi/group/${params.groupId}/`]}>
      {({data}) => (
        <EditGroupForm
          group={data[0]}
          groupTypes={groupTypes}
          loanOfficers={loanOfficers}
          groupRoles={groupRoles}
          clientControls={clientControls}
        />
      )}
    </Fetcher>
  )
}

export default EditGroup;