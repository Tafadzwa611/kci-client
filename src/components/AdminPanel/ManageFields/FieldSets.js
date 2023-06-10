import React, {useState} from 'react';
import CreateFieldSet from './CreateFieldSet';
import EditFieldSet from './EditFieldSet';
import DeleteFieldSet from './DeleteFieldSet';
import FieldList from './FieldList';
import { Fetcher, SuccessBtn, DeleteBtn, EditBtn, Select } from '../../../common';

const FieldSets = ({data, entityType, clientTypes}) => {
  const [fieldSets, setFieldSets] = useState(data);
  const [fieldSetId, setFieldSetId] = useState('');
  const [openCreateFieldSetModal, setOpenCreateFieldSetModal] = useState(false);
  const [openEditFieldSetModal, setOpenEditFieldSetModal] = useState(false);
  const [openDeleteFieldSetModal, setOpenDeleteFieldSetModal] = useState(false);

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
            <EditBtn handler={() => setOpenEditFieldSetModal(true)}/>
            <DeleteBtn handler={() => setOpenDeleteFieldSetModal(true)}/>
          </div>
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