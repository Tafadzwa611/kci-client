import React, {useState} from 'react';
import { Table, SuccessBtn, EditBtn, DeleteBtn } from '../../../../common';
import CreateTemplate from './CreateTemplate';
import EditTemplate from './EditTemplate';
import DeleteTemplate from './DeleteTemplate';

const List = ({data}) => {
  const [templates, setTemplates] = useState(data);
  const [openCreateFieldModal, setOpenCreateFieldModal] = useState(false);
  const [openUpdateFieldModal, setOpenUpdateFieldModal] = useState(false);
  const [openDeleteFieldModal, setOpenDeleteFieldModal] = useState(false);
  const [templateId, setTemplateId] = useState();

  const openEditModal = (evt) => {
    setOpenUpdateFieldModal(true);
    setTemplateId(evt.target.attributes.id.value);
  }

  const openDeleteModal = (evt) => {
    setOpenDeleteFieldModal(true);
    setTemplateId(evt.target.attributes.id.value);
  }

  const headers = ['Name', 'Issuer', 'Template', 'Is Active', 'Action'];
  const rows = getTableRows(templates, openEditModal, openDeleteModal);

  return (
    <>
      <SuccessBtn value={'Add Template'} handler={_ => setOpenCreateFieldModal(true)}/>
      <CreateTemplate open={openCreateFieldModal} setOpen={setOpenCreateFieldModal} setTemplates={setTemplates}/>
      <Table rows={rows} headers={headers}/>
      {templates.some(template => template.id == templateId) &&
        <>
          <EditTemplate
            key={JSON.stringify(templates.find(tmp => tmp.id==templateId))}
            template={templates.find(tmp => tmp.id==templateId)}
            open={openUpdateFieldModal}
            setTemplates={setTemplates}
            setOpen={setOpenUpdateFieldModal}
          />
          {openDeleteFieldModal && 
            <DeleteTemplate
              key={templateId}
              setOpen={setOpenDeleteFieldModal}
              template={templates.find(tmp => tmp.id==templateId)}
              setTemplates={setTemplates}
            />
          }
        </>
      }
    </>
  )
}

const getTableRows = (templates, openEditModal, openDeleteModal) => {
  return templates.map(template => {
    return (
      <tr key={template.id}>
        <td>{template.id_type}</td>
        <td>{template.issuer}</td>
        <td>{template.template}</td>
        <td>{template.is_active ? 'Active': 'Not Active'}</td>
        <td>
          <EditBtn id={template.id} handler={openEditModal}/>
          <DeleteBtn id={template.id} handler={openDeleteModal}/>
        </td>
      </tr>
    )
  })
}

export default List;