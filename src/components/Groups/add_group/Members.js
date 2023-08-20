import React from 'react';
import { CustomSelect, ButtonDefault, ButtonSuccess, CustomSelectRemote } from '../../../common';
import { uuidv4 } from '../../../utils';

function Member({id, index, selectedMember, setFieldValue, members, groupRoles}) {
  const setMember = (fieldName, selected) => {
    setFieldValue(fieldName, {...selectedMember, client_id: selected.value, fullname: selected.label});
  }

  const remove = (evt) => {
    evt.preventDefault();
    const newMembers = members.filter(member => !(member.id === id));
    setFieldValue('members', newMembers);
  }

  return (
    <>
      <CustomSelectRemote
        label='Group Member'
        url='/clientsapi/search_client/'
        setFieldValue={setMember}
        selected={selectedMember.client_id ? {value: selectedMember.client_id, label: selectedMember.fullname} : ''}
        queryParamName='query'
        placeholder='Search Client'
        name={`members[${index}]`}
        required
      />
      <CustomSelect label='Group Member Role' name={`members[${index}].role_id`} required>
        <option value=''>------</option>
        {groupRoles.map(grprle => <option key={grprle.id} value={grprle.id}>{grprle.name}</option>)}
      </CustomSelect>
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
    setFieldValue('members', [...members, {client_id: '', role_id: '', id: memberId}]);
  }

  return (
    <div style={{marginTop:'10px'}}>
      <ButtonSuccess value={'Add Member'} handler={(evt) => add(evt)} />
    </div>
  )
}

export {Member, AddMember};