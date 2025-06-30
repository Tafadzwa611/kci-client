import React from 'react';
import { SuccessBtn } from '../../../common';
import AddTemplate from './AddTemplate';

function ReportFields({columns, savedTemplates, setOpen, reportType}) {
    const [view, setView] = React.useState('list');
    const [templates, setTemplates] = React.useState(savedTemplates);

    return (
        <div className={open ? 'modal fade show' : 'modal fade'} style={{display: open ? 'block' : 'none'}}>
            <div className='modal-dialog modal-xl modal-dialog-scrollable' style={{maxWidth:'calc(100% - 3rem)', height:'calc(100% - 7rem)', top:'3.8rem'}}>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <span style={{fontWeight:'600'}}>Report Fields</span>
                        <button type='button' className='close' onClick={() => setOpen(false)}><span aria-hidden='true'>&times;</span></button>
                    </div>
                    <div className='modal-body'>
                        {{
                            'list': <TemplatesTable templates={templates} setView={setView}/>,
                            'add': <AddTemplate reportType={reportType} columns={columns} setView={setView}/>,
                        }[view]}
                    </div>
                    <div className='modal-footer justify-content-between'>
                        <button type='button' className='btn btn-default' onClick={() => setOpen(false)}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

function TemplatesTable({templates, setView}) {
    return (
        <>
            <SuccessBtn handler={() => setView('add')} value={'Add Template'}/>
            <div className='row'>
                <div className='col-12'>
                    <div>
                        <div className='table-responsive p-0' style={{maxHeight: '600px', marginTop:"1rem"}}>
                            <table className='table' id='ageing_analyis_report'>
                                <thead>
                                    <tr className="journal-details header" style={{position:'sticky', top:'0'}}>
                                        <th>Report_Name</th>
                                        <th>Report_Type</th>
                                        <th>Entry_Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {templates.map(template => {
                                        return (
                                            <tr className='tr-class' key={template.id}>
                                                <td>{template.report_name}</td>
                                                <td>{template.report_type}</td>
                                                <td>{template.entry_date}</td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ReportFields;