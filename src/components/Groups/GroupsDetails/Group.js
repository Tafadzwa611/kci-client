import React, {useState, useEffect} from 'react';
import { makeRequest } from '../../../utils/utils';
import MiniLoader from '../../Loader/MiniLoader';
import GDetails from './Details/GDetails';

function Group({selectedGroupID, setDetails}) {
    const [group, setGroup] = useState(null);
    const [userperms, setUserPerms] = useState(null);
    const [members, setMembers] = useState(null)

    useEffect(() => {
        getGroup(selectedGroupID);
    }, [selectedGroupID]);

    const getGroup = async () => {
        await fetchGroup();
    }

    async function fetchGroup() {
        try {
            const response = await makeRequest.get(`/clientsapi/group/${selectedGroupID}/`, {timeout: 8000});
            if (response.ok) {
                const json_res = await response.json();
                setMembers(json_res.members)
                setUserPerms(json_res.user_permissions);
                return setGroup(json_res);
            }else {
                const error = await response.json();
                console.log(error);
            }
        }catch(error) {
            console.log(error);
        }
    }

    if (group === null) {
        return <MiniLoader />
    }

    return (
        <>
            <GDetails
                group={group.group}
                setGroup={setGroup}
                members={members}
                setMembers={setMembers}
                groupId={selectedGroupID}
                userperms={userperms}
                setDetails={setDetails}
            />
        </>
    )
}

export default Group;