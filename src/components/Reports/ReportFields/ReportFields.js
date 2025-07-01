import React from 'react';
import AddTemplate from './AddTemplate';
import TemplatesTable from './TemplatesTable';
import EditTemplate from './EditTemplate';
import DeleteTemplate from './DeleteTemplate';
import { Modal } from '../../../common';

function ReportFields({columns, templates, setTemplates, setOpen, reportType}) {
    const [view, setView] = React.useState('list');
    const [templateIdEdit, setTemplateIdEdit] = React.useState(null);
    const [templateIdDelete, setTemplateIdDelete] = React.useState(null);

    React.useEffect(() => {
        if (!templateIdEdit) return;
        setView('edit');
    }, [templateIdEdit]);

    React.useEffect(() => {
        if (!templateIdDelete) return;
        setView('delete');
    }, [templateIdDelete]);

    return (
        <Modal open={true} setOpen={setOpen} title='Report Fields'>
            {{
                'list': <TemplatesTable templates={templates} setView={setView} setTemplateIdEdit={setTemplateIdEdit} setTemplateIdDelete={setTemplateIdDelete}/>,
                'add': <AddTemplate reportType={reportType} columns={columns} setView={setView} setTemplates={setTemplates}/>,
                'edit': <EditTemplate templateId={templateIdEdit} setTemplateIdEdit={setTemplateIdEdit} reportType={reportType} columns={columns} setView={setView} setTemplates={setTemplates}/>,
                'delete': <DeleteTemplate templateId={templateIdDelete} setTemplateIdDelete={setTemplateIdDelete} setView={setView} setTemplates={setTemplates}/>
            }[view]}
        </Modal>
    )
}

export default ReportFields;