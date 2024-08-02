import React, {useState} from 'react';
import CreateFieldSet from './CreateFieldSet';
import EditFieldSet from './EditFieldSet';
import DeleteFieldSet from './DeleteFieldSet';
import FieldList from './FieldList';
import ChangeListingOrder from './ChangeListingOrder';
import { Fetcher, SuccessBtn, DeleteBtn, EditBtn, Select } from '../../../common';

const FieldSets = ({data, entityType, clientTypes}) => {
  const [fieldSets, setFieldSets] = useState(data);
  const [fieldSetId, setFieldSetId] = useState('');
  const [openCreateFieldSetModal, setOpenCreateFieldSetModal] = useState(false);
  const [openEditFieldSetModal, setOpenEditFieldSetModal] = useState(false);
  const [openDeleteFieldSetModal, setOpenDeleteFieldSetModal] = useState(false);
  const [openChangeModal, setOpenChangeModal] = useState(false);

  return (
    <>
      <SuccessBtn handler={() => setOpenCreateFieldSetModal(true)} value={'Add Form'}/>
      <CreateFieldSet open={openCreateFieldSetModal} setOpen={setOpenCreateFieldSetModal} setFieldSets={setFieldSets} entityType={entityType} clientTypes={clientTypes}/>
      <div style={{width:"33%"}}>
        <Select value={fieldSetId} onChange={(evt) => setFieldSetId(evt.target.value)}>
          <option value=''>------</option>
          {fieldSets.map(fieldSet => <option key={fieldSet.id} value={fieldSet.id}>{fieldSet.name}</option>)}
        </Select>
      </div>
      {fieldSets.some(fs => fs.id == fieldSetId) != '' &&
        <>
          <div style={{marginTop:"20px"}}>
            <button
              onClick={() => setOpenChangeModal(true)} 
              style={{background: "#1bbf5f", color:"#fff", border:"none", borderRadius:".15rem", cursor:"pointer", padding:".2rem .25rem", fontSize: "0.75rem"}}
            >
              Change Listing Order
            </button>
            <EditBtn handler={() => setOpenEditFieldSetModal(true)}/>
            <DeleteBtn handler={() => setOpenDeleteFieldSetModal(true)}/>
          </div>
          {openChangeModal &&
          <Fetcher urls={[`/usersapi/list_fields/?field_set_id=${fieldSetId}`]}>
            {({data}) => (
              <ChangeListingOrder fields={data[0]} open={openChangeModal} setOpen={setOpenChangeModal} fieldSetId={fieldSetId}/>
            )}
          </Fetcher>}
          <EditFieldSet
            key={JSON.stringify(fieldSets.find(fs => fs.id == fieldSetId))}
            open={openEditFieldSetModal}
            setOpen={setOpenEditFieldSetModal}
            fieldSet={fieldSets.find(fs => fs.id == fieldSetId)}
            setFieldSets={setFieldSets}
          />
          {openDeleteFieldSetModal && <DeleteFieldSet
            key={fieldSetId}
            setOpen={setOpenDeleteFieldSetModal}
            fieldSetId={fieldSetId}
            setFieldSets={setFieldSets}
          />
          }
          <Fetcher urls={[`/usersapi/list_fields/?field_set_id=${fieldSetId}`]}>
            {({data}) => <FieldList data={data[0]} fieldSetId={fieldSetId}/>}
          </Fetcher>
        </>
      }
    </>
  )
}

export default FieldSets;