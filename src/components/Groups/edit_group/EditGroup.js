import React from 'react';
import { useParams } from 'react-router-dom';
import { Fetcher } from '../../../common';
import EditGroupForm from './EditGroupForm';

function EditGroup({groupTypes, loanOfficers, groupRoles}) {
    const params = useParams();

    return (
        <Fetcher urls={[`/clientsapi/group/${params.groupId}/`]}>
            {({data}) => <EditGroupForm group={data[0]} groupTypes={groupTypes} loanOfficers={loanOfficers} groupRoles={groupRoles}/>}
        </Fetcher>
    )
}

export default EditGroup;