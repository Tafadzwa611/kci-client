import React, {useState} from 'react';
import { CustomInput, CustomSelect, CustomCheckbox, ButtonDefault, ButtonSuccess, CustomSelectRemote } from '../../../common';
import { uuidv4 } from '../../../utils';
import {initialMemberValues} from './data';

function Member({id, index, selectedMember, setFieldValue, members, groupRoles}) {
    const setMember = (fieldName, selected) => {
        const u = members.map(member => {
            if (member.id === id) {
                member.client_id = selected.value;
                member.client_pk = selected.value;
                member.value = selected.value;
                member.label = selected.label;
            }
            return member
        })
        setFieldValue(fieldName, u);
    }

    const remove = (evt) => {
        evt.preventDefault();
        const newMembers = members.filter(member => {
            if (member.id === id) {
                return false
            }
            return true
        })
        setFieldValue('members', newMembers);
    }

  return (
    <>
        <CustomSelectRemote
            label='Group Member'
            url='/clientsapi/search_client/'
            setFieldValue={setMember}
            selected={selectedMember}
            queryParamName='query'
            placeholder='Search Client'
            name={`members[${index}].client_id`}
            required
        />
        <CustomSelect label='Group Member Role' name={`members[${index}].role_id`} required>
            <option value=''>------</option>
            {groupRoles.map(grprle => <option key={grprle.id} value={grprle.id}>{grprle.name}</option>)}
        </CustomSelect>
        <div>{id}</div>
        <div style={{marginTop:'10px'}}>
            <ButtonDefault value={'Remove Member'} handler={remove} />
        </div>
        <div className="divider divider-default" style={{padding: "1.25rem"}}></div>
    </>
  )
}

function AddMember({setFieldValue, members}) {
    const add = (evt) => {
        evt.preventDefault();
        const memberId = uuidv4();
        setFieldValue('members', [...members, {...initialMemberValues, id: memberId}]);
    }

    return (
        <div style={{marginTop:'10px'}}>
            <ButtonSuccess value={'Add Member'} handler={(evt) => add(evt)} />
        </div>
    )
}

export {Member, AddMember};