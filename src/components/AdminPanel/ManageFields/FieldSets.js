import React, {useState} from 'react';
import CreateFieldSet from './CreateFieldSet';
import EditFieldSet from './EditFieldSet';
import DeleteFieldSet from './DeleteFieldSet';
import FieldList from './FieldList';
import { Fetcher, SuccessBtn, DeleteBtn, EditBtn, Select } from '../../../common';

const FieldSets = ({data}) => {
  const [fieldSets, setFieldSets] = useState(data);
  const [fieldSetId, setFieldSetId] = useState('');
  const [openCreateFieldSetModal, setOpenCreateFieldSetModal] = useState(false);
  const [openEditFieldSetModal, setOpenEditFieldSetModal] = useState(false);
  const [openDeleteFieldSetModal, setOpenDeleteFieldSetModal] = useState(false);

  return (
    <>
      <SuccessBtn handler={(evt) => setOpenCreateFieldSetModal(true)} value={'Add Form'}/>
      <CreateFieldSet open={openCreateFieldSetModal} setOpen={setOpenCreateFieldSetModal} setFieldSets={setFieldSets}/>
      <Select value={fieldSetId} onChange={(evt) => setFieldSetId(evt.target.value)}>
        <option value=''>------</option>
        {fieldSets.map(fieldSet => <option key={fieldSet.id} value={fieldSet.id}>{fieldSet.name}</option>)}
      </Select>
      {fieldSetId != '' &&
        <>
          <EditBtn handler={(evt) => setOpenEditFieldSetModal(true)}/>
          <DeleteBtn handler={(evt) => setOpenDeleteFieldSetModal(true)}/>
          <EditFieldSet
            key={JSON.stringify(fieldSets.find(fs => fs.id == fieldSetId))}
            open={openEditFieldSetModal}
            setOpen={setOpenEditFieldSetModal}
            fieldSet={fieldSets.find(fs => fs.id == fieldSetId)}
            setFieldSets={setFieldSets}
          />
          <DeleteFieldSet
            key={fieldSetId}
            open={openDeleteFieldSetModal}
            setOpen={setOpenDeleteFieldSetModal}
            fieldSetId={fieldSetId}
            setFieldSets={setFieldSets}
          />
          <Fetcher url={`/usersapi/list_fields/?field_set_id=${fieldSetId}`} method={'get'}>
            {({data}) => <FieldList data={data} fieldSetId={fieldSetId}/>}
          </Fetcher>
        </>
      }
    </>
  )
}

export default FieldSets;