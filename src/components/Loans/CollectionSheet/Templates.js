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
                <tbody>
                  <tr className='journal-details header' style={{position:'sticky', top: 0}}>
                    <th>Template Name</th>
                    <th>Date Created</th>
                    <th>Action</th>
                  </tr>
                  {templates.map(template => {
                    return (
                      <tr key={template.id}>
                        <td>{template.report_name}</td>
                        <td>{template.entry_date}</td>
                        <td>
                          <span className='delete_button'>
                            <Link to={`/loans/viewloans/collection_sheet/delete_template/${template.id}`}>Delete</Link>
                          </span>
                          <span className='edit_button'>
                            <Link to={`/loans/viewloans/collection_sheet/edit_template/${template.id}`}>Edit</Link>
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