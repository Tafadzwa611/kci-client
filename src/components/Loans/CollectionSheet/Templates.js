import React from 'react';
import { Link } from 'react-router-dom';

const Templates = ({data}) => {
  const [templates] = data;

  return (
    <>
      <button className='btn btn-success' style={{marginBottom:'20px'}}>
        <Link to='/loans/viewloans/collection_sheet/add_template'>
          Add Template
        </Link>
      </button>
      <div style={{padding:'0', border:'none'}} className='table-container full__width font-12'>
        <div className='full__table'>
          <div className='table-responsive'>
            <div className='table__height'>
              <table className='table'>
                <thead className='clients-report-table'>
                  <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                    <th>Template Name</th>
                    <th>Date Created</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {templates.map((template, index) => {
                    return (
                      <tr key={index}>
                        <td>{template.report_name}</td>
                        <td>{template.entry_date}</td>
                        <td style={{display: 'flex', columnGap: '5px'}}>
                          <span>
                            <Link className='badge badge-success' to={`/loans/viewloans/collection_sheet/edit_template/${template.id}`}>Edit</Link>
                          </span>
                          <span>
                            <Link className='badge badge-danger' to={`/loans/viewloans/collection_sheet/delete_template/${template.id}`}>Delete</Link>
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

export default Templates;