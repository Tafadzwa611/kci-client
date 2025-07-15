import React from 'react';
import { SuccessBtn } from '../../../common';

function TemplatesTable({templates, setView, setTemplateIdEdit, setTemplateIdDelete}) {
    return (
        <>
            <SuccessBtn handler={() => setView('add')} value={'Add Template'}/>
            <div style={{padding:'0', border:'none'}} className='table-container full__width font-12'>
                <div className='full__table'>
                    <div className='table-responsive'>
                    <div className='table__height'>
                        <table className='table'>
                            <thead className='clients-report-table'>
                                <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                                    <th>Template Name</th>
                                    <th>Report_Type</th>
                                    <th>Date Created</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {templates.map((template, index) => {
                                    return (
                                    <tr key={index}>
                                        <td>{template.report_name}</td>
                                        <td>{template.report_type}</td>
                                        <td>{template.entry_date}</td>
                                        <td style={{display: 'flex', columnGap: '5px'}}>
                                            <span>
                                                <a className='badge badge-success' style={{cursor: 'pointer'}} onClick={() => setTemplateIdEdit(template.id)}>Edit</a>
                                            </span>
                                            <span>
                                                <a className='badge badge-danger' style={{cursor: 'pointer'}} onClick={() => setTemplateIdDelete(template.id)}>Delete</a>
                                            </span>
                                        </td>
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

export default TemplatesTable;